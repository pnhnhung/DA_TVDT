# Business Rules: Authentication Module

## Feature: User Login

### BR-001: CSRF & Credential Validation
- **Actor**: Any User
- **Trigger**: Gửi form đăng nhập tại `/auth/validate`.
- **Precondition**: Cung cấp `username`, `password`, và `_token`.
- **Expected Behavior**: Hệ thống ưu tiên kiểm tra token CSRF trước. Nếu Token không hợp lệ, ném ngoại lệ `AuthenticationException::invalidCsrfToken()`. Tiếp theo, đối chiếu `username` và `password`. Nếu đúng, lưu trạng thái authenticated vào Session và redirect tới trang chủ (`HomePagePath`). Nếu sai, redirect ngược lại trang login kèm thông báo lỗi.
- **Source**: `Controller/ValidateController.php#handle:94[controller]`
- **Status**: confirmed
- **Confidence**: high

## Feature: Password Security

### BR-002: Password Policy Constraint on Strength
- **Actor**: Any User
- **Trigger**: Kiểm tra độ mạnh mật khẩu qua API `/api/v2/auth/public/validation/password`.
- **Precondition**: Gửi một chuỗi password.
- **Expected Behavior**: Hệ thống tính toán điểm sức mạnh thuần túy của mật khẩu, VÀ đồng thời kiểm tra chuỗi đó có vi phạm bất kỳ **Password Policies** nào do Admin cấu hình hay không (VD: Phải có chữ hoa, số). NẾU vi phạm policy (có trả về messages lỗi), điểm sức mạnh tối đa chỉ được ghi nhận là `BETTER` (chứ không bao giờ đạt `STRONG` hoặc `EXCELLENT`), ép buộc người dùng phải tuân thủ đúng policy để có mật khẩu hợp lệ.
- **Source**: `PublicApi/PasswordStrengthValidationAPI.php#create:106[controller]`
- **Status**: confirmed
- **Confidence**: high
