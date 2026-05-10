# Module Scope: Authentication

## 1. Giới thiệu
Phân hệ **Authentication (Đăng nhập & Xác thực)** chịu trách nhiệm gác cổng hệ thống. Nó quản lý quá trình xác minh danh tính người dùng khi họ truy cập vào OrangeHRM, cũng như cung cấp luồng xử lý khi người dùng quên mật khẩu hoặc cần đổi mật khẩu yếu.

## 2. Các nhóm chức năng chính (Feature Groups)

### 2.1 Login & Logout
- **Login Validation**: Kiểm tra thông tin đăng nhập (username, password, CSRF token). Trả về trang chủ nếu đúng, và ném lỗi nếu sai.
- **Logout**: Xóa phiên làm việc (Session) hiện tại.

### 2.2 Password Recovery (Quên mật khẩu)
- Gửi yêu cầu reset mật khẩu bằng username.
- Hệ thống sinh `resetCode` và (thường là) gửi email.
- Trình bày màn hình đặt lại mật khẩu mới dựa trên mã xác thực hợp lệ.

### 2.3 Password Security & Policies
- **Strength Validation**: API Public dùng để kiểm tra độ mạnh của mật khẩu theo thời gian thực khi người dùng gõ (dựa trên cấu hình Policy của công ty).
- **Weak Password Reset**: Luồng ép buộc người dùng phải đổi mật khẩu nếu mật khẩu cũ quá yếu.
- **Admin Verification**: Xác thực thêm một bước đối với các hành động nhạy cảm của Admin.

## 3. Bản chất kỹ thuật
- Phân hệ này hoạt động chủ yếu ở lớp Controller (Traditional Web) thay vì API thuần túy, do nó phải quản lý **Session** và thực hiện **HTTP Redirect** giữa các trang (Ví dụ: Từ form Login sang trang Home).
