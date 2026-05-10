---
name: ui-locator-collector
description: Navigate to each screen of a module using the live browser (browser_subagent or MCP Playwright), inspect real DOM, collect and validate locators for all UI elements required by automation testcases, and produce a verified Locator Package before code generation.
---

# Skill — UI Locator Collector

## Goal

Thu thập và xác minh locator **thực tế trên browser** cho toàn bộ UI element mà testcase của module cần tương tác — trước khi generator viết bất kỳ dòng code nào.

> Đây là bước **chủ động** thu thập locator, khác với `playwright-mcp-investigator` là bước **reactive** khi debug sau khi fail.

---

## Inputs

```text
FRAMEWORK_ROOT
production_artifacts/automation_design/automation_ready_testcases.md
production_artifacts/automation_design/state_plan.md
production_artifacts/automation_design/framework_contract.md
configs/environments/dev.yaml  ← để lấy base_url và credentials
```

---

## Rules bắt buộc

- `00-common-governance.md`
- `04-locator-and-mcp.md`

---

## NGUYÊN TẮC CỐT LÕI: Tách riêng theo Module

**BẮT BUỘC:** Mỗi module phải có thư mục và locator package riêng biệt hoàn toàn.

```text
inputs/locator_packages/
  job/                      ← Module Job (Admin > Job)
    locator_package.md
    locator_collection_log.md
    locator_evidence/
  nationalities/            ← Module Nationalities
    locator_package.md
    ...
  recruitment_vacancy/      ← Sub-module Vacancy
    locator_package.md
    ...
  recruitment_candidate/    ← Sub-module Candidate (TÁCH RIÊNG)
    locator_package.md
    ...
  pim/                      ← Module PIM
    locator_package.md
    ...
```

**Lý do phải tách riêng:**
- Sửa locator module này KHÔNG ảnh hưởng module khác
- Mỗi Page Object tương ứng đúng 1 locator package
- Khi app update chỉ cần re-collect module bị ảnh hưởng
- Debug isolate: biết ngay locator sai thuộc module nào

**Quy tắc đặt tên thư mục module:**
```text
<module_slug>/              ← lowercase, underscore, khớp với tên Page Object
```

| Page Object file | Module slug | Thư mục locator package |
|---|---|---|
| `Page_Job.py` | `job` | `inputs/locator_packages/job/` |
| `Page_Nationalities.py` | `nationalities` | `inputs/locator_packages/nationalities/` |
| `Page_Recruitment_Vacancy.py` | `recruitment_vacancy` | `inputs/locator_packages/recruitment_vacancy/` |
| `Page_Recruitment_Candidate.py` | `recruitment_candidate` | `inputs/locator_packages/recruitment_candidate/` |
| `Page_PIM.py` | `pim` | `inputs/locator_packages/pim/` |
| `Page_Leave.py` | `leave` | `inputs/locator_packages/leave/` |

---

## Naming Convention cho Element ID

Element ID trong package **PHẢI KHỚP TRỰC TIẾP** với tên attribute trong `__init__` của Page Object.

**Format:**
```text
<type_prefix>_<context>[_<screen_suffix>]
```

**Prefix bắt buộc:**

| Prefix | Loại element | Ví dụ |
|---|---|---|
| `btn_` | Button (click) | `btn_add`, `btn_save`, `btn_delete` |
| `textbox_` | Input / textbox | `textbox_name`, `textbox_job_title`, `textbox_search` |
| `select_` | Dropdown / select | `select_status`, `select_job_category` |
| `checkbox_` | Checkbox | `checkbox_select_all`, `checkbox_row` |
| `lnk_` | Hyperlink | `lnk_edit`, `lnk_view` |
| `row_` | Table row (dynamic) | `row_record` |
| `col_` | Table column header | `col_name`, `col_actions` |
| `tab_` | Tab element | `tab_personal`, `tab_job` |
| `modal_` | Modal/dialog container | `modal_delete_confirm` |
| `toast_` | Toast notification | `toast_success`, `toast_error` |
| `msg_` | Inline validation message | `msg_required`, `msg_already_exists` |
| `icon_` | Icon button trong row | `icon_edit`, `icon_delete` |
| `label_` | Static label (assertion) | `label_page_title` |

**Ví dụ đặt tên element ID:**
```text
btn_add              → self.btn_add         (Add button ở list screen)
btn_save             → self.btn_save        (Save button ở form screen)
textbox_job_title    → self.textbox_job_title
select_pay_grade     → self.select_pay_grade
checkbox_active      → self.checkbox_active
label_page_title     → self.label_page_title
row_record           → self.row_record      (dynamic, filter by name)
icon_edit            → self.icon_edit       (trong row)
toast_success        → self.toast_success
msg_required         → self.msg_required
modal_confirm        → self.modal_confirm
btn_confirm_yes      → self.btn_confirm_yes (trong modal)
```

