# Feature Descriptions: Performance Module

## 1. Cấu hình Chỉ số (KPIs Configuration)

### 1.1 Quản lý danh mục KPI
Cho phép tạo các bộ chỉ số đo lường hiệu suất.
- **Gắn với Job Title**: Mỗi KPI bắt buộc phải được ánh xạ với một chức danh cụ thể. Khi đánh giá một nhân viên, hệ thống sẽ bốc các KPI tương ứng với chức danh của người đó.
- **Thang điểm**: Tùy chỉnh điểm tối thiểu (minRating) và tối đa (maxRating), giới hạn từ 0-100.
- **Tính cố định**: Nếu KPI đã được sử dụng trong các đợt đánh giá trước đó, chức năng chỉnh sửa sẽ bị khóa (chỉ được sửa tham số nhỏ) để không làm lệch điểm cũ.

---

## 2. Quản lý Đợt Đánh giá (Performance Review)

### 2.1 Khởi tạo đợt đánh giá
HR hoặc Admin tạo đợt đánh giá cho một cá nhân.
- **Kiểm tra quyền hạn**: Giao diện chỉ cho phép chọn `reviewerEmpNumber` (Người đánh giá) là người có mối quan hệ Report (Supervisor) với nhân viên đó. Nếu cố tình bypass qua API, hệ thống sẽ bắt lỗi Bad Request.
- **Chu kỳ thời gian**: Bắt buộc nhập Ngày bắt đầu kỳ, ngày kết thúc kỳ đánh giá và Hạn chót (Due Date) phải nộp bài.
- **Kích hoạt (Activate)**: Có thể tạo nháp (Inactive) hoặc kích hoạt ngay (Activated).

---

## 3. Chấm điểm & Đánh giá (Evaluation)

### 3.1 Tự đánh giá (Self Evaluation)
Giao diện dành cho nhân viên tự chấm điểm các KPI của mình.
- **Tính bảo mật (Blind Review)**: Khi nhân viên chọn "Save Draft" (Lưu nháp - In Progress), điểm số của họ hoàn toàn tàng hình với cấp trên qua API. Trừ phi nhân viên bấm "Nộp" (Complete = true), dữ liệu mới được hiển thị cho cấp trên xem.

### 3.2 Cấp trên đánh giá (Supervisor/Final Evaluation)
Giao diện dành cho sếp chấm điểm.
- **Cơ chế State Machine**: Việc cấp trên có được phép chấm điểm hay không phụ thuộc vào Workflow do Admin cấu hình. Ví dụ: Nếu luồng quy định nhân viên phải nộp bài tự đánh giá xong sếp mới được chấm, thì giao diện của sếp sẽ bị khóa (Forbidden) cho đến khi nhân viên nộp bài.
- **Chốt kết quả**: Trạng thái cuối cùng của đợt đánh giá là `Completed`. Khi đã completed, toàn bộ thông tin trở thành Read-only (chỉ xem), không ai được phép thay đổi điểm số.
