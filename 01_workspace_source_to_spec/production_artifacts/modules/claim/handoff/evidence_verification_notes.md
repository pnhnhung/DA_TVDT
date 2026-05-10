# Evidence Verification Notes: Claim

## 1. Kết quả kiểm tra Business Rules
- **BR-001 (Active Event Validation)**: ✅ Confirmed. Trace `Api/EmployeeClaimRequestAPI.php#setClaimRequest:214`.
- **BR-002 (Employee Termination Check)**: ✅ Confirmed. Trace `Api/EmployeeClaimRequestAPI.php#create:132`. Chặn không cho nhân viên đã nghỉ việc nộp Claim.
- **BR-003 (Initial State & Reference Auto-generation)**: ✅ Confirmed. Trace `Api/EmployeeClaimRequestAPI.php#setClaimRequest:229`.
- **BR-004 (Expense Type Validation)**: ✅ Confirmed. Trace `Api/ClaimExpenseAPI.php#setClaimExpense:218`.
- **BR-005 (Workflow Action Restriction on Expenses)**: ✅ Confirmed. Trace `Api/ClaimExpenseAPI.php#setClaimExpense:205`.

## 2. Kết quả kiểm tra Field Rules
- **FR-001 -> FR-004** (Claim Request): ✅ Confirmed. Trace `Api/EmployeeClaimRequestAPI.php` khớp.
- **FR-005 -> FR-008** (Claim Expense): ✅ Confirmed. Trace `Api/ClaimExpenseAPI.php` khớp.

## 3. Tổng kết Completeness
Mức độ trích xuất Phase 2 cho phân hệ Claim đầy đủ và chi tiết. Các quy trình cốt lõi tạo Claim Request, xác thực trạng thái Employee, và quản lý các Expense Items bên trong Claim Request đều đã có rules.
