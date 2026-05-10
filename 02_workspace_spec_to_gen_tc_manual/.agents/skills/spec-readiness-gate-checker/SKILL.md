# Skill: spec-readiness-gate-checker

## Mục tiêu

Kiểm tra spec package đầu vào từ `01_workspace_source_to_spec` có được phép dùng để sinh testcase hay không.

Đây là gate ở phía consumer workspace.

## Input

```text
inputs/spec_package_for_testcase/module_<module_name>/
```

Các file kỳ vọng:

```text
module_spec.md
rule_catalog.md
allowed_rules_for_testcase.md
evidence_map.md
cross_module_contracts.md
spec_readiness_report.md
gaps_and_questions.md
```

## Cần kiểm tra

Verify:

- readiness status tồn tại
- allowed Rule IDs tồn tại
- blocked rules được tách riêng
- official rules là confirmed
- evidence map tồn tại
- mỗi rule có evidence reference
- mỗi rule có đủ thông tin để sinh testcase
- UT/IT levels được allow khi applicable

## Output path

```text
production_artifacts/review/module_<module_name>/spec_input_readiness_check.md
```

## Output format

```md
# Spec Input Readiness Check

## Result

ACCEPTED / PARTIAL_ACCEPTED / REJECTED

## Accepted Rule IDs

| Rule ID | Allowed test level | Reason |
|---|---|---|
|  |  |  |

## Rejected / Blocked Rule IDs

| Rule ID | Reason | Required clarification |
|---|---|---|
|  |  |  |

## Missing Required Files

| File | Status | Notes |
|---|---|---|
| module_spec.md | FOUND/MISSING |  |
| rule_catalog.md | FOUND/MISSING |  |
| allowed_rules_for_testcase.md | FOUND/MISSING |  |
| evidence_map.md | FOUND/MISSING |  |
| cross_module_contracts.md | FOUND/MISSING |  |
| spec_readiness_report.md | FOUND/MISSING |  |
| gaps_and_questions.md | FOUND/MISSING |  |
```

## Decision rule

Nếu result là `REJECTED`, không sinh official testcase.

Nếu result là `PARTIAL_ACCEPTED`, chỉ sinh testcase cho accepted Rule IDs.

Nếu result là `ACCEPTED`, tiếp tục workflow sinh testcase bình thường.
