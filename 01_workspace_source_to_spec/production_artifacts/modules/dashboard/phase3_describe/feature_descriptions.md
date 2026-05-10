# Feature Descriptions: Dashboard Module

## 1. Widget Tổng quan Công việc (My Actions)

### 1.1 Tính toán số lượng công việc tồn đọng (Action Summary)
Khi load trang, hệ thống kiểm tra các phân hệ nào đang được bật (`Leave`, `Time`, `Performance`, `Recruitment`). Từ đó, nó sẽ tính toán các con số:
- **Pending Leave Requests**: Đơn xin nghỉ đang chờ tôi phê duyệt.
- **Pending Timesheets**: Bảng chấm công đang chờ tôi phê duyệt.
- **Pending Reviews**: Đánh giá hiệu suất nhân sự đang chờ tôi thực hiện.
- **Scheduled Interviews**: Lịch phỏng vấn ứng viên trong tương lai gần.
**Cơ chế Security**: Các con số này được tính dựa trên `accessibleEmpNumbers`, đảm bảo User A sẽ không bao giờ nhìn thấy số đơn xin nghỉ của User B nếu A không phải quản lý của B.

## 2. Widget Thống kê Tổ chức (Org Charts)

### 2.1 Biểu đồ Nhân sự
- **Theo Phòng ban (Subunit)**: Hiển thị Pie chart phân bổ nhân viên theo từng phòng ban.
- **Theo Vị trí (Location)**: Hiển thị Pie chart phân bổ theo chi nhánh.

### 2.2 Nghỉ phép hôm nay (Employees on Leave)
Hiển thị danh sách ảnh đại diện/tên của những nhân viên vắng mặt ngày hôm nay.
- **Cấu hình cá nhân hóa (Configuration)**: Người dùng có thể click vào icon bánh răng trên widget để lưu setting `showOnlyAccessibleEmployeesOnLeaveToday`. Nếu true, widget chỉ show người nghỉ trong phạm vi data group của mình thay vì toàn công ty.

## 3. Tiện ích thao tác (Utilities)

### 3.1 Quick Launch
Cung cấp các shortcut link đưa người dùng trực tiếp đến các màn hình tạo mới (Apply Leave, Assign Leave, Timesheet, My Info).

### 3.2 Time at Work
Tích hợp widget từ phân hệ Time để hiển thị số giờ đã làm trong tuần và cung cấp nút bấm nhanh để Punch In/Out ngay từ trang chủ.
