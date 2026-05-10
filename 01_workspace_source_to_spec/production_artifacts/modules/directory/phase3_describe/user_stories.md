# User Stories: Directory Module

## Topic: Directory Search

### US-001: Tìm kiếm nhân viên
**Là một** Nhân viên
**Tôi muốn** tìm kiếm thông tin của một đồng nghiệp trong công ty thông qua Danh bạ
**Để** biết số điện thoại, email công việc và phòng ban của họ nhằm thuận tiện liên hệ.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Tôi có thể tìm theo một phần Tên (Name) hoặc ID nhân viên.
- Tôi có thể lọc theo Chức danh (Job Title) hoặc Địa điểm làm việc (Location).
- Tôi chỉ có thể xem, không thể sửa đổi bất kỳ thông tin nào trong giao diện này.

### US-002: Chặn sửa đổi danh bạ
**Là một** Hệ thống
**Tôi muốn** vô hiệu hóa toàn bộ các chức năng tạo/sửa/xóa trên module Danh bạ
**Để** đảm bảo tính toàn vẹn dữ liệu, ép buộc người dùng phải qua phân hệ PIM để thao tác nếu có thẩm quyền.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Bất kỳ API request nào mang phương thức POST, PUT, DELETE gọi vào endpoint `/api/v2/directory/employees` đều trả về lỗi `NotImplementedException`.
