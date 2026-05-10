# Handoff Summary — Service Catalog
> Workflow: 09 | Date: 2026-05-02

## Decision

**READY_FOR_AUTOMATION_PREP**

## Counts

| Type | Count |
|---|---:|
| Official testcase | 25 |
| Suggested testcase | 2 |
| Exploratory charter | 3 |
| Blocked testcase | 0 |

## Open gaps

| Gap | Impact |
|---|---|
| Menu unique name rule chưa confirm | Thấp — IT-SERV-017 ở SUGGESTED |
| Subdomain invalid + INACTIVE paths thiếu TC | Thấp — bổ sung 2 TC |
| Empty menu App state chưa verified | Thấp |

## Risks

- **Root module**: Service Catalog là gốc toàn hệ thống. Lỗi ở đây cascade toàn bộ module khác.
- **App + CMS sync**: Toggle Service Status cần cả CMS (toggle) + App (phản ứng) hoạt động đồng thời.
- **ServiceContextSwitcher**: WS3 cần build helper switch tenant để chạy isolation tests hiệu quả.

## Recommended next action

1. **Pilot ưu tiên**: IT-SERV-001 (Subdomain isolation 403) — implement trước, là regression blocker.
2. **Sprint 1**: IT-SERV-001~004 (isolation + role permission + toggle).
3. **Sprint 1**: UT-SERV-002~005 (inline validations — READY ngay).
4. **Sprint 2**: IT-SERV-005~015 (App config, menu, estimate).
5. Build `ServiceContextSwitcher` helper song song với Sprint 1.
