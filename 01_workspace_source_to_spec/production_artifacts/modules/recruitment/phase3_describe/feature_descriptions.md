# Feature Descriptions: Recruitment Module

## 1. Vacancy Management (Quản lý Tin Tuyển Dụng)

### 1.1 Khởi tạo và cập nhật Vacancy
Cho phép tạo mới một nhu cầu tuyển dụng trong công ty.
- **Ràng buộc danh mục**: Khi tạo, bắt buộc phải chọn một Job Title đang Active (hoạt động) và một Employee đang Active làm Hiring Manager. Nếu không, hệ thống từ chối (Bad Request).
- **Trạng thái Public**: Trường `isPublished` cho phép hiển thị Vacancy này ra ngoài public web portal hay không.

### 1.2 Đính kèm Vacancy (Attachments)
- Cho phép upload các file mô tả công việc (JD), quy trình tuyển dụng nội bộ đính kèm theo từng Vacancy để Hiring Manager và Interviewer tiện theo dõi.

---

## 2. Candidate Management (Quản lý Ứng Viên)

### 2.1 Quản lý Hồ sơ Ứng viên (Candidate Profiles)
- **Thông tin cốt lõi**: Quản lý Tên (First/Middle/Last), Email, Contact Number và Keywords (để dễ search).
- **Đính kèm Resume**: Ứng viên hoặc HR có thể đính kèm file Resume/CV.
- **Thay đổi Vacancy**: Nếu HR quyết định ứng viên này phù hợp với một Vacancy khác hơn, khi thay đổi `vacancyId`, hệ thống sẽ tự động hủy liên kết (remove) với vacancy cũ, lưu vết lịch sử là `VACANCY_REMOVED`, và tạo luồng mới cho Vacancy mới từ trạng thái `APPLICATION INITIATED`.

### 2.2 Candidate Action History
- Mỗi hành động trên ứng viên (Thêm mới, Đổi Vacancy, Đổi trạng thái) đều được lưu lại tại `CandidateHistory`. Dữ liệu lưu vết bao gồm: Tên hành động, Ai thực hiện, Thời gian thực hiện, và Ghi chú (Note).

---

## 3. Candidate Workflow Actions (Luồng Trạng Thái Tuyển Dụng)

### 3.1 Chuyển trạng thái an toàn (State Machine Transition)
Mọi API thay đổi trạng thái của ứng viên (Shortlist, Schedule Interview, Hire...) đều kế thừa chung một cơ chế kiểm tra (Gatekeeper).
- **Kiểm tra quyền**: Hệ thống gọi State Machine kiểm tra xem State hiện tại của ứng viên có được phép chuyển sang State mong muốn hay không.
- **Ràng buộc**: Nếu không hợp lệ (ví dụ: đang Failed mà cố bấm Hire), hệ thống trả về lỗi 403 Forbidden.

### 3.2 Tự động tạo Nhân viên (Auto-Hire Conversion)
- Khi API `CandidateHiringAPI` được gọi thành công và trạng thái được chốt là `HIRED`, hệ thống ngầm kích hoạt tạo mới một `Employee` trong hệ thống (sử dụng `EmployeeDao`). Dữ liệu chuyển giao gồm Tên, Email và Job Title tương ứng với Vacancy.

---

## 4. Public Web Portal (Cổng Ứng Tuyển Public)

### 4.1 Xem và Ứng tuyển
- Các API public (`/api/v2/recruitment/public/vacancies` và `/api/v2/recruitment/public/applicants`) mở cửa cho người dùng ẩn danh (không có token) có thể lấy danh sách các job đang Published và submit hồ sơ mới trực tiếp vào hệ thống.
