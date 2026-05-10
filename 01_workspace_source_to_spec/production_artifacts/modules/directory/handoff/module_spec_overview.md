# Module Spec: Directory

## Phạm Vi & Mục Đích
Phân hệ **Directory** là danh bạ nội bộ công ty. Mục đích duy nhất của module này là cung cấp giao diện tìm kiếm và tra cứu thông tin liên lạc của các nhân viên đang làm việc trong hệ thống. Module này hoàn toàn ở chế độ Read-only.

## Actors & Roles
| Role | Quyền chính |
|---|---|
| Mọi User (Kể cả nhân viên thường) | Đều có thể tìm kiếm và xem danh bạ chung của công ty. |

## Features Chính
| Feature | Mô tả | Source |
|---|---|---|
| Employee Search | Tìm kiếm nhân viên bằng tên, mã số, chức danh hoặc địa điểm làm việc. | `Api/EmployeeDirectoryAPI.php` |

## Field Rules Quan Trọng
- Các tham số đầu vào đều là bộ lọc (Filters): `nameOrId`, `jobTitleId`, `locationId`. Không có trường nào là bắt buộc (Required = No).

## Business Rules Quan Trọng
- **Read-only Data Model**: Dữ liệu danh bạ được phản chiếu trực tiếp từ module PIM. Directory API khóa toàn bộ các hành động tạo, sửa, xóa bằng `NotImplementedException`.
- **View Configuration**: Có thể lấy dữ liệu cơ bản (Default) hoặc chi tiết hơn (Detailed) tùy tham số truy vấn.

## Cross-Module Dependencies
| Module | Relationship | Contract Status |
|---|---|---|
| PIM | Dữ liệu gốc nằm hoàn toàn bên PIM. Mọi thay đổi ở PIM sẽ được hiển thị ngay lập tức sang Directory. | READY |

## Gaps & Questions
Hiện tại Phase 2 extraction cho module Directory đã hoàn chỉnh.
Không có Gap nào. Sẵn sàng cho Handoff.
