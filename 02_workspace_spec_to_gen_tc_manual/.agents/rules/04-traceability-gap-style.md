---
trigger: always_on
---

# Rule 04 — Traceability, Gap Handling & TC Style

## 4.1 Traceability

Mỗi testcase phải trace tối thiểu về một trong:

- `source-to-spec handoff file + rule ID`
- `spec section / story / AC / rule ID`
- `input_id` trong checklist
- `vp_id` trong viewpoint

**Ví dụ trace tốt:**
```text
business_rules.md#BR-003
field_rules.csv#FR-CREATE-ORDER-DISCOUNT-001
workflows_and_state_transitions.md#WF-ORDER-APPROVAL
checklist_refined.csv#CL-08-03
```

## 4.2 Gap / Assumption / Conflict

- Spec chưa đủ rõ để viết expected result → đưa vào `Gap / Open Question`
- Phải giả định → ghi `Assumption`, không biến assumption thành expected result chắc chắn
- Mâu thuẫn → ghi `Conflict`, tạo testcase draft hoặc hold

## 4.3 TC Style & Format

- Output bằng Tiếng Việt. Giữ nguyên tên field/role/endpoint/màn hình nếu là định danh hệ thống.
- Một testcase chỉ bao phủ **một điều kiện kiểm** chính (atomic).
- `Expected Result` phải: quan sát được, đo được, đủ rõ để viết assertion automation.
- Tránh: `hợp lệ`, `đi tiếp`, `mượt mà`, `ổn định`, `qua bước xác thực`.
- Không lẫn mock/stub/internal hook/HTTP status nếu không cần thiết.
- **Anti-condensation:** KHÔNG gộp các màn hình/thực thể có cấu trúc giống nhau vào chung 1 bộ TC. Ví dụ: Skill, Education, License phải có TC CRUD riêng biệt.

**Format TC bắt buộc:**

| Field | Mô tả |
|---|---|
| TC ID | Định danh duy nhất |
| Title | Ngắn, rõ |
| Level | UT / IT / USERCASE |
| Priority | P1 / P2 / P3 |
| Risk Domain | Security / DataIntegrity / Workflow / ... |
| Trace | Rule ID / spec ref |
| Preconditions | Điều kiện trước |
| Test Data | Dữ liệu cụ thể, không chung chung |
| Steps | Các bước thực hiện |
| Expected Result | Oracle STRONG/ACCEPTABLE |
| Gap / Assumption | Nếu có |
