---
name: generated-source-reviewer
description: Review source generated directly in the real Playwright TypeScript framework before execution for framework alignment, duplication, locator quality, data strategy, assertions, and run readiness.
---

# Skill — Generated Source Reviewer (TypeScript)

## Goal

Review source vừa generate trong framework **Playwright TypeScript** trước khi execute.

## Inputs

```text
FRAMEWORK_ROOT
production_artifacts/generation_state/<module>/<state_id>/STATE_GENERATION_SUMMARY.md
production_artifacts/automation_design/framework_contract.md
production_artifacts/automation_design/automation_ready_testcases.md
```

## Rules Bắt Buộc

- `00-common-governance.md`, `01-framework-contract-and-reuse.md`
- `03-test-data-first.md`, `04-locator-and-mcp.md`, `05-playwright-ts-native.md`

## Review Checklist

### Framework Alignment
- [ ] Import từ `@fixtures/test` hoặc `@fixtures/<module>.fixture` — KHÔNG từ `@playwright/test`
- [ ] Test file đúng path: `tests/generated/<module>/<tc-id>.generated.spec.ts`
- [ ] Page Object extends `BasePage`, locator từ catalog `src/locators/<module>/`
- [ ] Không có `.feature`, `steps/`, `@given/@when/@then`

### Anti-Patterns (chạy `npm run validate:ai` trước)
| Anti-Pattern | Verdict |
|---|---|
| `page.locator(...)` inline trong spec | ❌ FAIL |
| `waitForTimeout(...)` không có comment | ❌ FAIL |
| `test.only(...)` / `describe.only(...)` | ❌ FAIL |
| Hardcode credentials / URL | ❌ FAIL |
| Import từ `@playwright/test` | ❌ FAIL |
| Thiếu `evidence.runtime()` | ❌ FAIL |

### Traceability
- [ ] Tên test có TC ID: `'TC_MODULE_001 - <title>'`
- [ ] describe có tag: `@generated @<module>`
- [ ] Page Object method có JSDoc `Used for: TC_xxx`

### Locator Quality
- [ ] Ưu tiên: `role > label > testId > placeholder > text > css > xpath`
- [ ] Không XPath tuyệt đối, không dynamic hash class
- [ ] Locator scope đúng container

### Test Data
- [ ] Unique data dùng `uniqueSuffix()`, `uniqueEmail()`
- [ ] Pre-condition data check/setup trước action
- [ ] Không hardcode data có ràng buộc unique

### Assertions & Wait
- [ ] Assertion tại mỗi step quan trọng, đo được nghiệp vụ thực sự
- [ ] Không `waitForTimeout`, dùng `expect().toBeVisible()`
- [ ] Vue.js input: dùng `clearAndFill()` từ BasePage

### Execute Readiness
- [ ] Có `test.describe.skip` wrapper (chờ verify)
- [ ] Lệnh chạy rõ ràng: `TEST_ENV=dev npx playwright test <path> --project=chromium`

## Outputs

```text
production_artifacts/review/<module>/<state_id>/generated_source_review.md
production_artifacts/review/<module>/<state_id>/review_fix_recommendations.md
```

Issue FAIL → yêu cầu fix trước khi execute. Issue WARNING → ghi nhận, tiếp tục.
