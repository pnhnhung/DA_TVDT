# Kế Hoạch Phân Chia State (State Plan)

Để quản lý rủi ro và tăng độ ổn định khi Generate code (đặc biệt trong Playwright), quá trình gen code được chia thành 4 State. Sau mỗi State, AI Generator cần được chạy và Review Code trước khi tiếp tục.

| State ID | Mô Tả | Nhóm Test Cases | Rủi ro | Dependency Cần Setup |
|---|---|---|---|---|
| **STATE_REC_VACANCY** | Quản lý Vacancy | TC_UT_REC_VAC_01, TC_UT_REC_VAC_02, TC_UT_REC_VAC_04, TC_UT_REC_VAC_05 | Thấp | Cần Job Title, Hiring Manager (từ Admin) |
| **STATE_REC_CANDIDATE** | Thêm, sửa, xóa, validate Candidate profile | TC_UT_REC_CAN_01, TC_UT_REC_CAN_02, TC_UT_REC_CAN_03, TC_UT_REC_CAN_04, TC_UT_REC_CAN_06 | Thấp | Cần Vacancy hợp lệ |
| **STATE_REC_WORKFLOW** | Quy trình apply - tuyển dụng | TC_UT_REC_WF_01, TC_UT_REC_WF_02, TC_UT_REC_WF_04, TC_UT_REC_WF_05, TC_UT_REC_WF_06, TC_UT_REC_WF_07 | Trung bình | Yêu cầu tuần tự. Flakiness cao nếu State candidate bị sai nhịp hoặc page reload không kịp. Cần Smart Wait kỹ thuật số. |
| **STATE_REC_IT** | Luồng tích hợp Recruitment → PIM | TC_IT_REC_04 | Trung bình | Tích hợp liên module. Đảm bảo quy tắc PIM Employee Mapping là chuẩn. |

## Yêu cầu trước khi Gen Code (Tiến hành luồng 01b và 01c)

Theo đúng `Rule 02 — Automation Scope, Readiness & State Control`, trước khi gọi Generator cho các State trên, vui lòng tiến hành:

1. **`@/01b_prepare_test_data`**: Tìm/tạo các *Job Title* hoặc *Vacancy* mồi, điền vào File `data_inventory.md`.
2. **`@/01c_prepare_locator_package`**: Sử dụng browser để verify và extract Locators cho module Recruitment vào `inputs/locator_packages/recruitment/locator_package.md`.
