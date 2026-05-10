# Testcase Coverage Matrix — module_pim

| Rule ID | Rule Statement | Test Level | Covered TC IDs | Coverage Status | Missing Cases | Notes |
|---|---|---|---|---|---|---|
| R_PIM_01 | Add Emp required fields | UT | TC_UT_PIM_01, 02 | FULL | — | — |
| R_PIM_02 | Profile picture | UT | TC_UT_PIM_03 | PARTIAL | Boundary size/format missing | Oracle = ACCEPTABLE (Suggest) |
| R_PIM_03 | Create login details | UT | TC_UT_PIM_04 | FULL | — | — |
| R_PIM_04 | Update Personal Details | UT | TC_UT_PIM_05 | FULL | — | — |
| PERM_PIM_01 | ESS My Info | UT | TC_UT_PIM_06 | FULL | — | — |
| BR_PIM_01 | Terminate blocks login | IT | TC_IT_PIM_01 | FULL | — | GAP-PIM-04 Resolved (Leave unaffected) |
| BR_PIM_02 | Reactivate allows login | IT | TC_IT_PIM_02 | FULL | — | — |
| BR_PIM_03 | Job/Salary log | IT | TC_IT_PIM_03 | FULL | — | — |
| BR_PIM_04 | Circular report-to | IT | — | BLOCKED_BY_SPEC_GAP | GAP_PIM_02 | SUGGESTED |
