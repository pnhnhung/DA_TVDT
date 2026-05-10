| Rule ID | Type | Rule Statement | Status | Confidence | Evidence | Note |
|---|---|---|---|---|---|---|
| FR-001 | field | Claim Request `claimEventId`: positive integer | confirmed | high | `Api/EmployeeClaimRequestAPI.php` | |
| FR-002 | field | Claim Request `currencyId`: max 3 chars | confirmed | high | `Api/EmployeeClaimRequestAPI.php` | |
| FR-003 | field | Claim Request `remarks`: max 250 chars | confirmed | high | `Api/EmployeeClaimRequestAPI.php` | |
| FR-005 | field | Claim Expense `expenseTypeId`: positive integer | confirmed | high | `Api/ClaimExpenseAPI.php` | |
| FR-006 | field | Claim Expense `date`: api_date format | confirmed | high | `Api/ClaimExpenseAPI.php` | |
| FR-007 | field | Claim Expense `amount`: numeric | confirmed | high | `Api/ClaimExpenseAPI.php` | |
| FR-008 | field | Claim Expense `note`: max 250 chars | confirmed | high | `Api/ClaimExpenseAPI.php` | |
| BR-001 | business | **Active Event Validation**: `claimEventId` phải thuộc về một sự kiện đang Active. | confirmed | high | `Api/EmployeeClaimRequestAPI.php#setClaimRequest:214` | |
| BR-002 | business | **Employee Termination Check**: Ngăn chặn nộp Claim nếu nhân viên đã bị chấm dứt hợp đồng (Terminated). | confirmed | high | `Api/EmployeeClaimRequestAPI.php#create:132` | |
| BR-003 | business | **Initial State & Reference Auto-generation**: Tự động sinh `Reference ID` và gán trạng thái `INITIATED` lúc tạo. | confirmed | high | `Api/EmployeeClaimRequestAPI.php#setClaimRequest:229` | |
| BR-004 | business | **Expense Type Validation**: Chỉ cho phép thêm các Expense Type đang ở trạng thái Active. | confirmed | high | `Api/ClaimExpenseAPI.php#setClaimExpense:218` | |
| BR-005 | business | **Workflow Action Restriction on Expenses**: Khóa việc thêm/sửa Expense Item nếu Claim đã nộp (SUBMITTED) hoặc đã duyệt (APPROVED). | confirmed | high | `Api/ClaimExpenseAPI.php#setClaimExpense:205` | |
