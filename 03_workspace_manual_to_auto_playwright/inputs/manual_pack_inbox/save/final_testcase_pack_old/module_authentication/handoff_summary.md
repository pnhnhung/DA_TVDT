# Handoff Summary — Authentication
> Workflow: 09 | Date: 2026-05-02

## Decision

**READY_FOR_AUTOMATION_PREP**

## Counts

| Type | Count |
|---|---:|
| Official testcase | 19 |
| Suggested testcase | 5 |
| Exploratory charter | 4 |
| Blocked testcase | 4 |

## Open gaps

| Gap | Impact |
|---|---|
| Lockout threshold (số lần sai) chưa confirm | Cao — IT-AUTH-005/005b không thể finalize test data |
| OTP TTL chưa confirm | Trung bình — IT-AUTH-015b, IT-AUTH-012b blocked |
| Refresh token behavior chưa detail | Thấp — IT-AUTH-019 ở SUGGESTED |

## Risks

- **Threshold không đúng**: Nếu test với N lần nhưng thực tế là M, lockout case sẽ fail hoặc pass sai.
- **OTP timing**: Nếu TTL rất ngắn, automation cần time-sensitive assertion phức tạp.
- **Mailhog dependency**: OTP + reset password cần Mailhog ổn định trong môi trường test.

## Recommended next action

1. **Ngay**: Dev confirm lockout threshold + OTP TTL + password tạm TTL (1 ngày làm việc).
2. **Sprint 1**: Implement READY cases — IT-AUTH-001~004, IT-AUTH-017, UT-AUTH-009 (6 TC).
3. **Sprint 1**: Setup Mailhog → implement IT-AUTH-010~016 (7 TC).
4. **Sprint 2**: Sau khi confirm TTL → implement IT-AUTH-005~008, IT-AUTH-012 (4 TC).
