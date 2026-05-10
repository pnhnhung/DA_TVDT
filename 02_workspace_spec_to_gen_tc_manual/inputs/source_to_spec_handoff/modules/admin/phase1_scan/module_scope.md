# Module Scope: Admin

## 1. Giới thiệu (Overview)
Module **Admin** là trái tim của hệ thống OrangeHRM, đóng vai trò quản lý cấu hình và danh mục cốt lõi (master data) mà tất cả các module khác (PIM, Leave, Time, v.v.) sẽ phụ thuộc vào. Chỉ những người dùng có quyền Admin toàn hệ thống (System Administrator) mới có thể truy cập và thao tác trên phân hệ này.

## 2. Phạm vi chức năng (In-Scope)
Module Admin bao gồm các nhóm chức năng chính sau:
- **User Management**: Quản lý tài khoản đăng nhập (System Users).
- **Job**: Định nghĩa cơ cấu công việc (Job Titles, Pay Grades, Employment Status, Job Categories, Work Shifts).
- **Organization**: Định nghĩa cơ cấu tổ chức (General Information, Locations, Structure/Subunits).
- **Qualifications**: Quản lý danh mục bằng cấp, kỹ năng (Skills, Education, Licenses, Languages, Memberships).
- **Nationalities**: Quản lý quốc tịch.
- **Configuration**: Cấu hình hệ thống (Email Configuration, Email Subscriptions, Localization, Language Packages, Modules, LDAP/OpenID).

## 3. Không thuộc phạm vi (Out-of-Scope)
- **Employee Records**: Module Admin quản lý tài khoản *đăng nhập* (System Users), nhưng thông tin cá nhân/hồ sơ của nhân viên (Employee Profile) được quản lý ở module **PIM**. Mỗi System User phải map với một Employee trong PIM.
- **Cấu hình Leave/Time**: Module Admin chỉ quản lý danh mục chung. Các cấu hình đặc thù của Leave (như Leave Types, Entitlements) hoặc Time (như Timesheet periods) thuộc về module tương ứng.

## 4. Actors & Roles
- **System Administrator (Admin)**: Người có toàn quyền truy cập, thêm/sửa/xóa tất cả các danh mục và cấu hình trong module này.
- *(Các role khác như ESS, Supervisor thông thường KHÔNG có quyền truy cập module Admin, trừ khi được phân quyền Custom đặc biệt).*

## 5. Ràng buộc & Tích hợp (Dependencies & Integrations)
- **Dependencies (Đầu vào)**: Module Admin gần như độc lập và không phụ thuộc vào dữ liệu của module khác, ngoại trừ bảng User Management bắt buộc phải chọn Employee có sẵn từ PIM để tạo tài khoản.
- **Integrations (Đầu ra)**: Hầu hết các dữ liệu danh mục tạo ra ở đây (Job Title, Location, Subunit) sẽ được trỏ tới bằng khóa ngoại ở các module khác (đặc biệt là PIM). Do đó, việc **Xóa (Delete)** các dữ liệu trong Admin thường phải tuân thủ nghiêm ngặt ràng buộc khóa ngoại (ví dụ: không được xóa Job Title nếu đang có nhân viên giữ chức danh đó).
