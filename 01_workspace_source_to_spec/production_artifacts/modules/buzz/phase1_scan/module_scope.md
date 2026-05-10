# Module Scope: Buzz

## 1. Giới thiệu
Phân hệ **Buzz** là một mạng xã hội nội bộ (Internal Social Network) dành riêng cho nhân viên công ty. Nó đóng vai trò như một bảng tin công ty, nơi nhân viên có thể chia sẻ thông tin, hình ảnh, đường link, đồng thời tương tác với nhau qua các hành động bình luận (Comment) và thích (Like).

## 2. Các nhóm chức năng chính (Feature Groups)

### 2.1. Feed & Anniversaries (Bảng tin & Kỷ niệm)
- **News Feed**: Cung cấp API hiển thị danh sách các bài đăng (Post/Share) sắp xếp theo thời gian hoặc độ tương tác, đóng vai trò như timeline trung tâm của Buzz.
- **Anniversaries**: Nhắc nhở và hiển thị thông báo tự động về sinh nhật, kỷ niệm ngày vào làm (Work Anniversary) của nhân viên.

### 2.2. Posts & Shares (Đăng bài & Chia sẻ)
- **Posts**: Khởi tạo một bài viết gốc. Có thể đính kèm văn bản, hình ảnh, hoặc video link.
- **Shares**: Khi một Post được tạo ra, hệ thống tự động sinh một bản Share. Nếu nhân viên chia sẻ lại bài của người khác, một bản Share mới cũng được tạo ra trỏ về Post gốc.

### 2.3. Comments & Likes (Tương tác)
- **Comments**: Người dùng có thể bình luận vào một bài Share.
- **Likes**: Có thể Like/Unlike một bài Share hoặc một Comment cụ thể.

## 3. Actors (Đối tượng sử dụng)
- **Employee**: Bất kỳ nhân viên nào có tài khoản hệ thống (không bị Terminated) đều có thể truy cập Buzz để đăng bài và tương tác.
- **Admin**: Có quyền quản trị nội dung (VD: Xóa bình luận xấu hoặc bài đăng không phù hợp).
