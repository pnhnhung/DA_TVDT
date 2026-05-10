---
description: Nhận QA confirm từ WF05 → cập nhật oracle → finalize official pack → đánh dấu automation readiness theo Max-Coverage strategy. Gộp WF06 + WF09 + WF10.
---

# /06_clarify_and_finalize

## Agent
- `@coverage_reviewer`
- `@final_testcase_gatekeeper`

## Required Skills
- `testcase-oracle-reviewer`
- `testcase-handoff-packager`

## Điều kiện chạy

Workflow này chỉ được chạy khi:
- WF05 đã hoàn tất
- Tất cả `oracle_clarification_requests.csv` đã được QA xác nhận

## Input
- `production_artifacts/review/module_<module_name>/oracle_clarification_requests.csv` (đã có QA confirm)
- `production_artifacts/testcases/UT/module_<module_name>/ut_manual_testcases.csv`
- `production_artifacts/testcases/IT/module_<module_name>/it_manual_testcases.csv`
- `production_artifacts/testcases/USERCASE/module_<module_name>/usercases.csv`
- `production_artifacts/review/module_<module_name>/testcase_oracle_review.csv`
- `production_artifacts/coverage/module_<module_name>/testcase_coverage_matrix.csv`

---

## Sub-step 1 — Cập nhật Oracle từ QA Confirm

Đọc `oracle_clarification_requests.csv`, ghi nhận lựa chọn QA (Option A/B/C) cho mỗi TC:

- Nâng oracle từ WEAK/MISSING → STRONG hoặc ACCEPTABLE
- Cập nhật Expected Result trong TC tương ứng
- Ghi log vào `oracle_clarification_log.csv`:

```text
production_artifacts/review/module_<module_name>/oracle_clarification_log.csv
```

Format log:
```csv
tc_id,original_oracle,original_expected_result,qa_selected_option,new_expected_result,new_oracle_level,confirmed_by,confirmed_at
```

---

## Sub-step 2 — Finalize TC Pack

Phân loại và tạo các file output theo từng nhóm:

### official_testcases.csv
Chỉ đưa TC vào khi **TẤT CẢ** các điều kiện sau đều đúng:
- Testcase Class = OFFICIAL
- Có Related Rule ID
- Oracle = STRONG hoặc ACCEPTABLE (kể cả TC vừa được nâng từ WEAK qua QA confirm)
- Có precondition rõ ràng
- Có test data rõ ràng (không để chung chung)
- Có steps rõ ràng

Columns:
```csv
tc_id,title,level,priority,related_rule_id,oracle_level,precondition,test_data,steps,expected_result,tc_class,source_trace
```

### suggested_testcases.csv
TC có behavior hữu ích nhưng chưa confirmed từ spec, hoặc QA chưa xác nhận được option nào.

### blocked_testcases.csv
TC không thể finalize sau khi đã điều tra đầy đủ (browser recon + source code + QA confirm đều không xác định được behavior).

Format:
```csv
blocked_tc_id,related_rule_id,missing_information,question_for_team,impact
```

### exploratory_charters.csv
Ý tưởng test dựa trên risk, không trace trực tiếp tới confirmed rules.

---

## Sub-step 3 — Automation Readiness Matrix (Max-Coverage)

### Chiến lược Max-Coverage bắt buộc

```
UT:
  READY       → tất cả UT đã STRONG/ACCEPTABLE oracle
  MANUAL_ONLY → CHỈ áp dụng cho pure layout/responsive breakpoint
                Không áp dụng vì "rủi ro thấp" hay "P3"

IT:
  READY       → 100% IT có thể verify được qua UI/API
  MANUAL_ONLY → không áp dụng cho IT

USERCASE:
  READY       → 100% USERCASE (E2E test)
  MANUAL_ONLY → không áp dụng cho USERCASE
```

### Định nghĩa Pure Layout (loại duy nhất được MANUAL_ONLY)

> Testcase CHỈ kiểm tra: màu sắc, font size, padding/margin, icon position,
> responsive breakpoint, mobile layout — và KHÔNG liên quan đến
> business logic, validation rule, data display, state, hoặc permission.

### Automation Layer gợi ý

```text
UI     → case có interaction rõ ràng, verify qua màn hình
API    → case có thể verify qua HTTP response trực tiếp, không cần UI
Mixed  → cần kết hợp cả UI và API để verify đầy đủ
```

### Readiness status

```text
READY              → sẵn sàng automate ngay, không blocker
NEED_TEST_DATA     → cần chuẩn bị test data (file, user account, seed data)
NEED_LOCATOR       → cần build page object / locator trước
NEED_ENV_SETUP     → cần setup environment (permission, config, role)
BLOCKED            → không thể automate vì dependency ngoài tầm kiểm soát
MANUAL_ONLY        → chỉ dành cho pure layout/responsive (xem định nghĩa trên)
```

Output:
```text
production_artifacts/final_testcase_pack/module_<module_name>/automation_readiness_matrix.csv
```

Format:
```csv
tc_id,title,level,priority,automation_readiness,automation_layer,blocker,required_test_data,required_page_objects,required_env_setup,execution_order,notes
```

---

## Sub-step 4 — Automation Mapping

Tổng hợp dependency để Workspace 3 có thể bắt đầu implement:

```text
production_artifacts/final_testcase_pack/module_<module_name>/automation_mapping.csv
```

Format:
```csv
tc_id,automation_layer,page_objects_needed,test_data_needed,roles_accounts_needed,depends_on_tc,reusable_components,execution_order_group
```

**Execution order groups (risk-based):**
```text
Group 1: P1 IT (integration, critical flow)
Group 2: P1 UT (validation, required fields, permission)
Group 3: P2 UT (boundary, edge case)
Group 4: USERCASE (E2E journey)
Group 5: P2 IT
```

---

## Output tổng hợp WF06

```text
production_artifacts/review/module_<module_name>/oracle_clarification_log.csv
production_artifacts/final_testcase_pack/module_<module_name>/official_testcases.csv
production_artifacts/final_testcase_pack/module_<module_name>/suggested_testcases.csv
production_artifacts/final_testcase_pack/module_<module_name>/blocked_testcases.csv
production_artifacts/final_testcase_pack/module_<module_name>/exploratory_charters.csv
production_artifacts/final_testcase_pack/module_<module_name>/automation_readiness_matrix.csv
production_artifacts/final_testcase_pack/module_<module_name>/automation_mapping.csv
```
