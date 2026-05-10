# Business Rules: Attendance

## Feature: Punch In/Out Workflow

### BR-ATT-001: Punch Time Margin of Error (3 Minutes)
- **Actor**: Employee
- **Trigger**: Thực hiện Punch In hoặc Punch Out khi cấu hình hệ thống **không cho phép** người dùng tự sửa giờ (User cannot change current time).
- **Precondition**: Cấu hình `canUserChangeCurrentTime` là false.
- **Expected Behavior**: Hệ thống so sánh giờ người dùng gửi lên (`dateTime`) với giờ hiện tại của máy chủ (`getNow`). Sai số cho phép là **+/- 180 giây** (3 phút). Nếu lệch quá 3 phút, API ném lỗi `invalidDateTime`.
- **Source**: `Api/MyAttendanceRecordAPI.php#82[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-ATT-002: Punch-In Overlap Protection
- **Actor**: All Actors
- **Trigger**: Thực hiện Punch In.
- **Precondition**: Thời gian Punch In (UTC) không được nằm trong khoảng thời gian của bất kỳ bản ghi chấm công nào khác đã tồn tại của cùng một nhân viên.
- **Expected Behavior**: Nếu phát hiện trùng lặp, hệ thống ném lỗi `punchInOverlapFound`.
- **Source**: `Api/EmployeeAttendanceRecordAPI.php#311[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-ATT-003: Punch-Out Sequence Requirement
- **Actor**: All Actors
- **Trigger**: Thực hiện Punch Out.
- **Precondition**: Phải tồn tại một bản ghi ở trạng thái `PUNCHED IN` gần nhất.
- **Expected Behavior**: Nếu không tìm thấy bản ghi `PUNCHED IN`, hệ thống ném lỗi `punchOutAlreadyExist` (nghĩa là đã punch out rồi hoặc chưa punch in).
- **Source**: `Api/EmployeeAttendanceRecordAPI.php#634[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-ATT-004: Punch-Out Overlap Protection
- **Actor**: All Actors
- **Trigger**: Thực hiện Punch Out.
- **Expected Behavior**: Thời gian Punch Out không được gây ra sự trùng lặp với các bản ghi khác. Hệ thống gọi `checkForPunchOutOverLappingRecords`.
- **Source**: `Api/EmployeeAttendanceRecordAPI.php#644[controller]`
- **Status**: confirmed
- **Confidence**: high

## Feature: Permissions & Configuration

### BR-ATT-005: Attendance Edit Permissions
- **Actor**: Admin, Supervisor, Employee
- **Trigger**: Thao tác Edit hoặc Delete bản ghi chấm công.
- **Expected Behavior**: Quyền hạn được kiểm tra qua `getAllowedActions` của Workflow State Machine. Thông thường, Admin luôn có quyền sửa/xóa, Supervisor có quyền với nhân viên cấp dưới, và Employee chỉ có quyền sửa/xóa của chính mình nếu cấu hình cho phép.
- **Source**: `Api/EmployeeAttendanceRecordAPI.php#538[controller]`
- **Status**: confirmed
- **Confidence**: high
