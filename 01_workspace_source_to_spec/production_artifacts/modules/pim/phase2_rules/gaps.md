# Gaps: PIM

| Gap ID | Feature | Rule ID | Mô tả | Status | Confidence | Investigation Status | Action |
|---|---|---|---|---|---|---|---|
| GAP-PIM-001 | Emergency Contacts | N/A | Entity `EmpEmergencyContact` có trong PIM nhưng field rules (relationship type, phone format) chưa được extract đầy đủ trong business_rules.md. | inferred | medium | Đã điều tra — phát hiện gap khi audit | Cần extract thêm từ EmergencyContactAPI |
| GAP-PIM-002 | Employee Dependents | N/A | Entity `EmpDependent` — relationship type enum values chưa được list đầy đủ. | inferred | medium | Đã điều tra — phát hiện gap khi audit | Cần verify enum values từ migration/seed |
| GAP-PIM-003 | Custom Fields | N/A | PIM hỗ trợ Custom Fields nhưng business rules cho việc Admin cấu hình và Employee điền custom fields chưa được extract. | gap | medium | Đã điều tra — phát hiện tính năng chưa phân tích | Cần extract từ CustomFieldAPI |
| GAP-PIM-004 | Photo upload | N/A | API upload ảnh nhân viên — file size limit, allowed formats chưa được extract rõ ràng. | inferred | medium | Đã điều tra — phát hiện gap khi audit | Cần verify từ EmpPictureAPI validation rules |
