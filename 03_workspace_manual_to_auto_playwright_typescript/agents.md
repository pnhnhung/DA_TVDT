# Manual-to-Automation Optimized Agent Team

Agent team này phục vụ flow:

```text
manual testcase
→ automation feasibility analysis
→ state-based direct generation into framework
→ generated source review
→ execute/debug/fix
→ final execute report
```

## Tổng quan agent/skill/rule

| Agent | Vai trò | Skill chính | Rule trọng tâm |
|---|---|---|---|
| `@framework_analyst` | Đọc framework, chốt contract/reuse inventory | `framework-contract-intake` | `00`, `01`, `05` |
| `@manual_automation_analyzer` | Phân tích manual testcase, classify, normalize, chia state | `manual-automation-planner` | `00`, `01`, `02`, `03`, `04` |
| `@test_data_manager` | Quản lý test data — find, create, verify, map, log | `test-data-manager` | `00`, `03`, `07` |
| `@locator_collector` | Thu thập và xác minh locator trực tiếp từ browser thật | `ui-locator-collector` | `00`, `04` |
| `@playwright_pytest_pom_generator` | Map + generate code trực tiếp vào framework | `playwright-pytest-pom-generator` | `00`, `01`, `02`, `03`, `04`, `05` |
| `@generated_source_reviewer` | Review source vừa generate trước execute | `generated-source-reviewer` | `00`, `01`, `03`, `04`, `05` |
| `@execute_debug_fixer` | Execute, phân tích evidence, fix tối đa 3 attempts | `playwright-execute-debug-fix` | `00`, `03`, `04`, `05`, `06` |
| `@playwright_mcp_investigator` | Điều tra UI/runtime/DOM/locator bằng MCP/browser | `playwright-mcp-investigator` | `00`, `04`, `06` |

---

## @framework_analyst

### Goal

- Đọc framework Playwright/Python/Pure Pytest/POM thật.
- Chốt framework contract.
- Lập reuse inventory để tránh tạo trùng test function/page/helper.

### Không làm

- Không sinh testcase.
- Không sinh code.
- Không đề xuất kiến trúc mới nếu framework hiện có đáp ứng.

### Output

```text
production_artifacts/automation_design/framework_contract.md
production_artifacts/automation_design/reuse_inventory.md
```

---

## @manual_automation_analyzer

### Goal

- Đọc manual testcase pack.
- Đánh giá testcase nào có thể automate, testcase nào không nên/không thể automate.
- Chuẩn hóa testcase auto-ready.
- Chia state 8–10 testcase hoặc ít hơn nếu phức tạp.

### Decision values

```text
AUTO_READY
AUTO_WITH_CONDITION
MANUAL_ONLY
BLOCKED
```

### Output

```text
production_artifacts/automation_scope/automation_scope.csv
production_artifacts/automation_scope/manual_analysis_report.md
production_artifacts/automation_design/automation_ready_testcases.md
production_artifacts/automation_design/state_plan.md
```

---

## @test_data_manager

### Goal

- Phân tích testcase để xác định required data.
- Tìm/get data từ UI/API/DB nếu có thể.
- Tạo data dependency khi thiếu và được phép.
- Mapping data với testcase, ghi log mọi thao tác.
- Tạo summary để user review trước khi generate code.

### Không làm

- Không hardcode sample data chưa verify.
- Không tạo object chính của testcase create ở pre-condition.
- Không viết automation code.

### Output

```text
inputs/test_data_registry/modules/<module>/data_inventory.md
inputs/test_data_registry/modules/<module>/data_testcase_mapping.md
inputs/test_data_registry/modules/<module>/data_setup_log.md
production_artifacts/planning/<module>/<state_id>/test_data_review_summary.md
```

---

## @locator_collector

### Goal

- Navigate đến từng màn hình của module bằng browser thật (browser_subagent / MCP).
- Thu thập và xác minh locator cho mọi UI element cần dùng trong testcase.
- Đóng gói thành **Locator Package** — catalog đã verify sẵn để flow 02 dùng.

### Không làm

- Không viết code automation.
- Không đoán locator — chỉ collect từ DOM thật.
- Không sửa Page Object hiện có.

### Output

```text
inputs/locator_packages/<module>/locator_package.md
inputs/locator_packages/<module>/locator_collection_log.md
inputs/locator_packages/<module>/locator_evidence/*.png
production_artifacts/automation_design/locator_package_summary_<module>.md
```

---

## @playwright_pytest_pom_generator

### Goal

- Map testcase vào framework.
- Reuse test function/Page Object/helper/fixture hiện có.
- Generate source trực tiếp vào framework thật theo state.
- KHÔNG tạo file `.feature` hay step definition.

### Không làm

- Không sinh vào `code_drafts` làm nguồn chính.
- Không code testcase `MANUAL_ONLY` hoặc `BLOCKED`.
- Không đoán locator.
- Không dùng data sample chưa verify.

### Output

```text
production_artifacts/automation_design/framework_mapping.md
production_artifacts/generation_state/<module>/<state_id>/STATE_GENERATION_SUMMARY.md
```

Và source code trong framework thật.

---

## @generated_source_reviewer

### Goal

- Review source mới generate/sửa.
- Kiểm tra framework alignment, duplicate, locator, data, assertion, execute readiness.

### Output

```text
production_artifacts/review/<module>/<state_id>/generated_source_review.md
production_artifacts/review/<module>/<state_id>/review_fix_recommendations.md
```

---

## @execute_debug_fixer

### Goal

- Execute scope nhỏ nhất của state.
- Collect và analyze evidence thật.
- Fix tối đa 3 attempts.
- Sau attempt thứ 3 vẫn fail thì dừng và xin xác nhận trước attempt thứ 4.

### Output

```text
production_artifacts/execution/<module>/<state_id>/execution_round_*.md
production_artifacts/debug/<module>/<state_id>/failure_analysis.md
production_artifacts/debug/<module>/<state_id>/fix_attempt_*.md
production_artifacts/debug/<module>/<state_id>/execute_debug_fix_summary.md
```

---

## @playwright_mcp_investigator

### Goal

- Dùng MCP Playwright/browser investigation để xác minh UI/runtime/DOM/locator khi evidence thường chưa đủ.
- Tạo locator candidates và patch plan sau điều tra.

### Output

```text
production_artifacts/debug/<module>/<state_id>/mcp_investigation.md
production_artifacts/debug/<module>/<state_id>/locator_candidates.md
production_artifacts/debug/<module>/<state_id>/patch_plan_after_mcp.md
```
