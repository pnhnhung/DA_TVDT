# User Stories: Authentication Module

## Topic: System Access

### US-001: Đăng nhập vào hệ thống
**Là một** Người dùng (Nhân viên / Admin)
**Tôi muốn** nhập Username và Password của mình để đăng nhập
**Để** truy cập vào các tính năng bên trong hệ thống.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Nếu tôi nhập sai mật khẩu hoặc tài khoản không tồn tại, hiển thị "Invalid credentials".
- Nếu tôi đăng nhập thành công, hệ thống tự động đưa tôi về trang chủ (Dashboard).
- Để chống hacker tạo form đăng nhập giả, nếu token CSRF của tôi không hợp lệ, hệ thống từ chối ngay lập tức.

### US-002: Đăng xuất an toàn
**Là một** Người dùng
**Tôi muốn** ấn nút Đăng xuất (Logout)
**Để** hủy phiên làm việc của tôi, tránh người khác dùng chung máy tính xâm nhập vào tài khoản.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Phiên làm việc (Session) trên máy chủ bị hủy bỏ.
- Tôi bị đẩy về màn hình Login và không thể bấm "Back" trên trình duyệt để vào lại.

## Topic: Password Security

### US-003: Đặt lại mật khẩu khi quên
**Là một** Người dùng
**Tôi muốn** khai báo việc tôi quên mật khẩu
**Để** hệ thống cấp cho tôi quyền tạo lại mật khẩu mới thông qua email.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Link đặt lại mật khẩu phải chứa một mã `resetCode` độc nhất.
- Khi nhập mật khẩu mới, nó phải được hệ thống xác thực (Validation API) tuân thủ đúng độ mạnh và chính sách công ty.
