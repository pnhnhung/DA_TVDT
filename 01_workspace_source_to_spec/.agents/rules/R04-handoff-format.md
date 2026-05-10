# R04 — Handoff Format & Automation Mapping

## 1. CSV Standardization
Tất cả các file handoff kỹ thuật phải được cung cấp dưới dạng CSV để dễ dàng tích hợp vào pipeline automation.
- **Encoding**: UTF-8 (No BOM).
- **Delimiter**: Comma (`,`).
- **Quote**: Dùng dấu nháy kép `"` cho các trường chứa dấu phẩy hoặc ký tự đặc biệt.

## 2. Agent & Skill Mapping (Automation Context)
Khi chuyển sang CSV, cần bổ sung cột để chỉ định Agent và Skill thực hiện kiểm thử.

| Agent | Skill | Phạm vi |
|---|---|---|
| `@ui_automation_agent` | `playwright-ui-test` | Kiểm thử giao diện, form validation, navigation. |
| `@api_automation_agent` | `playwright-api-test` | Kiểm thử REST API, status code, JSON schema. |
| `@security_agent` | `security-audit` | Kiểm thử permissions, SQL injection, Auth. |
| `@integration_agent` | `cross-module-test` | Kiểm thử luồng dữ liệu giữa các module. |

## 3. CSV File Structures

### Rule Catalog (`rule_catalog.csv`)
`Rule ID, Module, Type, Statement, Status, Confidence, Evidence, Automation Agent, Automation Skill`

### Entity Map (`entity_map.csv`)
`Module, Entity, Field, Type, Nullable, Constraint, Source Trace, Status, Automation Agent`

### Feature List (`feature_list.csv`)
`Feature ID, Module, Name, Description, Actors, API/Controller, Status, Primary Agent`

### Readiness Report (`readiness_report.csv`)
`Module, Item, Status, Note, Readiness Level`

### Gaps & Questions (`gaps_and_questions.csv` / `gaps.csv`)
`Module, ID, Topic, Description, Clarification, Status, Blocker Level`

### Integration Points (`integration_points.csv`)
`ID, From Module, To Module, Contract, Logic, Source Trace, Status`

### Field Rules (`field_rules.csv`)
`Rule ID, Module, Entity, Field, Required, Type, Constraints, Defaults, Dependencies, Source Trace, Status, Confidence`

### Business Rules (`business_rules.csv`)
`Rule ID, Module, Feature, Statement, Source Trace, Status, Confidence, Automation Agent, Automation Skill`

### State Transitions (`state_transitions.csv`)
`Rule ID, Module, From State, To State, Action, Condition, Source Trace, Status`

### Permissions (`permissions.csv`)
`permission_id, role, module, action, allowed, data_scope, enforcement_type, source_trace, status, note, Automation Agent, Automation Skill`

## 4. Workflow Mapping
- **UI Workflow**: `navigate → input → submit → verify_toast → verify_db`
- **API Workflow**: `auth → request → verify_status → verify_json_body → verify_db_persistence`
