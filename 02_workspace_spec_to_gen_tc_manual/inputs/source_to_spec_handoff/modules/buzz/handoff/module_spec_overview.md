# Module Spec: Buzz

## Phạm Vi & Mục Đích
Phân hệ **Buzz** là nền tảng mạng xã hội nội bộ (Internal Social Network) của OrangeHRM. Nó cho phép nhân viên chia sẻ thông tin, cập nhật trạng thái (Posts), ảnh, video, và tương tác với nhau thông qua bình luận (Comments) và lượt thích (Likes). Mục đích là tăng cường giao tiếp và sự gắn kết trong công ty.

## Actors & Roles
| Role | Quyền chính |
|---|---|
| Employee | Tham gia như một User thông thường: Đăng bài, bình luận, và xóa/sửa các bài viết của chính mình. |
| Admin | Ngoài quyền của Employee, Admin còn đóng vai trò điều hành: có quyền xóa (Delete) bất kỳ bài đăng (Share) hay bình luận (Comment) nào của người khác nếu thấy không phù hợp. |

## Features Chính
| Feature | Mô tả | Source |
|---|---|---|
| Post Management | Tạo các bài đăng dạng chữ, ảnh, hoặc video. | `Api/BuzzPostAPI.php` |
| Share/Timeline Management | Quản lý các bài viết trên dòng thời gian chung. | `Api/BuzzShareAPI.php` |
| Comment Management | Bình luận vào các bài Share. | `Api/BuzzCommentAPI.php` |

## Field Rules Quan Trọng
- **Post**: Thuộc tính `type` bắt buộc (TEXT, PHOTO, VIDEO).
- **Share/Comment**: Độ dài ký tự tối đa của một nội dung (text) là 50,000 ký tự.

## Business Rules Quan Trọng
- **Data Encapsulation**: Mỗi khi một người dùng tạo một bài `BuzzPost`, hệ thống luôn tự động bọc bài đăng đó bên trong một đối tượng `BuzzShare`.
- **Ownership Control**: Mọi thao tác cập nhật (Update) nội dung bài viết và bình luận chỉ được thực hiện bởi chính chủ (người tạo ra).
- **Moderation**: Thao tác xóa (Delete) được mở rộng cho quản trị viên (Admin) để phục vụ việc kiểm duyệt nội dung.
- **State Consistency**: Hệ thống duy trì các bộ đếm tự động (counter) cho `numOfComments` (và Likes) trên đối tượng Share mỗi khi có bình luận mới hoặc bình luận bị xóa.

## Cross-Module Dependencies
| Module | Relationship | Contract Status |
|---|---|---|
| Admin / PIM | Định danh người đăng bài và kiểm tra quyền Admin lấy trực tiếp từ PIM và thiết lập Role bên Admin. | READY |

## Gaps & Questions
Hiện tại Phase 2 extraction cho module Buzz đã hoàn chỉnh và đặc tả rõ nét các rule liên quan đến Mạng xã hội.
Không có Gap nào. Sẵn sàng cho Handoff.
