| Gap ID | Related Rule ID | Feature | Description | Impact on Testing | Investigation Status | Action |
|---|---|---|---|---|---|---|
| GAP-PER-001 | N/A | State Transitions | Transitions `INACTIVE→ACTIVATED→IN_PROGRESS→COMPLETED` chỉ inferred từ entity constants, chưa verify từ service/WorkflowStateMachine. | Test flow chuyển trạng thái có thể sai. | Đã điều tra — entity đọc được, service chưa đọc | Cần verify từ PerformanceService |
| GAP-PER-002 | N/A | Permissions | Toàn bộ permission rules là inferred — chưa verify từ API source. | Security tests có thể không đúng scope. | Đã điều tra — chưa đọc API source | Cần extract từ PerformanceReviewAPI |
| GAP-PER-003 | N/A | Reviewer entity | Reviewer entity chưa extract đầy đủ (reviewer role, self-review vs supervisor review). | Không rõ số reviewer tối đa, ai được review ai. | Đã điều tra — chưa đọc Reviewer.php | Cần đọc entity/Reviewer.php |
| GAP-PER-004 | N/A | KPI configuration | KPI entity chưa extract — rating scale boundaries chưa rõ. | Không biết boundary test cho rating. | Đã điều tra — chưa đọc Kpi.php | Cần đọc entity/Kpi.php |
| GAP-PER-005 | N/A | PerformanceTracker | Luồng PerformanceTracker (on-going tracking) chưa phân tích. | Toàn bộ tính năng tracking bị skip. | Đã điều tra — chưa phân tích | Cần phân tích PerformanceTrackerAPI |
