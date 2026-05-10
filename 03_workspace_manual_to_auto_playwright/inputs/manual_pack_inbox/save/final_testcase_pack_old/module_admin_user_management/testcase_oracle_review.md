# Testcase Oracle Review — module_admin_user_management

| Testcase ID | Current Oracle | Oracle Quality | Issue | Required Improvement | Status |
|---|---|---|---|---|---|
| TC_UT_USR_01 | Toast saved; user "auto_admin_01" visible in list | STRONG | — | — | PASS |
| TC_UT_USR_02 | Error "Required" visible under Username field | STRONG | — | — | PASS |
| TC_UT_USR_03 | Error "Already exists" for duplicate username | STRONG | — | — | PASS |
| TC_UT_USR_04 | Validation error visible; form not submitted | ACCEPTABLE | Exact password strength criteria not confirmed | Confirm password policy | PASS |
| TC_UT_USR_05 | Error "Passwords do not match" visible | STRONG | — | — | PASS |
| TC_UT_USR_06 | Status badge = "Disabled" in user list | STRONG | — | — | PASS |
| TC_UT_USR_07 | Role column shows "ESS" after save | STRONG | — | — | PASS |
| TC_UT_USR_08 | Admin menu absent OR Access Denied | ACCEPTABLE | Exact behavior varies | Confirm first run | PASS |
| TC_IT_USR_01 | Login page shows error; no dashboard access | STRONG | — | — | PASS |
| TC_IT_USR_02 | Admin menu absent on target user's session | STRONG | — | — | PASS |
