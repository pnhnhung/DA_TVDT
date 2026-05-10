# README — Workspace 01: Source to Spec

> **Vai trò**: Đọc source code → tạo spec có kiểm chứng → bàn giao cho workspace sinh testcase.
>
> **Nguyên tắc cốt lõi**:
> ```
> Không sinh testcase trong workspace này.
> Không biến suy luận thành rule chính thức.
> Không handoff spec nếu chưa qua evidence gate và readiness gate.
> ```

---

## 1. Workspace Này Làm Gì?

Workspace `01_workspace_source_to_spec` nhận **source code** làm đầu vào và tạo ra **derived spec** làm đầu ra.

**Derived spec** là tập hợp các tài liệu mô tả:
- Các field validation rules (required, type, min/max, enum, error message)
- Các business rules (actor, trigger, precondition, expected behavior, side effect)
- Các module, function và chúng tương tác với nhau như thế nào
- State transitions (trạng thái, điều kiện chuyển, actor)
- Role/permission (ai được làm gì, data scope)
- Cross-module integration points (module nào gọi module nào, dữ liệu truyền gì)
- User stories và feature descriptions (để hiểu chức năng phục vụ nghiệp vụ gì)

**Spec đạt chuẩn** khi workspace testcase có thể đọc và sinh test mà **không cần mở lại source gốc**.

---

## 2. Cách Workspace Hoạt Động

### Luồng chính (4 phases)

```
Source Code (source-system/)
        │
        ▼
┌─────────────────────────────────────────────────────┐
│  Phase 1: 01_scan_module                            │
│  Khảo sát cấu trúc, routes, entities, actors        │
│  Agent: @repo_researcher                            │
│  Output: phase1_scan/ (module_scope, feature_list,  │
│          entity_map)                                │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│  Phase 2: 02_extract_module_spec                    │
│  Bóc field rules, business rules, permissions,      │
│  state transitions, integration points              │
│  Agent: @rule_extractor                             │
│  Output: phase2_rules/ (field_rules.csv,            │
│          business_rules.md, permissions.csv, ...)   │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│  Phase 3: 03_describe_spec                          │
│  Viết user stories, feature descriptions,           │
│  business context để workspace testcase hiểu nghiệp vụ│
│  Agent: @rule_extractor                             │
│  Output: phase3_describe/ (user_stories.md,         │
│          feature_descriptions.md, business_context) │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│  Phase 4: 04_finalize_spec                          │
│  Review evidence, cross-check completeness,         │
│  quyết định readiness, đóng gói handoff             │
│  Agent: @spec_reviewer                              │
│  Output: handoff/ (module_spec_overview,            │
│          rule_catalog, readiness_report, gaps)      │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
              Handoff Package
        (Sẵn sàng → workspace testcase)
```

### Lý Do Phase 3 Bắt Buộc

Phase 3 cung cấp **business context** — lý do chức năng tồn tại, ai dùng, để làm gì.
Không có phase này, workspace testcase chỉ biết *validation rules* nhưng không biết *tại sao feature đó cần tồn tại* — dẫn đến testcase thiếu ngữ cảnh hoặc bỏ sót flow quan trọng.

- Phase 3 **không viết Given-When-Then** — workspace testcase tự sinh acceptance criteria.
- Phase 3 **không lặp lại** field rules kỹ thuật — chỉ diễn giải nghĩa nghiệp vụ.

---

## 3. Cấu Trúc Workspace

