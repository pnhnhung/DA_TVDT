# Feature Descriptions: Directory Module

## 1. Tra cứu Danh bạ (Employee Directory)

### 1.1 Tìm kiếm và bộ lọc (Search & Filter)
Giao diện danh bạ hỗ trợ lọc qua 4 tiêu chí:
- `empNumber`: Tìm đích danh một nhân viên.
- `nameOrId`: Tìm theo chuỗi văn bản (có thể là một phần tên hoặc thẻ ID nhân viên). Tối đa 100 ký tự.
- `jobTitleId`: Lọc tất cả nhân viên thuộc một Chức danh.
- `locationId`: Lọc tất cả nhân viên làm việc tại một Chi nhánh/Khu vực.

### 1.2 Hiển thị thông tin
- **Chế độ hiển thị (Model)**: Cung cấp tham số `model` để lựa chọn kiểu dữ liệu trả về (cơ bản hoặc chi tiết).
- **Tính năng Read-only tuyệt đối**: Mọi nỗ lực gửi request POST, PUT, DELETE vào API của Directory đều bị hệ thống từ chối (bắn lỗi `NotImplementedException`).
