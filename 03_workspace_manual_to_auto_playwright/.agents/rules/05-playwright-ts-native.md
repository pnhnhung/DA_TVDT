---
trigger: always_on
---

# Rule 05 — Playwright TypeScript Native Implementation

Áp dụng cho source code automation sinh trực tiếp vào framework **Playwright + TypeScript + Playwright Test native**.

> Framework này **KHÔNG** dùng Cucumber, **KHÔNG** có `.feature` files, **KHÔNG** có step definitions, **KHÔNG** có Python/Java.

---

## 1. Tech Stack

- **TypeScript** + **Playwright Test** (`@playwright/test`) + **POM** — không inline locator trong spec.

---

## 2. Cấu Trúc Framework

```text
src/
  config/env.ts                    ← BASE_URL, accounts
  core/test-data.ts                ← uniqueEmail(), uniqueSuffix(), uniqueTcCode()
  core/evidence.ts                 ← Screenshot/JSON/text attachments
  core/database.ts / database-pool.ts
  fixtures/test.ts                 ← Common: loginPage, dashboardPage
  fixtures/<module>.fixture.ts     ← Module-specific pages
  locators/<module>/<module>.locators.ts  ← LocatorSpec catalog
  pages/base.page.ts               ← BasePage: clearAndFill, scrollIntoView
  pages/<module>/<module>.page.ts  ← Extend BasePage
  data/users.ts                    ← getUserByProfile(), users object
tests/generated/<module>/          ← AI-generated specs (*.generated.spec.ts)
config/environments/dev.env / stg.env / uat.env
```

---

## 3. Spec Pattern Bắt Buộc

### Nguyên tắc — MỖI TC LÀ 1 `test()` ĐỘC LẬP

> **TUYỆT ĐỐI KHÔNG** gộp nhiều TC vào một `test()` dùng `test.step()` phân cấp.

| Tình huống | Dùng |
|---|---|
| TC chia sẻ biến data ở describe scope | `test.describe.serial()` — TC sau sẽ **skip** (không fail giả) nếu TC trước fail |
| TC hoàn toàn độc lập | `test.describe()` |

```typescript
/**
 * GENERATED SPEC
 * Module : <module>
 * Generated: <ISO timestamp>
 */
import { test, expect } from '@fixtures/<module>.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';

test.describe.serial('<module> — <feature>', () => {
  const recordName = 'Record ' + uniqueSuffix('<tc-prefix>');
  const editedName = recordName + ' Updated';

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.admin.username, users.admin.password);
    await loginPage.page.waitForURL(/dashboard/);
  });

  test('<TC_ID> - <title>', async ({ <module>Page, evidence }) => {
    await evidence.runtime(); // BẮT BUỘC

    await test.step('Navigate', async () => { await <module>Page.open(); });
    await test.step('<action>', async () => { /* Page Object method */ });
    await test.step('Verify', async () => {
      await expect(<module>Page.successToast).toBeVisible();
      await evidence.screenshot('<step>');
    });
  });
});
```

---

## 4. Page Object Pattern

```typescript
// src/pages/<module>/<module>.page.ts
export class ModulePage extends BasePage {
  get saveButton()   { return this.by(moduleLocators.saveButton); }
  get nameInput()    { return this.by(moduleLocators.nameInput); }
  get successToast() { return this.by(moduleLocators.successToast); }

  async fillName(name: string) { await this.clearAndFill(this.nameInput, name); }
  async save() {
    await this.saveButton.click();
    await expect(this.successToast).toBeVisible();
  }
  async open() {
    await this.page.goto('/web/index.php/module/path');
    await expect(this.page).toHaveURL(/module/);
  }
}
```

---

## 5. Locator Catalog Pattern

```typescript
// src/locators/<module>/<module>.locators.ts
import type { LocatorSpec } from '@core/locator';

export const moduleLocators = {
  saveButton:   { strategy: 'role', role: 'button', name: 'Save', description: '...' } satisfies LocatorSpec,
  nameInput:    { strategy: 'label', label: 'Name', description: '...' } satisfies LocatorSpec,
  successToast: { strategy: 'css', css: '.oxd-toast-content--success', description: '...' } satisfies LocatorSpec,
};
```

---

## 6. Module Fixture Pattern

```typescript
// src/fixtures/<module>.fixture.ts
import { test as base, expect } from '@fixtures/test';
import { ModulePage } from '@pages/<module>/<module>.page';

export const test = base.extend({
  modulePage: async ({ page }, use) => use(new ModulePage(page))
});
export { expect };
```

