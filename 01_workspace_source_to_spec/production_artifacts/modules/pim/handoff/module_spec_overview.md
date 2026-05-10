# Module Spec: PIM

## Phạm Vi & Mục Đích
PIM là cốt lõi quản lý hồ sơ nhân viên trong OrangeHRM, cung cấp nguồn dữ liệu tập trung về định danh, liên lạc và công việc của mỗi cá nhân, làm nền tảng cho các module Leave, Time, Recruitment.

## Actors & Roles
| Role | Quyền chính |
|---|---|
| Admin | Toàn quyền thêm, sửa, xóa, terminate hồ sơ nhân viên |
| ESS | Xem và sửa thông tin cá nhân của chính mình (My Info) |

## Features Chính
| Feature | Mô tả | Source |
|---|---|---|
| Add Employee | Tạo mới hồ sơ nhân viên cơ bản | `Api/EmployeeAPI.php` |
| Delete Employee | Xóa vĩnh viễn hồ sơ nhân viên | `Api/EmployeeAPI.php` |

## Field Rules Quan Trọng
- **First/Last Name**: Bắt buộc, max 30 ký tự.
- **Employee ID**: Max 10 ký tự, phải unique toàn hệ thống.

## Business Rules Quan Trọng
- Tạo mới nhân viên sẽ kích hoạt event cập nhật/tạo mới các record bên module Leave/Time.
- Cấm xóa user admin hiện tại hoặc admin mặc định.

## Cross-Module Dependencies
| Module | Relationship | Contract Status |
|---|---|---|
| Leave | Subscribe sự kiện tạo/xóa nhân viên | Confirmed |
| Time | Subscribe sự kiện tạo/xóa nhân viên | Inferred |

## Out of Scope
- Quản lý cấu trúc phòng ban (thuộc Admin module).
- Phê duyệt ngày nghỉ (thuộc Leave module).

## Gaps & Questions
- Cần làm rõ chính sách khóa/xóa (Undeletable IDs) đối với user admin để automation không test xóa nhầm.
