# User Stories: PIM

## Actor: Admin

### Feature: Add Employee

**User Story**:
As an Admin, I want to add a new employee to the system, So that their records and lifecycle can be managed within OrangeHRM.

**Preconditions**: Đăng nhập với quyền có chức năng `EMPLOYEE_ACTION_ADD`.
**Related rules**: BR-001, FR-001, FR-002, FR-003, FR-004
**Notes**: Việc thêm mới nhân viên là bước đầu tiên để họ có thể sử dụng các module khác như Leave hay Time.

---

### Feature: Delete Employee

**User Story**:
As an Admin, I want to delete employee records, So that I can remove duplicate or incorrect entries from the system.

**Preconditions**: Đăng nhập với quyền `EMPLOYEE_ACTION_DELETE_ACTIVE` hoặc `EMPLOYEE_ACTION_DELETE_TERMINATED`. Employee không nằm trong danh sách không thể xóa (admin mặc định, user hiện tại).
**Related rules**: BR-002
**Notes**: Hành động này khác với Terminate (cho nghỉ việc). Delete là xóa cứng dữ liệu, thường chỉ dùng cho dữ liệu sai sót.

---

## Actor: ESS (Employee)

### Feature: Update Personal Details

**User Story**:
As an Employee (ESS), I want to update my personal details, So that my HR records (like address, marital status, license) remain accurate.

**Preconditions**: Tài khoản ESS đang trỏ đến Employee record hiện tại.
**Related rules**: BR-003, FR-006 (đến FR-021)
**Notes**: Một số trường thông tin quốc gia cụ thể (SSN, SIN) hoặc trường cũ (nickname) chỉ hiển thị nếu cấu hình Admin bật lên.

### Feature: Update Contact Details

**User Story**:
As an Employee (ESS) or Admin, I want to update my/their contact details (address, phone, emails), So that the company can reach out to me/them and I can receive Leave notifications correctly.

**Preconditions**: Tài khoản có quyền sửa Contact Details.
**Related rules**: BR-004, FR-022 (đến FR-032)
**Notes**: Work Email rất quan trọng vì nó liên kết với tính năng Notification của toàn hệ thống (đặc biệt là báo nghỉ phép bên Leave module). Work email và Other email phải là duy nhất và khác nhau.

### Feature: Update Job Details

**User Story**:
As an Admin or HR Personnel, I want to update an employee's Job Details (like Job Title, Status, Category, Joined Date), So that their employment record reflects their current position in the company and cross-module policies (like Leave entitlement rules based on seniority) are applied correctly.

**Preconditions**: Tài khoản có quyền sửa Job Details (thường không dành cho ESS). Các ID ngoại lai phải tồn tại.
**Related rules**: BR-005, FR-033 (đến FR-038)
**Notes**: Nếu thay đổi `Joined Date`, cần test thật kỹ luồng Integration sang module Leave vì sự thay đổi này sẽ làm trigger việc tính toán lại (recalculate) số ngày nghỉ được cấp của nhân viên.
