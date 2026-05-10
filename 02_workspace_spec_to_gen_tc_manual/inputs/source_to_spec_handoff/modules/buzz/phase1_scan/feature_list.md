# Feature List: Buzz

| Feature ID | Nhóm chức năng | Tên API/Endpoint | Method | Route | Controller/API File | Note | Status |
|---|---|---|---|---|---|---|---|
| BUZZ-001 | Feed | Bảng tin (Feed) | GET | `/api/v2/buzz/feed` | `Api/BuzzFeedAPI.php` | Lấy danh sách timeline | inferred |
| BUZZ-002 | Feed | Sự kiện kỷ niệm | GET | `/api/v2/buzz/anniversaries` | `Api/EmployeeAnniversaryAPI.php`| Sinh nhật, Work Anniversary | inferred |
| BUZZ-003 | Post | Quản lý Bài đăng gốc| GET, POST, PUT | `/api/v2/buzz/posts` | `Api/BuzzPostAPI.php` | Đăng bài viết gốc | inferred |
| BUZZ-004 | Post | Chia sẻ Bài viết | GET, POST, PUT, DELETE | `/api/v2/buzz/shares` | `Api/BuzzShareAPI.php` | Share lại bài viết, xóa share | inferred |
| BUZZ-005 | Comment| Bình luận | GET, POST, PUT, DELETE | `/api/v2/buzz/shares/{shareId}/comments`| `Api/BuzzCommentAPI.php` | CRUD comment trên bài | inferred |
| BUZZ-006 | Like | Thích bài viết | GET, POST, DELETE | `/api/v2/buzz/shares/{shareId}/likes`| `Api/BuzzLikeOnShareAPI.php`| Thích / Bỏ thích Share | inferred |
| BUZZ-007 | Like | Thích bình luận | GET, POST, DELETE | `/api/v2/buzz/comments/{commentId}/likes` | `Api/BuzzLikeOnCommentAPI.php`| Thích / Bỏ thích Comment | inferred |
| BUZZ-008 | Validation| Validate Video | GET | `/api/v2/buzz/validation/links` | `Api/BuzzVideoURLValidationAPI.php`| Kiểm tra link youtube/vimeo | inferred |