```
01_workspace_source_to_spec/
│
├── source-system/           ← SOURCE CODE (chỉ đọc, KHÔNG sửa)
│
├── inputs/
│   ├── source_inbox/        ← tài liệu đầu vào bổ sung (spec, PRD, ...)
│   └── reference/           ← tài liệu tham khảo
│
├── production_artifacts/
│   └── modules/
│       ├── global/
│       │   └── data_model_map.md        ← entity relationships toàn hệ thống
│       │
│       └── {module_id}/
│           ├── phase1_scan/
│           │   ├── module_scope.md      ← phạm vi, actors, features, boundary
│           │   ├── feature_list.md      ← danh sách feature/API có source trace
│           │   └── entity_map.md        ← entities, fields, types, relations
│           │
│           ├── phase2_rules/
│           │   ├── field_rules.csv      ← validation rules (required, type, ...)
│           │   ├── business_rules.md    ← business logic có actor/trigger/result
│           │   ├── state_transitions.md ← state machine nếu có
│           │   ├── permissions.csv      ← role/action/allow/deny
│           │   ├── integration_points.md← cross-module contracts
│           │   └── gaps.md              ← inferred / gap / conflict
│           │
│           ├── phase3_describe/         ← mô tả nghiệp vụ (bắt buộc)
│           │   ├── user_stories.md      ← As a / I want / So that
│           │   ├── feature_descriptions.md ← mô tả nghiệp vụ từng feature
│           │   └── business_context.md  ← tóm tắt toàn module
│           │
│           └── handoff/
│               ├── module_spec_overview.md    ← tóm tắt đọc nhanh
│               ├── rule_catalog.md            ← bảng tất cả rules
│               ├── readiness_report.md        ← READY/PARTIAL_READY/NOT_READY
│               ├── gaps_and_questions.md      ← blockers + câu hỏi
│               └── evidence_verification_notes.md
│
├── .agents/
│   ├── rules/               ← 5 rules files (R00–R99)
│   ├── skills/              ← 5 skill folders
│   ├── workflows/           ← 4 workflow files
│   └── (xem mục 4 bên dưới)
│
├── AGENTS.md                ← định nghĩa agents, skills, rules, output paths
└── README.md                ← file này
```

---

## 4. Agent System

### 3 Agents

| Agent | Kích hoạt khi | Workflows |
|---|---|---|
| `@repo_researcher` | Phân tích module mới | `01_scan_module` |
| `@rule_extractor` | Bóc rules, viết descriptions | `02_extract_module_spec`, `03_describe_spec` |
| `@spec_reviewer` | Review và đóng gói | `04_finalize_spec` |

### 4 Workflows

| Workflow | Phase | Mục đích |
|---|---|---|
| `01_scan_module` | 1 | Khảo sát module: routes, entities, actors, features |
| `02_extract_module_spec` | 2 | Bóc rules: field, business, state, permission, integration |
| `03_describe_spec` | 3 | Viết user stories + feature descriptions + business context (bắt buộc) |
| `04_finalize_spec` | 4 | Review evidence + quality gate + đóng gói handoff |

### 5 Skills

| Skill | Dùng trong | Mục đích |
|---|---|---|
| `repo-source-scanner` | Phase 1 | Scan routes, controllers, screens |
| `data-model-mapper` | Phase 1 | Bóc entity, table, relation, enum |
| `source-rule-extractor` | Phase 2 | Bóc field rules, business rules, permissions, integration |
| `behavior-spec-writer` | Phase 3 | Viết user stories, feature descriptions |
| `derived-spec-reviewer` | Phase 4 | Review toàn bộ: evidence, completeness, readiness, handoff |

### 5 Rules

| Rule | Scope |
|---|---|
| `R00-common.md` | Always on — ngôn ngữ, source trace format, status phân loại |
| `R01-source-evidence.md` | Confidence rubric, evidence strength, incremental scan order |
| `R02-quality-gates.md` | Completeness checklist, evidence gate, readiness gate |
| `R03-workspace-constraints.md` | No testcase, no source modification, spec contract |
| `R99-model-routing.md` | Model routing per workflow |

---

## 5. Prompt Mẫu

### 5.1 Bắt đầu phân tích một module mới

```text
Chạy 01_scan_module cho module: {module_name}
module_id: {module_id}

Mục tiêu: khảo sát phạm vi, routes, entities, actors.
Không bóc business rule ở bước này.
Output vào production_artifacts/modules/{module_id}/phase1_scan/
```

### 5.2 Bóc rules từ source

```text
Chạy 02_extract_module_spec cho module: {module_name}
module_id: {module_id}

Input từ: production_artifacts/modules/{module_id}/phase1_scan/
Bóc đầy đủ: field rules, business rules, state transitions,
permissions, integration points.
Ghi gap nếu thiếu evidence — không tự suy diễn.
```

### 5.3 Viết user stories và feature descriptions

```text
Chạy 03_describe_spec cho module: {module_name}
module_id: {module_id}

Input từ: phase1_scan/ và phase2_rules/
Viết user stories theo actor, feature descriptions theo nghiệp vụ.
Giải thích rõ tại sao từng chức năng cần tồn tại và phục vụ ai.
Không viết Given-When-Then — không sinh testcase.
```

