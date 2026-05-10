# Handoff Summary — System Settings
> Workflow: 09 | Date: 2026-05-02

## Decision

**READY_FOR_AUTOMATION_PREP**

## Counts

| Type | Count |
|---|---:|
| Official testcase | 18 |
| Suggested testcase | 0 |
| Exploratory charter | 2 |
| Blocked testcase | 1 |

## Open gaps

| Gap | Impact |
|---|---|
| CSV encoding chưa confirm (UTF-8 BOM vs Shift-JIS) | Trung bình — IT-SET-018 chỉ verify "file exists" |
| Failed job polling path | Thấp — thiếu 1 negative case |

## Risks

- **Queue Worker dependency**: Toàn bộ async export flow cần Queue Worker chạy trong test env.
- **CSVHelper**: WS3 cần build `CSVHelper.parseAndAssert()` để verify nội dung file CSV.
- **Encoding**: IT-SET-018 blocked cho đến khi confirm encoding.

## Recommended next action

1. **Ngay**: Dev confirm CSV encoding.
2. **Sprint 1**: UT-SET-001/003/004 (button trigger, inline) — READY.
3. **Sprint 1**: IT-SET-008~013 (tenant isolation + permission) — READY.
4. **Sprint 2**: Setup Queue Worker → IT-SET-001~007 (async export flow).
5. Build `CSVHelper` trong WS3 trước Sprint 2.
