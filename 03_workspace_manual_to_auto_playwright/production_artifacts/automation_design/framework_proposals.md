# Framework Proposals & Technical Notes

```
module:         ALL
state_id:       framework_intake
generated_at:   2026-05-05T16:11:00+07:00
status:         DRAFT — Các đề xuất này CHƯA implement, cần confirm trước khi triển khai
```

---

## 1. Tổng Quan Đề Xuất

File này ghi lại các đề xuất kỹ thuật, gap cần fill, và design decision cần thống nhất trước khi generate code cho từng module. Khi cần triển khai, lấy đề xuất từ đây làm starting point.

---

## 2. Đề Xuất: MultiSessionContext Fixture (GAP-FW-04)

**Tại sao cần:** 12/17 Partial cases trong global_handoff_summary yêu cầu 2 user sessions đồng thời (race condition, double submit, concurrent edit).

**Đề xuất implement vào:** `tests/conftest.py`

**Priority:** High (Tier 5 — implement sau khi xong Tier 1-4)

```python
# Thêm vào tests/conftest.py

STORE_ESS = STORE_DIR / "storage_state_ess.json"

def _login_ess_and_save(playwright):
    """Login ESS user và lưu session riêng."""
    if not (app_config.ess_user_email and app_config.ess_password):
        raise RuntimeError("Missing ess_user_email / ess_password in config")
    browser_name = os.getenv("PW_BROWSER", "chromium")
    browser = getattr(playwright, browser_name).launch(headless=False, args=["--start-maximized"])
    context = browser.new_context(no_viewport=True)
    page = context.new_page()
    page.goto(CHECK_URL)
    page.get_by_role("textbox", name="Username").fill(app_config.ess_user_email)
    page.get_by_role("textbox", name="Password").fill(app_config.ess_password)
    page.get_by_role("button", name="Login").click()
    context.storage_state(path=str(STORE_ESS))
    browser.close()

@pytest.fixture(scope="function")
def multi_session_context(playwright, ensure_storage):
    """
    2 browser contexts độc lập — Admin session + ESS session.
    Dùng cho race condition / multi-user tests (Partial cases).
    Returns: (page_admin, page_ess)
    """
    if not _valid_json(STORE_ESS):
        _login_ess_and_save(playwright)

    browser_name = os.getenv("PW_BROWSER", "chromium")
    browser = getattr(playwright, browser_name).launch(headless=False, args=["--start-maximized"])
    
    ctx_admin = browser.new_context(storage_state=str(STORE), no_viewport=True)
    ctx_ess   = browser.new_context(storage_state=str(STORE_ESS), no_viewport=True)
    
    page_admin = ctx_admin.new_page()
    page_ess   = ctx_ess.new_page()
    
    yield page_admin, page_ess
    
    ctx_admin.close()
    ctx_ess.close()
    browser.close()
```

**Cách dùng trong test:**
```python
def test_race_condition_leave_request(multi_session_context):
    page_admin, page_ess = multi_session_context
    # ESS submit leave request
    # Admin approve đồng thời
```

---

## 3. Đề Xuất: File Download Helper (GAP-FW-05)

**Tại sao cần:** Một số module (PIM, Leave, Attendance, Recruitment) có tính năng export CSV/Excel.

**Đề xuất implement vào:** `utils/file_helper.py` (file mới)

**Priority:** Medium (implement khi gặp TC cần download)

```python
# utils/file_helper.py (NEW)

import csv
import os
from pathlib import Path
from typing import List, Dict

PROJECT_ROOT = Path(__file__).resolve().parent.parent


def download_file(page, trigger_locator, save_dir: str = "storage") -> str:
    """
    Atomic: Download file bằng Playwright và lưu vào thư mục chỉ định.
    Returns: đường dẫn tuyệt đối của file đã download.
    """
    save_path_dir = PROJECT_ROOT / save_dir
    save_path_dir.mkdir(parents=True, exist_ok=True)
    
    with page.expect_download() as download_info:
        trigger_locator.click()
    download = download_info.value
    
    save_path = str(save_path_dir / download.suggested_filename)
    download.save_as(save_path)
    return save_path


def read_csv(file_path: str) -> List[Dict]:
    """Đọc CSV và trả về list of dict."""
    with open(file_path, encoding="utf-8-sig") as f:
        return list(csv.DictReader(f))


def cleanup_file(file_path: str):
    """Xóa file tạm sau khi verify xong."""
    try:
        os.remove(file_path)
    except OSError:
        pass
```

