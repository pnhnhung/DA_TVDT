# Source-to-Spec Handoff Input

Đây là nơi đặt output từ workspace `source-to-spec` trước khi chạy workspace gen testcase.

## Cấu trúc khuyến nghị

```text
inputs/source_to_spec_handoff/
├─ modules/
│  ├─ global/
│  │  └─ data_model_map.md
│  └─ <module_name>/
│     ├─ phase1_scan/
│     │  ├─ module_scope.md
│     │  ├─ feature_list.csv
│     │  └─ entity_map.csv
│     ├─ phase2_rules/
│     │  ├─ field_rules.csv
│     │  ├─ business_rules.md
│     │  ├─ state_transitions.md
│     │  ├─ permissions.csv
│     │  ├─ integration_points.md
│     │  └─ gaps.md
│     ├─ phase3_describe/
│     │  ├─ business_context.md
│     │  ├─ feature_descriptions.md
│     │  └─ user_stories.md
│     └─ handoff/
│        ├─ module_spec_overview.md
│        ├─ rule_catalog.csv
│        ├─ readiness_report.csv
│        ├─ readiness_report.md
│        ├─ gaps_and_questions.csv
│        └─ evidence_verification_notes.md
```

## Nguyên tắc

- Chỉ dùng handoff đã review nếu có thể.
- Nếu `readiness_report.csv` ghi `partial-ready`, vẫn có thể sinh testcase nhưng phải giữ gap/assumption.
- Nếu `not-ready`, không nên sinh pack automation-ready.
