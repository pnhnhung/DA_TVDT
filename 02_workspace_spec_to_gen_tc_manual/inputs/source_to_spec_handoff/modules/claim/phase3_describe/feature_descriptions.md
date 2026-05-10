# Feature Descriptions: Claim Module

## 1. Cấu hình (Configuration)

### 1.1 Quản lý Events & Expense Types
Cung cấp API để Admin cấu hình bộ danh mục cho hệ thống.
- **Trạng thái Active**: Cả Event và Expense Type đều có cờ Active/Inactive. Khi bị Inactive, người dùng không thể tạo Claim mới với Event/Expense Type này, nhưng các Claim cũ trong quá khứ không bị ảnh hưởng.

---

## 2. Quản lý Yêu cầu Thanh toán (Claim Requests)

### 2.1 Nộp Claim (My Claims)
Cho phép nhân viên tự tạo yêu cầu bồi hoàn chi phí.
- **Tạo mới (Initiate)**: API sẽ tự động sinh ra một Reference ID ngẫu nhiên làm mã tra cứu hồ sơ. Hồ sơ bắt đầu ở trạng thái `INITIATED`.
- **Ràng buộc Terminated**: Hệ thống ngầm kiểm tra hợp đồng (`TerminationRecord`). Nếu đã nghỉ việc, API từ chối tạo mới.

### 2.2 Gán Claim (Assign Claim)
Cho phép HR hoặc Admin tạo một bộ hồ sơ Claim thay cho nhân viên khác.
- **Ràng buộc Quyền hạn**: Phải kiểm tra xem người tạo (Admin) có quyền (Accessible) truy cập dữ liệu của nhân viên được gán hay không.

---

## 3. Khai báo Chi tiết & Chứng từ

### 3.1 Quản lý Chi phí (Expenses)
- **Thêm/Sửa Expense**: Mỗi khoản chi yêu cầu bắt buộc phải có Loại chi phí (Expense Type), Số tiền (Amount > 0) và Ngày chi (Date).
- **Khóa an toàn (Workflow Lock)**: Hệ thống sẽ gọi State Machine để kiểm tra. Nếu trạng thái của Claim Request gốc KHÔNG CÒN cho phép hành động `SUBMIT` (tức là đã nộp rồi), mọi API thao tác trên Expense (Sửa tiền, xóa dòng, thêm dòng) đều bị block.

---

## 4. Phê duyệt & Chuyển trạng thái

### 4.1 Claim Request Action (State Machine)
Quản lý việc chuyển qua lại các trạng thái của hồ sơ (Submit, Approve, Reject, Cancel).
- **Hành động hợp lệ**: Tương tự các phân hệ khác, `WorkflowStateMachine` sẽ chặn các bước nhảy cóc không hợp lệ (ví dụ: đang Rejected không thể tự nhiên đổi thành Approved).
