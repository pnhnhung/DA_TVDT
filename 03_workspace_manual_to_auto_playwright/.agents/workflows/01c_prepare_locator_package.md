---
description: Thu thập và xác minh toàn bộ locator của module bằng browser thật (browser_subagent hoặc MCP Playwright) trước khi generate code tự động.
---

# /01c_prepare_locator_package

## Mục tiêu

Đảm bảo **mọi locator cần dùng trong flow 02 đều đã được verify thực tế trên browser** — không đoán, không copy từ code cũ chưa verify.

Flow này chạy **sau 01b (data)** và **trước 02 (generate code)**.

```text
01_analyze → 01b_prepare_data → [01c_prepare_locator] → 02_generate
```

---

## Agent / Skill / Rule

| Thành phần | Sử dụng |
|---|---|
| Agent | `@playwright_mcp_investigator` |
| Skill chính | `ui-locator-collector` |
| Skill hỗ trợ | `playwright-mcp-investigator` (cho element phức tạp) |
| Rules bắt buộc | `00-common-governance.md`, `04-locator-and-mcp.md` |

---

## Input

```text
production_artifacts/automation_design/automation_ready_testcases.md
production_artifacts/automation_design/state_plan.md
production_artifacts/automation_design/framework_contract.md
configs/environments/dev.yaml  ← base_url + credentials
```

---

## Nguyên tắc: Tách riêng theo Module (BẮT BUỘC)

Mỗi module phải có **thư mục và locator package riêng biệt hoàn toàn**.

```text
inputs/locator_packages/
  admin/
  recruitment/
  pim/
  leave/
```

Lý do tách riêng:
- Sửa locator module này **không ảnh hưởng** module khác
- Mỗi Page Object tương ứng đúng 1 file locator catalog (`src/locators/<module>/<module>.locators.ts`)
- App update chỉ cần re-collect module bị ảnh hưởng
- Debug isolate rõ ràng

**Naming convention thư mục:** `<module_slug>` = lowercase, khớp slug của module trong `src/locators/`.

| Page Object | Module slug | Thư mục |
|---|---|---|
| `admin.page.ts` | `admin` | `inputs/locator_packages/admin/` |
| `recruitment.page.ts` | `recruitment` | `inputs/locator_packages/recruitment/` |

---

## Naming Convention cho Element ID

Element ID trong package **PHẢI KHỚP TRỰC TIẾP** với key trong đối tượng catalog của `src/locators/<module>/<module>.locators.ts`.
Khuyến khích dùng camelCase cho TypeScript.

```text
<elementName><Type> (e.g. saveButton, nameInput)
```

| Type Suffix | Loại element |
|---|---|
| `Button` | Button |
| `Input` | Input / textbox |
| `Select` | Dropdown / select |
| `Checkbox` | Checkbox |
| `Row` | Table row (dynamic) |
| `Icon` | Icon button trong row |
| `Toast` | Toast notification |
| `Message` | Validation error message |
| `Modal` | Modal/dialog container |
| `Tab` | Tab element |
| `Label` | Static label (assertion) |

Ví dụ:
```text
saveButton
jobTitleInput
statusSelect
selectAllCheckbox
pageTitleLabel
successToast
confirmYesButton
```

---

## Tool: Browser Subagent (Primary)

Flow này dùng **Antigravity browser_subagent** để:

1. Navigate đến URL của từng màn hình
2. Resize viewport 1920x1080 (bắt buộc theo Browser Rules)
3. Wait for page load
4. Take screenshot (evidence)
5. Get DOM snapshot
6. Inspect từng element cần locate
7. Verify locator unique + actionable

**Escalate sang MCP Playwright Investigator khi:**
- Element nằm trong modal chưa mở (cần action trigger)
- Custom dropdown / autocomplete OrangeHRM
- Element cần scroll / pagination
- Shadow DOM / iframe
- Toast / error message conditional

---

## Thực hiện

### Step 1 — Đọc Screen-Element Requirements

