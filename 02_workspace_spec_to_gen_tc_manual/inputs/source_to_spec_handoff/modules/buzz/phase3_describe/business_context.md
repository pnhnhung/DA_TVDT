# Business Context: Buzz Module

## 1. Mục Đích & Vai Trò
Phân hệ **Buzz** được xây dựng như một không gian mạng xã hội thu nhỏ dành cho tổ chức (Internal Social Network). Nó cung cấp "Bảng tin" (Feed) giúp nhân viên cập nhật thông tin công ty, chia sẻ kiến thức, hình ảnh cá nhân, và tương tác với đồng nghiệp thông qua việc thích (Like), bình luận (Comment), hoặc chia sẻ lại (Share).

## 2. Quy trình Nghiệp vụ Cốt lõi (Core Workflows)

### 2.1 Bảng tin & Đăng bài (Feed & Posting)
- **Buzz Feed**: Hệ thống tự động tổng hợp các bài đăng (Post) và lượt chia sẻ (Share) của toàn bộ nhân viên, sắp xếp thành một Timeline (bảng tin).
- **Phân loại bài đăng**: 
  - Đăng chữ (Text).
  - Đăng ảnh (Photo): Tối đa 5 ảnh trên một bài đăng.
  - Đăng video (Video): Hỗ trợ nhúng link video từ các nền tảng bên ngoài.

### 2.2 Cơ chế Tương tác (Interactions)
- **Like / Comment**: Bất kỳ người nào trong công ty cũng có thể thả Like hoặc viết bình luận vào bài Share của người khác. Mỗi lần có thêm Comment, hệ thống sẽ tự động tăng bộ đếm số lượng bình luận trên bài đăng gốc.
- **Share**: Nhân viên có thể "Share" bài viết của một đồng nghiệp khác. Lúc này, trên Timeline sẽ hiện một bản sao bài viết kèm theo trích dẫn (Quote) của người chia sẻ.

## 3. Quản trị Nội dung (Content Moderation)
Vì là một mạng xã hội nội bộ, quyền lực kiểm soát nội dung được quy định rõ:
- **Nhân viên (Employee)**: Chỉ được phép sửa nội dung hoặc xóa các bài đăng/bình luận **do chính mình tạo ra**.
- **Quản trị viên (Admin)**: Mặc dù không được phép sửa chữ trong bài của người khác, Admin có quyền XÓA (Delete) bất cứ bài đăng hoặc bình luận nào nếu thấy nội dung vi phạm tiêu chuẩn của công ty.
