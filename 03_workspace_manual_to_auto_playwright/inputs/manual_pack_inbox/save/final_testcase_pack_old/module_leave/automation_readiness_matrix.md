# Automation Readiness Matrix — module_leave

| Testcase ID | Automation readiness | Blocker | Required data | Required locator/API/helper | Notes |
|---|---|---|---|---|---|
| TC_UT_LEV_TYPE_01 | READY | None | None | `Page_LeaveTypes` | P2 cơ bản nhưng setup |
| TC_UT_LEV_TYPE_02 | READY | None | Existing Type | `Page_LeaveTypes` | P1 duplicate |
| TC_UT_LEV_TYPE_03 | MANUAL_ONLY | None | None | `Page_LeaveTypes` | Boundary max |
| TC_UT_LEV_TYPE_04 | MANUAL_ONLY | None | None | `Page_LeaveTypes` | Boundary max+1 |
| TC_UT_LEV_TYPE_05 | MANUAL_ONLY | None | Existing Type | `Page_LeaveTypes` | Edit |
| TC_UT_LEV_TYPE_06 | READY | None | Existing Type | `Page_LeaveTypes` | Delete |
| TC_UT_LEV_ENT_01 | READY | None | Emp, Type | `Page_LeaveEntitlements` | Setup bằng API trước |
| TC_UT_LEV_ENT_02 | MANUAL_ONLY | None | None | `Page_LeaveEntitlements` | Required blank |
| TC_UT_LEV_APP_01 | READY | None | ESS with balance | `Page_LeaveApply` | P1 Core flow |
| TC_UT_LEV_APP_02 | READY | None | ESS with low bal | `Page_LeaveApply` | P1 Boundary balance |
| TC_UT_LEV_APP_03 | MANUAL_ONLY | None | None | `Page_LeaveApply` | Required blank |
| TC_UT_LEV_APP_04 | READY | None | ESS with app | `Page_MyLeave` | P1 action |
| TC_UT_LEV_APP_05 | READY | None | App submitted | `Page_LeaveList` | P1 workflow |
| TC_UT_LEV_APP_06 | READY | None | App submitted | `Page_LeaveList` | P1 workflow |
| TC_IT_LEV_01 | READY | None | Admin | `Page_LeaveList` | IT 100% |
| TC_IT_LEV_04 | READY | None | Employee terminated | `DBHelper` | IT DB Oracle |
