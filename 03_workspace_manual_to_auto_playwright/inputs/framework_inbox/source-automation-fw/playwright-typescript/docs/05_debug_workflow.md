# Execute and Debug Workflow

## 1. Chạy generated spec

```bash
npm run validate:ai
npx playwright test tests/generated/<module> --project=chromium
```

## 2. Khi fail

Phân loại lỗi theo nhóm:

| Nhóm lỗi | Dấu hiệu | Cách xử lý |
|---|---|---|
| Locator sai | timeout khi click/fill/expect visible | mở trace, kiểm tra locator, update locator package |
| Data sai | form báo validation, record trùng, quyền thiếu | update test data/precondition |
| Flow sai | đi sai màn, thiếu bước, popup chưa xử lý | update Page Object action |
| Assertion sai | test chạy xong nhưng expect fail | đối chiếu expected result manual |
| App/env lỗi | app 500, network fail, login fail hàng loạt | kiểm tra environment trước khi sửa code |

## 3. Mở report

```bash
npx playwright show-report
```

## 4. Quy tắc fix

- Fix tối đa 2 vòng bằng phân tích trace.
- Nếu vẫn fail, dừng và tạo `debug_notes.md` ghi rõ:
  - testcase ID
  - lỗi hiện tại
  - bằng chứng trace/screenshot
  - giả thuyết nguyên nhân
  - cần người review điểm nào
