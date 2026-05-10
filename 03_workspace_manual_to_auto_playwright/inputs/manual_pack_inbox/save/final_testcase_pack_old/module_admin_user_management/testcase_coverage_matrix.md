# Testcase Coverage Matrix — module_admin_user_management

| Rule ID | Rule Statement | Test Level | Covered TC IDs | Coverage Status | Missing Cases | Notes |
|---|---|---|---|---|---|---|
| R_USR_01 | Required fields | UT | TC_UT_USR_01, 02 | FULL | — | — |
| R_USR_02 | Username unique | UT | TC_UT_USR_03 | FULL | — | — |
| R_USR_03 | Password strength | UT | TC_UT_USR_04 | PARTIAL | Exact strength criteria unconfirmed | Oracle = ACCEPTABLE |
| R_USR_04 | Password confirm | UT | TC_UT_USR_05 | FULL | — | — |
| R_USR_05 | Username max-length | UT | — | BLOCKED_BY_SPEC_GAP | GAP-USR-01 | — |
| R_USR_06 | Disable/Enable | UT/IT | TC_UT_USR_06, IT_USR_01 | FULL | — | — |
| R_USR_07 | Role change propagation | UT/IT | TC_UT_USR_07, IT_USR_02 | FULL | — | — |
| PERM_USR_01 | ESS no access | UT | TC_UT_USR_08 | FULL | — | — |
| BR_USR_01 | Session invalidation | IT | TC_IT_USR_01 | FULL | — | — |
| BR_USR_02 | Race condition | IT | — | BLOCKED_BY_SPEC_GAP | — | SUGGESTED |
