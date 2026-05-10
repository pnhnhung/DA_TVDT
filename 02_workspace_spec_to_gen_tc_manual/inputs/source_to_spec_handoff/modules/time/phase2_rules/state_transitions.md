# State Transitions: Time (Timesheet)

## State Machine: Timesheet.state

**State Field**: `ohrm_timesheet.state`
**Source**: `orangehrmTimePlugin/entity/Timesheet.php`
**Flow Name**: `WorkflowStateMachine::FLOW_TIME` (inferred)

### Valid States
| State Value | Source | Mô tả |
|---|---|---|
| `"INITIAL"` | `Timesheet::STATE_INITIAL` (confirmed) | Timesheet vừa tạo — chưa submit |
| `"SUBMITTED"` | inferred từ workflow | Nhân viên đã submit để chờ approve |
| `"ACCEPTED"` | inferred từ workflow | Manager đã approve |
| `"REJECTED"` | inferred từ workflow | Manager đã reject — có thể edit lại |
| (RESET) | `Timesheet::RESET_ACTION` (confirmed) | Hành động đặc biệt (không phải state) — Manager reset từ REJECTED/SUBMITTED về INITIAL |

### Transitions
| Trigger (UI) | Actor | From State | To State | Precondition | Source |
|---|---|---|---|---|---|
| Tạo Timesheet cho tuần | Employee | — | INITIAL | Tuần chưa có Timesheet | `entity/Timesheet.php#STATE_INITIAL` |
| Submit Timesheet | Employee | INITIAL | SUBMITTED | Có ít nhất 1 TimesheetItem được điền | inferred + `Timesheet::STATE_INITIAL` |
| Approve (Accept) Timesheet | Manager/Project Admin | SUBMITTED | ACCEPTED | Có quyền approve (Project Admin hoặc Supervisor) | inferred |
| Reject Timesheet | Manager/Project Admin | SUBMITTED | REJECTED | Có quyền reject | inferred |
| Reset Timesheet (về INITIAL) | Manager | REJECTED/SUBMITTED | INITIAL | `Timesheet::RESET_ACTION` | `entity/Timesheet.php#RESET_ACTION` |

> **Cảnh báo**: Chỉ `INITIAL` và `RESET_ACTION` được confirm từ entity. Các states `SUBMITTED`, `ACCEPTED`, `REJECTED` là `inferred` từ business logic — cần verify từ WorkflowStateMachine FLOW_TIME và TimesheetService.
