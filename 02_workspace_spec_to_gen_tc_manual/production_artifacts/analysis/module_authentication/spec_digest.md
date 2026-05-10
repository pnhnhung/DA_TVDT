# Spec Digest: Authentication

## 1. Phạm Vi & Mục Đích
Phân hệ **Authentication** quản lý quá trình xác minh danh tính người dùng khi truy cập vào hệ thống, đảm bảo an toàn truy cập thông qua xác thực Session, kiểm tra độ mạnh mật khẩu và xử lý các luồng khôi phục mật khẩu.

## 2. Actors & Roles
- **Any User**: Đăng nhập (nếu có tài khoản hợp lệ), yêu cầu đặt lại mật khẩu khi quên.
- **Admin**: Xác thực bổ sung (Admin Verify) cho các hành động nhạy cảm.

## 3. Core Entities
- **User**: Tài khoản đăng nhập hệ thống. Mối quan hệ 1-1 với Employee.

## 4. Key Business Rules
- **BR-001: CSRF & Credential Validation**: Ưu tiên kiểm tra CSRF token trước. Ném ngoại lệ `AuthenticationException::invalidCsrfToken()` nếu không hợp lệ. Sau đó đối chiếu credentials.
- **BR-002: Password Policy Constraint on Strength**: Khi kiểm tra độ mạnh, nếu vi phạm cấu hình Password Policies thì độ mạnh tối đa chỉ là `BETTER`, không bao giờ đạt `STRONG` hoặc `EXCELLENT`.

## 5. Cross-Module Dependencies
- Phụ thuộc vào module `core (authorization)` để lấy HomePageService (hiện tại là GAP).

## 6. Gaps & Limitations
- Đăng xuất (Logout), Khôi phục mật khẩu (Request & Reset), Admin Verify chưa có specs chi tiết -> Bị block.
- Logic PasswordStrengthService, Reset code expiry, EnforcePasswordRequest, LDAP auth chưa được extract rõ.
