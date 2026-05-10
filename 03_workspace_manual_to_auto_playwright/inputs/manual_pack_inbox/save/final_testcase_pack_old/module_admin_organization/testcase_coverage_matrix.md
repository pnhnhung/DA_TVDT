# Testcase Coverage Matrix — module_admin_organization

| Rule ID | Rule Statement | Test Level | Covered TC IDs | Coverage Status | Missing Cases | Notes |
|---|---|---|---|---|---|---|
| R_ORG_01 | General Info required fields | UT | TC_UT_ORG_01, 02 | FULL | — | — |
| R_ORG_02 | Location required fields | UT | TC_UT_ORG_03, 04 | FULL | — | — |
| R_ORG_03 | Location Delete | UT | TC_UT_ORG_05 | PARTIAL | Delete restricted missing | Oracle = ACCEPTABLE |
| R_ORG_04 | Structure Unit CRUD | UT | TC_UT_ORG_06 | PARTIAL | Delete / loop tree missing | Low risk |
| R_ORG_05 | Location → PIM | IT | TC_IT_ORG_01 | FULL | — | — |
| PERM_ORG_01 | ESS no access | UT | TC_UT_ORG_07 | FULL | — | — |
