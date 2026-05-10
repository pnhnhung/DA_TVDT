# Suggested Testcases — Marketing & Promotions
> Class: SUGGESTED | Workflow: 09 | Date: 2026-05-02

| TC ID | Title | Lý do SUGGESTED | Rule | Risk |
|---|---|---|---|---|
| IT-MKT-004 | Dùng Coupon ở App → CMS ghi nhận count | Flow `useCoupon` đang inferred | BR_MKT_003 | High |
| IT-MKT-014 | Dùng Coupon quá limit → App từ chối | `useCoupon` inferred | BR_MKT_003 | High |
| IT-MKT-013 | Cập nhật `limitUsage` < số đã dùng → CMS reject | Constraint update limit inferred | BR_MKT_002 | Medium |
| IT-MKT-010 | Đánh dấu đọc (`checkingBell`) | Trigger đọc là click hay cuộn? (inferred) | BR_MKT_005 | Medium |

# Blocked Testcases — Marketing & Promotions

> (Không có testcase nào bị block hoàn toàn)

# Testcase Generation Gaps — Marketing & Promotions

| Gap ID | Testcase | Mô tả | Loại | Đề xuất |
|---|---|---|---|---|
| G-MKT-01 | IT-MKT-004/014 | `useCoupon` flow chưa confirm details | Inferred | Dev xác nhận flow dùng coupon tại App (quét QR hay bấm nút) |
| G-MKT-02 | IT-MKT-013 | Update limit validation | Inferred | Dev confirm xem có block update limitUsage nhỏ hơn usedCount không |
| G-MKT-03 | IT-MKT-010 | `checkingBell` trigger mechanism | Inferred | Confirm trigger: mở màn hình, click item, hay scroll? |
