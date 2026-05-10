# Business Context: Admin Module

## 1. Giới thiệu tổng quan
Admin là phân hệ lõi, đóng vai trò như trung tâm điều khiển (Control Center) của toàn bộ hệ thống OrangeHRM. 

Khác với PIM (nơi quản lý con người), phân hệ Admin quản lý **cơ sở hạ tầng dữ liệu** (Master Data) và **phân quyền truy cập**. Nó quyết định những ai được phép đăng nhập (System Users), cơ cấu công việc và chức danh của công ty ra sao (Job), sơ đồ tổ chức công ty thế nào (Organization), và những thiết lập nền tảng như gửi email hay đa ngôn ngữ.

## 2. Giá trị nghiệp vụ (Business Value)
- **Kiểm soát truy cập (Access Control)**: Quản lý vòng đời tài khoản người dùng, đảm bảo chỉ những nhân viên có tài khoản hợp lệ (System Users) mới có thể đăng nhập.
- **Tiêu chuẩn hóa dữ liệu (Data Standardization)**: Đảm bảo dữ liệu ở các module khác (như phòng ban, chức danh trong PIM) được đồng nhất và chọn từ danh sách đã được ban lãnh đạo phê duyệt.
- **Bảo mật và Phân quyền**: Ngăn chặn người dùng trái phép tiếp cận hệ thống, thiết lập quyền hạn chính xác.

## 3. Các nhóm người dùng (User Personas)
- **System Administrator**: Người có quyền sinh sát cao nhất. Quản trị viên hệ thống có nhiệm vụ cấu hình thông số ban đầu, thiết lập danh mục, tạo tài khoản cho nhân sự mới, và bảo trì các thiết lập kỹ thuật (như Email, LDAP). Nhân viên bình thường (ESS) tuyệt đối không được thấy các menu này.
