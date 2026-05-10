# Feature Descriptions: Attendance Module

## 1. Tính năng Điểm danh Cá nhân (My Attendance)

### 1.1 Punch In (Ghi nhận giờ vào)
- Sử dụng phương thức POST.
- Yêu cầu ngày (`date`), giờ (`time`) và múi giờ (`timezoneOffset`).
- Nếu Admin cấu hình không cho tự chỉnh giờ, API sẽ kiểm tra chênh lệch thời gian với Server (Cho phép chênh 180s). Vượt qua mức này, hệ thống từ chối Punch In.
- Đảm bảo thời gian Punch In không chồng lấn với bất kỳ ca làm việc nào trước đó.

### 1.2 Punch Out (Ghi nhận giờ ra)
- Sử dụng phương thức PUT.
- Bản chất hệ thống truy tìm bản ghi có trạng thái `PUNCHED_IN` gần đây nhất của user.
- Nếu thấy, lưu giờ vào bản ghi đó và đổi state thành `PUNCHED_OUT`.
- Nếu không thấy, hệ thống ném lỗi (buộc nhân viên phải Punch In trước).

## 2. Tính năng Quản trị Chuyên cần (Attendance Moderation)

### 2.1 Proxy Punch In/Out (Chấm công hộ)
- Quản lý có thể dùng API `EmployeeAttendanceRecordAPI` để chấm công thay cho cấp dưới.
- Luồng này không bị kiểm tra "180s margin of error" như tính năng cá nhân, vì bản chất hành động này là Sửa đổi lịch sử.
- Yêu cầu cờ quyền hạn `ATTENDANCE_ACTION_PROXY_PUNCH_IN`.

### 2.2 Xóa lịch sử chấm công (Delete Records)
- API nhận một mảng các `ids`.
- Hệ thống query kiểm tra xem User hiện tại có quyền xóa TẤT CẢ các ID trong mảng hay không. Nếu có 1 ID nằm ngoài quyền hạn, hệ thống cấm toàn bộ giao dịch.
- User bình thường chỉ được phép xóa bản ghi của mình nếu có cờ `ESS`. Admin có toàn quyền.
