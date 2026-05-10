# Manual Scope: Admin

## Scope bao gồm (In-Scope)
- **User Management**: Tạo, sửa, xóa user (Rất quan trọng - P1).
- **Job Configuration**: Job Title, Pay Grade, Categories, Status, Work Shift (Quản trị danh mục cốt lõi - P1/P2).
- **Organization**: Gen Info, Subunit, Location (Sơ đồ tổ chức - P1).
- **Qualifications & Nationalities**: CRUD cơ bản (P2/P3).

## Scope loại trừ (Out-of-Scope / Blocked)
- **Configurations (Email, Module)**: Thiếu spec về luồng tác động -> Blocked (Chỉ sinh TC mức API CRUD cơ bản nếu cần).
- Phân quyền động (Dynamic Role Routing): Không có rule cụ thể trong Business Rules.

## Risk Assessment
- **Security & Access**: Tính toàn vẹn của danh sách System User (Không xóa user đang đăng nhập/admin mặc định).
- **Data Integrity**: Các validation unique (username, job title) và limit validation để tránh vỡ UI hoặc lỗi DB.
- **Workflow Continuity**: Ràng buộc dữ liệu (EmpNumber của User phải tồn tại ở PIM).
