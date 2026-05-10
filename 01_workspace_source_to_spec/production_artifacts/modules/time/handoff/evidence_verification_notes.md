# Evidence Verification Notes: Time

## 1. Kết quả kiểm tra Business Rules
- **BR-001 (Delete Customer Constraint)**: ✅ Confirmed. Trace `Api/CustomerAPI.php#delete:215`. Logic bảo vệ vẹn toàn dữ liệu: không cho xóa Customer nếu đã có Timesheet Items.
- **BR-002 (Add Project Constraint)**: ✅ Confirmed. Trace `Api/ProjectAPI.php#create:383`. Giới hạn 5 Project Admins.
- **BR-003 (Delete Project Constraint)**: ✅ Confirmed. Trace `Api/ProjectAPI.php#delete:506`. Tương tự BR-001, không cho xóa Project nếu đã có log chấm công.
- **BR-004 (Delete Project Activity Constraint)**: ✅ Confirmed. Trace `Api/ProjectActivityAPI.php#delete:256`. Ràng buộc dữ liệu hoạt động.
- **BR-005 (Timesheet Search Date Range)**: ✅ Confirmed. Trace `Api/EmployeeTimesheetAPI.php#validateDateInputs:150`. Rule validation logic cho bộ lọc ngày tháng.
- **BR-006 (Update Timesheet Action Workflow)**: ✅ Confirmed. Trace `Api/EmployeeTimesheetAPI.php#update:424` và logic workflow ở `Service/TimesheetService.php`. Hệ thống quản lý permission thay đổi trạng thái Timesheet theo dạng State Machine.
- **BR-007 (Edit Timesheet Items Access)**: ✅ Confirmed. Trace `Api/EmployeeTimesheetItemAPI.php#update:399`. Khóa chức năng sửa giờ làm nếu bảng công đã duyệt hoặc đang chờ duyệt.

## 2. Kết quả kiểm tra Field Rules
- **FR-001 -> FR-002** (Customer): ✅ Confirmed. Trace `Api/CustomerAPI.php` khớp.
- **FR-003 -> FR-006** (Project): ✅ Confirmed. Trace `Api/ProjectAPI.php` khớp.
- **FR-007 -> FR-008** (Project Activity): ✅ Confirmed. Trace `Api/ProjectActivityAPI.php` khớp.
- **FR-009 -> FR-016** (Timesheet & Entries): ✅ Confirmed. Trace `Api/EmployeeTimesheetAPI.php` khớp.

## 3. Tổng kết Completeness
Mức độ trích xuất Phase 2 cho phân hệ Time rất đầy đủ và chi tiết. Mọi nghiệp vụ lõi (Customer -> Project -> Activity -> Timesheet Logging -> Workflow Approval) đều có Rule và source trace đầy đủ. Không phát hiện sự chênh lệch lớn giữa Phase 1 feature list và Phase 2 rules.
