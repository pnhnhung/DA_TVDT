# Rule Catalog: Attendance

## Field Rules (FR)
| Rule ID | Entity | Field | Constraint | Source Trace | Status |
|---|---|---|---|---|---|
| FR-ATT-001 | attendance_record | date | API_DATE | Api/EmployeeAttendanceRecordAPI.php#444 | confirmed |
| FR-ATT-002 | attendance_record | time | H:i | Api/EmployeeAttendanceRecordAPI.php#449 | confirmed |
| FR-ATT-003 | attendance_record | timezoneOffset | float | Api/EmployeeAttendanceRecordAPI.php#453 | confirmed |
| FR-ATT-004 | attendance_record | timezoneName | string | Api/EmployeeAttendanceRecordAPI.php#457 | confirmed |
| FR-ATT-005 | attendance_record | note | max:250 | Api/EmployeeAttendanceRecordAPI.php#460 | confirmed |
| FR-ATT-006 | attendance_record | empNumber | active employee | Api/EmployeeAttendanceRecordAPI.php#230 | confirmed |

## Business Rules (BR)
| Rule ID | Feature | Rule Description | Source Trace | Status |
|---|---|---|---|---|
| BR-ATT-001 | Punch In/Out | Sai số thời gian cho phép +/- 180 giây | Api/MyAttendanceRecordAPI.php#82 | confirmed |
| BR-ATT-002 | Punch In | Ngăn chặn trùng lặp thời gian khi Punch In | Api/EmployeeAttendanceRecordAPI.php#311 | confirmed |
| BR-ATT-003 | Punch Out | Phải có trạng thái PUNCHED IN trước đó | Api/EmployeeAttendanceRecordAPI.php#634 | confirmed |
| BR-ATT-004 | Punch Out | Ngăn chặn trùng lặp thời gian khi Punch Out | Api/EmployeeAttendanceRecordAPI.php#644 | confirmed |
| BR-ATT-005 | Edit/Delete | Quyền hạn sửa/xóa dựa trên Workflow | Api/EmployeeAttendanceRecordAPI.php#538 | confirmed |
