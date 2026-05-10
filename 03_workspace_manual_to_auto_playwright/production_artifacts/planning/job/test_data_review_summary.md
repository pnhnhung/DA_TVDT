# Test Data Review Summary

## Module
Admin Job

## State
All states (state_job_title, state_pay_grade, state_emp_status, state_job_category, state_work_shift)

## Testcases Covered
25 AUTO_READY testcases.

## Data Reused
- Currency `USD` (dùng cho assign currency to Pay Grade). OrangeHRM mặc định có USD.

## Data Discovered
- N/A (chưa verify trực tiếp trên browser, sẽ verify trong flow execute).

## Data Created
Sẽ tạo data dependency thông qua Pytest fixture (API hoặc UI flow) trước mỗi bài test Edit/Delete/Duplicate để đảm bảo tính độc lập (Idempotent):
- `JOB_TITLE_PRE_01`
- `PAY_GRADE_PRE_01`
- `EMP_STATUS_PRE_01`
- `JOB_CAT_PRE_01`
- `WORK_SHIFT_PRE_01`

## Data Pending / Need Review
Không có blocker.

## Data Mapping Summary
- Các test case tạo mới (Create) sử dụng data sinh động tại runtime (`RUNTIME_*`).
- Các test case (Edit, Delete, Duplicate) sử dụng data dependency tạo từ fixture (`*_PRE_01`).
- Đã mapping đầy đủ trong `data_testcase_mapping.md`.

## Risks
- Fixture tạo pre-condition nếu dùng UI có thể mất thời gian. Đề xuất: Trong framework Pure Pytest, tạo helper function để thực hiện setup pre-condition nhanh. OrangeHRM có thể không có API công khai dễ dùng, nên khả năng cao vẫn setup qua UI helper.

## Recommendation
- Pass review test data, chuyển sang flow `01c_prepare_locator_package`.

## User Review Checklist
- [x] Review mapping
- [x] Review strategy (Tạo trước hay tạo trong test)
