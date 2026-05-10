# Skill: testcase-coverage-reviewer

## Mục tiêu

Review testcase pack đã sinh và verify xem các confirmed rules đã được cover đầy đủ hay chưa.

Skill này chạy sau bước sinh UT/IT/usecase/manual testcase.

## Input

```text
inputs/spec_package_for_testcase/module_<module_name>/rule_catalog.md
inputs/spec_package_for_testcase/module_<module_name>/allowed_rules_for_testcase.md
production_artifacts/testcase/module_<module_name>/
production_artifacts/manual_pack/module_<module_name>/
```

## Cần review gì

Với mỗi allowed Rule ID, kiểm tra:

- Có ít nhất một testcase không?
- Testcase có trace được về Rule ID không?
- Coverage có phù hợp với rule type không?
- Các chiều positive, negative, boundary, permission, integration có được cover khi applicable không?
- UT và IT có được tách đúng không?
- Blocked cases có được liệt kê rõ không?

## Coverage dimensions

Dùng các dimension sau khi applicable:

```text
positive
negative
boundary
equivalence
permission
state transition
data conflict
integration
rollback
side effect
error handling
audit/log
security
regression
```

## Output path

```text
- `production_artifacts/coverage/module_<module_name>/testcase_coverage_matrix.csv`
- **BẮT BUỘC:** Tuân thủ chuẩn CSV tại [common.md](file:///.agents/rules/common.md) (Encoding UTF-8 no BOM, Quoting...).
```

## Output format

```md
# Testcase Coverage Matrix

## Summary

| Coverage status | Count |
|---|---:|
| FULL |  |
| PARTIAL |  |
| NOT_COVERED |  |
| BLOCKED_BY_SPEC_GAP |  |

## Matrix

| Rule ID | Rule statement | Test level | Covered testcase IDs | Coverage status | Missing cases | Recommendation |
|---|---|---|---|---|---|---|
|  |  | UT/IT/API/UI/E2E |  | FULL/PARTIAL/NOT_COVERED/BLOCKED_BY_SPEC_GAP |  |  |

## Critical Gaps

| Rule ID | Gap | Impact | Required action |
|---|---|---|---|
|  |  |  |  |
```

## Quality bar

Mark là `PARTIAL` nếu:

- chỉ có happy path
- chỉ có UI nhưng API/IT rule cần integration check
- rule limit nhưng thiếu boundary
- permission rule nhưng thiếu denied role
- integration rule nhưng thiếu rollback/consistency check

Mark là `NOT_COVERED` nếu không testcase nào map tới rule.

Mark là `BLOCKED_BY_SPEC_GAP` nếu expected behavior chưa rõ. Đưa ra QA, đề xuất hướng xử lý.

## Hard rule

Không pass final pack nếu có critical confirmed rule ở trạng thái `NOT_COVERED`.
