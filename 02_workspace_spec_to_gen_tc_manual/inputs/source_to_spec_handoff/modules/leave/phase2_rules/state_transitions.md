# State Transitions: Leave Module

*Note: Danh mục Leave Type và Holiday không có state machine. State Machine sẽ được viết chi tiết ở phần Leave Request (Pending -> Approved / Rejected / Cancelled).*

## 1. State Machine Definitions

| Entity | Initial State | Trigger | Next State | Condition/Role | Status |
|---|---|---|---|---|---|
| Leave (Ngày nghỉ) | N/A | ESS Apply Leave | `PENDING APPROVAL` | - | confirmed |
| Leave (Ngày nghỉ) | N/A | Admin Assign Leave | `APPROVED` (hoặc `PENDING` tùy cấu hình) | - | inferred |
| Leave (Ngày nghỉ) | `PENDING APPROVAL` | Admin/Sup Approve | `APPROVED` | - | confirmed |
| Leave (Ngày nghỉ) | `PENDING APPROVAL` | Admin/Sup Reject | `REJECTED` | Hoàn lại quỹ phép | confirmed |
| Leave (Ngày nghỉ) | `PENDING APPROVAL` | ESS Cancel | `CANCELLED` | Hoàn lại quỹ phép | confirmed |
| Leave (Ngày nghỉ) | `APPROVED` | Admin/Sup Cancel | `CANCELLED` | Hoàn lại quỹ phép | confirmed |
| LeaveRequest | N/A | Computed từ các Leaves | `PENDING APPROVAL` | Các ngày đều Pending | confirmed |
| LeaveRequest | N/A | Computed từ các Leaves | `APPROVED` / `REJECTED` | Các ngày đều cùng 1 state | confirmed |
| LeaveRequest | N/A | Nhận `action` update | Từ chối nếu Leaves có nhiều state khác nhau | Báo lỗi Bad Request | confirmed |
