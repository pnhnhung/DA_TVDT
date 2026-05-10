# Suggested Testcases — module_pim

| TC ID | Title | Level | Reason | Rule ID | Expected Result |
|---|---|---|---|---|---|
| TC_UT_PIM_07 | File ảnh lớn hơn giới hạn (1MB) | UT | Behavior reject chưa rõ detail | R_PIM_02 | Báo lỗi size exceed |
| TC_UT_PIM_08 | Định dạng ảnh sai (`.pdf`) | UT | System validation fallback | R_PIM_02 | Báo lỗi file type |
| TC_IT_PIM_04 | Tự đổi Supervisor tạo lặp | IT | Circular dependency | BR_PIM_04 | Ngăn chặn gán vòng tròn (A->B->A) |
