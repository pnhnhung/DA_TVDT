# Module Spec: Maintenance

## Phạm Vi & Mục Đích
Phân hệ **Maintenance** chứa các công cụ hỗ trợ hệ thống, trong đó quan trọng nhất là công cụ xóa sạch dữ liệu (Data Purging). Phân hệ này được thiết kế để đảm bảo việc tuân thủ các quy định bảo vệ dữ liệu (ví dụ: GDPR) bằng cách cho phép xóa vĩnh viễn (hard delete) các bản ghi nhân sự hoặc ứng viên đã không còn hoạt động, dọn dẹp không gian lưu trữ và đảm bảo quyền riêng tư.

## Actors & Roles
| Role | Quyền chính |
|---|---|
| Admin | Là người duy nhất có quyền truy cập module này và thực hiện chức năng thanh lọc dữ liệu (Purge). |

## Features Chính
| Feature | Mô tả | Source |
|---|---|---|
| Employee Purge | Chức năng xóa vĩnh viễn một tài khoản nhân viên. | `Api/PurgeEmployeeAPI.php` |
| Candidate Purge | Chức năng xóa vĩnh viễn hàng loạt ứng viên thuộc một đợt tuyển dụng. | `Api/PurgeCandidateAPI.php` |

## Field Rules Quan Trọng
- Hệ thống chỉ chấp nhận `empNumber` hoặc `vacancyId` hợp lệ và đang tồn tại trong DB.

## Business Rules Quan Trọng
- **Employee Eligibility Check**: Admin không thể xóa bừa bãi. Chỉ có những nhân viên đã bị chấm dứt hợp đồng (Terminated) ở module PIM mới có thể lọt vào danh sách chờ xóa (Purgeable).
- **Candidate Consent Constraint**: Khi thực hiện xóa ứng viên theo Vacancy, hệ thống sẽ tự động lọc và **BỎ QUA** tất cả những ứng viên nào đã đồng ý việc giữ lại thông tin (Consent = true). Chỉ những hồ sơ rác/không đồng ý giữ mới bị xóa sạch.

## Cross-Module Dependencies
| Module | Relationship | Contract Status |
|---|---|---|
| PIM | Lấy trạng thái Terminated của nhân sự. Xóa ở đây sẽ xóa sập toàn bộ các liên kết ở PIM. | READY |
| Recruitment | Lấy thông tin ứng viên và cờ Consent để thực hiện Purge. | READY |

## Gaps & Questions
Hiện tại Phase 2 extraction cho module Maintenance đã hoàn chỉnh và đặc tả rõ nét quy trình Purge dữ liệu nhạy cảm.
Không có Gap nào. Sẵn sàng cho Handoff.
