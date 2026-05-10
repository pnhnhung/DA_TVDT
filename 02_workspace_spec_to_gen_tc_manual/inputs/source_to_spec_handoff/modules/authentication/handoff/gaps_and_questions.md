| Gap ID | Related Rule ID | Feature | Description | Impact on Testing | Investigation Status | Action |
|---|---|---|---|---|---|---|
| GAP-AUTH-001 | N/A | Password strength | PasswordStrengthService chưa extract — min length, uppercase, số, ký tự đặc biệt chưa rõ. | Không test được boundary password. | Đã điều tra — file tồn tại chưa đọc | Cần đọc PasswordStrengthService |
| GAP-AUTH-002 | N/A | Reset code expiry | Thời gian hết hạn của reset token chưa rõ. | Không test được expired token scenario. | Đã điều tra — entity đọc được, service chưa đọc | Cần đọc ResetPasswordService |
| GAP-AUTH-003 | N/A | EnforcePasswordRequest | Khi nào Admin enforce reset, rules là gì chưa rõ. | Không test được forced password change flow. | Đã điều tra — chưa đọc entity đầy đủ | Cần đọc EnforcePasswordRequest.php |
| GAP-AUTH-004 | N/A | LDAP auth | LDAP config rules và fallback behavior chưa extract. | Không test được LDAP login flow. | Đã điều tra — tồn tại trong Auth/ | Cần extract từ LDAP config |
