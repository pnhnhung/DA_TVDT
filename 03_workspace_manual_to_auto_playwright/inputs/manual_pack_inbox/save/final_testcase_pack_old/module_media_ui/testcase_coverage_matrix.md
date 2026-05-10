# Testcase Coverage Matrix — Media & UI
**Workflow**: 08 | **Date**: 2026-05-02

## Summary

| Coverage status | Count |
|---|---:|
| FULL | 3 |
| PARTIAL | 2 |
| NOT_COVERED | 0 |
| BLOCKED_BY_SPEC_GAP | 0 |

## Matrix

| Rule ID | Rule Statement | Test level | Covered Testcase IDs | Coverage status | Missing cases | Recommendation |
|---|---|---|---|---|---|---|
| BR_MED_001 | Gallery Category Validation | IT, UI | IT-MED-001, IT-MED-004, UC-MED-001 | **FULL** | — | Valid category + isolation |
| BR_MED_002 | Ràng buộc File Upload | IT, UI | IT-MED-001, IT-MED-002, IT-MED-003, UT-MED-001~003 | **PARTIAL** | Exact size limit + mimes list chưa confirm → test data placeholder | Confirm limit + mimes với Dev |
| BR_MED_003 | Đối tượng được phép Favorite | IT, Mixed | IT-MED-008~012, UT-MED-005~007, UC-MED-003 | **FULL** | — | Like/Unlike Shop/Coupon/Gallery + invalid type |
| BR_MED_004 | Ràng buộc Shop ID khi Favorite | IT, Mixed | IT-MED-011, IT-MED-013, UC-MED-004 | **PARTIAL** | Thiếu: cascade khi Shop bị xóa → soft/hard delete confirmation | Confirm delete behavior với Dev |
| BR_MED_005 | Liên kết TopItem và TopCategory | IT, Mixed | IT-MED-005, IT-MED-006, IT-MED-007, UT-MED-004, UC-MED-002/005 | **FULL** | — | Valid/invalid + cascade |

## Critical Gaps

| Rule ID | Gap | Impact | Required action |
|---|---|---|---|
| BR_MED_002 | Size limit + mimes format chưa confirm | Trung bình | Dev confirm trước IT-MED-002/003 |
| BR_MED_004 | Soft/hard delete Favorite khi Shop xóa | Thấp | Confirm behavior với Dev |
