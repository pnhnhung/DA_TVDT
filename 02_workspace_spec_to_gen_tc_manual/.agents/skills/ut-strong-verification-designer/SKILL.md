---
name: ut-strong-verification-designer
description: Sinh UT manual testcase với verification mạnh cho field, validation, local business rule, local permission, local persistence/display.
---

# UT Strong Verification Designer

## Goal
Tăng chất lượng UT manual testcase để đủ bắt lỗi ở phạm vi nhỏ trước khi sinh IT/automation.

## Instructions
1. Đọc field_rules, business_rules, error_messages, role matrix, manual_scope, coverage_plan.
2. Với mỗi field/rule/action P1/P2 được chọn, xác định verification type:
   - required
   - data type
   - valid/invalid partition
   - min/max/boundary
   - precision/scale/rounding
   - lookup existing/non-existing
   - unique/duplicate
   - cross-field dependency
   - default value
   - readonly/disabled/hidden
   - error message
   - local persistence/display
   - local permission
3. Sinh testcase atomic.
4. Không sinh rule không có evidence; ghi gap.
5. Tạo matrix để review coverage.
6. Đảm bảo đã verify các field với giá trị valid, invalid
7. Đảm bảo đầy đủ các case normal, abnormal, boundary, error message
8. Đảm bảo đầy đủ các case permission, ACL, role, workflow, state machine
9. Đảm bảo đầy đủ các case business rule, validation, dependency
10. Đảm bảo đầy đủ các case persistence, display, UI, UX
11. Data test được chỉ định cụ thể trong testcase, không mô tả chung chung
ví dụ: nhập email format hợp lệ: testuser@example.com, 
nhập email format không hợp lệ: testuser@example, [EMAIL_ADDRESS], testuser@example.com@domain.com

Nếu data test thay đổi theo biến thì cần chỉ định format dự kiến:
ví dụ: username_{random_number} với random_number là số ngẫu nhiên từ 1 đến 1000
ví dụ: job_title_{timestamp} với timestamp là thời gian hiện tại
ví dụ: employee_id_{sequence} với sequence là số thứ tự từ 1 đến 1000
12. Chống gộp Testcase: KHÔNG ĐƯỢC gộp các thực thể/tab có logic giống nhau vào chung một bộ testcase đại diện. Phải tạo testcase độc lập cho mọi Endpoint/UI Screen (ví dụ: tạo riêng bộ test CRUD cho Skill, riêng bộ CRUD cho Education...).


## Required Outputs
- `production_artifacts/testcases/UT/module_<module_name>/ut_manual_testcases.csv`
- `production_artifacts/testcases/UT/module_<module_name>/ut_verification_matrix.csv`
- **BẮT BUỘC:** Tuân thủ chuẩn CSV tại [common.md](file:///.agents/rules/common.md) (Encoding UTF-8 no BOM, Quoting...).

## Tham Chiếu Rule
- **Rule 03** (`03-test-design-principles.md`) — Section 3.4 UT Strong Verification: 12 chiều verification bắt buộc theo thứ tự ưu tiên.
- **Rule 03** Section 3.2 — Field Validation Depth: field rủi ro cao cần xử lý đặc biệt.
- **Rule 07** (`07-review-and-readiness.md`) — Automation Readiness: tất cả UT oracle STRONG/ACCEPTABLE → `READY`.