### 5.4 Review và đóng gói handoff

```text
Chạy 04_finalize_spec cho module: {module_name}
module_id: {module_id}

Yêu cầu:
- Review toàn bộ evidence.
- Kiểm tra completeness (endpoint count, FormRequest coverage...).
- Verify cross-module contracts.
- Tách allowed rules / blocked rules.
- Kết luận READY / PARTIAL_READY / NOT_READY.
- Đóng gói handoff package vào production_artifacts/modules/{module_id}/handoff/
```

### 5.5 Kiểm tra nhanh trước khi handoff

```text
Kiểm tra spec package hiện tại của module: {module_name}

Trả lời theo format:
1. Handoff status: READY / PARTIAL_READY / NOT_READY
2. Allowed rules (được phép sinh testcase)
3. Blocked rules (lý do)
4. Gaps / questions còn lại
5. Rủi ro nếu vẫn chuyển sang workspace testcase
```

### 5.6 Phân tích và sinh spec toàn diện cho MỘT module (Phase 1 → 4)

```text
Thực hiện phân tích và sinh spec toàn diện cho module: {module_name} (module_id: {module_id}) từ Phase 1 đến Phase 4.
Yêu cầu chạy tuần tự các bước sau, chỉ chuyển sang bước tiếp theo khi bước trước đã hoàn thành chất lượng:
1. Chạy 01_scan_module: Khảo sát phạm vi, routes, entities.
2. Chạy 02_extract_module_spec: Bóc tách field rules, business rules, permissions.
3. Chạy 03_describe_spec: Mô tả business context, user stories.
4. Chạy 04_finalize_spec: Review evidence, đánh giá readiness và đóng gói handoff.
Lưu ý: Tuân thủ nghiêm ngặt R02-quality-gates.md. Không skip lỗi. Báo cáo tóm tắt tiến độ và các GAPs sau mỗi phase.
```

### 5.7 Phân tích và sinh spec cho TOÀN BỘ module trong hệ thống

```text
Thực hiện chiến dịch phân tích và sinh spec toàn diện cho TẤT CẢ các module trong hệ thống.
Yêu cầu thực hiện nghiêm ngặt theo chiến lược "Cuốn chiếu":
1. Lập danh sách các module hiện có trong hệ thống dựa trên source code và xin phép tôi chốt thứ tự ưu tiên.
2. KHÔNG LÀM SONG SONG. Xử lý triệt để TỪNG module một (chạy đủ từ Phase 1 đến Phase 4).
3. Sau khi hoàn tất đóng gói handoff (Phase 4) cho một module, xuất báo cáo Readiness Report và xin phép tôi xác nhận trước khi tiếp tục chuyển sang module tiếp theo.
4. Nếu gặp module có quá nhiều technical block, tạm đánh dấu PARTIAL_READY, ghi nhận Gaps và tiếp tục module khác để không dừng toàn bộ tiến độ.
```

---

## 6. Điều Kiện Handoff & Xử Lý Theo Trạng Thái

### READY
✅ Handoff toàn bộ confirmed spec package sang workspace testcase.

---

### PARTIAL_READY — Bắt Buộc Theo 3 Bước

**Bước 1 — Điều tra lại source code (tự làm trước, không hỏi user ngay)**

```
□ Đọc lại Service layer liên quan đến gap
□ list_dir lại Requests/{Module}/ — có bỏ sót FormRequest không?
□ Đọc migration/model xem có constraint bổ sung được không
□ Tìm trong policy, middleware, event, job, config, seed data
□ Grep keyword từ gap trong toàn module source
```

→ Nếu làm rõ được: cập nhật spec, nâng lên `confirmed`, tiếp tục.

**Bước 2 — Nếu không làm rõ được: dừng lại, báo cáo user**

> ⚠️ Không tự suy diễn. Không tiếp tục handoff phần bị block. Chờ xác nhận.

