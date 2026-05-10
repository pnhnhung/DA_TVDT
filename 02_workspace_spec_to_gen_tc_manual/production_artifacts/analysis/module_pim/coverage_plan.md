# Coverage Plan: PIM

## 1. Unit Test (UT) Level
- **Add Employee**: Test boundary tên, upload ảnh lỗi, trùng ID.
- **Contact Details**: Test trùng email (với người khác), trùng email (work = other), format email.
- **Job Details**: Thay đổi ngày Joined Date (kiểm tra log/event trigger).
- **Delete Employee**: Xóa nhân viên bình thường (thành công), xóa Admin hiện tại (thất bại).

## 2. Integration Test (IT) Level
- **Cross-module (PIM -> Leave/Time)**: Add một employee ở PIM, kiểm tra xem bên Leave có tự động sinh record tương ứng hay không.
- **Cross-module (Admin -> PIM)**: Gán Job Title không tồn tại hoặc đã bị xóa -> Fail.
- **File Upload & Export**: Import CSV danh sách nhân viên hợp lệ/không hợp lệ. Export báo cáo PIM.

## 3. Usecase Level
- **Onboarding Flow**: Thêm mới nhân viên -> Điền đầy đủ Personal Details -> Contact Details -> Job Details -> Cấp tài khoản System User.
- **Offboarding Flow**: Terminate nhân viên -> Kiểm tra trạng thái không đăng nhập được nữa.
