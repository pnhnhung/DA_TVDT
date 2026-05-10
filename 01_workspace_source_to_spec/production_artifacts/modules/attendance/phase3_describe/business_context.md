# Business Context: Attendance Module

## 1. Mục Đích & Vai Trò
Phân hệ **Attendance (Chấm công)** được sinh ra để số hóa quá trình ghi nhận chuyên cần của nhân sự. Nó thay thế cho máy chấm công vật lý, cho phép nhân viên khai báo giờ đến và giờ về hàng ngày ngay trên hệ thống. Dữ liệu từ phân hệ này sẽ đóng vai trò then chốt cho việc tính lương (chấm công, OT, trừ đi muộn).

## 2. Quy trình Nghiệp vụ Cốt lõi (Core Workflows)

### 2.1 Vòng đời Điểm danh (Punch Lifecycle)
- **Punch In**: Bắt đầu ngày làm việc. Hệ thống tạo ra một `AttendanceRecord` mới mang trạng thái `PUNCHED_IN`.
- **Punch Out**: Kết thúc làm việc. Thay vì tạo bản ghi mới, hệ thống tìm bản ghi `PUNCHED_IN` đang mở và cập nhật thêm giờ ra vào đó, đổi trạng thái thành `PUNCHED_OUT`.
- Một nhân viên có thể Punch In / Punch Out nhiều lần trong ngày (Ví dụ: Sáng đến In, trưa nghỉ Out, chiều In, tối về Out).

### 2.2 Chống gian lận (Anti-cheating)
Hệ thống thiết kế 2 cơ chế bảo vệ tính toàn vẹn của dữ liệu:
- **Chống sửa giờ hiện tại**: Nếu công ty khóa quyền "Edit Time", nhân viên chỉ có thể ấn một nút bấm duy nhất. Hệ thống sẽ lấy giờ thực tế của server (cho phép sai số 3 phút do độ trễ mạng).
- **Chống đè lịch (Overlap)**: Một khoảng thời gian (Từ `Giờ Vào` đến `Giờ Ra`) không bao giờ được phép nằm đè lên một khoảng thời gian khác của cùng một nhân sự, để tránh việc một nhân viên khai báo làm việc 2 nơi cùng lúc.

### 2.3 Chấm công Hộ (Proxy / Moderation)
Các nhà quản lý (Supervisor / Admin) sở hữu một bộ API riêng (`EmployeeAttendanceRecordAPI`) khác với nhân viên (`MyAttendanceRecordAPI`). Bộ API này cho phép họ can thiệp sâu: 
- Chấm công hộ (Proxy Punch).
- Sửa lại giờ giấc nếu nhân viên quên chấm công hoặc máy hỏng.
- Xóa các bản ghi rác.
