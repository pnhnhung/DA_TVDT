# Testcase Oracle Review — module_admin_nationalities

| Testcase ID | Current Oracle | Oracle Quality | Issue | Required Improvement | Status |
|---|---|---|---|---|---|
| TC_UT_NAT_01 | Toast "Successfully Saved"; row "Vietnam" visible in list | STRONG | — | — | PASS |
| TC_UT_NAT_02 | Error "Required" visible under Name field; form not submitted | STRONG | — | — | PASS |
| TC_UT_NAT_03 | Toast "Successfully Saved" (100-char name) | ACCEPTABLE | Max-length value 100 is inferred | Xác nhận max-length | PASS |
| TC_UT_NAT_04 | Input length ≤ 100 OR validation error visible | ACCEPTABLE | Behavior (truncate vs reject) chưa confirmed | Confirm UI behavior | PASS |
| TC_UT_NAT_05 | Error "Already exists" visible; no duplicate created | STRONG | — | — | PASS |
| TC_UT_NAT_06 | Toast "Successfully Deleted"; row absent | STRONG | — | — | PASS |
| TC_UT_NAT_07 | Access Denied page OR redirect | ACCEPTABLE | Exact redirect URL varies | Confirm first run | PASS |
| TC_IT_NAT_01 | Nationality field shows "Japan" in PIM | STRONG | — | — | PASS |
| TC_IT_NAT_02 | Error visible OR record still present | ACCEPTABLE | Hard block vs soft warn not confirmed | Verify FK behavior | PASS |
