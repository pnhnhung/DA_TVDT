| Rule ID | Type | Rule Statement | Status | Confidence | Evidence | Note |
|---|---|---|---|---|---|---|
| FR-001 | field | KPI `title`: max 100, required | confirmed | high | `Api/KpiAPI.php` | |
| FR-002 | field | KPI `jobTitleId`: positive integer, exists | confirmed | high | `Api/KpiAPI.php` | |
| FR-003 | field | KPI `minRating`: int, 0-100, required | confirmed | high | `Api/KpiAPI.php` | |
| FR-004 | field | KPI `maxRating`: int, 0-100, required | confirmed | high | `Api/KpiAPI.php` | |
| FR-005 | field | KPI `isDefault`: boolean | confirmed | high | `Api/KpiAPI.php` | |
| FR-006 | field | Review `empNumber`: required, accessible | confirmed | high | `Api/PerformanceReviewAPI.php` | |
| FR-007 | field | Review `reviewerEmpNumber`: required, accessible | confirmed | high | `Api/PerformanceReviewAPI.php` | |
| BR-001 | business | **Review Supervisor Validation**: `reviewerEmpNumber` phải là người quản lý hợp lệ (Supervisor) của `empNumber`. | confirmed | high | `Api/PerformanceReviewAPI.php#create:312` | |
| BR-002 | business | **Activate Review on Creation**: Trạng thái chuyển thành `STATUS_ACTIVATED` nếu bật cờ kích hoạt lúc tạo. | confirmed | high | `Api/PerformanceReviewAPI.php#create:320` | |
| BR-003 | business | **Review Editability**: Chỉ được sửa cấu hình Review nếu nó chưa bắt đầu đánh giá. | confirmed | high | `Api/PerformanceReviewAPI.php#getOne:467` | |
| BR-004 | business | **Workflow State Machine Check**: API chấm điểm kiểm tra chặt chẽ `checkActionAllowed` dựa trên trạng thái (In Progress / Completed). | confirmed | high | `Api/EmployeeEvaluationAPI.php#checkActionAllowed:250` | |
| BR-005 | business | **Evaluation Rating Visibility**: (Blind Review) Quản lý không được xem điểm do nhân viên tự chấm cho đến khi nhân viên nộp bài. | confirmed | high | `Api/EmployeeEvaluationAPI.php#getAll:134` | |
| BR-006 | business | **Complete Evaluation State Change**: Gọi API nộp bài sẽ cập nhật trạg thái thành `STATUS_COMPLETED`. | confirmed | high | `Api/EmployeeEvaluationAPI.php#updateReviewerStatus:281` | |
