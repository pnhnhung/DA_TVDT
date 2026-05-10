# Module Scope: Recruitment

## 1. Giới thiệu
Phân hệ **Recruitment (Tuyển dụng)** trong OrangeHRM cung cấp bộ công cụ để quản lý toàn bộ vòng đời tuyển dụng nhân sự: từ việc đăng tin tuyển dụng (Job Vacancies), tiếp nhận hồ sơ ứng viên (Candidates), lên lịch phỏng vấn (Interviews) cho đến khi đưa ra lời mời làm việc (Job Offer) và chính thức tuyển dụng (Hire).

## 2. Các nhóm chức năng chính (Feature Groups)

### 2.1. Vacancy Management (Quản lý Tin Tuyển Dụng)
- **Job Vacancies**: Tạo, sửa, xóa và đăng tải các vị trí đang cần tuyển dụng. Một Vacancy thường gắn với một Job Title và có thể gán Hiring Manager.
- **Vacancy Attachments**: Đính kèm các tài liệu liên quan đến đợt tuyển dụng (như JD, thông báo tuyển dụng).
- **Public Jobs Portal**: Hệ thống cung cấp trang tuyển dụng công khai (`/recruitmentApply/jobs.html`) và API public để ứng viên bên ngoài có thể xem và nộp đơn.

### 2.2. Candidate Management (Quản lý Ứng viên)
- **Hồ sơ ứng viên**: Lưu trữ thông tin cá nhân, email, số điện thoại của ứng viên.
- **Candidate Attachments**: Quản lý CV/Resume đính kèm của ứng viên.
- **Candidate History**: Ghi nhận toàn bộ lịch sử tương tác và chuyển đổi trạng thái của ứng viên trong quy trình.

### 2.3. Recruitment Workflow (Quy trình Tuyển dụng)
Quản lý luồng trạng thái của ứng viên khi ứng tuyển vào một Vacancy:
- **Application Initiated**: Hồ sơ mới nhận.
- **Shortlist / Reject**: Đưa vào danh sách xem xét hoặc từ chối.
- **Schedule Interview**: Lên lịch phỏng vấn, chỉ định người phỏng vấn (Interviewer).
- **Interview Passed / Failed**: Đánh giá kết quả phỏng vấn.
- **Job Offered**: Đề xuất mức lương/offer.
- **Offer Declined / Hired**: Ứng viên từ chối offer hoặc chính thức được nhận.

## 3. Actors (Đối tượng sử dụng)
- **Admin**: Có toàn quyền cấu hình, đăng tin và quản lý ứng viên trên toàn hệ thống.
- **Hiring Manager / Interviewer**: Người phụ trách tuyển dụng cho vị trí cụ thể, thực hiện phỏng vấn và đánh giá.
- **Public / Applicant**: Người dùng bên ngoài hệ thống (không cần đăng nhập), xem tin tuyển dụng và nộp hồ sơ qua Public Web/API.
