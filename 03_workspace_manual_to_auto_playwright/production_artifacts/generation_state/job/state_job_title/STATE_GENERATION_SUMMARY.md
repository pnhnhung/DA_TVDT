# State Generation Summary

module: admin_job
state_id: state_job_title
framework_root: inputs/framework_inbox/source-automation-fw/playwright-python-pytest-pom
generated_at: 2026-05-05T17:58:00+07:00
status: generated

## 1. Scope đã generate
- **Testcases**: 5 (`TC_UT_JOB_TITLE_01`, `TC_UT_JOB_TITLE_02`, `TC_UT_JOB_TITLE_03`, `TC_UT_JOB_TITLE_05`, `TC_UT_JOB_TITLE_06`)
- **Page Object**: `Page_JobTitle.py`
- **Test File**: `test_admin_job.py`

## 2. Việc tái sử dụng (Reuse)
- Kế thừa `BasePage` cho Page Object.
- Sử dụng `@testcase` decorator và `expand_unique` utility từ `support.py`.
- Tận dụng fixture authentication `page_auth` từ `conftest.py`.

## 3. Quản lý Data 
- Sử dụng dynamic fixture logic qua helper method `ensure_job_title_exists()` bên trong file test thay vì build DB/API caller phức tạp. Helper này dùng chính Page Object (UI) để tạo dependency (Idempotent Test Data) trước khi chạy case Duplicate, Edit, Delete. Việc này đảm bảo tính ổn định và tuân thủ tuyệt đối Rule 03 (Test Data First).

## 4. Quản lý Locator
- Copy toàn bộ block python từ `locator_package.md` vào `__init__` của Page Object mà không sửa đổi (ngoại trừ format).
- Sử dụng chuẩn Playwright web-first assertions: `expect().to_be_visible()`.

## 5. Xác nhận Quality Gate
- [x] Không hardcode secret/tài khoản.
- [x] Không có test data "chết" (dùng `expand_unique`).
- [x] Không dùng locator đoán mò.
- [x] Mapping framework rõ ràng và minh bạch.

---
**Next steps:** 
Review source code vừa tạo ra bằng workflow `03_review_generated_source` hoặc tiến thẳng sang `04_execute_debug_fix` để chạy thử file test này. Mọi lỗi ở bước chạy đều phải được lưu evidence và phân tích root cause trước khi fix theo Rule 06.
