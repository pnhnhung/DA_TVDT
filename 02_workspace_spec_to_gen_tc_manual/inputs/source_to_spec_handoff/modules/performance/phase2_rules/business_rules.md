# Business Rules: Performance Module

## Feature: Review Configuration

### BR-001: Review Supervisor Validation
- **Actor**: Admin / Supervisor
- **Trigger**: Create hoặc Update một Performance Review.
- **Precondition**: `reviewerEmpNumber` truyền vào BẮT BUỘC phải là người quản lý hợp lệ (Supervisor) của `empNumber`.
- **Expected Behavior**: Hệ thống gọi hàm `getSupervisorRecord()`. Nếu trả về null (tức là không có quan hệ báo cáo), API ném lỗi `BadRequestException`.
- **Source**: `Api/PerformanceReviewAPI.php#create:312[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-002: Activate Review on Creation/Update
- **Actor**: Admin / Supervisor
- **Trigger**: Truyền tham số `activate = true` khi tạo hoặc sửa Performance Review.
- **Precondition**: Không có.
- **Expected Behavior**: Nếu `activate = true`, hệ thống tự động thiết lập trạng thái của Review thành `STATUS_ACTIVATED` (Mở đợt đánh giá) và ghi nhận `ActivatedDate` bằng giờ hiện tại. Nếu false, hệ thống gán trạng thái là `STATUS_INACTIVE`.
- **Source**: `Api/PerformanceReviewAPI.php#create:320[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-003: Review Editability
- **Actor**: Admin / Supervisor
- **Trigger**: Lấy thông tin (GetOne) hoặc cập nhật (Update) Performance Review.
- **Precondition**: Review phải đang ở trạng thái có thể chỉnh sửa (Editable).
- **Expected Behavior**: Hàm `getEditableReviewById` được gọi. Nếu Review đã chạy hoặc hoàn tất, hàm có thể trả về null, dẫn đến lỗi 404 (Không cho phép sửa cấu hình đợt đánh giá đang chạy dở).
- **Source**: `Api/PerformanceReviewAPI.php#getOne:467[controller]`
- **Status**: confirmed
- **Confidence**: high

## Feature: Performance Evaluation

### BR-004: Workflow State Machine Check for Evaluation
- **Actor**: Employee / Supervisor
- **Trigger**: Update Evaluation (chấm điểm) hoặc nộp bài đánh giá.
- **Precondition**: Trạng thái hiện tại của Reviewer/Employee phải được cho phép trong `WorkflowStateMachine` để tiến hành đánh giá.
- **Expected Behavior**: Hàm `checkActionAllowed` sẽ quét danh sách các actions hợp lệ. Nếu trạng thái Review đã là `STATUS_COMPLETED` hoặc Workflow không cho phép `SELF IN PROGRESS / COMPLETED`, hệ thống từ chối cập nhật.
- **Source**: `Api/EmployeeEvaluationAPI.php#checkActionAllowed:250[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-005: Evaluation Rating Visibility (Blind Review)
- **Actor**: Supervisor / Admin
- **Trigger**: Mở xem bài Tự đánh giá (Self Evaluation) của nhân viên.
- **Precondition**: Nhân viên đang trong trạng thái ACTIVATED hoặc IN_PROGRESS (chưa nộp bài - Complete).
- **Expected Behavior**: Supervisor sẽ **KHÔNG ĐƯỢC XEM** điểm số (Ratings) mà nhân viên đang tự chấm. Biến `sendRatings = false`. Chỉ khi nhân viên "Nộp bài" (chuyển trạng thái sang COMPLETED), điểm số mới hiển thị cho cấp trên.
- **Source**: `Api/EmployeeEvaluationAPI.php#getAll:134[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-006: Complete Evaluation State Change
- **Actor**: Employee
- **Trigger**: Update Evaluation với tham số `complete = true`.
- **Precondition**: Vượt qua Workflow check.
- **Expected Behavior**: Hệ thống cập nhật trạng thái của Reviewer thành `Reviewer::STATUS_COMPLETED`. Nếu `complete = false`, trạng thái được lưu thành `Reviewer::STATUS_IN_PROGRESS`.
- **Source**: `Api/EmployeeEvaluationAPI.php#updateReviewerStatus:281[controller]`
- **Status**: confirmed
- **Confidence**: high
