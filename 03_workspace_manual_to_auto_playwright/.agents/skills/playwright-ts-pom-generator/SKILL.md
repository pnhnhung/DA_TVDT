---
name: playwright-ts-pom-generator
description: Map automation-ready testcases to the existing Playwright TypeScript Playwright Test POM framework and generate spec files and Page Objects directly into the real framework by state.
---

# Skill — Playwright TypeScript POM Direct Generator

## Goal

Map testcase vào framework **Playwright TypeScript + Playwright Test native + POM** thật và
generate source code trực tiếp vào framework theo state.

> NGHIÊM CẤM: KHÔNG tạo file `.feature`, KHÔNG tạo step definitions, KHÔNG dùng Cucumber/BDD.
> NGHIÊM CẤM: KHÔNG viết `page.locator(...)` inline trong spec.
> NGHIÊM CẤM: Import từ `@playwright/test` trực tiếp — PHẢI dùng `@fixtures/test`.

---

## Inputs

```text
FRAMEWORK_ROOT
production_artifacts/automation_design/framework_contract.md
production_artifacts/automation_design/reuse_inventory.md
production_artifacts/automation_design/automation_ready_testcases.md
production_artifacts/automation_design/state_plan.md
production_artifacts/automation_scope/automation_scope.csv
inputs/locator_packages/<module>/locator_package.md  (nếu đã chạy 01c)
inputs/test_data_registry/<module>/data_testcase_mapping.md  (nếu đã chạy 01b)
inputs/app_context/ nếu có
```

---

## Rules Bắt Buộc

- `00-common-governance.md`
- `01-framework-contract-and-reuse.md`
- `02-scope-state-readiness.md`
- `03-test-data-first.md`
- `04-locator-and-mcp.md`
- `05-playwright-ts-native.md`  ← Rule TypeScript

---

## Procedure

### Step 1 — Select State

- Chỉ xử lý state user chỉ định.
- Chỉ code testcase `AUTO_READY` hoặc `AUTO_WITH_CONDITION` đã xử lý xong điều kiện.
- Không code `MANUAL_ONLY`, `BLOCKED`, hoặc case chưa có state.

### Step 2 — Map Before Code

Với từng testcase, xác định:

1. **Test file**: `tests/generated/<module>/<tc-id>.generated.spec.ts` — có tồn tại chưa?
2. **Page Object**: `src/pages/<module>/<module>.page.ts` — có method cần dùng chưa?
3. **Locator**: `src/locators/<module>/<module>.locators.ts` — có LocatorSpec cần dùng chưa?
4. **Fixture**: Cần `src/fixtures/<module>.fixture.ts` riêng hay dùng `src/fixtures/test.ts`?
5. **Test data**: Đã có trong `data_testcase_mapping.md`? Cần `uniqueSuffix()`?

### Step 3 — Locator Package Integration

**Nếu đã có locator package từ workflow 01c:**

```text
Đọc: inputs/locator_packages/<module>/locator_package.md
KHÔNG đọc package của module khác.
```

Từ package, copy sang `src/locators/<module>/<module>.locators.ts` theo format `LocatorSpec`:

```typescript
// inputs/locator_packages/recruitment/locator_package.md có:
// btn_add = page.getByRole('button', { name: 'Add' })

// → Convert sang LocatorSpec trong locators file:
export const recruitmentLocators = {
  addButton: {
    strategy: 'role',
    role: 'button',
    name: 'Add',
    description: 'Add button on recruitment list'
  } satisfies LocatorSpec,
};
```

**Nếu chưa có locator package:**
- Flag: `LOCATOR_MISSING: <element_id>` — không đoán
- Escalate sang `playwright-mcp-investigator` hoặc yêu cầu chạy lại 01c

### Step 4 — Generate/Update Page Object

Chỉ tạo/sửa file trong framework thật:

