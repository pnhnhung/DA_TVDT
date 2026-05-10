# Official Testcases — module_time

| TC ID | Title | Level | P | Related Rule ID | Oracle | Expected Result | Precondition | Test Data |
|---|---|---|---|---|---|---|---|---|
| TC_UT_TIM_01 | Employee nhập Timesheet hợp lệ | UT | P1 | R_TIM_01 | STRONG | Timesheet saved; status SUBMITTED | ESS User logged in | 8 hours/day |
| TC_UT_TIM_02 | Nhập Timesheet quá 24h/ngày | UT | P1 | R_TIM_02 | STRONG | Validation error "Should be less than 24" | ESS User logged in | 25 hours |
| TC_UT_TIM_03 | Nhập ký tự không hợp lệ | UT | P2 | R_TIM_03 | STRONG | Error "Invalid format" | ESS User logged in | "abc" |
| TC_UT_TIM_04 | Supervisor duyệt Timesheet | UT | P1 | R_TIM_04 | STRONG | Status changes to APPROVED | Supervisor logged in | SUBMITTED timesheet |
| TC_UT_TIM_05 | Supervisor reject Timesheet | UT | P1 | R_TIM_04 | STRONG | Status changes to REJECTED | Supervisor logged in | SUBMITTED timesheet |
| TC_UT_TIM_06 | Employee sửa Timesheet đã duyệt | UT | P1 | R_TIM_05 | STRONG | Edit disabled OR Validation error | ESS User logged in | APPROVED timesheet |
| TC_UT_TIM_07 | Admin tạo Customer/Project | UT | P2 | R_TIM_06 | STRONG | Toast saved; Project in list | Admin logged in | Cust="ACME", Proj="ERP" |
| TC_IT_TIM_01 | Project name map vào Timesheet | IT | P1 | R_TIM_07 | STRONG | "ERP" appears in Project dropdown | ESS User logged in | Valid Project exists |
| TC_IT_TIM_02 | Xóa Project khi đang có Timesheet | IT | P1 | BR_TIM_01 | STRONG | Xóa bị chặn OR Cảnh báo dữ liệu | Admin logged in | Project có timesheet data |
