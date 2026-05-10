# Business Rules: Buzz Module

## Feature: Post & Share Management

### BR-001: Auto-Share Creation on Post
- **Actor**: Employee
- **Trigger**: Khởi tạo (Create) một Buzz Post.
- **Precondition**: Post hợp lệ.
- **Expected Behavior**: Hệ thống luôn tự động sinh ra một đối tượng `BuzzShare` kiểu `TYPE_POST` bọc bên ngoài `BuzzPost` đó để quản lý timeline.
- **Source**: `Api/BuzzPostAPI.php#create:174[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-002: Post Type Immutability
- **Actor**: Employee
- **Trigger**: Cập nhật (Update) Buzz Post.
- **Precondition**: Post đang tồn tại.
- **Expected Behavior**: Nếu Post ban đầu là `VIDEO`, không thể đổi type sang `TEXT` hoặc `PHOTO`. Nếu Post ban đầu là `TEXT/PHOTO`, không thể đổi sang `VIDEO`. (Chỉ cho phép chuyển đổi giữa TEXT và PHOTO).
- **Source**: `Api/BuzzPostAPI.php#update:577[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-003: Share Ownership Control
- **Actor**: Employee
- **Trigger**: Update hoặc Delete một Share / Post.
- **Precondition**: Employee đang đăng nhập.
- **Expected Behavior**: Nếu gọi Update, chỉ chủ nhân bài viết (người tạo ra nó) mới có quyền `canUpdateBuzzFeedPost` (trả về true). Nếu gọi Delete, chỉ chủ nhân hoặc Admin mới có quyền `canDeleteBuzzFeedPost`. Nếu sai, ném `ForbiddenException`.
- **Source**: `Api/BuzzShareAPI.php#delete:188[controller]`
- **Status**: confirmed
- **Confidence**: high

## Feature: Comment Management

### BR-004: Comment Counters Management
- **Actor**: Employee / Admin
- **Trigger**: Create hoặc Delete một Comment.
- **Precondition**: Comment hợp lệ, Share tồn tại.
- **Expected Behavior**: Khi tạo Comment thành công, bộ đếm `numOfComments` trên Share tương ứng được cộng thêm 1 (`increaseNumOfCommentsByOne()`). Khi xóa Comment, bộ đếm bị trừ đi 1 (`decreaseNumOfCommentsByOne()`).
- **Source**: `Api/BuzzCommentAPI.php#create:296[controller]`
- **Status**: confirmed
- **Confidence**: high

### BR-005: Comment Modification Authority
- **Actor**: Employee / Admin
- **Trigger**: Sửa (Update) hoặc Xóa (Delete) Comment.
- **Precondition**: Comment đang tồn tại.
- **Expected Behavior**: Chỉ chủ nhân của bình luận mới được sửa nội dung (check `canUpdateBuzzComment()`). Với hành động Xóa, chủ nhân của bình luận HOẶC Admin đều được phép (check `canDeleteBuzzComment()`).
- **Source**: `Api/BuzzCommentAPI.php#delete:464[controller]`
- **Status**: confirmed
- **Confidence**: high
