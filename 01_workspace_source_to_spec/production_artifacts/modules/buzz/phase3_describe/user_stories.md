# User Stories: Buzz Module

## Topic: Content Creation (Post & Share)

### US-001: Đăng trạng thái (Post)
**Là một** Nhân viên (Employee)
**Tôi muốn** đăng một bài viết lên dòng thời gian (Buzz Feed) của công ty
**Để** chia sẻ hình ảnh, link video, hoặc suy nghĩ của tôi với các đồng nghiệp.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Hệ thống hỗ trợ 3 loại bài đăng (type): `text`, `photo`, `video`.
- Đối với `photo`, tôi có thể đăng tải từ 1 đến tối đa 5 bức ảnh.
- Đối với `video`, tôi phải nhập vào đường link URL hợp lệ (ví dụ youtube/vimeo).
- Bài viết không được vượt quá 65530 ký tự.

### US-002: Chỉnh sửa bài đăng
**Là một** Nhân viên
**Tôi muốn** sửa chữa bài đăng của mình sau khi đã xuất bản
**Để** cập nhật thông tin mới hoặc sửa lỗi đánh máy.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Tôi CHỈ có thể sửa bài đăng do chính tài khoản của tôi tạo ra. Nếu tôi thử lấy ID bài của người khác để gọi API sửa, tôi sẽ nhận lỗi Forbidden.
- Nếu bài đăng ban đầu là Video, tôi không thể đổi loại sang Ảnh hoặc Chữ bình thường.
- Đối với bài Ảnh, tôi có thể xóa các ảnh cũ (tối đa 5) và upload thêm ảnh mới, nhưng tổng số lượng ảnh lưu giữ không được vượt quá 5.

### US-003: Chia sẻ bài (Share)
**Là một** Nhân viên
**Tôi muốn** ấn nút Share bài viết của một đồng nghiệp khác
**Để** lan tỏa bài viết đó lên đầu bảng tin, kèm theo bình luận riêng của tôi.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Bắt buộc phải có `shareId` trỏ đến bài gốc.
- Bài chia sẻ của tôi cũng nằm chung trên Feed, nhưng được hệ thống đánh dấu là `TYPE_SHARE`.

## Topic: Interactions (Comment & Delete)

### US-004: Tương tác qua Bình luận (Comment)
**Là một** Nhân viên
**Tôi muốn** viết bình luận vào dưới các bài Share
**Để** trò chuyện và trao đổi thông tin.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Bình luận phải liên kết với một ID bài đăng hợp lệ (`shareId`).
- Sau khi bình luận thành công, chỉ số lượt bình luận trên bài đăng tự động nhảy số (+1).

### US-005: Quyền quản trị nội dung (Moderation)
**Là một** Quản trị viên (Admin)
**Tôi muốn** có quyền xóa các bài đăng hoặc bình luận của nhân viên khác
**Để** gỡ bỏ các nội dung phản cảm, vi phạm văn hóa công ty.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Nếu tôi gọi API XÓA (Delete Post / Delete Comment) đối với nội dung không phải của tôi, nhưng tài khoản tôi là Admin, hệ thống vẫn cấp quyền cho phép xóa thành công.
- Lưu ý: Tôi chỉ được quyền Xóa, hệ thống vẫn cấm tôi Sửa chữ của nhân viên.
