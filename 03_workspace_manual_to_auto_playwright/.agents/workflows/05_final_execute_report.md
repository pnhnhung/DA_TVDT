---
description: Final execute để xác nhận toàn bộ testcase automation trong scope/module pass sau khi các state đã hoàn tất.
---

# /05_final_execute_report

## Mục tiêu

Xác nhận toàn bộ automation testcase trong module/scope đã generate đều pass hoặc có trạng thái blocked/manual-only được chấp nhận.

## Agent / Skill / Rule

| Thành phần | Sử dụng |
|---|---|
| Agent | `@execute_debug_fixer` |
| Skill | `playwright-execute-debug-fix` |
| Rules bắt buộc | `00-common-governance.md`, `02-scope-state-readiness.md`, `03-test-data-first.md`, `06-execution-debug-fix.md` |

## Input

```text
FRAMEWORK_ROOT
production_artifacts/generation_state/<module>/
production_artifacts/review/<module>/
production_artifacts/execution/<module>/
production_artifacts/debug/<module>/
production_artifacts/automation_scope/automation_scope.csv
```

## Thực hiện

1. Xác định toàn bộ testcase thuộc module/scope đã generate.
2. Xác định command final execute phù hợp theo module test file, marker/tag, hoặc keyword (`pytest -k`).
3. Execute final scope.
4. Tổng hợp:
   - total manual testcase
   - total generated
   - pass
   - fail
   - skipped
   - manual-only
   - blocked
   - flaky risk
   - report path
   - issue còn tồn tại
5. Nếu fail, không tự mở rộng fix vô hạn; chuyển lại `/04_execute_debug_fix` cho case/state fail cụ thể.

## Output bắt buộc

```text
production_artifacts/final_report/<module>/final_execution_report.md
```

## Quality gate

- Chỉ kết luận hoàn tất khi toàn bộ testcase trong final scope pass hoặc có danh sách blocked/manual-only được user chấp nhận.
- Báo cáo phải trace được testcase ID → @testcase decorator → test function → kết quả execute.