Từ `automation_ready_testcases.md`, liệt kê:

```text
Với mỗi testcase trong state:
- Màn hình cần navigate (URL)
- List UI elements cần tương tác
- Action type: click / fill / assert / select / upload
```

Output nội bộ: **Screen-Element Matrix** (tạo trong memory trước khi navigate)

---

### Step 2 — Navigate và Inspect từng màn hình

Với mỗi screen trong matrix:

```text
browser_subagent task:
  1. navigate → <base_url><path>
  2. resize → 1920x1080
  3. wait_for_load_state
  4. snapshot (lấy DOM)
  5. screenshot (lưu evidence)
  6. với mỗi element:
     - locate theo thứ tự: role → label → placeholder → test_id → text → css → xpath
     - verify: unique? visible? enabled?
     - ghi locator candidate tốt nhất
```

**Thứ tự ưu tiên locator (Rule 04):**

| Tier | Locator | Dùng khi |
|---|---|---|
| 1 | `get_by_role(role, name=...)` | Button, textbox, combobox, checkbox |
| 1 | `get_by_label(label_text)` | Input có label |
| 1 | `get_by_placeholder(text)` | Input có placeholder |
| 2 | `get_by_test_id(id)` | Có data-testid |
| 3 | `get_by_text(text)` | Static text / toast / error message |
| 4 | `locator("#id")` / `locator("[name='x']")` | ID/name ổn định |
| 5 | `locator(".css-semantic")` | CSS có nghĩa |
| 6 | XPath | Chỉ khi không còn lựa chọn |

---

### Step 3 — Xử lý element đặc biệt OrangeHRM

**Custom dropdown:**
```text
Mở: page.locator(".oxd-select-text-input")
Chọn: page.locator(".oxd-select-option").filter(has_text=value)
```

**Autocomplete:**
```text
Input: page.get_by_placeholder("Type for hints...")
Select: page.locator(".oxd-autocomplete-option").first
```

**Table row actions:**
```text
Row: page.locator(".oxd-table-row").filter(has_text=name).first
Edit: <row>.locator("i.bi-pencil").locator("..")
Delete: <row>.locator("i.bi-trash").locator("..")
```

**Toast:**
```text
Success: page.locator(".oxd-toast-content--success")
Error:   page.locator(".oxd-toast-content--error")
```

**Date input:**
```text
page.locator(".oxd-date-input input") — fill("MM/DD/YYYY")
```

---

### Step 4 — Đánh dấu trạng thái locator

| Status | Ý nghĩa |
|---|---|
| `VERIFIED` | Đã test trên browser, unique và actionable |
| `CONDITIONAL` | Chỉ xuất hiện sau action khác (modal, toast, error) — đã document trigger |
| `NEED_DATA` | Chỉ xuất hiện khi có data trong list — cần data để verify |
| `UNRESOLVED` | Chưa tìm được locator ổn định — cần user quyết định |

---

### Step 5 — Tạo Locator Package

**File chính:**

```text
inputs/locator_packages/<module_slug>/locator_package.md
```

> Format đầy đủ xem tại **Output bắt buộc** (phía dưới) — có block Python Init Code để copy thẳng vào `__init__` của Page Object.

---

### Step 6 — Tạo Collection Log và Summary

**Collection log:**
```text
inputs/locator_packages/<module>/locator_collection_log.md
```

**Summary:**
```text
production_artifacts/automation_design/locator_package_summary_<module>.md
```

Summary format:
```markdown
# Locator Package Summary — <Module>

| Screen | Total Elements | VERIFIED | CONDITIONAL | NEED_DATA | UNRESOLVED |
|---|---|---|---|---|---|

## UNRESOLVED Elements (cần user quyết định)
| Element ID | Screen | Lý do Unresolved | Đề xuất |

## CONDITIONAL Elements (trigger conditions)
| Element ID | Screen | Trigger condition |

## Recommendation cho flow 02
- Proceed: Yes/No/Partial
- Blocked testcases (do UNRESOLVED): ...
```

