# Official Testcases — Service Catalog
> Class: OFFICIAL | Workflow: 09 | Date: 2026-05-02

## BR_SERV_001 / BR_SERV_008 — Subdomain Isolation

| TC ID | Title | Rule | Oracle |
|---|---|---|---|
| UT-SERV-001 | Host header ≠ Subdomain → 403 | BR_SERV_001 | STRONG |
| IT-SERV-001 | Cross-tenant API access → 403 rejected | BR_SERV_001 | STRONG |
| IT-SERV-005 | API Get App config đúng subdomain → 200 + Config | BR_SERV_008 | STRONG |
| IT-SERV-005b| API Get App config invalid subdomain → 404/403 | BR_SERV_008 | STRONG |

## BR_SERV_002 / BR_SERV_003 — Role & Toggle

| TC ID | Title | Rule | Oracle |
|---|---|---|---|
| IT-SERV-003 | CLIENT không thấy Service settings của MASTER | BR_SERV_002 | STRONG |
| IT-SERV-004 | Toggle INACTIVE → App hiển thị bảo trì | BR_SERV_003 | STRONG |
| IT-SERV-005c| API App gọi Service INACTIVE → Maintenance error | BR_SERV_003 | STRONG |

## BR_SERV_004 / BR_SERV_005 / BR_SERV_009 — Menu Config

| TC ID | Title | Rule | Oracle |
|---|---|---|---|
| UT-SERV-003 | Menu flag OFF → API create Menu trả 403 | BR_SERV_004 | STRONG |
| IT-SERV-006 | Gán Menu vào Category invalid → rejected | BR_SERV_005 | STRONG |
| IT-SERV-007 | Gán Menu vào Category valid → created | BR_SERV_005 | STRONG |
| IT-SERV-009 | App query Menu đúng Service/Shop | BR_SERV_009 | STRONG |
| IT-SERV-009b| Shop không có Menu → App empty state | BR_SERV_009 | STRONG |

## BR_SERV_006 / BR_SERV_007 — Estimate Config

| TC ID | Title | Rule | Oracle |
|---|---|---|---|
| UT-SERV-005 | Estimate flag OFF → API Estimate trả 403 | BR_SERV_006 | STRONG |
| IT-SERV-010 | Tạo Estimate thiếu Contract → rejected | BR_SERV_007 | STRONG |
| IT-SERV-011 | Tạo Estimate có Contract → created | BR_SERV_007 | STRONG |
| IT-SERV-012 | Xóa Contract có Estimate → blocked | BR_SERV_007 | STRONG |
