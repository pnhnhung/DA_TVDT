# Evidence Verification Notes: Recruitment

## 1. Kết quả kiểm tra Business Rules
- **BR-001 (Vacancy Job Title Validation)**: ✅ Confirmed. Trace `Api/VacancyAPI.php#setVacancy:389`.
- **BR-002 (Vacancy Hiring Manager Validation)**: ✅ Confirmed. Trace `Api/VacancyAPI.php#setVacancy:397`.
- **BR-003 (Attach/Change Candidate Vacancy)**: ✅ Confirmed. Trace `Api/CandidateAPI.php#performCandidateVacancyUpdateCriteria:913`.
- **BR-004 (State Machine Transition Constraint)**: ✅ Confirmed. Trace `Api/AbstractCandidateActionAPI.php#update:113`. Kiểm tra workflow action qua `getAllowedActions()`.
- **BR-005 (Auto Employee Creation upon Hired)**: ✅ Confirmed. Trace `Api/AbstractCandidateActionAPI.php#update:124`.

## 2. Kết quả kiểm tra Field Rules
- **FR-001 -> FR-007** (Vacancy): ✅ Confirmed. Trace `Api/VacancyAPI.php` khớp.
- **FR-008 -> FR-019** (Candidate): ✅ Confirmed. Trace `Api/CandidateAPI.php` khớp.

## 3. Tổng kết Completeness
Mức độ bao phủ (coverage) của Phase 2 khá tốt đối với các core entities (Vacancy, Candidate, Workflow).
- Tuy nhiên, phần `Interview` (lên lịch phỏng vấn, đánh giá) chưa có thông tin field rules rõ ràng.
