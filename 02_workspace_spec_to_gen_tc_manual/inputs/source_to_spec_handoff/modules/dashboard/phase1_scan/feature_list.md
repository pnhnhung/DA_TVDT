# Feature List: Dashboard

| Feature ID | Nhóm chức năng | Tên API/Endpoint | Method | Route | Controller/API File | Note | Status |
|---|---|---|---|---|---|---|---|
| DASH-001 | Widget | Employees on Leave | GET | `/api/v2/dashboard/employees/leaves` | `Api/EmployeeOnLeaveAPI.php` | Ai đang nghỉ hôm nay | inferred |
| DASH-002 | Widget | Employee Config | GET, PUT | `/api/v2/dashboard/config/employee-on-leave-today` | `Api/EmployeeOnLeaveTodayConfigAPI.php`| Tắt bật hiển thị leave widget | inferred |
| DASH-003 | Widget | Subunit Chart | GET | `/api/v2/dashboard/employees/subunit` | `Api/EmployeeDistributionBySubunitAPI.php`| Biểu đồ nhân sự theo phòng ban | inferred |
| DASH-004 | Widget | Location Chart | GET | `/api/v2/dashboard/employees/locations` | `Api/EmployeeDistributionByLocationAPI.php`| Biểu đồ nhân sự theo chi nhánh | inferred |
| DASH-005 | Widget | Quick Launch | GET | `/api/v2/dashboard/shortcuts` | `Api/QuickLaunchAPI.php` | Nút tắt truy cập | inferred |
| DASH-006 | Widget | Time at Work | GET | `/api/v2/dashboard/employees/time-at-work` | `Api/EmployeeTimeAtWorkAPI.php` | Thông tin chấm công | inferred |
| DASH-007 | Widget | Action Summary | GET | `/api/v2/dashboard/employees/action-summary`| `Api/EmployeeActionSummaryAPI.php` | Đơn từ chờ duyệt | inferred |
