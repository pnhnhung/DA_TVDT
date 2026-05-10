---
description: Execute state trong framework thật, phân tích evidence thật và fix tối đa 3 attempts trước khi cần xác nhận.
---

# /04_execute_debug_fix

## Mục tiêu

Chạy test theo scope nhỏ nhất, debug bằng evidence thật, fix có giới hạn, không sửa mò.

## Agent / Skill / Rule

| Thành phần | Sử dụng |
|---|---|
| Agent | `@execute_debug_fixer` |
| Skill chính | `playwright-execute-debug-fix` |
| Skill hỗ trợ | `playwright-mcp-investigator` nếu thiếu UI/runtime/locator evidence |
| Skill đã gộp | `execution-evidence-analyzer` đã gộp vào `playwright-execute-debug-fix` |
| Rules bắt buộc | `00-common-governance.md`, `03-test-data-first.md`, `04-locator-and-mcp.md`, `05-playwright-ts-native.md`, `06-execution-debug-fix.md` |

## Input

```text
FRAMEWORK_ROOT
production_artifacts/review/<module>/<state_id>/generated_source_review.md
production_artifacts/generation_state/<module>/<state_id>/STATE_GENERATION_SUMMARY.md
production_artifacts/automation_design/framework_contract.md
production_artifacts/automation_design/framework_mapping.md
inputs/app_context/ nếu có
inputs/execution_evidence_inbox/ nếu user cung cấp evidence ngoài
```

## Thực hiện

### 1. Build run plan

Xác định scope nhỏ nhất: module, state id, testcase ids, test file, tag/keyword, command, working directory, env/config, report path.

### 2. Execute round 0

Chạy test trong `FRAMEWORK_ROOT`.

Ghi lại command, working directory, timestamp, env/config, stdout/stderr, exit code, Allure/report path, screenshot/DOM/trace/video nếu có.

### 3. Nếu pass

- Ghi execution summary.
- Đánh dấu state pass.
- Đề xuất chuyển final execute hoặc state tiếp theo.

### 4. Nếu fail

Phân tích theo thứ tự:

1. syntax/import/path/dependency
2. fixture/config/env/session/auth
3. test data/pre-condition/cleanup
4. locator
5. wait/timing/runtime state
6. assertion/oracle
7. app bug hoặc requirement gap

### 5. Fix retry policy

- Tự fix tối đa 2 attempts cho cùng case/lỗi/state.
- Mỗi attempt phải có root cause hypothesis, evidence support, file/đoạn sửa, lý do sửa, command verify lại, kết quả verify.
- Sau attempt thứ 3 vẫn fail:
  - dừng auto-fix
  - phán đoán nguyên nhân còn lại
  - đề xuất giải pháp
  - ghi cần user hỗ trợ gì
  - chờ user xác nhận trước khi execute/fix lần 4 trở đi

### 6. Khi cần MCP Playwright

Dùng MCP khi thiếu DOM/locator evidence, locator fail nhưng screenshot/log không đủ, UI state khác expectation, element hidden/disabled/iframe/shadow DOM, timing/runtime khó phân biệt, fix quá lâu hoặc sau 3 attempts vẫn fail và lỗi liên quan UI/runtime.


## Step 7. Cleanup Temporary Files

### Agent

`automation-executor-debugger`

### Skill

`playwright-execute-debug-fix`

### Rules bắt buộc

- `06-execution-debug-fix.md`
- `00-common-governance.md`

### Thực hiện

Sau khi execute/debug/fix hoàn tất cho state hiện tại:

1. rà soát các file tạm được tạo trong quá trình debug
2. giữ lại evidence cần thiết cho report
3. xóa file tạm không còn cần thiết
4. không xóa source chính hoặc report evidence
5. ghi nhận cleanup vào:

```text
production_artifacts/debug/<module>/<state_id>/cleanup_summary.md


## Output bắt buộc

```text
production_artifacts/execution/<module>/<state_id>/execution_round_0.md
production_artifacts/debug/<module>/<state_id>/failure_analysis.md
production_artifacts/debug/<module>/<state_id>/fix_attempt_1.md
production_artifacts/debug/<module>/<state_id>/verify_attempt_1.md
production_artifacts/debug/<module>/<state_id>/fix_attempt_2.md
production_artifacts/debug/<module>/<state_id>/verify_attempt_2.md
production_artifacts/debug/<module>/<state_id>/fix_attempt_3.md
production_artifacts/debug/<module>/<state_id>/verify_attempt_3.md
production_artifacts/debug/<module>/<state_id>/execute_debug_fix_summary.md
production_artifacts/debug/<module>/<state_id>/attempt_4_confirmation_required.md nếu cần
```

## Quality gate

- Không sửa mò.
- Không dùng sleep cứng.
- Không refactor rộng.
- Không chạy full suite khi lỗi state còn chưa rõ.
- Không execute/fix lần 4 nếu chưa có xác nhận của user.