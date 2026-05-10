# Gaps: Buzz

| Gap ID | Feature | Rule ID | Mô tả | Status | Confidence | Investigation Status | Action |
|---|---|---|---|---|---|---|---|
| GAP-BUZ-001 | Entity Map | N/A | Toàn bộ entity map của Buzz là `inferred` — chưa đọc entity files thực tế. Không biết chính xác table structure của BuzzShare, BuzzComment, BuzzLike. | inferred | low | Đã điều tra — chưa đọc entity | Cần đọc orangehrmBuzzPlugin/entity/*.php |
| GAP-BUZ-002 | Permissions | N/A | Toàn bộ permissions.csv là `inferred` — chưa verify từ API source. | inferred | medium | Đã điều tra — chưa đọc API | Cần extract từ BuzzAPI |
| GAP-BUZ-003 | Photo/Video upload | N/A | File upload rules (size limit, allowed formats, max count) cho Buzz photo/video chưa được extract. | gap | medium | Đã điều tra — phát hiện gap | Cần extract từ BuzzPhotoAPI hoặc validator |
