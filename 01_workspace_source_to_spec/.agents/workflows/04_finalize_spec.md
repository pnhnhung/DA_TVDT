---
description: "[Phase 4] Review quality, kiểm tra readiness và đóng gói handoff package. Bao gồm: evidence verification, cross-module contract check, spec readiness gate."
---

# Workflow 04: /finalize_spec — Phase 4: Review & Đóng Gói

## Agent
`@spec_reviewer`

## Skills
- `derived-spec-reviewer`

## Rules
- `R00-common.md`
- `R02-quality-gates.md`
- `R03-workspace-constraints.md`

## Input
```
production_artifacts/modules/{module_id}/phase1_scan/
production_artifacts/modules/{module_id}/phase2_rules/
production_artifacts/modules/{module_id}/phase3_describe/  (nếu có)
source-system/  (nếu cần verify lại)
```

---

## Step 1 — Evidence Verification

Chạy checklist `derived-spec-reviewer` → Checklist 4.

Với mỗi `confirmed` rule trong `phase2_rules/`:
- Có `source_trace` đầy đủ (file + symbol + line nếu có)?
- Evidence strength là `strong` hoặc `medium`?
- Không dựa vào naming, comment, UI label?

**Xử lý:**
- Rule không đủ evidence → hạ xuống `inferred` hoặc `gap`
- Conflict → ghi vào `gaps.md`
- Rule không có source_trace → không được vào official spec

**Output bắt buộc:**
```
production_artifacts/modules/{module_id}/handoff/evidence_verification_notes.md
```

---

## Step 2 — Module Extraction Completeness Check

Chạy checklist `derived-spec-reviewer` → Checklist 1 + 2.

```
□ Số endpoint trong route file = số feature rows trong feature_list.md?
□ Đã đọc TỪNG FormRequest file (không bỏ sót)?
□ Đã đọc custom Rule class?
□ Mỗi messages() key → có trong field_rules.csv?
□ Mỗi endpoint có middleware → có trong permissions.csv?
□ Service logic → business_rules.md (không chỉ từ Controller)?
```

Nếu còn thiếu → quay lại Phase 2 để bổ sung trước khi tiếp tục.

---

## Step 3 — Cross-Module Contract Verification

Chạy checklist `derived-spec-reviewer` → Checklist 5.

Với mỗi entry trong `integration_points.md`:

| Check | Yêu cầu |
|---|---|
| Source module | Rõ ràng |
| Target module | Rõ ràng |
| Trigger | Xác nhận từ source |
| Data passed | Đặc tả rõ |
| Observable result | Có thể verify |
| Failure modes | Đã ghi |

**Xử lý:**
- Contract chưa rõ → đánh dấu `integration gap` trong `gaps.md`
- Không assume integration behavior nếu thiếu evidence

---

## Step 4 — Tách Allowed / Blocked Rules

```markdown
## Allowed (có thể sinh testcase)
- Status: confirmed
- Evidence: strong hoặc medium
- Behavior: rõ ràng (có actor, trigger, result)

## Blocked (không được sinh testcase chính thức)
- Status: inferred / gap / conflict
- Evidence: weak hoặc không có
- Behavior: chưa rõ hoặc mâu thuẫn
```

---

## Step 5 — Readiness Decision & Action

Áp dụng Rule R02 — Gate 3:

| Readiness | Điều kiện |
|---|---|
| `READY` | Toàn bộ official rules confirmed, behavior rõ, gaps tách riêng |
| `PARTIAL_READY` | Một phần rules confirmed OK, phần còn lại gap/inferred — tách danh sách rõ |
| `NOT_READY` | Thiếu evidence nghiêm trọng, core behavior chưa rõ, module boundary chưa xác định |

---

### Nếu PARTIAL_READY — Thực Hiện Theo Thứ Tự Bắt Buộc

**Bước 5.1 — Điều tra lại source code (tự làm trước)**

```
□ Đọc lại toàn bộ Service layer liên quan đến gap
□ list_dir lại Requests/{Module}/ — kiểm tra có bỏ sót FormRequest không
□ Đọc migration/model xem có constraint bổ sung được không
□ Tìm trong policy, middleware, event, job, config, seed data
□ Grep keyword từ gap description trong toàn module source
```

Nếu điều tra làm rõ được → cập nhật spec, nâng lên `confirmed`, tiếp tục.

**Bước 5.2 — Nếu Bước 5.1 Không Làm Rõ Được: Dừng Lại, Báo Cáo User**

> ⚠️ Không tự suy diễn. Không tiếp tục handoff phần bị block. Chờ user xác nhận.

Với **mỗi gap chưa giải quyết**, tạo báo cáo:

```markdown
## Gap Cần Xác Nhận: [Gap ID]

**Bối cảnh**: [Chức năng này làm gì, tại sao gap này quan trọng]
**Nội dung cần xác nhận**: [Điều đang chưa rõ]
**Đã điều tra**: [Đã đọc file nào, tìm gì, kết quả]
**Câu hỏi cụ thể**:
  - Q1: ...
  - Q2: ...
**Đề xuất xử lý**:
  - Hướng A: [mô tả + ưu/nhược]
  - Hướng B: [mô tả + ưu/nhược]
**Ảnh hưởng nếu bỏ qua**: [testcase nào bị ảnh hưởng, rủi ro gì]
```

**Bước 5.3 — Ghi Tất Cả Gap Vào File Output (Bắt Buộc, Không Được Bỏ Qua)**

Dù gap đã giải quyết hay chưa, mọi gap phải có trong:

```
gaps_and_questions.md  ← ghi gap + trạng thái xử lý + action taken
readiness_report.md    ← blocked rules + lý do + investigation log
```

