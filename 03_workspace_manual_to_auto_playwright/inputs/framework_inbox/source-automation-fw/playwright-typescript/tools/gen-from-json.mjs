#!/usr/bin/env node
/**
 * gen-from-json.mjs
 *
 * Tool: Generate Playwright spec từ Manual Testcase JSON.
 *
 * Cách dùng:
 *   node tools/gen-from-json.mjs <path-to-json-or-dir>
 *   npm run gen:spec -- inputs/manual-testcases/login.json
 *   npm run gen:spec -- inputs/manual-testcases/
 *   make gen-spec INPUT=inputs/manual-testcases/login.json
 *
 * Output:
 *   tests/generated/<module>/<tc-id>.generated.spec.ts
 *
 * Lưu ý:
 *   - Chỉ gen spec cho TC có automationStatus = 'AUTO_READY'
 *   - TC với status khác sẽ bị skip và log ra console
 *   - Spec được gen với test.describe.skip — bỏ skip sau khi verify locator
 */

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const inputArg = process.argv[2];

if (!inputArg) {
  console.error('❌ Usage: node tools/gen-from-json.mjs <json-file-or-dir>');
  process.exit(1);
}

const inputPath = path.resolve(root, inputArg);

if (!fs.existsSync(inputPath)) {
  console.error(`❌ Input not found: ${inputPath}`);
  process.exit(1);
}

// ──────────────────────────────────────────────────────────────────────────────
// Collect JSON files
// ──────────────────────────────────────────────────────────────────────────────

function collectJsonFiles(targetPath) {
  const stat = fs.statSync(targetPath);
  if (stat.isFile()) {
    return targetPath.endsWith('.json') ? [targetPath] : [];
  }
  return fs
    .readdirSync(targetPath, { withFileTypes: true })
    .flatMap((e) => {
      const full = path.join(targetPath, e.name);
      if (e.isDirectory()) return collectJsonFiles(full);
      if (e.isFile() && e.name.endsWith('.json') && !e.name.startsWith('_')) return [full];
      return [];
    });
}

const jsonFiles = collectJsonFiles(inputPath);

if (jsonFiles.length === 0) {
  console.warn('⚠️  No JSON files found at:', inputPath);
  process.exit(0);
}

// ──────────────────────────────────────────────────────────────────────────────
// Code Generator
// ──────────────────────────────────────────────────────────────────────────────

function sanitizeName(str) {
  return str.trim().replace(/[^a-zA-Z0-9_\-]/g, '-').replace(/-+/g, '-').toLowerCase();
}

function inferPageFixture(module) {
  // Convention: "recruitment" → "recruitmentJobPage" など
  // AI sẽ cần update nếu module fixture khác convention
  const camel = module
    .split(/[-_]/)
    .map((s, i) => (i === 0 ? s : s[0].toUpperCase() + s.slice(1)))
    .join('');
  return `${camel}Page`;
}

function generateSteps(steps) {
  return steps
    .map((step) => {
      const lines = [
        `    await test.step('Step ${step.no}: ${step.action.replace(/'/g, "\\'")}', async () => {`,
        `      // TODO: implement action`
      ];
      if (step.expected) {
        lines.push(`      // Expected: ${step.expected}`);
      }
      if (step.locatorRef) {
        lines.push(`      // Locator ref: ${step.locatorRef}`);
      }
      if (step.dataRef) {
        lines.push(`      // Data ref: testData.${step.dataRef}`);
      }
      lines.push(`    });`);
      return lines.join('\n');
    })
    .join('\n\n');
}

function generateSpec(tc) {
  const module = sanitizeName(tc.module);
  const pageFixture = inferPageFixture(module);
  const tags = (tc.tags || []).join(' ');
  const tagsStr = tags ? ` ${tags}` : '';

  const testDataSection = tc.testDataRefs?.length
    ? `  // Test data refs:\n  //   ${tc.testDataRefs.join('\n  //   ')}\n`
    : '';

  const preconditionsStr = tc.preconditions?.length
    ? `  // Preconditions:\n  //   ${tc.preconditions.join('\n  //   ')}\n`
    : '';

  return `/**
 * GENERATED SPEC — ${tc.id}
 * Module : ${tc.module}
 * Title  : ${tc.title}
 * Status : ${tc.automationStatus}
 * Author : ${tc.author || 'ai-gen'}
 * Generated: ${new Date().toISOString()}
 *
 * ⚠️  Review required before removing test.describe.skip:
 *   1. Verify locators exist in src/locators/${module}/
 *   2. Verify page methods exist in src/pages/${module}/
 *   3. Remove skip and run: npm run test:generated
 */

import { test, expect } from '@fixtures/test';
import { uniqueSuffix } from '@core/test-data';

// REVIEW: remove skip after verifying locators and page methods
test.describe.skip('${tagsStr}${tc.module} — ${tc.title}', () => {
  test('${tc.id} - ${tc.title}', async ({
    loginPage,
    dashboardPage,
    ${pageFixture},
    evidence
  }) => {
    const testRunId = uniqueSuffix('${tc.id.toLowerCase()}');
    await evidence.runtime();
    await evidence.json('test-run-id', { testRunId });

${preconditionsStr}${testDataSection}
    await test.step('Login as Admin', async () => {
      await loginPage.open();
      await loginPage.login(
        // TODO: use users.admin.username / users.admin.password from @data/users
        process.env.ADMIN_USERNAME ?? 'Admin',
        process.env.ADMIN_PASSWORD ?? 'admin123'
      );
      await expect(dashboardPage.pageHeader).toBeVisible();
      await evidence.screenshot('01-login-success');
    });

${generateSteps(tc.steps)}

    // Final assertion
    // Expected: ${tc.expectedFinalResult}
    await evidence.screenshot('final-state');
  });
});
`;
}

// ──────────────────────────────────────────────────────────────────────────────
// Main loop
// ──────────────────────────────────────────────────────────────────────────────

let generated = 0;
let skipped = 0;
const errors = [];

for (const file of jsonFiles) {
  let tc;
  try {
    tc = JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch (err) {
    errors.push(`${file}: JSON parse error — ${err.message}`);
    continue;
  }

  // Skip template
  if (!tc.id || tc.id.startsWith('TC_MODULE_')) {
    console.log(`⏭️  Skipping template file: ${path.relative(root, file)}`);
    continue;
  }

  const status = tc.automationStatus;

  if (status !== 'AUTO_READY') {
    console.log(`⏭️  ${tc.id} [${status}] — skipped (${tc.automationNotes || 'no notes'})`);
    skipped++;
    continue;
  }

  const module = sanitizeName(tc.module);
  const outDir = path.join(root, 'tests', 'generated', module);
  fs.mkdirSync(outDir, { recursive: true });

  const fileName = `${tc.id.toLowerCase().replace(/_/g, '-')}.generated.spec.ts`;
  const outFile = path.join(outDir, fileName);

  if (fs.existsSync(outFile)) {
    console.log(`⚠️  ${tc.id} — spec already exists, skipping: ${path.relative(root, outFile)}`);
    skipped++;
    continue;
  }

  const spec = generateSpec(tc);
  fs.writeFileSync(outFile, spec, 'utf-8');
  console.log(`✅ Generated: ${path.relative(root, outFile)}`);
  generated++;
}

if (errors.length > 0) {
  console.error('\n❌ Errors:');
  errors.forEach((e) => console.error(`  - ${e}`));
}

console.log(`\n📊 Summary: ${generated} generated, ${skipped} skipped, ${errors.length} errors.`);

if (errors.length > 0) process.exit(1);
