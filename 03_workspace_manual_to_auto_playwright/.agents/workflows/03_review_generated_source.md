---
description: Review source code vừa generate trực tiếp trong framework thật trước khi execute.
---

# /03_review_generated_source

## Mục tiêu

Chặn lỗi rõ ràng trước khi execute: sai convention, duplicate test function/page method, locator yếu, data setup thiếu, assertion yếu, import/fixture risk.

## Agent / Skill / Rule

| Thành phần | Sử dụng |
|---|---|
| Agent | `@generated_source_reviewer` |
| Skill | `generated-source-reviewer` |
| Rules bắt buộc | `00-common-governance.md`, `01-framework-contract-and-reuse.md`, `03-test-data-first.md`, `04-locator-and-mcp.md`, `05-playwright-ts-native.md` |

## Input

```text
FRAMEWORK_ROOT
production_artifacts/generation_state/<module>/<state_id>/STATE_GENERATION_SUMMARY.md
production_artifacts/automation_design/framework_contract.md
production_artifacts/automation_design/framework_mapping.md
production_artifacts/automation_design/automation_ready_testcases.md
inputs/locator_packages/<module>/locator_package.md  ← đối chiếu locator
```

## Thực hiện

Review các file vừa tạo/sửa:

1. Framework alignment: đúng test file path (`tests/generated/<module>/`), Page Object pattern (`src/pages/<module>/<module>.page.ts`), locator catalog (`src/locators/<module>/`), fixture/config/report convention.
2. Anti-pattern check: chạy `npm run validate:ai` trước; kiểm tra `page.locator()` inline, `waitForTimeout`, `test.only`, hardcode credentials, import từ `@playwright/test`.
3. Reuse/duplicate check: không trùng TC ID đã có trong `tests/generated/`, không trùng page method, locator entry.
4. Traceability: TC ID trong tên test, `@generated @<module>` tag, `evidence.runtime()` ở đầu test, JSDoc `Used for: TC_xxx` trong page method.
4b. **Locator Package compliance:** Mọi locator TS trong `src/locators/<module>/` phải có Entry ID tương ứng trong `inputs/locator_packages/<module>/locator_package.md`.
    - Nếu entry không có trong package → flag `LOCATOR_NOT_IN_PACKAGE`
    - Không chấp nhận locator tự đặt/đoán không qua 01c
5. Locator stability và verification evidence.
6. Data-first/pre-condition/unique/dependency strategy.
7. Assertion/oracle strength.
8. List/table search + pagination strategy nếu có.
9. Wait strategy: không `waitForTimeout`, dùng `expect().toBeVisible()`.
10. Config/secret handling.
11. Execute readiness: có `test.describe.skip` wrapper, command scope nhỏ nhất rõ ràng.

## Output bắt buộc

```text
production_artifacts/review/<module>/<state_id>/generated_source_review.md
production_artifacts/review/<module>/<state_id>/review_fix_recommendations.md
```

## Quality gate

- Nếu issue nghiêm trọng, phải fix source trước khi execute.
- Không execute khi review còn lỗi import/syntax/fixture/locator/data rõ ràng.