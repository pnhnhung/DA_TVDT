# Feature Descriptions: Admin Module

## 1. User Management
Cung cấp khả năng kiểm soát truy cập hệ thống.
- **View System Users**: Cho phép tìm kiếm tài khoản theo username, employee name, user role, status.
- **Add System User**: Tạo tài khoản mới. Bắt buộc phải ánh xạ (map) tài khoản này với một Employee đã tồn tại trong PIM. Username phải là duy nhất. Mật khẩu phải đáp ứng tiêu chuẩn độ phức tạp.
- **Edit System User**: Cho phép Admin đổi quyền (role), đổi trạng thái (Enable/Disable) hoặc đổi mật khẩu (Change Password) cho người dùng.
- **Delete System User**: Xóa tài khoản, ngăn chặn đăng nhập vĩnh viễn. Không được tự xóa tài khoản của chính mình.

## 2. Job Configuration
Thiết lập danh mục công việc cho tổ chức.
- **Job Titles**: Định nghĩa chức danh nghề nghiệp. Hỗ trợ đính kèm Job Specification (File). Có logic đặc thù khi update file (Keep/Delete/Replace).
- **Pay Grades**: Thiết lập thang bảng lương. Một Pay Grade có thể gán nhiều loại tiền tệ (USD, VND, etc.) với dải lương Min-Max tương ứng.
- **Employment Status**: Phân loại hình thức làm việc (Full-time, Part-time, Contract).
- **Job Categories**: Phân nhóm công việc theo tiêu chuẩn ngành.

## 3. Organization Structure
Mô hình hóa tổ chức thực tế.
- **General Information**: Thông tin pháp lý của công ty (Tax ID, Registration No, Address).
- **Locations**: Danh sách các văn phòng/địa điểm làm việc. Thông tin này được dùng để lọc nhân viên theo khu vực.
- **Structure**: Quản lý sơ đồ tổ chức dưới dạng cây (Tree). Mỗi node (Subunit) có thể có nhiều node con.

## 4. Qualifications
Quản lý các loại năng lực và chứng chỉ.
- **Skills**: Kỹ năng chuyên môn (ví dụ: PHP, Project Management).
- **Education**: Trình độ học vấn (Bachelor, Master).
- **Licenses**: Giấy phép hành nghề.
- **Languages**: Ngôn ngữ.
- **Memberships**: Các hiệp hội, tổ chức thành viên.

