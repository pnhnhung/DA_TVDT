---
trigger: always_on
---

# Rule 02 — TC Level Mapping: UT / IT / USERCASE

## UT (Unit-level Manual Test)

UT trong workspace này là testcase **manual mức nhỏ**, không phải dev unit test.

Sinh UT cho:
- Field behavior, validation, data type, format
- Local business rule trong một màn hình/action
- Single-screen permission (role allow/deny)
- Single action / single endpoint behavior
- Error message cụ thể
- Local persistence/display sau một action
- Local calculation trong một màn hình

## IT (Integration-level Manual Test)

Sinh IT cho:
- Cross-screen flow (form → detail → list → export/report)
- Cross-module propagation (module A → module B)
- Role handoff (role tạo → role duyệt → role xem kết quả)
- DB/API mapping observable qua màn hình/API/export/report
- Import/export/report/batch/integration
- State transition ảnh hưởng nhiều bước
- Notification/email/event sau action chính
- Duplicate submit/concurrency có side effect hệ thống

## USERCASE

Sinh USERCASE cho:
- User story / acceptance criteria
- Business journey (happy path, alternative path, exception path quan trọng)

Nội dung USERCASE:
- Mô tả nghiệp vụ, KHÔNG mô tả UI click-by-click
- Một UC không quá nhỏ (không chỉ validate 1 field) và không quá lớn (không bao trùm cả phòng ban)
- Nếu có state transition → bắt buộc mô tả trong UC
- Ghi rõ Actor và điều kiện quyền nếu spec có

## Automation Coverage Strategy (Max-Coverage)

| Level | Chiến lược |
|---|---|
| **UT** | Tất cả UT có oracle STRONG/ACCEPTABLE → `READY`. Chỉ `MANUAL_ONLY` cho pure layout/responsive |
| **IT** | 100% IT → `READY` (nếu verify được qua UI/API) |
| **USERCASE** | 100% USERCASE → `READY` (E2E) |

**Pure layout** = testcase CHỈ kiểm tra màu sắc, font, padding, icon position, responsive breakpoint — không liên quan business logic/validation/data/state/permission.
