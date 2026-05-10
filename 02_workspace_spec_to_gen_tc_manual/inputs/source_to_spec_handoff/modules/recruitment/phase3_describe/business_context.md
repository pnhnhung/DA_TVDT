# Business Context: Recruitment Module

## 1. Mục Đích & Vai Trò
Phân hệ **Recruitment (Tuyển dụng)** được thiết kế để chuẩn hóa và tự động hóa toàn bộ quy trình tìm kiếm, đánh giá và tuyển dụng nhân sự mới cho tổ chức. Thay vì quản lý CV qua email và Excel, bộ phận HR có thể tập trung toàn bộ dữ liệu ứng viên, lịch sử phỏng vấn, và giao tiếp vào một nền tảng duy nhất.
Kết quả cuối cùng của phân hệ là một quyết định tuyển dụng (Hired) giúp tự động chuyển ứng viên thành nhân viên chính thức trong hệ thống (PIM), tiết kiệm thời gian nhập liệu.

## 2. Quy trình Nghiệp vụ Cốt lõi (Core Workflows)

### 2.1 Đăng tuyển (Job Vacancy Posting)
- Quá trình bắt đầu khi một nhu cầu nhân sự phát sinh. Admin hoặc Hiring Manager sẽ tạo một **Vacancy** liên kết với một Job Title hiện có.
- Vacancy này sẽ quy định: vị trí, người quản lý tuyển dụng (Hiring Manager) và số lượng cần tuyển.
- Nếu được đánh dấu "Published", Vacancy sẽ hiển thị trên trang Public Job Portal (nơi ứng viên bên ngoài có thể tự apply).

### 2.2 Tiếp nhận ứng viên (Candidate Sourcing & Tracking)
Hồ sơ ứng viên có thể vào hệ thống qua 2 đường:
1. Ứng viên tự ứng tuyển qua trang Public.
2. HR tự nhập tay hoặc import CV vào hệ thống.
Khi được tạo, ứng viên được gán vào một Vacancy cụ thể với trạng thái đầu tiên là `APPLICATION INITIATED`.

### 2.3 Phễu tuyển dụng (Recruitment Funnel)
Hệ thống sử dụng Workflow State Machine để khóa luồng tuyển dụng thành một phễu tuần tự:
- **Application Initiated**: Bắt đầu.
- **Shortlisted**: Vượt qua vòng lọc CV.
- **Interview Scheduled**: Lên lịch phỏng vấn với các Interviewer (Hệ thống có thể có nhiều vòng phỏng vấn).
- **Interview Passed / Failed**: Cập nhật kết quả phỏng vấn.
- **Job Offered**: Nếu Pass phỏng vấn, tổ chức sẽ đưa ra lời đề nghị công việc.
- **Hired / Offer Declined**: Ứng viên đồng ý (Hired) hoặc từ chối (Declined).
Ở mỗi bước, người dùng đều có thể để lại "Note" để ghi chú lý do và hệ thống tự động ghi vết lại người thực hiện (Action Log).

## 3. Tính tự động hóa (Automation & Data Flow)
- **Data Conversion**: Khi một ứng viên đạt tới trạng thái **HIRED**, OrangeHRM tự động kích hoạt tiến trình tạo hồ sơ nhân viên mới (Employee) trong phân hệ PIM, chuyển đổi toàn bộ thông tin cơ bản (Name, Email, Job Title) sang mà không cần nhập lại.
- **State Integrity**: Ngăn chặn người dùng "nhảy cóc" quy trình (vd: từ Initial nhảy thẳng sang Hired mà không qua Phỏng vấn hoặc Offer) nếu Workflow không cho phép.
