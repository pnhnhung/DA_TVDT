# Official Testcases — module_admin_user_management

| TC ID | Title | Level | P | Related Rule ID | Oracle | Expected Result | Precondition | Test Data |
|---|---|---|---|---|---|---|---|---|
| TC_UT_USR_01 | Tạo User thành công | UT | P2 | R_USR_01 | STRONG | Toast saved; user visible in list | Admin logged in, Emp exists | Valid input |
| TC_UT_USR_02 | Tạo User thiếu trường | UT | P2 | R_USR_01 | STRONG | Error "Required" | Admin logged in | Username=empty |
| TC_UT_USR_03 | Tạo User trùng Username | UT | P1 | R_USR_02 | STRONG | Error "Already exists" | Admin logged in, User exists | Username="admin" |
| TC_UT_USR_04 | Password không đủ mạnh | UT | P1 | R_USR_03 | ACCEPTABLE | Validation error visible | Admin logged in | Pwd="123" |
| TC_UT_USR_05 | Password confirm không khớp | UT | P1 | R_USR_04 | STRONG | Error "Passwords do not match" | Admin logged in | Pwd="123", Confirm="456" |
| TC_UT_USR_06 | Disable Account | UT | P1 | R_USR_06 | STRONG | Status badge = "Disabled" | Admin logged in, User exists | Edit User -> Disable |
| TC_UT_USR_07 | Đổi Role thành ESS | UT | P1 | R_USR_07 | STRONG | Role column shows "ESS" | Admin logged in, Admin User exists | Edit User -> Change Role ESS |
| TC_UT_USR_08 | Kiểm tra quyền ESS | UT | P1 | PERM_USR_01 | ACCEPTABLE | Menu absent OR Access Denied | ESS User logged in | N/A |
| TC_IT_USR_01 | Login sau khi bị Disable | IT | P1 | BR_USR_01 | STRONG | Login rejected | User exists and is disabled | Try login |
| TC_IT_USR_02 | Session cập nhật sau khi đổi Role | IT | P1 | R_USR_07 | STRONG | Admin menu absent | User changed from Admin to ESS | Try login again |