Mỗi gap chưa giải quyết phải có báo cáo:
- **Bối cảnh**: chức năng làm gì, tại sao gap quan trọng
- **Nội dung cần xác nhận**: điều đang chưa rõ
- **Đã điều tra**: đã đọc file nào, kết quả ra sao
- **Q&A**: câu hỏi cụ thể cần user trả lời
- **Đề xuất hướng xử lý**: Hướng A / Hướng B (ưu nhược điểm)
- **Ảnh hưởng nếu bỏ qua**: testcase nào bị block, rủi ro gì

**Bước 3 — Ghi tất cả gap vào output (bắt buộc, không bỏ qua)**

Dù đã giải quyết hay chưa, mọi gap phải được ghi vào `gaps_and_questions.md` với trạng thái xử lý.
Chỉ handoff **Allowed Rule IDs** — blocked rules giữ lại chờ clarify.

---

### NOT_READY — Không Handoff, Tạo Báo Cáo Đầy Đủ

❌ Không handoff bất kỳ phần nào.

Tạo `readiness_report.md` gồm:
- **Nguyên nhân**: thiếu gì cụ thể, evidence nào không đủ, conflict nào chưa giải quyết
- **Phân tích**: tại sao là blocker nghiêm trọng, ảnh hưởng đến testcase ra sao
- **Q&A**: câu hỏi cần làm rõ, nguồn cần hỏi (BA/PO/Dev)
- **Đề xuất giải pháp**: nhiều hướng với effort và rủi ro
- **Hành động tiếp theo**: bước cụ thể, ai làm

---

### Khi quality gate fail — quay lại phase nào?

| Vấn đề | Phase cần quay lại |
|---|---|
| Thiếu field rule / coverage FormRequest | Phase 2 (`02_extract_module_spec`) |
| Thiếu business rule / service logic | Phase 2 (`02_extract_module_spec`) |
| Thiếu permission row | Phase 2 (`02_extract_module_spec`) |
| Integration point chưa rõ | Phase 2 (`02_extract_module_spec`) |
| Business context chưa rõ cho tester | Phase 3 (`03_describe_spec`) |
| Rule không có source trace | Kiểm tra lại source hoặc đưa vào gap |
| Confirmed/inferred bị trộn lẫn | Phase 4 (`04_finalize_spec`) — tách lại |

---

## 7. Nguyên Tắc Vận Hành

### Nên làm

```
✅ Chọn module rủi ro cao để phân tích trước
✅ Chạy theo thứ tự Phase 1 → 2 → (3) → 4
✅ Ghi gap ngay khi phát hiện thiếu evidence
✅ Luôn list_dir Requests/{Module}/ trước khi bóc field rules
✅ Chỉ handoff phần READY hoặc PARTIAL_READY (allowed rules)
✅ Sau khi workspace testcase phát hiện gap → quay lại bổ sung spec
```

### Không được làm

```
❌ Sinh testcase trong workspace này
❌ Sửa bất kỳ file nào trong source-system/
❌ Nâng inferred thành confirmed khi chưa có evidence mới
❌ Handoff spec khi readiness = NOT_READY
❌ Dùng naming convention / comment / UI label làm strong evidence
❌ Bỏ qua bước list_dir — đây là nguyên nhân hay bỏ sót FormRequest
❌ Scan toàn repo khi user chỉ yêu cầu một module
```

---

## 8. Phân Loại Kết Quả Chuẩn

Mỗi rule trong spec phải được phân loại:

| Status | Nghĩa | Được handoff? |
|---|---|---|
| `confirmed` | Có bằng chứng trực tiếp từ source | ✅ Có |
| `inferred` | Có khả năng đúng, chưa chứng minh trực tiếp | ❌ Chỉ handoff kèm cảnh báo |
| `gap` | Thiếu / mâu thuẫn / không rõ | ❌ Không — ghi vào gaps.md |
| `conflict` | Từ 2+ nguồn mâu thuẫn | ❌ Không — ghi vào gaps.md |

Confidence levels: `high` > `medium` > `low`
Evidence strength: `strong` > `medium` > `weak`

> **Quy tắc vàng**: Chỉ rule `confirmed` + `high/medium confidence` mới được đưa vào official spec.

---

## 9. Kết Luận

Workspace này là **nguồn sự thật có kiểm chứng** — nền tảng cho toàn bộ quá trình tạo testcase.

```
Spec không có evidence thì chưa đáng tin.
Rule chưa confirmed thì không dùng làm official testcase input.
Spec chưa READY thì chưa handoff.
```