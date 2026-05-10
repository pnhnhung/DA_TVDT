# Integration Points: Dashboard

| Source Module | Target Module | Trigger (UI) | Data Passed | Observable Result | Side Effect | Source | Status |
|---|---|---|---|---|---|---|---|
| Dashboard | Attendance | Widget Time at Work | `empNumber`, date | Tổng hợp giờ từ AttendanceSummaryAPI | | inferred | inferred |
| Dashboard | Leave | Widget Employees on Leave Today | current date | Danh sách employee đang nghỉ hôm nay | | inferred | inferred |
| Dashboard | Recruitment | Widget My Actions | accessible candidate IDs | Số candidate chờ action | | inferred | inferred |
| Dashboard | PIM | Widget Employee Distribution | All employees | Phân bố nhân viên theo Job Title/Location | | inferred | inferred |
| Dashboard | Buzz | Widget Latest News | Latest posts | Hiển thị 5 bài đăng mới nhất | | inferred | inferred |
