# Integration Points: Admin Module

| Source Module | Target Module | Trigger | Data Passed | Observable Result | Side Effect | Source | Status |
|---|---|---|---|---|---|---|---|
| Admin | PIM | 1. Click Save (Add/Edit User) | Employee ID (`empNumber`) | System User liên kết chặt chẽ với Employee record trong PIM | | `Api/UserAPI.php#292[controller]` | confirmed |
| Admin | Authentication | Màn hình Login | Username / Password | Cho phép xác thực đăng nhập vào hệ thống | | inferred | inferred |
