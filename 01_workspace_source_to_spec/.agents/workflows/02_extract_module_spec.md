---
description: "[Phase 2] Bóc toàn bộ field rules, business rules, state transitions, permissions và integration points từ source."
---

# Workflow 02: /extract_module_spec — Phase 2: Bóc Rules

## Agent
`@rule_extractor`

## Skills
- `source-rule-extractor` — field rules, business rules, state, permissions, integration points
- `data-model-mapper` — nếu cần bổ sung entity/data constraint

## Rules
- `R00-common.md`
- `R01-source-evidence.md`
- `R03-workspace-constraints.md`

## Input
- Phase 1 output: `production_artifacts/modules/{module_id}/phase1_scan/`
- `source-system/` (đọc trực tiếp)

## Steps

### Bước 1 — Field Rules (từ FormRequest/validator/schema)
```
list_dir Requests/Admin/{Module}/ → đọc TỪNG file .php
list_dir Requests/Front/{Module}/ → đọc TỪNG file .php
→ Với mỗi field trong rules(): ghi 1 dòng vào field_rules.csv
→ grep "use App\Rules\" → đọc custom Rule class
→ Ghi conditional rules: required_with, required_if, required_without
```

### Bước 2 — Business Rules (từ Service/UseCase/Domain)
- Đọc Service xử lý logic của module
- Bóc rule create/update/delete/approve
- Bóc calculation, routing, approval, state rule
- Gắn:
  - **Actor**: Ghi rõ là Role hệ thống (Admin, ESS, Supervisor) hay user cần được set quyền cụ thể (ví dụ: "User được cấp quyền X ở màn hình System Roles"). Tránh chỉ ghi tên quyền kỹ thuật mà không giải thích.
  - **Trigger**: Liệt kê TOÀN BỘ các thao tác UI hoặc system event có thể kích hoạt rule này (ví dụ: "Click Save ở màn Add Employee", "Click Save ở màn PIM Data Import", hoặc "Cronjob chạy mỗi đêm"). KHÔNG bỏ sót trigger nào để tránh miss logic test.
  - **Precondition**, **Expected Behavior**, **Side Effect**.

### Bước 3 — State Transitions (nếu có)
- Xác định state field và các trạng thái hợp lệ
- Ghi trigger (mô tả thao tác UI tương ứng) → state before → state after
- Ghi điều kiện transition và actor được phép thực hiện

### Bước 4 — Permissions (từ middleware/policy/route)
- Tìm middleware `roles:X` trên từng route
- Tìm policy/gate check trong Controller/Service
- Ghi rõ: role → action → allow/deny → data scope

### Bước 5 — Integration Points (cross-module)
- Tìm service call, event, job, shared table sang module khác
- Ghi: source module → target module → trigger (thao tác UI gây ra integration) → data → side effect
- Nếu chỉ inferred → đánh dấu rõ

### Bước 6 — Cross-check & Gap
- Mỗi messages() key → có trong field_rules.csv (cột error_message)?
- Mỗi endpoint có middleware → có dòng trong permissions.csv?
- Tất cả gap/conflict → ghi vào gaps.md

## Output (`production_artifacts/modules/{module_id}/phase2_rules/`)

| File | Nội dung | Format |
|---|---|---|
| `field_rules.csv` | Validation rules theo field | CSV |
| `business_rules.md` | Business rules có actor/trigger/result | Markdown |
| `state_transitions.md` | State machine nếu có | Markdown |
| `permissions.csv` | Role/action/allow/deny/data scope | CSV |
| `integration_points.md` | Cross-module contracts | Markdown |
| `gaps.md` | inferred / gap / conflict | Markdown |

## Required Columns

**field_rules.csv**:
```
rule_id, module, screen, field, required, data_type, min, max,
allowed_values, default_value, unique, error_message,
source_trace, status, confidence
```

**permissions.csv**:
```
permission_id, role, module, action, ui_visible, api_allowed,
data_scope, condition, source_trace, status, confidence
```

## Guardrails
- Không suy diễn regex/boundary nếu source không xác nhận.
- Không trộn business rule với integration point.
- Không tự chọn 1 phía khi source conflict → ghi `conflict`.
