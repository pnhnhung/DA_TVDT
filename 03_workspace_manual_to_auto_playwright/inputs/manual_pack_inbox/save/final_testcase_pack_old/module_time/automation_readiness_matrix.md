# Automation Readiness Matrix — module_time

| Testcase ID | Automation readiness | Blocker | Required data | Required locator/API/helper | Notes |
|---|---|---|---|---|---|
| TC_UT_TIM_01 | READY | None | ESS User | `Page_Timesheet` | — |
| TC_UT_TIM_02 | READY | None | ESS User | `Page_Timesheet` | — |
| TC_UT_TIM_03 | READY | None | ESS User | `Page_Timesheet` | — |
| TC_UT_TIM_04 | READY | None | Supervisor, Submitted TS | `Page_Timesheet` | Dùng API mock data TS |
| TC_UT_TIM_05 | READY | None | Supervisor, Submitted TS | `Page_Timesheet` | — |
| TC_UT_TIM_06 | READY | None | ESS User, Approved TS | `Page_Timesheet` | — |
| TC_UT_TIM_07 | READY | None | None | `Page_ProjectInfo` | Admin role |
| TC_IT_TIM_01 | READY | None | Admin + ESS | `Page_ProjectInfo`, `Page_Timesheet` | Flow dài |
| TC_IT_TIM_02 | READY | None | Project có TS | `DBFixture` | Tạo sẵn data ở DB |
