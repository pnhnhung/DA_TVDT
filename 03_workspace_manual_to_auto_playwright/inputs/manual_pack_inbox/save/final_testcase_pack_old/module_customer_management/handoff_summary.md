# Handoff Summary — Customer Management
> Workflow: 09 | Date: 2026-05-02

## Decision

**READY_FOR_AUTOMATION_PREP**

## Counts

| Type | Count |
|---|---:|
| Official testcase | 16 |
| Suggested testcase | 3 |
| Exploratory charter | 3 |
| Blocked testcase | 3 |

## Open gaps

| Gap | Impact |
|---|---|
| Card limit chưa confirm | Cao — IT-CUST-005 blocked |
| OTP throttle threshold chưa confirm | Cao — IT-CUST-008 blocked |
| Email change confirm method | Trung bình — IT-CUST-011 thiếu steps |

## Risks

- **Mock GMO 3DS2**: Toàn bộ card management flow (3 TC) cần Mock GMO — không thể implement trên môi trường thật.
- **SMS gateway**: OTP flow cần SMS test gateway hoặc mock — phức tạp setup.
- **Blocked TC**: 3 TC bị block hoàn toàn cho đến khi Dev confirm giá trị cụ thể.

## Recommended next action

1. **Ngay**: Dev confirm card limit + OTP throttle threshold → unblock 2 TC.
2. **Ngay**: Dev confirm email change flow → unblock IT-CUST-011.
3. **Sprint 1**: IT-CUST-010 (READY) + IT-CUST-012 (READY) — implement ngay.
4. **Sprint 2**: Setup Mock GMO 3DS2 → IT-CUST-003~006.
5. **Sprint 3**: Setup SMS mock → IT-CUST-007~009.
