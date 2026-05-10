# Feature Descriptions: Authentication Module

## 1. Tính năng Đăng nhập & Xác thực (Login / Logout)

### 1.1 Login (Đăng nhập Web)
- Hệ thống chặn việc login từ các form ngoại lai bằng cách bắt buộc đi kèm tham số `_token` (CSRF Token) được sinh động từ trang login gốc.
- Khi validation thành công, hệ thống thiết lập Cookie/Session ID và trả về Redirect 302 tới giao diện chính. Mọi request tiếp theo của người dùng lên API sẽ sử dụng Session này để chứng minh quyền.

### 1.2 Verify Admin
- Một tính năng bảo mật tăng cường: Bắt buộc Admin phải nhập lại mật khẩu hiện tại (dù đang đăng nhập) trước khi được phép vào màn hình cấu hình đặc biệt nhạy cảm.

## 2. Tính năng Quản lý Mật khẩu

### 2.1 Password Policy Validation
- API Validation tính toán cả 2 thành phần: Điểm thuật toán (Độ dài, độ ngẫu nhiên) và Điểm quy định (Quy định bắt buộc do công ty đặt ra). Nếu vi phạm quy định công ty, mật khẩu sẽ bị hạ mức đánh giá.

### 2.2 Reset Password (Khôi phục)
- Khi quên mật khẩu, user yêu cầu Reset Code.
- Sinh ra link Reset có chứa biến `resetCode`. Link này chỉ sử dụng được 1 lần và có hạn thời gian.

### 2.3 Weak Password Enforcement
- Hệ thống dò tìm các mật khẩu quá yếu (Ví dụ do Admin set mặc định ban đầu là `123456`) và ép người dùng phải đi qua luồng `changeWeakPassword` ngay ở lần đăng nhập tiếp theo. Cấm truy cập Dashboard cho đến khi đổi xong.
