# User Stories: Attendance Module

## Topic: Time Tracking (Punch In/Out)

### US-001: Khai báo giờ vào làm
**Là một** Nhân viên
**Tôi muốn** ấn nút "Punch In" khi vừa tới công ty
**Để** hệ thống ghi nhận tôi đã bắt đầu ca làm việc ngày hôm nay.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Hệ thống lấy giờ tự động. Nếu giờ của máy tính tôi bị sai quá 3 phút so với máy chủ, hệ thống từ chối cho phép điểm danh để chống gian lận.
- Tôi không thể Punch In nếu tôi đang trong trạng thái "Đã Punch In" nhưng chưa Punch Out. Hệ thống phải ném lỗi Overlap.

### US-002: Khai báo giờ tan ca
**Là một** Nhân viên
**Tôi muốn** ấn nút "Punch Out" khi chuẩn bị đi về
**Để** kết thúc ca làm việc và làm cơ sở cho bộ phận kế toán tính toán tổng thời gian có mặt.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Tôi CHỈ có thể Punch Out nếu tôi đã Punch In trước đó. Hành động Punch Out bản chất là bổ sung thông tin "Giờ Ra" vào bản ghi "Giờ Vào" đang mở.

## Topic: Record Management

### US-003: Chấm công hộ (Proxy Punch)
**Là một** Quản lý (Supervisor)
**Tôi muốn** tự tay nhập giờ Punch In / Punch Out cho một nhân viên cấp dưới
**Để** xử lý các trường hợp nhân viên quên mang điện thoại hoặc máy lỗi không thể tự chấm công.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Tôi có thể chọn một nhân viên dưới quyền, gõ một ngày giờ cụ thể trong quá khứ và lưu lại.
- Hệ thống vẫn phải kiểm tra luật Chống trùng lặp (Overlap) khi tôi nhập giờ. Khoảng thời gian tôi nhập không được đè lên các bản ghi có sẵn của nhân viên đó.

### US-004: Xóa bản ghi chấm công lỗi
**Là một** Quản lý
**Tôi muốn** chọn và xóa các bản ghi chấm công bị sai của nhân viên
**Để** làm sạch dữ liệu trước khi chạy bảng lương.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Tôi chỉ được xóa các bản ghi của cấp dưới. Nếu tôi cố truyền ID bản ghi của một người ngoài nhóm, hệ thống chặn tôi bằng quyền Forbidden.
