# Feature Descriptions: PIM

## Feature: Add Employee

**Mục đích**: Là tính năng thiết yếu để đưa nhân sự mới vào hệ thống quản lý nhân sự OrangeHRM. Employee record là trung tâm liên kết của hầu hết các dữ liệu hệ thống.
**Actor**: Admin
**Flow chính**: Nhập First Name, Last Name (bắt buộc), Middle Name (tùy chọn), Employee ID (tùy chọn) và Profile Picture. Bấm lưu để tạo hồ sơ.
**Kết quả khi thành công**: Record mới được tạo trong bảng Employee. Các module khác có đăng ký lắng nghe sự kiện `EmployeeAddedEvent` sẽ thực thi logic của chúng.
**Kết quả khi thất bại**: Nếu Employee ID bị trùng hoặc dữ liệu thiếu sót, hệ thống sẽ từ chối tạo và hiển thị lỗi validation.
**Ràng buộc nghiệp vụ quan trọng**: Bắt buộc phải có quyền thêm mới.
**Related rules**: BR-001, FR-001, FR-002, FR-003, FR-004

---

## Feature: Delete Employee

**Mục đích**: Loại bỏ các hồ sơ nhân viên bị tạo nhầm, sai sót hoặc dữ liệu rác.
**Actor**: Admin
**Flow chính**: Chọn một hoặc nhiều nhân viên trong danh sách và chọn hành động Delete.
**Kết quả khi thành công**: Hồ sơ nhân viên bị xóa khỏi database, sự kiện `EmployeeDeletedEvent` được bắn ra để dọn dẹp các dữ liệu liên quan ở các module khác.
**Kết quả khi thất bại**: Trả về lỗi nếu cố gắng xóa Admin chính hoặc người đang đăng nhập.
**Ràng buộc nghiệp vụ quan trọng**: Chỉ sử dụng cho việc dọn dẹp dữ liệu, không dùng để cho nhân viên nghỉ việc (hành động đó gọi là Terminate). Không thể xóa Admin mặc định.
**Related rules**: BR-002
