# Final Testcase Pack — module_time

## Official Testcases

| TC ID | Title | Level | P | Rule ID | Oracle | Expected Result |
|---|---|---|---|---|---|---|
| TC_UT_TIM_01 | Tạo Customer thành công | UT | P2 | R_TIM_01 | STRONG | Toast + row |
| TC_UT_TIM_02 | Customer trùng tên | UT | P2 | R_TIM_02 | STRONG | Error "Already exists" |
| TC_UT_TIM_03 | Tạo Project + gán Customer | UT | P1 | R_TIM_03 | STRONG | Toast + Project linked to Customer |
| TC_UT_TIM_04 | Timesheet dropdown Project đúng | UT | P1 | R_TIM_04 | STRONG | "Proj_Q1" visible in dropdown |
| TC_UT_TIM_05 | Nhập giờ hợp lệ | UT | P1 | R_TIM_05 | STRONG | Hours persisted; total updated |
| TC_UT_TIM_06 | Nhập giờ không hợp lệ | UT | P1 | R_TIM_06 | ACCEPTABLE | Error validation visible (exact message TBD) |
| TC_UT_TIM_07 | Submit button state | UT | P1 | R_TIM_07 | STRONG | Submit button enabled khi NOT_SUBMITTED |
| TC_UT_TIM_08 | Supervisor thấy Approve/Reject | UT | P1 | R_TIM_08 | STRONG | Both buttons present |
| TC_UT_TIM_09 | Supervisor Approve Timesheet | UT | P1 | R_TIM_09 | STRONG | State=APPROVED; grid read-only |
| TC_UT_TIM_10 | Supervisor Reject → ESS edit lại | UT | P1 | R_TIM_10 | STRONG | State=REJECTED; E1 can fill |
| TC_IT_TIM_01 | Approval routing Submit → S1 Pending | IT | P1 | BR_TIM_01 | STRONG | S1 Timesheets: E1 row with Approve/Reject |

## Suggested
- TC_IT_TIM_02: Race condition Terminate + Timesheet submit — server behavior unconfirmed

## Blocked
- TC_UT_TIM_ZERO: Submit 0-hour timesheet (GAP-TIM-01 — behavior unconfirmed)

## Coverage Matrix Summary
| Rule | TC IDs | Status |
|---|---|---|
| R_TIM_01-03 | TIM_01-03 | FULL |
| R_TIM_04-07 | TIM_04-07 | FULL |
| R_TIM_08-10 | TIM_08-10 | FULL |
| BR_TIM_01 | IT_TIM_01 | FULL |
| GAP-TIM-01 (0h submit) | — | BLOCKED_BY_SPEC_GAP |

## Oracle Review Summary
- STRONG: 10 | ACCEPTABLE: 1 (exact error message) | Weak: 0 | Missing: 0
- **Oracle Gate: ✅ PASS**

## Automation Readiness
- Yes: 11 | Partial: 1 (IT_TIM_02 MultiSession) | No: 0

## Exploratory Charters
1. **Midnight boundary**: Punch In lúc 23:58 → Punch Out lúc 00:03 → Duration cross-midnight tính đúng?
2. **Holiday entry**: Nhập giờ vào ngày holiday → hệ thống cảnh báo không?
3. **Multiple projects same day**: Cùng 1 ngày có nhiều dòng cho nhiều project → total tính đúng?
4. **Timesheet locked after Approve**: ESS cố edit sau Approve → bị ngăn không?

---

# Final Handoff Decision

**Decision: READY_FOR_AUTOMATION_PREP**

**Reason:** Oracle PASS; 11/12 `Yes`; GAP-TIM-01 (0h submit) không ảnh hưởng 11 cases.

**Next action:**
- Build `Page_Timesheet` (grid input component — phức tạp nhất module này)
- IT_TIM_01: Cần PIM ReportTo setup fixture
