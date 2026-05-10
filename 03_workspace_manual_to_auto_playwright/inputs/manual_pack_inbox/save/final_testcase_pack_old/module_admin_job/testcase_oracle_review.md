# Testcase Oracle Review — module_admin_job

| Testcase ID | Current Oracle | Oracle Quality | Issue | Required Improvement | Status |
|---|---|---|---|---|---|
| TC_UT_JOB_01 | Toast "Successfully Saved"; "Senior QA" row visible | STRONG | — | — | PASS |
| TC_UT_JOB_02 | Error "Required" visible under Name field | STRONG | — | — | PASS |
| TC_UT_JOB_03 | Toast "Successfully Saved" (100-char title) | ACCEPTABLE | Max 100 inferred | Confirm max-length | PASS |
| TC_UT_JOB_04 | Length ≤ 100 OR validation error visible | ACCEPTABLE | Truncate vs error not confirmed | Confirm UI behavior | PASS |
| TC_UT_JOB_05 | Error "Already exists" visible | STRONG | — | — | PASS |
| TC_UT_JOB_06 | Toast saved; Pay Grade row visible | STRONG | — | — | PASS |
| TC_UT_JOB_07 | Error "Already exists" for Pay Grade | STRONG | — | — | PASS |
| TC_UT_JOB_08 | Toast saved; Employment Status row visible | STRONG | — | — | PASS |
| TC_UT_JOB_09 | Toast saved; Job Category row visible | STRONG | — | — | PASS |
| TC_UT_JOB_10 | Toast "Successfully Deleted"; row absent | STRONG | — | — | PASS |
| TC_IT_JOB_01 | "DevOps Engineer" in Recruitment Vacancy dropdown | STRONG | — | — | PASS |
| TC_IT_JOB_02 | "DevOps Engineer" in PIM Job tab dropdown | STRONG | — | — | PASS |
