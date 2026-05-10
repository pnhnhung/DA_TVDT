# Testcase Coverage Matrix — System Notification
**Workflow**: 08 | **Date**: 2026-05-02

## Summary

| Coverage status | Count |
|---|---:|
| FULL | 4 |
| PARTIAL | 1 |
| NOT_COVERED | 0 |
| BLOCKED_BY_SPEC_GAP | 0 |

## Matrix

| Rule ID | Rule Statement | Test level | Covered Testcase IDs | Coverage status | Missing cases | Recommendation |
|---|---|---|---|---|---|---|
| BR_SYS_001 | Ràng buộc Omise Linked | IT, UI/Mixed | IT-SYS-001, IT-SYS-002, IT-SYS-014, UT-SYS-001, UC-SYS-001 | **FULL** | — | Flag OFF/ON + Omise fail |
| BR_SYS_002 | Filter App Number theo Service | IT, Mixed | IT-SYS-003, IT-SYS-004, IT-SYS-005, UT-SYS-002, UC-SYS-002/005 | **FULL** | — | allFlag + ids + cross-tenant |
| BR_SYS_003 | Ràng buộc scheduledAt | IT, UI | IT-SYS-006, IT-SYS-007, IT-SYS-008, UT-SYS-004, UC-SYS-003 | **FULL** | — | Past/future + cancel flow |
| BR_SYS_004 | Ràng buộc Subdomain theo Role | IT, UI | IT-SYS-009, IT-SYS-010, UT-SYS-003 | **FULL** | — | CLIENT/MASTER subdomain rule |
| BR_SYS_005 | Notification gắn với Shop | IT, Mixed | IT-SYS-011, IT-SYS-012, IT-SYS-013, UT-SYS-005, UC-SYS-004 | **PARTIAL** | Thiếu: update Notification đã publish + Shop filter mechanism xác nhận | Confirm FilterAppNumberService với Dev |

## Critical Gaps

| Rule ID | Gap | Impact | Required action |
|---|---|---|---|
| BR_SYS_005 | FilterAppNumberService filter mechanism chưa fully confirm | Trung bình | Confirm cơ chế filter Customer theo Shop |
| BR_SYS_001 | Partial Omise failure (3/5 success) → Job status? | Thấp | Dev confirm PARTIAL vs FAILED behavior |
