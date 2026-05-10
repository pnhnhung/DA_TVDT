# Module Scope: Maintenance

## 1. Giới thiệu
Phân hệ **Maintenance (Bảo trì)** là một phân hệ kỹ thuật dành riêng cho Quản trị viên hệ thống (Admin). Chức năng chính của module này là dọn dẹp dữ liệu rác hoặc tuân thủ các quy định về quyền riêng tư (Data Privacy/GDPR) bằng cách xóa vĩnh viễn (Purge) các bản ghi nhân viên hoặc ứng viên không còn sử dụng.

## 2. Các nhóm chức năng chính (Feature Groups)

### 2.1 Purge Employee Records (Xóa vĩnh viễn hồ sơ nhân viên)
- Cho phép quản trị viên xóa sạch mọi dấu vết của một hoặc nhiều nhân viên đã nghỉ việc (Terminated) ra khỏi cơ sở dữ liệu.
- Lưu ý: Hành động này mang tính hủy diệt (Destructive), dữ liệu không thể khôi phục lại.

### 2.2 Purge Candidate Records (Xóa vĩnh viễn hồ sơ ứng viên)
- Xóa vĩnh viễn thông tin của các ứng viên tuyển dụng (từ module Recruitment).
- Thường được sử dụng để dọn dẹp các hồ sơ ứng tuyển đã quá cũ hoặc bị từ chối.

### 2.3 Access Employee Data
- Cho phép xuất file JSON chứa toàn bộ thông tin lưu trữ của một nhân viên (phục vụ mục đích trích xuất dữ liệu GDPR - Quyền được biết dữ liệu của mình).

## 3. Actors (Đối tượng sử dụng)
- **Admin**: Chỉ có người dùng có quyền Quản trị tối cao mới được phép truy cập phân hệ này do tính chất rủi ro cao của việc xóa dữ liệu vĩnh viễn.
