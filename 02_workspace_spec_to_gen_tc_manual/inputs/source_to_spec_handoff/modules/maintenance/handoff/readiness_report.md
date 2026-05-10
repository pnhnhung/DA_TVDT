# Spec Readiness Report

**Handoff Status**: READY

## Allowed for Testcase Generation
| Rule ID | Allowed Test Levels | Note |
|---|---|---|
| FR-001 -> FR-002 | UT, UI, API | Field rules yêu cầu ID hợp lệ |
| BR-001 | UT, API, E2E | Ràng buộc: Chỉ xóa nhân viên đã nghỉ việc. |
| BR-002 | UT, API | Ràng buộc GDPR: Chặn việc xóa hồ sơ ứng viên nếu họ chọn Keep Data (Consent). |

## Blocked from Testcase Generation
| Rule ID / Gap ID | Reason | Required Clarification |
|---|---|---|
| (Không có) | | Module đã trích xuất chi tiết. |

## Risk Notes
| Risk | Impact | Mitigation |
|---|---|---|
| Destructive E2E Testing | Hành động Purge xóa toàn bộ dấu vết của một ứng viên hoặc nhân viên khỏi Database vĩnh viễn. | BẮT BUỘC phải tạo mock data nhân sự (hoặc Ứng viên) rác chuyên dụng cho bài test này. Không chạy lệnh Purge lên nhân sự thật. |
