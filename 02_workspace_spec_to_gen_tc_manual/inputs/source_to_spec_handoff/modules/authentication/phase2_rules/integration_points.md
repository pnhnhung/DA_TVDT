# Integration Points: Authentication

| Source Module | Target Module | Trigger (UI) | Data Passed | Observable Result | Side Effect | Source | Status |
|---|---|---|---|---|---|---|---|
| Authentication | Admin (User Management) | User đăng nhập | `userName`, `password` | Validate credentials từ bảng `ohrm_user` (Admin module quản lý) | Ghi `LoginLog` record | `Controller/LoginController.php`, `Auth/LocalAuthProvider.php` | confirmed |
| Authentication | Admin (LDAP config) | User đăng nhập qua LDAP | `userName`, `password` | Gửi credentials đến LDAP server được cấu hình trong Admin | Auth thành công → tạo session | `Auth/AuthProviderChain.php` | confirmed |
| Authentication | PIM | User đăng nhập thành công | `empNumber` | Session được bind với Employee record | | inferred từ AuthUser session | inferred |
