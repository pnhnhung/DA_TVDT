| Rule ID | Type | Rule Statement | Status | Confidence | Evidence | Note |
|---|---|---|---|---|---|---|
| FR-001 | field | Employee Purge `empNumber`: integer, exists in Employee | confirmed | high | `Api/PurgeEmployeeAPI.php` | |
| FR-002 | field | Candidate Purge `vacancyId`: integer, exists in Vacancy | confirmed | high | `Api/PurgeCandidateAPI.php` | |
| BR-001 | business | **Employee Purge Eligibility**: Chỉ nhân viên đang ở trạng thái Terminated mới có thể bị hệ thống xóa bỏ vĩnh viễn (Purged). | confirmed | high | `Api/PurgeEmployeeAPI.php#delete:85` | |
| BR-002 | business | **Candidate Purge Consent Constraint (GDPR)**: Tự động giữ lại các hồ sơ ứng viên nếu họ chọn "Đồng ý giữ dữ liệu" (Consent). Không cho xóa. | confirmed | high | `Api/PurgeCandidateAPI.php#getAll:162` | |
