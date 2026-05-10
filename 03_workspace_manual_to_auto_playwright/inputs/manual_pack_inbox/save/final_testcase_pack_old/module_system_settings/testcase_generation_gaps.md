# Manual Gap Report: System Settings

| Gap ID | Testcase / UC Ref | Mô tả vấn đề | Mức độ | Đề xuất xử lý |
|---|---|---|---|---|
| GAP-SET-01 | IT-SET-004, UC-SET-001 | Queue worker timeout khi export file cực lớn (vượt memory limit) chưa có số liệu. | High | Cần DevOps confirm cấu hình `memory_limit` và `timeout` của queue worker Laravel để đưa vào kịch bản test stress. |
| GAP-SET-02 | UC-SET-004 | UTF-8 BOM hay Shift-JIS cho Excel Nhật? | Medium | Dev cần confirm mã hóa chính xác trả về để verify content, tránh bị lỗi font khi automation check. |
