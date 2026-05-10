# Business Rules: Leave Module

## 1. Danh sách Business Rules

### BR-001: Manage Leave Types
- **Actor**: System Administrator / HR Admin
- **Trigger**: 
  1. Thêm, Sửa hoặc Xóa Leave Type (Loại nghỉ phép) ở màn hình cấu hình.
- **Precondition**: `name` phải là duy nhất. Khi xóa, mảng ID truyền vào phải tồn tại hợp lệ trong hệ thống.
- **Expected Behavior**: Hệ thống lưu loại nghỉ phép mới hoặc xóa loại cũ. 
- **Side Effect**: Loại phép bị xóa sẽ không thể được cấp (entitlement) hay xin nghỉ (apply) nữa. (Cần verify thêm logic xóa có bị chặn nếu đang có đơn xin nghỉ hay không ở các API tiếp theo).
- **Source**: `Api/LeaveTypeAPI.php[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-002: Manage Holidays
- **Actor**: System Administrator / HR Admin
- **Trigger**: 
  1. Thêm, Sửa hoặc Xóa Holiday ở màn hình cấu hình.
- **Precondition**: `name`, `date` bắt buộc. `length` phải là 0 (Full Day) hoặc 4 (Half Day).
- **Expected Behavior**: Hệ thống lưu ngày lễ mới hoặc xóa ngày cũ. Nếu `recurring` = true, hệ thống sẽ tự động áp dụng ngày lễ này cho các năm tiếp theo.
- **Side Effect**: Khi có một đơn xin nghỉ phép (Leave Request) trùng vào ngày Holiday, ngày đó sẽ không bị trừ vào quỹ phép của nhân viên (tính theo độ dài Full Day hay Half Day).
- **Source**: `Api/HolidayAPI.php[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-003: Add Leave Entitlement (Single & Bulk)
- **Actor**: Admin / Supervisor
- **Trigger**: 
  1. Thêm quỹ phép cho 1 nhân viên (Single) ở màn hình Add Leave Entitlement.
  2. Thêm quỹ phép cho nhiều nhân viên (Bulk) theo Location/Subunit.
- **Precondition**: `fromDate` phải nhỏ hơn `toDate`. Số ngày cấp (`entitlement`) >= 0. Nếu là Single, `empNumber` phải nằm trong danh sách được phép truy cập (Accessible Emp Numbers - đối với Supervisor).
- **Expected Behavior**: Hệ thống tạo các record Entitlement (Quỹ phép).
- **Side Effect**: Nhân viên có thể sử dụng (Apply) quỹ phép này.
- **Source**: `Api/LeaveEntitlementAPI.php#create:380[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-004: Delete Leave Entitlement
- **Actor**: Admin / Supervisor
- **Trigger**: Click xóa quỹ phép trong danh sách Entitlements.
- **Precondition**: Mọi ID trong danh sách cần xóa **phải thỏa mãn điều kiện Deletable** (không dính tới các đơn xin nghỉ đã duyệt/trừ phép). Nếu có **bất kỳ 1 ID nào** không thể xóa (`allIdsDeletable = false`), hệ thống sẽ hủy toàn bộ transaction và ném lỗi 400 Bad Request.
- **Expected Behavior**: Xóa các record Entitlement.
- **Source**: `Api/LeaveEntitlementAPI.php#delete:640[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-005: Apply Leave (ESS)
- **Actor**: ESS (Employee)
- **Trigger**: Nhân viên click "Apply" ở màn hình Apply Leave.
- **Precondition**: Nhân viên phải có đủ quỹ phép (Entitlement) cho `leaveTypeId` trong khoảng thời gian xin nghỉ. Khoảng thời gian xin nghỉ không được trùng (overlap) với các đơn nghỉ đã có.
- **Expected Behavior**: Tạo ra một Leave Request với trạng thái `PENDING APPROVAL` cho tất cả các ngày nghỉ bên trong (Leaves). Trừ tạm vào quỹ phép.
- **Side Effect**: Sẽ gửi Notification (nếu cấu hình) tới Supervisor.
- **Source**: `Api/MyLeaveRequestAPI.php#create:293[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-006: Assign Leave (Admin/Supervisor)
- **Actor**: Admin / Supervisor
- **Trigger**: Click "Assign" ở màn hình Assign Leave.
- **Precondition**: `empNumber` được chỉ định phải thuộc phạm vi quản lý của người thao tác (Accessible).
- **Expected Behavior**: Tạo đơn xin nghỉ thay cho nhân viên. Tùy cấu hình, đơn có thể tự động chuyển sang trạng thái APPROVED (vì do chính Supervisor/Admin tạo).
- **Source**: `Api/EmployeeLeaveRequestAPI.php#create:482[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-007: Update Leave Request Status (Action)
- **Actor**: Admin / Supervisor (Approve/Reject), Employee (Cancel)
- **Trigger**: Nhấn các nút hành động (Approve, Reject, Cancel) trên Leave Request.
- **Precondition**: 
  1. Gửi lên `action` hợp lệ.
  2. Toàn bộ các ngày nghỉ trong Request (Leaves) phải đang ở cùng một trạng thái. Nếu có nhiều trạng thái khác nhau (ví dụ: ngày 1 Pending, ngày 2 Approved), API sẽ từ chối xử lý ở cấp độ Request (lỗi `Leave request has multiple statuses`).
  3. Hành động phải hợp lệ theo State Machine (ví dụ: đang Rejected thì không thể Cancel). Lỗi `Performed action not allowed`.
- **Expected Behavior**: Cập nhật trạng thái cho tất cả các ngày nghỉ (Leaves) bên trong Request. Hoàn trả lại quỹ phép (Entitlement) nếu bị Reject hoặc Cancel.
- **Source**: `Api/EmployeeLeaveRequestAPI.php#update:589[controller]`
- **Status**: confirmed
- **Confidence**: high
