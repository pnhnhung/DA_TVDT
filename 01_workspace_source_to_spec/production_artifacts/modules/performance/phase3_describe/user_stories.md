# User Stories: Performance Module

## Topic: Configuration (KPI & Trackers)

### US-001: Tạo mới chỉ số KPI
**Là một** Admin
**Tôi muốn** tạo mới một tiêu chí đánh giá (KPI) và gắn nó cho một Job Title
**Để** làm chuẩn mực đo lường hiệu suất cho tất cả nhân viên mang chức danh đó.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Tên tiêu chí (Title) là bắt buộc, tối đa 100 ký tự.
- Phải liên kết tới một Job Title hợp lệ đang có trong hệ thống.
- Tôi có thể giới hạn khung điểm (minRating và maxRating), giá trị phải nằm trong khoảng từ 0 đến 100.

### US-002: Khóa dữ liệu KPI cũ
**Là một** Admin
**Tôi muốn** hệ thống tự khóa những KPI đã từng được sử dụng để đánh giá
**Để** đảm bảo lịch sử dữ liệu điểm số của năm cũ không bị sai lệch nếu tôi sửa min/max rating.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Khi tôi cố tình update lại Title, minRating, maxRating của một KPI đã từng nằm trong một bài Review, hệ thống sẽ bỏ qua sự thay đổi này.

## Topic: Performance Review Management

### US-003: Tạo Đợt Đánh giá
**Là một** Admin / Supervisor
**Tôi muốn** tạo một đợt Performance Review mới cho nhân viên của mình
**Để** yêu cầu họ thực hiện tự đánh giá.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Tôi phải chỉ định chính xác mã nhân viên (`empNumber`) và mã người đánh giá (`reviewerEmpNumber`).
- Hệ thống bắt lỗi (Bad Request) nếu `reviewerEmpNumber` không phải là cấp trên trực tiếp/gián tiếp của `empNumber` theo sơ đồ tổ chức.
- Khi tạo thành công với cờ `activate=true`, hệ thống tự thiết lập trạng thái `STATUS_ACTIVATED`.

## Topic: Performance Evaluation

### US-004: Chấm điểm bí mật (Blind Review)
**Là một** Nhân viên (Employee)
**Tôi muốn** điểm số do tôi tự chấm chưa bị hiển thị cho sếp
**Để** sếp tôi không bị thiên kiến (bias) trước khi họ xem xét và chấm điểm riêng của họ.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Miễn là tôi vẫn bấm nút "Lưu nháp" (complete = false) và trạng thái của tôi là `IN_PROGRESS`, nếu cấp trên dùng API gọi lấy danh sách ratings của tôi, hệ thống sẽ ẩn điểm đi (`sendRatings = false`).
- Chỉ khi tôi bấm nút "Nộp bài" (complete = true), điểm số mới công khai.

### US-005: Ràng buộc quy trình đánh giá
**Là một** Người dùng (Employee hoặc Supervisor)
**Tôi muốn** hệ thống chặn các thao tác sai quy trình đánh giá
**Để** đợt đánh giá diễn ra minh bạch theo đúng thứ tự (ví dụ: Nhân viên nộp -> Sếp nộp -> Chốt cuối).
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Mỗi lần tôi gửi API cập nhật điểm, hệ thống sẽ hỏi State Machine. Nếu hành động của tôi không có trong danh sách được phép (AllowedActions), API trả về lỗi `403 Forbidden`.
- Nếu kỳ Review đã đóng (`STATUS_COMPLETED`), không ai có thể sửa điểm.
