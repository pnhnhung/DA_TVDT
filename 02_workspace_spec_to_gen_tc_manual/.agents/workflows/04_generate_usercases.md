---
description: Sinh usercase theo business journey, happy path, alternative path, exception path chính.
---

# /04_generate_usercases

## Agent
- `@usercase_designer`

## Required Skills
- `usecase-generator`
- `risk-based-manual-test-designer`

## Input
- `production_artifacts/analysis/module_<module_name>/spec_digest.md`
- `production_artifacts/analysis/module_<module_name>/feature_inventory.md`
- `production_artifacts/analysis/module_<module_name>/coverage_plan.md`
- `inputs/source_to_spec_handoff/modules/<module_name>/phase2_rules/business_rules.md`
- `inputs/source_to_spec_handoff/modules/<module_name>/phase2_rules/state_transitions.md`
- `inputs/source_to_spec_handoff/modules/<module_name>/phase2_rules/permissions.csv`
- `inputs/source_to_spec_handoff/modules/<module_name>/phase3_describe/user_stories.md`
- `inputs/source_to_spec_handoff/modules/<module_name>/handoff/rule_catalog.csv`

---

## Do this

1. Sinh USERCASE cho business journey chính được xác nhận từ spec/handoff.
2. Mỗi UC cover đúng 1 business goal của 1 actor — không quá nhỏ (validate 1 field → đó là UT), không quá lớn.
3. Bao gồm happy path, key alternative path, exception path rủi ro cao.
4. Nếu UC có state transition → bắt buộc mô tả `state_before → state_after`.
5. Mỗi UC trace về ít nhất 1 business_rule ID hoặc workflow ID.
6. Mô tả nghiệp vụ — KHÔNG mô tả UI click-by-click.
7. Theo Max-Coverage: 100% USERCASE → `automation_candidate = Yes` (E2E).

---

## Guardrails

- Không tạo UC chỉ validate 1 field — đó là UT.
- Không bịa luồng không có evidence trong spec/handoff.
- Không mô tả UI step (click button A, mở trang B) trong UC.
- Khi gặp tình huống không rõ scope (1 journey hay nhiều), dừng lại và xác nhận theo common.md.

---

## Output
- `production_artifacts/testcases/USERCASE/module_<module_name>/usercases.csv`
- `production_artifacts/testcases/USERCASE/module_<module_name>/usecase_gaps.csv`
- **BẮT BUỘC:** Tuân thủ chuẩn CSV tại [common.md](file:///.agents/rules/common.md) (Encoding UTF-8 no BOM, Quoting...).