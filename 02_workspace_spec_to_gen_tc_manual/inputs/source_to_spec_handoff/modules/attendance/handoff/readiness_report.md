# Spec Readiness Report: Attendance

**Handoff Status**: READY

## Allowed for Testcase Generation
| Rule ID | Allowed Test Levels | Note |
|---|---|---|
| FR-ATT-001 -> FR-ATT-006 | UT, UI, API | Field validation rules for Punch In/Out |
| BR-ATT-001 | UT, API | Time margin of error validation (180s) |
| BR-ATT-002 -> BR-ATT-004 | UT, API | Overlap protection and sequence logic |
| BR-ATT-005 | UI, API | Edit/Delete permissions via Workflow |

## Blocked from Testcase Generation
| Rule ID / Gap ID | Reason | Required Clarification |
|---|---|---|
| None | | |

## Risk Notes
| Risk | Impact | Mitigation |
|---|---|---|
| Đồng bộ thời gian | Nếu máy chủ và máy khách lệch giờ quá 3 phút, testcase sẽ fail ở bước Punch In/Out (BR-ATT-001). | Đảm bảo môi trường test đồng bộ NTP hoặc cấu hình `canUserChangeCurrentTime` là true để test manual/auto dễ hơn. |
| Timezone Complexity | Logic Attendance sử dụng cả UTC và Local User Time. | Cần kiểm tra kỹ timezone của user trong test data. |
