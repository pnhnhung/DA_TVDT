---
name: playwright-mcp-investigator
description: Use Playwright MCP or browser investigation to inspect live UI/runtime/DOM/accessibility/locator candidates when normal evidence is insufficient or after repeated fix attempts fail.
---

# Skill — Playwright MCP Investigator

## Goal

Dùng MCP Playwright/browser investigation để điều tra UI/runtime/DOM/locator khi evidence thường chưa đủ.

Skill này chỉ dùng để điều tra và tạo patch plan chính xác hơn; không dùng để sửa mò.

## Inputs

```text
FRAMEWORK_ROOT
production_artifacts/debug/<module>/<state_id>/failure_analysis.md
production_artifacts/debug/<module>/<state_id>/fix_attempt_*.md nếu có
failing test command
feature/scenario/step đang fail
app URL/account/env nếu cần
framework contract/mapping
```

## Rules bắt buộc

- `00-common-governance.md`
- `04-locator-and-mcp.md`
- `06-execution-debug-fix.md`

## Procedure

1. Reproduce đúng failure scope, không điều tra lan sang module khác.
2. Inspect runtime state: URL/title, visible text, dialog/modal/toast, visibility/enabled state, accessibility role/name, DOM quanh element fail, console/network error nếu cần.
3. Validate locator candidates theo thứ tự: `get_by_role`, `get_by_label`, `get_by_placeholder`, `get_by_text`, `get_by_test_id`, CSS semantic, XPath cuối cùng.
4. Confirm root cause: locator incorrect/not unique, hidden/disabled, iframe/shadow DOM, timing/state, navigation, session/permission, data, assertion, app bug.
5. Tạo patch plan: file cần sửa, đoạn cần sửa, lý do, rủi ro, command verify lại.

## Outputs

```text
production_artifacts/debug/<module>/<state_id>/mcp_investigation.md
production_artifacts/debug/<module>/<state_id>/locator_candidates.md
production_artifacts/debug/<module>/<state_id>/patch_plan_after_mcp.md
```
