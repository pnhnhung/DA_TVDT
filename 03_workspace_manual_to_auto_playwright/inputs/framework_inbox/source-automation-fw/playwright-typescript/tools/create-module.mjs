import fs from 'node:fs';
import path from 'node:path';

const moduleArg = process.argv[2];

if (!moduleArg) {
  console.error('Usage: npm run new:module -- <module/path>');
  console.error('Example: npm run new:module -- recruitment/job');
  process.exit(1);
}

const normalized = moduleArg.replace(/^\/+|\/+$/g, '');
const root = process.cwd();

const dirs = [
  `src/pages/${normalized}`,
  `src/locators/${normalized}`,
  `tests/generated/${normalized}`,
  `inputs/manual_testcases/${normalized}`,
  `inputs/locator_packages/${normalized}`,
  `inputs/test_data/${normalized}`
];

for (const dir of dirs) {
  fs.mkdirSync(path.join(root, dir), { recursive: true });
  const keep = path.join(root, dir, '.gitkeep');
  if (!fs.existsSync(keep)) fs.writeFileSync(keep, '');
}

console.log(`Module scaffold created for: ${normalized}`);
