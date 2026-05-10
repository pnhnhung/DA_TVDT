# Module Scope: Leave

## 1. Giới thiệu (Overview)
Module **Leave** (Nghỉ phép) trong OrangeHRM quản lý toàn bộ quy trình xin nghỉ, cấp phép nghỉ và theo dõi quỹ ngày nghỉ của nhân viên. Module này hỗ trợ cả luồng tự phục vụ (ESS - Employee Self Service) để nhân viên tự xin nghỉ, và luồng quản lý (Admin/Supervisor) để gán ngày nghỉ, duyệt đơn và thiết lập quỹ phép.

## 2. Phạm vi chức năng (In-Scope)
Module Leave bao gồm các nhóm chức năng chính sau:
- **Configuration (Cấu hình)**:
  - **Leave Period**: Thiết lập chu kỳ năm nghỉ phép (ví dụ: từ 1/1 đến 31/12).
  - **Leave Types**: Định nghĩa các loại nghỉ phép (Annual Leave, Sick Leave, Maternity Leave...).
  - **Work Week**: Thiết lập tuần làm việc (ngày nào đi làm, ngày nào nghỉ nửa buổi/cả ngày).
  - **Holidays**: Quản lý danh sách các ngày lễ (Public Holidays).
- **Entitlements (Quỹ phép)**:
  - Thêm, sửa, xem quỹ ngày nghỉ cho từng nhân viên hoặc hàng loạt nhân viên theo từng loại nghỉ (Leave Type) và chu kỳ (Leave Period).
- **Leave Operations (Vận hành)**:
  - **Apply Leave (ESS)**: Nhân viên nộp đơn xin nghỉ.
  - **Assign Leave (Admin/Supervisor)**: Quản lý gán ngày nghỉ trực tiếp cho nhân viên.
  - **Leave List / My Leave**: Xem danh sách các đơn xin nghỉ, trạng thái đơn (Pending, Approved, Rejected, Cancelled).
  - Duyệt (Approve), Từ chối (Reject), Hủy (Cancel) đơn xin nghỉ. Khả năng bình luận (Comments) trên đơn.
- **Reports (Báo cáo)**:
  - Xem báo cáo số dư ngày nghỉ (Leave Balance Report) cho cá nhân hoặc toàn công ty.

## 3. Không thuộc phạm vi (Out-of-Scope)
- **Attendance (Chấm công)**: Việc nhân viên có quẹt thẻ hay check-in đi làm hay không thuộc module **Time** hoặc **Attendance**, không nằm trong Leave.
- **Payroll (Tính lương)**: Việc trừ lương do nghỉ không phép không được tính toán trong module này.

## 4. Actors & Roles
- **System Administrator / HR Admin**: Có toàn quyền cấu hình Leave Types, Holidays, Work Week, thêm Entitlement cho mọi người, và Assign Leave cho bất kỳ ai.
- **Supervisor**: Có quyền xem quỹ phép, duyệt/từ chối đơn xin nghỉ của cấp dưới trực tiếp (subordinates). Có thể Assign Leave cho cấp dưới.
- **ESS (Employee)**: Chỉ có thể Apply Leave cho chính mình, xem My Leave, và My Leave Entitlements. Không thể tự duyệt đơn của mình.

## 5. Ràng buộc & Tích hợp (Dependencies & Integrations)
- **PIM Module**: Ràng buộc cực mạnh. Mọi thao tác đều gắn với Employee. Khi Joined Date của nhân viên thay đổi trong PIM, quỹ phép bên Leave có thể bị ảnh hưởng.
- **Admin Module**: Việc cấu hình Notification/Email Subscriptions bên Admin sẽ kích hoạt tính năng gửi email khi có đơn xin nghỉ mới hoặc đơn được duyệt bên Leave.
