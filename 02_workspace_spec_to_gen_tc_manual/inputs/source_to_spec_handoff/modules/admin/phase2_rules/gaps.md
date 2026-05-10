# Gaps: Admin

| Gap ID | Feature | Rule ID | Mô tả | Status | Confidence | Investigation Status | Action |
|---|---|---|---|---|---|---|---|
| GAP-ADM-001 | Qualifications module | N/A | Feature descriptions chỉ có 8 lines — Cover 1/28 features (User Management). Toàn bộ Qualifications sub-module (Skills, Education, Licenses, Languages, Memberships) chưa có feature description đầy đủ. | gap | high | Đã điều tra — Phase 3 content quá mỏng | Cần bổ sung feature_descriptions.md cho Admin |
| GAP-ADM-002 | Pay Grade / Salary Rules | N/A | Business rules cho Pay Grade min/max salary, currency constraints chưa được extract chi tiết. | gap | medium | Đã điều tra — phát hiện gap khi audit | Cần extract từ PayGradeAPI |
| GAP-ADM-003 | LDAP Configuration | N/A | Field rules cho LDAP Server cấu hình (port, bind credentials, base DN, encryption) chưa được extract. | gap | medium | Đã điều tra — phát hiện gap khi audit | Cần extract từ LDAPConfigurationAPI |
| GAP-ADM-004 | Module Config (enable/disable) | N/A | Business rule khi Admin tắt một module (ví dụ: Performance) — ảnh hưởng gì đến các module khác chưa được phân tích. | inferred | low | Đã điều tra — phát hiện gap khi audit | Cần extract từ ModuleAPI |
| GAP-ADM-005 | Email configuration | N/A | SMTP/email server configuration — validation rules (port, server, auth method) chưa được extract. | gap | medium | Đã điều tra — phát hiện gap khi audit | Cần extract từ EmailConfigurationAPI |
