# Final Testcase Pack — module_recruitment

## Official Testcases

| TC ID | Title | Level | P | Rule ID | Oracle | Expected Result |
|---|---|---|---|---|---|---|
| TC_UT_REC_01 | Tạo Vacancy thành công | UT | P2 | R_REC_01 | STRONG | Toast + row; status=Active |
| TC_UT_REC_02 | Vacancy thiếu trường | UT | P2 | R_REC_02 | STRONG | Error "Required" |
| TC_UT_REC_03 | Candidate Apply thành công | UT | P1 | R_REC_03 | STRONG | Status=Application Initiated |
| TC_UT_REC_04 | Candidate trùng email | UT | P1 | R_REC_04 | STRONG | Error "Email already exists" |
| TC_UT_REC_05 | Email sai định dạng (client) | UT | P1 | R_REC_05 | STRONG | Error "Expected format: admin@example.com" |
| TC_UT_REC_06 | Upload CV quá dung lượng | UT | P1 | R_REC_06 | ACCEPTABLE | Error "File size exceeded" (exact limit TBD) |
| TC_UT_REC_07 | Schedule Interview thành công | UT | P2 | R_REC_07 | STRONG | Status=Interview Scheduled; interview row |
| TC_UT_REC_08 | Interview thiếu trường | UT | P2 | R_REC_08 | STRONG | Error "Required" |
| TC_UT_REC_09 | Email format server-side | UT | P1 | R_REC_05 | STRONG | Error "Expected email format" |
| TC_UT_REC_10 | Vacancy trùng tên | UT | P1 | R_REC_09 | STRONG | Error "Already exists" |
| TC_IT_REC_01 | Job Title → Vacancy dropdown | IT | P1 | BR_REC_01 | STRONG | "DevOps Engineer" in dropdown |
| TC_IT_REC_02 | ATS State Machine: Initiated→Shortlisted→Scheduled | IT | P1 | BR_REC_02 | STRONG | States transition correctly; buttons change |

## Suggested
- TC_IT_REC_03: Race condition 2 Apply cùng email cùng Vacancy — server idempotency unconfirmed

## Blocked
- TC_IT_REC_04 (GAP-REC-01): Hire Candidate → Create Employee flow — spec chưa confirm

## Coverage Matrix Summary
| Rule | TC IDs | Status |
|---|---|---|
| R_REC_01-02 | REC_01-02 | FULL |
| R_REC_03-05 | REC_03-05, 09 | FULL |
| R_REC_06 | REC_06 | PARTIAL (exact file limit) |
| R_REC_07-08 | REC_07-08 | FULL |
| R_REC_09 | REC_10 | FULL |
| BR_REC_01-02 | IT_REC_01-02 | FULL |
| GAP-REC-01 | — | BLOCKED_BY_SPEC_GAP |

## Oracle Review Summary
- STRONG: 11 | ACCEPTABLE: 1 (file size limit) | Weak: 0 | Missing: 0
- **Oracle Gate: ✅ PASS**

## Automation Readiness
- Yes: 12 | Partial: 1 (IT_REC_03 MultiSession + page.request) | No: 0

## Exploratory Charters
1. **Candidate from external portal**: Nếu có public application portal → unauthorized user apply?
2. **Interview reschedule**: Thay đổi date/time interview sau khi đã schedule.
3. **Vacancy close → apply attempt**: Close vacancy → Candidate cố apply.
4. **Large CV file (exactly at limit)**: File đúng limit size → success hay fail?

---

# Final Handoff Decision

**Decision: READY_FOR_AUTOMATION_PREP**

**Reason:** Oracle PASS; 12/13 `Yes`; GAP-REC-01 (Hire flow) không ảnh hưởng 12 cases.

**Next action:**
- Build `Page_Recruitment_Vacancy`, `Page_Recruitment_Candidate`, `Page_Recruitment_Interview`
- IT_REC_01 phụ thuộc `Page_Job` (Job Title đã confirmed exist)
- IT_REC_02: Setup fixture tạo Candidate at each state
- IT_REC_03: `MultiSessionContext` + `page.request` sau
