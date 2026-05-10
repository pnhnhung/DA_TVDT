# Automation Readiness Matrix — module_recruitment

| Testcase ID | Automation readiness | Blocker | Required data | Required locator/API/helper | Notes |
|---|---|---|---|---|---|
| TC_UT_REC_VAC_01 | READY | None | None | `Page_Vacancies` | UT P2 setup data |
| TC_UT_REC_VAC_02 | READY | None | Vacancy exist | `Page_Vacancies` | UT P1 |
| TC_UT_REC_VAC_03 | MANUAL_ONLY | None | None | `Page_Vacancies` | Basic UT |
| TC_UT_REC_VAC_04 | MANUAL_ONLY | None | Vacancy exist | `Page_Vacancies` | Basic UT |
| TC_UT_REC_VAC_05 | READY | None | Vacancy exist | `Page_Vacancies` | Delete auto |
| TC_UT_REC_CAN_01 | READY | None | Vacancy exist | `Page_Candidates` | E2E setup |
| TC_UT_REC_CAN_02 | READY | None | Applied email | `Page_Candidates` | Duplicate logic |
| TC_UT_REC_CAN_03 | READY | None | None | `Page_Candidates` | Invalid email |
| TC_UT_REC_CAN_04 | MANUAL_ONLY | None | File > 1MB | `Page_Candidates` | Skip limit test if heavy |
| TC_UT_REC_CAN_05 | MANUAL_ONLY | None | Candidate exist | `Page_Candidates` | Basic UT |
| TC_UT_REC_CAN_06 | READY | None | Candidate exist | `Page_Candidates` | Delete auto |
| TC_UT_REC_WF_01 | READY | None | Initiated Cand | `Page_Candidates` | Workflow E2E |
| TC_UT_REC_WF_02 | READY | None | Shortlist Cand | `Page_Candidates` | Workflow E2E |
| TC_UT_REC_WF_03 | MANUAL_ONLY | None | Shortlist Cand | `Page_Candidates` | Basic required test |
| TC_UT_REC_WF_04 | READY | None | Sched Cand | `Page_Candidates` | Workflow E2E |
| TC_UT_REC_WF_05 | READY | None | Passed Cand | `Page_Candidates` | Workflow E2E |
| TC_UT_REC_WF_06 | READY | None | Offered Cand | `Page_Candidates` | Workflow E2E |
| TC_UT_REC_WF_07 | READY | None | Shortlist Cand | `Page_Candidates` | Workflow Reject |
| TC_IT_REC_04 | READY | None | Hired Cand | `DBHelper`, `Page_PIM_AddEmp` | IT DB verify |
