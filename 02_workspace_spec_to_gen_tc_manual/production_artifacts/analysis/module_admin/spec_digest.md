# Spec Digest: Admin

## 1. Phạm Vi & Mục Đích
Phân hệ **Admin** là trung tâm quản lý danh mục và cấu hình toàn hệ thống OrangeHRM. Nó quản lý User, Cơ cấu tổ chức, Job, Qualifications và Nationalities.

## 2. Actors & Roles
- **System Administrator**: Toàn quyền.
- **User**: Quyền xem cực kỳ hạn chế nếu được cấp.

## 3. Core Entities
- **User**: Tài khoản hệ thống.
- **Job Title, Job Category, Pay Grade, Emp Status, Work Shift**: Các danh mục công việc.
- **Qualifications**: Skill, Education, License, Language, Membership.
- **Organization**: Gen Info, Location, Subunit (Sơ đồ tổ chức).
- **Nationalities**.

## 4. Key Business Rules
- **BR-001 (Delete Users)**: Hard delete. Không được xóa tài khoản đang đăng nhập hoặc admin mặc định.
- **BR-002 (Create User)**: `username` duy nhất (trừ user đã xóa). `empNumber` phải trỏ tới nhân viên hợp lệ.
- **BR-003 (Update Job Specification)**: Upload file base64, tên < 200 chars. Cờ `currentJobSpecification` quyết định: keepCurrent/deleteCurrent/replaceCurrent. Ném Bad Request nếu trạng thái cờ mâu thuẫn với dữ liệu thật.
- **BR-004 (Delete Subunit)**: Không cho phép xóa node gốc (id = 1). Xóa cập nhật lại nested set.
- **BR-005 (Pay Grade Salary)**: `maxSalary` > `minSalary` (nếu `minSalary` != 0).

## 5. Cross-Module Dependencies
- **PIM**: Admin user cần map với 1 `empNumber`. Xóa Employee bên PIM -> Vô hiệu hóa Admin User.

## 6. Gaps & Limitations
- **CONFLICT**: File `gaps_and_questions.md` báo thiếu hoàn toàn field rules cho Pay Grades, Qualifications, Structure... nhưng file `field_rules.csv` đã có các rules này. Sẽ ưu tiên sử dụng data từ `field_rules.csv` nhưng chỉ sinh testcase ở mức validation cơ bản, các nghiệp vụ phức tạp coi như GAP.
