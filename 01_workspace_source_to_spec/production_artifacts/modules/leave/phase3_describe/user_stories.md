# User Stories: Leave Module

## Actor: System Administrator

### Feature: Leave Configuration - Leave Types

**User Story 1**:
As a System Administrator, I want to manage Leave Types (Create, Update, Delete), So that I can define the specific categories of time off (e.g., Annual Leave, Sick Leave) available to employees.

**Preconditions**: Tài khoản có quyền quản lý cấu hình Leave.
**Related rules**: BR-001, FR-001 (đến FR-002)
**Notes**: Tên Leave Type bắt buộc phải là duy nhất. 

### Feature: Leave Configuration - Holidays

**User Story 2**:
As a System Administrator, I want to manage public Holidays (Create, Update, Delete), So that the system knows which days are non-working days and excludes them when calculating leave durations for employees.

**Preconditions**: Tài khoản có quyền quản lý cấu hình Leave.
**Related rules**: BR-002, FR-003 (đến FR-006)
**Notes**: Cần cung cấp khả năng chỉ định ngày lễ là Cả ngày (Full Day) hoặc Nửa ngày (Half Day). Các ngày lễ định kỳ (Recurring) sẽ được tự động áp dụng hàng năm.

### Feature: Leave Entitlements

**User Story 3**:
As a HR Admin or Supervisor, I want to assign leave entitlements to one or multiple employees, So that they have a balance of leave days they can apply for.

**Preconditions**: Employee phải tồn tại. Supervisor chỉ được cấp phép cho cấp dưới.
**Related rules**: BR-003, FR-007 (đến FR-012)
**Notes**: Khi gán Bulk (nhiều người cùng lúc), hệ thống cho phép lọc danh sách nhân viên theo Location hoặc Subunit. Quỹ phép (Entitlement) không được là số âm.

**User Story 4**:
As a HR Admin or Supervisor, I want to delete unused leave entitlements, So that I can correct mistakes made during assignment.

**Preconditions**: Quỹ phép không dính tới đơn xin nghỉ nào.
**Related rules**: BR-004
**Notes**: Nếu quỹ phép đang được sử dụng (có đơn xin nghỉ ngốn vào nó), hệ thống sẽ ném lỗi 400 Bad Request và không cho phép xóa.

### Feature: Apply Leave (ESS)

**User Story 5**:
As an Employee (ESS), I want to apply for a leave, So that I can take time off from work.

**Preconditions**: Tôi phải có số dư Entitlement > 0 cho loại phép đó. Thời gian xin không bị trùng với các đơn nghỉ cũ.
**Related rules**: BR-005, FR-013 (đến FR-018)
**Notes**: Khi xin nghỉ, nếu ngày nghỉ rơi vào Holiday hoặc ngày không làm việc (theo Work Week), hệ thống sẽ không tính ngày đó vào số ngày trừ phép. Tôi có thể chọn nghỉ nửa buổi (Half day morning/afternoon) hoặc theo giờ (Specify time).

### Feature: Assign Leave (Admin)

**User Story 6**:
As a HR Admin or Supervisor, I want to assign leave to an employee directly, So that I can manage their time off when they cannot apply themselves (e.g. emergencies).

**Preconditions**: Admin/Supervisor phải có quyền truy cập vào employee đó.
**Related rules**: BR-006, FR-013 (đến FR-018)
**Notes**: Form Assign Leave yêu cầu quyền cao hơn và có thể bỏ qua một số quy tắc ngặt nghèo của Apply Leave (tùy cấu hình chi tiết bên trong).

### Feature: Leave List & Actions

**User Story 7**:
As a Supervisor, I want to view the Leave List and Approve/Reject pending requests, So that I can manage my team's attendance.

**Preconditions**: Có đơn xin nghỉ đang ở trạng thái Pending.
**Related rules**: BR-007, FR-019
**Notes**: Khi thực hiện Reject, quỹ phép đã bị trừ tạm thời lúc nhân viên Apply sẽ được cộng trả lại vào Entitlement.

**User Story 8**:
As an Employee, I want to Cancel my pending leave request, So that I can get my leave entitlement back if I change my mind.

**Preconditions**: Đơn nghỉ đang ở trạng thái Pending Approval.
**Related rules**: BR-007, FR-019
**Notes**: Chỉ Cancel được đơn Pending. Đơn đã Approved thì thường chỉ có Supervisor/Admin mới Cancel được (tùy workflow).
