module: admin_job
state_id: state_pay_grade
source_input: automation_ready_testcases.md
framework_root: d:\source_code\antigravity_orange_hrm\03_workspace_manual_to_auto_playwright\inputs\framework_inbox\source-automation-fw\playwright-python-pytest-pom
generated_at: 2026-05-05T19:38:00+07:00
status: generated

# State Generation Summary - `state_pay_grade`

## 1. Scope
- Khởi tạo Page Object `Page_PayGrade.py` sử dụng danh sách locators từ `locator_package.md`.
- Viết mới 7 test cases vào file `tests/test_admin_pay_grade.py`.
- Mục tiêu bao gồm: thao tác CRUD cơ bản cho Pay Grade và thao tác gán/xóa/validation Currency (entity phụ thuộc).

## 2. Framework Contract Alignment
- Kế thừa POM, chia tách các thao tác tương tự State 1.
- Tách test file theo nghiệp vụ (tránh quá tải file `test_admin_job.py`).
- Áp dụng nguyên tắc Data Driven: dùng timestamp/unique hash thông qua helper `expand_unique` tạo sự cô lập giữa các test cases.

## 3. Vue.js Input Synchronization
Áp dụng cơ chế tương tác trực tiếp với Vue.js đã đúc kết được sau quá trình debug chuyên sâu ở State 1:
- Sửa lỗi không nhận dữ liệu trong form qua mẫu (`click` -> chờ 200ms -> `fill("")` -> chờ 200ms -> `press_sequentially` -> `blur` -> chờ 1 giây).
- Đảm bảo Playwright không type quá nhanh dẫn đến Reactivity của UI framework không nhận ra được thay đổi (debounce issue).

## 4. Reusable Methods
- Method mồi data `ensure_pay_grade_exists` được sử dụng để giảm thiểu các block/dependency error trong các case Edit/Delete/Duplicate.
- Các hàm như `wait_for_list_to_load` được sử dụng lại pattern đợi bảng xuất hiện (wait_for visible .oxd-table-body).

## 5. Trạng thái & Next step
- Mã nguồn cho state đã **sẵn sàng để review và execute**. 
- User có thể sử dụng workflow `/03_review_generated_source` và sau đó là `/04_execute_debug_fix` để chạy thử các test cases này.
