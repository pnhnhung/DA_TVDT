# Locator Package — Admin Job
module:       job
collected_at: 2026-05-05T17:50:00+07:00

## 1. Screen: Job Titles
URL: /web/index.php/admin/viewJobTitleList
Page Object: `pages/Page_JobTitle.py`

| Element ID         | Action | Status | Trigger |
|---|---|---|---|
| btn_add            | click  | VERIFIED | |
| textbox_job_title  | fill   | VERIFIED | |
| textbox_job_description | fill | VERIFIED | |
| btn_save           | click  | VERIFIED | |
| toast_success      | assert | CONDITIONAL | After successful save/delete |
| msg_already_exists | assert | CONDITIONAL | Invalid input duplicate |
| msg_required       | assert | CONDITIONAL | Invalid empty input |
| row_record         | filter | VERIFIED | |
| icon_edit          | click  | VERIFIED | |
| icon_delete        | click  | VERIFIED | |
| modal_confirm      | assert | CONDITIONAL | After clicking delete |
| btn_confirm_yes    | click  | CONDITIONAL | Inside modal |

### Python Init Code (copy vào __init__ của Page_JobTitle.py)
```python
self.btn_add            = page.get_by_role("button", name="Add")
self.textbox_job_title  = page.locator("label").filter(has_text="Job Title").locator("..").locator("..").locator("input")
self.textbox_job_description = page.locator("label").filter(has_text="Job Description").locator("..").locator("..").locator("textarea")
self.btn_save           = page.locator("button[type='submit']")
self.toast_success      = page.locator(".oxd-toast-content--success")
self.msg_already_exists = page.get_by_text("Already exists")
self.msg_required       = page.get_by_text("Required")
self.row_record         = page.locator(".oxd-table-row")
self.icon_edit          = page.locator("i.bi-pencil")
self.icon_delete        = page.locator("i.bi-trash")
self.modal_confirm      = page.locator(".oxd-dialog-container")
self.btn_confirm_yes    = page.get_by_role("button", name="Yes, Delete")
```

## 2. Screen: Pay Grades
URL: /web/index.php/admin/viewPayGrades
Page Object: `pages/Page_PayGrade.py`

| Element ID         | Action | Status | Trigger |
|---|---|---|---|
| btn_add            | click  | VERIFIED | |
| textbox_name       | fill   | VERIFIED | |
| btn_save           | click  | VERIFIED | |
| btn_add_currency   | click  | VERIFIED | Inside Currencies section |
| select_currency    | select | VERIFIED | Inside Currencies section |
| textbox_min_salary | fill   | VERIFIED | Inside Currencies section |
| textbox_max_salary | fill   | VERIFIED | Inside Currencies section |
| btn_save_currency  | click  | VERIFIED | Inside Currencies section |
| row_currency       | filter | VERIFIED | Grid currency |
| icon_delete_currency| click  | VERIFIED | Grid currency |

### Python Init Code (copy vào __init__ của Page_PayGrade.py)
```python
self.btn_add            = page.get_by_role("button", name="Add").first
self.textbox_name       = page.locator("label").filter(has_text="Name").locator("..").locator("..").locator("input")
self.btn_save           = page.locator("button[type='submit']").first
self.btn_add_currency   = page.locator("h6").filter(has_text="Currencies").locator("..").locator("..").get_by_role("button", name="Add")
self.select_currency    = page.locator(".oxd-select-text-input")
self.textbox_min_salary = page.locator("label").filter(has_text="Minimum Salary").locator("..").locator("..").locator("input")
self.textbox_max_salary = page.locator("label").filter(has_text="Maximum Salary").locator("..").locator("..").locator("input")
self.btn_save_currency  = page.locator("button[type='submit']").nth(1)
self.row_currency       = page.locator(".oxd-table-row")
self.icon_delete_currency= page.locator("i.bi-trash")
self.toast_success      = page.locator(".oxd-toast-content--success")
self.msg_already_exists = page.get_by_text("Already exists")
self.msg_invalid        = page.get_by_text("Should be higher than Minimum Salary")
self.row_record         = page.locator(".oxd-table-row")
self.icon_edit          = page.locator("i.bi-pencil")
self.icon_delete        = page.locator("i.bi-trash")
self.modal_confirm      = page.locator(".oxd-dialog-container")
self.btn_confirm_yes    = page.get_by_role("button", name="Yes, Delete")
```

## 3. Screen: Employment Status
URL: /web/index.php/admin/employmentStatus
Page Object: `pages/Page_EmploymentStatus.py`

### Python Init Code (copy vào __init__ của Page_EmploymentStatus.py)
```python
self.btn_add            = page.get_by_role("button", name="Add")
self.textbox_name       = page.locator("label").filter(has_text="Name").locator("..").locator("..").locator("input")
self.btn_save           = page.locator("button[type='submit']")
self.toast_success      = page.locator(".oxd-toast-content--success")
self.msg_already_exists = page.get_by_text("Already exists")
self.row_record         = page.locator(".oxd-table-row")
self.icon_edit          = page.locator("i.bi-pencil")
self.icon_delete        = page.locator("i.bi-trash")
self.modal_confirm      = page.locator(".oxd-dialog-container")
self.btn_confirm_yes    = page.get_by_role("button", name="Yes, Delete")
```

## 4. Screen: Job Categories
URL: /web/index.php/admin/jobCategory
Page Object: `pages/Page_JobCategory.py`

### Python Init Code (copy vào __init__ của Page_JobCategory.py)
```python
self.btn_add            = page.get_by_role("button", name="Add")
self.textbox_name       = page.locator("label").filter(has_text="Name").locator("..").locator("..").locator("input")
self.btn_save           = page.locator("button[type='submit']")
self.toast_success      = page.locator(".oxd-toast-content--success")
self.msg_already_exists = page.get_by_text("Already exists")
self.row_record         = page.locator(".oxd-table-row")
self.icon_edit          = page.locator("i.bi-pencil")
self.icon_delete        = page.locator("i.bi-trash")
self.modal_confirm      = page.locator(".oxd-dialog-container")
self.btn_confirm_yes    = page.get_by_role("button", name="Yes, Delete")
```

## 5. Screen: Work Shifts
URL: /web/index.php/admin/workShift
Page Object: `pages/Page_WorkShift.py`

### Python Init Code (copy vào __init__ của Page_WorkShift.py)
```python
self.btn_add            = page.get_by_role("button", name="Add")
self.textbox_name       = page.locator("label").filter(has_text="Shift Name").locator("..").locator("..").locator("input")
self.textbox_hours_from = page.locator("label").filter(has_text="From").locator("..").locator("..").locator("input")
self.textbox_hours_to   = page.locator("label").filter(has_text="To").locator("..").locator("..").locator("input")
self.btn_save           = page.locator("button[type='submit']")
self.toast_success      = page.locator(".oxd-toast-content--success")
self.msg_already_exists = page.get_by_text("Already exists")
self.msg_invalid        = page.get_by_text("Expected format: hh:mm")
self.row_record         = page.locator(".oxd-table-row")
self.icon_edit          = page.locator("i.bi-pencil")
self.icon_delete        = page.locator("i.bi-trash")
self.modal_confirm      = page.locator(".oxd-dialog-container")
self.btn_confirm_yes    = page.get_by_role("button", name="Yes, Delete")
```
