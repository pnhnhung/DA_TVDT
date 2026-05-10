# Framework Architecture

## Tổng Quan

Framework này là **Playwright TypeScript native** được thiết kế AI-first — mọi component đều
được tổ chức để AI agent (Antigravity) có thể đọc, hiểu và sinh test automation từ manual test cases.

## Sơ Đồ Kiến Trúc

```
┌─────────────────────────────────────────────────────────────────┐
│                         Test Execution                          │
│  tests/examples/     tests/generated/<module>/                  │
│  (hand-written)       (AI-generated specs)                       │
└──────────────────────────┬──────────────────────────────────────┘
                           │ import
┌──────────────────────────▼──────────────────────────────────────┐
│                      Fixture Layer                              │
│  src/fixtures/base.fixture.ts  ←  testEnv, evidence, apiClient  │
│  src/fixtures/test.ts          ←  loginPage, dashboardPage, ... │
│  src/fixtures/<module>.fixture.ts  ← module-specific pages      │
└──────────┬──────────────────────────────┬───────────────────────┘
           │                              │
┌──────────▼──────────┐     ┌────────────▼────────────────────────┐
│   Page Object Layer │     │          Core Layer                  │
│  src/pages/         │     │  src/core/                          │
│  ├─ base.page.ts    │     │  ├─ database.ts    (single query)   │
│  ├─ auth/           │     │  ├─ database-pool.ts (pool)         │
│  ├─ dashboard/      │     │  ├─ api.ts          (HTTP client)   │
│  └─ <module>/       │     │  ├─ evidence.ts     (attachments)   │
│                     │     │  ├─ test-data.ts    (generators)    │
│  src/locators/      │     │  └─ global-setup.ts (pre-flight)    │
│  ├─ auth/           │     └──────────────────────────────────────┘
│  └─ <module>/       │
└─────────────────────┘
           │
┌──────────▼──────────────────────────────────────────────────────┐
│                     Config Layer                                │
│  src/config/env.ts          ← Typed env loader                 │
│  config/environments/       ← dev.env / stg.env / prod.env     │
│  .env                       ← selector (TEST_ENV=dev)           │
└─────────────────────────────────────────────────────────────────┘
```

## Layers Chi Tiết

### 1. Config Layer (`src/config/`)
- **`env.ts`** — Load và validate biến môi trường với type safety.
  Thứ tự load: `.env` → `config/environments/{TEST_ENV}.env` → OS env vars
- **`config/environments/`** — File env theo môi trường: `dev`, `stg`, `uat`, `prod`

### 2. Core Layer (`src/core/`)

| File | Vai trò |
|---|---|
| `database.ts` | Single-query helper — dùng khi không cần pool |
| `database-pool.ts` | Singleton connection pool (pg / mysql2) |
| `api.ts` | HTTP client typed — GET/POST/PUT/PATCH/DELETE |
| `evidence.ts` | Screenshot/JSON/text đính kèm vào Allure report |
| `test-data.ts` | Unique data generators — email, username, TC code |
| `global-setup.ts` | Pre-flight: validate env + DB ping |

### 3. Locator Layer (`src/locators/`)
- Mỗi module có file `<module>.locators.ts`
- Export `LocatorSpec` object — không phải string selector raw
- AI dùng layer này để tham chiếu locator trong Page Object

### 4. Page Object Layer (`src/pages/`)
- Extends `BasePage` — có sẵn smart waits, scroll, clearAndFill
- Gọi `by(locatorSpec)` để resolve locator từ catalog
- Methods đặt tên theo hành động nghiệp vụ (fillVacancyName, save, openVacancies)

### 5. Fixture Layer (`src/fixtures/`)
- **`base.fixture.ts`** — Gốc: testEnv, evidence, apiClient
- **`test.ts`** — Extend base + common pages (auth, dashboard)
- **`<module>.fixture.ts`** — Module-specific pages; extend từ `test.ts`

### 6. Test Layer (`tests/`)
- **`tests/examples/`** — Spec viết tay để demo pattern
- **`tests/generated/`** — Spec được AI sinh từ manual TC JSON

## Data Flow: Manual TC → Automation Spec

```
Manual Testcase JSON          AI Agent (Workflow 01)          Generated Spec
inputs/manual-testcases/  →  .agent/workflows/01_*.md   →  tests/generated/
        ↑                            ↓                              ↓
   AI fills fields           Check locator/page gap            validate:ai
   automationStatus          Update page/locator if             npm test
   = AUTO_READY              needed → gen spec
```

## Naming Conventions

| Artifact | Convention | Ví dụ |
|---|---|---|
| Page Object | `<module>.page.ts` | `login.page.ts` |
| Locator catalog | `<module>.locators.ts` | `login.locators.ts` |
| Generated spec | `<tc-id>.generated.spec.ts` | `tc-rec-001.generated.spec.ts` |
| Module fixture | `<module>.fixture.ts` | `recruitment.fixture.ts` |
| Env config | `<env>.env` | `stg.env` |

## Quy Tắc Không Được Vi Phạm

1. **Không raw locator trong spec** — luôn qua Page Object method
2. **Không hardcode credential** — luôn dùng env vars hoặc `@data/users`
3. **Không `waitForTimeout`** — dùng `expect().toBeVisible()` hoặc `waitForResponse()`
4. **Không `test.only`** — không commit focus test
5. **Spec phải import từ `@fixtures/test`** — không import trực tiếp `@playwright/test`
