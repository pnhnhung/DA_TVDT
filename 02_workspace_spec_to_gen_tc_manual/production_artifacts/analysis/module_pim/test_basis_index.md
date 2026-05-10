# Test Basis Index: PIM

## Business Rules
- **BR-001**: Add New Employee (UI & CSV, kích hoạt event).
- **BR-002**: Delete Employee (Không xóa admin mặc định/current user).
- **BR-003**: Update Personal Details (Cấu hình ẩn hiện các trường).
- **BR-004**: Update Contact Details (Unique email, khác work & other).
- **BR-005**: Update Job Details (Validation foreign keys, dispatch date event).
Nguồn: `inputs/source_to_spec_handoff/modules/pim/phase2_rules/business_rules.md`

## Field Rules
- FR-001 đến FR-040: Định nghĩa Validation, Length, Default cho Employee Add, Personal Details, Contact Details, Job Details.
Nguồn: `inputs/source_to_spec_handoff/modules/pim/phase2_rules/field_rules.csv`

## Features
- F-001 đến F-094 (Bao phủ API thao tác Employee).
Nguồn: `inputs/source_to_spec_handoff/modules/pim/phase1_scan/feature_list.md`

## Gaps
- `inputs/source_to_spec_handoff/modules/pim/handoff/gaps_and_questions.md`
