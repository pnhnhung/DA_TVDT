# State Transitions: Attendance

## State Machine: AttendanceRecord

**State Field**: `ohrm_attendance_record.state`
**Flow Name**: `WorkflowStateMachine::FLOW_ATTENDANCE`
**Source**: `orangehrmAttendancePlugin/entity/AttendanceRecord.php`, `Service/AttendanceService.php`

### Valid States
| State Constant | Value | Mô tả |
|---|---|---|
| `STATE_INITIAL` | `"INITIAL"` | Trạng thái khởi đầu — chưa có bản ghi, dùng cho cấu hình workflow |
| `STATE_PUNCHED_IN` | `"PUNCHED IN"` | Đã bấm giờ vào, chưa bấm giờ ra |
| `STATE_PUNCHED_OUT` | `"PUNCHED OUT"` | Đã bấm giờ ra — bản ghi hoàn chỉnh |
| `STATE_CREATED` | `"CREATED"` | Bản ghi được tạo thủ công (Admin/Supervisor) |
| `STATE_NA` | `"NA"` | Trạng thái đặc biệt cho action DELETE (không có resulting state) |

---

### Transitions — ESS USER (Employee tự thao tác)

| Trigger (UI) | Actor | From State | To State | Action Constant | Precondition | Source |
|---|---|---|---|---|---|---|
| Click "Punch In" (`MyAttendanceRecordAPI`) | ESS USER | INITIAL | PUNCHED IN | `ATTENDANCE_ACTION_PROXY_PUNCH_IN` | Không overlap, margin time hợp lệ (±180s nếu cấu hình bật) | `Api/MyAttendanceRecordAPI.php#create` |
| Click "Punch Out" (`MyAttendanceRecordAPI`) | ESS USER | PUNCHED IN | PUNCHED OUT | `ATTENDANCE_ACTION_PROXY_PUNCH_OUT` | Có bản ghi PUNCHED IN trước đó, không overlap | `Api/MyAttendanceRecordAPI.php#update` |
| Sửa bản ghi PUNCHED IN (Edit) | ESS USER | PUNCHED IN | PUNCHED IN | `ATTENDANCE_ACTION_EDIT_PUNCH_IN_TIME` | `canUserModifyAttendance = true` (cấu hình Admin) | `Service/AttendanceService.php#canUserModifyAttendanceConfiguration` |
| Sửa bản ghi PUNCHED OUT (Edit Punch In time trên record đã out) | ESS USER | PUNCHED OUT | PUNCHED OUT | `ATTENDANCE_ACTION_EDIT_PUNCH_IN_TIME` | `canUserModifyAttendance = true` | `Service/AttendanceService.php` |
| Sửa Punch Out time | ESS USER | PUNCHED OUT | PUNCHED OUT | `ATTENDANCE_ACTION_EDIT_PUNCH_OUT_TIME` | `canUserModifyAttendance = true` | `Service/AttendanceService.php` |
| Xóa bản ghi PUNCHED IN | ESS USER | PUNCHED IN | NA | `ATTENDANCE_ACTION_DELETE` | `canUserModifyAttendance = true` | `Service/AttendanceService.php#enableUserCanModifyAttendanceConfiguration` |
| Xóa bản ghi PUNCHED OUT | ESS USER | PUNCHED OUT | NA | `ATTENDANCE_ACTION_DELETE` | `canUserModifyAttendance = true` | `Service/AttendanceService.php` |

---

### Transitions — SUPERVISOR (Chấm công thay / Quản lý)

| Trigger (UI) | Actor | From State | To State | Action Constant | Precondition | Source |
|---|---|---|---|---|---|---|
| Supervisor Punch In thay cho cấp dưới | SUPERVISOR | INITIAL | PUNCHED IN | `ATTENDANCE_ACTION_PROXY_PUNCH_IN` | `canSupervisorModifyAttendance = true` | `Service/AttendanceService.php#enableSupervisorCanModifyAttendanceConfiguration` |
| Supervisor Punch Out thay cho cấp dưới | SUPERVISOR | PUNCHED IN | PUNCHED OUT | `ATTENDANCE_ACTION_PROXY_PUNCH_OUT` | `canSupervisorModifyAttendance = true` | `Service/AttendanceService.php` |
| Supervisor sửa Punch In time của cấp dưới | SUPERVISOR | PUNCHED IN | PUNCHED IN | `ATTENDANCE_ACTION_EDIT_PUNCH_IN_TIME` | `canSupervisorModifyAttendance = true` | `Service/AttendanceService.php` |
| Supervisor sửa Punch In time (bản ghi đã out) | SUPERVISOR | PUNCHED OUT | PUNCHED OUT | `ATTENDANCE_ACTION_EDIT_PUNCH_IN_TIME` | `canSupervisorModifyAttendance = true` | `Service/AttendanceService.php` |
| Supervisor sửa Punch Out time | SUPERVISOR | PUNCHED OUT | PUNCHED OUT | `ATTENDANCE_ACTION_EDIT_PUNCH_OUT_TIME` | `canSupervisorModifyAttendance = true` | `Service/AttendanceService.php` |
| Supervisor xóa bản ghi PUNCHED IN | SUPERVISOR | PUNCHED IN | NA | `ATTENDANCE_ACTION_DELETE` | `canSupervisorModifyAttendance = true` | `Service/AttendanceService.php` |
| Supervisor xóa bản ghi PUNCHED OUT | SUPERVISOR | PUNCHED OUT | NA | `ATTENDANCE_ACTION_DELETE` | `canSupervisorModifyAttendance = true` | `Service/AttendanceService.php` |

---

### Configuration — Admin có thể bật/tắt tất cả Transitions trên

| Cấu hình | API | Ảnh hưởng |
|---|---|---|
| `canUserChangeCurrentTime` | `PUT /api/v2/attendance/configs` | Bật/tắt cho phép Employee chỉnh giờ khác giờ thực tế (±180s margin) |
| `canUserModifyAttendance` | `PUT /api/v2/attendance/configs` | Bật/tắt toàn bộ quyền Edit/Delete của ESS USER |
| `canSupervisorModifyAttendance` | `PUT /api/v2/attendance/configs` | Bật/tắt toàn bộ quyền Proxy/Edit/Delete của SUPERVISOR |
