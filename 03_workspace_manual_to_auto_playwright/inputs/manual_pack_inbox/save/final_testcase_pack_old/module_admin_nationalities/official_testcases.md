# Official Testcases — module_admin_nationalities

| TC ID | Title | Level | Priority | Related Rule ID | Oracle Quality | Expected Result | Precondition | Test Data |
|---|---|---|---|---|---|---|---|---|
| TC_UT_NAT_01 | Tạo Nationality thành công | UT | P2 | R_NAT_01, R_NAT_04 | STRONG | Toast "Successfully Saved"; row visible | Admin logged in | Name="Vietnam" |
| TC_UT_NAT_02 | Tạo thiếu trường bắt buộc | UT | P2 | R_NAT_01 | STRONG | Error "Required" | Admin logged in | Name=empty |
| TC_UT_NAT_03 | Tạo với độ dài max | UT | P1 | R_NAT_03 | ACCEPTABLE | Toast "Successfully Saved" | Admin logged in | Name=100 chars |
| TC_UT_NAT_04 | Tạo với độ dài max+1 | UT | P1 | R_NAT_03 | ACCEPTABLE | Truncate OR Error visible | Admin logged in | Name=101 chars |
| TC_UT_NAT_05 | Tạo trùng tên | UT | P1 | R_NAT_02 | STRONG | Error "Already exists" | Admin logged in, "Vietnam" exists | Name="Vietnam" |
| TC_UT_NAT_06 | Xóa Nationality thành công | UT | P2 | R_NAT_04 | STRONG | Toast deleted; row absent | Admin logged in, "ToDelete" exists | Delete "ToDelete" |
| TC_UT_NAT_07 | Kiểm tra quyền ESS | UT | P1 | PERM_NAT_01 | ACCEPTABLE | Menu absent OR Access Denied | ESS logged in | N/A |
| TC_IT_NAT_01 | Hiển thị dropdown bên PIM | IT | P1 | R_NAT_06 | STRONG | "Vietnam" selectable in PIM | Admin logged in, "Vietnam" created | Navigate to PIM |
| TC_IT_NAT_02 | Xóa khi đang được dùng (FK) | IT | P1 | R_NAT_05 | ACCEPTABLE | Error OR delete blocked | "Korea" linked to an Employee | Delete "Korea" |
