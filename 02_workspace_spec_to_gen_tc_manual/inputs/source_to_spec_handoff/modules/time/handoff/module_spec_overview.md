# Module Spec: Time

## Phạm Vi & Mục Đích
Phân hệ **Time** quản lý thời gian làm việc (Timesheet) của nhân viên được phân bổ cho các dự án (Projects) và khách hàng (Customers) cụ thể. Hệ thống cung cấp luồng công việc (Workflow) từ khi nhân viên nộp bảng công cho đến khi quản lý duyệt.

## Actors & Roles
| Role | Quyền chính |
|---|---|
| Admin | Quản lý danh mục Khách hàng, Dự án, Hoạt động. Toàn quyền xem và duyệt Timesheet của mọi nhân viên. |
| Project Admin | Quản lý và theo dõi các dự án được giao quyền, bao gồm các hoạt động dự án. |
| Supervisor | Duyệt (Approve/Reject) báo cáo thời gian làm việc của cấp dưới trực tiếp. |
| Employee | Ghi nhận giờ làm việc thực tế cho từng dự án (ESS - Employee Self Service). |

## Features Chính
| Feature | Mô tả | Source |
|---|---|---|
| Customer Management | Thêm, sửa, xóa Khách hàng. | `Api/CustomerAPI.php` |
| Project Management | Tạo dự án, phân công Project Admin cho Khách hàng. | `Api/ProjectAPI.php` |
| Project Activity | Quản lý các hạng mục công việc trong một dự án. | `Api/ProjectActivityAPI.php` |
| Timesheet Workflow | Vòng đời của bảng chấm công (Submit, Approve, Reject, Reset). | `Api/EmployeeTimesheetAPI.php` |
| Timesheet Logging | Ghi nhận số giờ làm việc (từng ngày) cho từng Project Activity. | `Api/EmployeeTimesheetItemAPI.php` |

## Field Rules Quan Trọng
- **Customer**: Tên khách hàng (tối đa 50 ký tự) là duy nhất.
- **Project**: Tên dự án (tối đa 100 ký tự) là duy nhất theo từng Khách hàng. Chỉ hỗ trợ tối đa 5 Project Admins.
- **Project Activity**: Tên hoạt động là duy nhất trong một dự án.

## Business Rules Quan Trọng
- **Data Integrity Constraints**: Hệ thống chống xóa cứng (hoặc mềm) đối với Customer, Project, Activity nếu đã có bất kỳ bản ghi Timesheet nào (dù của ai) liên kết tới chúng.
- **Workflow Protection**: Nhân viên không thể sửa dữ liệu giờ làm (`entries`) nếu Timesheet đã `Submitted` hoặc `Approved`. Thao tác đổi trạng thái được kiểm soát bằng một State Machine trung tâm.

## Cross-Module Dependencies
| Module | Relationship | Contract Status |
|---|---|---|
| PIM | Hệ thống dựa vào PIM để lấy Employee ID và sơ đồ tổ chức (Supervisor) nhằm phân quyền duyệt Timesheet. | READY |
| Admin | Hệ thống kiểm tra User Role (Admin vs ESS) qua dữ liệu từ phân hệ Admin. | READY |

## Gaps & Questions
Hiện tại Phase 2 extraction cho module Time đã **hoàn chỉnh** và bao phủ rất tốt toàn bộ business logic.
Không có Gap nào. Sẵn sàng cho Handoff.
