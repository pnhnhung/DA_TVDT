# Business Rules: Maintenance Module

## Feature: Data Purging (GDPR & Cleanup)

### BR-001: Employee Purge Eligibility
- **Actor**: Admin
- **Trigger**: Gửi request xóa vĩnh viễn nhân viên.
- **Precondition**: Truyền vào `empNumber`.
- **Expected Behavior**: Hệ thống gọi hàm `isEmployeePurgeable()` để kiểm tra trạng thái nhân sự. Thông thường, hệ thống chỉ cho phép xóa (Purge) những nhân viên đã bị chấm dứt hợp đồng (Terminated) thay vì nhân sự đang hoạt động. Nếu vi phạm, ném lỗi "Employee Cannot Be Purged". Hành động này xóa sạch toàn bộ dữ liệu liên quan (lịch sử, đơn từ, chấm công).
- **Source**: `Api/PurgeEmployeeAPI.php#delete:85[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-002: Candidate Purge Consent Constraint (GDPR)
- **Actor**: Admin
- **Trigger**: Lấy danh sách ứng viên (để chuẩn bị xóa) theo `vacancyId`.
- **Precondition**: Có ID của chiến dịch tuyển dụng (Vacancy).
- **Expected Behavior**: Khi query danh sách ứng viên có thể xóa, hệ thống TỰ ĐỘNG filter với điều kiện `setConsentToKeepData(false)`. Điều này có nghĩa là, hệ thống bảo vệ những ứng viên đã đánh dấu "Đồng ý giữ lại hồ sơ". Chỉ những hồ sơ không có cờ consent mới bị liệt vào danh sách thanh trừng.
- **Source**: `Api/PurgeCandidateAPI.php#getAll:162[controller]`
- **Status**: confirmed
- **Confidence**: high
