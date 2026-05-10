# Handoff Summary — Media & UI
> Workflow: 09 | Date: 2026-05-02

## Decision

**READY_FOR_AUTOMATION_PREP**

## Counts

| Type | Count |
|---|---:|
| Official testcase | 17 |
| Suggested testcase | 2 |
| Exploratory charter | 3 |
| Blocked testcase | 2 |

## Open gaps

| Gap | Impact |
|---|---|
| Gallery size limit (MB) chưa confirm | Trung bình — IT-MED-002 blocked |
| Accepted mimes format chưa confirm | Trung bình — IT-MED-003 blocked |
| TopCategory cascade vs block chưa confirm | Trung bình — IT-MED-007 ở SUGGESTED |
| Favorite soft vs hard delete | Thấp — IT-MED-013 expected result incomplete |

## Risks

- **Test file dependency**: Cần chuẩn bị sẵn file ảnh với đúng kích thước (valid + over-limit) trước khi run.
- **Cross-App/CMS sync**: Gallery upload (CMS) → App visible — cần cả 2 platform hoạt động.
- **Cascade behavior**: IT-MED-007 + IT-MED-013 không thể finalize expected result cho đến khi Dev confirm.

## Recommended next action

1. **Ngay**: Dev confirm gallery size limit + accepted mimes → unblock IT-MED-002/003.
2. **Ngay**: Dev confirm TopCategory cascade/block behavior.
3. **Sprint 1**: IT-MED-005/006 (TopItem invalid categoryId — READY) + IT-MED-011 (cross-service 403 — READY).
4. **Sprint 1**: IT-MED-008/009 (Like/Unlike — core App feature).
5. **Sprint 2**: Setup test files → IT-MED-001~004 (gallery upload).
