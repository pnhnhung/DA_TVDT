# Automation Readiness Matrix — module_admin_job

| Testcase ID | Automation readiness | Blocker | Required data | Required locator/API/helper | Notes |
|---|---|---|---|---|---|
| TC_UT_JOB_TITLE_01 | READY | None | None | `Page_JobTitles` | UT P1 |
| TC_UT_JOB_TITLE_02 | READY | None | Existing Title | `Page_JobTitles` | UT P1 |
| TC_UT_JOB_TITLE_03 | MANUAL_ONLY | None | None | `Page_JobTitles` | UT P2 cơ bản |
| TC_UT_JOB_TITLE_05 | MANUAL_ONLY | None | Existing Title | `Page_JobTitles` | UT P2 |
| TC_UT_JOB_TITLE_06 | READY | None | Existing Title | `Page_JobTitles` | Đưa Delete vào auto |
| TC_UT_JOB_PAY_01 | READY | None | None | `Page_PayGrades` | UT P1 |
| TC_UT_JOB_PAY_02 | READY | None | Existing Grade | `Page_PayGrades` | UT P1 |
| TC_UT_JOB_PAY_03 | MANUAL_ONLY | None | Existing Grade | `Page_PayGrades` | UT P2 |
| TC_UT_JOB_PAY_04 | READY | None | Existing Grade | `Page_PayGrades` | Đưa Delete vào auto |
| TC_UT_JOB_PAY_05 | READY | None | Existing Grade | `Page_PayGrades` | Gán Currency |
| TC_UT_JOB_PAY_06 | READY | None | Existing Grade | `Page_PayGrades` | Rule Min/Max |
| TC_UT_JOB_PAY_07 | READY | None | Grade w Currency | `Page_PayGrades` | Delete Currency |
| TC_UT_JOB_EMP_01 | READY | None | None | `Page_EmpStatus` | Tab độc lập |
| TC_UT_JOB_EMP_02 | READY | None | Existing Status | `Page_EmpStatus` | UT P1 |
| TC_UT_JOB_EMP_03 | MANUAL_ONLY | None | Existing Status | `Page_EmpStatus` | UT P2 |
| TC_UT_JOB_EMP_04 | READY | None | Existing Status | `Page_EmpStatus` | Delete |
| TC_UT_JOB_CAT_01 | READY | None | None | `Page_JobCategories` | Tab độc lập |
| TC_UT_JOB_CAT_02 | READY | None | Existing Cat | `Page_JobCategories` | UT P1 |
| TC_UT_JOB_CAT_03 | MANUAL_ONLY | None | Existing Cat | `Page_JobCategories` | UT P2 |
| TC_UT_JOB_CAT_04 | READY | None | Existing Cat | `Page_JobCategories` | Delete |
| TC_UT_JOB_SHIFT_01 | READY | None | None | `Page_WorkShifts` | UT P1 |
| TC_UT_JOB_SHIFT_02 | READY | None | Existing Shift | `Page_WorkShifts` | UT P1 |
| TC_UT_JOB_SHIFT_03 | READY | None | None | `Page_WorkShifts` | Boundary Format |
| TC_UT_JOB_SHIFT_04 | MANUAL_ONLY | None | Existing Shift | `Page_WorkShifts` | UT P2 |
| TC_UT_JOB_SHIFT_05 | READY | None | Existing Shift | `Page_WorkShifts` | Delete |
| TC_UT_JOB_PERM_01 | READY | None | ESS User | `LoginPage` | Security |
