# Coverage Plan: Admin

## 1. Unit Test (UT) Level
Tập trung verify mạnh các danh mục cấu hình và User management:
- **User Management**:
  - Validation: empty username/password, invalid length.
  - Unique: Trùng username.
  - Xóa: Không xóa được user đang đăng nhập / admin gốc.
- **Job Configuration**:
  - Upload Specification: Test cả 3 cờ (keep, replace, delete).
  - Validation: Pay grade max > min.
- **Subunit / Structure**:
  - Root protection: Không xóa được root node (id=1).
- **CRUD Operations**: Test cơ bản (Add/Edit/Delete) cho Qualifications, Nationalities, Location.

## 2. Integration Test (IT) Level
- **Cross-module (PIM - Admin)**:
  - Tạo User với `empNumber` không tồn tại ở PIM -> Hệ thống từ chối.
  - PIM xóa Employee -> Kiểm tra trạng thái User tương ứng bên Admin bị vô hiệu hóa (Disabled/Deleted).
- **Data Propagation**: Tạo Job Title/Category -> Hiển thị được trong dropdown lúc tạo/edit Employee bên PIM.

## 3. Usecase Level
- **Luồng quản trị**: Admin thiết lập toàn bộ danh mục cho hệ thống mới (Tạo Cơ cấu tổ chức -> Tạo Job Titles -> Tạo Users).
