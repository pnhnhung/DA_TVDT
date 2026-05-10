# Module Spec: Performance

## Phạm Vi & Mục Đích
Phân hệ **Performance** quản lý quy trình đánh giá năng lực của nhân viên. Hệ thống cung cấp công cụ để cấu hình các tiêu chí đánh giá (KPIs), tạo các chu kỳ đánh giá (Reviews) và kiểm soát luồng chấm điểm (Evaluation Workflow) giữa nhân viên tự đánh giá và người quản lý (Supervisor).

## Actors & Roles
| Role | Quyền chính |
|---|---|
| Admin | Cấu hình KPIs chung, tạo các đợt Performance Review cho toàn công ty, xem được mọi kết quả. |
| Supervisor | Tham gia đánh giá nhân viên cấp dưới (Subordinates) dựa trên cấu hình Review được giao. |
| Employee | Thực hiện tự đánh giá (Self Evaluation) bản thân khi được yêu cầu. |

## Features Chính
| Feature | Mô tả | Source |
|---|---|---|
| KPI Configuration | Thiết lập chỉ số đánh giá theo từng chức danh công việc (Job Title). | `Api/KpiAPI.php` |
| Review Configuration | Tạo đợt đánh giá, giao cho Supervisor và Employee tương ứng. | `Api/PerformanceReviewAPI.php` |
| Evaluation Workflow | Hệ thống quản lý trạng thái nộp bài và chấm điểm của hai bên. | `Api/EmployeeEvaluationAPI.php` |

## Field Rules Quan Trọng
- **KPI**: `title` (max 100 ký tự), bắt buộc có `minRating` và `maxRating` (0-100).
- **Review**: `empNumber` và `reviewerEmpNumber` phải là các ID hợp lệ, có quan hệ quản lý. Bắt buộc có ngày tháng `startDate` và `endDate`.

## Business Rules Quan Trọng
- **Review Supervisor Validation**: API chặn việc tạo Review nếu người đánh giá (reviewer) không phải là quản lý trực tiếp của nhân viên.
- **Blind Review (Bảo mật điểm số)**: Khi Employee đang trong quá trình tự đánh giá (In Progress), Supervisor sẽ **không thể xem được điểm số** do Employee chấm. Điểm số chỉ hiện lên sau khi Employee chính thức nộp bài (Completed).
- **Editability Constraint**: Không thể sửa đổi thông tin cấu hình của đợt Review nếu đợt đánh giá đã bắt đầu hoặc đã kết thúc.

## Cross-Module Dependencies
| Module | Relationship | Contract Status |
|---|---|---|
| PIM | Hệ thống dựa vào PIM để kiểm tra quan hệ quản lý (Supervisor) cho phép đánh giá. | READY |
| Admin | Các KPI được gắn trực tiếp vào các Job Titles cấu hình bên module Admin. | READY |

## Gaps & Questions
Hiện tại Phase 2 extraction cho module Performance đã hoàn chỉnh và bao phủ rất tốt toàn bộ business logic.
Không có Gap nào. Sẵn sàng cho Handoff.
