# Module Scope: Attendance

## Mục tiêu
Quản lý thời gian có mặt (chấm công) của nhân viên thông qua quy trình Punch In/Out, cho phép theo dõi giờ làm việc, chỉnh sửa bản ghi chuyên cần và thiết lập cấu hình chấm công.

## Actors
- **Employee**: Tự chấm công (Punch In/Out), xem lịch sử chấm công cá nhân.
- **Admin / HR Manager**: Xem và chỉnh sửa bản ghi chấm công của mọi nhân viên, thiết lập cấu hình hệ thống.
- **Supervisor**: Xem và chỉnh sửa bản ghi chấm công của nhân viên cấp dưới (tùy cấu hình).

## Key Features
- **My Attendance**: Cá nhân tự chấm công và xem lịch sử.
- **Employee Attendance**: Quản lý chấm công tập trung cho HR/Admin.
- **Attendance Configuration**: Thiết lập các quy tắc chấm công (vị trí, thiết bị, quyền chỉnh sửa).
- **Overlap Protection**: Ngăn chặn việc chấm công trùng lặp thời gian.

## Boundary & Constraints
- **Punch In/Out Sequence**: Không thể Punch In nếu đã Punched In, không thể Punch Out nếu chưa Punched In.
- **Time Overlap**: Không cho phép tạo bản ghi chấm công đè lên thời gian của bản ghi khác.
- **Edit Protection**: Quy tắc về việc ai được phép sửa bản ghi (Admin vs Employee).

## Source Trace
- `orangehrmAttendancePlugin/config/routes.yaml`
- `orangehrmAttendancePlugin/Api/`
- `orangehrmAttendancePlugin/Controller/`
