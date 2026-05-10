# Gaps & Questions: Leave Module

## 1. Gaps (Lỗ hổng / Khuyết thiếu logic)
- Không có gap nghiêm trọng nào có khả năng block việc viết Test Case. Luồng chức năng (Happy path và Negative path) đã được code API làm rõ (Ví dụ: Lỗi khi xóa Entitlement đã dùng, lỗi khi cập nhật nhiều trạng thái Leave cùng lúc).

## 2. Inferred Items (Các giả định cần lưu ý)
- Workflow duyệt đơn cụ thể (Approve/Reject) đôi khi phụ thuộc vào thiết lập trong Database hoặc Admin Configuration. Ở API level, hệ thống cho phép `APPROVE`, `REJECT`, `CANCEL`. Khi viết Test Case, cần coi đây là các hành động độc lập hợp lệ.
- Trạng thái `PENDING APPROVAL` được coi là trạng thái mặc định của mọi đơn xin nghỉ được tạo thông qua tính năng Apply Leave của nhân viên.

## 3. Questions (Câu hỏi cho PO/BA - Tham khảo)
- Không có câu hỏi nào chặn luồng (Non-blocking). Hệ thống đã tương đối rõ ràng từ góc nhìn REST API.
