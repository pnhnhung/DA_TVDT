# Suggested Testcases — module_admin_organization

| TC ID | Title | Level | Reason | Rule ID | Expected Result |
|---|---|---|---|---|---|
| TC_IT_ORG_02 | Race condition xóa Location khi đang tạo Employee | IT | Unconfirmed behavior | BR_ORG_01 | Báo lỗi Location không hợp lệ |
| TC_UT_ORG_08 | Xóa Location đang được sử dụng | UT | Behavior delete restrict chưa rõ | R_ORG_03 | Ngăn chặn xóa hoặc cảnh báo |
| TC_UT_ORG_09 | Tạo Organization Unit tạo vòng lặp (Parent = Child) | UT | Cần check logic vòng lặp cây cấu trúc | R_ORG_04 | Form báo lỗi ngăn chặn tạo vòng lặp |
