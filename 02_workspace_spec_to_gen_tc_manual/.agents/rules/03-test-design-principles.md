---
trigger: always_on
---

# Rule 03 — Test Design Principles

## 3.1 Risk-First Selection

Khi chọn và ưu tiên testcase, theo thứ tự:

1. Security & Access (auth, permission, direct URL)
2. Data Integrity (amount, calculation, persistence)
3. Workflow Continuity (state machine, critical flow)
4. Transaction / Payment / Amount / Calculation
5. Duplicate submit / concurrency / idempotency
6. Import / Export / Report impact
7. Batch / scheduler / notification / external integration
8. Role/permission propagation
9. Search/filter/sort/pagination khi ảnh hưởng dữ liệu hoặc quyền

**Bắt buộc:** P1 và `must_verify_if_applicable=Yes` phải có TC nếu feature tồn tại.
**KHÔNG** tự cắt P2/P3 — ghi note để QA quyết định.

## 3.2 Field Validation Depth

Với mỗi field input (đặc biệt field rủi ro cao), kiểm tra:

- Required / optional / default value
- Valid / invalid partition
- Min / max / boundary (min-1, min, valid, max, max+1)
- Data type, precision/scale/rounding
- Lookup / DB existence / uniqueness
- Cross-field dependency
- Error message cụ thể (nếu spec/handoff có)
- Trimming / normalization / case sensitivity (nếu spec có)
- Downstream business impact

**Field rủi ro cao:** amount, price, rate, tax, identifier, code, date quyết định workflow, password/OTP/token, field quyết định role routing hoặc status transition.

**Không tự bịa min/max/regex nếu spec/handoff không có.**

## 3.3 Generic Test Patterns

Áp dụng khi feature phù hợp, dựa trên evidence từ spec/handoff:

- Required / blank / null
- Valid / invalid partition
- Min / max / boundary / just below / just above
- Precision / scale / rounding
- Enable / disable / readonly / hidden
- Sort / filter / search / pagination
- State transition
- Duplicate submit / double click
- Direct URL access
- Permission allow / deny

Không áp dụng tràn lan nếu không tạo thêm giá trị kiểm thử.

## 3.4 UT Strong Verification

UT phải ưu tiên bao phủ (theo thứ tự):

1. Happy path tối thiểu
2. Required / blank / null nếu field bắt buộc
3. Valid / invalid partition
4. Boundary: min, max, just below, just above
5. Precision / scale / rounding nếu là number/amount/rate
6. Existing / non-existing nếu field lookup/master data
7. Unique / duplicate nếu có rule unique
8. Cross-field dependency nếu cùng màn hình/action
9. Error message đúng field và đúng nội dung nếu spec có message
10. Save/update local persistence: dữ liệu lưu và hiển thị lại đúng
11. Local permission: nút/action/screen allow/deny theo role
12. Security local: password/session/OTP/captcha/direct URL nếu có

**UT không làm:** Không kiểm luồng dài qua nhiều màn hình → chuyển sang IT. Không gộp nhiều boundary vào 1 TC nếu mất tính atomic.

**Output bắt buộc:** `ut_verification_matrix.csv`
```csv
rule_id,testcase_id,module,screen_or_endpoint,field_or_action,verification_type,value_partition,boundary_type,expected_result,trace,status,priority,gap_or_note
```
