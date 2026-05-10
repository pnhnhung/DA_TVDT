---
trigger: always_on
---

# Rule 01 — Framework Contract & Reuse First

Automation code phải bám framework thật, không bám convention tự nghĩ.

## 1. Framework Contract Bắt Buộc

Trước khi generate code, phải xác định tối thiểu:

- `FRAMEWORK_ROOT` — thư mục chứa `playwright.config.ts`
- Test runner: **Playwright Test** (`npx playwright test`)
- Test file path và naming convention: `tests/generated/<module>/<tc-id>.generated.spec.ts`
- Page Object path: `src/pages/<module>/<module>.page.ts` — class extend `BasePage`
- Locator catalog: `src/locators/<module>/<module>.locators.ts` — dùng `LocatorSpec` type
- Fixture pattern: `src/fixtures/test.ts` (common) hoặc `src/fixtures/<module>.fixture.ts` (module)
- Config/env loader: `src/config/env.ts` — KHÔNG hardcode domain/account/key
- Test data helpers: `src/core/test-data.ts` — `uniqueSuffix()`, `uniqueEmail()`, `uniqueTcCode()`
- DB helper (nếu cần): `src/core/database.ts` (single) hoặc `src/core/database-pool.ts` (pool)
- User/account data: `src/data/users.ts` — `getUserByProfile('admin')`
- Evidence helper: fixture `evidence` — `runtime()`, `screenshot()`, `json()`, `text()`
- Tagging/marker convention: `@smoke`, `@regression`, `@p0`, `@<module>`, `@generated`
- Report paths: `playwright-report/`, `allure-results/<env>/`, `test-results/<env>/`
- Execute command nhỏ nhất: `TEST_ENV=<env> npx playwright test <path> --project=chromium`

Nếu chưa rõ các điểm trên → chỉ được chạy `workflow/00_framework_intake.md` trước.

---

## 2. Reuse Before Create

Trước khi tạo mới, phải tìm thành phần reusable theo thứ tự:

1. Test spec cùng TC ID trong `tests/generated/<module>/` (tránh duplicate).
2. Page Object/method tương ứng trong `src/pages/<module>/`.
3. Locator entry trong `src/locators/<module>/`.
4. Fixture trong `src/fixtures/test.ts` hoặc `src/fixtures/<module>.fixture.ts`.
5. Data helper trong `src/core/test-data.ts` hoặc `src/data/`.
6. DB utility trong `src/core/database.ts` / `src/core/database-pool.ts`.

Chỉ tạo mới khi đã xác nhận không có thành phần phù hợp để reuse.

---

## 3. Không Tạo Duplicate

- Không tạo Page Object mới nếu module/page đã có thể mở rộng method.
- Không tạo helper/utility mới nếu `src/core/` hoặc `src/data/` hiện có đã đáp ứng.
- Không tạo test spec mới cho cùng TC ID đã tồn tại.
- Nếu buộc phải tạo mới, ghi rõ lý do trong `STATE_GENERATION_SUMMARY.md`.

---

## 4. Framework Hiện Tại — TypeScript Native

Framework là **Playwright + TypeScript + Playwright Test Native + POM**. Ưu tiên kiểm tra và tuân thủ:

```text
FRAMEWORK_ROOT/
  src/
    config/env.ts                     ← Typed env loader — dùng env.BASE_URL, env.TEST_ENV
    core/test-data.ts                 ← uniqueSuffix(), uniqueEmail(), uniqueTcCode()
    core/database.ts                  ← queryDb<T>(sql, params)
    core/database-pool.ts             ← queryPool<T>(sql, params), closeAllPools()
    core/api.ts                       ← ApiClient: get/post/put/delete
    core/evidence.ts                  ← Evidence: runtime/screenshot/json/text
    data/users.ts                     ← getUserByProfile('admin'), users object
    fixtures/base.fixture.ts          ← baseTest: testEnv, evidence, apiClient
    fixtures/test.ts                  ← test: loginPage, dashboardPage, ...
    fixtures/<module>.fixture.ts      ← module-specific pages
    locators/<module>/*.locators.ts   ← LocatorSpec catalog
    pages/base.page.ts                ← BasePage: by(), clearAndFill(), scrollIntoView()
    pages/<module>/<module>.page.ts   ← Page Objects — extend BasePage
  tests/
    generated/<module>/               ← AI-generated specs (*.generated.spec.ts)
    examples/                         ← Hand-written reference specs
  config/environments/
    dev.env / stg.env / uat.env / prod.env
  tools/
    gen-from-json.mjs                 ← CLI: TC JSON → spec
    validate-generated-specs.mjs      ← Anti-pattern validator
  playwright.config.ts
  Makefile
  package.json
```

**KHÔNG CÓ:**
- File `.feature` (Cucumber/Gherkin)
- Thư mục `steps/` (step definitions)
- Decorator `@given`, `@when`, `@then`
- `pytest`, `conftest.py`, bất kỳ thứ gì Python

**Không tự chuyển sang Python, Java, BDD/Cucumber.**
