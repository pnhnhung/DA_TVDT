# Testcase Oracle Review: Customer Management

| Testcase ID | Current oracle | Oracle quality | Issue | Required improvement | Status |
|---|---|---|---|---|---|
| IT-CUST-002 | Trả về thông báo lỗi "Không tìm thấy thông tin đại lý", không gọi SMS Gateway. | STRONG | None | None | PASS |
| IT-CUST-003 | Member GMO được tạo, Thẻ tín dụng được lưu vào DB. | STRONG | None | None | PASS |
| IT-CUST-006 | Tìm thấy `memberId`, không gọi tạo member, chỉ gọi thêm thẻ. Trả về list thẻ cập nhật. | STRONG | None | None | PASS |
| IT-CUST-007 | Gửi SMS thành công 3 lần. Lần 4 trả về lỗi 429 Too Many Requests (Throttle limit). | STRONG | None | None | PASS |
| IT-CUST-011 | API cập nhật email báo lỗi `validation.unique`, email không đổi. | STRONG | None | None | PASS |
| IT-CUST-016 | Callback GMO thành công nhưng DB Customer bị khóa -> Báo lỗi "Tài khoản không hoạt động", không tạo Card. | STRONG | None | None | PASS |
| UC-CUST-007 | Trình bày luồng race condition rõ ràng. | STRONG | None | None | PASS |
