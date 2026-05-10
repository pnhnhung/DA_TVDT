---
name: spec-intake-normalizer
description: Chuẩn hóa output từ workspace source-to-spec và/hoặc spec gốc thành test basis có trace để sinh testcase manual.
---

# Spec Intake Normalizer

## Goal
Biến tài liệu đầu vào thành artifact ngắn gọn, có trace, dùng được ngay cho manual testcase generation.

## Input Priority
1. `inputs/source_to_spec_handoff/modules/<module_name>/` (đọc theo thứ tự: `handoff/` → `phase2_rules/` → `phase1_scan/` → `phase3_describe/`)
2. `inputs/spec_curated/module_<module_name>/`
3. `inputs/spec_inbox/module_<module_name>/`
4. curated checklist/viewpoint

## Mapping file cũ → file mới trong cấu trúc handoff

| File cũ (flat) | File mới (cấu trúc mới) |
|---|---|
| `field_rules.csv` | `phase2_rules/field_rules.csv` |
| `business_rules.md` | `phase2_rules/business_rules.md` |
| `workflows_and_state_transitions.md` | `phase2_rules/state_transitions.md` |
| `roles_permissions_matrix.csv` | `phase2_rules/permissions.csv` |
| `api_contracts.md` / integration | `phase2_rules/integration_points.md` |
| `error_messages_and_validations.csv` | `handoff/rule_catalog.csv` (field có error message) |
| `assumptions_and_gaps.md` | `phase2_rules/gaps.md` + `handoff/gaps_and_questions.csv` |
| `handoff_manifest.md` | `handoff/readiness_report.csv` + `handoff/module_spec_overview.md` |
| Module scope / feature list | `phase1_scan/module_scope.md` + `phase1_scan/feature_list.csv` |
| Entity / data model | `phase1_scan/entity_map.csv` |
| Business context / user stories | `phase3_describe/business_context.md` + `phase3_describe/user_stories.md` |
| `global/data_model_map.md` | `modules/global/data_model_map.md` |

## Instructions
1. Đọc `inputs/source_to_spec_handoff/modules/<module_name>/` trước nếu có.
2. Ưu tiên đọc `handoff/` folder trước: `module_spec_overview.md` → `rule_catalog.csv` → `readiness_report.csv`.
3. Sau đó đọc `phase2_rules/` để lấy field rules, business rules, state transitions, permissions.
4. Đọc `phase1_scan/` để lấy module scope, feature list, entity map.
5. Đọc `phase3_describe/` để lấy business context và user stories.
6. Nếu không có handoff, đọc `inputs/spec_inbox/module_<module_name>/` và tạo spec digest.
7. Tách theo `module_<module_name>`.
8. Trích rõ: feature/module, screen, field, field rule, business rule, workflow/state, role/permission, API, integration, data object, module interaction, gap/assumption/conflict.
9. Tạo `test_basis_index.md` để các workflow sau trace chính xác.
10. Không viết testcase chi tiết ở bước này.

## Required Outputs
- `production_artifacts/analysis/module_<module_name>/spec_digest.md`
- `production_artifacts/analysis/module_<module_name>/feature_inventory.md`
- `production_artifacts/analysis/module_<module_name>/test_basis_index.md`
- `production_artifacts/review/module_<module_name>/spec_gap_report.md`
- `inputs/spec_curated/module_<module_name>/spec_digest_current.md`
