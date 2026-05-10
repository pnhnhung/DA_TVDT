# Business Context: Time Module

## 1. Mục Đích & Vai Trò
Module **Time & Attendance** trong OrangeHRM có vai trò theo dõi, quản lý toàn bộ thời gian làm việc, sự tham gia dự án và dữ liệu chấm công của nhân viên. Dữ liệu từ module này giúp tổ chức:
- Đánh giá năng suất qua việc đo lường số giờ log vào các dự án/khách hàng.
- Quản lý quy trình chấm công, ghi nhận giờ vào ra (Punch In / Punch Out) của nhân sự.
- Cung cấp cơ sở cho việc tính lương (Payroll) hoặc thanh toán (Billing) dựa trên Timesheets đã được duyệt.

## 2. Các Quy Trình Nghiệp Vụ Cốt Lõi

### 2.1. Time Tracking Configuration (Thiết lập theo dõi)
- **Customer & Project**: Admin định nghĩa danh sách Khách hàng và Dự án. Mỗi dự án thuộc về một khách hàng cụ thể. Admin cũng chỉ định "Project Admin" - người chịu trách nhiệm quản lý dự án.
- **Project Activity**: Mỗi dự án được phân rã thành nhiều "Activity" (ví dụ: Coding, Testing, Design). Khi điền bảng chấm công, nhân viên không chỉ báo cáo thời gian cho Dự án mà phải báo cáo chi tiết đến mức Activity.

### 2.2. Timesheet Lifecycle (Vòng đời Bảng chấm công)
Quy trình Timesheet là một chuỗi các trạng thái (State Machine):
- **INITIAL (Chưa khởi tạo)**: Nhân viên tạo Timesheet cho một khoảng thời gian cụ thể (theo cấu hình hệ thống, ví dụ: hàng tuần).
- **NOT SUBMITTED**: Nhân viên có thể thêm/sửa/xóa số giờ làm việc (entries) cho từng ngày, theo từng cặp Project-Activity.
- **SUBMITTED**: Nhân viên nộp Timesheet. Lúc này, Timesheet chuyển sang trạng thái chờ duyệt. Quyền sửa bị khóa.
- **APPROVED / REJECTED**: Supervisor hoặc Admin xem xét. Nếu từ chối, Timesheet quay về trạng thái có thể sửa. Nếu duyệt, dữ liệu chính thức được chốt.

### 2.3. Attendance Management (Chấm công thực tế)
- **Punch In/Out**: Nhân sự ghi nhận giờ bắt đầu và kết thúc làm việc. Hệ thống kiểm tra chồng chéo (Overlap) để đảm bảo một nhân viên không có 2 ca làm việc diễn ra cùng một thời điểm.
- **Attendance Records**: Admin/Supervisor có thể cấu hình và sửa đổi các log chấm công bị sai, thiếu sót để đảm bảo báo cáo cuối tháng là chính xác.

## 3. Ràng buộc toàn vẹn Dữ liệu (Data Integrity Constraints)
Hệ thống được thiết kế với cơ chế bảo vệ nghiêm ngặt chống lại việc xóa dữ liệu đang được sử dụng (Dependency constraint):
- Không thể xóa **Customer** nếu có Dự án nào của Customer đó đã có nhân viên điền Timesheet.
- Không thể xóa **Project** hoặc **Activity** nếu đã có Timesheet Items được ghi nhận (Logged Against). 
Điều này đảm bảo lịch sử báo cáo thời gian và chi phí không bị hỏng hóc hoặc mất mát do thao tác xóa của Admin.
