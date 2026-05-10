# Business Context: Dashboard Module

## 1. Mục Đích & Vai Trò
Phân hệ **Dashboard (Bảng điều khiển)** đóng vai trò như một Hub (trung tâm điều phối) thông tin. Ngay khi đăng nhập, nhân viên hoặc người quản lý có thể nhìn thấy bức tranh toàn cảnh về công việc của mình và tình hình tổ chức thông qua các Widget (khung thông tin nhỏ).

## 2. Quy trình Nghiệp vụ Cốt lõi (Core Workflows)

### 2.1 Tổng hợp Công việc chờ xử lý (My Actions)
- Một trong những giá trị lớn nhất của Dashboard là **My Actions**. Thay vì phải truy cập vào Leave để tìm đơn chưa duyệt, vào Time để tìm bảng chấm công chưa duyệt, và vào Recruitment để xem lịch phỏng vấn... Dashboard gom tất cả con số đó lại thành một danh sách (Action Summary).
- Nó tuân thủ nghiêm ngặt **Data Access Control**: Bạn là sếp của nhóm nào thì chỉ thấy số lượng công việc tồn đọng của nhóm đó.

### 2.2 Tóm tắt Nhân sự & Tình hình công ty (Org Summary)
- Cho phép xem nhanh tỷ lệ nhân sự theo Phòng ban (Subunit) hoặc Chi nhánh (Location).
- Hỗ trợ xem danh sách những ai đang nghỉ phép hôm nay (Employees on Leave Today), giúp nhân sự hoặc quản lý có kế hoạch bố trí người làm thay thế hợp lý.

### 2.3 Tiện ích thao tác nhanh
- Cung cấp tính năng **Punch In/Out** (Điểm danh) ngay tại trang chủ.
- Các nút **Quick Launch** để mở form tạo mới quy trình (Assign Leave, Apply Leave...).

## 3. Kiến trúc kỹ thuật
- Các API của Dashboard có tính chất tổng hợp (Aggregation APIs). Chúng gọi vào Service và DAO của các phân hệ khác để thu thập và tính toán dữ liệu trả về cho Front-end render thành các biểu đồ (Charts) hoặc danh sách.
- Trừ việc cấu hình hiển thị (Config), Dashboard hầu như không ghi (Write) trực tiếp dữ liệu nghiệp vụ mới vào hệ thống.
