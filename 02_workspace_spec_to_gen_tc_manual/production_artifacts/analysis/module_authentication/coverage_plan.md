# Coverage Plan: Authentication

## 1. Unit Test (UT) Level
Tập trung vào validation cục bộ của từng API/Form:
- **AUTH-003 (Login)**: 
  - UT kiểm tra required fields (username, password, _token).
  - UT kiểm tra CSRF token invalid -> exception.
  - UT kiểm tra sai username/password -> báo lỗi.
  - UT kiểm tra đúng credentials -> success.
- **AUTH-001 (Password Security)**:
  - UT kiểm tra password không thỏa policy -> max điểm là BETTER.

## 2. Integration Test (IT) Level
Tập trung vào luồng giữa các module/session:
- **Cross-module**: Login thành công -> Phải redirect về đúng trang chủ (HomePagePath từ core module).
- **Session state**: Kiểm tra trạng thái authenticated được lưu trữ sau khi login (ví dụ gọi thử 1 API cần quyền xem có bị 401 không).

## 3. Usecase Level
Tập trung vào business journey:
- **Happy Path**: Đăng nhập hệ thống bằng tài khoản hợp lệ.
- **Alternative/Exception**: Đăng nhập bằng tài khoản bị khóa/hết hạn (nếu có evidence trong PIM/Admin, có thể liên kết sau).
