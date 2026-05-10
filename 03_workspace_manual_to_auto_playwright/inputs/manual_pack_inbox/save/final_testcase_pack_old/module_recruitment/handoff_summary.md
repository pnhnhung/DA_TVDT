# Handoff Summary — module_recruitment

## Decision

**`READY_FOR_AUTOMATION_PREP`**

## Counts

| Type | Count |
|---|---:|
| Official testcase | 17 |
| Suggested testcase | 1 |
| Exploratory charter | 2 |
| Blocked testcase | 1 |

## Open gaps
- **GAP-REC-02**: Logic gửi email tự động khi apply/shortlist.

## Risks
- Workflow của Candidate rất dài (Initiated -> Shortlisted -> Scheduled -> Passed -> Offered -> Hired). Cần tận dụng tốt API trong quá trình setup data ở `conftest.py` thay vì chạy UI tuần tự cho mọi testcase.

## Recommended next action
1. Khởi tạo `Page_Vacancies` và `Page_Candidates`.
2. Cấu hình `DBHelper` để truy xuất bảng Candidate, xác minh logic map sang Employee.
