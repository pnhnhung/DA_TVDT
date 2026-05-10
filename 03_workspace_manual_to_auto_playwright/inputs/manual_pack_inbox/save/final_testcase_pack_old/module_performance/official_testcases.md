# Official Testcases — module_performance

| TC ID | Title | Level | P | Related Rule ID | Oracle | Expected Result | Precondition | Test Data |
|---|---|---|---|---|---|---|---|---|
| TC_UT_PRF_KPI_01 | Tạo mới KPI thành công | UT | P2 | R_PRF_01 | STRONG | Toast saved; bản ghi hiển thị | Admin logged in | Name="KPI" |
| TC_UT_PRF_KPI_02 | Tạo KPI trùng tên | UT | P1 | R_PRF_01 | STRONG | Error "Already exists" | Admin logged in | Duplicate name |
| TC_UT_PRF_KPI_03 | Tạo KPI Min > Max | UT | P2 | BR_PRF_01 | STRONG | Error validation logic | Admin logged in | Min=10, Max=1 |
| TC_UT_PRF_KPI_04 | Tạo KPI chữ cái | UT | P1 | R_PRF_02 | STRONG | Error validation format | Admin logged in | Min="abc" |
| TC_UT_PRF_KPI_05 | Cập nhật KPI | UT | P2 | R_PRF_01 | STRONG | Toast saved | Admin logged in | Edit KPI |
| TC_UT_PRF_KPI_06 | Xóa KPI | UT | P2 | R_PRF_01 | STRONG | Toast deleted | Admin logged in | Delete KPI |
| TC_UT_PRF_REV_01 | Tạo Performance Review | UT | P1 | R_PRF_05 | STRONG | Toast saved | Admin logged in | Date, Employee |
| TC_UT_PRF_REV_02 | Sửa Performance Review | UT | P2 | R_PRF_05 | STRONG | Toast saved | Admin logged in | Edit Review |
| TC_UT_PRF_REV_03 | Xóa Performance Review | UT | P2 | R_PRF_05 | STRONG | Toast deleted | Admin logged in | Delete Review |
| TC_UT_PRF_EVAL_01 | Đánh giá điểm hợp lệ | UT | P1 | BR_PRF_04 | STRONG | Toast saved | Supervisor logged in | Rating=4 |
| TC_UT_PRF_EVAL_02 | Điểm số vượt max | UT | P1 | BR_PRF_04 | STRONG | Error bounds | Supervisor logged in | Rating=6 |
| TC_UT_PRF_PERM_01 | Quyền xem ESS | UT | P1 | PERM_PRF_02 | STRONG | Readonly review | ESS logged in | URL / My Reviews |
| TC_IT_PRF_01 | Employee self-review | IT | P1 | R_PRF_06 | STRONG | Form saved, state changed | Employee logged in | Fill form |