**Cách dùng trong test:**
```python
from utils.file_helper import download_file, read_csv, cleanup_file

def test_export_employee_csv(page_auth):
    pim_page = PIMPage(page_auth)
    pim_page.navigate()
    
    export_btn = page_auth.get_by_role("button", name="Export")
    downloaded = download_file(page_auth, export_btn)
    
    rows = read_csv(downloaded)
    assert len(rows) > 0
    assert any(r.get("Employee Name") == "Admin" for r in rows)
    
    cleanup_file(downloaded)
```

---

## 4. Đề Xuất: Attendance State Helper (GAP từ global_handoff_summary)

**Tại sao cần:** Module Attendance là state machine (punch-in/punch-out). Test bị fail nếu trạng thái punch không đúng trước khi test.

**Đề xuất implement vào:** `utils/attendance_helper.py` (file mới)

**Priority:** High (cần trước khi automate bất kỳ TC Attendance nào)

```python
# utils/attendance_helper.py (NEW)

from utils import db_client


def get_attendance_state(emp_number: int) -> str:
    """
    Kiểm tra trạng thái punch hiện tại của employee.
    Returns: 'punched_in' | 'punched_out' | 'unknown'
    """
    result = db_client.select_sql(
        f"""
        SELECT state FROM ohrm_attendance_record 
        WHERE emp_number = {emp_number} 
        ORDER BY punch_in_datetime DESC LIMIT 1
        """
    )
    if not result.rows:
        return "punched_out"
    state = result.rows[0].get("state", "")
    return "punched_in" if state == "PUNCHED IN" else "punched_out"


def ensure_punched_out(emp_number: int):
    """
    Đảm bảo employee ở trạng thái PUNCHED OUT trước test.
    Nếu đang punch-in → force punch-out qua DB.
    """
    state = get_attendance_state(emp_number)
    if state == "punched_in":
        db_client.execute_sql(
            f"""
            UPDATE ohrm_attendance_record 
            SET state = 'PUNCHED OUT', punch_out_datetime = NOW()
            WHERE emp_number = {emp_number} AND state = 'PUNCHED IN'
            """
        )


def ensure_punched_in(emp_number: int):
    """
    Đảm bảo employee ở trạng thái PUNCHED IN trước test.
    Nếu đang punch-out → tạo punch-in record mới.
    """
    state = get_attendance_state(emp_number)
    if state == "punched_out":
        db_client.execute_sql(
            f"""
            INSERT INTO ohrm_attendance_record (emp_number, punch_in_datetime, state)
            VALUES ({emp_number}, NOW(), 'PUNCHED IN')
            """
        )
```

> CAUTION: Verify schema thực tế của table ohrm_attendance_record trước khi dùng. Tên cột có thể khác.

---

## 5. Đề Xuất: Leave Entitlement Helper (GAP từ global_handoff_summary)

**Tại sao cần:** TC Leave yêu cầu employee có balance leave trước khi submit request.

**Đề xuất implement vào:** `utils/leave_helper.py` (file mới)

**Priority:** High (cần trước khi automate Leave module)

```python
# utils/leave_helper.py (NEW)

from utils import db_client


def ensure_leave_entitlement(emp_number: int, leave_type_id: int, days: float = 10.0):
    """
    Đảm bảo employee có đủ leave entitlement.
    Nếu chưa có hoặc không đủ → cập nhật qua DB.
    
    CAUTION: Verify schema thực tế trước khi dùng.
    """
    result = db_client.select_sql(
        f"""
        SELECT id, no_of_days FROM ohrm_leave_entitlement
        WHERE emp_number = {emp_number} AND leave_type_id = {leave_type_id}
        AND deleted = 0
        LIMIT 1
        """
    )
    if result.rows:
        current_days = float(result.rows[0].get("no_of_days", 0))
        if current_days < days:
            ent_id = result.rows[0]["id"]
            db_client.execute_sql(
                f"UPDATE ohrm_leave_entitlement SET no_of_days = {days} WHERE id = {ent_id}"
            )
    else:
        db_client.execute_sql(
            f"""
            INSERT INTO ohrm_leave_entitlement 
            (emp_number, leave_type_id, no_of_days, from_date, to_date, entitlement_type, deleted)
            VALUES ({emp_number}, {leave_type_id}, {days}, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 YEAR), 1, 0)
            """
        )
```

