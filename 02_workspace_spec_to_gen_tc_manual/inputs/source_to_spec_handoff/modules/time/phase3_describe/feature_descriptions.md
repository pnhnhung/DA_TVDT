# Feature Descriptions: Time Module

## 1. Project & Customer Configuration

### 1.1 Quản lý Customer (Khách hàng)
Admin sử dụng tính năng này để quản lý danh sách khách hàng của tổ chức.
- **Ràng buộc duy nhất**: Tên Khách hàng là duy nhất trên toàn hệ thống (không phân biệt chữ hoa chữ thường).
- **Ràng buộc an toàn**: Hệ thống cấm xóa bất kỳ Khách hàng nào nếu có dữ liệu chấm công (Timesheet) liên kết với dự án của khách hàng đó. Thông báo lỗi: `Not Allowed to Delete Customer(s) Which Have Time Logged Against`.

### 1.2 Quản lý Project (Dự án)
Các dự án được tạo ra để gán vào một Khách hàng cụ thể.
- **Giới hạn Quản trị**: Một dự án có thể có tối đa 5 Project Admins (nhân viên quản trị dự án).
- **Ràng buộc duy nhất**: Tên dự án phải duy nhất trong phạm vi của cùng một Khách hàng.
- **Ràng buộc an toàn**: Tương tự Customer, hệ thống kiểm tra sự tồn tại của `TimesheetItem` liên quan trước khi cho phép xóa dự án.

### 1.3 Quản lý Project Activity (Hoạt động Dự án)
Project Activity quy định chi tiết công việc mà nhân sự sẽ chọn khi điền bảng chấm công.
- **Mối quan hệ**: Thuộc về 1 Dự án cụ thể. Tên Activity duy nhất trong nội bộ Dự án đó.
- **Ràng buộc an toàn**: Cấm xóa nếu đã có Timesheet Item được log bằng Activity này.

---

## 2. Timesheet Operations

### 2.1 Timesheet Retrieval & Validation
Tính năng lọc và xem danh sách bảng chấm công của nhân sự (Employee Timesheets).
- **Bộ lọc ngày**: Nếu người dùng muốn lọc theo khoảng thời gian, cả hai trường `fromDate` và `toDate` đều là bắt buộc và `fromDate` phải nhỏ hơn hoặc bằng `toDate`.
- **Phân quyền**: Chỉ Supervisor, Admin, hoặc chính bản thân nhân viên (My Timesheet) mới có quyền truy cập vào danh sách này.

### 2.2 Timesheet Workflow Action (Action Transition)
Bảng chấm công tuân thủ một cỗ máy trạng thái (Workflow State Machine) quản lý bởi `TimesheetService`.
- **Transitions**: Nhân viên có thể `SUBMIT` (Nộp). Supervisor/Admin có thể `APPROVE` (Duyệt) hoặc `REJECT` (Từ chối).
- **Logging**: Mọi sự thay đổi trạng thái đều được ghi log lại qua entity `TimesheetActionLog` bao gồm hành động, thời gian và bình luận (comment - tối đa 2000 ký tự).

### 2.3 Timesheet Entries (Ghi nhận giờ làm)
Nhân sự truy cập vào Timesheet cụ thể để điền giờ làm.
- **Payload**: Hệ thống ghi nhận số giờ theo cặp `projectId` và `activityId` ứng với từng ngày (`dates`).
- **Khóa dữ liệu**: Nếu Timesheet đang ở trạng thái `APPROVED` (hoặc chờ phê duyệt mà user không có quyền sửa), API sẽ chặn thao tác lưu/cập nhật `entries` và trả về lỗi `Performed action not allowed`.
- **Chỉnh sửa**: API hỗ trợ đồng thời việc xóa (`deletedEntries`) và thêm mới/cập nhật (`entries`) trong cùng một payload request.
