# Feature Descriptions: Buzz Module

## 1. Quản lý Bài Đăng (Post & Share)

### 1.1 Khởi tạo Bài viết (Buzz Post)
Nhân viên tự tạo nội dung mới trên bảng tin.
- **Đa phương tiện**: Bài viết phải chọn 1 trong 3 loại: `text`, `photo`, hoặc `video`.
- **Ràng buộc định dạng**: Nếu là `video`, hệ thống kiểm tra tính hợp lệ của đường dẫn URL (qua `BuzzVideoLinkValidationRule`). Nếu là `photo`, không được quá 5 ảnh.
- **Tính kế thừa (Share Wrapper)**: Về mặt logic backend, mọi `BuzzPost` khi tạo ra đều được bọc ngầm bên trong một `BuzzShare` (type=POST). Do đó, Timeline thực chất là danh sách các `BuzzShare`.

### 1.2 Chia sẻ bài viết (Buzz Share)
Chức năng cho phép nhân viên A "Share" lại bài viết của nhân viên B.
- **Tham chiếu**: Bản share mới lưu lại ID của bản share cũ (`shareId`), kèm theo lời dẫn (Text) của người chia sẻ.

### 1.3 Khóa định dạng (Immutability)
Khi người dùng ấn nút "Sửa bài viết", hệ thống cấm việc đổi loại bài. (Ví dụ: Từ Video không thể đổi thành bài viết chữ hoặc ảnh, và ngược lại).

---

## 2. Quản lý Tương tác (Like & Comment)

### 2.1 Bình luận (Comment)
Cho phép trò chuyện bên dưới bài đăng.
- **Bộ đếm (Counters)**: Tự động cộng/trừ số lượng (`numOfComments`) trên bảng `BuzzShare` mỗi khi thêm hoặc xóa bình luận, giúp giao diện Feed không phải load lại toàn bộ bảng Comment để đếm.

### 2.2 Like (Thích)
Thích bài viết hoặc bình luận. (Chi tiết trong LikeAPI, nhưng logic chung là ghi nhận mapping giữa EmpNumber và ShareId/CommentId).

---

## 3. Phân quyền (Security)
- Kiểm tra quyền sở hữu nội dung gắt gao: `canUpdateBuzzFeedPost` và `canDeleteBuzzFeedPost`. Admin sở hữu cờ bypass đối với quyền Xóa, nhưng không có quyền Sửa.
