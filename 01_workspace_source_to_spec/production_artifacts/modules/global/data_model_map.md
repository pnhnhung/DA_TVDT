# Global Data Model Map

## Modules
- **Admin**: Quản lý thông tin công ty, cơ cấu tổ chức, chức danh, user hệ thống, location, qualification.
- **PIM**: Quản lý thông tin hồ sơ nhân viên (Employee, Dependent, Education, Experience...).
- **Leave**: Quản lý ngày nghỉ, loại ngày nghỉ, leave request, leave entitlement.
- **Time**: Quản lý timesheet, project, attendance.
- **Recruitment**: Quản lý job vacancy, candidate, interview.

## Core Entities
1. **User** (Admin module): Tài khoản đăng nhập hệ thống.
2. **Employee** (PIM module): Hồ sơ nhân viên, là trung tâm của hệ thống. Các entity khác thường có `emp_number` liên kết đến bảng này.
3. **Location** (Admin module): Địa điểm làm việc.
4. **JobTitle** (Admin module): Chức danh công việc.
5. **LeaveRequest** (Leave module): Yêu cầu nghỉ phép, liên kết tới Employee.

## Relationships
- `User` 1-1 `Employee`: Một user account có thể map với 1 employee record.
- `Employee` N-1 `JobTitle`: Nhân viên có chức danh.
- `Employee` N-1 `Location`: Nhân viên thuộc một địa điểm làm việc.
- `LeaveRequest` N-1 `Employee`: Một nhân viên có nhiều yêu cầu nghỉ phép.
