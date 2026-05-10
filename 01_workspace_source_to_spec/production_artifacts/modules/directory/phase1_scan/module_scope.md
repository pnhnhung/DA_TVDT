# Module Scope: Directory

## 1. Giới thiệu
Phân hệ **Directory (Danh bạ Nội bộ)** của OrangeHRM cung cấp một cuốn danh bạ điện tử (Corporate Directory) cho toàn bộ nhân viên. Tính năng này cho phép tra cứu nhanh thông tin liên lạc và vị trí công tác của bất kỳ ai trong tổ chức.

## 2. Các nhóm chức năng chính (Feature Groups)

### 2.1 Tra cứu Nhân sự (Employee Directory)
- **Tìm kiếm & Lọc (Search & Filter)**: Cho phép tìm kiếm nhân viên theo tên, chức danh (Job Title), chi nhánh (Location), hoặc phòng ban (Sub Unit).
- **Xem chi tiết (Employee Details)**: Hiển thị thông tin liên lạc công việc cơ bản (Work Telephone, Work Email, Location) của nhân viên. Không hiển thị các thông tin cá nhân bảo mật (như lương, số tài khoản ngân hàng).

## 3. Actors (Đối tượng sử dụng)
- **Employee**: Bất kỳ nhân viên nào có tài khoản hợp lệ đều có thể truy cập danh bạ để tìm kiếm thông tin đồng nghiệp.
- **Tính năng Read-only**: Toàn bộ module này chỉ phục vụ mục đích Đọc (Read-only). Việc Thêm/Sửa/Xóa dữ liệu nhân viên được thực hiện bên phân hệ PIM (Personnel Information Management).
