# Official Testcases — System Settings
> Class: OFFICIAL | Workflow: 09 | Date: 2026-05-02

## BR_SET_001 / BR_SET_002 — Async Export CSV

| TC ID | Title | Rule | Oracle |
|---|---|---|---|
| UT-SET-001 | Click Export → API trả Job ID 200 | BR_SET_001 | STRONG |
| IT-SET-001 | Polling success job → trả link download | BR_SET_002 | STRONG |
| IT-SET-003 | Download file CSV → check HTTP 200 | BR_SET_001 | STRONG |
| IT-SET-004 | Trigger nhiều lần liên tiếp → tạo nhiều Jobs độc lập | BR_SET_001 | STRONG |
| IT-SET-005b| Polling failed job → trả status FAILED/error msg | BR_SET_002 | STRONG |

## BR_SET_003 — Data Scoping

| TC ID | Title | Rule | Oracle |
|---|---|---|---|
| IT-SET-008 | Tenant isolation: Admin Service A xuất CSV chỉ có data A | BR_SET_003 | STRONG |
| IT-SET-009 | Role isolation: CLIENT chỉ xuất CSV data của Shop mình | BR_SET_003 | STRONG |
| IT-SET-010 | Admin Service B không xuất được bằng API của Service A | BR_SET_003 | STRONG |
