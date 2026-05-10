# Automation Readiness Matrix — module_admin_nationalities

| Testcase ID | Automation readiness | Blocker | Required data | Required locator/API/helper | Notes |
|---|---|---|---|---|---|
| TC_UT_NAT_01 | READY | None | None | `Page_Nationalities` | UT P1 |
| TC_UT_NAT_02 | READY | None | None | `Page_Nationalities` | UT P1 |
| TC_UT_NAT_03 | MANUAL_ONLY | None | None | `Page_Nationalities` | UT P2 cơ bản |
| TC_UT_NAT_04 | MANUAL_ONLY | None | None | `Page_Nationalities` | UT P2 cơ bản |
| TC_UT_NAT_05 | MANUAL_ONLY | None | Existing Nationality | `Page_Nationalities` | UT P2 cơ bản |
| TC_UT_NAT_06 | READY | None | Existing Nationality | `Page_Nationalities` | UT P1 (Delete) |
| TC_UT_NAT_07 | READY | None | ESS User | `LoginPage` | UT P1 (Security) |
| TC_IT_NAT_01 | READY | None | None | `Page_PIM_PersonalDetails` | IT 100% |
| TC_IT_NAT_02 | READY | None | Emp with Nationality | DB fixture `ensure_employee` | IT 100% |
| TC_IT_NAT_03 | NEED_MULTI_SESSION | GAP-NAT-RACE | None | `MultiSessionContext` | Suggested testcase only |
