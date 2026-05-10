# Business Rules: Recruitment

## Feature: Vacancy Management

### BR-001: Vacancy Job Title Validation
- **Actor**: Admin / Hiring Manager
- **Trigger**: Create hoặc Update Vacancy.
- **Precondition**: `jobTitleId` truyền vào phải là một Job Title đang ACTIVE trong hệ thống.
- **Expected Behavior**: Nếu Job Title không active, API ném lỗi `BadRequestException('Please Select An Active Job Title')`.
- **Source**: `Api/VacancyAPI.php#setVacancy:389[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-002: Vacancy Hiring Manager Validation
- **Actor**: Admin / Hiring Manager
- **Trigger**: Create hoặc Update Vacancy.
- **Precondition**: `employeeId` (Hiring Manager) truyền vào phải là một Employee đang ACTIVE.
- **Expected Behavior**: Nếu Employee không active, API ném lỗi `BadRequestException('Employee No Longer Exists')`.
- **Source**: `Api/VacancyAPI.php#setVacancy:397[controller]`
- **Status**: confirmed
- **Confidence**: high

## Feature: Candidate Management

### BR-003: Attach/Change Candidate Vacancy
- **Actor**: Admin / Hiring Manager
- **Trigger**: Update một Candidate và thay đổi `vacancyId` của họ.
- **Precondition**: Candidate đang có một Vacancy cũ, nay được đổi sang Vacancy mới.
- **Expected Behavior**: Hệ thống gỡ (remove) Vacancy cũ, cập nhật tất cả lịch sử (History) của Vacancy cũ thành null vacancy, và ghi nhận History Log là `RECRUITMENT_CANDIDATE_VACANCY_REMOVED`. Sau đó attach Vacancy mới, set trạng thái Candidate thành `APPLICATION INITIATED` và ghi nhận log `ATTACH_VACANCY`.
- **Source**: `Api/CandidateAPI.php#performCandidateVacancyUpdateCriteria:913[controller]`
- **Status**: confirmed
- **Confidence**: high

## Feature: Candidate Workflow

### BR-004: State Machine Transition Constraint
- **Actor**: Hiring Manager / Interviewer / Admin
- **Trigger**: Gọi các API đổi trạng thái ứng viên (vd: Shortlist, Schedule Interview, Mark Pass/Fail, Offer, Hire).
- **Precondition**: Trạng thái hiện tại của ứng viên (dựa trên CandidateVacancy status) phải CHO PHÉP hành động (action) tương ứng theo `WorkflowStateMachine`.
- **Expected Behavior**: API gọi `getAllowedActions()`. Nếu Resulting State không nằm trong tập các keys được phép chuyển sang, API ném `ForbiddenException`.
- **Source**: `Api/AbstractCandidateActionAPI.php#update:113[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-005: Auto Employee Creation upon Hired
- **Actor**: Hiring Manager / Admin
- **Trigger**: Chuyển trạng thái ứng viên thành `HIRED` (Tuyển dụng thành công).
- **Precondition**: Workflow state machine cho phép chuyển sang HIRED.
- **Expected Behavior**: Hệ thống **tự động** tạo một bảng ghi `Employee` mới dựa trên dữ liệu của Candidate (FirstName, MiddleName, LastName, Email) và thiết lập JobTitle tương ứng với Vacancy mà Candidate đã apply.
- **Source**: `Api/AbstractCandidateActionAPI.php#update:124[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-006: Maximum Interviews Limit
- **Actor**: Hiring Manager / Admin
- **Trigger**: Schedule Interview cho ứng viên.
- **Precondition**: Ứng viên chưa vượt quá giới hạn phỏng vấn cho Vacancy hiện tại.
- **Expected Behavior**: Hệ thống chỉ cho phép tối đa 2 cuộc phỏng vấn (`MAXIMUM_ALLOWED_INTERVIEWS_COUNT = 2`) cho cùng một ứng viên trên một Vacancy. Nếu vượt quá, trả về lỗi 400.
- **Source**: `Api/CandidateInterviewSchedulingAPI.php#create:175[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-007: Candidate Attachment Operations
- **Actor**: Admin / Hiring Manager / Candidate (Online)
- **Trigger**: Thêm hoặc cập nhật file đính kèm (CV/Resume).
- **Expected Behavior**: Khi cập nhật, hệ thống hỗ trợ 2 mode: `replaceCurrent` (thay thế file cũ) hoặc `deleteCurrent` (xóa file hiện tại).
- **Source**: `Api/CandidateAttachmentAPI.php#update:285[controller]`
- **Status**: confirmed
- **Confidence**: high

