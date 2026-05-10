---
description: Chốt phạm vi manual testcase theo risk trước khi generate UT/IT/USERCASE.
---

# /01_prepare_manual_scope

## Agent
- `@manual_scope_planner`

## Required Skills
- `risk-based-manual-test-designer`

## Input
- `production_artifacts/analysis/module_<module_name>/spec_digest.md`
- `production_artifacts/analysis/module_<module_name>/feature_inventory.md`
- `production_artifacts/analysis/module_<module_name>/test_basis_index.md`
- `production_artifacts/review/module_<module_name>/spec_gap_report.md`
- `inputs/curated/checklists/checklist_refined.csv`
- `inputs/curated/viewpoints/core_manual_input.csv`
- `inputs/curated/viewpoints/conditional_packs.csv`

## Do this
1. Xác định scope theo module.
2. Chọn P1 bắt buộc nếu feature tồn tại.
3. Chọn P2 liên quan trực tiếp đến change scope/risk.
4. Chỉ kích hoạt conditional pack nếu feature có evidence.
5. Map mỗi rule/feature sang level: UT, IT, USERCASE hoặc nhiều level nếu cần.
6. Tạo coverage plan để workflow 02/03/04 sử dụng.

## Output
- `production_artifacts/analysis/module_<module_name>/manual_scope.md`
- `production_artifacts/analysis/module_<module_name>/selected_viewpoints.md`
- `production_artifacts/analysis/module_<module_name>/coverage_plan.md`