---

## Procedure

### 1. Đọc element requirements từ automation_ready_testcases.md

Với mỗi testcase trong state, liệt kê:

```text
- Màn hình (screen/page) cần navigate
- Các UI element cần tương tác
- Action type: click / fill / assert_text / assert_visible / select / upload / check
- URL hoặc navigation path
```

Tạo **Screen-Element Matrix** trước khi navigate:

| Screen ID | Screen Name | URL Path | Elements cần locate |
|---|---|---|---|
| SCR-01 | Job Title List | /admin/viewJobTitleList | btn_add, row_record, icon_edit, icon_delete |
| SCR-02 | Job Title Form | /admin/viewJobTitleList (after btn_add) | textbox_job_title, textbox_note, btn_save, toast_success, msg_required |
| SCR-03 | Delete Confirm | (modal after delete click) | modal_confirm, btn_confirm_yes |

### 2. Navigate và inspect từng screen

**2a. Sử dụng browser_subagent (PRIMARY)**

```text
Task cho browser_subagent:
1. Navigate đến URL: <base_url><url_path>
2. Resize viewport: 1920x1080
3. Wait for page load
4. Take screenshot → lưu vào locator_evidence/<screen_slug>_snapshot.png
5. Get DOM snapshot
6. With each element trong matrix:
   - Xác định element trên UI
   - Thử locator theo thứ tự ưu tiên (Tier 1 → 6)
   - Verify: unique? visible? enabled?
   - Ghi Python init code hoàn chỉnh
```

**2b. Escalate sang MCP Playwright nếu:**
- Element trong modal/dialog chưa mở (cần trigger action)
- Custom dropdown `.oxd-select-wrapper` / autocomplete
- Element sau scroll / pagination
- Toast, error message (conditional)
- Shadow DOM / iframe

### 3. Thu thập locator theo thứ tự ưu tiên (Rule 04)

```python
# Tier 1 — Semantic (ưu tiên nhất)
page.get_by_role("button", name="Add")
page.get_by_label("Job Title")
page.get_by_placeholder("Type for hints...")

# Tier 2 — Test attributes
page.get_by_test_id("save-button")

# Tier 3 — Text content
page.get_by_text("Successfully Saved")

# Tier 4 — ID/name stable
page.locator("#job-title-name")
page.locator("[name='jobTitle']")

# Tier 5 — CSS semantic (scoped)
page.locator(".oxd-table-row").filter(has_text=name).first
page.locator("button[type='submit']").first

# Tier 6 — XPath (chỉ dùng khi không còn lựa chọn)
page.locator("//button[contains(@class,'oxd-button--secondary')]")
```

### 4. Validate từng locator

- [ ] **Unique:** Chỉ match đúng 1 element (hoặc first trong context scope)
- [ ] **Visible:** Element có thể thấy được trong viewport
- [ ] **Stable:** Locator vẫn đúng sau reload / navigate lại
- [ ] **Actionable:** Element ở trạng thái enabled (nếu cần click/fill)

**Trạng thái locator:**
```text
VERIFIED     — đã test, unique và actionable
CONDITIONAL  — chỉ xuất hiện khi có action trước (modal, error, toast)
NEED_DATA    — chỉ xuất hiện khi có data trong list
UNRESOLVED   — chưa tìm được locator ổn định
```

### 5. Xử lý element đặc biệt OrangeHRM

**Custom dropdown:**
```python
select_status     = page.locator(".oxd-select-text-input")         # click để mở
opt_status        = page.locator(".oxd-select-option")             # filter by text khi dùng
```

**Autocomplete:**
```python
textbox_hiring_mgr  = page.get_by_placeholder("Type for hints...")
opt_autocomplete    = page.locator(".oxd-autocomplete-option").first
```

**Toast:**
```python
toast_success     = page.locator(".oxd-toast-content--success")
toast_error       = page.locator(".oxd-toast-content--error")
```

**Table row + icons:**
```python
row_record        = page.locator(".oxd-table-row")  # filter by name when used
icon_edit         = page.locator("i.bi-pencil")     # scoped in row
icon_delete       = page.locator("i.bi-trash")      # scoped in row
```

**Modal confirm:**
```python
modal_confirm     = page.locator(".oxd-dialog-container")
btn_confirm_yes   = page.get_by_role("button", name="Yes, Delete")
```

---

### 6. Document vào Locator Package

