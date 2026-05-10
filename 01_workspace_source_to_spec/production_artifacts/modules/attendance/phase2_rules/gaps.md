# Gaps: Attendance

| Gap ID | Feature | Rule ID | Mô tả | Status | Confidence | Investigation Status | Action |
|---|---|---|---|---|---|---|---|
| GAP-ATT-001 | Edit Attendance (Admin view) | N/A | `AttendanceEditPunchInRecordOverlapAPI.php` và `AttendanceEditPunchOutRecordOverlapAPI.php` tồn tại trong source nhưng chưa được extract field rules và business rules cho luồng **Admin chỉnh sửa** bản ghi của nhân viên bất kỳ (khác với flow ESS/Supervisor). | gap | medium | Đã điều tra — phát hiện file chưa được phân tích | Cần extract thêm từ EditPunch*API |
| GAP-ATT-002 | Attendance Summary Report | N/A | `EmployeeAttendanceSummaryAPI.php` cung cấp báo cáo tổng hợp chấm công nhưng chưa có field rules và business rules cho luồng filter/report. | gap | medium | Đã điều tra — phát hiện file chưa được phân tích | Cần extract từ EmployeeAttendanceSummaryAPI |
| GAP-ATT-003 | Overlap API endpoints | BR-001, BR-002 | `AttendancePunchInRecordOverlapAPI.php` và `AttendancePunchOutRecordOverlapAPI.php` là các API riêng biệt để check overlap TRƯỚC khi thực sự lưu. Chưa rõ flow gọi khi nào — frontend gọi trước hay backend tự kiểm tra. | inferred | low | Đã điều tra — cần verify thêm | Cần verify cách frontend gọi API |
| GAP-ATT-004 | Timezone validation | FR-004, FR-005 | Rule `TIMEZONE_OFFSET` và `TIMEZONE_NAME` validate theo logic nào (danh sách hỗ trợ)? Chưa có danh sách timezone hỗ trợ rõ ràng trong spec — chỉ thấy từ `getTimezoneArray()` (partial list). | inferred | medium | Đã điều tra — partial coverage | Cần tra cứu thêm từ Rules::TIMEZONE_NAME/OFFSET implementation |
