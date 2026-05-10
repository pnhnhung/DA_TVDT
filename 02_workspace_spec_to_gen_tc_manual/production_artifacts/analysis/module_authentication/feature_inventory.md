# Feature Inventory: Authentication

| Feature ID | Tên chức năng | Phân loại | Status | Note |
|---|---|---|---|---|
| AUTH-001 | Security: Kiểm tra mật khẩu | API | Inferred | `/api/v2/auth/public/validation/password` |
| AUTH-002 | Session: Xem form đăng nhập | UI | Inferred | `/auth/login` |
| AUTH-003 | Session: Xử lý đăng nhập | API | Inferred | `/auth/validate` (CSRF & Credential check) |
| AUTH-004 | Session: Đăng xuất | API | Inferred | `/auth/logout` (Thiếu spec) |
| AUTH-005 | Recovery: Quên mật khẩu | API | Inferred | `/auth/requestPasswordResetCode` (Thiếu spec) |
| AUTH-006 | Recovery: Đặt lại mật khẩu | API | Inferred | `/auth/resetPassword` (Thiếu spec) |
| AUTH-007 | Security: Xác thực Admin | API | Inferred | `/auth/adminVerify` (Thiếu spec) |
