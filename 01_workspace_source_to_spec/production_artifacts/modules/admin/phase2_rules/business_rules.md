# Business Rules: Admin Module

## 1. Danh sách Business Rules

### BR-001: Delete System Users
- **Actor**: System Administrator
- **Trigger**: 
  1. Chọn một hoặc nhiều Users trong danh sách System Users và click nút Delete Selected.
  2. Click icon Thùng rác trên một dòng cụ thể.
- **Precondition**: Mảng ID truyền vào không được chứa ID của tài khoản đang thao tác (user hiện tại) hoặc tài khoản admin mặc định (được bảo vệ bởi hàm `getUndeletableUserIds()`).
- **Expected Behavior**: Xóa cứng (hard delete) các user khỏi hệ thống.
- **Side Effect**: Không thể đăng nhập bằng các tài khoản này nữa.
- **Source**: `Api/UserAPI.php#getValidationRuleForDelete:474[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-002: Create System User
- **Actor**: System Administrator
- **Trigger**: 
  1. Click nút Save ở màn hình Add User.
- **Precondition**: `username` phải là duy nhất (không tính các user đã xóa `deleted = true`). `empNumber` phải trỏ tới một nhân viên hợp lệ có thể truy cập được.
- **Expected Behavior**: Tạo mới tài khoản đăng nhập cho nhân viên.
- **Side Effect**: Nhân viên có thể sử dụng username/password này để đăng nhập vào hệ thống.
- **Source**: `Api/UserAPI.php#create:267[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-003: Update Job Specification Attachment
- **Actor**: System Administrator
- **Trigger**: 
  1. Thay đổi hoặc xóa file Job Specification ở màn hình Edit Job Title và click Save.
- **Precondition**: File tải lên phải là base64 hợp lệ, độ dài tên file không quá 200 ký tự.
- **Expected Behavior**: Dựa vào cờ `currentJobSpecification`:
  - `deleteCurrent`: Xóa file đính kèm hiện tại khỏi Job Title.
  - `replaceCurrent`: Cập nhật file mới ghi đè file hiện tại.
  - `keepCurrent`: Giữ nguyên file cũ (không update file).
- **Lưu ý validation**: 
  - Nếu Job Title đã có sẵn file, nhưng request update không truyền lên `currentJobSpecification`, hệ thống sẽ ném lỗi Bad Request (để bắt buộc UI phải tường minh).
  - Nếu Job Title chưa có file, nhưng request lại truyền lên cờ `currentJobSpecification`, hệ thống cũng sẽ ném Bad Request.
- **Source**: `Api/JobTitleAPI.php#update:429[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-004: Delete Organization Subunit Protection
- **Actor**: System Administrator
- **Trigger**: Click nút Delete trên một node trong cây cấu trúc tổ chức.
- **Precondition**: `id` của subunit phải lớn hơn 1. Hệ thống không cho phép xóa node gốc (thường là tên công ty).
- **Expected Behavior**: Xóa node subunit và cập nhật lại `lft`, `rgt` của các node khác trong cây (Nested Set).
- **Source**: `Api/SubunitAPI.php#getValidationRuleForDelete:426[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-005: Pay Grade Salary Range Validation
- **Actor**: System Administrator
- **Trigger**: Click Save khi Add hoặc Edit Currency cho một Pay Grade.
- **Precondition**: `maxSalary` phải lớn hơn `minSalary` (nếu `minSalary` khác 0).
- **Expected Behavior**: Lưu thông tin dải lương cho cấp bậc tương ứng với đơn vị tiền tệ đã chọn. Nếu vi phạm điều kiện, trả về Bad Request với message "Min salary should be less than max salary".
- **Source**: `Api/PayGradeCurrencyAPI.php#savePayGradeCurrency:440[controller]`
- **Status**: confirmed
- **Confidence**: high

