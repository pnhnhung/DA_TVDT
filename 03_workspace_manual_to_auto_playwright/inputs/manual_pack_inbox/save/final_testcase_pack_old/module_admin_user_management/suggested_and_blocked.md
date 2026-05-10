# Suggested Testcases — module_admin_user_management

| TC ID | Title | Lý do SUGGESTED | Điều kiện nâng OFFICIAL |
|---|---|---|---|
| TC_IT_USR_03 | Race condition: Downgrade role lúc user submit form Admin | Behavior phụ thuộc server session management — có thể 401/403, redirect, hoặc silent complete tùy implementation | Dev confirm session invalidation behavior |
| TC_UT_USR_09 | Username = 40 ký tự (valid max) | Max-length chưa confirmed từ spec — inferred | Confirm từ source |
| TC_UT_USR_10 | Username = 41 ký tự (max+1) | Boundary chưa confirmed | Confirm từ source |

# Blocked Testcases — module_admin_user_management

| TC ID | Title | Gap | Lý do | Unblock |
|---|---|---|---|---|
| TC_UT_USR_SELF_DEL | Admin tự xóa chính mình | GAP-USR-02 | Behavior không confirmed — có thể allowed hoặc blocked | Dev confirm |

# Testcase Coverage Matrix — module_admin_user_management

| Rule ID | Rule Statement | Level | TC IDs | Status | Missing | Notes |
|---|---|---|---|---|---|---|
| R_USR_01 | User creation required fields | UT | TC_UT_USR_01, 02 | FULL | — | — |
| R_USR_02 | Username unique constraint | UT | TC_UT_USR_03 | FULL | — | — |
| R_USR_03 | Password strength validation | UT | TC_UT_USR_04 | PARTIAL | Exact strength rule not confirmed | ACCEPTABLE |
| R_USR_04 | Password confirm match | UT | TC_UT_USR_05 | FULL | — | — |
| R_USR_05 | Username max-length | UT | — | BLOCKED_BY_SPEC_GAP | Boundary unconfirmed | SUGGESTED |
| R_USR_06 | Disable/Enable account | UT/IT | TC_UT_USR_06, TC_IT_USR_01 | FULL | — | — |
| R_USR_07 | Role change propagation | UT/IT | TC_UT_USR_07, TC_IT_USR_02 | FULL | — | — |
| PERM_USR_01 | ESS no access to User Management | UT | TC_UT_USR_08 | FULL | — | — |
| BR_USR_01 | Session invalidation on disable | IT | TC_IT_USR_01 | FULL | — | — |
| BR_USR_02 | Race condition role change | IT | TC_IT_USR_03 | BLOCKED_BY_SPEC_GAP | Timing behavior | SUGGESTED |
