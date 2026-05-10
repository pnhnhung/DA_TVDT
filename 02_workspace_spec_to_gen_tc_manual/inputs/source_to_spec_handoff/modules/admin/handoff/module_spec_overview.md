# Module Spec: Admin

## Phạm Vi & Mục Đích
Phân hệ **Admin** là trung tâm quản lý danh mục và cấu hình toàn hệ thống OrangeHRM. Nó quản lý người dùng, cơ cấu tổ chức, các thông số công việc (Job, Pay Grade), tiêu chuẩn nhân sự (Qualifications, Nationalities) và cấu hình phân quyền (Role).

## Actors & Roles
| Role | Quyền chính |
|---|---|
| System Administrator | Có toàn quyền truy cập, cấu hình và sửa đổi các thông số quản trị hệ thống. |
| User | Chỉ có thể xem thông tin nếu được gán quyền cụ thể (rất hạn chế). |

## Features Chính
| Feature | Mô tả | Source |
|---|---|---|
| User Management | Quản lý tài khoản đăng nhập (Create, Update, Delete). | `Api/UserAPI.php` |
| Job Titles | Quản lý các chức danh công việc, đính kèm mô tả công việc. | `Api/JobTitleAPI.php` |
| Job Categories | Quản lý phân loại công việc. | `Api/JobCategoryAPI.php` |
| Pay Grades, Emp Status, Work Shifts | Quản lý ngạch lương, trạng thái nhân sự, ca làm việc (đang bị thiếu spec). | GAP |
| Qualifications | Quản lý kỹ năng, học vấn, chứng chỉ, ngoại ngữ (đang bị thiếu spec). | GAP |
| Structure & Locations | Quản lý sơ đồ tổ chức, các chi nhánh làm việc (đang bị thiếu spec). | GAP |

## Field Rules Quan Trọng
- **User Management**: `username` (5-40 ký tự, duy nhất), `password` (tối đa 64 ký tự), các trường `empNumber` và `userRoleId` bắt buộc.
- **Job Titles**: `title` (tối đa 100 ký tự, duy nhất), cho phép upload `specification` giới hạn tên file tối đa 200 ký tự.

## Business Rules Quan Trọng
- **Xóa User**: Xóa cứng (hard delete). Không được phép xóa tài khoản hiện đang đăng nhập (self-deletion) hoặc các tài khoản admin mặc định (bảo vệ hệ thống).

## Cross-Module Dependencies
| Module | Relationship | Contract Status |
|---|---|---|
| PIM | Admin tham chiếu trực tiếp đến `empNumber` của PIM để tạo System User. Xóa Employee bên PIM có thể dẫn đến vô hiệu hóa tài khoản bên Admin. | PARTIAL |

## Gaps & Questions
Hiện tại Phase 2 extraction cho module Admin bị **thiếu sót rất lớn**. Chỉ có các rules cho `User Management`, `Job Titles`, và `Job Categories`.
Các phần chưa được trích xuất (Blocker cho Automation):
- Pay Grades, Employment Status, Work Shifts
- Organization Structure, Locations
- Qualifications (Skills, Education, Licenses, Languages, Memberships)
- Nationalities
Cần có kế hoạch bổ sung specs cho các phần này.
