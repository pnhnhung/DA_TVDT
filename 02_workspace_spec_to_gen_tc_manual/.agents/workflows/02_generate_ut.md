---
description: Sinh UT manual testcase với verification mạnh cho field/rule/screen/action/endpoint cục bộ.
---

# /02_generate_ut

## Agent
- `@ut_test_designer`

## Required Skills
- `ut-strong-verification-designer`
- `risk-based-manual-test-designer`

## Input
- `production_artifacts/analysis/module_<module_name>/manual_scope.md`
- `production_artifacts/analysis/module_<module_name>/coverage_plan.md`
- `production_artifacts/analysis/module_<module_name>/test_basis_index.md`
- `inputs/source_to_spec_handoff/modules/<module_name>/phase2_rules/field_rules.csv`
- `inputs/source_to_spec_handoff/modules/<module_name>/phase2_rules/business_rules.md`
- `inputs/source_to_spec_handoff/modules/<module_name>/phase2_rules/permissions.csv`
- `inputs/source_to_spec_handoff/modules/<module_name>/handoff/rule_catalog.csv`

### Curated viewpoint input
- `curated/viewpoints/README.md`
- `curated/viewpoints/core_manual_input.csv`
- `curated/viewpoints/conditional_packs.csv`
- `curated/viewpoints/rule_skill_candidates.csv`
- `curated/viewpoints/viewpoint_reduction_recommendation.md`


## Viewpoint usage policy

1. `core_manual_input.csv` là viewpoint input mặc định cho UT manual testcase.
2. `conditional_packs.csv` chỉ được dùng khi `manual_scope.md`, `coverage_plan.md`, `test_basis_index.md`, source/spec/handoff xác nhận module có feature/control tương ứng.
3. `rule_skill_candidates.csv` không được dùng như source pack mặc định để sinh testcase trực tiếp. Chỉ dùng để tăng chất lượng heuristic của 2 skill hiện có:
   - `ut-strong-verification-designer`
   - `risk-based-manual-test-designer`
4. Viewpoint không thay thế spec/source/handoff.
5. Không được biến viewpoint thành business rule confirmed nếu spec/source/handoff không xác nhận.
6. Nếu viewpoint gợi ý rủi ro nhưng chưa có evidence, ghi nhận trong `ut_verification_matrix.csv` với trạng thái `Need Clarification` hoặc `Not Confirmed`, không tự bịa testcase như rule đã chắc chắn.
7. Ưu tiên viewpoint theo thứ tự:
   1. Viewpoint core có `priority=P1` và `mandatory_if_applicable=Yes`
   2. Viewpoint conditional có feature được xác nhận
   3. Heuristic từ `rule_skill_candidates.csv` khi phù hợp với field/control/action đã xác nhận

## Do this

1. Xác định UT scope cho field/rule/action/endpoint P1/P2 đã chọn từ `manual_scope.md`, `coverage_plan.md`, `test_basis_index.md`.
2. Load `core_manual_input.csv` và map viewpoint vào các field/rule/action/endpoint tương ứng trong module.
3. Kiểm tra `conditional_packs.csv` và chỉ chọn viewpoint điều kiện khi module thật sự có feature/control tương ứng, ví dụ:
   - password/captcha/security policy
   - import/export
   - notification/OTP/email/SMS
   - report/chart/list/card
   - batch/job/cron
   - map/geolocation
   - payment/mobile/biometric nếu project có dùng
4. Đọc `rule_skill_candidates.csv` như checklist heuristic để tăng độ mạnh của verification, không dùng nó như danh sách testcase bắt buộc.
5. Sinh UT cho field/rule/action P1/P2 đã chọn.
6. Verify mạnh:
   - required/blank/null
   - valid/invalid partition
   - min/max/just below/just above
   - precision/scale/rounding
   - lookup existing/non-existing
   - uniqueness/duplicate
   - cross-field dependency local
   - error message đúng field/nội dung
   - local persistence/display
   - local role/action permission
   - data integrity tại màn hình/list/card/report/chart nếu có evidence hoặc viewpoint core phù hợp
   - submit/action đúng dữ liệu, đúng quyền, đúng trạng thái lưu cục bộ nếu có evidence
