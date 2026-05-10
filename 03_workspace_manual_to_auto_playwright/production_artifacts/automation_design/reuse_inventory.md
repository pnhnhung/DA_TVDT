# Reuse Inventory — Playwright TypeScript Native

```text
module:       all
state_id:     framework-intake
source_input: inputs/framework_inbox/source-automation-fw/playwright-typescript/
framework_root: inputs/framework_inbox/source-automation-fw/playwright-typescript/
generated_at: 2026-05-06T15:00:00Z
status:       complete
```

## 1. Page Objects (`src/pages/`)

| Page Object | Class Name | Base Class | Methods | Status |
|---|---|---|---|---|
| `auth/login.page.ts` | `LoginPage` | `BasePage` | `open()`, `login(user, pass)` | confirmed_from_framework |
| `dashboard/dashboard.page.ts` | `DashboardPage` | `BasePage` | `pageHeader` | confirmed_from_framework |
| `recruitment/job.page.ts` | `RecruitmentJobPage` | `BasePage` | TBD | inferred |

## 2. Fixtures (`src/fixtures/`)

| Fixture File | Export Name | Provides | Status |
|---|---|---|---|
| `base.fixture.ts` | `baseTest` | `testEnv`, `apiClient`, `evidence` | confirmed_from_framework |
| `test.ts` | `test` | `loginPage`, `dashboardPage`, `recruitmentJobPage` | confirmed_from_framework |

## 3. Test Data & Utilities (`src/core/` & `src/data/`)

| Utility | Location | Description | Status |
|---|---|---|---|
| `uniqueSuffix` | `core/test-data.ts` | Generates a suffix like `prefix_TIMESTAMP_RANDOM` | confirmed_from_framework |
| `uniqueEmail` | `core/test-data.ts` | Generates a unique email `prefix_TIMESTAMP@auto.test` | confirmed_from_framework |
| `uniqueTcCode` | `core/test-data.ts` | Generates a TC Code like `PREFIX_TIMESTAMP` | confirmed_from_framework |
| `getUserByProfile` | `data/users.ts` | Returns credentials for profiles like 'admin' | confirmed_from_framework |
| `users` | `data/users.ts` | Dictionary of defined user profiles | confirmed_from_framework |

## 4. API & Database (`src/core/`)

| Module | Purpose | Status |
|---|---|---|
| `api.ts` | Provides `ApiClient` class with `get`, `post`, `put`, `delete` methods | confirmed_from_framework |
| `database.ts` | Provides `queryDb<T>(sql, params)` for single queries | confirmed_from_framework |
| `database-pool.ts` | Provides `queryPool<T>(sql, params)` and `closeAllPools()` | confirmed_from_framework |

## 5. Locators (`src/locators/`)

*(No explicitly populated locator catalogs were found in the current framework state, or they are yet to be populated via the UI locator collector).*
- **Status:** gap_or_unknown (Cần được tạo mới cho mỗi module qua workflow `01c_prepare_locator_package`)

## 6. Generated Specs (`tests/generated/`)

*(Chưa có AI-generated specs nào được tìm thấy trong thư mục tests/generated).*
- **Status:** gap_or_unknown (Cần được sinh qua workflow `02_generate_auto_direct_to_framework`)
