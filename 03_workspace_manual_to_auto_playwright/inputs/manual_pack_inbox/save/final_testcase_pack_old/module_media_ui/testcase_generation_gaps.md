# Manual Gap Report: Media & UI

| Gap ID | Testcase / UC Ref | Mô tả vấn đề | Mức độ | Đề xuất xử lý |
|---|---|---|---|---|
| GAP-MED-01 | IT-MED-002, UC-MED-001 | Tham số cấu hình giới hạn kích thước file upload Gallery (`max` validation) hiện đang trống. | High | Xác nhận với backend Dev (ví dụ: `2048` KB) để đưa dữ liệu này vào script Automation. |
| GAP-MED-02 | UC-MED-002 | Xóa Top Category khi có Top Item bên trong sẽ hành xử như thế nào? (Bị block hay Cascade delete?) | Medium | Dev/BA cần xác nhận behavior hệ thống. |
| GAP-MED-03 | UC-MED-004 | Xóa Coupon/Shop đang được Favorite, record Favorite bị hard delete hay ứng dụng client tự filter? | Low | Cần xác nhận với Dev cách implement graceful handling. |
