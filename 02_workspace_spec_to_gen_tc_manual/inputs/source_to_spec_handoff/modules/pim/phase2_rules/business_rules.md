# Business Rules: PIM

### BR-001: Add New Employee
- **Actor**: Role Admin hoặc người dùng được set quyền "Add Employee" trong phân hệ User Roles. (Không áp dụng cho ESS).
- **Trigger**: 
  1. Click nút Save ở màn hình Add Employee.
  2. Import file CSV hợp lệ qua màn hình Data Import.
- **Precondition**: Dữ liệu bắt buộc hợp lệ, `employeeId` không trùng lặp nếu có cung cấp.
- **Expected Behavior**: Tạo mới Employee trong database. Nếu có truyền `empPicture`, resize ảnh (qua `EmployeePictureService::pictureSizeAdjust`) và lưu. ID của employee tự động tăng.
- **Side Effect**: Dispatch sự kiện `EmployeeAddedEvent` cho các hệ thống khác lắng nghe (ví dụ: cấp quota ngày nghỉ, tạo timesheet profile).
- **Source**: `Api/EmployeeAPI.php#create:511[controller]`, `Service/EmployeeService.php#dispatchAddEmployeeEvent:170[service]`
- **Status**: confirmed
- **Confidence**: high

### BR-002: Delete Employee
- **Actor**: Role Admin hoặc người dùng được set quyền "Delete Employee" trong phân hệ User Roles.
- **Trigger**: 
  1. Chọn một hoặc nhiều nhân viên trong Employee List (PIM) và click nút Delete Selected.
  2. (Nếu có) Click icon thùng rác trực tiếp trên một dòng ở màn hình Employee List.
- **Precondition**: Employee ID nằm trong danh sách được phép xóa (không nằm trong danh sách Undeletable: admin mặc định và user đang thực hiện thao tác).
- **Expected Behavior**: Xóa các employee khỏi database.
- **Side Effect**: Dispatch sự kiện `EmployeeDeletedEvent`.
- **Source**: `Api/EmployeeAPI.php#delete:681[controller]`, `Service/EmployeeService.php#getUndeletableEmpNumbers:333[service]`
- **Status**: confirmed
- **Confidence**: high

### BR-003: Update Personal Details
- **Actor**: Role Admin, ESS (cho phép cập nhật thông tin của chính mình), hoặc người dùng được set quyền cập nhật Personal Details.
- **Trigger**: 
  1. Click nút Save ở màn hình Personal Details (tab đầu tiên trong Employee Profile).
- **Precondition**: Cấu hình hệ thống cho phép sửa đổi các trường.
- **Expected Behavior**: Lưu thông tin cá nhân. Đáng chú ý:
  - Các trường `nickname`, `smoker`, `militaryService` chỉ được lưu nếu cấu hình hệ thống `showPimDeprecatedFields` = true.
  - Trường `ssnNumber` và `sinNumber` chỉ được lưu nếu cấu hình tương ứng `showPimSSN` và `showPimSIN` = true.
- **Side Effect**: Gọi `EmployeeEventService::saveUpdateEmployeePersonalDetailsEvent` để log.
- **Source**: `Api/EmployeePersonalDetailAPI.php#update:168[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-004: Update Contact Details
- **Actor**: Role Admin, ESS (cập nhật chính mình), hoặc người dùng có quyền cập nhật Contact Details.
- **Trigger**: 
  1. Click nút Save ở màn hình Contact Details (tab thứ 2 trong Employee Profile).
- **Precondition**: Nếu có nhập Email (Work / Other), hệ thống sẽ check Unique cho từng email thông qua API.
- **Expected Behavior**: Cập nhật thông tin liên lạc.
  - Đặc biệt: `workEmail` và `otherEmail` không được trùng nhau (trả về lỗi `Work Email and Other Email Cannot Be The Same`).
  - Phải vượt qua custom callback rule `isUniqueEmail` cho cả 2 loại email.
- **Side Effect**: Nếu thay đổi `workEmail`, có thể ảnh hưởng đến nơi nhận notification của Leave module (như được chú thích trong API).
- **Source**: `Api/EmployeeContactDetailsAPI.php#saveContactDetails:427[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-005: Update Job Details
- **Actor**: Role Admin hoặc người dùng được set quyền cập nhật Job Details. (ESS thường không có quyền này).
- **Trigger**: 
  1. Click nút Save ở màn hình Job Details (tab thứ 6 trong Employee Profile).
- **Precondition**: Các trường ID ngoại lai (`jobTitleId`, `empStatusId`, `jobCategoryId`, `subunitId`, `locationId`) phải tồn tại hợp lệ trong cơ sở dữ liệu (được validate bởi `Rules::POSITIVE` trước khi update).
- **Expected Behavior**: Cập nhật các thông tin công việc (Chức danh, trạng thái, phòng ban, địa điểm, ngày gia nhập).
- **Side Effect**: Nếu trường `joinedDate` bị thay đổi (so với ngày cũ), hệ thống dispatch event `JoinedDateChangedEvent`.
- **Source**: `Api/EmployeeJobDetailAPI.php#update:175[controller]`
- **Status**: confirmed
- **Confidence**: high
