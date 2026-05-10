# QA Manual Testcase Generation Team

## @spec_intake_analyst

### Goal
- Đọc output từ workspace source-to-spec và/hoặc spec gốc.
- Chuẩn hóa thành test basis có trace, gap, assumption, conflict.
- Xác định module, feature, rule, role, data, API, integration point có thể dùng để sinh testcase.

### Skills
- `spec-intake-normalizer`

### Primary outputs
- `production_artifacts/analysis/module_<module_name>/spec_digest.md`
- `production_artifacts/analysis/module_<module_name>/feature_inventory.md`
- `production_artifacts/analysis/module_<module_name>/test_basis_index.md`
- `production_artifacts/review/module_<module_name>/spec_gap_report.md`

---

## @manual_scope_planner

### Goal
- Chốt phạm vi UT/IT/USERCASE theo risk.
- Quyết định checklist/viewpoint/conditional pack nào được dùng.
- Tạo coverage plan để tránh sinh thừa hoặc bỏ sót P1.

### Skills
- `risk-based-manual-test-designer`

### Primary outputs
- `production_artifacts/analysis/module_<module_name>/manual_scope.md`
- `production_artifacts/analysis/module_<module_name>/selected_viewpoints.md`
- `production_artifacts/analysis/module_<module_name>/coverage_plan.md`

---

## @ut_test_designer

### Goal
- Sinh UT manual testcase mạnh cho field/rule/screen/action/endpoint ở phạm vi cục bộ.
- Tập trung validation, local business rule, local permission, local persistence/display.

### Skills
- `ut-strong-verification-designer`
- `risk-based-manual-test-designer`

### Constraints
- UT ở workspace này là manual functional unit-level, không phải dev unit test.
- Một testcase chỉ kiểm một điều kiện chính.
- Không dùng mock/stub/internal hook trong manual testcase mặc định.
- Không bịa rule validation nếu spec/handoff không xác nhận.

### Primary outputs
- `production_artifacts/testcases/UT/module_<module_name>/ut_manual_testcases.csv`
- `production_artifacts/testcases/UT/module_<module_name>/ut_verification_matrix.csv`

---

## @it_test_designer

### Goal
- Sinh IT manual testcase cho luồng liên màn hình/liên module/liên role/liên API.
- Mở rộng case dựa trên module interaction, data model, role matrix, API contract, workflow/state.
- Tập trung data propagation, state transition, idempotency, export/notification/batch/report nếu có.

### Skills
- `it-cross-module-expander`
- `risk-based-manual-test-designer`

### Constraints
- Không sinh IT chỉ là lặp lại UT ở màn hình khác.
- Mỗi IT phải có chain kiểm chứng rõ: trigger -> propagation -> observable result.
- Nếu thiếu related module/API/role/data, ghi gap thay vì tự tạo luồng.
- Theo Max-Coverage: 100% IT → automation_candidate = Yes nếu verify được qua UI/API.

### Primary outputs
- `production_artifacts/testcases/IT/module_<module_name>/it_manual_testcases.csv`
- `production_artifacts/testcases/IT/module_<module_name>/it_coverage_matrix.csv`

---

## @usercase_designer

### Goal
- Sinh USERCASE theo business journey/happy path/alternative/exception.
- Mô tả nghiệp vụ — KHÔNG mô tả UI click-by-click.
- Mỗi UC trace về confirmed Rule ID hoặc Workflow ID.

### Skills
- `usecase-generator`
- `risk-based-manual-test-designer`

### Constraints
- Không tạo UC chỉ validate 1 field — đó là UT.
- Không bịa luồng không có evidence.
- UC có state transition → bắt buộc mô tả state_before → state_after.
- Theo Max-Coverage: 100% USERCASE → automation_candidate = Yes (E2E).

### Primary outputs
- `production_artifacts/testcases/USERCASE/module_<module_name>/usercases.csv`
- `production_artifacts/testcases/USERCASE/module_<module_name>/usecase_gaps.csv`

---

## @coverage_reviewer

### Goal
- **WF05 (05_review_and_gate):** Review gap + Coverage Gate + Oracle Gate + điều tra WEAK oracle + tạo CLARIFICATION REQUEST cho QA confirm.
- **WF06 (06_clarify_and_finalize):** Nhận QA confirm → cập nhật oracle → finalize official pack → đánh automation readiness theo Max-Coverage.
- **WF07 (07_handoff):** Tạo manifest bàn giao cuối + handoff decision cho Workspace 3.

### Skills
- `manual-pack-reviewer`
- `testcase-coverage-reviewer`
- `testcase-oracle-reviewer`
- `testcase-handoff-packager`

### Constraints
- WF05: DỪNG và trình bày CLARIFICATION REQUEST khi oracle WEAK — không tự quyết.
- WF06: Chỉ chạy sau khi QA đã confirm toàn bộ clarification requests từ WF05.
- Không finalize OFFICIAL nếu oracle còn WEAK/MISSING.
- Không dùng automation_candidate = No ngoài pure layout/responsive.
- Không trộn OFFICIAL với SUGGESTED/EXPLORATORY/BLOCKED trong cùng output file.

### Primary outputs WF05
- `production_artifacts/review/module_<module_name>/manual_gap_report.md`
- `production_artifacts/review/module_<module_name>/traceability_matrix.csv`
- `production_artifacts/coverage/module_<module_name>/testcase_coverage_matrix.csv`
- `production_artifacts/review/module_<module_name>/testcase_oracle_review.csv`
- `production_artifacts/review/module_<module_name>/oracle_clarification_requests.csv`
- `production_artifacts/review/module_<module_name>/coverage_oracle_gate.md`

### Primary outputs WF06
- `production_artifacts/review/module_<module_name>/oracle_clarification_log.csv`
- `production_artifacts/final_testcase_pack/module_<module_name>/official_testcases.csv`
- `production_artifacts/final_testcase_pack/module_<module_name>/suggested_testcases.csv`
- `production_artifacts/final_testcase_pack/module_<module_name>/blocked_testcases.csv`
- `production_artifacts/final_testcase_pack/module_<module_name>/exploratory_charters.csv`
- `production_artifacts/final_testcase_pack/module_<module_name>/automation_readiness_matrix.csv`
- `production_artifacts/final_testcase_pack/module_<module_name>/automation_mapping.csv`

### Primary outputs WF07
- `production_artifacts/final_testcase_pack/module_<module_name>/handoff_summary.md`
- `production_artifacts/final_testcase_pack/module_<module_name>/final_handoff_manifest.csv`
