# Evidence Verification Notes: Dashboard

## 1. Kết quả kiểm tra Business Rules
- **BR-001 (Module Availability Dependency)**: ✅ Confirmed. Trace `Api/EmployeeActionSummaryAPI.php#getOne:84`. Logic ẩn widget thông báo nếu module nguồn bị vô hiệu hóa.
- **BR-002 (Action Summary Data Scope Security)**: ✅ Confirmed. Trace `Api/EmployeeActionSummaryAPI.php#getOne:76`. Logic Role-based Access Control (RBAC) xác định con số Pending Actions theo quyền hạn của từng người (cấp dưới, ứng viên).
- **BR-003 (Leave Widget Accessibility Filter)**: ✅ Confirmed. Trace `Api/EmployeeOnLeaveTodayConfigAPI.php#update:108`.

## 2. Kết quả kiểm tra Field Rules
- **FR-001** (Dashboard Config): ✅ Confirmed. Chỉ có duy nhất 1 cấu hình `showOnlyAccessibleEmployeesOnLeaveToday` cho tính năng tùy chỉnh bảng tin. 

## 3. Tổng kết Completeness
Mức độ trích xuất Phase 2 cho phân hệ Dashboard **bị thiếu hụt lớn**. 
- Tổng số endpoints (từ Phase 1): 7 tính năng / Widgets.
- Số lượng rules hiện tại chỉ cover được: Action Summary và Leave Config.
- Thiếu hoàn toàn logic trích xuất dữ liệu của: Subunit Chart, Location Chart, Quick Launch, Time at Work, và Employees on Leave (chính bản thân widget lấy data ra sao).
