---
name: derived-spec-reviewer
description: Review toàn bộ spec package (Phase 1+2+3) về evidence, completeness, cross-module contracts và readiness — quyết định handoff package. Bao gồm đầy đủ evidence verification, cross-module contract check và spec readiness gate.
---

# Derived Spec Reviewer

## Goal
Review spec trước khi handoff — đảm bảo spec đủ chất lượng, evidence đủ mạnh, behavior đủ rõ để workspace testcase sinh test an toàn.

## Checklist 1 — Phase 1: Module Scan

```
□ Module boundary rõ ràng — không overlap với module khác?
□ Tất cả endpoint trong route file đã được liệt kê?
□ Entity map có đủ field / type / constraint / relation?
□ Actors và roles đã xác định đầy đủ?
□ Số endpoint trong route file = số feature rows trong feature_list.md?
```

## Checklist 2 — Phase 2: Rules Extraction

### Field Rules
```
□ Đã list_dir Requests/{Module}/ và đọc TỪNG file FormRequest?
□ Đã đọc custom Rule class (App\Rules\...)?
□ Mỗi field trong rules() → có 1 dòng trong field_rules.csv?
□ Conditional rules đã ghi (required_with, required_if, required_unless)?
□ Mỗi messages() key → có trong cột error_message của field_rules.csv?
```

### Business Rules
```
□ Mỗi rule có: actor, trigger, precondition, expected behavior?
□ Side effects đã ghi rõ (nội bộ module)?
□ Không có confirmed rule nào chỉ dựa vào UI label hay naming?
□ Rule từ Service layer — không chỉ từ Controller?
```

### State Transitions
```
□ State field và enum values đầy đủ?
□ Mỗi transition có: trigger, actor, state_before → state_after?
□ Điều kiện transition đã ghi rõ?
```

### Permissions
```
□ Mỗi endpoint có middleware roles:X → có dòng trong permissions.csv?
□ Mỗi action (không chỉ nhóm route) được map riêng?
□ Data scope đã ghi nếu có phân quyền theo dữ liệu?
□ UI visibility và API enforcement đã cross-check?
```

### Integration Points
```
□ Source module và target module rõ ràng?
□ Trigger, data passed, observable result đã xác định?
□ Inferred interactions đã đánh dấu rõ là inferred?
□ Failure modes và integration risks đã ghi?
```

## Checklist 3 — Phase 3: Describe (nếu có)
```
□ Mỗi feature có feature_description rõ ràng (purpose, actor, outcome)?
□ User stories đã viết cho flows chính?
□ Business context tóm tắt đủ cho workspace testcase đọc nhanh?
```

## Checklist 4 — Evidence Verification

Với mỗi `confirmed` rule:
```
□ Có source_trace (file + symbol + line nếu có)?
□ Evidence strength là strong hoặc medium (không phải weak)?
□ Không dựa vào naming convention, comment, hoặc UI label?
□ Conflict nào → đã ghi vào gaps.md?
```

**Hard Stop — Không handoff nếu:**
- Thiếu evidence map (không có source_trace)
- Confirmed rule không có source location
- Critical behavior là `unknown`
- Permission behavior không có evidence
- API contract không có request/response

## Checklist 5 — Cross-Module Contracts

Với mỗi entry trong `integration_points.md`:
```
□ Source module rõ?
□ Target module rõ?
□ Trigger được xác nhận từ source?
□ Data passed rõ ràng?
□ Observable result có thể verify được?
□ Integration risks / failure modes đã ghi?
□ Inferred → đánh dấu là "integration gap"?
```

## Readiness Decision

```markdown
## Evidence Quality Summary

| Status | Count |
|---|---|
| confirmed | |
| inferred | |
| gap | |
| conflict | |

## Readiness Assessment

| Rule ID | Status | Evidence Strength | Behavior Clear? | Allowed? |
|---|---|---|---|---|
| FR-001 | confirmed | strong | yes | ✅ READY |
| BR-005 | inferred | weak | no | ❌ BLOCKED |

## Final Decision: READY / PARTIAL_READY / NOT_READY

**Allowed Rules**: [danh sách rule_id được phép sinh testcase]
**Blocked Rules**: [danh sách rule_id bị block + lý do]
```

## Handoff Package Files (`production_artifacts/modules/{module_id}/handoff/`)

| File | Mô tả |
|---|---|
| `module_spec_overview.md` | Tóm tắt toàn module cho workspace testcase đọc nhanh |
| `rule_catalog.md` | Bảng tất cả rules: ID, type, statement, status, confidence, evidence |
| `readiness_report.md` | READY/PARTIAL_READY/NOT_READY + allowed/blocked list |
| `gaps_and_questions.md` | Blockers, gaps, câu hỏi cần clarify |
| `evidence_verification_notes.md` | Ghi chú evidence review — output bắt buộc của Step 1 |

### module_spec_overview.md template

```markdown
# Module Spec: [Tên Module]

## Phạm Vi & Mục Đích
[Mô tả ngắn gọn module làm gì, phục vụ nghiệp vụ gì]

## Actors & Roles
| Role | Quyền chính |
|---|---|
| Admin | ... |

## Features Chính
| Feature | Mô tả 1 dòng | Source |
|---|---|---|

## Field Rules Quan Trọng
[Các validation constraint quan trọng nhất — không copy toàn bộ CSV]

## Business Rules Quan Trọng
[Các rule nghiệp vụ quan trọng nhất — tóm tắt, không phải copy business_rules.md]

## State Transitions (nếu có)
[Sơ đồ hoặc bảng state machine tóm tắt]

## Cross-Module Dependencies
| Module | Relationship | Contract Status |
|---|---|---|

## Gaps & Questions
[Những gì còn chưa rõ — ảnh hưởng gì đến testcase]
```

### rule_catalog.md template

```markdown
| Rule ID | Type | Rule Statement | Status | Confidence | Evidence ID | Note |
|---|---|---|---|---|---|---|
| FR-001 | field | First Name: required, max 30 | confirmed | high | E-001 | |
| BR-001 | business | Employee ID phải unique | confirmed | high | E-002 | |
```

### readiness_report.md template

```markdown
# Spec Readiness Report

**Handoff Status**: READY / PARTIAL_READY / NOT_READY

## Allowed for Testcase Generation
| Rule ID | Allowed Levels | Note |
|---|---|---|
| FR-001 | UT, UI, API | |

## Blocked
| Rule ID | Reason | Required Clarification |
|---|---|---|
| BR-005 | inferred only | Cần confirm behavior khi ... |

## Risk Notes
| Risk | Impact | Mitigation |
|---|---|---|
```

## Report Format Khi Báo Cáo Done

```
MODULE_DONE_REPORT:
- module_id: <id>
- endpoints_found: <n>
- form_requests_scanned: <n>
- field_rules_rows: <n>
- business_rules_count: <n>
- permission_rows: <n>
- integration_points_count: <n>
- gaps_noted: <n>
- readiness: READY / PARTIAL_READY / NOT_READY
- blocked_rules: <n> rules blocked
```
