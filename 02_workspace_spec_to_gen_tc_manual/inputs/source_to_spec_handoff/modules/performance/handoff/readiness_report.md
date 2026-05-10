# Spec Readiness Report

**Handoff Status**: READY

## Allowed for Testcase Generation
| Rule ID | Allowed Test Levels | Note |
|---|---|---|
| FR-001 -> FR-013 | UT, UI, API | Field rules cho KPI, Review, Tracker |
| BR-001 | UT, API | Cấp quyền Review Supervisor |
| BR-002 | UT, API | Luồng kích hoạt trạng thái Review |
| BR-003 | UT, API | Khóa chức năng sửa cấu hình khi Review đang chạy |
| BR-004 | UT, API, E2E | Workflow logic (State Machine) khi chấm điểm |
| BR-005 | UT, API | Blind Review (bảo mật điểm số tự đánh giá) |
| BR-006 | UT, API | Chuyển đổi trạng thái khi nộp bài hoàn tất |

## Blocked from Testcase Generation
| Rule ID / Gap ID | Reason | Required Clarification |
|---|---|---|
| (Không có) | | Module đã được trích xuất chi tiết và phủ kín tính năng. |

## Risk Notes
| Risk | Impact | Mitigation |
|---|---|---|
| Logic Blind Review | Tự động hóa UI có thể bị nhầm lẫn vì field rating không hiển thị cho Supervisor. | Test Script cần phải Login đúng bằng Employee nộp bài xong mới login bằng Supervisor để kiểm tra. |
