# Suggested Testcases — Shop Management
> Class: SUGGESTED | Workflow: 09 | Date: 2026-05-02

| TC ID | Title | Lý do SUGGESTED | Rule | Risk |
|---|---|---|---|---|
| IT-SHOP-005 | salesType hiển thị theo enum | salesType enum list chưa confirm chính xác | BR_SHOP_003 | Medium |
| IT-SHOP-006 | salesType null khi `enableEC=0` | validation cross-field cho salesType | BR_SHOP_003 | Medium |
| IT-SHOP-031 | Concurrent batch update | Concurrency — inferred | BR_SHOP_008 | Low |
| IT-SHOP-032 | 2 Admin update cùng 1 Shop | Concurrency | General | Low |

# Blocked Testcases — Shop Management

| Blocked TC ID | Related Rule ID | Missing information | Question | Impact |
|---|---|---|---|---|
| IT-SHOP-020~023 (CSV Import) | BR_SHOP_009 | Template CSV chưa có (headers, format) | File CSV hợp lệ mẫu có header là gì? | **Cao** — Không thể tạo file test data tự động |

# Testcase Generation Gaps — Shop Management

| Gap ID | Testcase | Mô tả | Loại | Đề xuất |
|---|---|---|---|---|
| G-SHOP-01 | IT-SHOP-020~023 | CSV import template pending | Thiếu thông tin | Dev cung cấp CSV template hợp lệ |
| G-SHOP-02 | IT-SHOP-005 | salesType enum values chưa liệt kê hết | Sơ sài | Dev confirm các giá trị hợp lệ của salesType |
