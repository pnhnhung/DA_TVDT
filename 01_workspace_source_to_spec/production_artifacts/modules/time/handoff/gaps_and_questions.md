| Gap ID | Related Rule ID | Feature | Description | Impact on Testing | Investigation Status | Action |
|---|---|---|---|---|---|---|
| GAP-TIM-001 | N/A | State Transitions | Chỉ INITIAL và RESET_ACTION confirm từ entity. SUBMITTED/ACCEPTED/REJECTED là inferred. | Test flow submit/approve/reject có thể sai. | Đã điều tra — service chưa đọc | Cần verify từ TimesheetService |
| GAP-TIM-002 | N/A | TimesheetItem | TimesheetItem entity chưa extract — field rules (giờ, project, activity) chưa rõ. | Không test được nhập giờ làm việc. | Đã điều tra — chưa đọc TimesheetItem.php | Cần đọc entity/TimesheetItem.php |
| GAP-TIM-003 | N/A | Project rules | Project entity chưa extract. | Không test được CRUD Project. | Đã điều tra — chưa đọc Project.php | Cần đọc entity/Project.php |
| GAP-TIM-004 | PERM-TIM-007 | Project Admin scope | Project Admin permission logic chưa verify từ source. | Security test Project Admin scope có thể sai. | Đã điều tra — chỉ thấy entity tên | Cần verify từ ProjectAdmin entity + API |
| GAP-TIM-005 | N/A | Permissions | Toàn bộ permissions inferred — chưa verify từ API. | Security tests có thể sai scope. | Đã điều tra — chưa đọc API | Cần extract từ TimesheetAPI |
| GAP-TIM-006 | N/A | Audit trail | TimesheetActionLog chưa phân tích — không biết dữ liệu gì được lưu khi submit/approve/reject. | Audit tests không có basis. | Đã điều tra — chỉ thấy entity tên | Cần đọc entity/TimesheetActionLog.php |