> CAUTION: Verify schema của ohrm_leave_entitlement trước khi implement. Có thể cần thêm fields.

---

## 6. Đề Xuất: Standardize BasePage (Align Page_Qualifications)

**Tại sao cần:** `Page_Qualifications` không kế thừa `BasePage` nhưng `Page_Job` có. Gây inconsistency.

**Đề xuất:** Extend `BasePage` thêm common methods để cả 2 pattern đều có thể reuse.

**Priority:** Low (cosmetic — không block generate code)

```python
# pages/Base_Page.py — đề xuất extend:

from playwright.sync_api import Page, expect
from configs.config import app_config


class BasePage:
    def __init__(self, page: Page):
        self.page = page
    
    def navigate_to(self, path: str):
        """Atomic: Navigate đến path relative, tự recovery session."""
        url = f"{app_config.base_url.rstrip('/')}{path}"
        self.page.goto(url)
    
    def verify_toast_success(self, text: str = "Successfully"):
        """Atomic: Verify success toast notification."""
        expect(
            self.page.locator(".oxd-toast-content--success")
        ).to_contain_text(text, timeout=5000)
    
    def verify_validation_error(self, message: str):
        """Atomic: Verify validation error message."""
        expect(
            self.page.locator(".oxd-input-field-error-message").filter(has_text=message).first
        ).to_be_visible(timeout=5000)
```

> Lưu ý: Page_Qualifications hiện KHÔNG dùng BasePage — không refactor Page_Qualifications đang chạy tốt. Chỉ áp dụng pattern mới cho Page Object mới.

---

## 7. Đề Xuất: Storage Directory Bootstrap

**Tại sao cần:** TC upload file cần file tồn tại sẵn trong `storage/`. Hiện tại không có fixture tự tạo file test.

**Đề xuất:** Thêm conftest fixture tạo dummy file test khi khởi động session.

**Priority:** Medium (cần trước khi chạy TC upload)

```python
# Thêm vào tests/conftest.py hoặc tests/fixtures/file_fixtures.py

@pytest.fixture(scope="session", autouse=True)
def ensure_test_files():
    """Đảm bảo file test (upload) tồn tại trong storage/."""
    storage_dir = PROJECT_ROOT / "storage"
    storage_dir.mkdir(exist_ok=True)
    
    # Tạo dummy PDF nếu chưa có
    sample_pdf = storage_dir / "sample_spec.pdf"
    if not sample_pdf.exists():
        # Tạo minimal valid PDF
        sample_pdf.write_bytes(
            b"%PDF-1.0\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj "
            b"2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj "
            b"3 0 obj<</Type/Page/MediaBox[0 0 3 3]>>endobj\n"
            b"xref\n0 4\n0000000000 65535 f\n0000000009 00000 n\n"
            b"0000000058 00000 n\n0000000115 00000 n\n"
            b"trailer<</Size 4/Root 1 0 R>>\nstartxref\n190\n%%EOF"
        )
    
    # Tạo dummy CSV nếu chưa có
    sample_csv = storage_dir / "sample_import.csv"
    if not sample_csv.exists():
        sample_csv.write_text("first_name,last_name,emp_id\nTest,Auto,AUTO001\n", encoding="utf-8")
```

---

## 8. Đề Xuất: Pattern Xử Lý Tab Mới Từ Link/Button

**Tại sao cần:** Một số module (Job Specification, Reports) mở link trong tab mới.

**Pattern chuẩn cho Page Object:**

```python
def open_in_new_tab(self, link_locator) -> "Page":
    """
    Atomic: Click link mở tab mới, trả về page của tab mới.
    Caller có trách nhiệm đóng page sau khi dùng.
    """
    with self.page.context.expect_page() as new_page_info:
        link_locator.click()
    new_page = new_page_info.value
    new_page.wait_for_load_state()
    return new_page

# Dùng trong test:
def test_verify_spec_file_link(page_auth):
    job_page = JobPage(page_auth)
    new_tab = job_page.open_in_new_tab(job_page.label_file_download)
    expect(new_tab).to_have_url(re.compile(r"\.pdf$"))
    new_tab.close()
```

---

## 9. Đề Xuất: Pattern Xử Lý Custom Dropdown OrangeHRM

