# Testcase Coverage Matrix — Marketing & Promotions
**Workflow**: 08 | **Date**: 2026-05-02

## Summary

| Coverage status | Count |
|---|---:|
| FULL | 3 |
| PARTIAL | 2 |
| NOT_COVERED | 0 |
| BLOCKED_BY_SPEC_GAP | 1 |

## Matrix

| Rule ID | Rule Statement | Test level | Covered Testcase IDs | Coverage status | Missing cases | Recommendation |
|---|---|---|---|---|---|---|
| BR_MKT_001 | Kiểm tra cờ `enableCouponSetting` | IT, UI | IT-MKT-001, IT-MKT-002, IT-MKT-003, UT-MKT-001, UC-MKT-001 | **FULL** | — | Toggle ON/OFF → 403/menu ẩn |
| BR_MKT_002 | Hạn chế limitUsage / remainingUsage | IT, Mixed | IT-MKT-004, IT-MKT-005, IT-MKT-006, IT-MKT-013, UT-MKT-003/004, UC-MKT-002 | **PARTIAL** | Thiếu: update limitUsage < usedCount (cần Dev confirm) | Confirm validation rule với Dev |
| BR_MKT_003 | Sử dụng Coupon ở App (`useCoupon`) | IT, Mixed | IT-MKT-004, IT-MKT-014, UC-MKT-002 | **BLOCKED_BY_SPEC_GAP** | Rule Inferred 90% — exact `useCoupon` flow chưa fully confirm | Confirm flow với Dev |
| BR_MKT_004 | Kiểm tra cờ `enableNotificationSetting` | IT, UI | IT-MKT-008, IT-MKT-009, UC-MKT-003 | **FULL** | — | Toggle ON/OFF → full coverage |
| BR_MKT_005 | Đánh dấu đã đọc (`checkingBell`) | IT, Mixed | IT-MKT-010, UT-MKT-005, UC-MKT-004 | **PARTIAL** | Rule Inferred 90% — trigger khi mở hay cuộn? | Confirm trigger mechanism |
| BR_MKT_006 | Template bị giới hạn bởi `enableOmiseLinked` | IT, UI | IT-MKT-011, IT-MKT-012, UT-MKT-002, UC-MKT-005 | **FULL** | — | Full coverage Omise flag |

## Critical Gaps

| Rule ID | Gap | Impact | Required action |
|---|---|---|---|
| BR_MKT_003 | useCoupon flow inferred → không official | Trung bình | Confirm với Dev, chuyển SUGGESTED → OFFICIAL |
| BR_MKT_002 | limitUsage update validation chưa confirm | Trung bình | Dev confirm constraint |
