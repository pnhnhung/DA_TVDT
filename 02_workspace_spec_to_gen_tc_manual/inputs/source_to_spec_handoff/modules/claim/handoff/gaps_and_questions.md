| Gap ID | Related Rule ID | Feature | Description | Impact on Testing | Investigation Status | Action |
|---|---|---|---|---|---|---|
| GAP-CLM-001 | N/A | State Transitions | Chỉ INITIATED confirm từ entity. SUBMITTED/APPROVED/REJECTED/CANCELLED là inferred. | Test flow phê duyệt claim có thể sai. | Đã điều tra — service chưa đọc | Cần verify từ ClaimService |
| GAP-CLM-002 | N/A | ClaimExpense | ClaimExpense entity chưa extract — field rules (amount, type, date) chưa rõ. | Không test được nhập chi phí claim. | Đã điều tra — chưa đọc ClaimExpense.php | Cần đọc entity/ClaimExpense.php |
| GAP-CLM-003 | N/A | ClaimEvent | ClaimEvent entity chưa extract. | Không rõ field validation khi tạo Event Type. | Đã điều tra — chưa đọc ClaimEvent.php | Cần đọc entity/ClaimEvent.php |
| GAP-CLM-004 | N/A | ExpenseType | ExpenseType entity chưa extract. | Không test được CRUD Expense Types. | Đã điều tra — chưa đọc ExpenseType.php | Cần đọc entity/ExpenseType.php |
| GAP-CLM-005 | N/A | Permissions | Toàn bộ permissions inferred — chưa verify từ API. | Security tests có thể sai scope. | Đã điều tra — chưa đọc API | Cần extract từ ClaimRequestAPI |
| GAP-CLM-006 | N/A | ReferenceId format | Không rõ `reference_id` format — tự generate hay nhân viên nhập? | Không biết validation rule cho referenceId. | Đã điều tra — chỉ thấy string type | Cần tìm trong ClaimService |
