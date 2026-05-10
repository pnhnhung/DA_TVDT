# Module Scope: Time & Attendance

## 1. Giới thiệu
Phân hệ **Time** trong OrangeHRM quản lý việc chấm công và theo dõi thời gian làm việc của nhân viên. Phân hệ này được cấu thành từ hai plugin chính: `orangehrmTimePlugin` (Quản lý dự án, khách hàng, và bảng chấm công Timesheet) và `orangehrmAttendancePlugin` (Quản lý chấm công qua thao tác Punch In / Punch Out).

## 2. Các nhóm chức năng chính (Feature Groups)

### 2.1. Time Tracking Configuration (Thiết lập dự án & Khách hàng)
- Quản lý danh sách Khách hàng (Customers).
- Quản lý Dự án (Projects) và gán Admin cho dự án.
- Quản lý các Hoạt động (Activities) trong một dự án.
- Thiết lập chu kỳ bảng chấm công (Timesheet Period - ví dụ: hàng tuần, hàng tháng).

### 2.2. Attendance (Chấm công)
- **Punch In/Out**: Nhân viên thực hiện ghi nhận thời gian bắt đầu và kết thúc làm việc.
- **Attendance Records**: Quản lý lịch sử chấm công của nhân viên.
- **Overlap Validation**: Đảm bảo các khung giờ chấm công không bị đè lên nhau.
- **Attendance Configuration**: Cấu hình các quy tắc chấm công (ví dụ: nhân viên có được phép sửa record của chính mình hay không).

### 2.3. Timesheets (Bảng chấm công)
- **My Timesheets**: Nhân viên điền thời gian làm việc của mình theo từng dự án/hoạt động.
- **Employee Timesheets**: Supervisor/Admin xem, phê duyệt, từ chối bảng chấm công của nhân viên.
- **Timesheet Action Logs**: Theo dõi lịch sử duyệt đơn.

### 2.4. Reports (Báo cáo)
- Báo cáo thời gian của nhân viên (Employee Time Report).
- Báo cáo chi tiết hoạt động dự án (Project Activity Details Report).
- Báo cáo tổng hợp chấm công (Attendance Summary Report).

## 3. Actors (Đối tượng sử dụng)
- **Admin**: Cấu hình hệ thống, tạo khách hàng, dự án, phân quyền.
- **Project Admin**: Quản lý các dự án được giao.
- **Supervisor**: Duyệt bảng chấm công (Timesheets) và lịch sử chấm công (Attendance) của cấp dưới.
- **ESS (Employee)**: Điền bảng chấm công, thực hiện Punch In/Out, xem lịch sử của mình.
