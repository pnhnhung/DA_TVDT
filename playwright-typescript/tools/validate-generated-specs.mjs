#!/usr/bin/env node
/**
 * validate-generated-specs.mjs
 *
 * Static validator cho tất cả file trong tests/generated/
 * Kiểm tra anti-patterns vi phạm coding rules của framework.
 *
 * Cách dùng:
 *   npm run validate:ai
 *   make validate
 *
 * Exit code:
 *   0 — tất cả file pass
 *   1 — có vi phạm
 */

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const generatedDir = path.join(root, 'tests', 'generated');

// ──────────────────────────────────────────────────────────────────────────────
// Rules
// ──────────────────────────────────────────────────────────────────────────────

const FORBIDDEN_PATTERNS = [
  {
    pattern: /page\.locator\s*\(/,
    message: '[LOCATOR] Do not use page.locator() directly in generated specs. Use Page Object methods instead.',
    severity: 'error'
  },
  {
    pattern: /waitForTimeout\s*\(/,
    message: '[WAIT] Do not use waitForTimeout(). Use smart waits: expect().toBeVisible() or waitForResponse().',
    severity: 'error'
  },
  {
    pattern: /Thread\.sleep\s*\(/,
    message: '[WAIT] Do not use Thread.sleep().',
    severity: 'error'
  },
  {
    pattern: /test\.only\s*\(/,
    message: '[FOCUS] Do not commit test.only(). Remove before merging.',
    severity: 'error'
  },
  {
    pattern: /describe\.only\s*\(/,
    message: '[FOCUS] Do not commit describe.only(). Remove before merging.',
    severity: 'error'
  },
  {
    pattern: /console\.(log|warn|error|info)\s*\(/,
    message: '[DEBUG] Remove console.log/warn/error/info from generated specs.',
    severity: 'warning'
  },
  {
    pattern: /(?<!\/{2}.*)(password|secret|token)\s*[:=]\s*['"`][^'"`\s]+['"`]/i,
    message: '[SECURITY] Potential hardcoded credential detected. Use env vars or @data/users.',
    severity: 'error'
  },
  {
    // Detect hardcoded base URLs (not from env)
    pattern: /https?:\/\/(?!{)/,
    message: '[CONFIG] Hardcoded URL detected. Use env.BASE_URL or baseURL from playwright.config.',
    severity: 'warning'
  },
  {
    pattern: /import.*from\s+['"]@playwright\/test['"]/,
    message: '[IMPORT] Import from @playwright/test directly. Use @fixtures/test instead.',
    severity: 'error'
  }
];

// ──────────────────────────────────────────────────────────────────────────────
// Required patterns — at least one must match
// ──────────────────────────────────────────────────────────────────────────────

const REQUIRED_PATTERNS = [
  {
    pattern: /from\s+['"]@fixtures\/(test|.*\.fixture)['"]/,
    message: '[IMPORT] Spec must import from @fixtures/test or @fixtures/*.fixture (not directly from @playwright/test).'
  },
  {
    pattern: /await evidence\.runtime\(\)/,
    message: '[EVIDENCE] Spec should call evidence.runtime() at test start for traceability.'
  }
];

// ──────────────────────────────────────────────────────────────────────────────
// File walker
// ──────────────────────────────────────────────────────────────────────────────

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    if (entry.isFile() && entry.name.endsWith('.spec.ts')) return [fullPath];
    return [];
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// Validate
// ──────────────────────────────────────────────────────────────────────────────

const files = walk(generatedDir);

if (files.length === 0) {
  console.log('ℹ️  No generated spec files found. Nothing to validate.');
  process.exit(0);
}

const errors = [];
const warnings = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');
  const rel = path.relative(root, file);

  // Check forbidden patterns
  for (const rule of FORBIDDEN_PATTERNS) {
    if (rule.pattern.test(content)) {
      const entry = `${rel}: ${rule.message}`;
      if (rule.severity === 'error') {
        errors.push(entry);
      } else {
        warnings.push(entry);
      }
    }
  }

  // Check required patterns
  for (const rule of REQUIRED_PATTERNS) {
    if (!rule.pattern.test(content)) {
      errors.push(`${rel}: ${rule.message}`);
    }
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// Report
// ──────────────────────────────────────────────────────────────────────────────

console.log(`\n📋 Validating ${files.length} generated spec file(s)...\n`);

if (warnings.length > 0) {
  console.warn('⚠️  Warnings:');
  warnings.forEach((w) => console.warn(`   - ${w}`));
  console.log('');
}

if (errors.length > 0) {
  console.error('❌ Validation FAILED:\n');
  errors.forEach((e) => console.error(`   - ${e}`));
  console.error(`\n${errors.length} error(s), ${warnings.length} warning(s). Fix errors before committing.\n`);
  process.exit(1);
}

console.log(`✅ Validation PASSED. ${files.length} file(s) checked. ${warnings.length} warning(s).\n`);
