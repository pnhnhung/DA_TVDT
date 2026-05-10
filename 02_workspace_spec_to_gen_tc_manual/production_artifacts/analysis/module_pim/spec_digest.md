# Spec Digest: PIM

## 1. Phạm Vi & Mục Đích
PIM là cốt lõi quản lý hồ sơ nhân viên trong OrangeHRM, cung cấp nguồn dữ liệu tập trung về định danh, liên lạc và công việc của mỗi cá nhân, làm nền tảng cho các module Leave, Time, Recruitment.

## 2. Actors & Roles
- **Admin**: Toàn quyền thêm, sửa, xóa, terminate hồ sơ nhân viên.
- **ESS**: Xem và sửa thông tin cá nhân của chính mình (My Info).

## 3. Core Entities
- **Employee**: Hồ sơ nhân viên (First Name, Last Name, Emp Number).
- **Personal Details, Contact Details, Job Details**: Các thông tin mở rộng.

## 4. Key Business Rules
- **BR-001 (Add Employee)**: Có thể qua UI hoặc import CSV. `employeeId` unique. Kích hoạt event `EmployeeAddedEvent` cho các hệ thống khác lắng nghe.
- **BR-002 (Delete Employee)**: Không được xóa admin mặc định và user đang thực hiện thao tác. Dispatch event `EmployeeDeletedEvent`.
- **BR-003 (Update Personal Details)**: Một số trường bị ẩn theo cấu hình (nickname, smoker, ssnNumber).
- **BR-004 (Update Contact Details)**: `workEmail` và `otherEmail` phải duy nhất và KHÔNG ĐƯỢC TRÙNG NHAU.
- **BR-005 (Update Job Details)**: Cập nhật chức danh, phòng ban... Kích hoạt event `JoinedDateChangedEvent` nếu thay đổi ngày gia nhập.

## 5. Cross-Module Dependencies
- **Leave / Time**: Đều subscribe sự kiện tạo/xóa nhân viên để cấp phát tài nguyên tương ứng (quota nghỉ, timesheet).
- Phụ thuộc danh mục cấu hình từ **Admin** (Job Title, Pay Grade, etc).

## 6. Gaps & Limitations
- Chưa rõ ID chính xác của Admin mặc định không được xóa.
- Tính năng Reactivate Employee không có API rõ ràng (nghi ngờ thao tác ẩn qua event).
