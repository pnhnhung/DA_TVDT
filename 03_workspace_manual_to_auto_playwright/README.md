# Workspace C — Manual Testcase → Automation Code Direct

Workspace này chuyển **manual testcase đã review** thành **automation code chạy được trên framework Playwright + Python + Pure Pytest + POM có sẵn**.

Quan điểm chính:

```text
Sinh code trực tiếp vào framework thật
→ review source vừa sinh
→ execute/debug/fix ngay tại đó
```

Không dùng flow `code_draft → move → execute` làm hướng chính nữa.

---

## 1. Flow chuẩn

| Bước | Workflow | Agent | Skill chính | Output |
|---:|---|---|---|---|
| 0 | `/00_framework_intake` | `@framework_analyst` | `framework-contract-intake` | `framework_contract.md`, `reuse_inventory.md` |
| 1 | `/01_analyze_manual_testcases` | `@manual_automation_analyzer` | `manual-automation-planner` | `automation_scope.csv`, `automation_ready_testcases.md`, `state_plan.md` |
| 1b | `/01b_prepare_test_data` | `@test_data_manager` | `test-data-manager` | `data_inventory.md`, `data_testcase_mapping.md` |
| 1c | `/01c_prepare_locator_package` | `@locator_collector` | `ui-locator-collector` | `locator_package.md`, `locator_evidence/` |
| 2 | `/02_generate_auto_direct_to_framework` | `@playwright_pytest_pom_generator` | `playwright-pytest-pom-generator` | source code trong framework + `STATE_GENERATION_SUMMARY.md` |
| 3 | `/03_review_generated_source` | `@generated_source_reviewer` | `generated-source-reviewer` | `generated_source_review.md` |
| 4 | `/04_execute_debug_fix` | `@execute_debug_fixer` | `playwright-execute-debug-fix` | execution/debug/fix artifacts |
| 5 | `/05_final_execute_report` | `@execute_debug_fixer` | `playwright-execute-debug-fix` | `final_execution_report.md` |

---

## 2. Rule groups

Rule đã được gom lại theo nhóm dễ triển khai:

```text
00-common-governance.md
01-framework-contract-and-reuse.md
02-scope-state-readiness.md
03-test-data-first.md
04-locator-and-mcp.md
05-playwright-python-pytest-pom.md
06-execution-debug-fix.md
07-test-data-management.md
```

### Vì sao gộp như vậy?

- Framework/reuse đi chung vì trước khi code luôn phải biết framework và tái sử dụng thành phần cũ.
- Scope/readiness/state đi chung vì cùng quyết định “case nào được code và code theo batch nào”.
- Data tách riêng vì đây là rủi ro lớn nhất khi automation chạy lại nhiều lần.
- Locator/MCP đi chung vì MCP chủ yếu phục vụ xác minh UI/runtime/locator.
- Pytest POM tách riêng để kiểm soát code style (Pure Pytest + Page Object).
- Execution/debug/fix gom toàn bộ evidence analysis và retry policy.

---

## 3. Skill đã tối ưu

Skill cũ được gộp để workflow ngắn hơn:

```text
automation-scope-selector + automation-ready-normalizer
→ manual-automation-planner

playwright-bdd-mapper + playwright-bdd-generator
→ playwright-pytest-pom-generator

execution-evidence-analyzer
→ playwright-execute-debug-fix

playwright-bdd-code-reviewer
→ generated-source-reviewer
```

Kết luận: `execution-evidence-analyzer` không cần giữ riêng trong flow này, vì phân tích evidence là một phần bắt buộc của execute/debug/fix.

---

## 4. Cấu trúc input/output

```text
inputs/
  framework_inbox/
    source-automation-fw/
      playwright-python-pytest-pom/
  framework_contract/
  manual_pack_inbox/
  app_context/
  execution_evidence_inbox/
  reference/
  locator_packages/
  test_data_registry/

production_artifacts/
  automation_scope/
  automation_design/
  generation_state/<module>/<state_id>/
  review/<module>/<state_id>/
  execution/<module>/<state_id>/
  debug/<module>/<state_id>/
  final_report/<module>/
```

---

## 5. Prompt khởi động gợi ý

### Bước 0

```text
Hãy chạy workflow /00_framework_intake.
FRAMEWORK_ROOT = inputs/framework_inbox/source-automation-fw/playwright-python-pytest-pom
Mục tiêu: đọc framework thật, chốt framework contract và reuse inventory.
Không sinh testcase/code ở bước này.
```

### Bước 1

```text
Hãy chạy workflow /01_analyze_manual_testcases cho module {module_name}.
Input manual testcase nằm trong inputs/manual_pack_inbox.
Đánh giá rõ AUTO_READY, AUTO_WITH_CONDITION, MANUAL_ONLY, BLOCKED.
Chuẩn hóa testcase auto-ready và chia state 8–10 case.
Không viết code ở bước này.
```

### Bước 2

```text
Hãy chạy workflow /02_generate_auto_direct_to_framework cho module {module_name}, state {state_id}.
FRAMEWORK_ROOT = inputs/framework_inbox/source-automation-fw/playwright-python-pytest-pom
Đọc locator package tại inputs/locator_packages/{module_name}/locator_package.md trước khi generate.
Sinh code trực tiếp vào framework thật (Pure Pytest + POM, KHÔNG tạo .feature hay step definition).
Sau khi xong state này, report file đã tạo/sửa và chờ tôi xác nhận.
```

### Bước 4

```text
Hãy chạy workflow /04_execute_debug_fix cho module {module_name}, state {state_id}.
Chạy scope nhỏ nhất có thể.
Nếu fail, phân tích evidence thật và tự fix tối đa 3 attempts.
Nếu sau attempt thứ 3 vẫn fail, dừng lại, report nguyên nhân/giải pháp/cần tôi hỗ trợ gì, và chờ xác nhận trước khi execute/fix lần 4.
```

---

## 6. Definition of Done cho một state

Một state chỉ hoàn tất khi:

- Testcase đã được phân loại automation scope rõ.
- Data pre-condition đã được kiểm tra hoặc có strategy tạo data ổn định.
- Locator Package đã được collect từ browser thật (flow 01c), không đoán locator.
- Source code đã generate trực tiếp vào đúng test file/page object trong framework.
- Source review pass hoặc issue đã được fix.
- Execute scope nhỏ nhất pass.
- Nếu có lỗi, đã có failure analysis và fix attempts rõ.
- Có state summary trace testcase ID → @testcase decorator → source → execution result.
