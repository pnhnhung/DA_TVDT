# Gaps: Time

| Gap ID | Feature | Rule ID | Mô tả | Status | Confidence | Investigation Status | Action |
|---|---|---|---|---|---|---|---|
| GAP-TIM-001 | State Transitions | N/A | Chỉ `INITIAL` và `RESET_ACTION` được confirm từ entity. States `SUBMITTED`, `ACCEPTED`, `REJECTED` là `inferred`. Cần verify từ WorkflowStateMachine FLOW_TIME. | inferred | medium | Đã điều tra — entity đọc được, service chưa đọc | Cần verify từ TimesheetService |
| GAP-TIM-002 | TimesheetItem rules | N/A | Entity `TimesheetItem` chưa extract — field rules (duration format, project/activity link, day-of-week mapping) chưa rõ. | gap | medium | Đã điều tra — chưa đọc TimesheetItem.php | Cần đọc entity/TimesheetItem.php |
| GAP-TIM-003 | Project rules | N/A | Entity `Project` chưa extract — active/inactive status, budget fields chưa rõ. | gap | medium | Đã điều tra — chưa đọc Project.php | Cần đọc entity/Project.php |
| GAP-TIM-004 | Project Admin scope | PERM-TIM-007 | Project Admin permission chỉ `inferred` — chưa verify logic kiểm tra project admin trong entity/service. | inferred | low | Đã điều tra — chỉ thấy entity/ProjectAdmin.php | Cần verify từ ProjectAdmin entity + API |
| GAP-TIM-005 | Permissions | N/A | Toàn bộ permissions.csv là `inferred` — chưa đọc API files. | inferred | medium | Đã điều tra — chưa đọc API source | Cần extract từ TimesheetAPI, TimesheetActionAPI |
| GAP-TIM-006 | TimesheetActionLog | N/A | Audit trail khi submit/approve/reject chưa được phân tích — không biết field nào được lưu. | gap | medium | Đã điều tra — chỉ thấy entity tên | Cần đọc entity/TimesheetActionLog.php |
