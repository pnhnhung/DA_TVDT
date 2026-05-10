# Spec Readiness Report

**Handoff Status**: READY

## Allowed for Testcase Generation
| Rule ID | Allowed Test Levels | Note |
|---|---|---|
| FR-001 -> FR-008 | UT, UI, API | Field rules cho Claim Request và Claim Expense |
| BR-001 | UT, API | Xác thực Active Event |
| BR-002 | UT, API | Chặn nộp Claim cho nhân viên đã nghỉ việc |
| BR-003 | UT, API | Tự động sinh Reference ID và gán trạng thái khởi tạo |
| BR-004 | UT, API | Xác thực Expense Type |
| BR-005 | UT, API, E2E | Workflow Workflow khóa các thao tác sửa chi phí nếu Claim đã được nộp |

## Blocked from Testcase Generation
| Rule ID / Gap ID | Reason | Required Clarification |
|---|---|---|
| (Không có) | | Module đã được trích xuất chi tiết. |

## Risk Notes
| Risk | Impact | Mitigation |
|---|---|---|
| Dữ liệu phụ thuộc PIM | Lỗi cấm nộp Claim nếu bị Terminated yêu cầu phải cấu hình Employee Termination bên PIM trước. | Test Automation cần tạo kịch bản: Chấm dứt hợp đồng -> Cố gắng nộp Claim -> Phải nhận lỗi. |
