| Rule ID | Type | Rule Statement | Status | Confidence | Evidence | Note |
|---|---|---|---|---|---|---|
| FR-001 | field | Post `type`: TEXT, PHOTO, VIDEO, required | confirmed | high | `Api/BuzzPostAPI.php` | |
| FR-002 | field | Post `text`: required if type=TEXT | confirmed | high | `Api/BuzzPostAPI.php` | |
| FR-004 | field | Share `text`: max 50000 | confirmed | high | `Api/BuzzShareAPI.php` | |
| FR-005 | field | Comment `text`: max 50000 | confirmed | high | `Api/BuzzCommentAPI.php` | |
| BR-001 | business | **Auto-Share Creation**: Tạo Post luôn đi kèm tự động sinh BuzzShare. | confirmed | high | `Api/BuzzPostAPI.php#create:174` | |
| BR-002 | business | **Post Type Immutability**: Không đổi qua lại giữa VIDEO và TEXT/PHOTO khi Update bài đăng. | confirmed | high | `Api/BuzzPostAPI.php#update:577` | |
| BR-003 | business | **Share Ownership Control**: Chỉ chính chủ được Update, chính chủ hoặc Admin được Delete. | confirmed | high | `Api/BuzzShareAPI.php#delete:188` | |
| BR-004 | business | **Comment Counters Management**: Tăng/giảm số lượng comment trêm BuzzShare khi tạo/xóa bình luận. | confirmed | high | `Api/BuzzCommentAPI.php#create:296` | |
| BR-005 | business | **Comment Modification Authority**: Chỉ chủ nhân bình luận mới được Update; chủ nhân hoặc Admin được Delete. | confirmed | high | `Api/BuzzCommentAPI.php#delete:464` | |
