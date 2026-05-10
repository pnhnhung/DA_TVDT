# Entity Map: Buzz

## Entity: BuzzPost (inferred)

**DB Table**: (inferred — chưa đọc đầy đủ entity)
**Source**: `orangehrmBuzzPlugin/entity/` (inferred)
**Note**: BazzPost chứa nội dung bài đăng — text, ảnh, video

---

## Entity: BuzzShare (inferred)

**DB Table**: (inferred)
**Note**: Share của bài đăng — liên kết BuzzPost với Employee (author) và các trường type (photo, video, text)

---

## Entity: BuzzComment (inferred)

**DB Table**: (inferred)
**Note**: Comment trên bài đăng

---

## Entity: BuzzLike (inferred)

**DB Table**: (inferred)
**Note**: Likes trên Post hoặc Comment

---

> **Ghi chú quan trọng**: Toàn bộ entity map này là `inferred` — chưa được đọc từ source. Phải read entity files thực tế từ orangehrmBuzzPlugin/entity/ trước khi sử dụng cho test automation.
>
> **Action**: Cần đọc `orangehrmBuzzPlugin/entity/*.php` để confirm.
