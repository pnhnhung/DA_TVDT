# Module Scope: PIM (Personnel Information Management)

## Description
PIM là core module của OrangeHRM, quản lý toàn bộ thông tin vòng đời của nhân viên từ dữ liệu cá nhân, liên lạc, công việc, lương thưởng, bằng cấp, báo cáo người quản lý, và các thuộc tính tùy chỉnh (custom fields). Nó là nguồn dữ liệu trung tâm cho các module khác như Leave, Time, Recruitment.

## Actors & Roles
| Actor | Role Description | Data Scope |
|---|---|---|
| Admin | Quản lý toàn bộ nhân viên và cấu hình PIM | Toàn hệ thống |
| ESS (Employee) | Xem và chỉnh sửa thông tin cá nhân (My Info) | Dữ liệu cá nhân |
| Supervisor | Xem và đánh giá nhân viên cấp dưới | Nhân viên cấp dưới trực tiếp/gián tiếp |

## Key Features
- **Employee Management**: CRUD nhân viên, bao gồm hình ảnh, hợp đồng, chấm dứt hợp đồng.
- **Personal/Contact Details**: Thông tin cá nhân, liên lạc, người phụ thuộc, khẩn cấp.
- **Job/Salary**: Chi tiết công việc, lương thưởng, quản lý thuế, ca làm việc.
- **Qualifications**: Trình độ học vấn, kỹ năng, ngoại ngữ, kinh nghiệm làm việc, chứng chỉ.
- **Organization Structure**: Quản lý cấp trên (supervisor), cấp dưới (subordinate).
- **Configuration**: Termination reasons, reporting methods, custom fields, optional fields.
- **Reports/Data Import**: Báo cáo PIM, import nhân viên từ CSV.

## Boundaries
- **In-Scope**: Quản lý hồ sơ nhân viên, cấu hình dữ liệu tĩnh cho PIM, cấu trúc báo cáo quản lý, custom fields.
- **Out-of-Scope**: Quản lý ngày nghỉ (Leave), cấu trúc tổ chức phòng ban (Admin/Core), tuyển dụng (Recruitment), chấm công (Time/Attendance).

## Technical Context
- **Base Route**: `/api/v2/pim/` (API v2) và `/pim/` (Legacy web)
- **Main Controllers**: `EmployeeController`, `EmployeePersonalDetailController`, `EmployeeJobController`, etc.
- **Key Entities**: Employee, CustomField, TerminationReason, EmployeeSkill, etc.
