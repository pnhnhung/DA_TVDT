# Spec Readiness Report

**Handoff Status**: PARTIAL_READY

## Allowed for Testcase Generation
| Rule ID | Allowed Test Levels | Note |
|---|---|---|
| FR-001 | UT, UI, API | Field rule cấu hình Dashboard |
| BR-001 | UT, API | Hiển thị cảnh báo "My Actions" phụ thuộc vào việc cấu hình Module ON/OFF. |
| BR-002 | UT, API | Data Scope tính toán Actions dựa trên chức vụ nhân sự. |
| BR-003 | UT, API | Cấu hình cho phép lọc hiển thị người nghỉ phép. |

## Blocked from Testcase Generation
| Rule ID / Gap ID | Reason | Required Clarification |
|---|---|---|
| GAP-DASH-001 | Thiếu rule biểu đồ | Cần bổ sung rule tính toán cho Subunit & Location Chart. |
| GAP-DASH-002 | Thiếu rule chấm công | Cần bổ sung rule liên kết cho Time at Work. |
| GAP-DASH-003 | Thiếu rule hiển thị | Cần bổ sung rule cho widget Employees on Leave. |

## Risk Notes
| Risk | Impact | Mitigation |
|---|---|---|
| Kiểm tra các biểu đồ thống kê | Automation Framework (Playwright/Selenium) rất khó xác minh (assert) độ chính xác của biểu đồ vẽ bằng Canvas. | Team QA nên ưu tiên test qua API Response thay vì cố gắng phân tích UI DOM của biểu đồ. |
