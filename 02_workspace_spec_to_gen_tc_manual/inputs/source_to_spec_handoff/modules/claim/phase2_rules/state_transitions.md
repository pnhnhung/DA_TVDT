# State Transitions: Claim

## State Machine: ClaimRequest.status

**State Field**: `ohrm_claim_request.status`
**Source**: `orangehrmClaimPlugin/entity/ClaimRequest.php#REQUEST_STATUS_INITIATED`
**Flow Name**: `WorkflowStateMachine::FLOW_CLAIM` (inferred)

### Valid States (inferred từ entity + common Claim workflow patterns)
| Status | Mô tả |
|---|---|
| `INITIATED` | Claim vừa được tạo — entity có `REQUEST_STATUS_INITIATED` constant |
| `SUBMITTED` | Nhân viên đã nộp claim để chờ phê duyệt | 
| `APPROVED` | Manager/Admin đã phê duyệt claim |
| `REJECTED` | Manager/Admin đã từ chối claim |
| `CANCELLED` | Nhân viên hoặc Admin đã hủy claim |

> **Cảnh báo**: Chỉ `INITIATED` được confirm từ entity source. Các trạng thái khác là `inferred` từ business logic thông thường — cần verify từ WorkflowStateMachine và ClaimService.

### Transitions (inferred)
| Trigger (UI) | Actor | From State | To State | Precondition | Source |
|---|---|---|---|---|---|
| Tạo claim mới | Employee | — | INITIATED | | `entity/ClaimRequest.php#REQUEST_STATUS_INITIATED` |
| Submit claim | Employee | INITIATED | SUBMITTED | Có ít nhất 1 ClaimExpense | inferred |
| Approve claim | Manager/Admin | SUBMITTED | APPROVED | Có quyền approve | inferred |
| Reject claim | Manager/Admin | SUBMITTED | REJECTED | Có quyền reject | inferred |
| Cancel claim | Employee | INITIATED/SUBMITTED | CANCELLED | Chỉ claim của chính mình | inferred |

> **Action Required**: Cần extract thêm từ ClaimAPI và ClaimService để confirm transitions.
