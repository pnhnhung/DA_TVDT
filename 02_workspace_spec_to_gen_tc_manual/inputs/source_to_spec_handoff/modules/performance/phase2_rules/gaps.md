# Gaps: Performance

| Gap ID | Feature | Rule ID | Mô tả | Status | Confidence | Investigation Status | Action |
|---|---|---|---|---|---|---|---|
| GAP-PER-001 | State Transitions | N/A | Các transitions `INACTIVE→ACTIVATED`, `ACTIVATED→IN_PROGRESS`, `IN_PROGRESS→COMPLETED` chỉ được infer từ entity constants. Chưa verify từ WorkflowStateMachine và service layer. | inferred | medium | Đã điều tra — entity đọc được, service chưa đọc | Cần verify từ PerformanceService và WorkflowStateMachine |
| GAP-PER-002 | Permissions | N/A | Toàn bộ permissions.csv là `inferred` — chưa đọc API files để confirm role checks. | inferred | medium | Đã điều tra — chưa đọc API source | Cần extract từ PerformanceReviewAPI, ReviewerRatingAPI |
| GAP-PER-003 | Reviewer entity | N/A | Entity `Reviewer` chưa được extract đầy đủ fields (reviewer role: Supervisor hay Employee). | gap | medium | Đã điều tra — chưa đọc Reviewer.php | Cần đọc entity/Reviewer.php |
| GAP-PER-004 | KPI configuration | N/A | Entity `Kpi` chưa được extract — min/max rating scale, required fields chưa rõ. | gap | medium | Đã điều tra — chưa đọc Kpi.php | Cần đọc entity/Kpi.php |
| GAP-PER-005 | PerformanceTracker | N/A | Chức năng PerformanceTracker (on-going tracking) chưa được phân tích — là luồng độc lập với Review cycle. | gap | medium | Đã điều tra — chưa phân tích | Cần phân tích PerformanceTracker + PerformanceTrackerLog |
