---
description: Review toàn diện UT/IT/USERCASE pack + Coverage Gate + Oracle Gate + Flag WEAK Oracle để điều tra. Gộp WF05 + WF08.
---

# /05_review_and_gate

## Agent
- `@coverage_reviewer`

## Required Skills
- `manual-pack-reviewer`
- `testcase-coverage-reviewer`
- `testcase-oracle-reviewer`

## Input
- `production_artifacts/testcases/UT/module_<module_name>/ut_manual_testcases.csv`
- `production_artifacts/testcases/UT/module_<module_name>/ut_verification_matrix.csv`
- `production_artifacts/testcases/IT/module_<module_name>/it_manual_testcases.csv`
- `production_artifacts/testcases/IT/module_<module_name>/it_coverage_matrix.csv`
- `production_artifacts/testcases/USERCASE/module_<module_name>/usercases.csv`
- `production_artifacts/analysis/module_<module_name>/coverage_plan.md`
- `production_artifacts/analysis/module_<module_name>/test_basis_index.md`

---

## Sub-step 1 — Review Gap & Duplicate (skill: manual-pack-reviewer)

Kiểm tra toàn bộ pack UT/IT/USERCASE:

- Missing P1 testcase
- Duplicate testcase (cùng scenario, khác ID)
- Missing role coverage (role có trong Permission matrix nhưng chưa có TC)
- Missing negative path quan trọng (ít nhất 1 negative/invalid per field rule P1)
- UT thiếu boundary/invalid/error message/local persistence
- IT thiếu cross-module/cross-role/data propagation/state transition
- Testcase không atomic (kiểm tra nhiều điều kiện trong 1 TC)
- Testcase lẫn mock/HTTP/framework detail
- Traceability không rõ (thiếu Rule ID)
- Missing precondition hoặc test data

Output:
```text
production_artifacts/review/module_<module_name>/manual_gap_report.md
production_artifacts/review/module_<module_name>/traceability_matrix.csv
```

---

## Sub-step 2 — Coverage Gate (skill: testcase-coverage-reviewer)

Map mỗi confirmed Rule ID → TC IDs. Phân loại:

```text
FULL                — đủ positive/negative/boundary theo risk
PARTIAL             — có case nhưng thiếu chiều quan trọng
NOT_COVERED         — không có TC nào
BLOCKED_BY_SPEC_GAP — behavior chưa rõ, không thể test
```

**Hard gate:** Chặn nếu có critical confirmed rule ở trạng thái `NOT_COVERED`.

Output:
```text
production_artifacts/coverage/module_<module_name>/testcase_coverage_matrix.csv
```

---

## Sub-step 3 — Oracle Gate (skill: testcase-oracle-reviewer)

Phân loại oracle mỗi TC:

```text
STRONG     — exact message/status/state/field behavior đã confirmed
ACCEPTABLE — đủ để test, nhưng thiếu 1 chi tiết nhỏ chưa confirmed
WEAK       — quá chung chung, automation không viết assert được
MISSING    — không có expected result
```

### Xử lý WEAK / MISSING — Bắt buộc điều tra trước khi loại

**KHÔNG loại TC ngay khi oracle WEAK/MISSING.**

Thực hiện điều tra theo thứ tự:

**Bước A — Browser Recon (ưu tiên đầu):**
- Dùng browser subagent điều tra behavior thực tế: exact error message, toast text, URL redirect, field state, UI visibility
- Nếu điều tra ra được → rewrite oracle ngay, nâng lên STRONG/ACCEPTABLE

**Bước B — Source Code Investigation (nếu A chưa đủ):**
- Tìm validation logic, error message constants, business rule condition trong codebase
- Nếu tìm ra được → rewrite oracle, nâng lên STRONG/ACCEPTABLE

**Bước C — Tạo CLARIFICATION REQUEST (nếu A+B không đủ):**
Tạo entry trong file `oracle_clarification_requests.csv` theo format bắt buộc sau:

```md
## Oracle Clarification Request — [TC ID]

**Testcase:** [TC ID] — [Tên case]
**Rule ID:** [Rule ID]
**Pre-condition:** [Điều kiện]
**Steps:** [Các bước test]
**Oracle hiện tại (WEAK/MISSING):** "[Text hiện tại hoặc trống]"

**Kết quả điều tra:**
- Phương pháp đã dùng: [Browser recon / Source code / Cả hai]
- Findings: [Mô tả cụ thể những gì tìm được, hoặc "Không xác định được vì [lý do]"]

**Đề xuất Expected Result:**
- Option A: [Mô tả cụ thể, quan sát được trực tiếp trên UI/API]
- Option B: [Mô tả thay thế nếu behavior có thể khác]
- Option C: [Nếu cần thêm lựa chọn]

→ Cần QA xác nhận option nào trước khi finalize TC này.
```

> **BẮT BUỘC:** Sau khi tạo CLARIFICATION REQUEST, DỪNG lại và trình bày toàn bộ
> danh sách clarification cần QA xác nhận. KHÔNG tự quyết định. KHÔNG tiếp tục sang
> WF06 cho đến khi QA đã trả lời tất cả requests.

Output:
```text
production_artifacts/review/module_<module_name>/oracle_clarification_requests.csv
```

---

## Sub-step 4 — Phân loại TC

Sau khi hoàn thành Sub-step 3 (và sau khi QA đã confirm nếu có CLARIFICATION REQUEST):

```text
OFFICIAL            — oracle STRONG/ACCEPTABLE, có Rule ID, có precondition rõ ràng
NEEDS_CLARIFICATION — đang chờ QA confirm oracle (tạm thời, sẽ resolve ở WF06)
BLOCKED             — behavior hoàn toàn không xác định được sau điều tra đầy đủ
SUGGESTED           — behavior inferred, không có spec confirm
```

---

## Output tổng hợp WF05

```text
production_artifacts/review/module_<module_name>/manual_gap_report.md
production_artifacts/review/module_<module_name>/traceability_matrix.csv
production_artifacts/coverage/module_<module_name>/testcase_coverage_matrix.csv
production_artifacts/review/module_<module_name>/testcase_oracle_review.csv
production_artifacts/review/module_<module_name>/oracle_clarification_requests.csv
```

---

## Final Gate Decision

Ghi vào `production_artifacts/review/module_<module_name>/coverage_oracle_gate.md`:

```md
# Coverage & Oracle Gate — module_<module_name>

## Decision
PASS / PASS_WITH_CLARIFICATION / FAIL

## Coverage Gate
- Critical NOT_COVERED rules: [list hoặc None]

## Oracle Gate
- STRONG: X | ACCEPTABLE: X | WEAK: X | MISSING: X
- Clarification requests pending: X

## Required Action Before WF06
- [Danh sách TC cần QA confirm oracle]
- [Danh sách rule cần bổ sung TC]
```

---

## Điều kiện chuyển sang WF06

✅ Coverage Gate PASS (không có critical NOT_COVERED)
✅ Tất cả CLARIFICATION REQUEST đã được QA trả lời
✅ Không còn WEAK/MISSING oracle chưa được xử lý
