# Business Rules: Time Module

## Feature: Customer Management

### BR-001: Delete Customer Constraint
- **Actor**: Admin
- **Trigger**: Nhấn xóa Customer(s).
- **Precondition**: Customer ID phải tồn tại.
- **Expected Behavior**: Xóa cứng hoặc mềm customer.
- **Side Effect / Constraints**: NẾU có bất kỳ bản ghi chấm công (Timesheet Items) nào đang được log thuộc về Customer này (gián tiếp qua Project -> Activity), API sẽ ném lỗi `Not Allowed to Delete Customer(s) Which Have Time Logged Against`.
- **Source**: `Api/CustomerAPI.php#delete:215[controller]` (Note: logic này nằm ở `CustomerServiceException` trong khối catch của Delete API).
- **Status**: confirmed
- **Confidence**: high

## Feature: Project Management

### BR-002: Add Project Constraint
- **Actor**: Admin
- **Trigger**: Tạo dự án mới.
- **Precondition**: `customerId` truyền lên phải là Customer hợp lệ. Tên dự án (`name`) phải duy nhất trong phạm vi của một Customer.
- **Expected Behavior**: Tạo dự án mới. Gán tối đa 5 Project Admins (thông qua `projectAdminsEmpNumbers`).
- **Source**: `Api/ProjectAPI.php#create:383[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-003: Delete Project Constraint
- **Actor**: Admin
- **Trigger**: Xóa Project(s).
- **Precondition**: Tương tự Customer, **KHÔNG ĐƯỢC PHÉP** xóa dự án nếu nó đã có người dùng chấm công (Timesheet items logged). Hệ thống sẽ lặp qua từng ID và kiểm tra `hasTimesheetItemsForProject()`.
- **Expected Behavior**: Ném lỗi `BadRequestException` nếu dính constraint. Ngược lại xóa thành công.
- **Source**: `Api/ProjectAPI.php#delete:506[controller]`
- **Status**: confirmed
- **Confidence**: high

## Feature: Project Activity Management

### BR-004: Delete Project Activity Constraint
- **Actor**: Admin / Project Admin
- **Trigger**: Xóa Activity(s) của một Project.
- **Precondition**: KHÔNG ĐƯỢC PHÉP xóa Activity nếu đã có Timesheet item được log.
- **Expected Behavior**: Ném lỗi nếu vi phạm (ném `ProjectServiceException` -> `Bad Request`).
- **Source**: `Api/ProjectActivityAPI.php#delete:256[controller]`
- **Status**: confirmed
- **Confidence**: high

## Feature: Timesheet Management

### BR-005: Timesheet Search Date Range
- **Actor**: ESS / Supervisor / Admin
- **Trigger**: Lọc danh sách Timesheet theo ngày.
- **Precondition**: Nếu truyền `fromDate`, bắt buộc phải truyền `toDate` và ngược lại. `fromDate` không được lớn hơn `toDate`.
- **Expected Behavior**: Nếu thiếu 1 trong 2 hoặc `fromDate > toDate`, API trả lỗi 400 Bad Request.
- **Source**: `Api/EmployeeTimesheetAPI.php#validateDateInputs:150[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-006: Update Timesheet Action Workflow
- **Actor**: ESS / Supervisor / Admin
- **Trigger**: Thay đổi trạng thái của Timesheet (Submit, Approve, Reject, Reset).
- **Precondition**: Action truyền lên phải nằm trong `TIMESHEET_ACTION_MAP`. Hệ thống kiểm tra Workflow State Machine xem user hiện tại có quyền thực hiện action này trên Timesheet hiện tại không (`getAllowedWorkflowsForTimesheet()`).
- **Expected Behavior**: Nếu được phép, chuyển đổi trạng thái của timesheet sang state mới và ghi log vào `TimesheetActionLog`. Nếu không hợp lệ, ném `BadRequestException`.
- **Source**: `Api/EmployeeTimesheetAPI.php#update:424[controller]` và `Service/TimesheetService.php#getAllowedWorkflowsForTimesheet:260[service]`
- **Status**: confirmed
- **Confidence**: high

### BR-007: Edit Timesheet Items Access
- **Actor**: ESS
- **Trigger**: Cập nhật giờ làm việc (entries) trong timesheet.
- **Precondition**: Timesheet KHÔNG ở trạng thái `APPROVED` (chính xác hơn, nếu AllowedAction duy nhất là `APPROVED` thì bị từ chối sửa - tức là nó đang ở state chờ duyệt hoặc đã duyệt).
- **Expected Behavior**: Ném `BadRequestException("Performed action not allowed")`. Ngược lại, xóa `deletedEntries` và thêm/cập nhật `entries`.
- **Source**: `Api/EmployeeTimesheetItemAPI.php#update:399[controller]`
- **Status**: confirmed
- **Confidence**: high
