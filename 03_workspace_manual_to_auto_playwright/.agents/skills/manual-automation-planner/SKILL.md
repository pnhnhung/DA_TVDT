---
name: manual-automation-planner
description: Analyze manual testcases, classify automation feasibility, normalize automation-ready cases, and create state plan for direct Playwright Python Pytest POM generation.
---

# Skill — Manual Automation Planner

## Goal

Gộp hai việc trước đây là `automation-scope-selector` và `automation-ready-normalizer`:

1. Đánh giá testcase nào auto được/không auto được.
2. Chuẩn hóa testcase auto-ready để generator có thể code trực tiếp vào framework.
3. Chia testcase thành state 8–10 case hoặc nhỏ hơn nếu phức tạp.

## Inputs

```text
inputs/manual_pack_inbox/
production_artifacts/automation_design/framework_contract.md
production_artifacts/automation_design/reuse_inventory.md
inputs/app_context/ nếu có
```

## Rules bắt buộc

- `00-common-governance.md`
- `01-framework-contract-and-reuse.md`
- `02-scope-state-readiness.md`
- `03-test-data-first.md`
- `04-locator-and-mcp.md`

## Procedure

1. Đọc manual testcase pack theo module/scope user chỉ định.
2. Với từng testcase, đánh giá:
   - Objective.
   - Preconditions.
   - Steps.
   - Expected/oracle.
   - Data dependency.
   - Unique data risk.
   - Module dependency.
   - Role/account/env.
   - Locator need.
   - DB/API/UI setup need.
   - Stability/flaky risk.
3. Phân loại testcase: `AUTO_READY`, `AUTO_WITH_CONDITION`, `MANUAL_ONLY`, `BLOCKED`.
4. Chuẩn hóa testcase có thể auto thành automation-ready record:
   - testcase ID/title/module/objective.
   - setup/action/assertion.
   - data setup strategy.
   - dependency module setup.
   - unique data strategy.
   - locator verification note.
   - cleanup/idempotent note.
   - traceability note.
5. Chia state:
   - default 8–10 testcase/state.
   - giảm 1–5 testcase/state nếu flow dài hoặc data/locator phức tạp.
6. Không viết source code trong skill này.

## Outputs

```text
production_artifacts/automation_scope/automation_scope.csv
production_artifacts/automation_scope/manual_analysis_report.md
production_artifacts/automation_design/automation_ready_testcases.md
production_artifacts/automation_design/state_plan.md
```

## Cột bắt buộc trong automation_scope.csv

```csv
testcase_id,source_file,module,title,decision,state_id,priority,reason,precondition_data,dependency_module,data_strategy,unique_data_strategy,locator_need,role_account,oracle_strength,stability_risk,db_check_need,mcp_need,action_required
```
