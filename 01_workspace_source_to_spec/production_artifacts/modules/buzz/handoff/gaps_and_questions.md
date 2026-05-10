| Gap ID | Related Rule ID | Feature | Description | Impact on Testing | Investigation Status | Action |
|---|---|---|---|---|---|---|
| GAP-BUZ-001 | N/A | Entity Map | Toàn bộ entity map Buzz là inferred — chưa đọc entity files thực tế. | Automation test data có thể sai structure. | Đã điều tra — chưa đọc entity | Cần đọc orangehrmBuzzPlugin/entity/*.php |
| GAP-BUZ-002 | N/A | Permissions | Permissions inferred — chưa verify từ API source. | Security tests có thể sai. | Đã điều tra — chưa đọc API | Cần extract từ BuzzAPI |
| GAP-BUZ-003 | N/A | File upload | Size limit, allowed formats cho photo/video chưa rõ. | Không test được upload attachment. | Đã điều tra — phát hiện gap | Cần extract từ BuzzPhotoAPI |
