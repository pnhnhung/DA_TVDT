# .agents — AI Agent Brain (Playwright TypeScript Native)

Thư mục này chứa toàn bộ **não bộ điều phối** của AI agent cho framework
**Playwright + TypeScript + Playwright Test Native + POM**.

> ⚠️ Framework này KHÔNG dùng Python, KHÔNG dùng Cucumber/BDD, KHÔNG có `.feature` files.

---

## Cấu Trúc

```text
.agents/
  README.md              ← File này
  rules/                 ← Quy tắc bắt buộc (trigger: always_on)
  skills/                ← Skill packs cho từng tác vụ cụ thể
  workflows/             ← Workflow slash commands (/workflow_name)
```

---

## Rules (Luôn Áp Dụng)

| File | Phạm Vi |
|---|---|
| `00-common-governance.md` | Ngôn ngữ, traceability, output structure, bảo mật |
| `01-framework-contract-and-reuse.md` | Framework TS contract, paths, reuse-first principle |
| `02-scope-state-readiness.md` | AUTO_READY classification, state-based generation |
| `03-test-data-first.md` | Test data strategy, unique suffix, idempotent setup |
| `04-locator-and-mcp.md` | Locator priority, MCP escalation conditions |
| `05-playwright-ts-native.md` | ⭐ TypeScript + Playwright Test code rules (Rule chính) |
| `06-execution-debug-fix.md` | Execute, evidence, debug, fix loop |
| `07-test-data-management.md` | Data inventory, mapping, setup log |

---

## Skills

| Skill | Tác Vụ |
|---|---|
| `framework-contract-intake/` | Đọc framework TS thật, chốt contract + reuse inventory |
| `manual-automation-planner/` | Phân tích manual TC, classify AUTO_READY/MANUAL_ONLY |
| `playwright-ts-pom-generator/` | ⭐ Gen spec TS trực tiếp vào framework theo state |
| `generated-source-reviewer/` | Review source trước execute, check anti-patterns |
| `playwright-execute-debug-fix/` | Execute + debug + fix ≤3 attempts |
| `playwright-mcp-investigator/` | Điều tra DOM/locator/runtime bằng browser thật |
| `test-data-manager/` | Find/create/verify/map test data |
| `ui-locator-collector/` | Thu thập locator từ browser thật |

---

## Workflows (Slash Commands)

| Command | Mục Đích |
|---|---|
| `/00_framework_intake` | Đọc framework TS, chốt contract |
| `/01_analyze_manual_testcases` | Phân tích manual TC, phân loại, chia state |
| `/01b_prepare_test_data` | Chuẩn bị test data trước khi gen code |
| `/01c_prepare_locator_package` | Thu thập locator từ browser thật |
| `/02_generate_auto_direct_to_framework` | Gen spec TS + Page Object trực tiếp |
| `/03_review_generated_source` | Review source trước execute |
| `/04_execute_debug_fix` | Chạy test + debug + fix |
| `/05_final_execute_report` | Final run + báo cáo toàn bộ |

---

## Framework Root

```text
inputs/framework_inbox/source-automation-fw/playwright-typescript/
```

Cấu trúc quan trọng:
```text
src/
  config/env.ts           ← env.BASE_URL, env.TEST_ENV
  core/test-data.ts       ← uniqueSuffix(), uniqueEmail()
  data/users.ts           ← getUserByProfile('admin')
  fixtures/test.ts        ← import { test, expect } from '@fixtures/test'
  locators/<module>/      ← LocatorSpec catalog
  pages/<module>/         ← Page Objects extend BasePage
tests/generated/<module>/ ← AI-generated specs
tools/
  gen-from-json.mjs       ← TC JSON → .generated.spec.ts
  validate-generated-specs.mjs ← Anti-pattern checker
```

---

## Playwright Agents (Tích Hợp Riêng)

Các Playwright MCP Agents nằm tại:
```text
inputs/framework_inbox/source-automation-fw/playwright-typescript/.github/agents/
  playwright-test-planner.agent.md   ← Explore UI → gen test plan
  playwright-test-generator.agent.md ← TC JSON → spec (via browser)
  playwright-test-healer.agent.md    ← Debug + fix failing tests
```

> Các agent này hoạt động **song song** với AI agent ở `.agents/` — không conflict.
> `.agents/` = não bộ lập kế hoạch | `.github/agents/` = tay thực thi browser.
