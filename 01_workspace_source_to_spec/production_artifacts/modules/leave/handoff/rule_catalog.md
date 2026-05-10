# Rule Catalog: Leave Module

## 1. Field Rules

| Rule ID | Entity / Field | Description | Status | Evidence |
|---|---|---|---|---|
| FR-001 | LeaveType: name | String, max 50, required, unique | confirmed | `Api/LeaveTypeAPI.php` |
| FR-002 | LeaveType: situational | Boolean, required | confirmed | `Api/LeaveTypeAPI.php` |
| FR-003 | Holiday: name | String, max 200, required | confirmed | `Api/HolidayAPI.php` |
| FR-004 | Holiday: date | Date, required | confirmed | `Api/HolidayAPI.php` |
| FR-005 | Holiday: recurring | Boolean, required | confirmed | `Api/HolidayAPI.php` |
| FR-006 | Holiday: length | 0 (full) hoặc 4 (half), required | confirmed | `Api/HolidayAPI.php` |
| FR-007 | Entitlement: empNumber | Accessible Employee ID | confirmed | `Api/LeaveEntitlementAPI.php` |
| FR-008 | Entitlement: entitlement | >= 0 (số ngày phép) | confirmed | `Api/LeaveEntitlementAPI.php` |
| FR-009 | Entitlement: fromDate | < toDate | confirmed | `Api/LeaveEntitlementAPI.php` |
| FR-010 | Entitlement: toDate | Date | confirmed | `Api/LeaveEntitlementAPI.php` |
| FR-012 | Entitlement: bulkAssign | Boolean. Cho phép tạo hàng loạt | confirmed | `Api/LeaveEntitlementAPI.php` |
| FR-015 | LeaveRequest: fromDate | Date | confirmed | `Api/EmployeeLeaveRequestAPI.php` |
| FR-016 | LeaveRequest: toDate | Date | confirmed | `Api/EmployeeLeaveRequestAPI.php` |
| FR-018 | LeaveRequest: duration | Enum format (full, half, specific time) | confirmed | `Api/EmployeeLeaveRequestAPI.php` |
| FR-019 | LeaveRequest: action | APPROVE / REJECT / CANCEL | confirmed | `Api/EmployeeLeaveRequestAPI.php` |

## 2. Business Rules

| Rule ID | Feature | Description | Status | Evidence |
|---|---|---|---|---|
| BR-001 | Leave Types | Tạo/Xóa loại phép. Cần unique name. | confirmed | `Api/LeaveTypeAPI.php` |
| BR-002 | Holidays | Định nghĩa ngày lễ (Full/Half). Tự động loại trừ số ngày nghỉ. | confirmed | `Api/HolidayAPI.php` |
| BR-003 | Add Entitlement | Cấp phép (Bulk hoặc Single) cho nhân viên. | confirmed | `Api/LeaveEntitlementAPI.php` |
| BR-004 | Delete Entitlement| Nghiêm cấm xóa quỹ phép đang được nhân viên sử dụng. | confirmed | `Api/LeaveEntitlementAPI.php` |
| BR-005 | Apply Leave | ESS tự xin nghỉ. Yêu cầu số dư Entitlement > 0 và không overlap. | confirmed | `Api/MyLeaveRequestAPI.php` |
| BR-006 | Assign Leave | Admin gán ngày nghỉ thay cho nhân viên. | confirmed | `Api/EmployeeLeaveRequestAPI.php` |
| BR-007 | Process Leave | Xử lý Approve/Reject/Cancel. Yêu cầu trạng thái ngày nghỉ nhất quán. Hoàn trả quỹ phép nếu Reject/Cancel. | confirmed | `Api/EmployeeLeaveRequestAPI.php` |
