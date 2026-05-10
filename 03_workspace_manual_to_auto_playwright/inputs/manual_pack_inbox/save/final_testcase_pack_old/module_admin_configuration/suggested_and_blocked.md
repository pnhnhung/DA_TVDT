# Suggested Testcases — module_admin_configuration

| TC ID | Title | Lý do SUGGESTED | Điều kiện nâng OFFICIAL |
|---|---|---|---|
| TC_UT_CFG_01 | SMTP Test Connection thành công | Phụ thuộc external SMTP server — không deterministic trong mọi môi trường | Môi trường có MailHog/Mailtrap configured → nâng Yes |
| TC_UT_CFG_02 | SMTP Test Connection thất bại | Tương tự CFG_01 | Tương tự CFG_01 |
| TC_IT_CFG_03 | Race condition: Disable module lúc ESS submit Leave | Server behavior chưa confirmed | Dev confirm |

# Blocked Testcases — module_admin_configuration

| TC ID | Title | Gap | Lý do | Unblock |
|---|---|---|---|---|
| TC_IT_CFG_04 | Re-enable module → toàn bộ state restore | GAP-CFG-03 | Behavior khi re-enable module (existing data preserved?) chưa confirmed | Spec confirm |

# Testcase Coverage Matrix — module_admin_configuration

| Rule ID | Rule Statement | Level | TC IDs | Status | Missing | Notes |
|---|---|---|---|---|---|---|
| R_CFG_01 | Date Format system-wide | UT/IT | TC_UT_CFG_03, TC_IT_CFG_02 | FULL | — | — |
| R_CFG_02 | Locale/Language change | UT | TC_UT_CFG_04 | PARTIAL | Not all locale options tested | P2 |
| R_CFG_03 | Module enable/disable | IT | TC_IT_CFG_01 | PARTIAL | Re-enable case missing | GAP-CFG-03 |
| R_CFG_04 | SMTP configuration | UT | TC_UT_CFG_01, 02 | BLOCKED_BY_SPEC_GAP | External SMTP dependency | SUGGESTED |
| PERM_CFG_01 | ESS no access to Configuration | UT | TC_UT_CFG_05 | FULL | — | — |
| BR_CFG_01 | Module disable → menu propagation | IT | TC_IT_CFG_01 | FULL | — | — |
| BR_CFG_03 | Race condition module disable | IT | TC_IT_CFG_03 | BLOCKED_BY_SPEC_GAP | Timing behavior | SUGGESTED |
