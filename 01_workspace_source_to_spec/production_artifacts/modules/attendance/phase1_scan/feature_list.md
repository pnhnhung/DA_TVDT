# Feature List: Attendance

| ID | Feature Name | Description | Actors | API / Controller | Status |
|---|---|---|---|---|---|
| F-ATT-001 | Punch In | Nhân viên thực hiện bắt đầu ca làm việc. | Employee | `MyAttendanceRecordAPI::create` | confirmed |
| F-ATT-002 | Punch Out | Nhân viên kết thúc ca làm việc. | Employee | `MyAttendanceRecordAPI::update` | confirmed |
| F-ATT-003 | View My Attendance | Xem danh sách bản ghi chấm công cá nhân. | Employee | `MyAttendanceRecordAPI::getAll` | confirmed |
| F-ATT-004 | View Employee Attendance | Quản lý xem danh sách chấm công của nhân viên khác. | Admin, Supervisor | `EmployeeAttendanceRecordAPI::getAll` | confirmed |
| F-ATT-005 | Edit Attendance Record | Chỉnh sửa giờ Punch In/Out của một bản ghi. | Admin, Supervisor | `AttendanceRecordAPI::update` | confirmed |
| F-ATT-006 | Delete Attendance Record | Xóa bản ghi chấm công. | Admin | `EmployeeAttendanceRecordAPI::delete` | confirmed |
| F-ATT-007 | Configure Attendance | Thiết lập cấu hình chấm công (quyền sửa, v.v.). | Admin | `AttendanceConfigurationAPI` | confirmed |
| F-ATT-008 | Overlap Check | Kiểm tra xem giờ punch mới có bị trùng với bản ghi cũ không. | All | `AttendancePunchInRecordOverlapAPI` | confirmed |

## Source Trace
- `orangehrmAttendancePlugin/Api/`
- `orangehrmAttendancePlugin/config/routes.yaml`
