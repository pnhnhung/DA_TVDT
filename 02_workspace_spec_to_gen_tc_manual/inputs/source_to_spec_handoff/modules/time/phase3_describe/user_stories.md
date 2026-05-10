# User Stories: Time Module

## Topic: Time Tracking Configuration

### US-001: Quản lý Customer (Khách hàng)
**Là một** Admin
**Tôi muốn** tạo, xem, cập nhật và xóa danh sách Khách hàng
**Để** hệ thống có dữ liệu gốc (Customer) phục vụ cho việc tạo dự án và tính phí.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Có thể thêm Khách hàng với tên duy nhất (tối đa 50 ký tự).
- Khi xóa, hệ thống phải chặn lại và hiển thị lỗi nếu Khách hàng này đang có bất kỳ Timesheet nào đã được log (ràng buộc Dependency).

### US-002: Quản lý Dự án (Project)
**Là một** Admin
**Tôi muốn** tạo và quản lý các Dự án trực thuộc một Khách hàng
**Để** có thể tổ chức công việc và gán quyền quản lý dự án cho các nhân sự cấp trung.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Có thể chọn Customer có sẵn để tạo Project (tên project duy nhất trong Customer, tối đa 100 ký tự).
- Có thể phân công tối đa 5 nhân viên làm `Project Admin` cho dự án này.
- Hệ thống từ chối xóa dự án nếu nó đã có người dùng ghi nhận giờ làm (Timesheet items).

### US-003: Quản lý Project Activity
**Là một** Admin hoặc Project Admin
**Tôi muốn** định nghĩa các hoạt động (Activities) cụ thể trong một dự án (ví dụ: Coding, QA, Design)
**Để** nhân sự có thể chọn chính xác công việc họ đã làm khi điền Timesheet.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Tên Activity phải là duy nhất trong nội bộ Project đó.
- Không cho phép xóa Activity nếu nó đã được tham chiếu trong bất kỳ bảng chấm công nào.

## Topic: Timesheet Operations

### US-004: Điền Bảng chấm công cá nhân (My Timesheet Entries)
**Là một** ESS User (Nhân viên)
**Tôi muốn** ghi lại số giờ làm việc của mình theo từng dự án và hoạt động (Activity)
**Để** quản lý biết tôi đã dùng thời gian vào việc gì.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Tôi có thể nhập giờ làm cho từng ngày trong bảng chấm công.
- Tôi có thể xóa các hàng (entries) không cần thiết.
- Hệ thống CHẶN tôi lưu (Save/Update) nếu bảng chấm công này đang ở trạng thái `APPROVED` (chỉ được xem).

### US-005: Quy trình duyệt Timesheet (Workflow Status)
**Là một** Nhân viên / Supervisor / Admin
**Tôi muốn** Nộp (Submit) / Phê duyệt (Approve) / Từ chối (Reject) bảng chấm công
**Để** hoàn tất quy trình báo cáo thời gian cho chu kỳ đó.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Khi tôi Submit, trạng thái chuyển sang Chờ duyệt và tôi có thể nhập Comment tối đa 2000 ký tự.
- Chỉ người có quyền (Supervisor/Admin) mới có thể Approve hoặc Reject.
- Mọi action thay đổi trạng thái đều được lưu lại trong `TimesheetActionLog`.
- Hành động trái phép (ví dụ Submit khi chưa tạo hoặc Submit khi đã Approve) sẽ bị hệ thống báo lỗi 400 Bad Request.

### US-006: Tìm kiếm và Lọc Timesheet
**Là một** Supervisor / Admin
**Tôi muốn** xem danh sách các bảng chấm công của nhân viên cấp dưới trong một khoảng thời gian nhất định
**Để** thực hiện công tác kiểm tra và phê duyệt cuối tháng.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Nếu tôi muốn lọc theo ngày, tôi phải nhập cả Từ ngày (`fromDate`) và Đến ngày (`toDate`).
- Nếu tôi nhập `fromDate` lớn hơn `toDate`, hệ thống sẽ bắt lỗi và yêu cầu nhập lại.
