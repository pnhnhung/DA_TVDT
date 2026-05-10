# Feature List: Claim

| Feature ID | Nhóm chức năng | Tên API/Endpoint | Method | Route | Controller/API File | Note | Status |
|---|---|---|---|---|---|---|---|
| CLAIM-001 | Config | Quản lý Events | GET, POST, PUT, DELETE | `/api/v2/claim/events` | `Api/ClaimEventAPI.php` | Định nghĩa sự kiện/chiến dịch | inferred |
| CLAIM-002 | Config | Quản lý Expense Types | GET, POST, PUT, DELETE | `/api/v2/claim/expenses/types` | `Api/ClaimExpenseTypeAPI.php` | Định nghĩa loại chi phí | inferred |
| CLAIM-003 | Requests | Nộp Claim (My Claims) | GET, POST | `/api/v2/claim/requests` | `Api/MyClaimRequestAPI.php` | ESS tạo Claim Request | inferred |
| CLAIM-004 | Requests | Gán Claim (Assign) | GET, POST | `/api/v2/claim/employees/{empNumber}/requests`| `Api/EmployeeClaimRequestAPI.php`| Admin tạo Claim cho người khác | inferred |
| CLAIM-005 | Expenses | Quản lý Chi phí con | GET, POST, PUT, DELETE | `/api/v2/claim/requests/{requestId}/expenses` | `Api/ClaimExpenseAPI.php` | CRUD item chi phí | inferred |
| CLAIM-006 | Attachments| Đính kèm Hóa đơn | GET, POST, PUT, DELETE | `/api/v2/claim/requests/{requestId}/attachments`| `Api/ClaimAttachmentAPI.php` | Upload receipt/bill | inferred |
| CLAIM-007 | Workflow | Action Trạng thái | GET, PUT | `/api/v2/claim/requests/{requestId}/action` | `Api/ClaimRequestActionAPI.php` | Approve, Reject, Submit | inferred |