| Gap ID | Feature | Nội dung | Trạng thái | Action |
|---|---|---|---|---|
| GAP-001 | ... | Chưa rõ ... | Cần xác nhận user | Đã báo cáo, chờ phản hồi |
| GAP-002 | ... | ... | Đã điều tra — không tìm thấy | Cần hỏi BA/PO |

---

### Nếu NOT_READY — Tạo Báo Cáo Đầy Đủ, Không Handoff

**Không được handoff bất kỳ phần nào khi NOT_READY.**

Tạo file `readiness_report.md` với cấu trúc:

```markdown
## Báo Cáo NOT_READY: [module_id]

### Nguyên Nhân
[Liệt kê cụ thể: thiếu gì, boundary chưa rõ điểm nào,
evidence nào không đủ, conflict nào chưa giải quyết]

### Phân Tích
[Tại sao đây là blocker nghiêm trọng — ảnh hưởng gì đến testcase]

### Câu Hỏi Cần Làm Rõ
| Q# | Câu hỏi | Nguồn cần hỏi |
|---|---|---|
| Q1 | ... | BA / PO / Dev |

### Đề Xuất Giải Pháp
| Giải pháp | Mô tả | Effort | Rủi ro |
|---|---|---|---|
| A | Điều tra thêm source | Thấp | Có thể vẫn không đủ |
| B | Hỏi trực tiếp stakeholder | Trung bình | Phụ thuộc lịch |
| C | Skip module tạm thời, ưu tiên module khác | Thấp | Gap không giải quyết |

### Hành Động Tiếp Theo (đề xuất)
[Bước cụ thể, ai làm, deadline nếu có]
```

---

## Step 6 — Đóng Gói Handoff Package

**KHÔNG rewrite hay nén bỏ detailed spec từ Phase 2+3.**
Package chỉ bổ sung thêm: overview, catalog, report, gaps.
Workspace testcase đọc cả Phase 2+3 output trực tiếp.

```
production_artifacts/modules/{module_id}/handoff/
├── module_spec_overview.md          ← tóm tắt nghiệp vụ đọc nhanh
├── rule_catalog.md                  ← bảng tất cả rules + status + evidence
├── readiness_report.md              ← READY/PARTIAL/NOT_READY + allowed/blocked
├── gaps_and_questions.md            ← blockers + câu hỏi cần clarify
└── evidence_verification_notes.md   ← ghi chú evidence review
```

### module_spec_overview.md
```markdown
# Module Spec: [Tên Module]

## Phạm Vi & Mục Đích
[Module này làm gì, phục vụ nghiệp vụ gì]

## Actors & Roles
| Role | Quyền chính |
|---|---|

## Features Chính
| Feature | Mô tả | Source |
|---|---|---|

## Field Rules Quan Trọng
[Các validation constraint quan trọng nhất — không copy toàn bộ CSV]

## Business Rules Quan Trọng
[Tóm tắt các rule nghiệp vụ chính]

## State Transitions (nếu có)
[Sơ đồ hoặc bảng state machine tóm tắt]

## Cross-Module Dependencies
| Module | Relationship | Contract Status |
|---|---|---|

## Out of Scope
[Phần nào không thuộc phạm vi spec hiện tại]

## Gaps & Questions
[Những gì còn chưa rõ — ảnh hưởng gì đến testcase]
```

### rule_catalog.md
```markdown
| Rule ID | Type | Rule Statement | Status | Confidence | Evidence | Note |
|---|---|---|---|---|---|---|
| FR-001 | field | First Name: required, max 30 chars | confirmed | high | source-system/... | |
| BR-001 | business | Employee ID phải unique | confirmed | high | source-system/... | |
| BR-005 | business | [rule] | inferred | low | | Cần xác nhận |
```

Rule Type values: `field`, `business`, `state`, `permission`, `integration`

### readiness_report.md
```markdown
# Spec Readiness Report

**Handoff Status**: READY / PARTIAL_READY / NOT_READY

## Allowed for Testcase Generation
| Rule ID | Allowed Test Levels | Note |
|---|---|---|
| FR-001 | UT, UI, API | |

## Blocked from Testcase Generation
| Rule ID / Gap ID | Reason | Required Clarification |
|---|---|---|
| BR-005 | inferred only | Cần confirm behavior khi X |

## Risk Notes
| Risk | Impact | Mitigation |
|---|---|---|
```

### gaps_and_questions.md
```markdown
| Gap ID | Related Rule ID | Feature | Description | Impact on Testing | Investigation Status | Action |
|---|---|---|---|---|---|---|
| GAP-001 | BR-005 | Create Employee | Chưa rõ behavior khi email trùng | Không thể test duplicate validation | Đã điều tra — không tìm thấy source | Cần xác nhận user |
| GAP-002 | BR-010 | Approve Leave | Logic khi manager vắng | Không thể test approval fallback | Chưa điều tra | Cần điều tra thêm |
```

**Investigation Status values**: `Chưa điều tra` | `Đang điều tra` | `Đã điều tra — không tìm thấy` | `Đã giải quyết`
**Action values**: `Cần điều tra thêm` | `Cần xác nhận user` | `Cần hỏi BA/PO` | `Đã resolve — cập nhật spec` | `Skip — accept risk`

---

## Guardrails
- `module_spec_overview.md` là overview — **không thay thế** detailed spec Phase 2+3.
- Không đưa `inferred` rule vào official rule catalog như `confirmed`.
- Nếu `NOT_READY` → chỉ tạo blocker report, không tạo allowed_rules.
- Không giấu blockers hay conflicts.
- Không xóa gap information khỏi package.

---

## Final Report Format

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
- allowed_rules_count: <n>
- blocked_rules_count: <n>
```
