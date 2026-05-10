---
name: testcase-handoff-packager
description: Đóng gói manual testcase đã finalize thành automation input pack theo Max-Coverage strategy — mapping, readiness, priority, dependency và manifest bàn giao. Được dùng trong WF06 (06_clarify_and_finalize) và WF07 (07_handoff).
---

# Testcase Handoff Packager

## Goal
Tạo bộ input sạch để Workspace 3 (automation) có thể sinh code test ngay mà không cần clarify thêm về expected result hay business rule.

## Instructions

### 1. Nhận input từ WF06

Đọc:
- `official_testcases.csv` — chỉ xử lý TC đã có oracle STRONG/ACCEPTABLE
- `automation_readiness_matrix.csv` — đọc readiness status từ WF06
- `automation_mapping.csv` — đọc dependency đã map

### 2. Chiến lược Max-Coverage — Automation Candidate

Phân loại `automation_candidate`:

```text
Yes     → TC đã READY, automate ngay
Partial → TC có blocker kỹ thuật nhỏ (cần setup data/locator) nhưng logic đã rõ
No      → CHỈ dùng cho pure layout/responsive (xem định nghĩa bên dưới)
```

**Định nghĩa Pure Layout / MANUAL_ONLY:**
> Testcase CHỈ kiểm tra: màu sắc, font size, padding/margin, icon position,
> responsive breakpoint, mobile layout — và KHÔNG liên quan đến
> business logic, validation rule, data display, state, hoặc permission.

**Nguyên tắc phân loại:**

```
UT:
  - automation_candidate = Yes  → tất cả UT oracle STRONG/ACCEPTABLE
  - automation_candidate = No   → CHỈ pure layout/responsive
  - Không dùng "No" vì rủi ro thấp hay P3

IT:
  - automation_candidate = Yes  → 100% IT có thể verify qua UI/API
  - automation_candidate = Partial → IT cần multi-session hoặc background job
  - Không dùng "No" cho IT

USERCASE:
  - automation_candidate = Yes  → 100% USERCASE
  - Không dùng "No" cho USERCASE
```

**Đặc biệt với IT cross-module:**
Nếu kết quả cross-module hiển thị được trên màn hình (error message, status thay đổi, record xuất hiện/biến mất, file tải xuống, toast notification) → đánh dấu `Yes` qua UI layer. Chỉ đánh dấu `Partial` nếu cần verify thêm DB level không thể check qua UI.

### 3. Automation Layer gợi ý

```text
UI     → verify qua browser, page interaction
API    → verify trực tiếp qua HTTP response, không cần UI
Mixed  → cần kết hợp UI + API để verify đầy đủ
```

### 4. Execution Order (risk-based)

```text
Group 1: P1 IT (integration, critical flow, state change)
Group 2: P1 UT (required field, permission, validation)
Group 3: P2 UT (boundary, edge case, error message)
Group 4: USERCASE (E2E business journey)
Group 5: P2 IT (secondary integration, report, export)
```

### 5. Tạo Final Handoff Manifest

Tổng hợp đếm và top priority list cho Workspace 3.

## Required Outputs

```text
production_artifacts/final_testcase_pack/module_<module_name>/automation_readiness_matrix.csv
production_artifacts/final_testcase_pack/module_<module_name>/automation_mapping.csv
production_artifacts/final_testcase_pack/module_<module_name>/final_handoff_manifest.csv
production_artifacts/final_testcase_pack/module_<module_name>/handoff_summary.md
```

- **BẮT BUỘC:** Tuân thủ chuẩn CSV tại [common.md](file:///.agents/rules/common.md) (Encoding UTF-8 no BOM, Quoting...).
