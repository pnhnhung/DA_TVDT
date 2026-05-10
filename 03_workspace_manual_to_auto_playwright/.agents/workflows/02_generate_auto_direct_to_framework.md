---
description: Map testcase vào framework và generate automation code trực tiếp vào framework thật theo state.
---

# /02_generate_auto_direct_to_framework

## Mục tiêu

Sinh source automation trực tiếp vào framework thật, theo state nhỏ, có mapping và traceability rõ.

## Agent / Skill / Rule

| Thành phần | Sử dụng |
|---|---|
| Agent | `@playwright_ts_pom_generator` |
| Skill chính | `playwright-ts-pom-generator` |
| Skill hỗ trợ | `playwright-mcp-investigator` nếu thiếu locator/runtime evidence |
| Rules bắt buộc | `00-common-governance.md`, `01-framework-contract-and-reuse.md`, `02-scope-state-readiness.md`, `03-test-data-first.md`, `04-locator-and-mcp.md`, `05-playwright-ts-native.md` |

## Input

```text
FRAMEWORK_ROOT
production_artifacts/automation_scope/automation_scope.csv
production_artifacts/automation_design/automation_ready_testcases.md
production_artifacts/automation_design/state_plan.md
production_artifacts/automation_design/framework_contract.md
production_artifacts/automation_design/reuse_inventory.md
inputs/app_context/ nếu có
```

Mặc định:

```text
FRAMEWORK_ROOT = inputs/framework_inbox/source-automation-fw/playwright-typescript
```

## Thực hiện

### 1. Chọn state

- Chỉ xử lý state user chỉ định.
- Chỉ code testcase `AUTO_READY` hoặc `AUTO_WITH_CONDITION` đã xử lý xong điều kiện.
- Không code `MANUAL_ONLY` hoặc `BLOCKED`.

### 2. Mapping vào framework

Với từng testcase:

1. Xác định test spec file (`tests/generated/<module>/<tc-id>.generated.spec.ts`) phù hợp.
2. Tìm Page Object method trong `src/pages/<module>/` có thể reuse.
3. Tìm locator entry trong `src/locators/<module>/` có thể reuse.
4. Xác định target files sẽ tạo/sửa.
5. Ghi mapping trước hoặc trong `framework_mapping.md`.

### 3. Data-first

Bắt buộc xác định:

- Data nào cần tồn tại.
- Data nào cần tạo mới.
- Data nào unique.
- Data nào phụ thuộc module khác.
- Verify bằng UI/API/DB nào.
- Cleanup/idempotent strategy.

Không dùng sample data nếu chưa verify tồn tại.

### 4. Locator

- Không đoán locator.
- Nếu input không đủ xác định locator, dùng MCP Playwright/browser investigation.
- Locator phải bám rule locator strategy.

### 5. Generate trực tiếp vào framework

Chỉ sửa/tạo file trong framework thật:

```text
FRAMEWORK_ROOT/src/locators/<module>/<module>.locators.ts
FRAMEWORK_ROOT/src/pages/<module>/<module>.page.ts
FRAMEWORK_ROOT/src/fixtures/<module>.fixture.ts  (nếu cần)
FRAMEWORK_ROOT/tests/generated/<module>/<tc-id>.generated.spec.ts
```

KHÔNG tạo:
```text
FRAMEWORK_ROOT/features/          ← KHÔNG TẠO
FRAMEWORK_ROOT/tests/steps/       ← KHÔNG TẠO
*.feature                          ← KHÔNG TẠO
```

Không dùng `production_artifacts/code_drafts/` làm nguồn chính.

### 6. State report và dừng

Sau khi generate xong state, tạo summary và dừng chờ user xác nhận trước khi sang state tiếp theo.

## Output bắt buộc

```text
production_artifacts/automation_design/framework_mapping.md
production_artifacts/generation_state/<module>/<state_id>/STATE_GENERATION_SUMMARY.md
```

Và source code đã tạo/sửa trực tiếp trong `FRAMEWORK_ROOT`.

## Quality gate

- Không duplicate spec/page/locator.
- Không hardcode secret/account/password/token/base_url.
- Không `waitForTimeout`.
- Không locator chưa verify.
- Không data pre-condition chưa verify.
- Import từ `@fixtures/test` hoặc `@fixtures/<module>.fixture` — không từ `@playwright/test`.
- Mỗi testcase trace được từ manual testcase ID đến spec file / page method / kết quả execute.
