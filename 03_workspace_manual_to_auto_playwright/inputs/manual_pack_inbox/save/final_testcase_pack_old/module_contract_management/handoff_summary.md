# Handoff Summary — Contract Management
> Workflow: 09 | Date: 2026-05-02

## Decision

**READY_FOR_AUTOMATION_PREP**

## Counts

| Type | Count |
|---|---:|
| Official testcase | 21 |
| Suggested testcase | 4 |
| Exploratory charter | 4 |
| Blocked testcase | 2 |

## Open gaps

| Gap | Impact |
|---|---|
| Email template/subject (BR_CONT_015) | Thấp — IT-CONT-010 chỉ verify "received" |
| ReceiptStatus enum mapping (BR_CONT_007) | Trung bình — thiếu per-status boundary |
| Mock QRPF + GMO chưa setup | **Cao** — ~60% TC Mixed bị block triển khai |

## Risks

- **Mock server dependency**: MPM/CPM/Cancel/EC đều cần Mock QRPF (9090) + Mock GMO (9091). Không có Mock → không thể run 70% payment cases.
- **Concurrency**: Double-cancel, double-pay không thể automate bằng Cypress đơn thuần — cần load test setup.
- **Fee priority**: BR_CONT_011 observable chỉ qua App screen — cần Appium/Detox setup.

## Recommended next action

1. **Ngay**: DevOps setup Wiremock QRPF (port 9090) và GMO (port 9091).
2. **Ngay**: Dev confirm ReceiptStatus enum + email template.
3. **Sprint 1 (không cần Mock)**: IT-CONT-001~005 (Contract CRUD).
4. **Sprint 2 (Mock ready)**: IT-CONT-008~014 (Payment + Cancel flows).
5. **Sprint 3**: IT-CONT-015~019 (EC + QR generation).
