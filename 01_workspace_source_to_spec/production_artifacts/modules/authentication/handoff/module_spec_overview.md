# Module Spec: Authentication

## Phạm Vi & Mục Đích
Phân hệ **Authentication** quản lý quá trình xác minh danh tính người dùng khi truy cập vào hệ thống, đảm bảo an toàn truy cập thông qua xác thực Session, kiểm tra độ mạnh mật khẩu và xử lý các luồng khôi phục mật khẩu.

## Actors & Roles
| Role | Quyền chính |
|---|---|
| Any User | Có thể đăng nhập vào hệ thống (nếu có tài khoản hợp lệ). |
| Any User | Có thể yêu cầu đặt lại mật khẩu khi quên. |
| Admin | Được yêu cầu xác thực thêm (Admin Verify) cho các hành động nhạy cảm. |

## Features Chính
| Feature | Mô tả | Source |
|---|---|---|
| User Login | Đăng nhập bằng username, password, CSRF token. | `Controller/ValidateController.php` |
| Password Security | Kiểm tra sức mạnh mật khẩu theo cấu hình hệ thống. | `PublicApi/PasswordStrengthValidationAPI.php` |
| Logout | Hủy session và đăng xuất. | `Controller/LogoutController.php` |
| Password Recovery | Quên mật khẩu và đặt lại mật khẩu mới. | `Controller/ResetPasswordController.php` |
| Admin Verify | Xác thực bổ sung khi thực hiện tác vụ nhạy cảm. | `Controller/AdministratorVerifyController.php` |

## Business Rules Quan Trọng
- **Kiểm tra CSRF**: Token CSRF luôn được kiểm tra trước khi đối chiếu username/password để tránh tấn công giả mạo.
- **Tính điểm mật khẩu**: Mật khẩu dù phức tạp nhưng nếu vi phạm Policy cấu hình thì không bao giờ đạt mức an toàn cao nhất, ép người dùng phải tuân thủ Policy.

## Cross-Module Dependencies
| Module | Relationship | Contract Status |
|---|---|---|
| core (authorization) | Yêu cầu `HomePageService` để lấy đường dẫn trang chủ sau khi đăng nhập thành công. | GAP |

## Gaps & Questions
Hiện tại Phase 2 extraction cho module Authentication chưa đầy đủ, thiếu đặc tả chi tiết về các nghiệp vụ:
- Đăng xuất (Logout)
- Khôi phục mật khẩu (Request & Reset)
- Admin Verify
Các nghiệp vụ này đang được đánh dấu là Gaps và bị block chưa thể tạo test case Automation cho đến khi được bổ sung specs.
