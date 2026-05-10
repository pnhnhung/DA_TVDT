# User Stories: Dashboard Module

## Topic: Task Management (My Actions)

### US-001: Xem tổng hợp công việc cần xử lý
**Là một** Quản lý (Supervisor)
**Tôi muốn** nhìn thấy số lượng các đơn từ (nghỉ phép, chấm công) đang chờ tôi duyệt ngay khi đăng nhập
**Để** không bị sót việc và xử lý kịp thời.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Widget "My Actions" hiển thị các đầu mục công việc cùng số lượng (Ví dụ: "Leave Requests to Approve (3)").
- Nếu công ty tắt phân hệ Leave, hệ thống sẽ ẩn hoàn toàn dòng "Leave Requests to Approve" thay vì hiển thị số 0.
- Số lượng công việc chỉ đếm trên các nhân viên thuộc cấp dưới của tôi.

## Topic: Team Awareness (Leave Today)

### US-002: Xem danh sách nghỉ phép trong ngày
**Là một** Nhân viên
**Tôi muốn** biết trong ngày hôm nay có đồng nghiệp nào đang nghỉ phép không
**Để** chủ động sắp xếp lịch họp hoặc công việc chung.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Danh sách lấy từ cơ sở dữ liệu nghỉ phép (Leave) và hiển thị các đơn nghỉ trùng với ngày hiện tại của hệ thống.
- Tôi có thể vào cấu hình widget và chọn "Chỉ hiển thị người trong nhóm của tôi".

## Topic: Utilities (Shortcuts)

### US-003: Chấm công nhanh (Punch In/Out)
**Là một** Nhân viên
**Tôi muốn** có nút bấm điểm danh ngay trên trang chủ
**Để** tiết kiệm thời gian mỗi buổi sáng thay vì phải điều hướng vào phân hệ Attendance.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Hiển thị nút "Punch In" nếu tôi chưa chấm công.
- Hiện thống kê số giờ làm việc lũy kế trong tuần hiện tại.
