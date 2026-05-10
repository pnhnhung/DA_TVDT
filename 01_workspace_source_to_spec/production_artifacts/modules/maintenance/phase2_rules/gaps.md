# Gaps: Maintenance

| Gap ID | Feature | Rule ID | Mô tả | Status | Confidence | Investigation Status | Action |
|---|---|---|---|---|---|---|---|
| GAP-MNT-001 | Access Log retention policy | N/A | Chưa có spec về việc Admin xóa Access Logs — filter theo khoảng thời gian, điều kiện gì? | gap | medium | Đã điều tra — phát hiện chưa phân tích API | Cần verify từ AccessLogAPI |
| GAP-MNT-002 | Purge confirmation workflow | N/A | UX/API flow xác nhận trước khi purge (có preview list không?) chưa được phân tích. | inferred | low | Đã điều tra — phát hiện gap | Cần verify từ PurgeEmployeeAPI |
