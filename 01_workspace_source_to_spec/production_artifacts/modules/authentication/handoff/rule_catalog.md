| Rule ID | Type | Rule Statement | Status | Confidence | Evidence | Note |
|---|---|---|---|---|---|---|
| FR-001 | field | `username`: required, string | confirmed | high | `Controller/ValidateController.php#handle:85` | |
| FR-002 | field | `password`: required, string | confirmed | high | `Controller/ValidateController.php#handle:86` | |
| FR-003 | field | `_token`: required, string, valid CSRF | confirmed | high | `Controller/ValidateController.php#handle:95` | |
| FR-004 | field | `password`: validate password strength | confirmed | high | `PublicApi/PasswordStrengthValidationAPI.php` | |
| BR-001 | business | **CSRF & Credential Validation**: Ưu tiên kiểm tra token CSRF trước. Nếu Token hợp lệ, đối chiếu username và password. Đúng -> session + redirect Home. Sai -> redirect Login + báo lỗi. | confirmed | high | `Controller/ValidateController.php#handle:94` | |
| BR-002 | business | **Password Policy Constraint**: Điểm sức mạnh mật khẩu phụ thuộc vào độ phức tạp và không được vi phạm Password Policies. | confirmed | high | `PublicApi/PasswordStrengthValidationAPI.php#create:106` | |
