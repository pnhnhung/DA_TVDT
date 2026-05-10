# Business Rules: Directory Module

## Feature: Employee Search

### BR-001: Read-only Data Model
- **Actor**: Employee
- **Trigger**: Cố gắng gọi API Create, Update, Delete vào endpoint của Directory.
- **Precondition**: Module Directory được thiết kế chỉ để đọc.
- **Expected Behavior**: Hệ thống ném lỗi `NotImplementedException` cho tất cả các method ngoài GET. Dữ liệu nhân viên chỉ được thay đổi từ module PIM.
- **Source**: `Api/EmployeeDirectoryAPI.php#create:306[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-002: Detailed vs Default Model Filter
- **Actor**: Employee
- **Trigger**: Gọi API lấy danh sách hoặc chi tiết nhân viên với tham số `model`.
- **Precondition**: Tham số `model` hợp lệ (`default` hoặc `detailed`).
- **Expected Behavior**: Nếu chọn `default`, hệ thống trả về thông tin cơ bản nhất. Nếu chọn `detailed`, hệ thống trả về thêm chi tiết thông tin công tác.
- **Source**: `Api/EmployeeDirectoryAPI.php#getModelClass:126[controller]`
- **Status**: confirmed
- **Confidence**: high
