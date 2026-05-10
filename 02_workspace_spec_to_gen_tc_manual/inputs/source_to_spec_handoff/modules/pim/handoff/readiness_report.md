# Spec Readiness Report

**Handoff Status**: PARTIAL_READY

## Summary
- Phần lõi Create/Delete Employee đã sẵn sàng.
- Còn một số rule bị suy diễn/thiếu cần hỏi lại BA/PO.

## Allowed for Testcase Generation
| Rule ID | Allowed Test Levels | Note |
|---|---|---|
| FR-001 đến FR-005 | API, UI | Đủ rules validation để sinh negative cases |
| BR-001 | API, UI | |
| BR-002 | API, UI | Trừ case xóa `admin` |
| PR-001 | API, UI | |

## Blocked from Testcase Generation
| Rule ID / Gap ID | Reason | Required Clarification |
|---|---|---|
| GAP-001 | Conflict/Unclear | Cần làm rõ data của user admin để tránh fail test case |
| GAP-002 | Missing source | Cần xác định UI/API cho việc Reactivate nhân viên nghỉ việc |

## Risk Notes
| Risk | Impact | Mitigation |
|---|---|---|
| Xóa nhầm admin | Fail test suite | Tester hardcode loại trừ ID 1 (admin) khỏi test data. |
