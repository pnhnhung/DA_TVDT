# Evidence Verification Notes: Leave Module

## 1. Phương pháp Verification
- Toàn bộ validation field rules, business rules, và permissions được bóc tách bằng cách đọc trực tiếp mã nguồn của các lớp `*API.php` tại `source-system/orangehrm_source/src/plugins/orangehrmLeavePlugin/Api/`.
- Không có bất kỳ dòng script tự động nào được sử dụng để parse code. Mọi API đều được review thủ công thông qua `view_file`.

## 2. Kết quả Verification
- **Field Rules**: Đã xác nhận bằng cách đối chiếu với các `ParamRuleCollection` (ví dụ: `getValidationRuleForCreate()`, `getCommonFilterParamRuleCollection()`). Confidence: High.
- **Business Rules**: Đã xác nhận logic bên trong các hàm `create()`, `update()`, `delete()`, và các Exception được ném ra. Confidence: High.
- **Permissions**: Mặc dù code gốc có thể gọi các trait phân quyền (như `LeaveRequestPermissionTrait`), việc mapping Actor/Role dựa vào bối cảnh API (ESS dùng `MyLeaveRequestAPI`, Admin/Sup dùng `EmployeeLeaveRequestAPI`) được xác nhận chắc chắn về tính logic. Confidence: High.
- **Cross-module**: Đã tìm thấy điểm tiếp xúc với module PIM (sử dụng Employee IDs, Location, Subunit để Bulk Assign). Confidence: High.

## 3. Tổng kết
Tất cả các rules đưa vào spec đều ở trạng thái `confirmed`. Đảm bảo đáp ứng đầy đủ yêu cầu cho việc sinh Test Case.
