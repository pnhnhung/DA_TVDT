---
trigger: always_on
---

# Rule 01 — Source of Truth

Ưu tiên nguồn theo thứ tự:

1. `inputs/source_to_spec_handoff/modules/<module_name>/` — output từ workspace source-to-spec (cấu trúc mới)
2. `inputs/spec_curated/` — spec đã intake/normalize
3. `inputs/spec_inbox/` — tài liệu gốc
4. `inputs/curated/checklists/checklist_refined.csv`
5. `inputs/curated/viewpoints/core_manual_input.csv`
6. `inputs/curated/viewpoints/conditional_packs.csv` — chỉ khi feature có bằng chứng

## Cấu trúc handoff hiện tại (source-to-spec → gen-testcase)

Mỗi module trong handoff có cấu trúc 4 phase:

```
modules/<module_name>/
├─ handoff/          → module_spec_overview.md, rule_catalog.csv, readiness_report.csv, gaps_and_questions.csv
├─ phase1_scan/      → module_scope.md, feature_list.csv, entity_map.csv
├─ phase2_rules/     → field_rules.csv, business_rules.md, state_transitions.md, permissions.csv, integration_points.md, gaps.md
└─ phase3_describe/  → business_context.md, feature_descriptions.md, user_stories.md
```

File global: `modules/global/data_model_map.md`

## Quy tắc sử dụng nguồn

- Không dùng `rule_skill_candidates.csv` làm nguồn testcase trực tiếp.
- Nếu source-to-spec handoff mâu thuẫn với spec gốc, ghi `conflict` và không tự quyết định expected result.
- Nếu `handoff/readiness_report.csv` đánh dấu module là `not-ready`, chỉ sinh testcase draft và ghi limitation.
- Nếu rule trong source-to-spec là `inferred`, testcase sinh ra phải ghi assumption hoặc cần confirm.
- Không tự quay lại đọc source code ở workspace này **trừ khi** đang ở bước WEAK Oracle clarification (WF05 Sub-step 3) hoặc user yêu cầu rõ.
