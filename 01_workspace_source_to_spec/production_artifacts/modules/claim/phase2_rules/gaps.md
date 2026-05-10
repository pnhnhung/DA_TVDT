# Gaps: Claim

| Gap ID | Feature | Rule ID | Mô tả | Status | Confidence | Investigation Status | Action |
|---|---|---|---|---|---|---|---|
| GAP-CLM-001 | State Transitions | N/A | Chỉ `INITIATED` được confirm từ entity. Các states `SUBMITTED`, `APPROVED`, `REJECTED`, `CANCELLED` là `inferred`. Cần verify từ WorkflowStateMachine. | inferred | medium | Đã điều tra — entity đọc được, service chưa đọc | Cần verify từ ClaimService và WorkflowStateMachine |
| GAP-CLM-002 | ClaimExpense rules | N/A | Entity `ClaimExpense` chưa được extract — field rules (amount, expense type, date) chưa có spec. | gap | medium | Đã điều tra — chưa đọc ClaimExpense.php | Cần đọc entity/ClaimExpense.php và ClaimExpenseAPI |
| GAP-CLM-003 | ClaimEvent rules | N/A | Entity `ClaimEvent` (loại sự kiện claim) chưa được extract. | gap | medium | Đã điều tra — chưa đọc ClaimEvent.php | Cần đọc entity/ClaimEvent.php |
| GAP-CLM-004 | ExpenseType rules | N/A | Entity `ExpenseType` chưa được extract — category, is_active chưa rõ. | gap | medium | Đã điều tra — chưa đọc ExpenseType.php | Cần đọc entity/ExpenseType.php |
| GAP-CLM-005 | Permissions | N/A | Toàn bộ permissions.csv là `inferred` — chưa đọc API files. | inferred | medium | Đã điều tra — chưa đọc API source | Cần extract từ ClaimRequestAPI, ClaimActionAPI |
| GAP-CLM-006 | ReferenceId generation | N/A | Cột `reference_id` — chưa rõ format (auto-generated hay manual? format gì?). | gap | medium | Đã điều tra — chỉ thấy type=string trong entity | Cần tìm business rule trong ClaimService |
