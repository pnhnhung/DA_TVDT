---
name: usecase-generator
description: Sinh USERCASE theo business journey — happy path, alternative path, exception path. Tập trung mô tả nghiệp vụ, KHÔNG mô tả UI click-by-click. Dùng trong WF04.
---

# Use Case Generator

## Goal
Chuyển confirmed business rules, workflows và role matrix thành USERCASE traceable — đủ mạnh để dùng làm E2E automation test sau này.

## Input Priority
1. `inputs/source_to_spec_handoff/modules/<module_name>/phase2_rules/business_rules.md`
2. `inputs/source_to_spec_handoff/modules/<module_name>/phase2_rules/state_transitions.md`
3. `inputs/source_to_spec_handoff/modules/<module_name>/phase2_rules/permissions.csv`
4. `inputs/source_to_spec_handoff/modules/<module_name>/phase3_describe/user_stories.md`
5. `inputs/source_to_spec_handoff/modules/<module_name>/handoff/rule_catalog.csv`
6. `production_artifacts/analysis/module_<module_name>/spec_digest.md`
7. `production_artifacts/analysis/module_<module_name>/feature_inventory.md`
8. `production_artifacts/analysis/module_<module_name>/coverage_plan.md`

## Instructions

### 1. Xác định scope USERCASE
- Đọc `coverage_plan.md` để biết feature/workflow nào cần USERCASE.
- Chỉ sinh UC cho confirmed business journey — không tự bịa luồng không có evidence.
- Mỗi UC phải trace về ít nhất 1 business_rule ID hoặc workflow ID.

### 2. Quy tắc thiết kế UC bắt buộc

**Quy mô đúng:**
- Không quá nhỏ: Không tạo UC chỉ để validate 1 field — đó là UT.
- Không quá lớn: Không bao trùm cả quy trình liên phòng ban trong 1 UC.
- Một UC = 1 business goal của 1 actor cụ thể.

**Mô tả nghiệp vụ, không mô tả UI:**
- ✅ "Người dùng hoàn tất đăng ký nhân viên mới với đầy đủ thông tin bắt buộc"
- ❌ "Người dùng click button Save, hệ thống hiển thị toast message"

**State transition bắt buộc:**
- Nếu UC làm thay đổi trạng thái đối tượng → bắt buộc mô tả `state_before` → `state_after`.
- Ví dụ: `Employee: Draft → Active`, `Leave Request: Pending → Approved`

**Actor và Permission rõ ràng:**
- Mỗi UC phải ghi rõ Actor (role) thực hiện.
- Nếu UC có permission gate → ghi điều kiện quyền.

### 3. Cấu trúc bắt buộc mỗi USERCASE

| Field | Mô tả |
|---|---|
| UC ID | Format: `UC-<MODULE>-<NNN>` (ví dụ: `UC-PIM-001`) |
| Title | Ngắn gọn, mô tả mục tiêu nghiệp vụ |
| Level | USERCASE |
| Priority | P1 / P2 / P3 |
| Actor | Role thực hiện UC |
| Preconditions | Trạng thái hệ thống/dữ liệu trước khi bắt đầu |
| Trigger | Sự kiện khởi động UC |
| Main Flow | Luồng chính (happy path) — mô tả nghiệp vụ |
| Alternative Flows | Luồng rẽ nhánh hợp lệ (nếu có) |
| Exception Flows | Luồng lỗi / ngoại lệ rủi ro cao |
| State Transition | `state_before` → `state_after` nếu có |
| Business Rule Refs | Danh sách Rule ID liên quan |
| Expected Outcome | Kết quả quan sát được, đo được |
| Automation Candidate | Yes / Partial / No |
| Trace | Rule ID / Workflow ID |
| Gap / Assumption | Nếu có |

### 4. Phân loại luồng

- **Happy Path:** Luồng chính khi mọi điều kiện hợp lệ → luôn có.
- **Alternative Path:** Luồng rẽ nhánh hợp lệ (chọn A thay vì B, skip bước tùy chọn).
- **Exception Path:** Lỗi, từ chối, rollback, timeout → chỉ sinh khi có evidence hoặc risk cao.

### 5. Automation Candidate cho USERCASE

Theo Max-Coverage strategy:
- 100% USERCASE → `Yes` (E2E automation)
- Chỉ `No` nếu là pure layout check (không bao giờ xảy ra với UC)
- `Partial` nếu một phần UC cần manual setup (seed data phức tạp, external system)

### 6. Quality checklist trước khi output

- [ ] Mỗi UC có ID đúng format `UC-<MODULE>-<NNN>`
- [ ] Mỗi UC có trace về Rule ID hoặc Workflow ID
- [ ] Không có UC nào mô tả UI click-by-click
- [ ] UC có state transition đều mô tả `state_before → state_after`
- [ ] Actor được ghi rõ trong từng UC
- [ ] Expected Outcome quan sát được, không chung chung
- [ ] Phân biệt rõ Confirmed / Inferred / Gap

## Required Outputs
- `production_artifacts/testcases/USERCASE/module_<module_name>/usercases.csv`
- `production_artifacts/testcases/USERCASE/module_<module_name>/usecase_gaps.csv`
- **BẮT BUỘC:** Tuân thủ chuẩn CSV tại [common.md](file:///.agents/rules/common.md) (Encoding UTF-8 no BOM, Quoting...).