# Automation Readiness Matrix — module_performance

| Testcase ID | Automation readiness | Blocker | Required data | Required locator/API/helper | Notes |
|---|---|---|---|---|---|
| TC_UT_PRF_KPI_01 | READY | None | None | `Page_KPIs` | P2 cơ bản |
| TC_UT_PRF_KPI_02 | READY | None | KPI exists | `Page_KPIs` | P1 duplicate |
| TC_UT_PRF_KPI_03 | MANUAL_ONLY | None | None | `Page_KPIs` | Boundary min/max |
| TC_UT_PRF_KPI_04 | READY | None | None | `Page_KPIs` | P1 format |
| TC_UT_PRF_KPI_05 | MANUAL_ONLY | None | KPI exists | `Page_KPIs` | Edit basic |
| TC_UT_PRF_KPI_06 | READY | None | KPI exists | `Page_KPIs` | Delete |
| TC_UT_PRF_REV_01 | READY | None | Emp, KPI | `Page_Reviews` | Setup workflow |
| TC_UT_PRF_REV_02 | MANUAL_ONLY | None | Review exists | `Page_Reviews` | Edit basic |
| TC_UT_PRF_REV_03 | READY | None | Review exists | `Page_Reviews` | Delete |
| TC_UT_PRF_EVAL_01 | READY | None | Review in progress | `Page_Evaluate` | Supervisor view |
| TC_UT_PRF_EVAL_02 | MANUAL_ONLY | None | Review in progress | `Page_Evaluate` | Boundary error |
| TC_UT_PRF_PERM_01 | READY | None | ESS with review | `Page_MyReviews` | Security |
| TC_IT_PRF_01 | READY | None | Emp review | `Page_Evaluate` | IT 100% |
