---
name: playwright-execute-debug-fix
description: Execute Playwright TypeScript Playwright Test POM tests in the real framework, analyze real evidence, debug failures, apply up to three minimal fix attempts, and require user confirmation before the fourth attempt.
---

# Skill — Playwright Execute Debug Fix (TypeScript)

## Goal

Execute → collect evidence → analyze → fix tối đa 3 attempts → escalation nếu cần.

## Inputs

```text
FRAMEWORK_ROOT
production_artifacts/generation_state/<module>/<state_id>/STATE_GENERATION_SUMMARY.md
production_artifacts/review/<module>/<state_id>/generated_source_review.md
production_artifacts/automation_design/framework_contract.md
```

## Rules Bắt Buộc

- `00-common-governance.md`, `03-test-data-first.md`
- `04-locator-and-mcp.md`, `05-playwright-ts-native.md`, `06-execution-debug-fix.md`

---

## Procedure

### 1. Build Run Plan

Xác định scope nhỏ nhất:

```bash
# Chạy một file
TEST_ENV=dev npx playwright test tests/generated/<module>/<tc-id>.generated.spec.ts --project=chromium

# Chạy theo module
TEST_ENV=dev npx playwright test tests/generated/<module>/ --project=chromium

# Chạy theo tag
TEST_ENV=dev npx playwright test --grep @smoke --project=chromium

# Makefile shortcuts
make test-generated ENV=dev
make test-module MODULE=<module> ENV=dev
```

Không chạy full suite nếu có thể scope nhỏ hơn.

### 2. Execute & Collect Evidence

Ghi lại: command, working directory, timestamp, env/config, stdout/stderr, exit code.

Evidence paths:
```text
playwright-report/          ← HTML report
test-results/<env>/         ← JUnit XML, JSON, artifacts
allure-results/<env>/       ← Allure raw results
test-results/<env>/artifacts/<test-name>/trace.zip
test-results/<env>/artifacts/<test-name>/*.png
```

Mở trace để debug chi tiết:
```bash
npx playwright show-trace test-results/dev/artifacts/<path>/trace.zip
```

### 3. Phân Tích Evidence (Thứ Tự Bắt Buộc)

1. **Syntax/import/path/dependency** — TypeScript compile error? Alias path đúng chưa?
2. **Fixture/config/env** — `env.BASE_URL` đúng? `.env` file tồn tại? Fixture name đúng?
3. **Test data/pre-condition** — Data tồn tại? Unique suffix? Dependency data ready?
4. **Locator** — Element có trong DOM? Selector còn match? DOM thay đổi?
5. **Wait/timing** — Element render chưa? Cần `waitForResponse` sau API call?
6. **Assertion/oracle** — Expected text đúng? URL pattern đúng?
7. **App bug** — UI behavior khác expected? Backend error?

Không sửa mò khi evidence chưa đủ.

### 4. Fix Attempts — Sửa Đúng Layer

| Loại Lỗi | Nơi Sửa |
|---|---|
| Locator fail | `src/locators/<module>/<module>.locators.ts` |
| Page method fail | `src/pages/<module>/<module>.page.ts` |
| Fixture missing | `src/fixtures/<module>.fixture.ts` |
| Vue.js input issue | Dùng `clearAndFill()` từ BasePage |
| Data fail | `uniqueSuffix()` trong spec, hoặc pre-condition setup |
| Env/auth fail | Check `config/environments/<env>.env` — KHÔNG sửa spec |
| Import error | Check `tsconfig.json` paths, `package.json` |

**Không sửa assertion để né lỗi.**
**Không thêm `waitForTimeout` để bypass timing.**

### 5. Fix Attempt Template

Mỗi attempt phải có:
```text
root_cause_hypothesis: ...
evidence_support: [trace path / error line / screenshot path]
patch_changed: [file + dòng thay đổi]
verify_command: TEST_ENV=dev npx playwright test <path> --project=chromium
verify_result: PASS / FAIL / NEW_FAILURE
status: fixed | still_failing | need_user_support
```

### 6. Escalation (Sau 3 Attempts Vẫn Fail)

- Dừng auto-fix.
- Tạo escalation note với: URL, screen, step, error, data state.
- Đề xuất hướng: MCP investigation / locator update / data fix / user action.
- Chờ user xác nhận trước attempt thứ 4.

Dùng `playwright-mcp-investigator` khi:
- Locator fail nhưng screenshot/trace không đủ thấy DOM
- Element trong modal/iframe/shadow DOM
- UI state khác expectation nhưng không rõ nguyên nhân

### 7. Cleanup

Sau khi execute/debug xong:
- Xóa file tạm agent tạo trong FRAMEWORK_ROOT
- Giữ lại: trace, screenshot, video, allure-results, production_artifacts/

## Outputs

```text
production_artifacts/execution/<module>/<state_id>/execution_round_0.md
production_artifacts/debug/<module>/<state_id>/failure_analysis.md
production_artifacts/debug/<module>/<state_id>/fix_attempt_1.md ... fix_attempt_3.md
production_artifacts/debug/<module>/<state_id>/execute_debug_fix_summary.md
production_artifacts/debug/<module>/<state_id>/attempt_4_confirmation_required.md (nếu cần)
```
