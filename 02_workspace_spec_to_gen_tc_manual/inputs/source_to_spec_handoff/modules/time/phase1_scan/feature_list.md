# Feature List: Time & Attendance

| Feature ID | Nhóm chức năng | Tên API/Endpoint | Method | Route | Controller/API File | Note | Status |
|---|---|---|---|---|---|---|---|
| TIM-001 | Configuration | Khách hàng (Customer) | GET, POST, PUT, DELETE | `/api/v2/time/customers` | `Api/CustomerAPI.php` | Quản lý danh sách KH | inferred |
| TIM-002 | Configuration | Validate Customer | GET | `/api/v2/time/validation/customer-name` | `Api/ValidationCustomerNameAPI.php` | | inferred |
| TIM-003 | Configuration | Dự án (Project) | GET, POST, PUT, DELETE | `/api/v2/time/projects` | `Api/ProjectAPI.php` | Quản lý dự án | inferred |
| TIM-004 | Configuration | Validate Project | GET | `/api/v2/time/validation/project-name` | `Api/ValidateProjectNameAPI.php` | | inferred |
| TIM-005 | Configuration | Project Admin | GET | `/api/v2/time/project-admins` | `Api/ProjectAdminAPI.php` | | inferred |
| TIM-006 | Configuration | Hoạt động (Activity) | GET, POST, PUT, DELETE | `/api/v2/time/project/{projectId}/activities` | `Api/ProjectActivityAPI.php` | Hoạt động trong dự án | inferred |
| TIM-007 | Configuration | Copy Activity | POST | `/api/v2/time/projects/{toProjectId}/activities/copy/{fromProjectId}`| `Api/CopyProjectActivityAPI.php` | | inferred |
| TIM-008 | Configuration | Cấu hình Timesheet Period | GET, PUT | `/api/v2/time/time-sheet-period` | `Api/TimeConfigPeriodAPI.php` | Chu kỳ chấm công | inferred |
| TIM-009 | Configuration | Cấu hình Attendance | GET, PUT | `/api/v2/attendance/configs` | `Api/AttendanceConfigurationAPI.php` | | inferred |
| TIM-010 | Attendance | My Attendance Records | GET, POST, PUT, DELETE | `/api/v2/attendance/records` | `Api/MyAttendanceRecordAPI.php` | Thực hiện Punch In/Out | inferred |
| TIM-011 | Attendance | Employee Attendance Records| GET, POST, PUT, DELETE | `/api/v2/attendance/employees/{empNumber}/records`| `Api/EmployeeAttendanceRecordAPI.php`| Sửa log chấm công | inferred |
| TIM-012 | Attendance | Punch Overlap Check | GET | `/api/v2/attendance/punch-*/overlaps` | `Api/AttendancePunch*RecordOverlapAPI.php`| Chống trùng giờ | inferred |
| TIM-013 | Timesheet | My Timesheets | GET, POST, PUT | `/api/v2/time/timesheets` | `Api/MyTimesheetAPI.php` | ESS tạo và nộp timesheet | inferred |
| TIM-014 | Timesheet | Employee Timesheets | GET, POST, PUT | `/api/v2/time/employees/{empNumber}/timesheets`| `Api/EmployeeTimesheetAPI.php` | Admin duyệt timesheet | inferred |
| TIM-015 | Timesheet | Timesheet Entries | GET, PUT | `/api/v2/time/timesheets/{timesheetId}/entries` | `Api/MyTimesheetItemAPI.php` | Log giờ vào timesheet | inferred |
| TIM-016 | Timesheet | Timesheet Validation | GET | `/api/v2/time/validation/{timesheetId}/project-activity`| `Api/TimesheetProjectActivityUniqueValidationAPI.php`| Tránh duplicate activity | inferred |
| TIM-017 | Timesheet | Timesheet Action Logs | GET | `/api/v2/time/timesheets/{timesheetId}/action-logs`| `Api/TimesheetActionLogAPI.php` | Lịch sử duyệt đơn | inferred |
| TIM-018 | Reports | Báo cáo Time | GET | `/api/v2/time/reports/data` | `Api/TimeReportDataAPI.php` | | inferred |
| TIM-019 | Reports | Báo cáo Attendance | GET | `/api/v2/attendance/employees/summary` | `Api/EmployeeAttendanceSummaryAPI.php`| | inferred |
