---
trigger: always_on
---

# Rule 04 — Locator Strategy & Playwright MCP Escalation

Không đoán locator. Locator phải được xác minh bằng framework/UI/runtime evidence.

## 0. Khi có Locator Package từ flow 01c (ƯU TIÊN CAO NHẤT)

Nếu đã chạy workflow `01c_prepare_locator_package` cho module đang làm việc:

1. **PHẢI đọc** `inputs/locator_packages/<module_slug>/locator_package.md` TRƯỚC KHI làm bất cứ điều gì.
2. Dùng locator từ package — không cần verify lại từ đầu nếu status = `VERIFIED`.
3. Chỉ escalate browser/MCP khi element cần thiết **KHÔNG có trong package** hoặc status = `UNRESOLVED`.
4. Element status = `CONDITIONAL` → document trigger trong Page Object comment, không cần verify lại.

Locator package là nguồn sự thật duy nhất cho module đó. Không dùng locator từ package module khác.

## 1. Thứ tự ưu tiên locator

Ưu tiên theo thứ tự:

1. Accessibility/ARIA semantic: `get_by_role`, `get_by_label`.
2. Test attributes ổn định: `data-testid`, `data-test`, `data-qa`.
3. Placeholder/text ổn định khi đúng ngữ cảnh.
4. ID/name ổn định do hệ thống định nghĩa.
5. CSS selector scoped ngắn, có ý nghĩa.
6. XPath là lựa chọn cuối cùng.

## 1a. Độc lập Locator cho từng màn hình
- Nghiêm cấm dùng chung 1 locator (ví dụ `btn_save`) cho nhiều màn hình hoặc section khác nhau nếu chúng không thuộc cùng 1 Page Object Component duy nhất.
- Tại các màn hình phức tạp (như Recruitment Candidate Detail), phải tách rõ locator theo section:
    - `candidate_profile_save_btn` (Nút Save của thông tin cá nhân).
    - `pipeline_form_save_btn` (Nút Save của các form chuyển trạng thái như Shortlist, Interview).
- Tên locator trong Page Object phải phản ánh rõ phạm vi (scope) của nó.

## 2. Nghiêm cấm nếu có lựa chọn tốt hơn

- XPath tuyệt đối theo vị trí như `//div[3]/div[2]/button`.
- CSS dựa trên class style động/hash.
- `nth-child`, `nth-of-type` cho element nghiệp vụ chính.
- Locator match nhiều element nhưng không scope rõ.
- Locator đoán từ ảnh/tài liệu mà chưa verify DOM/runtime.

## 3. Quy trình xác minh locator

Trước khi đưa locator vào code, phải xác minh:

- Locator match đúng element trong scope.
- Element đúng là thành phần user tương tác/quan sát.
- Reload/navigate lại vẫn match đúng.
- Trạng thái có data/không data/loading không làm locator trỏ sai.
- Với dropdown/list/table/modal, locator phải scope đúng container.

## 4. Khi phải dùng MCP Playwright/browser investigation

Phải dùng MCP Playwright hoặc browser investigation nếu:

- Manual testcase/input không đủ để xác định locator.
- Locator cũ fail và log/screenshot không đủ xác định locator mới.
- Element liên quan tới modal, dropdown, autocomplete, table pagination, iframe, shadow DOM.
- Cần kiểm tra accessibility role/name/visibility/enabled state.
- UI state khác expectation nhưng chưa rõ do data, session, permission, timing hay locator.
- Đã fix 3 attempts nhưng vẫn fail và lỗi liên quan UI/runtime.
- Quá trình fix kéo dài, thiếu dữ kiện hoặc agent không chắc hướng xử lý.

## 5. Khi không cần MCP

Không mở MCP nếu lỗi đã rõ từ evidence thường:

- Syntax/import/path/dependency.
- Missing config/env/dependency.
- Testcase thiếu oracle.
- Chưa chuẩn bị data/account/env.

## 6. Output sau MCP

Khi dùng MCP phải tạo:

```text
production_artifacts/debug/<module>/<state_id>/mcp_investigation.md
production_artifacts/debug/<module>/<state_id>/locator_candidates.md
production_artifacts/debug/<module>/<state_id>/patch_plan_after_mcp.md
```

MCP chỉ dùng để điều tra runtime/DOM/locator, không dùng để sửa mò.
