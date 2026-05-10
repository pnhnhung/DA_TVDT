# Spec Readiness Report

**Handoff Status**: READY

## Allowed for Testcase Generation
| Rule ID | Allowed Test Levels | Note |
|---|---|---|
| FR-001 -> FR-010 | UT, UI, API | Field rules cho Posts, Shares, Comments |
| BR-001 | UT, API | Sinh tự động đối tượng Share khi tạo Post |
| BR-002 | UT, API | Chặn đổi loại Type khi update Post |
| BR-003 | UT, API, E2E | Phân quyền sở hữu bài viết (Update/Delete) |
| BR-004 | UT, API | Logic tăng/giảm bộ đếm (Counter) của Comments |
| BR-005 | UT, API, E2E | Phân quyền sở hữu bình luận (Update/Delete) |

## Blocked from Testcase Generation
| Rule ID / Gap ID | Reason | Required Clarification |
|---|---|---|
| (Không có) | | Module đã trích xuất chi tiết. |

## Risk Notes
| Risk | Impact | Mitigation |
|---|---|---|
| Mạng xã hội thời gian thực | Timeline của Buzz thường xuyên thay đổi do có bài post mới của mọi nhân viên. | Các test script Automation nên được cô lập (isolate) trong tài khoản riêng hoặc tag bài viết bằng Timestamp/ID để dễ assertion. |
