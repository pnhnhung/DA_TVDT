# User Stories: Admin Module

## Actor: System Administrator

### Feature: System Users Management

**User Story 1**:
As a System Administrator, I want to create a new System User account and link it to an existing employee, So that the employee can log into the OrangeHRM system with appropriate permissions.

**Preconditions**: Tài khoản có quyền tạo User. Nhân viên (Employee) đã được tạo bên module PIM.
**Related rules**: BR-002, FR-001 (đến FR-005)
**Notes**: Nhấn mạnh việc username phải unique và password phải đủ dài.

**User Story 2**:
As a System Administrator, I want to delete obsolete System User accounts, So that former employees or duplicate accounts cannot access the system anymore.

**Preconditions**: User ID không nằm trong danh sách cấm xóa (bản thân admin đang đăng nhập).
**Related rules**: BR-001
**Notes**: Việc xóa User không làm mất dữ liệu Employee trong PIM. Đây chỉ là xóa tài khoản đăng nhập.

### Feature: Job Titles Management

**User Story 3**:
As a System Administrator, I want to manage Job Titles (Create, Update, Delete) and optionally attach a Job Specification file, So that the company's job hierarchy is well-defined and can be assigned to employees in the PIM module.

**Preconditions**: Tài khoản có quyền quản lý Job.
**Related rules**: BR-003, FR-006 (đến FR-010)
**Notes**: Khi cập nhật (Edit), giao diện phải tường minh việc giữ lại (keep), xóa (delete) hay thay thế (replace) file Job Specification đính kèm. API bắt lỗi Bad Request rất chặt chẽ ở logic này (BR-003). Đảm bảo Title phải unique.

### Feature: Job Categories Management

**User Story 4**:
As a System Administrator, I want to manage Job Categories (Create, Update, Delete), So that I can group similar job titles or roles into standardized categories (e.g., "Craft Workers", "Professionals").

**Preconditions**: Tài khoản có quyền quản lý Job.
**Related rules**: FR-011
**Notes**: Tên danh mục (Category Name) bắt buộc phải unique trên toàn hệ thống. Đây là một danh mục đơn giản (Simple CRUD) không đính kèm file hay xử lý phức tạp.

### Feature: Qualifications Management (Skills, Education, etc.)

**User Story 5**:
As a System Administrator, I want to manage employee qualifications (Skills, Education, Languages, Licenses, Memberships), So that I can standardize the list of competencies and credentials that can be assigned to employees.

**Related rules**: FR-012 đến FR-017
**Notes**: Mỗi loại qualification đều yêu cầu tên duy nhất. Riêng Skill có thêm trường Description để mô tả chi tiết yêu cầu kỹ thuật.

### Feature: Organization Management (Locations, Structure)

**User Story 6**:
As a System Administrator, I want to manage company Locations (physical offices), So that I can track where employees are stationed and link locations to work shifts.

**Related rules**: FR-018, FR-019
**Notes**: Tên địa điểm phải unique. Thông tin quốc gia (Country Code) là bắt buộc.

**User Story 7**:
As a System Administrator, I want to define the Company Structure (Subunits), So that I can represent the organization's hierarchy (Departments, Teams) in a tree view.

**Preconditions**: Không thể xóa node gốc (thường là tên tổng công ty).
**Related rules**: BR-004, FR-021
**Notes**: Hệ thống sử dụng cấu trúc Nested Set để quản lý phân cấp. Xóa một subunit sẽ ảnh hưởng đến sơ đồ của toàn công ty.

### Feature: Pay Grades Management

**User Story 8**:
As a System Administrator, I want to define Pay Grades and set corresponding salary ranges for different currencies, So that the HR team can standardize compensation across the organization.

**Preconditions**: Đơn vị tiền tệ (Currency) phải tồn tại trong hệ thống.
**Related rules**: BR-005, FR-022 đến FR-025
**Notes**: Khi thiết lập dải lương, Max Salary phải lớn hơn Min Salary (BR-005). Một Pay Grade có thể có nhiều loại tiền tệ khác nhau.

