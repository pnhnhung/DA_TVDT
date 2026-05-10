# Business Context: Leave Module

## 1. Giới thiệu tổng quan
Module **Leave (Nghỉ phép)** là một trong những module quan trọng nhất của OrangeHRM, phục vụ trực tiếp cho toàn bộ nhân sự trong công ty. Nó điện tử hóa quy trình xin nghỉ và quản lý quỹ phép, giúp HR tiết kiệm thời gian, tránh sai sót so với việc theo dõi bằng Excel.

## 2. Giá trị nghiệp vụ (Business Value)
- **Minh bạch quỹ phép**: Nhân viên tự xem được mình còn bao nhiêu ngày nghỉ, thuộc loại phép nào.
- **Quy trình chuẩn hóa**: Đơn xin nghỉ được gửi trực tiếp đến Supervisor hoặc Admin để phê duyệt. Trạng thái rõ ràng (Pending -> Approved).
- **Tự động hóa tính toán**: Trừ quỹ phép tự động khi đơn được duyệt. Tính toán số ngày nghỉ loại trừ đi ngày Lễ (Holidays) và ngày nghỉ cuối tuần (Work Week).

## 3. Các nhóm người dùng (User Personas)
- **System Administrator / HR Admin**: Chịu trách nhiệm thiết lập luật chơi (Leave Types, Holidays) và nạp "ví phép" (Entitlements) cho nhân viên.
- **Supervisor**: Người quản lý trực tiếp, có trách nhiệm kiểm tra và Duyệt (Approve) hoặc Từ chối (Reject) đơn xin nghỉ của cấp dưới.
- **ESS (Employee Self Service)**: Người lao động bình thường. Họ dùng tính năng Apply Leave để nộp đơn và theo dõi trạng thái. Họ không thể tự duyệt đơn của mình.
