# User Stories: Maintenance Module

## Topic: System Cleanup (GDPR Compliance)

### US-001: Xóa vĩnh viễn nhân viên nghỉ việc
**Là một** Quản trị viên hệ thống (Admin)
**Tôi muốn** xóa hoàn toàn mọi dấu vết của một nhân viên đã nghỉ việc từ lâu khỏi database
**Để** dọn dẹp dung lượng hệ thống và tuân thủ luật xóa dữ liệu cá nhân sau khi hết hạn lưu trữ.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Hệ thống chỉ cho phép xóa những tài khoản đáp ứng đủ điều kiện (Terminated/Purgeable).
- Nếu tôi cố truyền ID của một nhân sự đang làm việc, hệ thống báo lỗi không thể xóa.

### US-002: Dọn dẹp hồ sơ ứng viên rác
**Là một** Quản trị viên
**Tôi muốn** dọn sạch các hồ sơ ứng tuyển của một chiến dịch tuyển dụng cũ
**Để** tiết kiệm dung lượng lưu trữ CV.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Khi tôi vào danh sách chuẩn bị xóa, hệ thống chỉ hiển thị những hồ sơ KHÔNG đồng ý lưu trữ (`consentToKeepData = false`).
- Dù tôi có cố ý gọi API để xóa một ứng viên có cờ Consent, hệ thống cũng không liệt kê người đó vào mảng xóa.

## Topic: Data Export

### US-003: Xuất dữ liệu nhân sự (Data Portability)
**Là một** Nhân viên / Quản trị viên
**Tôi muốn** ấn một nút bấm để tải về toàn bộ thông tin công ty đang lưu trữ về tôi
**Để** tôi kiểm tra xem công ty đang nắm giữ những thông tin gì (Tuân thủ luật GDPR Quyền được biết).
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Hệ thống trả về một file định dạng chuẩn (JSON) chứa các metadata và thông tin nhân sự cơ bản.
