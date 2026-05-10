---
description: Đọc source-to-spec handoff/spec và chuẩn hóa thành test basis theo module.
---

# /00_intake_spec

## Agent
- `@spec_intake_analyst`

## Required Skills
- `spec-intake-normalizer`

## Input

### Source-to-Spec Handoff (ưu tiên đọc trước)
- `inputs/source_to_spec_handoff/modules/<module_name>/handoff/module_spec_overview.md`
- `inputs/source_to_spec_handoff/modules/<module_name>/handoff/rule_catalog.csv`
- `inputs/source_to_spec_handoff/modules/<module_name>/handoff/readiness_report.csv`
- `inputs/source_to_spec_handoff/modules/<module_name>/handoff/gaps_and_questions.csv`
- `inputs/source_to_spec_handoff/modules/<module_name>/phase1_scan/module_scope.md`
- `inputs/source_to_spec_handoff/modules/<module_name>/phase1_scan/feature_list.csv`
- `inputs/source_to_spec_handoff/modules/<module_name>/phase1_scan/entity_map.csv`
- `inputs/source_to_spec_handoff/modules/<module_name>/phase2_rules/field_rules.csv`
- `inputs/source_to_spec_handoff/modules/<module_name>/phase2_rules/business_rules.md`
- `inputs/source_to_spec_handoff/modules/<module_name>/phase2_rules/state_transitions.md`
- `inputs/source_to_spec_handoff/modules/<module_name>/phase2_rules/permissions.csv`
- `inputs/source_to_spec_handoff/modules/<module_name>/phase2_rules/integration_points.md`
- `inputs/source_to_spec_handoff/modules/<module_name>/phase3_describe/business_context.md`
- `inputs/source_to_spec_handoff/modules/<module_name>/phase3_describe/user_stories.md`
- `inputs/source_to_spec_handoff/modules/global/data_model_map.md`

### Fallback nếu không có handoff
- `inputs/spec_curated/`
- `inputs/spec_inbox/`
- `inputs/curated/checklists/checklist_refined.csv`
- `inputs/curated/viewpoints/core_manual_input.csv`

## Do this
1. Ưu tiên đọc `inputs/source_to_spec_handoff/modules/<module_name>/` nếu có.
2. Đọc theo thứ tự: `handoff/` → `phase2_rules/` → `phase1_scan/` → `phase3_describe/`.
3. Xác định danh sách module/feature có thể sinh testcase.
4. Tách test basis theo `module_<module_name>`.
5. Trích field rules, business rules, workflows, roles, APIs, integrations, module interactions.
6. Ghi rõ gaps/assumptions/conflicts (tham chiếu `gaps_and_questions.csv` và `phase2_rules/gaps.md`).
7. Gợi ý conditional packs có cần kích hoạt hay không.

## Output
- `production_artifacts/analysis/module_<module_name>/spec_digest.md`
- `production_artifacts/analysis/module_<module_name>/feature_inventory.md`
- `production_artifacts/analysis/module_<module_name>/test_basis_index.md`
- `production_artifacts/review/module_<module_name>/spec_gap_report.md`
- `inputs/spec_curated/module_<module_name>/spec_digest_current.md`

## Guardrails
- Không viết testcase ở bước này.
- Không suy diễn business rule nếu handoff/spec không xác nhận.
