# Rule Catalog: PIM

| Rule ID | Type | Rule Statement | Status | Confidence | Evidence | Note |
|---|---|---|---|---|---|---|
| FR-001 | field | First Name: required, max 30 | confirmed | high | `Api/EmployeeAPI.php` | |
| FR-002 | field | Middle Name: optional, max 30 | confirmed | high | `Api/EmployeeAPI.php` | |
| FR-003 | field | Last Name: required, max 30 | confirmed | high | `Api/EmployeeAPI.php` | |
| FR-004 | field | Employee ID: optional, max 10, unique | confirmed | high | `Api/EmployeeAPI.php` | |
| FR-005 | field | EmpPicture: base64, allowed image types | confirmed | high | `Api/EmployeeAPI.php` | |
| BR-001 | business | Tạo mới Employee require quyền ADD và data hợp lệ | confirmed | high | `Api/EmployeeAPI.php` | Dispatch AddEvent |
| BR-002 | business | Xóa Employee xóa dữ liệu, cấm xóa user admin | confirmed | high | `Api/EmployeeAPI.php` | |
| PT-001 | state | NOT_EXIST -> ACTIVE -> TERMINATED | confirmed | high | `Api/EmployeeAPI.php` | |
| PR-001 | permission | Admin role allows create/delete | confirmed | high | `Api/EmployeeAPI.php` | |
| IT-001 | integration | PIM bắn event sang Leave module | confirmed | high | `Service/EmployeeService.php` | |
