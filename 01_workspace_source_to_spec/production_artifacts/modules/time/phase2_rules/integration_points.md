# Integration Points: Time

| Source Module | Target Module | Trigger (UI) | Data Passed | Observable Result | Side Effect | Source | Status |
|---|---|---|---|---|---|---|---|
| Time | PIM | Employee tạo Timesheet | `employee.empNumber` | Validate employee tồn tại | | `entity/Timesheet.php#employee_id` | confirmed |
| Time | PIM | Supervisor approve Timesheet của cấp dưới | `employee.empNumber` | Hệ thống kiểm tra quan hệ Supervisor-Subordinate | | inferred từ UserRoleManager | inferred |
| Time | Dashboard | Load Dashboard widget Time at Work | `employee.empNumber`, date range | Tổng hợp giờ từ Timesheet hiển thị trên Dashboard | | inferred | inferred |
| Time | Attendance | Tổng hợp giờ làm việc (Attendance vs Timesheet) | `punchInTime`, `punchOutTime` | Report so sánh giờ chấm công vs giờ log trong Timesheet | | inferred | inferred |
