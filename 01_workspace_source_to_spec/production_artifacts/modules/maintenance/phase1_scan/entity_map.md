# Entity Map: Maintenance

## Không Có Entity Riêng

**Kết luận**: Module Maintenance **không có entity riêng**. Nó thực hiện **hard delete** (GDPR Purge) trên entities của các modules khác:

| Purge Target | Target Entity | Target DB Table |
|---|---|---|
| Purge Employees | `Employee` | `hs_hr_employee` |
| Purge Candidates | `Candidate` | `ohrm_job_candidate` |
| Access Logs | `LoginLog` | `ohrm_login` |

**Source**: `orangehrmMaintenancePlugin/` — PurgeEmployeeService, PurgeCandidateService

**Business Rules đã confirmed (từ phase2 business_rules.md):**
- BR-001: Chỉ purge Employee đã terminated (`termination_id IS NOT NULL`)
- BR-002: Chỉ purge Candidate không có `consentToKeepData = true`
- BR-003: Hard delete — không thể recover

> Maintenance không có state machine. Không cần `state_transitions.md`.
