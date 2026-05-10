# Business Rules: Claim Module

## Feature: Claim Request Creation

### BR-001: Active Event Validation
- **Actor**: Employee / Admin
- **Trigger**: Khởi tạo (Create) Claim Request.
- **Precondition**: `claimEventId` phải thuộc về một Claim Event đang tồn tại và ở trạng thái Active (`getStatus() == true`).
- **Expected Behavior**: Nếu Event bị Inactive hoặc không tồn tại, API ném lỗi `InvalidParamException('claimEventId')`.
- **Source**: `Api/EmployeeClaimRequestAPI.php#setClaimRequest:214[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-002: Employee Termination Check
- **Actor**: Employee / Admin
- **Trigger**: Khởi tạo (Create) Claim Request cho một Employee.
- **Precondition**: Nhân viên (`empNumber`) đang không trong trạng thái bị chấm dứt hợp đồng (Terminated).
- **Expected Behavior**: Hàm `getEmployeeTerminationRecord()` được gọi, nếu trả về kết quả khác null (tức là đã nghỉ việc), API ném lỗi `ForbiddenException`. Không thể làm Claim cho nhân viên đã nghỉ.
- **Source**: `Api/EmployeeClaimRequestAPI.php#create:132[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-003: Initial State & Reference Auto-generation
- **Actor**: System
- **Trigger**: Lưu thành công Claim Request.
- **Precondition**: Vượt qua các khâu validation.
- **Expected Behavior**: Trạng thái mặc định được gán cứng là `REQUEST_STATUS_INITIATED` (Chưa nộp). Một Reference ID được sinh tự động thông qua hàm `getReferenceId()`. Ngày tạo (`createdDate`) là giờ hiện hành.
- **Source**: `Api/EmployeeClaimRequestAPI.php#setClaimRequest:229[controller]`
- **Status**: confirmed
- **Confidence**: high

## Feature: Claim Expense Management

### BR-004: Expense Type Validation
- **Actor**: Employee
- **Trigger**: Thêm hoặc sửa (Create/Update) một khoản chi phí (Claim Expense) vào Claim Request.
- **Precondition**: `expenseTypeId` phải tồn tại và đang ở trạng thái Active.
- **Expected Behavior**: Nếu Expense Type không hợp lệ hoặc Inactive, hệ thống ném lỗi `InvalidParamException('expenseTypeId')`.
- **Source**: `Api/ClaimExpenseAPI.php#setClaimExpense:218[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-005: Workflow Action Restriction on Expenses
- **Actor**: Employee
- **Trigger**: Tạo, sửa, hoặc xóa một Expense Item.
- **Precondition**: Đợt Claim Request tổng (`requestId`) phải đang ở trạng thái cho phép người dùng thực hiện hành động `CLAIM_ACTION_SUBMIT` (tức là còn đang nháp - `INITIATED`).
- **Expected Behavior**: Hệ thống gọi `isActionAllowed(CLAIM_ACTION_SUBMIT, $claimRequest)`. Nếu Claim đã được nộp đi (`SUBMITTED`) hoặc đã được duyệt (`APPROVED`), việc sửa chi phí sẽ bị khóa lại.
- **Source**: `Api/ClaimExpenseAPI.php#setClaimExpense:205[controller]`
- **Status**: confirmed
- **Confidence**: high
