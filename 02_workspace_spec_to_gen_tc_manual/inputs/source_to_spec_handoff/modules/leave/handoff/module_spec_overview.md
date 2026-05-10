# Module Spec: Leave

## Phạm Vi & Mục Đích
Module **Leave** điện tử hóa quy trình xin nghỉ phép của doanh nghiệp. Nó theo dõi chặt chẽ quỹ phép của nhân viên, giúp tự động tính toán trừ phép dựa vào thiết lập của loại phép (Leave Type), ngày cuối tuần (Work Week) và ngày nghỉ lễ (Holidays).

## Actors & Roles
| Role | Quyền chính |
|---|---|
| Admin | Cấu hình mọi tham số, cấp quỹ phép cho toàn công ty, gán lịch nghỉ trực tiếp. |
| Supervisor | Có thể cấp phép và duyệt đơn/từ chối đơn cho cấp dưới trực tiếp (Subordinates). |
| Employee (ESS)| Tự xin nghỉ (Apply Leave), tự xem số dư quỹ phép của mình. Không thể tự duyệt đơn. |

## Features Chính
| Feature | Mô tả | Source |
|---|---|---|
| Cấu hình Nghỉ | Tạo Leave Types, Work Week, Holidays. | `Api/LeaveTypeAPI.php`, `Api/HolidayAPI.php` |
| Leave Entitlement | Cấp "ví" ngày nghỉ cho nhân viên. | `Api/LeaveEntitlementAPI.php` |
| Apply Leave | ESS tạo Leave Request. | `Api/MyLeaveRequestAPI.php` |
| Assign Leave | Admin/Sup tạo Leave Request thay cho nv. | `Api/EmployeeLeaveRequestAPI.php` |
| Xử lý Đơn Nghỉ | Approve/Reject/Cancel Leave Request. | `Api/EmployeeLeaveRequestAPI.php` |

## Business Rules Quan Trọng
1. **Hoàn trả quỹ phép**: Khi nhân viên Apply Leave, hệ thống tạm trừ quỹ phép. Nếu bị Supervisor Reject hoặc nhân viên tự Cancel, hệ thống sẽ trả lại quỹ phép đó (`BR-007`).
2. **Khóa Entitlement**: Nếu quỹ phép (Entitlement) đã được sử dụng (tức là đã có đơn xin nghỉ dính với nó), Admin không thể bấm nút xóa quỹ phép đó được nữa. Tránh hỏng data (`BR-004`).
3. **Overlapping**: Không thể xin nghỉ phép chồng chéo lên khoảng thời gian đã được duyệt hoặc đang chờ duyệt (`BR-005`).

## State Transitions
Leave Request chuyển từ `PENDING APPROVAL` -> `APPROVED` (bởi Admin/Sup), `REJECTED` (bởi Admin/Sup), hoặc `CANCELLED` (bởi ESS). Mọi action đòi hỏi tất cả các ngày nghỉ (Leaves) bên trong Request phải ở cùng một trạng thái.

## Cross-Module Dependencies
| Module | Relationship | Contract Status |
|---|---|---|
| PIM | Employee/Organization data dùng để lọc khi Bulk Assign Entitlement | confirmed |

## Gaps & Questions
Không có Gap nghiêm trọng. Spec đạt chuẩn READY để chuyển giao cho Test Case Workspace.
