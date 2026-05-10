---
description: Tạo manifest bàn giao cuối và handoff decision cho Workspace 3. Chạy sau khi WF06 hoàn tất.
---

# /07_handoff

## Agent
- `@coverage_reviewer`

## Required Skills
- `testcase-handoff-packager`

## Điều kiện chạy

Workflow này chỉ được chạy khi WF06 đã hoàn tất toàn bộ output.

## Input
- `production_artifacts/final_testcase_pack/module_<module_name>/official_testcases.csv`
- `production_artifacts/final_testcase_pack/module_<module_name>/suggested_testcases.csv`
- `production_artifacts/final_testcase_pack/module_<module_name>/blocked_testcases.csv`
- `production_artifacts/final_testcase_pack/module_<module_name>/exploratory_charters.csv`
- `production_artifacts/final_testcase_pack/module_<module_name>/automation_readiness_matrix.csv`
- `production_artifacts/final_testcase_pack/module_<module_name>/automation_mapping.csv`
- `production_artifacts/review/module_<module_name>/oracle_clarification_log.csv`

---

## Do this

### 1. Tổng hợp counts

| Type | Count |
|---|---:|
| Official testcase | |
| Suggested testcase | |
| Exploratory charter | |
| Blocked testcase | |
| **Automation READY** | |
| **Automation MANUAL_ONLY** | |
| **Automation BLOCKED** | |

### 2. Top priority automation candidates

Liệt kê top 10 TC theo execution order (Group 1 trước) cần build page object đầu tiên.

### 3. Open gaps còn lại

Liệt kê các blocked TC và lý do — để team có thể track và confirm sau.

### 4. Oracle clarification summary

Tổng kết các TC đã được QA confirm oracle, bao gồm option được chọn.

### 5. Handoff decision

```md
READY_FOR_AUTOMATION_PREP   → ≥ 80% official TC ở trạng thái READY
READY_WITH_RESTRICTIONS     → có blocker kỹ thuật nhưng phần lớn READY
BLOCKED                     → có critical gap chưa giải quyết
```

---

## Output

```text
production_artifacts/final_testcase_pack/module_<module_name>/handoff_summary.md
production_artifacts/final_testcase_pack/module_<module_name>/final_handoff_manifest.csv
```

### handoff_summary.md format

```md
# Handoff Summary — module_<module_name>

## Decision
[READY_FOR_AUTOMATION_PREP / READY_WITH_RESTRICTIONS / BLOCKED]

## Counts
| Type | Count |
|---|---:|
| Official testcase | |
| Suggested | |
| Exploratory | |
| Blocked | |
| Automation READY | |
| Automation MANUAL_ONLY (pure layout) | |

## Top Priority Automation Candidates
[Top 10 TC, ordered by execution group]

## Open Gaps
[Blocked TC list + reason]

## Oracle Clarifications Resolved
[Summary of QA-confirmed oracles]

## Recommended Next Action
[Workspace 3 action items: page objects to build, test data to prepare, env setup needed]
```

### final_handoff_manifest.csv format

```csv
tc_id,title,level,priority,automation_readiness,execution_group,page_objects_needed,test_data_needed,handoff_status,notes
```