**Format locator_package.md — thiết kế để copy trực tiếp sang Page Object:**

```markdown
# Locator Package — <Module>

module:       <module_slug>
page_object:  pages/Page_<Module>.py
collected_at: YYYY-MM-DDTHH:MM:SS
base_url:     <base_url>
collected_by: browser_subagent | mcp

---

## Screen: <Screen Name>
URL: <full_url>
Screenshot: locator_evidence/<screen_slug>_snapshot.png

| Element ID            | Action Type | Status      | Trigger Condition      |
|---|---|---|---|
| btn_add               | click       | VERIFIED    |                        |
| textbox_job_title     | fill        | VERIFIED    |                        |
| textbox_note          | fill        | VERIFIED    |                        |
| btn_save              | click       | VERIFIED    |                        |
| toast_success         | assert      | CONDITIONAL | After successful save  |
| msg_required          | assert      | CONDITIONAL | After save with empty field |
| row_record            | locate      | NEED_DATA   | Requires data in list  |
| icon_edit             | click       | NEED_DATA   | Scoped in row_record   |
| modal_confirm         | assert      | CONDITIONAL | After delete icon click |
| btn_confirm_yes       | click       | CONDITIONAL | Inside modal_confirm   |

### Python Init Code (copy vào __init__ của Page_<Module>.py)

```python
# === Screen: <Screen Name> ===
# Thêm vào __init__(self, page: Page):
self.btn_add             = page.get_by_role("button", name="Add")
self.textbox_job_title   = page.get_by_role("textbox", name="Job Title")
self.textbox_note        = page.get_by_role("textbox", name="Note")
self.btn_save            = page.locator("button[type='submit']").first
self.toast_success       = page.locator(".oxd-toast-content--success")
self.msg_required        = page.get_by_text("Required")
self.row_record          = page.locator(".oxd-table-row")  # .filter(has_text=name) khi dùng
self.icon_edit           = page.locator("i.bi-pencil")     # scoped: row.locator(self.icon_edit)
self.icon_delete         = page.locator("i.bi-trash")      # scoped: row.locator(self.icon_delete)
self.modal_confirm       = page.locator(".oxd-dialog-container")
self.btn_confirm_yes     = page.get_by_role("button", name="Yes, Delete")
```
```

> **Lưu ý quan trọng cho "Python Init Code":**
> - Toàn bộ block code này được COPY TRỰC TIẾP vào `__init__` của Page Object
> - Attribute name = Element ID = tên biến trong test function khi gọi qua `self.<attribute>`
> - CONDITIONAL locator vẫn khai báo trong `__init__` — Page Object sẽ `expect()` khi cần
> - Row/icon là template locator — code sẽ scope thêm khi dùng trong method

---

### 7. Tạo locator_collection_log.md

```markdown
| Time  | Screen        | Element ID    | Action    | Result      | Tool Used        | Note                        |
|---|---|---|---|---|---|---|
| 10:05 | Job Title List | btn_add      | Inspect   | VERIFIED    | browser_subagent | role=button name=Add        |
| 10:06 | Job Title List | row_record   | Inspect   | NEED_DATA   | browser_subagent | List empty — template only  |
| 10:07 | Job Title Form | inp_job_title| Inspect   | VERIFIED    | browser_subagent | role=textbox name=Job Title |
| 10:08 | Delete Modal  | btn_confirm_yes| Inspect  | CONDITIONAL | MCP escalated    | Triggered by icon_delete    |
```

---

## Outputs

```text
inputs/locator_packages/<module_slug>/
  locator_package.md             ← Catalog + Python Init Code (dùng cho flow 02)
  locator_collection_log.md      ← Log thu thập
  locator_evidence/
    <screen_slug>_snapshot.png   ← Screenshot evidence

production_artifacts/automation_design/
  locator_package_summary_<module_slug>.md  ← Summary per module
```

---

## Quality Gate

```text
[ ] Mỗi module có thư mục riêng biệt trong inputs/locator_packages/
[ ] Tên thư mục module khớp với slug của Page Object file
[ ] Mọi screen trong state plan đã được navigate
[ ] Mọi element REQUIRED đều có status VERIFIED hoặc CONDITIONAL (với trigger rõ)
[ ] Element UNRESOLVED đã report + user quyết định
[ ] Python Init Code block đã được tạo cho mỗi screen
[ ] Screenshot evidence đã lưu
[ ] locator_collection_log.md đã tạo
[ ] locator_package_summary đã tạo
```

**Không được generate code khi:**
- Element REQUIRED còn UNRESOLVED
- Chưa có Python Init Code block cho screen cần generate
- Tên element ID không theo naming convention (thiếu prefix)
