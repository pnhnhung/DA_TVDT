# Testcase Oracle Review: Contract Management

| Testcase ID | Current oracle | Oracle quality | Issue | Required improvement | Status |
|---|---|---|---|---|---|
| IT-CONT-004 | Xóa Hợp đồng thành công, bản ghi bị soft-delete. | STRONG | None | None | PASS |
| IT-CONT-007 | 2 cặp cũ biến mất hoàn toàn khỏi DB, chỉ còn cặp mới, không có orphan record. | STRONG | None | None | PASS |
| IT-CONT-009 | Báo lỗi Passcode, API không gọi `payEntry` lên QRPF. | STRONG | None | None | PASS |
| IT-CONT-012 | Giao dịch chuyển sang trạng thái CANCELLED, gửi email thành công. | STRONG | None | None | PASS |
| IT-CONT-013 | CMS báo lỗi kết nối Gateway, trạng thái Transaction giữ nguyên SUCCESS, không gọi `cancelSubmit`. | STRONG | None | None | PASS |
| IT-CONT-016 | Cập nhật hàng loạt (Async) thành công, các transaction status được cập nhật. | STRONG | None | None | PASS |
| UC-CONT-002 | Ưu tiên Fee Override từ Contract > Shop > Service. | WEAK | Thiếu thông số tính toán cụ thể trên màn hình bill. | Cần mô tả expectation tính tiền cụ thể. | FAIL |