```text
FRAMEWORK_ROOT/src/locators/<module>/<module>.locators.ts   (update nếu có LocatorSpec mới)
FRAMEWORK_ROOT/src/pages/<module>/<module>.page.ts           (tạo/update method)
FRAMEWORK_ROOT/src/fixtures/<module>.fixture.ts              (tạo nếu cần page riêng)
FRAMEWORK_ROOT/tests/generated/<module>/<tc-id>.generated.spec.ts  (tạo spec)
```

**KHÔNG tạo:**
```text
FRAMEWORK_ROOT/features/     ← KHÔNG TẠO
FRAMEWORK_ROOT/tests/steps/  ← KHÔNG TẠO
*.feature                    ← KHÔNG TẠO
```

### Step 5 — Page Object Method Convention

```typescript
// src/pages/<module>/<module>.page.ts
export class ModulePage extends BasePage {
  // Locator getters — từ catalog
  get saveButton() { return this.by(moduleLocators.saveButton); }
  get nameInput()  { return this.by(moduleLocators.nameInput); }

  /**
   * Fill name field.
   * Used for: TC_MODULE_001, TC_MODULE_003
   */
  async fillName(name: string): Promise<void> {
    await this.clearAndFill(this.nameInput, name);
  }

  /**
   * Submit form and wait for success.
   * Used for: TC_MODULE_001, TC_MODULE_002
   */
  async save(): Promise<void> {
    await this.saveButton.click();
    await expect(this.successToast).toBeVisible();
  }
}
```

### Step 6 — Spec Generation

**Nguyên tắc cốt lõi (BẮT BUỘC đọc trước khi code):**

> ❌ **KHÔNG** gộp nhiều TC vào 1 `test()` dùng `test.step()` lồng nhau.
> ✅ **Mỗi TC = 1 `test()` riêng biệt** trong cùng 1 `test.describe.serial()` (nếu có data dependency).

**Pattern chuẩn — Multiple TC trong 1 spec file:**

```typescript
/**
 * GENERATED SPEC
 * Module : module-name
 * Generated: 2026-05-08
 */
import { test, expect } from '@fixtures/<module>.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';

// Dùng serial() khi các TC chia sẻ biến data ở describe scope
test.describe.serial('@generated @<module> <Feature>', () => {
  // Biến shared chỉ dùng khi TC phụ thuộc nhau theo nghiệp vụ
  const recordName = 'Record ' + uniqueSuffix('<tc-prefix>');
  const editedName = recordName + ' Updated';

  test.beforeEach(async ({ loginPage }) => {
    const admin = users.admin;
    await loginPage.open();
    await loginPage.login(admin.username, admin.password);
    await loginPage.page.waitForURL(/dashboard/);
  });

  // TC 1: Validation (không cần pre-data)
  test('TC_MODULE_03 - Validate empty input shows error', async ({ modulePage, evidence }) => {
    await evidence.runtime();
    await test.step('Navigate to module', async () => { await modulePage.open(); });
    await test.step('Submit empty form', async () => {
      await modulePage.addButton.click();
      await modulePage.fillForm('');
      await modulePage.save();
    });
    await test.step('Verify validation error', async () => {
      await expect(modulePage.errorMessage).toBeVisible();
      await evidence.screenshot('validation-error');
      await modulePage.cancel();
    });
  });

  // TC 2: Create (tạo data được dùng lại bởi các TC sau qua biến shared)
  test('TC_MODULE_01 - Create record successfully', async ({ modulePage, evidence }) => {
    await evidence.runtime();
    await test.step('Navigate to module', async () => { await modulePage.open(); });
    await test.step('Fill form and save', async () => {
      await modulePage.addButton.click();
      await modulePage.fillForm(recordName);
      await modulePage.save();
    });
    await test.step('Verify created in grid', async () => {
      await expect(modulePage.successToast).toBeVisible();
      expect(await modulePage.isRecordVisible(recordName)).toBeTruthy();
      await evidence.screenshot('create-success');
    });
  });

  // TC 3: Edit (reuse recordName từ TC_01)
  test('TC_MODULE_05 - Edit record successfully', async ({ modulePage, evidence }) => {
    await evidence.runtime();
    await test.step('Navigate to module', async () => { await modulePage.open(); });
    await test.step('Edit record', async () => {
      await modulePage.editRecord(recordName);
      await modulePage.fillForm(editedName);
      await modulePage.save();
    });
    await test.step('Verify updated', async () => {
      await expect(modulePage.successToast).toBeVisible();
      expect(await modulePage.isRecordVisible(editedName)).toBeTruthy();
      await evidence.screenshot('edit-success');
    });
  });

  // TC 4: Delete (reuse editedName từ TC_05)
  test('TC_MODULE_06 - Delete record successfully', async ({ modulePage, evidence }) => {
    await evidence.runtime();
    await test.step('Navigate to module', async () => { await modulePage.open(); });
    await test.step('Delete record', async () => { await modulePage.deleteRecord(editedName); });
    await test.step('Verify deleted', async () => {
      await expect(modulePage.successToast).toBeVisible();
      expect(await modulePage.isRecordVisible(editedName)).toBeFalsy();
      await evidence.screenshot('delete-success');
    });
  });
});
```

