# Module Spec: Claim

## Phạm Vi & Mục Đích
Phân hệ **Claim** quản lý các yêu cầu thanh toán / hoàn trả chi phí (Expense Claim) của nhân viên. Nhân viên có thể tạo yêu cầu hoàn trả cho các khoản chi phí liên quan đến công việc (ví dụ: công tác, tiếp khách, mua sắm vật tư) dựa trên các Sự kiện (Events) và Loại chi phí (Expense Types) được cấu hình trước. Quản lý sẽ duyệt và phê chuẩn các khoản này.

## Actors & Roles
| Role | Quyền chính |
|---|---|
| Admin | Cấu hình Events và Expense Types. Có thể nộp Claim thay cho nhân viên và duyệt Claim. |
| Employee | Tạo Claim Request cho bản thân, khai báo các khoản chi phí (Expense Items), và nộp để duyệt. |
| Supervisor | Duyệt (Approve/Reject) các Claim Request do cấp dưới nộp. |

## Features Chính
| Feature | Mô tả | Source |
|---|---|---|
| Claim Request | Tạo mới, quản lý thông tin chung của yêu cầu hoàn trả (Event, Currency). | `Api/EmployeeClaimRequestAPI.php` |
| Expense Management | Thêm, sửa, xóa các khoản chi phí chi tiết bên trong một Claim Request. | `Api/ClaimExpenseAPI.php` |
| Claim Workflow | Vòng đời của một Claim từ lúc tạo (INITIATED), nộp (SUBMITTED), duyệt (APPROVED) hoặc từ chối (REJECTED). | `Api/ClaimExpenseAPI.php` |

## Field Rules Quan Trọng
- **Claim Request**: Cần có `claimEventId` (số nguyên dương) hợp lệ. Tiền tệ `currencyId` tối đa 3 ký tự.
- **Claim Expense**: Cần có `expenseTypeId` hợp lệ, ngày chi (`date`) đúng định dạng api_date, và số tiền (`amount`).

## Business Rules Quan Trọng
- **Active Data Constraint**: Chỉ được phép tạo Claim dựa trên các Sự kiện (Claim Events) và Loại chi phí (Expense Types) đang ở trạng thái kích hoạt (Active).
- **Employment Status Validation**: Hệ thống tự động kiểm tra và chặn thao tác nộp Claim nếu nhân viên đã nghỉ việc (Terminated).
- **Workflow Protection**: Tương tự các phân hệ khác, Claim áp dụng Workflow khắt khe: Không cho phép thêm, sửa hay xóa các khoản chi phí chi tiết một khi Claim Request đã được nộp đi (`SUBMITTED`) hoặc đã được duyệt (`APPROVED`).

## Cross-Module Dependencies
| Module | Relationship | Contract Status |
|---|---|---|
| PIM | Kiểm tra trạng thái làm việc (Termination Check) thông qua dữ liệu nhân viên. Sơ đồ quản lý để duyệt Claim cũng lấy từ PIM. | READY |

## Gaps & Questions
Hiện tại Phase 2 extraction cho module Claim đã bao phủ rất tốt toàn bộ business logic.
Không có Gap nào. Sẵn sàng cho Handoff.