**Tại sao cần:** Dropdown dạng `.oxd-select-wrapper` không phải native `<select>`, cần click để mở rồi chọn option.

**Pattern chuẩn cho Page Object:**

```python
def select_dropdown_option(self, dropdown_locator, option_text: str):
    """
    Atomic: Chọn option trong custom dropdown OrangeHRM.
    Dùng cho .oxd-select-wrapper, không phải native <select>.
    """
    dropdown_locator.click()
    option = self.page.locator(".oxd-select-option").filter(has_text=option_text)
    expect(option).to_be_visible(timeout=5000)
    option.click()

# Nếu dropdown có filter/autocomplete (như autocomplete employee):
def select_autocomplete(self, input_locator, search_text: str):
    """
    Atomic: Chọn trong autocomplete field.
    Type ít nhất 3 ký tự để filter, chọn option đầu tiên.
    """
    input_locator.fill(search_text[:3])  # type 3 chars minimum
    option = self.page.locator(".oxd-autocomplete-option").first
    expect(option).to_be_visible(timeout=5000)
    option.click()
```

---

## 10. Đề Xuất: Pattern Date Picker OrangeHRM

**Tại sao cần:** Date input trong OrangeHRM là custom component, không phải native `<input type="date">`.

**Pattern chuẩn:**

```python
def fill_date(self, date_input_locator, date_str: str):
    """
    Atomic: Nhập ngày theo format MM/DD/YYYY.
    Clear trước rồi fill để tránh append.
    """
    date_input_locator.clear()
    date_input_locator.fill(date_str)  # format: "01/15/2026"
    date_input_locator.press("Tab")    # trigger validation
```

---

## 11. Lưu Ý Từ global_handoff_summary.md

### Open Gaps ảnh hưởng automation

| Gap ID | Module | Impact | Action cần làm |
|---|---|---|---|
| GAP-NAT-01 | nationalities | Boundary test TC_UT_NAT_03/04 | Confirm max-length với Dev |
| GAP-PIM-04 | pim | Leave behavior on Terminate | BLOCKED — không automate |
| GAP-ATT-01 | attendance | Admin edit punch record | BLOCKED — không automate |
| GAP-ATT-02 | attendance | Timezone handling | BLOCKED — không automate |
| GAP-REC-01 | recruitment | Hire → Create Employee | BLOCKED — không automate |
| GAP-PRF-01 | performance | Auto-complete Review cycle | BLOCKED — không automate |

### Critical Utilities cần build trước module tương ứng

| Utility | Cần trước | Priority |
|---|---|---|
| ensure_attendance_state() | Bất kỳ TC Attendance nào | High |
| ensure_leave_entitlement() | Bất kỳ TC Leave submit nào | High |
| ensure_timesheet_state() | Bất kỳ TC Timesheet submit nào | High |
| MultiSessionContext | Tất cả Partial cases (Tier 5) | High (Tier 5) |

### Build Order đã confirm

```
Tier 1: Nationalities, Job, Organization, Qualifications (đã có phần lớn)
Tier 2: PIM AddEmployee, PIM JobTab, PIM ReportTo, UserManagement
Tier 3: Timesheet (complex grid), Attendance (state machine), Configuration
Tier 4: Leave (4 sub), Recruitment (3 sub), Performance (4 sub)
Tier 5: MultiSessionContext → tất cả 17 Partial cases
```

---

## 12. Quick Reference — Decision Log

| ID | Quyết định | Lý do | Status |
|---|---|---|---|
| DEC-01 | Framework là Pure Pytest + POM, không phải BDD | Không có pytest-bdd trong requirements | CONFIRMED |
| DEC-02 | Fixture page_auth là fixture chính cho mọi test | Được dùng consistent trong tất cả test file | CONFIRMED |
| DEC-03 | Page Object KHÔNG cần strict kế thừa BasePage | Page_Qualifications không kế thừa nhưng vẫn chạy tốt | CONFIRMED |
| DEC-04 | MultiSessionContext chưa implement | Tier 5 — implement sau | PENDING |
| DEC-05 | File upload test để trong storage/ | Pattern từ test_job.py | CONFIRMED |
| DEC-06 | DB dùng cho pre-condition setup và verify, không dùng thay UI behavior | Rule 03 | CONFIRMED |
| DEC-07 | expand_unique() dùng 6-char UUID — đủ unique cho test env | Từ tests/support.py | CONFIRMED |
