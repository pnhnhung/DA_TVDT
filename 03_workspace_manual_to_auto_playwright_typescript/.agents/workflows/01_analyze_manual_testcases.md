---
description: Phân tích manual testcase, đánh giá khả năng automation, chuẩn hóa testcase auto-ready và chia state.
---

# /01_analyze_manual_testcases

## Mục tiêu

Đánh giá testcase nào auto được, testcase nào không thể/không nên auto, chuẩn hóa input cho generator và chia state.

## Agent / Skill / Rule

| Thành phần | Sử dụng |
|---|---|
| Agent | `@manual_automation_analyzer` |
| Skill | `manual-automation-planner` |
| Rules bắt buộc | `00-common-governance.md`, `01-framework-contract-and-reuse.md`, `02-scope-state-readiness.md`, `03-test-data-first.md`, `04-locator-and-mcp.md` |

## Input

```text
inputs/manual_pack_inbox/
production_artifacts/automation_design/framework_contract.md
production_artifacts/automation_design/reuse_inventory.md
inputs/app_context/ nếu có
```

## Thực hiện

1. Đọc manual testcase pack theo module/scope user chỉ định.
2. Đánh giá từng testcase theo objective, pre-condition, steps, expected/oracle, data, dependency module, role/account/env, locator need, DB/API/UI setup, stability risk.
3. Phân loại: `AUTO_READY`, `AUTO_WITH_CONDITION`, `MANUAL_ONLY`, `BLOCKED`.
4. Chuẩn hóa testcase auto được thành record automation-ready: setup/action/assertion, data strategy, dependency setup, unique data strategy, locator note, traceability.
5. Chia state: mặc định 8–10 testcase/state, giảm 1–5 nếu flow phức tạp.
6. Không viết code ở bước này.

## Output bắt buộc

```text
production_artifacts/automation_scope/automation_scope.csv
production_artifacts/automation_scope/manual_analysis_report.md
production_artifacts/automation_design/automation_ready_testcases.md
production_artifacts/automation_design/state_plan.md
```

## Cột bắt buộc cho automation_scope.csv

```csv
testcase_id,source_file,module,title,decision,state_id,priority,reason,precondition_data,dependency_module,data_strategy,unique_data_strategy,locator_need,role_account,oracle_strength,stability_risk,db_check_need,mcp_need,action_required
```

## Quality gate

- Không có testcase mơ hồ trong `AUTO_READY`.
- `AUTO_WITH_CONDITION` phải ghi rõ điều kiện cần xử lý trước khi code.
- `MANUAL_ONLY` và `BLOCKED` phải ghi lý do rõ.
- Data phụ thuộc module khác phải có flow tìm/tạo data phụ thuộc.
- Sau khi hoàn tất, phải chạy **01b** (chuẩn bị data) và **01c** (chuẩn bị locator package) trước khi sang **02** (generate code).
