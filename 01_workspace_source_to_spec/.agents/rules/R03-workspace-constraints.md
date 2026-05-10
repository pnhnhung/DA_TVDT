# R03 — Workspace Constraints & Spec Contract

## Workspace Constraints

1. **Không sinh testcase** — workspace này chỉ sinh spec, không sinh test case manual hay automation.
2. **Không thay đổi source-system/** — chỉ được đọc (`view_file`, `list_dir`, `grep_search`).
3. **Không suy diễn business rule** nếu không có evidence từ source hoặc tài liệu đầu vào.
4. Nếu phát hiện test idea, chỉ ghi là `testing_implication` trong notes — không xuất thành testcase.
5. Nếu không đủ bằng chứng → ghi vào `gaps.md`, không tự hoàn thiện rule.

## Derived Spec Contract

Spec bàn giao phải đủ để workspace testcase **đọc và sinh test mà không cần mở source gốc**.

Mỗi artifact bàn giao phải có:
- `module_id` và phạm vi rõ ràng
- `rule_id` hoặc `record_id` ổn định
- `source_trace` đầy đủ
- `status` và `confidence`
- `note` nếu còn ambiguity

## Behavior Spec Contract (cho Phase 3)

Phase 3 cung cấp business context — không phải test scenario.
Spec Phase 3 phải đủ để tester hiểu:
- **Ai cần** (actor/role)
- **Cần làm gì** (action/chức năng)
- **Để làm gì** (mục đích nghiệp vụ)
- **Điều kiện cần có trước** (preconditions)
- **Kết quả mong đợi ở mức nghiệp vụ** (không phải technical)

Không viết Given-When-Then — workspace testcase tự sinh acceptance criteria.

## Không Handoff Nếu

- Inferred rules được trình bày như official confirmed rules
- Unknown behavior không được ghi rõ là gap
- Rules không có source trace
- Rules không có expected behavior rõ ràng
- Permission behavior không có permission evidence
- Integration behavior không có module contract evidence
