# Locator Package Summary — Admin Job

| Screen | Total Elements | VERIFIED | CONDITIONAL | NEED_DATA | UNRESOLVED |
|---|---|---|---|---|---|
| Job Titles | 12 | 8 | 4 | 0 | 0 |
| Pay Grades | 16 | 11 | 5 | 0 | 0 |
| Employment Status | 10 | 6 | 4 | 0 | 0 |
| Job Categories | 10 | 6 | 4 | 0 | 0 |
| Work Shifts | 12 | 8 | 4 | 0 | 0 |

## UNRESOLVED Elements (cần user quyết định)
Không có. Tất cả element đều đã có locator ổn định.

## CONDITIONAL Elements (trigger conditions)
- `toast_success`: Chỉ xuất hiện sau khi thao tác Add/Edit/Delete thành công.
- `msg_already_exists`: Xuất hiện dưới textbox Name khi cố tạo trùng tên.
- `msg_required`: Xuất hiện dưới textbox Name khi để trống.
- `msg_invalid`: Xuất hiện dưới field nếu dữ liệu sai định dạng (ví dụ: Work Shift Hours, Pay Grade Min > Max).
- `modal_confirm`: Chỉ bật lên khi bấm icon thùng rác (Delete).
- `btn_confirm_yes`: Nằm trong `modal_confirm`.

## Recommendation cho flow 02
- Proceed: **Yes** (100% Ready)
- Các Page Objects `Page_JobTitle`, `Page_PayGrade`, `Page_EmploymentStatus`, `Page_JobCategory`, `Page_WorkShift` có thể generate ngay.
- Blocked testcases (do UNRESOLVED): 0.
