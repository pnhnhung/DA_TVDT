# Feature Descriptions: Leave Module

## 1. Configuration (Cấu hình hệ thống nghỉ phép)
Trước khi nhân viên có thể xin nghỉ, Admin phải thiết lập các danh mục cơ sở này.
- **Leave Types**: Định nghĩa các loại nghỉ phép mà công ty hỗ trợ (ví dụ: Annual Leave, Sick Leave, Maternity Leave). Có tính năng đánh dấu loại phép đó là "Situational" (Tùy tình huống) hay không.
- **Holidays**: Danh sách các ngày lễ được nghỉ có hưởng lương (Public Holidays). Hệ thống hỗ trợ định nghĩa ngày lễ diễn ra cả ngày (Full Day - length = 0) hoặc nửa ngày (Half Day - length = 4). Có tùy chọn lặp lại hàng năm (recurring) để không phải nhập lại. Khi nhân viên xin nghỉ vào ngày lễ, hệ thống sẽ tự động trừ ngày lễ đó ra khỏi tổng số ngày bị trừ phép.

## 2. Entitlements (Quỹ phép)
- **Leave Entitlements**: Tính năng cấp phát (nạp) số ngày nghỉ cho nhân viên. Nhân viên chỉ có thể xin nghỉ (Apply Leave) nếu họ có số dư Entitlement lớn hơn 0 cho loại phép tương ứng.
- **Bulk Assign**: Tính năng cho phép HR gán cùng một lúc quỹ phép cho nhiều nhân viên dựa trên bộ lọc từ module PIM (như Location, Subunit).
- **Validation**: Không thể xóa một quỹ phép nếu nhân viên đã sử dụng nó (đã có đơn xin nghỉ được duyệt).

## 3. Leave Operations (Vận hành quỹ phép)
- **Apply Leave (ESS)**: Giao diện dành cho nhân viên tự nộp đơn xin nghỉ. Hỗ trợ tùy chọn độ dài linh hoạt (Cả ngày, Nửa ngày sáng/chiều, hoặc theo khoảng giờ cụ thể).
- **Assign Leave (Admin)**: Giao diện dành cho Admin/Supervisor gán trực tiếp ngày nghỉ cho nhân viên (ví dụ khi nhân viên đi công tác đột xuất không kịp làm đơn).
- **Leave Requests List**: Nơi Supervisor quản lý đơn. Các hành động xử lý đơn (Approve/Reject) được thực hiện tại đây. Khi Reject, quỹ phép tạm giữ sẽ được hoàn lại cho nhân viên.
- **Trạng thái linh hoạt**: Một Leave Request bao gồm nhiều ngày nghỉ (Leaves). API yêu cầu khắt khe: Nếu muốn xử lý cả cụm Request, tất cả các ngày bên trong phải có cùng một trạng thái. Nếu người dùng xử lý rời rạc từng ngày, Request sẽ bị lỗi trạng thái và phải được xử lý ở cấp độ từng ngày.
