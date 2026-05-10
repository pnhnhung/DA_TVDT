# User Stories: Recruitment Module

## Topic: Vacancy Management

### US-001: Tạo mới Tin Tuyển Dụng (Vacancy)
**Là một** Admin / Hiring Manager
**Tôi muốn** tạo một Vacancy mới liên kết với một Job Title và một Hiring Manager
**Để** thông báo nhu cầu tuyển dụng và bắt đầu tiếp nhận hồ sơ.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Tên Vacancy (name) không được vượt quá 100 ký tự.
- Hệ thống bắt lỗi (Bad Request) nếu Job Title hoặc Hiring Manager được chọn không ở trạng thái Active.
- Tôi có thể thiết lập cờ `isPublished` để tin tuyển dụng hiển thị ra ngoài web public.

## Topic: Candidate Management

### US-002: Thêm mới Ứng viên nội bộ
**Là một** Admin / Hiring Manager
**Tôi muốn** tự nhập thông tin một ứng viên (Name, Email, Phone) và gắn vào một Vacancy
**Để** đưa họ vào luồng quy trình phỏng vấn.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- First Name và Last Name là bắt buộc, tối đa 30 ký tự. Email là bắt buộc và phải đúng định dạng.
- Khi tạo xong, hệ thống tự động sinh một bản ghi `CandidateHistory` (Action: ADD) và nếu có gắn Vacancy, sẽ tự set trạng thái ứng viên là `APPLICATION INITIATED`.

### US-003: Chuyển Vacancy cho Ứng viên
**Là một** Admin / Hiring Manager
**Tôi muốn** đổi Vacancy của một ứng viên đang có trong hệ thống
**Để** chuyển ứng viên sang một vị trí phù hợp hơn mà không phải nhập lại hồ sơ.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Khi update `vacancyId` mới cho ứng viên, hệ thống phải lưu vết `VACANCY_REMOVED` cho vacancy cũ.
- Sau đó, ứng viên được liên kết với Vacancy mới và khởi động lại luồng ở trạng thái `APPLICATION INITIATED`.

## Topic: Candidate Workflow

### US-004: Quản lý Luồng Trạng Thái (Phễu Tuyển Dụng)
**Là một** Hiring Manager / Interviewer
**Tôi muốn** cập nhật trạng thái ứng viên (Shortlist, Schedule Interview, Passed, Offered...)
**Để** theo dõi tiến độ ứng viên theo đúng quy trình công ty.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Hệ thống chặn lại bằng lỗi `403 Forbidden` nếu tôi cố tình chuyển trạng thái không hợp lệ (ví dụ: đang Rejected mà cố bấm Hire) hoặc tôi không có quyền (không phải Hiring Manager của job đó).
- Tôi có thể nhập thêm `note` khi chuyển trạng thái để giải thích lý do. Toàn bộ được ghi vào `CandidateHistory`.

### US-005: Tự động tạo Hồ sơ Nhân viên (Hire Candidate)
**Là một** Hiring Manager / Admin
**Tôi muốn** đánh dấu ứng viên là "HIRED" (Đã tuyển)
**Để** xác nhận ứng viên đã đồng ý nhận việc và chuyển họ thành nhân viên.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Khi gọi thành công hành động `HIRED`, ngoài việc đổi trạng thái ứng viên, hệ thống phải tự động sinh ra một `Employee` record mới trong PIM.
- Employee mới phải có sẵn thông tin First Name, Last Name, Email, và Job Title được sao chép tự động từ Candidate Profile và Vacancy liên kết.
