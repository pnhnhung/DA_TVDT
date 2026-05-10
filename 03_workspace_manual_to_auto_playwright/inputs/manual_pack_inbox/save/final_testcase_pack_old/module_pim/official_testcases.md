# Official Testcases — module_pim

| TC ID | Title | Level | P | Related Rule ID | Oracle | Expected Result | Precondition | Test Data |
|---|---|---|---|---|---|---|---|---|
| TC_UT_PIM_01 | Thêm Employee thành công | UT | P1 | R_PIM_01 | STRONG | Employee xuất hiện trong list | Admin logged in | First, Last name |
| TC_UT_PIM_02 | Thêm thiếu Name | UT | P2 | R_PIM_01 | STRONG | Error "Required" | Admin logged in | First name = empty |
| TC_UT_PIM_03 | Thêm với ảnh hợp lệ | UT | P2 | R_PIM_02 | STRONG | Profile picture upload success | Admin logged in | Valid image (<1MB) |
| TC_UT_PIM_04 | Thêm kèm User account | UT | P1 | R_PIM_03 | STRONG | Account created, có thể đăng nhập | Admin logged in | Toggle create details |
| TC_UT_PIM_05 | Cập nhật Personal Details | UT | P2 | R_PIM_04 | STRONG | Data saved (Nationality, Marital Status) | Admin logged in, Emp exists | Edit Details |
| TC_UT_PIM_06 | Employee tự xem thông tin (ESS) | UT | P1 | PERM_PIM_01 | STRONG | My Info hiển thị đúng data của chính mình | ESS User logged in | My Info |
| TC_IT_PIM_01 | Terminate Employee chặn Login | IT | P1 | BR_PIM_01 | STRONG | Đăng nhập bị chặn "Account disabled" | Emp exists & có User account | Terminate Emp |
| TC_IT_PIM_02 | Kích hoạt lại (Reactivate) Emp | IT | P1 | BR_PIM_02 | STRONG | Login thành công trở lại | Terminated Emp | Reactivate Emp |
| TC_IT_PIM_03 | Job/Salary thay đổi ghi Log | IT | P2 | BR_PIM_03 | STRONG | Lịch sử update hiện trong tab Job | Emp exists | Change Job Title |
