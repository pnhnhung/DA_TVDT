# Feature List: Authentication

| Feature ID | Nhóm chức năng | Tên API/Endpoint | Method | Route | Controller/API File | Note | Status |
|---|---|---|---|---|---|---|---|
| AUTH-001 | Security | Kiểm tra mật khẩu | POST | `/api/v2/auth/public/validation/password` | `PublicApi/PasswordStrengthValidationAPI.php` | API check độ mạnh password | inferred |
| AUTH-002 | Session | Xem form đăng nhập | GET | `/auth/login` | `Controller/LoginController.php` | Màn hình Login | inferred |
| AUTH-003 | Session | Xử lý đăng nhập | POST | `/auth/validate` | `Controller/ValidateController.php` | Kiểm tra username/password | inferred |
| AUTH-004 | Session | Đăng xuất | GET | `/auth/logout` | `Controller/LogoutController.php` | Hủy session | inferred |
| AUTH-005 | Recovery | Quên mật khẩu | GET, POST | `/auth/requestPasswordResetCode` | `Controller/RequestPasswordController.php` | Yêu cầu reset mã | inferred |
| AUTH-006 | Recovery | Đặt lại mật khẩu | POST | `/auth/resetPassword` | `Controller/ResetPasswordController.php` | Lưu password mới | inferred |
| AUTH-007 | Security | Xác thực Admin | POST | `/auth/adminVerify` | `Controller/AdministratorVerifyController.php` | Nhập lại pass khi làm việc nhạy cảm | inferred |
