# State Transitions: PIM

## State Machine: Employee
- **State Field**: `emp_status`
- **Valid States**: [ACTIVE, TERMINATED, NOT_EXIST]

### Transitions
| Trigger | Actor | From State | To State | Precondition | Side Effect | Source |
|---|---|---|---|---|---|---|
| 1. Click Save (Add Employee)<br>2. Import CSV | Role Admin hoặc user có quyền Add Employee | NOT_EXIST | ACTIVE | Dữ liệu hợp lệ | Bắn EmployeeAddedEvent | `Api/EmployeeAPI.php` |
| Click Terminate Employment | Role Admin hoặc user có quyền Terminate | ACTIVE | TERMINATED | Gửi request Terminate | Cập nhật ngày nghỉ việc | `Api/EmployeeTerminationAPI.php` (inferred) |
| Click Reactivate Employee | Role Admin hoặc user có quyền Reactivate | TERMINATED | ACTIVE | Gửi request Reactivate | Xóa record Termination | inferred |
