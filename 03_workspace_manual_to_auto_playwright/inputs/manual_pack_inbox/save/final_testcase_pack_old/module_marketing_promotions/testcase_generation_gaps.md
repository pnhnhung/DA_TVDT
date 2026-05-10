# Manual Gap Report: Marketing & Promotions

| Gap ID | Testcase / UC Ref | Mô tả vấn đề | Mức độ | Đề xuất xử lý |
|---|---|---|---|---|
| GAP-MKT-01 | IT-MKT-013, UC-MKT-001 | Sửa `limitUsage` xuống thấp hơn `usedCount` có chặn validation hay không? | Medium | Dev/BA cần confirm spec. Hiện tại testcase đang assume là BỊ CHẶN (Lỗi). |
| GAP-MKT-02 | UC-MKT-004 | Tính năng `checkingBell` trigger khi gọi API đọc danh sách notification hay API đọc chi tiết notification? | Low | Cần trace Dev source code. QA sẽ test trên API gọi đọc chi tiết. |
| GAP-MKT-03 | UC-MKT-002 | Khi hủy thanh toán hoặc giao dịch failed, `remainingUsage` của Coupon có được hoàn lại không? | High | Dev/BA cần xác nhận luồng Rollback. Testcase tự động hiện chưa cover luồng hoàn Coupon. |
