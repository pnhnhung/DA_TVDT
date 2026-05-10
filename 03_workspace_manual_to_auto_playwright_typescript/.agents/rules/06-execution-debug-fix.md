---
trigger: always_on
---

# Rule 06 — Execution, Evidence, Debug & Fix Loop

Áp dụng cho mọi workflow execute/debug/fix.

## 1. Debug bằng evidence thật

Chỉ debug dựa trên evidence thật:

- Terminal output.
- Stack trace.
- Pytest output.
- Allure result.
- Screenshot/video/trace.
- DOM snapshot.
- Browser console/network log.
- DB/API evidence nếu liên quan data.

Không sửa code theo cảm tính khi chưa có evidence.

## 2. Thứ tự phân tích lỗi

Phân tích theo thứ tự:

1. Syntax/import/path/dependency.
2. Fixture/config/env/session/auth.
3. Test data/setup/cleanup/pre-condition.
4. Locator sai/không unique/không stable.
5. Wait/timing/runtime state.
6. Assertion/oracle.
7. App bug hoặc requirement gap.

Không nhảy ngay vào sửa locator nếu stack trace cho thấy lỗi import/config/data.

## 3. Scope execute

- Ưu tiên chạy scope nhỏ nhất: test function/tag/keyword/module state.
- Không chạy full suite khi lỗi của state chưa rõ.
- Ghi rõ working directory, command, env/config, timestamp, exit code, report path.

## 4. Fix attempt policy

Một `fix attempt` chỉ được tính khi có thay đổi thực tế vào:

- Locator.
- Wait/state handling.
- Test data/setup/cleanup.
- Assertion/oracle.
- Fixture/config/env/session.
- Step/page/helper integration.

Các hành động sau không tính là fix attempt:

- Chạy lại test mà không sửa gì.
- Chỉ đọc log.
- Chỉ gom thêm screenshot/trace.
- Format/comment không ảnh hưởng logic.

## 5. Giới hạn retry

- **TUYỆT ĐỐI KHÔNG ĐƯỢC TỰ Ý EXECUTE QUÁ 2 LẦN.** Agent thường xuyên vi phạm nguyên tắc này và tự ý chạy quá số lần cho phép. Từ nay, BẮT BUỘC phải dừng lại sau 2 lần fix attempt.
- Tối đa 2 fix attempts cho cùng một lỗi/case/state.
- Sau mỗi attempt phải chạy verify lại đúng phạm vi nhỏ nhất.
- Nếu sau 2 attempts vẫn fail:
  - **DỪNG LẠI NGAY LẬP TỨC.**
  - Trình bày rõ phương án xử lý tiếp theo, đưa ra bối cảnh lỗi, case nào, url nào, step nào, lỗi gì, trạng thái data như thế nào.
  - Dừng sửa theo phỏng đoán.
  - Tạo escalation note.
  - Phán đoán nguyên nhân còn lại và đề xuất hướng xử lý.
  - Ghi rõ cần user hỗ trợ gì.
  - **User là người DUY NHẤT quyết định việc Agent có được thực thi những việc ngoài rule đưa ra hay không.**
  - **Agent chỉ được phép đề xuất. Khi nào User XÁC NHẬN thì Agent MỚI ĐƯỢC THỰC THI attempt thứ 3 hoặc các hành động tiếp theo.**
## 6. Output sau mỗi attempt

Mỗi attempt phải có:

```text
root_cause_hypothesis
evidence_support
patch_changed
verify_command
verify_result
status: fixed | still_failing | new_failure | need_user_support
```

Nếu fix/debug kéo dài hoặc thiếu dữ kiện, phải report sớm cho user.

## Temporary File Cleanup Rule

Trong quá trình execute/debug/fix, nếu agent sinh ra file tạm để điều tra lỗi thì phải xử lý sau khi hoàn tất.

### Nguyên tắc

- Không để lại file tạm trong framework sau khi execute/debug kết thúc.
- Không xóa evidence cần thiết cho report/debug như:
  - execution log
  - traceback
  - screenshot
  - video
  - trace
  - allure-results
  - report trong `production_artifacts/`
- Chỉ xóa file tạm do agent tạo ra hoặc file được xác định rõ là temporary/scratch.
- Trước khi xóa phải đảm bảo thông tin quan trọng đã được ghi nhận vào report/debug summary.

### File/thư mục tạm cần cleanup nếu có

Ví dụ:

```text
tmp_*
*_tmp.*
*.tmp
*.bak
*.orig
*.patch
scratch_*
debug_probe_*
locator_probe_*
__pycache__/
.pytest_cache/
```