---

## 7. Import Rules — TUYỆT ĐỐI KHÔNG VI PHẠM

| ❌ SAI | ✅ ĐÚNG |
|---|---|
| `import { test } from '@playwright/test'` | `import { test } from '@fixtures/test'` |
| `page.locator('.btn-save')` trong spec | `modulePage.save()` |
| `waitForTimeout(2000)` | `expect(element).toBeVisible()` |
| `test.only(...)` | Không dùng `.only` |
| Hardcode `'https://...'` | `env.BASE_URL` từ config |
| Hardcode `'Admin'`, `'admin123'` | `users.admin.username` |

---

## 8. Wait Strategy

**Cấm:** `waitForTimeout` không có lý do rõ, `networkidle` mặc định.

**Ưu tiên:** Auto-waiting built-in → `expect(locator).toBeVisible()` → `expect(locator).toBeEnabled()` → `waitForResponse('/api/')`.

**Vue.js reactivity (OrangeHRM):** Dùng `keyboard.press('Control+A')` + `Backspace` + `fill()` + `Tab` để trigger dirty state thay vì chỉ `fill()` đơn thuần.

---

## 9. Test Data Strategy

```typescript
const name  = 'Record ' + uniqueSuffix('<tc-prefix>');   // Record_20260506_143022_A3F2
const email = uniqueEmail('recruiter');                   // recruiter_20260506_143022@auto.test
```

Không hardcode data có ràng buộc unique — sẽ fail lần chạy thứ 2.

---

## 10. Evidence & Traceability

```typescript
await evidence.runtime();                            // BẮT BUỘC ở đầu mỗi test
await evidence.screenshot('step-name');              // Sau action/assertion quan trọng
await evidence.json('test-data', { name, email });   // Attach data context
```

---

## 11. Code Change Scope

- Patch nhỏ, đúng state hiện tại — không refactor rộng framework.
- Không thay đổi `src/fixtures/test.ts`, `playwright.config.ts`, `src/core/` trừ khi có evidence rõ ràng.
- Cleanup data sau test nếu data chỉ dùng cho test đó.

---

## 12. Mapping: Locator Package ↔ Page Object ↔ Test File

| Locator Package | Page Object | Test File |
|---|---|---|
| `inputs/locator_packages/<module>/` | `src/pages/<module>/<module>.page.ts` | `tests/generated/<module>/` |

---

## 13. Execute Commands

```bash
TEST_ENV=dev npx playwright test tests/generated/<module>/<file>.generated.spec.ts --project=chromium --headed
TEST_ENV=dev npx playwright test tests/generated/<module>/ --project=chromium
TEST_ENV=dev npx playwright test --grep @smoke
npm run validate:ai
```

---

## 14. Test Structure & Data Isolation — NGUYÊN TẮC BẮT BUỘC

**Vấn đề cascade failure:** Khi TC_A → TC_B → TC_C share data, A fail thì B và C cũng fail dù logic đúng → report sai, debug khó.

**Chiến lược theo loại TC:**

| Loại TC | Data Strategy |
|---|---|
| Validate (empty/invalid) | Không cần pre-data — test trực tiếp form |
| Duplicate check | Tự tạo data riêng → thử duplicate → verify lỗi → cleanup |
| Edit | Tự tạo data riêng ở đầu test → edit → cleanup |
| Delete | Tự tạo data riêng → delete |
| View/Search | Tự tạo data riêng → search/verify → cleanup |

**Khi chấp nhận shared data:** Chỉ khi dùng `test.describe.serial()` + TC phụ thuộc nhau rõ ràng theo nghiệp vụ. TC sau sẽ **skip** (không fail giả) nếu TC trước fail.

**Ưu tiên isolated data** — mỗi TC tự setup + teardown riêng → report chính xác, an toàn parallel.

**Anti-patterns bị cấm:**

| ❌ Cấm | ✅ Thay thế |
|---|---|
| Gộp nhiều TC vào 1 `test()` dùng `test.step()` phân cấp | Mỗi TC = 1 `test()` riêng biệt |
| Dùng data từ TC trước, không có setup riêng | Mỗi TC tự setup precondition |
| `test.describe()` cho TC có data dependency | `test.describe.serial()` |
| Không teardown data unique per-run | Thêm teardown step sau assertion |
