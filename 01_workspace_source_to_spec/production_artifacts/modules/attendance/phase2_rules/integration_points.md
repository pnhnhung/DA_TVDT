# Integration Points: Attendance

| Source Module | Target Module | Trigger (UI) | Data Passed | Observable Result | Side Effect | Source | Status |
|---|---|---|---|---|---|---|---|
| Attendance | PIM | Bất kỳ API nào gọi `getAll()` hoặc `create()` với `empNumber` | `empNumber` → validate against `Employee` entity | API từ chối nếu `empNumber` không tồn tại hoặc user không có quyền truy cập employee đó | | `Api/EmployeeAttendanceRecordAPI.php#getAll:234 (IN_ACCESSIBLE_ENTITY_ID)` | confirmed |
| Attendance | PIM | Supervisor xem hoặc thao tác chấm công của cấp dưới | `empNumber` của cấp dưới | Hệ thống kiểm tra quan hệ Supervisor-Subordinate từ PIM để quyết định phạm vi dữ liệu | | `Api/Traits/AttendanceRecordPermissionTrait.php#checkAttendanceRecordAccessible:45` | confirmed |
| Attendance | Admin (WorkflowStateMachine) | Admin PUT `/api/v2/attendance/configs` (bật/tắt 3 toggles) | `canUserChangeCurrentTime`, `canUserModifyAttendance`, `canSupervisorModifyAttendance` | Lưu/xóa các bản ghi trong `ohrm_workflow_state_machine` với `FLOW_ATTENDANCE` | Ảnh hưởng ngay lập tức đến tất cả workflow check của ESS và Supervisor | `Api/AttendanceConfigurationAPI.php#update:127`, `Service/AttendanceService.php#enableUserCanChangeCurrentTimeConfiguration` | confirmed |
| Attendance | Time | Dữ liệu chấm công (Punch In/Out records) được dùng để tổng hợp thời gian làm việc theo tuần/tháng trong Dashboard Time at Work widget | `empNumber`, khoảng thời gian | Widget hiển thị tổng giờ làm việc | | `Api/EmployeeAttendanceSummaryAPI.php` (inferred từ file listing) | inferred |