---

## Output bắt buộc

```text
inputs/locator_packages/<module_slug>/locator_package.md
inputs/locator_packages/<module_slug>/locator_collection_log.md
inputs/locator_packages/<module_slug>/locator_evidence/*.png
production_artifacts/automation_design/locator_package_summary_<module_slug>.md
```

**Cấu trúc locator_package.md** (có block TypeScript Code để copy sang `src/locators/`):

```markdown
# Locator Package — <Module>
module:       <module_slug>
catalog_file: src/locators/<module>/<module>.locators.ts
collected_at: YYYY-MM-DDTHH:MM:SS

## Screen: <Tên màn hình>
URL: <url>
Screenshot: locator_evidence/<screen_slug>_snapshot.png

| Element ID         | Action | Status | Trigger |
|---|---|---|---|
| addButton          | click  | VERIFIED | |
| nameInput          | fill   | VERIFIED | |
| statusSelect       | select | VERIFIED | |
| activeCheckbox     | check  | VERIFIED | |
| pageTitleLabel     | assert | VERIFIED | |
| successToast       | assert | CONDITIONAL | After successful save |

### TypeScript LocatorSpec Code (copy vào src/locators/<module>/<module>.locators.ts)

```typescript
import type { LocatorSpec } from '@core/locator';

export const <module>Locators = {
  addButton: { strategy: 'role', role: 'button', name: 'Add' } satisfies LocatorSpec,
  nameInput: { strategy: 'role', role: 'textbox', name: 'Name' } satisfies LocatorSpec,
  statusSelect: { strategy: 'css', css: '.oxd-select-text-input' } satisfies LocatorSpec,
  activeCheckbox: { strategy: 'role', role: 'checkbox', name: 'Active' } satisfies LocatorSpec,
  saveButton: { strategy: 'css', css: "button[type='submit']" } satisfies LocatorSpec,
  successToast: { strategy: 'css', css: '.oxd-toast-content--success' } satisfies LocatorSpec,
  requiredMessage: { strategy: 'text', text: 'Required' } satisfies LocatorSpec,
  pageTitleLabel: { strategy: 'css', css: '.oxd-topbar-header-title' } satisfies LocatorSpec,
  recordRow: { strategy: 'css', css: '.oxd-table-row' } satisfies LocatorSpec,
};
```
```

---

## Quality Gate

```text
[ ] Mọi screen trong state plan đã được navigate
[ ] Mọi element REQUIRED (click/fill) đều có status VERIFIED hoặc CONDITIONAL
[ ] Element CONDITIONAL đã ghi rõ trigger condition
[ ] Element UNRESOLVED đã được report với đề xuất giải pháp
[ ] Screenshot evidence đã được lưu cho từng screen chính
[ ] locator_package.md đã tạo đầy đủ
[ ] locator_package_summary đã tạo
[ ] User đã review và confirm trước khi sang flow 02
```

**Điều kiện chặn flow 02:**
- Có element REQUIRED status UNRESOLVED → testcase tương ứng bị BLOCK
- Không được generate Page Object khi locator chưa trong package

---

## Handoff sang flow 02

Khi chuyển sang `02_generate_auto_direct_to_framework`, generator nhận:

```text
inputs/locator_packages/<module>/locator_package.md  ← ĐỌC ĐẦU TIÊN
```

**Rule cho generator (flow 02):**
- Mọi locator trong Page Object PHẢI lấy từ `locator_package.md`
- Nếu element không có trong package → DỪNG, báo `LOCATOR_MISSING`, KHÔNG đoán
- Element ID trong package phải khớp với locator variable name trong Page Object

---

## Note về Locator Packages tái sử dụng

Locator package của một module có thể được **tái dùng** cho các state sau của cùng module nếu:
- Màn hình không thay đổi
- App version không thay đổi
- Collect trong vòng 7 ngày

Khi state mới có màn hình mới → chạy lại 01c chỉ cho màn hình chưa có.