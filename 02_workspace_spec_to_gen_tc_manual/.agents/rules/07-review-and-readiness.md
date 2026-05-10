---
trigger: always_on
---

# Rule 07 — Review & Automation Readiness Contract

## 7.1 Review Checklist Trước Automation (WF05)

Trước khi finalize pack, phải review:

- Duplicate TC (cùng scenario, khác ID)
- Missing P1 (rule P1 không có TC)
- Missing role coverage (role trong permission matrix không có TC)
- Missing negative path quan trọng (ít nhất 1 per field rule P1)
- UT thiếu boundary/invalid/error message/local persistence
- IT thiếu cross-module/cross-role/data propagation/state transition
- TC không atomic (nhiều điều kiện độc lập trong 1 TC)
- Missing precondition / test data / expected result
- Traceability không rõ (thiếu Rule ID)

## 7.2 Automation Readiness Contract (Max-Coverage)

Manual testcase pack bàn giao automation phải có đủ: TC ID, title, level, priority, precondition, test data cụ thể, steps, expected result (STRONG/ACCEPTABLE), trace (Rule ID), automation_candidate.

**Phân loại automation_candidate:**

| Value | Điều kiện |
|---|---|
| `Yes` | Oracle rõ, không blocker kỹ thuật |
| `Partial` | Có blocker nhỏ (cần setup data/locator/env), logic đã rõ |
| `No` | CHỈ dùng cho pure layout/responsive breakpoint |

**Pure layout (MANUAL_ONLY):**
> Testcase CHỈ kiểm tra: màu sắc, font, padding, icon position, responsive breakpoint, mobile layout — KHÔNG liên quan business logic/validation/data/state/permission.

**Nguyên tắc không vi phạm:**
- KHÔNG dùng `No` cho UT vì "rủi ro thấp" hoặc "P3"
- KHÔNG dùng `No` cho IT nếu verify được qua UI/API
- KHÔNG dùng `No` cho USERCASE
- KHÔNG tự cắt P2/P3 — ghi note để QA quyết định

**Automation readiness status:**

```text
READY              → automate ngay
NEED_TEST_DATA     → cần chuẩn bị test data
NEED_LOCATOR       → cần build page object/locator
NEED_ENV_SETUP     → cần setup env/permission/config
BLOCKED            → dependency ngoài tầm kiểm soát
MANUAL_ONLY        → pure layout/responsive
```

**Execution order (risk-based):**
```text
Group 1: P1 IT (integration, critical flow)
Group 2: P1 UT (validation, required, permission)
Group 3: P2 UT (boundary, edge case)
Group 4: USERCASE (E2E)
Group 5: P2 IT
```
