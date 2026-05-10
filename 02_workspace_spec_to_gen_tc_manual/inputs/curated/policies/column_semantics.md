# Column Semantics

## checklist_refined.csv
- `input_id`: định danh item dùng để trace testcase
- `source_layer`: lớp dự kiến UT/IT theo dữ liệu gốc
- `theme`: nhóm logic
- `normalized_logic`: mô tả logic đã được làm sạch
- `priority`: P1/P2/P3 sau khi đánh giá rủi ro
- `must_verify_if_applicable`: nếu feature có tồn tại thì phải verify
- `risk_domain`: domain rủi ro chính
- `antigravity_usage`: gợi ý nên dùng cho UT hay IT

## core_manual_input.csv
- `vp_id`: định danh viewpoint cốt lõi
- `priority`: mức ưu tiên sau risk review
- `mandatory_if_applicable`: nếu feature tồn tại thì phải có coverage
- `risk_domain`: nhóm rủi ro
- `decision_reason`: lý do giữ lại trong manual input

## conditional_packs.csv
Chỉ dùng khi project thực sự có feature tương ứng, ví dụ:
- map/geolocation
- payment
- device capability
- mobile-only behavior
- security policy đặc thù

## rule_skill_candidates.csv
Không dùng như input mặc định.
Dùng để nuôi rule/skill về heuristic thiết kế test.
