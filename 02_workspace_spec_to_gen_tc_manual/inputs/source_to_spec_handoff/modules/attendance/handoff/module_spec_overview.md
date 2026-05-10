# Module Spec: Attendance

## Phạm Vi & Mục Đích
Phân hệ **Attendance** (Chấm công) quản lý thời gian ra vào của nhân viên. Mục đích của module này là cung cấp cơ chế ghi nhận giờ giấc một cách chuẩn xác, chống gian lận, và phân quyền quản lý (xem/xóa/sửa) dữ liệu theo cấu trúc phân cấp (Nhân viên - Quản lý - Quản trị hệ thống).

## Actors & Roles
| Role | Quyền chính |
|---|---|
| Employee | Tự chấm công (Punch In/Out), xem và xóa lịch sử chấm công của chính mình. |
| Supervisor | Xem và xóa lịch sử chấm công của cấp dưới. |
| Admin | Quản lý toàn bộ lịch sử chấm công, cấu hình thời gian chênh lệch cho phép (Forging Prevention). |

## Features Chính
| Feature | Mô tả | Source |
|---|---|---|
| Punch In / Out Lifecycle | Quy trình ghi nhận giờ vào làm và giờ kết thúc, đi kèm các lớp bảo vệ dữ liệu. | `Api/EmployeeAttendanceRecordAPI.php` |
| Forging Prevention | Chống gian lận giờ giấc từ client bằng cơ chế kiểm tra độ lệch giờ (margin 180s) với server. | `Api/MyAttendanceRecordAPI.php` |
| Moderation / Deletion | Phân quyền xóa và chỉnh sửa bản ghi tùy thuộc vào vai trò. | `Api/EmployeeAttendanceRecordAPI.php` |

## Business Rules Quan Trọng
- **Overlap Protection**: Khi ghi nhận giờ (Punch In hoặc Update Punch Out), hệ thống luôn quét cơ sở dữ liệu để đảm bảo khoảng thời gian mới không bị đè lấp lên các bản ghi có sẵn.
- **Current Time Validation**: Hệ thống so sánh dữ liệu thời gian client gửi lên với múi giờ thực tế. Nếu độ lệch vượt quá 180 giây (+/- 3 phút), lệnh sẽ bị từ chối (`invalidDateTime`) để tránh việc nhân viên chỉnh giờ trên máy tính để gian lận.
- **Delete Authorization**: Quyền hạn được kiểm soát nghiêm ngặt. Employee chỉ được xóa đúng các ID thuộc sở hữu cá nhân, Supervisor được thao tác trên cấp dưới, mọi hành vi vượt quyền sẽ sinh lỗi `ForbiddenException`.

## Cross-Module Dependencies
| Module | Relationship | Contract Status |
|---|---|---|
| PIM | Attendance liên kết mật thiết tới `empNumber`. Quyền hạn (Supervisor-Subordinate) cũng được lấy từ PIM. | READY |
| Time | Dữ liệu Attendance thường được dùng để đối chiếu trong tính toán Timesheet (Phân hệ Time). | READY |

## Gaps & Questions
Module này đã được trích xuất (extraction) rất chi tiết, phủ kín hầu hết các luồng nghiệp vụ cốt lõi, hiện **không có Gaps nào**.
Sẵn sàng (READY) để bàn giao cho Automation Team viết test case, đặc biệt là E2E Test cho State Machine (Punch In -> Punch Out) và Security Validation (Forging Prevention).
