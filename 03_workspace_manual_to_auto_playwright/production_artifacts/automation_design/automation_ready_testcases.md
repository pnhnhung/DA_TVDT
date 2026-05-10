# Danh Sách Test Cases Đã Chuẩn Hóa (Automation-Ready)

**Module:** Recruitment
**Tổng số:** 16 Test Cases
**Trạng thái:** Sẵn sàng cho Generator (Sau khi bổ sung Locator và Test Data)

---

## 1. STATE_REC_VACANCY

### TC_UT_REC_VAC_01: Tạo mới Vacancy
- **Strategy:** Truy cập `Recruitment > Vacancies > Add`. Điền Form.
- **Data Dependency:** Cần 1 Job Title, 1 Hiring Manager.
- **Unique Data:** Tên Vacancy = `uniqueSuffix('Vac_01')`
- **Assertion:** Toast message hiển thị thành công. Có thể tìm thấy trên danh sách.

### TC_UT_REC_VAC_02: Tạo Vacancy trùng tên
- **Strategy:** Khởi tạo trước 1 Vacancy `uniqueSuffix('Vac_02_Base')`. Điền lại Form Add với tên y hệt.
- **Assertion:** Input báo lỗi "Already exists".

### TC_UT_REC_VAC_04: Cập nhật Vacancy
- **Strategy:** Khởi tạo Vacancy mồi. Mở Edit Form của Vacancy đó. Sửa tên.
- **Assertion:** Toast message hiển thị thành công. Tên mới hiển thị trên List.

### TC_UT_REC_VAC_05: Xóa Vacancy
- **Strategy:** Khởi tạo Vacancy mồi. Bấm icon Delete (thùng rác) tương ứng dòng Vacancy mồi trên lưới Grid. Accept Alert dialog.
- **Assertion:** Toast message hiển thị đã xóa. Không tìm thấy Vacancy mồi trên lưới.

---

## 2. STATE_REC_CANDIDATE

### TC_UT_REC_CAN_01: Candidate Apply thành công
- **Strategy:** Tạo trước Vacancy mồi. Truy cập `Recruitment > Candidates > Add`. Điền Form (chọn Vacancy mồi).
- **Unique Data:** `email = uniqueEmail('cand_01')`
- **Assertion:** Trạng thái Candidate chuyển sang "Application Initiated".

### TC_UT_REC_CAN_02: Candidate trùng Email 1 Vacancy
- **Strategy:** Khởi tạo trước 1 Candidate cho Vacancy A. Cố gắng Add candidate thứ 2 trùng Email vào cùng Vacancy A.
- **Assertion:** Báo lỗi "Email already exists".

### TC_UT_REC_CAN_03: Candidate Email sai định dạng
- **Strategy:** Điền Email = `invalid-email-format` vào Form Add Candidate.
- **Assertion:** Field validation hiển thị lỗi định dạng.

### TC_UT_REC_CAN_04: Upload CV vượt dung lượng
- **Strategy:** Chuẩn bị 1 file giả dung lượng > 1MB. (Có thể dùng file dummy hoặc Node.js để sinh file tạm trong `tests/data/`).
- **Assertion:** Hệ thống báo lỗi dung lượng file khi Upload.

### TC_UT_REC_CAN_06: Xóa Candidate
- **Strategy:** Khởi tạo Candidate mồi. Bấm nút Delete trên Grid dòng tương ứng.
- **Assertion:** Xóa thành công, không còn hiển thị Candidate trên List.

---

## 3. STATE_REC_WORKFLOW

*(Tất cả TC trong Workflow yêu cầu thao tác qua nút "Action" ở Detail View của Candidate).*

### TC_UT_REC_WF_01: Shortlist Candidate
- **Pre-condition:** Candidate State = `Application Initiated`.
- **Action:** Click "Shortlist", nhập Note, click "Save".
- **Assertion:** Status đổi thành `Shortlisted`.

### TC_UT_REC_WF_02: Schedule Interview
- **Pre-condition:** Candidate State = `Shortlisted`.
- **Action:** Click "Schedule Interview", điền Title, Interviewer, Date, Time.
- **Assertion:** Status đổi thành `Interview Scheduled`.

### TC_UT_REC_WF_04: Mark Interview Passed
- **Pre-condition:** Candidate State = `Interview Scheduled`.
- **Action:** Click "Mark Interview Passed".
- **Assertion:** Status đổi thành `Interview Passed`.

### TC_UT_REC_WF_05: Offer Job
- **Pre-condition:** Candidate State = `Interview Passed`.
- **Action:** Click "Offer Job".
- **Assertion:** Status đổi thành `Job Offered`.

### TC_UT_REC_WF_06: Hire Candidate
- **Pre-condition:** Candidate State = `Job Offered`.
- **Action:** Click "Hire".
- **Assertion:** Status đổi thành `Hired`.

### TC_UT_REC_WF_07: Reject Candidate
- **Pre-condition:** Bất kỳ trạng thái nào trước Hired.
- **Action:** Click "Reject".
- **Assertion:** Status đổi thành `Rejected`.

---

## 4. STATE_REC_IT

### TC_IT_REC_04: Workflow Hire to PIM Employee
- **Strategy:** Thực hiện End-to-End quy trình từ Application Initiated -> Hired.
- **Cross-module:** Chuyển sang module `PIM > Employee List`.
- **Assertion:** Kiểm tra Employee vừa được Hire đã tồn tại trong PIM, khớp tên và Email ở phần `otherEmail` (theo rule nghiệp vụ OrangeHRM).
