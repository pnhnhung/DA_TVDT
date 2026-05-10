# Blocked Testcases — System Settings
> Workflow: 09 | Date: 2026-05-02

| Blocked TC ID | Related Rule ID | Missing information | Question | Impact |
|---|---|---|---|---|
| IT-SET-018 | BR_SET_001 | Encoding của CSV xuất ra | File xuất ra là UTF-8 hay Shift-JIS? | Trung bình — Tạm thời chỉ check HTTP 200, chưa parse nội dung text |

# Testcase Generation Gaps — System Settings

| Gap ID | Testcase | Mô tả | Loại | Đề xuất |
|---|---|---|---|---|
| G-SET-01 | IT-SET-018 | Encoding format pending | Thiếu thông tin | Confirm encoding (UTF-8 BOM / Shift-JIS) để build parser test |
