# R02 — Quality Gates & Handoff Readiness

## Gate 1 — Module Extraction Completeness

Chạy checklist này **trước khi báo cáo module done**:

```
□ Số endpoint trong route file = số dòng trong feature_list.md?
□ Đã list_dir Requests/{Module}/ và đọc TỪNG file FormRequest?
□ Đã đọc custom Rule class (App\Rules\...)?
□ Mỗi field trong rules() → có 1 dòng trong field_rules.csv?
□ Mỗi messages() key → có trong error_messages phần của field_rules?
□ Mỗi endpoint có middleware → có dòng trong permissions.csv?
□ Service logic → business_rules.md?
□ Cross-module calls → integration_points.md?
```

**Báo cáo bắt buộc khi done:**
```
MODULE_DONE:
- module_id: <id>
- endpoints_found: <n>
- form_requests_scanned: <n>
- field_rules_rows: <n>
- business_rules_count: <n>
- permission_rows: <n>
- gaps_noted: <n>
```

## Gate 2 — Evidence Verification

Mỗi rule ở trạng thái `confirmed` bắt buộc có:
- Rule ID
- Rule statement (mô tả behavior rõ ràng)
- Source location (file, symbol, line nếu có)
- Evidence type
- Evidence strength (strong / medium / weak)
- Confidence (high / medium / low)
- Status (confirmed / inferred / gap / conflict)

**Hard stop — không handoff nếu:**
- Thiếu evidence map
- Confirmed rule không có source location
- Critical behavior là `unknown`
- Permission behavior không có evidence
- API contract không xác định được request/response

## Gate 3 — Spec Readiness

| Status | Điều kiện |
|---|---|
| `READY` | Module boundary rõ, toàn bộ official rules là `confirmed`, behavior rõ ràng, gaps tách riêng |
| `PARTIAL_READY` | Một số rules confirmed có thể sinh testcase, một số còn `inferred/gap` — tách danh sách allowed/blocked rõ ràng |
| `NOT_READY` | Thiếu evidence, core business rules chưa rõ, module boundary chưa xác định, confirmed/inferred bị trộn |

**Chỉ `READY` và `PARTIAL_READY` (phần allowed) được handoff.**

---

## Action Protocol — PARTIAL_READY

Khi module hoặc feature có trạng thái `PARTIAL_READY`, **bắt buộc** thực hiện theo thứ tự:

### Bước 1 — Điều tra lại source code

Trước khi leo thang lên user, phải tự điều tra lại:

```
□ Đọc lại toàn bộ Service layer liên quan đến gap
□ Kiểm tra có FormRequest nào bị bỏ sót không (list_dir lại)
□ Đọc migration/model để xem có constraint nào bổ sung được không
□ Tìm kiếm trong policy, middleware, event, job liên quan
□ Tìm kiếm trong config, seed data nếu có giá trị default
□ Thử grep keyword từ gap description trong toàn module source
```

Nếu điều tra bổ sung làm rõ được gap → cập nhật spec, nâng status lên `confirmed`, tiếp tục.

### Bước 2 — Nếu Bước 1 Không Làm Rõ Được: Báo Cáo User

**Dừng lại. Không tự suy diễn. Không tiếp tục handoff phần bị block.**

Tạo báo cáo cho từng gap chưa giải quyết được:

```markdown
## Gap Cần Xác Nhận: [Gap ID]

**Bối cảnh**: [Chức năng này làm gì, tại sao gap này quan trọng]
**Nội dung cần xác nhận**: [Mô tả rõ điều đang chưa rõ]
**Đã điều tra**: [Đã đọc những file nào, tìm gì, kết quả ra sao]
**Câu hỏi cụ thể**: [Q1: ...] [Q2: ...]
**Đề xuất xử lý**:
  - Hướng A: [mô tả + ưu/nhược]
  - Hướng B: [mô tả + ưu/nhược]
**Ảnh hưởng nếu bỏ qua**: [testcase nào không thể sinh, rủi ro gì]
```

> **⚠️ Bắt buộc chờ user xác nhận trước khi tiếp tục bước tiếp theo.**

### Bước 3 — Ghi Vào File Output (Bắt Buộc, Không Được Bỏ Qua)

Dù gap được giải quyết hay chưa, mọi gap phải được ghi vào:

```
gaps_and_questions.md  ← ghi tất cả gap + trạng thái xử lý
readiness_report.md    ← blocked rules list + lý do + action taken
```

Format ghi gap:

```markdown
| Gap ID | Feature | Nội dung | Trạng thái | Action |
|---|---|---|---|---|
| GAP-001 | Create Employee | Chưa rõ rule khi email trùng | Cần xác nhận user | Đã báo cáo, chờ phản hồi |
| GAP-002 | Approve Leave | Logic approval khi manager vắng | Đã điều tra — không tìm thấy source | Cần hỏi BA |
```

---

## Action Protocol — NOT_READY

Khi module có trạng thái `NOT_READY`, **không được handoff bất kỳ phần nào**.

Tạo báo cáo đầy đủ:

```markdown
## Báo Cáo NOT_READY: [module_id]

### Nguyên Nhân
[Liệt kê cụ thể: thiếu gì, module boundary chưa rõ điểm nào,
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
| C | Tạm thời skip module, ưu tiên module khác | Thấp | Gap không được giải quyết |

### Hành Động Tiếp Theo (đề xuất)
[Bước cụ thể, ai làm, deadline nếu có]
```

**Chỉ `READY` và `PARTIAL_READY` (phần allowed) được handoff.**


## Handoff Package Required Files

```
production_artifacts/modules/{module_id}/handoff/
├── module_spec_overview.md         ← tóm tắt đọc nhanh
├── rule_catalog.md                 ← bảng tất cả rules + status
├── readiness_report.md             ← READY/PARTIAL/NOT_READY + lý do
├── gaps_and_questions.md           ← blockers + câu hỏi cần clarify
└── evidence_verification_notes.md  ← ghi chú evidence review
```

**Nếu thiếu bất kỳ file nào → ghi `Handoff package is incomplete`.**

## Ưu Tiên Module (Risk-First)

1. Authentication / Authorization
2. Create/Edit flows lưu dữ liệu
3. Approval / state transition
4. Import/Export / batch / notification
5. Search/filter/reporting
