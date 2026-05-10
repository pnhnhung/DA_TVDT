---
name: manual-pack-reviewer
description: Review manual testcase pack trước automation — kiểm tra gap, duplicate, coverage P1, traceability, UT strength, IT expanded coverage. Được dùng trong Sub-step 1 của WF05 (05_review_and_gate).
---

# Manual Pack Reviewer

## Goal
Đảm bảo manual testcase pack đủ sạch và đầy đủ để chuyển sang Coverage Gate và Oracle Gate (Sub-step 2, 3 của WF05).

## Instructions

1. Đọc toàn bộ output UT/IT/USERCASE của module.
2. Kiểm tra các vấn đề sau và ghi vào `manual_gap_report.md`:

### Gap & Completeness
- Missing P1 testcase (rule P1 không có TC nào)
- Missing negative path quan trọng (ít nhất 1 negative/invalid per field rule P1)
- UT thiếu boundary/invalid/error message/local persistence
- IT thiếu cross-module/cross-role/data propagation/state transition
- USERCASE thiếu happy path hoặc exception path quan trọng

### Quality
- Duplicate testcase (cùng scenario, khác ID)
- Testcase không atomic (kiểm tra nhiều điều kiện độc lập trong 1 TC)
- Testcase lẫn mock/HTTP/framework detail (không phải manual TC)
- Missing precondition hoặc test data (để trống hoặc ghi chung chung)

### Traceability
- TC không có Rule ID → flag, yêu cầu thêm trace
- TC có Rule ID nhưng rule đó không tồn tại trong test_basis_index → flag conflict

### Role Coverage
- Role có trong Permission matrix nhưng không có TC nào → flag missing role coverage

3. Với pack quá lớn: KHÔNG cắt P2/P3 tự động — ghi note để QA quyết định.
4. Chuẩn hóa danh sách gap rõ ràng, có ID, severity (P1/P2/P3).

## Required Outputs
- `production_artifacts/review/module_<module_name>/manual_gap_report.md`
- `production_artifacts/review/module_<module_name>/traceability_matrix.csv`
- **BẮT BUỘC:** Tuân thủ chuẩn CSV tại [common.md](file:///.agents/rules/common.md) (Encoding UTF-8 no BOM, Quoting...).
