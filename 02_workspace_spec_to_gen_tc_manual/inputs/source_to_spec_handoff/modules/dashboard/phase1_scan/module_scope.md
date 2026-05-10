# Module Scope: Dashboard

## 1. Giới thiệu
Phân hệ **Dashboard (Bảng điều khiển)** là trang chủ (Home Page) xuất hiện ngay sau khi người dùng đăng nhập vào hệ thống OrangeHRM. Nó đóng vai trò là một "bảng điều khiển trung tâm" tổng hợp thông tin quan trọng thông qua các Widgets (tiện ích nhỏ), giúp nhân viên và quản lý nắm bắt nhanh tình hình công việc mà không cần truy cập sâu vào từng phân hệ.

## 2. Các nhóm chức năng chính (Feature Groups)

### 2.1 Widgets Thông tin cá nhân & Hành động nhanh
- **Time at Work**: Hiển thị trạng thái điểm danh hiện tại (Punch In/Out) và tổng thời gian làm việc trong tuần.
- **Quick Launch**: Cung cấp các phím tắt nhanh để truy cập các tính năng hay dùng (Assign Leave, Leave List, Timesheets).
- **My Actions (Pending Actions)**: Tổng hợp các công việc đang chờ xử lý cần sự phê duyệt của người dùng (Ví dụ: Đơn xin nghỉ phép đang chờ duyệt, Bảng chấm công đang chờ duyệt).

### 2.2 Widgets Tổng quan tổ chức (Dành cho Quản lý / Admin)
- **Employees on Leave Today**: Hiển thị danh sách các nhân viên đang vắng mặt ngày hôm nay. (Có kèm theo API cấu hình hiển thị widget này).
- **Employee Distribution by Subunit**: Biểu đồ tròn (Pie Chart) thể hiện tỷ lệ phân bổ nhân sự theo từng phòng ban.
- **Employee Distribution by Location**: Biểu đồ tròn thể hiện tỷ lệ phân bổ nhân sự theo khu vực địa lý.

## 3. Bản chất của Module
- Ngoại trừ một API lưu cấu hình (Configuration), phần lớn bản chất của phân hệ Dashboard là **tổng hợp và hiển thị dữ liệu (Read-only aggregation)** từ các phân hệ khác (Leave, Time, PIM).
- Dashboard không sở hữu dữ liệu nghiệp vụ lõi (Core Business Data) của riêng nó.