**Khi TC hoàn toàn độc lập (isolated data) — pattern tốt hơn:**

```typescript
// Mỗi TC tự setup và teardown data riêng
test('TC_MODULE_05 - Edit record successfully', async ({ modulePage, evidence }) => {
  await evidence.runtime();
  const ownRecord = 'Record ' + uniqueSuffix('edit-tc05');

  await test.step('Pre-condition: Create own record', async () => {
    await modulePage.open();
    await modulePage.addButton.click();
    await modulePage.fillForm(ownRecord);
    await modulePage.save();
    await expect(modulePage.successToast).toBeVisible();
  });

  const editedRecord = ownRecord + ' Updated';
  await test.step('Edit record', async () => {
    await modulePage.editRecord(ownRecord);
    await modulePage.fillForm(editedRecord);
    await modulePage.save();
  });

  await test.step('Verify updated', async () => {
    await expect(modulePage.successToast).toBeVisible();
    expect(await modulePage.isRecordVisible(editedRecord)).toBeTruthy();
    await evidence.screenshot('edit-success');
  });

  await test.step('Teardown: cleanup', async () => {
    await modulePage.deleteRecord(editedRecord);
  });
});
```

### Step 7 — Traceability Requirements

- **Spec title**: Phải có TC ID: `'TC_MODULE_001 - <title>'`
- **describe tag**: `@generated @<module>` bắt buộc
- **Page method docstring**: `Used for: TC_MODULE_001` trong JSDoc
- **evidence.runtime()**: BẮT BUỘC ở đầu mỗi test

### Step 8 — Self Review

Trước khi lưu, kiểm tra:
- [ ] Không `page.locator(...)` inline trong spec
- [ ] Import từ `@fixtures/test` hoặc `@fixtures/<module>.fixture`
- [ ] Không `waitForTimeout`
- [ ] Không hardcode credentials/URL/token
- [ ] Có `evidence.runtime()` ở đầu mỗi test
- [ ] Có TC ID trong tên test
- [ ] Data unique dùng `uniqueSuffix()`
- [ ] **Mỗi TC là 1 `test()` độc lập — KHÔNG gộp nhiều TC vào 1 test**
- [ ] **Nếu TC có dependency data → dùng `test.describe.serial()`**
- [ ] **Nếu TC hoàn toàn độc lập → tự setup + teardown data riêng trong từng test**
- [ ] **KHÔNG tóm tắt nhiều TC trong tên `describe` theo kiểu `TC_CRUD - Tạo, Edit, Xóa`**

---

## Outputs

```text
production_artifacts/automation_design/framework_mapping.md
production_artifacts/generation_state/<module>/<state_id>/STATE_GENERATION_SUMMARY.md
```

Và source code tạo/sửa trực tiếp trong `FRAMEWORK_ROOT`:
- `src/locators/<module>/<module>.locators.ts`
- `src/pages/<module>/<module>.page.ts`
- `src/fixtures/<module>.fixture.ts` (nếu cần)
- `tests/generated/<module>/<tc-id>.generated.spec.ts`
