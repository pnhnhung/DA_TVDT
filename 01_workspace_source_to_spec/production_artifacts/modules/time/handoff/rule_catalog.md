| Rule ID | Type | Rule Statement | Status | Confidence | Evidence | Note |
|---|---|---|---|---|---|---|
| FR-001 | field | Customer `name`: max 50, unique | confirmed | high | `Api/CustomerAPI.php` | |
| FR-003 | field | Project `customerId`: integer, positive, exists | confirmed | high | `Api/ProjectAPI.php` | |
| FR-004 | field | Project `name`: max 100, unique per customerId | confirmed | high | `Api/ProjectAPI.php` | |
| FR-006 | field | Project `projectAdminsEmpNumbers`: array, max 5 items | confirmed | high | `Api/ProjectAPI.php` | |
| FR-007 | field | Project Activity `projectId`: positive integer | confirmed | high | `Api/ProjectActivityAPI.php` | |
| FR-008 | field | Project Activity `name`: max 100, unique per projectId | confirmed | high | `Api/ProjectActivityAPI.php` | |
| BR-001 | business | **Delete Customer Constraint**: Không cho phép xóa Customer nếu có Timesheet Items log vào các project thuộc Customer đó. | confirmed | high | `Api/CustomerAPI.php#delete:215` | |
| BR-002 | business | **Add Project Constraint**: Tối đa 5 Project Admins, tên project duy nhất cho mỗi khách hàng. | confirmed | high | `Api/ProjectAPI.php#create:383` | |
| BR-003 | business | **Delete Project Constraint**: Không cho phép xóa Project nếu có Timesheet log. | confirmed | high | `Api/ProjectAPI.php#delete:506` | |
| BR-004 | business | **Delete Project Activity Constraint**: Không cho phép xóa Activity nếu có Timesheet log. | confirmed | high | `Api/ProjectActivityAPI.php#delete:256` | |
| BR-005 | business | **Timesheet Search Date Range**: Tìm kiếm phải có đủ `fromDate` và `toDate`, và logic `fromDate <= toDate`. | confirmed | high | `Api/EmployeeTimesheetAPI.php#validateDateInputs:150` | |
| BR-006 | business | **Update Timesheet Action Workflow**: Hệ thống State Machine chặn các thao tác sai luồng. Nếu được phép, đổi state và log lịch sử. | confirmed | high | `Api/EmployeeTimesheetAPI.php#update:424` | |
| BR-007 | business | **Edit Timesheet Items Access**: Nhân viên bị chặn sửa giờ làm nếu bảng công đã duyệt hoặc đang chờ duyệt. | confirmed | high | `Api/EmployeeTimesheetItemAPI.php#update:399` | |
