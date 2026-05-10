# Business Rules: Dashboard Module

## Feature: My Actions Widget

### BR-001: Module Availability Dependency
- **Actor**: Employee
- **Trigger**: Load màn hình Dashboard (Widget My Actions).
- **Precondition**: Quản trị viên bật/tắt các phân hệ trong hệ thống.
- **Expected Behavior**: Widget chỉ hiển thị cảnh báo công việc cho những module đang được kích hoạt (`getEnabledModuleNameList()`). Nếu module `leave` bị tắt, hệ thống không tính toán số đơn xin nghỉ chờ duyệt. Tương tự với `time`, `performance`, `recruitment`.
- **Source**: `Api/EmployeeActionSummaryAPI.php#getOne:84[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-002: Action Summary Data Scope Security
- **Actor**: Employee / Supervisor / Admin
- **Trigger**: Tính toán số lượng "Pending Actions" (công việc cần xử lý).
- **Precondition**: Nhân sự có Data Group cụ thể.
- **Expected Behavior**: Hệ thống đếm đơn xin nghỉ, bảng chấm công, hoặc lịch phỏng vấn dựa trên **Quyền truy cập dữ liệu** (`accessibleEmpNumbers` và `accessibleCandidateIds`). Nghĩa là, người dùng A chỉ thấy con số "Cần duyệt" của những nhân sự mà A làm quản lý hoặc có quyền xem.
- **Source**: `Api/EmployeeActionSummaryAPI.php#getOne:76[controller]`
- **Status**: confirmed
- **Confidence**: high

## Feature: Leave Widget Configuration

### BR-003: Leave Widget Accessibility Filter
- **Actor**: Employee
- **Trigger**: Bật cờ `showOnlyAccessibleEmployeesOnLeaveToday` qua API Config.
- **Precondition**: Cấu hình được lưu trong DB thành công.
- **Expected Behavior**: Quyết định việc bảng danh sách "Ai nghỉ phép hôm nay" sẽ hiển thị Toàn bộ công ty (false) hay Chỉ hiển thị những người cùng phòng ban/nhóm mà người dùng có quyền truy cập (true).
- **Source**: `Api/EmployeeOnLeaveTodayConfigAPI.php#update:108[controller]`
- **Status**: confirmed
- **Confidence**: high