7. Mỗi testcase phải atomic, expected result assertable, không gom nhiều rule không liên quan vào cùng testcase.
8. Với testcase được mở rộng từ viewpoint, ghi rõ `Viewpoint ID`, `Viewpoint Source`, `Evidence Status` trong testcase hoặc matrix.
9. Tạo UT verification matrix để chứng minh coverage giữa:
   - test basis
   - field/rule/action
   - viewpoint áp dụng
   - testcase sinh ra
   - trạng thái coverage

## Testcase design requirements

Mỗi testcase trong `ut_manual_testcases.csv` tối thiểu cần có:

| Field | Requirement |
|---|---|
| Testcase ID | Có prefix module và nhóm UT |
| Title | Ngắn, rõ rule/action được kiểm tra |
| Priority | P1/P2/P3 |
| Test Basis | Dẫn về rule/field/action từ handoff/spec/source |
| Viewpoint Reference | `vp_id` nếu testcase được mở rộng bởi viewpoint, nếu không có ghi `N/A` |
| Evidence Status | `Confirmed`, `Viewpoint Suggested`, `Need Clarification`, hoặc `Inferred` |
| Preconditions | Điều kiện đủ để test cục bộ |
| Steps | Ít bước, đúng phạm vi UT |
| Expected Result | Assertable, kiểm tra rõ field/message/state/data |
| Negative/Boundary Type | Required/Blank/Boundary/Permission/Lookup/Duplicate/etc. nếu có |

## UT verification matrix requirements

`ut_verification_matrix.csv` phải có tối thiểu các cột:

```csv
module,scope_item_type,scope_item_name,test_basis_id,test_basis_source,viewpoint_id,viewpoint_source,viewpoint_priority,applicability_status,evidence_status,generated_testcase_id,coverage_status,reason
```

Trong đó:

- `scope_item_type`: `field`, `business_rule`, `validation_rule`, `action`, `endpoint`, `screen_component`
- `viewpoint_source`: `core_manual_input`, `conditional_packs`, `rule_skill_candidates`, hoặc `N/A`
- `applicability_status`: `Applicable`, `Not Applicable`, `Need Clarification`
- `evidence_status`: `Confirmed`, `Viewpoint Suggested`, `Not Confirmed`, `Inferred`
- `coverage_status`: `Covered`, `Partially Covered`, `Not Covered`, `Not Applicable`, `Need Clarification`

## Output
- `production_artifacts/testcases/UT/module_<module_name>/ut_manual_testcases.csv`
- `production_artifacts/testcases/UT/module_<module_name>/ut_verification_matrix.csv`
- Danh sách Test Cases định dạng CSV hoàn chỉnh, sẵn sàng import sang Excel/Jira/TestRail
- Traceability Matrix
- Danh sách Ambiguities đã giải quyết

## Guardrails
- Không bịa rule validation không có trong spec/handoff.
- Không biến viewpoint thành source of truth.
- Không sinh testcase từ `conditional_packs.csv` nếu feature/control tương ứng chưa được xác nhận là có tồn tại.
- Không sinh testcase trực tiếp từ `rule_skill_candidates.csv` như một source pack bắt buộc; chỉ dùng như heuristic cho field/control/action đã xác nhận.
- Không đưa luồng liên màn hình dài vào UT.
- Không đưa IT scenario, E2E scenario hoặc interaction nhiều module vào UT; nếu phát hiện cần IT thì ghi vào matrix với `coverage_status=Need Clarification` hoặc đề xuất chuyển sang IT ở phần ghi chú.
- Khi gọi workflow này cần xác nhận có muốn triển khai full validation hay không rồi mới thực thi.