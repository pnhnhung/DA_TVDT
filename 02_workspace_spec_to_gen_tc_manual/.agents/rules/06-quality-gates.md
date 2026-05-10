---
trigger: always_on
---

# Rule 06 — Testcase Quality Gates: Coverage + Oracle + Classification

## 6.1 Coverage Gate

Mọi final testcase pack phải có `testcase_coverage_matrix.csv`.

| Status | Định nghĩa |
|---|---|
| `FULL` | Cover đủ theo mức rủi ro |
| `PARTIAL` | Có case nhưng thiếu chiều quan trọng |
| `NOT_COVERED` | Không có TC nào map tới rule |
| `BLOCKED_BY_SPEC_GAP` | Không thể test vì spec mơ hồ |

**Minimum per rule type:** required field (empty/null/valid) | length (min/max/max+1) | numeric (min-1/min/valid/max/max+1) | enum (từng value) | permission (allowed + denied) | state transition (valid + invalid) | integration (source/target/rollback).

**Hard gate:** Không finalize nếu critical confirmed rule ở `NOT_COVERED`.

## 6.2 Oracle Gate

| Level | Định nghĩa |
|---|---|
| `STRONG` | Exact message/status/state confirmed |
| `ACCEPTABLE` | Đủ test, thiếu 1 chi tiết nhỏ |
| `WEAK` | Quá chung chung — không viết assert được |
| `MISSING` | Không có expected result |

**Cấm:** `System works correctly.` / `Error is shown.` / `User cannot continue.` / `Data is invalid.`

**Xử lý WEAK/MISSING — KHÔNG loại TC ngay:**
1. Rewrite từ context spec/test_basis
2. Browser recon trên hệ thống thực
3. Source code investigation
4. Tạo CLARIFICATION REQUEST → QA xác nhận Option A/B/C
5. Chỉ BLOCKED sau khi cả 4 bước đều không đủ

**Oracle phải cover (tùy loại TC):** UI message/state | API status+body | DB record | Permission visibility | Side effect | Transaction consistency | Integration propagation.

**Hard gate:** Không finalize OFFICIAL nếu oracle còn WEAK/MISSING sau điều tra + QA confirm.

## 6.3 TC Classification

| Class | Điều kiện |
|---|---|
| `OFFICIAL` | Confirmed Rule ID + oracle STRONG/ACCEPTABLE + precondition + test data rõ |
| `NEEDS_CLARIFICATION` | Oracle WEAK/MISSING đang chờ điều tra/QA confirm |
| `SUGGESTED` | Behavior hữu ích nhưng inferred |
| `EXPLORATORY` | Risk-based idea, không trace tới confirmed rule |
| `BLOCKED` | Đã điều tra đầy đủ (browser+source+QA), vẫn không rõ |

**Final pack files:** `official_testcases.csv` | `suggested_testcases.csv` | `exploratory_charters.csv` | `blocked_testcases.csv` | `oracle_clarification_requests.csv`
