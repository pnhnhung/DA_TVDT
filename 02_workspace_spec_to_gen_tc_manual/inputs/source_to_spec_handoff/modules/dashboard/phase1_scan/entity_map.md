# Entity Map: Dashboard

## Không Có Entity Riêng

**Kết luận**: Module Dashboard **không có entity riêng**. Nó là một **aggregation module** — tổng hợp và hiển thị data từ nhiều modules khác:

| Widget | Data Source Module | API |
|---|---|---|
| Quick Launch | N/A | Cấu hình static |
| Time at Work | Attendance | EmployeeAttendanceSummaryAPI |
| My Actions | Leave, Recruitment | ActionSummaryAPI |
| Employees on Leave Today | Leave | EmployeesOnLeaveAPI |
| Latest News | Buzz | BuzzAPI |
| Employee Distribution | PIM + Admin | EmployeeDistributionAPI |
| Absent Today | Attendance | AttendanceSummaryAPI |

**Source**: `orangehrmDashboardPlugin/Api/` (inferred từ file listing)

> Dashboard không có state machine, không có entity, không cần `state_transitions.md`. Tất cả permissions đều đến từ module nguồn (Leave, PIM, Buzz...). Readiness là PARTIAL_READY do một số widget logic chưa được phân tích.
