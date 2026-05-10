# Testcase Generation Gaps — Authentication
> Workflow: 09 | Date: 2026-05-02

| Gap ID | Testcase affected | Mô tả | Loại | Đề xuất làm rõ |
|---|---|---|---|---|
| G-AUTH-01 | IT-AUTH-005, IT-AUTH-005b | Số lần sai mật khẩu trước khi lock chưa confirm | Thiếu thông tin | Kiểm tra env config / `AuthController` threshold variable |
| G-AUTH-02 | IT-AUTH-008, IT-AUTH-008b | `blockedTo` duration chưa rõ | Thiếu thông tin | Kiểm tra migration / seeder hoặc config file |
| G-AUTH-03 | IT-AUTH-015b | OTP expire TTL | Thiếu thông tin | Kiểm tra `OtpService` hoặc `.env` config |
| G-AUTH-04 | IT-AUTH-012b | Password tạm expire | Thiếu thông tin | Kiểm tra `ForgotPasswordService` TTL config |
| G-AUTH-05 | IT-AUTH-019 | Refresh token behavior | Sơ sài | Confirm refresh token endpoint + TTL với Dev |
