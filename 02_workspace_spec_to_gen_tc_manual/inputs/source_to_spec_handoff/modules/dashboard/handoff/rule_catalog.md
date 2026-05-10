| Rule ID | Type | Rule Statement | Status | Confidence | Evidence | Note |
|---|---|---|---|---|---|---|
| FR-001 | field | Dashboard Config `showOnlyAccessibleEmployeesOnLeaveToday`: boolean, required | confirmed | high | `Api/EmployeeOnLeaveTodayConfigAPI.php` | |
| BR-001 | business | **Module Availability Dependency**: Widget My Actions ẩn cảnh báo công việc nếu module liên quan bị vô hiệu hóa. | confirmed | high | `Api/EmployeeActionSummaryAPI.php#getOne:84` | |
| BR-002 | business | **Action Summary Data Scope Security**: Số lượng "Cần duyệt" hiển thị dựa trên quyền quản lý (Role-based access). | confirmed | high | `Api/EmployeeActionSummaryAPI.php#getOne:76` | |
| BR-003 | business | **Leave Widget Accessibility Filter**: Bảng tin nghỉ phép phụ thuộc cấu hình chỉ xem trong team hay toàn bộ công ty. | confirmed | high | `Api/EmployeeOnLeaveTodayConfigAPI.php#update:108` | |
