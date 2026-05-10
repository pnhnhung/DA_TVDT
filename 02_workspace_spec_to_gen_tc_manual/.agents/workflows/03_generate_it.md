---
description: Sinh IT manual testcase mở rộng cho cross-screen/cross-module/cross-role/data propagation/integration.
---

# /03_generate_it

## Agent
- `@it_test_designer`

## Required Skills
- `it-cross-module-expander`
- `risk-based-manual-test-designer`

## Input
- `production_artifacts/analysis/module_<module_name>/manual_scope.md`
- `production_artifacts/analysis/module_<module_name>/coverage_plan.md`
- `production_artifacts/analysis/module_<module_name>/test_basis_index.md`
- `inputs/source_to_spec_handoff/modules/global/data_model_map.md`
- `inputs/source_to_spec_handoff/modules/<module_name>/phase2_rules/state_transitions.md`
- `inputs/source_to_spec_handoff/modules/<module_name>/phase2_rules/business_rules.md`
- `inputs/source_to_spec_handoff/modules/<module_name>/phase2_rules/permissions.csv`
- `inputs/source_to_spec_handoff/modules/<module_name>/phase2_rules/integration_points.md`
- `inputs/source_to_spec_handoff/modules/<module_name>/handoff/rule_catalog.csv`
- `production_artifacts/testcases/UT/module_<module_name>/ut_manual_testcases.csv`

---

## Do this

1. Đọc UT output để tránh trùng lặp — IT phải có chain tích hợp, không copy UT.
2. Xác định chain kiểm chứng cho mỗi IT: `Trigger → Source module/screen/API → Target module/screen/API → Role liên quan → Data object → State before/after → Observable oracle`.
3. Sinh IT cho các trục sau nếu có evidence từ spec/handoff (tham chiếu **Rule 05 — IT-AXIS checklist**):
   - IT-AXIS-01/02: Happy path & Negative path integration flow chính
   - IT-AXIS-03/04: State transition thuận và ngược
   - IT-AXIS-05/06: Cross-role (allowed và denied)
   - IT-AXIS-07/08: Data propagation source → target
   - IT-AXIS-09/10: Boundary và Duplicate
   - IT-AXIS-11/12: Background job (success và fail/timeout)
   - IT-AXIS-13: Concurrency/Idempotency
   - IT-AXIS-14: Permission unauthenticated
   - IT-AXIS-15: File export/import
   - IT-AXIS-16/17/18: Tenant isolation, Error propagation, Rollback
4. Mở rộng case liên quan dựa trên `module_interaction_map`, `workflow/state`, `role matrix`, `api_contracts`.
5. Tạo IT coverage matrix.

---

## IT Testcase Design Requirements

Mỗi testcase trong `it_manual_testcases.csv` tối thiểu cần có:

| Field | Requirement |
|---|---|
| Testcase ID | Prefix module + nhóm IT (ví dụ: `IT-PIM-001`) |
| Title | Ngắn, rõ chain tích hợp được kiểm tra |
| Level | IT |
| Priority | P1/P2/P3 |
| Related Rule ID | Bắt buộc — trace về Rule ID hoặc integration contract |
| IT-AXIS | IT-AXIS-01 đến IT-AXIS-18 áp dụng |
| Source Module | Module/screen khởi tạo action |
| Target Module | Module/screen nhận impact |
| Roles | Roles tham gia trong chain |
| State Before | Trạng thái trước khi thực thi |
| State After | Trạng thái sau khi thực thi |
| Preconditions | Điều kiện đủ để test integration |
| Test Data | Cụ thể, không chung chung — ghi rõ format nếu dynamic |
| Steps | Các bước cross-module theo đúng chain |
| Expected Result | Observable oracle: UI message / API status / data consistency / side effect |
| Oracle Level | STRONG / ACCEPTABLE |
| Automation Candidate | Yes / Partial |
| Trace | Rule ID / Contract ID / Workflow ID |

---

## Guardrails

- Không copy UT thành IT nếu không có chain tích hợp quan sát được.
- Không bịa related module/API nếu handoff không có evidence.
- Không sinh IT chỉ để kiểm tra 1 field đơn lẻ — đó là UT.
- Theo Max-Coverage: 100% IT → `automation_candidate = Yes` nếu verify được qua UI/API.
- KHÔNG tự cắt P2/P3 IT — ghi note để QA quyết định.
- Khi gặp tình huống không rõ phạm vi (1 module hay nhiều), dừng lại và xác nhận theo common.md.

---

## Output
- `production_artifacts/testcases/IT/module_<module_name>/it_manual_testcases.csv`
- `production_artifacts/testcases/IT/module_<module_name>/it_coverage_matrix.csv`
- **BẮT BUỘC:** Tuân thủ chuẩn CSV tại [common.md](file:///.agents/rules/common.md) (Encoding UTF-8 no BOM, Quoting...).