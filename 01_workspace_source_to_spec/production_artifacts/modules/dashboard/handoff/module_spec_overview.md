# Module Spec: Dashboard

## Phạm Vi & Mục Đích
Phân hệ **Dashboard** cung cấp một màn hình tổng quan dạng bảng điều khiển. Dashboard giúp nhân viên, đặc biệt là cấp quản lý, có cái nhìn nhanh về các việc cần làm (My Actions), tình trạng nhân sự nghỉ phép (Leave), chấm công (Time) và thống kê sơ đồ tổ chức (Subunit/Location Charts).

## Actors & Roles
| Role | Quyền chính |
|---|---|
| Mọi User (Admin, Supervisor, Employee) | Đều sử dụng chung một giao diện Dashboard nhưng dữ liệu hiển thị bên trong mỗi Widget phụ thuộc vào quyền hạn và chức vụ của tài khoản. |

## Features Chính
| Feature | Mô tả | Source |
|---|---|---|
| My Actions Widget | Tóm tắt các việc cần xử lý (VD: Duyệt đơn xin nghỉ, Duyệt bảng chấm công). | `Api/EmployeeActionSummaryAPI.php` |
| Employees on Leave | Hiển thị những nhân viên đang nghỉ phép hôm nay. | `Api/EmployeeOnLeaveAPI.php` |
| Leave Widget Config | Cấu hình việc ai được nhìn thấy ai nghỉ phép. | `Api/EmployeeOnLeaveTodayConfigAPI.php` |
| Charts & Analytics | Các biểu đồ nhân sự (Location Chart, Subunit Chart). | (Gaps) |
| Quick Launch & Time | Lối tắt hệ thống và widget theo dõi giờ giấc nhanh. | (Gaps) |

## Field Rules Quan Trọng
- Chỉ có trường cấu hình `showOnlyAccessibleEmployeesOnLeaveToday` (boolean) để điều chỉnh mức độ mở của Leave Widget.

## Business Rules Quan Trọng
- **Data Scope Security**: Dashboard hoạt động như một cỗ máy đọc dữ liệu. Sự an toàn phụ thuộc vào việc tính toán Data Scope (danh sách `accessibleEmpNumbers`). Supervisor chỉ thấy số "Cần duyệt" của nhân viên dưới quyền.
- **Module Dependency**: Widget tự động biến mất hoặc vô hiệu hóa các thông báo nếu quản trị viên hệ thống đã tắt đi module cung cấp dữ liệu tương ứng (VD: Tắt Leave Module thì My Actions sẽ không nhắc việc duyệt phép).

## Cross-Module Dependencies
| Module | Relationship | Contract Status |
|---|---|---|
| Toàn hệ thống | Dashboard không sinh ra dữ liệu, nó tổng hợp (aggregate) dữ liệu từ hầu hết các module khác: PIM, Leave, Time, Recruitment, Performance. | PARTIAL |

## Gaps & Questions
Hiện tại Phase 2 extraction cho module Dashboard bị **thiếu hụt rất lớn**.
- Chỉ mới xác thực được My Actions và cấu hình bảng tin nghỉ phép.
- Thiếu hoàn toàn rule trích xuất dữ liệu, tính toán số lượng cho các biểu đồ (Charts), lối tắt (Quick Launch), và tương tác chấm công (Time at Work).
- Module này bị đánh dấu **PARTIAL_READY** và Automation team không thể tự động hóa phần biểu đồ nếu không có rules bổ sung.
