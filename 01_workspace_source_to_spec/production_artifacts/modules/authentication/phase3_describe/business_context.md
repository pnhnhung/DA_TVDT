# Business Context: Authentication Module

## 1. Mục Đích & Vai Trò
Phân hệ **Authentication (Xác thực)** là điểm chạm đầu tiên của mọi người dùng với hệ thống OrangeHRM. Nó đóng vai trò làm trạm kiểm soát an ninh (Security Checkpoint), đảm bảo chỉ những nhân sự hợp lệ mới được cấp quyền truy cập (Session) vào dữ liệu công ty.

## 2. Quy trình Nghiệp vụ Cốt lõi (Core Workflows)

### 2.1 Luồng Đăng nhập (Login Flow)
Đây là một luồng Web truyền thống:
1. Người dùng truy cập trang gốc (`/`), hệ thống phát hiện chưa có session nên điều hướng về `/auth/login`.
2. Người dùng điền Form kèm một thẻ bài ẩn (CSRF Token) để chống tấn công giả mạo.
3. Controller Validate xác minh. Nếu hợp lệ, hệ thống tạo Session lưu phía Server và điều hướng người dùng tới Dashboard (Home Page). Nếu không, đẩy lại về trang đăng nhập với thông báo lỗi.

### 2.2 Quên mật khẩu (Password Recovery)
Hỗ trợ nhân viên tự khôi phục tài khoản bằng cách:
1. Nhập username để yêu cầu link khôi phục.
2. Hệ thống sinh một `resetCode` (token một lần).
3. Người dùng truy cập link chứa `resetCode` đó để đặt lại mật khẩu mới. Mật khẩu mới phải thỏa mãn các chính sách bảo mật (Password Policies).

### 2.3 Quản lý chất lượng mật khẩu (Password Strength)
Bảo mật không chỉ là đăng nhập thành công, mà còn là chống bị đoán mật khẩu. Hệ thống cung cấp cơ chế kiểm tra độ mạnh theo thời gian thực kết hợp với bộ luật (Policy) cấu hình sẵn như: Độ dài tối thiểu, Ký tự đặc biệt, Không trùng với username. Cả hai yếu tố (Độ dài phức tạp và Tuân thủ luật) cùng quyết định xem mật khẩu đó có hợp lệ để lưu hay không.
