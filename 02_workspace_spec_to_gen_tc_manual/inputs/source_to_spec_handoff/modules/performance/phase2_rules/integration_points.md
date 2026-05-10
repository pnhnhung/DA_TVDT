# Integration Points: Performance

| Source Module | Target Module | Trigger (UI) | Data Passed | Observable Result | Side Effect | Source | Status |
|---|---|---|---|---|---|---|---|
| Performance | PIM | Admin tạo PerformanceReview — chọn nhân viên được đánh giá | `employee.empNumber` | Hệ thống validate employee tồn tại trong PIM | | `entity/PerformanceReview.php#employee_number` | confirmed |
| Performance | Admin (Job) | Admin tạo PerformanceReview — chọn Job Title (filter scope) | `jobTitle.id` | Filter review theo job title | | `entity/PerformanceReview.php#job_title_code` | confirmed |
| Performance | Admin (Org) | Admin tạo PerformanceReview — chọn Department/Subunit | `subunit.id` | Filter review theo department | | `entity/PerformanceReview.php#department_id` | confirmed |
| Performance | PIM | Supervisor xem review cycle của cấp dưới | `employee.empNumber` | Hệ thống kiểm tra quan hệ Supervisor-Subordinate | | inferred từ UserRoleManager | inferred |
