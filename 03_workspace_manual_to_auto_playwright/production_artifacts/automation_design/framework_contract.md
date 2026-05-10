# Framework Contract — Playwright TypeScript Native

```text
module:       all
state_id:     framework-intake
source_input: inputs/framework_inbox/source-automation-fw/playwright-typescript/
framework_root: inputs/framework_inbox/source-automation-fw/playwright-typescript/
generated_at: 2026-05-06T15:00:00Z
status:       complete
```

## 1. Architecture & Runner (Confirmed)

- **Test Runner:** `npx playwright test` (@playwright/test ^1.52.0)
- **Language:** TypeScript (`.ts` for source, `.spec.ts` for tests)
- **Pattern:** Page Object Model (POM) + Fixtures
- **BDD/Cucumber:** KHÔNG sử dụng.

## 2. Path Conventions (Confirmed)

- **Generated Specs:** `tests/generated/<module>/<tc-id>.generated.spec.ts`
- **Page Objects:** `src/pages/<module>/<module>.page.ts`
- **Locator Catalogs:** `src/locators/<module>/<module>.locators.ts`
- **Fixtures:**
  - Base fixture: `src/fixtures/base.fixture.ts`
  - Common app fixture: `src/fixtures/test.ts`
  - Module fixture (nếu cần): `src/fixtures/<module>.fixture.ts`

## 3. Core Components & Helpers (Confirmed)

- **Config / Env:** `src/config/env.ts` (Typed loader từ `.env` hoặc `config/environments/*.env`)
  - Variables chính: `env.BASE_URL`, `env.TEST_ENV`, `env.ACCOUNT_PROFILE`
- **Test Data Helper:** `src/core/test-data.ts`
  - Chức năng: `uniqueSuffix()`, `uniqueEmail()`, `uniqueTcCode()`
- **Database Helper:** 
  - Single query: `src/core/database.ts`
  - Connection pool: `src/core/database-pool.ts` (hỗ trợ mysql/mariadb/postgres)
- **API Client:** `src/core/api.ts` (Typed HTTP wrapper)
- **User Accounts:** `src/data/users.ts` (`getUserByProfile('admin')`)

## 4. Execution & Reporting (Confirmed)

- **Commands:** 
  - `TEST_ENV=dev npx playwright test tests/generated/<module> --project=chromium`
  - Hoặc qua Makefile: `make test-module MODULE=<module> ENV=dev`
- **Reporting:** 
  - Playwright HTML Report: `playwright-report/`
  - Allure Report: `allure-results/<env>/`
  - JUnit/JSON: `test-results/<env>/`
- **Evidence Fixture:**
  - Hàm gọi bắt buộc đầu mỗi test: `await evidence.runtime()`
  - Chụp ảnh thủ công: `await evidence.screenshot('step-name')`

## 5. Coding Standards & Anti-Patterns (Must Follow)

- Cấm inline `page.locator(...)` trong spec file.
- Cấm `waitForTimeout(...)`.
- Cấm hardcode credentials và base URL.
- Bắt buộc kiểm tra bằng `make validate` (chạy script `tools/validate-generated-specs.mjs`).
