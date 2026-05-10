# Feature List: Performance

| Feature ID | Nhóm chức năng | Tên API/Endpoint | Method | Route | Controller/API File | Note | Status |
|---|---|---|---|---|---|---|---|
| PERF-001 | Config | Quản lý KPIs | GET, POST, PUT, DELETE | `/api/v2/performance/kpis` | `Api/KpiAPI.php` | Định nghĩa KPI cho Job Title | inferred |
| PERF-002 | Config | Quản lý Trackers | GET, POST, PUT, DELETE | `/api/v2/performance/config/trackers` | `Api/PerformanceTrackerAPI.php` | Định nghĩa Sổ theo dõi | inferred |
| PERF-003 | Trackers | Logs trong Tracker | GET, POST, PUT, DELETE | `/api/v2/performance/trackers/{id}/logs` | `Api/PerformanceTrackerLogAPI.php` | Ghi log Positive/Negative | inferred |
| PERF-004 | Trackers | My Trackers | GET | `/api/v2/performance/trackers` | `Api/MyTrackerAPI.php` | DS Tracker cá nhân | inferred |
| PERF-005 | Review | Quản lý Đợt Review | GET, POST, PUT, DELETE | `/api/v2/performance/manage/reviews` | `Api/PerformanceReviewAPI.php` | Tạo kỳ đánh giá | inferred |
| PERF-006 | Evaluation | Self Evaluation | GET, PUT | `/api/v2/performance/reviews/{id}/evaluation/employee` | `Api/EmployeeEvaluationAPI.php` | Tự đánh giá | inferred |
| PERF-007 | Evaluation | Supervisor Evaluation| GET, PUT | `/api/v2/performance/reviews/{id}/evaluation/supervisor`| `Api/SupervisorEvaluationAPI.php`| Quản lý đánh giá | inferred |
| PERF-008 | Evaluation | Final Evaluation | GET, PUT | `/api/v2/performance/reviews/{id}/evaluation/final` | `Api/PerformanceReviewFinalEvaluationAPI.php`| Chốt kết quả | inferred |
| PERF-009 | Workflow | Lấy Actions hợp lệ | GET | `/api/v2/performance/reviews/{id}/actions/allowed` | `Api/PerformanceReviewAllowedActionsAPI.php`| State machine | inferred |
| PERF-010 | Settings | Employee Supervisors | GET, POST, DELETE | `/api/v2/performance/supervisors` | `Api/ReviewEmployeeSupervisorAPI.php` | Cấu hình Supervisor | inferred |
