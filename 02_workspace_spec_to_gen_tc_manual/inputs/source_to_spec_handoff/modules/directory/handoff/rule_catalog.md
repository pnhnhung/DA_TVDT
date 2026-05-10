| Rule ID | Type | Rule Statement | Status | Confidence | Evidence | Note |
|---|---|---|---|---|---|---|
| FR-001 | field | Search Filter `empNumber`: integer, exists in Employee | confirmed | high | `Api/EmployeeDirectoryAPI.php` | |
| FR-002 | field | Search Filter `nameOrId`: string, max 100 | confirmed | high | `Api/EmployeeDirectoryAPI.php` | |
| FR-003 | field | Search Filter `jobTitleId`: positive integer | confirmed | high | `Api/EmployeeDirectoryAPI.php` | |
| FR-004 | field | Search Filter `locationId`: positive integer | confirmed | high | `Api/EmployeeDirectoryAPI.php` | |
| BR-001 | business | **Read-only Data Model**: API không hỗ trợ POST/PUT/DELETE. Chỉ lấy danh sách nhân viên. | confirmed | high | `Api/EmployeeDirectoryAPI.php#create:306` | |
| BR-002 | business | **Detailed vs Default Model Filter**: API trả về dữ liệu tùy biến theo tham số `model`. | confirmed | high | `Api/EmployeeDirectoryAPI.php#getModelClass:126` | |
