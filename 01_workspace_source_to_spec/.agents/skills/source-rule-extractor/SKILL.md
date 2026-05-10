---
name: source-rule-extractor
description: Bóc field rules, business rules, state transitions, permissions, API contracts và integration points từ source vào derived spec có evidence, status, confidence.
---

# Source Rule Extractor

## Goal
Chuyển thông tin từ source sang các artifact spec có thể bàn giao cho workspace testcase — không cần mở lại source gốc.

## Instructions

### Field Rules
1. Ưu tiên evidence: FormRequest validator > service validation > schema/entity > DB constraint.
2. `list_dir` thư mục Requests trước — đọc TỪNG file, không bỏ qua file nhỏ.
3. Grep `use App\Rules\` → đọc custom Rule class.
4. Ghi conditional rules: `required_with`, `required_if`, `required_unless`.
5. Ghi error message chính xác từ `messages()`.

### Business Rules
1. Ưu tiên Service/UseCase/Domain layer — không kết luận từ Controller.
2. Gắn đầy đủ: 
   - **actor**: Phải dịch ra role hệ thống (Admin, ESS) hoặc cách cấu hình quyền trên UI cho tester hiểu (VD: "User được set quyền X ở màn hình Roles").
   - **trigger**: Liệt kê TOÀN BỘ các hành động UI/System kích hoạt được logic này để tránh miss case (VD: "Click Save ở màn A", "Import CSV ở màn B").
   - **precondition**, **expected behavior**, **side effect**.
3. Bóc rule create/update/delete/approve/reject/calculate/route.
4. Side effect nội bộ module → ghi vào business_rules.
5. Side effect sang module khác → ghi vào integration_points.

### State Transitions
1. Xác định state field và enum values hợp lệ.
2. Ghi: state_before → trigger (mô tả thao tác UI) → actor → state_after → side effect.

### Permissions
1. Đọc middleware `roles:X` trên route → ghi cho từng action riêng lẻ.
2. Xác định policy/gate check trong Controller/Service.
3. Ghi data_scope nếu user chỉ thấy data của mình.

### Integration Points
1. Xác định service call, event, queue job, shared table sang module khác.
2. Ghi: source_module → target_module → trigger (thao tác UI) → data_passed → observable_result.
3. Nếu chỉ inferred → đánh dấu `inferred`.

## Required Outputs (`production_artifacts/modules/{module_id}/phase2_rules/`)
- `field_rules.csv`
- `business_rules.md`
- `state_transitions.md` (nếu có)
- `permissions.csv`
- `integration_points.md`
- `gaps.md`

## Column Standards

**field_rules.csv**:
```
rule_id, module, screen, field, required, data_type, min, max,
allowed_values, default_value, unique, error_message,
source_trace, status, confidence
```

**business_rules.md** (mỗi rule):
```markdown
### BR-XXX: [tên rule]
- **Actor**: [who]
- **Trigger**: [what action]
- **Precondition**: [điều kiện]
- **Expected Behavior**: [kết quả]
- **Side Effect**: [tác động phụ]
- **Source**: [source_trace]
- **Status**: confirmed / inferred
- **Confidence**: high / medium / low
```
