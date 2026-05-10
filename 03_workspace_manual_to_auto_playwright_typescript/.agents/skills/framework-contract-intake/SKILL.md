---
name: framework-contract-intake
description: Read the existing Playwright TypeScript Playwright Test POM automation framework and produce a contract plus reuse inventory before direct-to-framework generation.
---

# Skill — Framework Contract Intake

## Goal

Hiểu framework **Playwright TypeScript** thật trước khi sinh automation code trực tiếp.

---

## Inputs

```text
FRAMEWORK_ROOT         (thư mục chứa playwright.config.ts)
inputs/framework_contract/ nếu có
inputs/reference/ nếu có
```

Mặc định `FRAMEWORK_ROOT`:

```text
inputs/framework_inbox/source-automation-fw/playwright-typescript/
```

---

## Rules Bắt Buộc

- `00-common-governance.md`
- `01-framework-contract-and-reuse.md`
- `05-playwright-ts-native.md`

---

## Procedure

### 1. Đọc Cây Thư Mục

Không chỉ đọc README — phải đọc cây thư mục thực tế và các file quan trọng:

```text
playwright.config.ts           ← testDir, globalSetup, reporter, timeout, baseURL, viewport
package.json                   ← dependencies, scripts (test/lint/format/gen:spec)
tsconfig.json                  ← paths aliases (@fixtures, @pages, @core, @data, @locators)
src/config/env.ts              ← Typed env loader, TEST_ENV, BASE_URL, accounts
src/fixtures/test.ts           ← Available fixture names, page fixture types
src/fixtures/base.fixture.ts   ← baseTest structure: testEnv, evidence, apiClient
src/pages/base.page.ts         ← BasePage methods: by(), clearAndFill(), scrollIntoView()
src/core/test-data.ts          ← uniqueSuffix(), uniqueEmail(), uniqueTcCode()
src/data/users.ts              ← getUserByProfile(), users roles
Makefile                       ← Available make targets
```

### 2. Xác Định Framework Contract

Ghi rõ từng mục sau vào output:

| Mục | Giá Trị Thực Tế |
|---|---|
| Test runner | `npx playwright test` |
| Test file path convention | `tests/generated/<module>/<tc-id>.generated.spec.ts` |
| Page Object path convention | `src/pages/<module>/<module>.page.ts` |
| Locator catalog path | `src/locators/<module>/<module>.locators.ts` |
| Base class | `BasePage` từ `src/pages/base.page.ts` |
| Common fixture | `test` từ `src/fixtures/test.ts` |
| Module fixture pattern | `src/fixtures/<module>.fixture.ts` |
| Config/env loader | `src/config/env.ts` — `env.BASE_URL`, `env.TEST_ENV` |
| Test data helper | `src/core/test-data.ts` — `uniqueSuffix()` etc |
| User/account | `src/data/users.ts` — `getUserByProfile('admin')` |
| DB helper | `src/core/database.ts` / `src/core/database-pool.ts` |
| API client | `src/core/api.ts` — `ApiClient` |
| Evidence | fixture `evidence` — `runtime()`, `screenshot()`, `json()`, `text()` |
| Tags | `@smoke`, `@regression`, `@p0`, `@generated`, `@<module>` |
| Report dir | `playwright-report/`, `allure-results/<env>/` |
| Execute command | `TEST_ENV=dev npx playwright test <path> --project=chromium` |
| Makefile shortcuts | `make test-generated ENV=dev`, `make validate` |

### 3. Lập Reuse Inventory

Scan từng module đã có:

```text
src/pages/<module>/       → List Page Object classes và methods có sẵn
src/locators/<module>/    → List LocatorSpec entries có sẵn
src/fixtures/             → List fixtures available
tests/generated/          → List TC IDs đã được gen (tránh duplicate)
```

Phân loại:
- `confirmed_from_framework`: Đọc từ source code thực tế
- `inferred`: Suy từ pattern/convention
- `gap_or_unknown`: Chưa tìm thấy, cần tạo mới
- `must_follow`: Convention bắt buộc

### 4. Không Sinh Code

Skill này chỉ đọc và phân tích — không sinh testcase, không viết spec, không tạo Page Object.

---

## Outputs

```text
production_artifacts/automation_design/framework_contract.md
production_artifacts/automation_design/reuse_inventory.md
```

**Header bắt buộc trong mỗi file:**
```text
module:       [all / specific module]
state_id:     framework-intake
source_input: FRAMEWORK_ROOT path
framework_root: [đường dẫn thực tế]
generated_at: [ISO timestamp]
status:       complete | partial | gap_found
```
