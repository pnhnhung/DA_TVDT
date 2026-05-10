# Skill: testcase-oracle-reviewer

## Mục tiêu

Review và cải thiện expected result để mọi testcase đều có oracle cụ thể, quan sát được và verify được.

Skill này được dùng trong **Sub-step 3 của WF05** (`05_review_and_gate`).

## Input

```text
production_artifacts/testcases/UT/module_<module_name>/ut_manual_testcases.csv
production_artifacts/testcases/IT/module_<module_name>/it_manual_testcases.csv
production_artifacts/testcases/USERCASE/module_<module_name>/usercases.csv
production_artifacts/analysis/module_<module_name>/test_basis_index.md
```

## Cần review gì

Với mỗi testcase, verify chất lượng expected result:

- Expected result có quan sát được không?
- Có đủ cụ thể không?
- Có tránh wording chung chung không?
- Có bao gồm message/status/state/side effect khi applicable không?
- Có tránh bịa value chưa được spec confirm không?
- Có thân thiện cho automation không?

## Oracle quality classification

Chỉ dùng đúng một loại:

```text
STRONG     — exact message/status/state/field behavior đã confirmed (spec hoặc recon hệ thống)
ACCEPTABLE — đủ để test, nhưng thiếu 1 chi tiết nhỏ chưa confirmed (ví dụ: exact error text)
WEAK       — quá chung chung, automation không viết assert được (ví dụ: "system shows error")
MISSING    — không có expected result
```

## Xử lý WEAK / MISSING — Quy trình bắt buộc

**KHÔNG loại hoặc move sang Suggested ngay khi oracle là WEAK/MISSING.**

Thực hiện theo thứ tự:

### Bước A — Rewrite từ context hiện có
Nếu spec/test_basis_index cung cấp đủ thông tin → rewrite oracle ngay, nâng lên STRONG/ACCEPTABLE.

### Bước B — Browser Recon
Nếu chưa đủ → dùng browser subagent kiểm tra behavior thực tế trên hệ thống:
- Exact error message text
- Toast message text
- URL redirect
- Field highlight / field state
- UI element visibility

### Bước C — Source Code Investigation
Nếu B chưa đủ → tìm validation logic, error message constants, business rule condition trong codebase.

### Bước D — Tạo CLARIFICATION REQUEST
Nếu A+B+C không đủ → tạo entry trong `oracle_clarification_requests.csv` theo format bắt buộc:

```md
## Oracle Clarification Request — [TC ID]

**Testcase:** [TC ID] — [Tên case]
**Rule ID:** [Rule ID]
**Pre-condition:** [Điều kiện]
**Steps:** [Các bước test]
**Oracle hiện tại (WEAK/MISSING):** "[Text hiện tại hoặc trống]"

**Kết quả điều tra:**
- Phương pháp đã dùng: [Browser recon / Source code / Cả hai / Chưa điều tra được vì...]
- Findings: [Mô tả cụ thể những gì tìm được]

**Đề xuất Expected Result:**
- Option A: [Mô tả cụ thể, quan sát được]
- Option B: [Mô tả thay thế]
- Option C: [Nếu cần]

→ Cần QA xác nhận option nào trước khi finalize TC này.
```

> **BẮT BUỘC:** Sau khi tạo CLARIFICATION REQUEST, DỪNG lại và trình bày toàn bộ
> danh sách cho QA xác nhận. KHÔNG tự quyết định oracle. KHÔNG finalize TC.

## Output path

```text
- `production_artifacts/review/module_<module_name>/testcase_oracle_review.csv`
- `production_artifacts/review/module_<module_name>/oracle_clarification_requests.csv`
- **BẮT BUỘC:** Tuân thủ chuẩn CSV tại [common.md](file:///.agents/rules/common.md) (Encoding UTF-8 no BOM, Quoting...).
```

## Output format — testcase_oracle_review.csv

```md
# Testcase Oracle Review

## Summary

| Oracle quality | Count |
|---|---:|
| STRONG | |
| ACCEPTABLE | |
| WEAK | |
| MISSING | |

## Review Matrix

| Testcase ID | Related Rule ID | Current expected result | Oracle quality | Issue | Rewritten expected result | Investigation method | Status |
|---|---|---|---|---|---|---|---|
| | | | STRONG/ACCEPTABLE/WEAK/MISSING | | | Browser recon / Source / QA Pending / N/A | PASS/CLARIFICATION_PENDING/FAIL |

## Testcases Requiring Clarification

| Testcase ID | Problem | Investigation done | Status |
|---|---|---|---|
| | | | CLARIFICATION_PENDING |
```

## Rewrite rules

Khi cải thiện expected result:

### Với validation testcase

Bao gồm:

- rejection behavior (không save, không redirect)
- exact error message nếu đã confirmed
- field-level behavior (field highlight, inline error text vị trí)
- response code nếu là API
- data không được tạo/cập nhật (DB level nếu applicable)

### Với permission testcase

Bao gồm:

- allowed/denied result cụ thể
- UI visibility (menu ẩn, button disabled, tab read-only)
- API status code nếu applicable
- không có unauthorized data change

### Với integration testcase

Bao gồm:

- source module result
- target module result (data propagation, state change)
- data consistency (cùng giá trị hiển thị ở module A và module B)
- side effect (notification, email, log entry)
- rollback behavior nếu relevant

### Với USERCASE

Bao gồm:

- outcome cuối của cả journey
- state của đối tượng sau journey
- side effect quan trọng (user created, email sent, status changed)

## Hard rule

Không finalize TC là official nếu oracle vẫn ở WEAK hoặc MISSING sau khi đã điều tra đầy đủ và QA chưa confirm.

Không tự bịa exact message/status khi chưa confirmed — ghi rõ trong clarification request.
