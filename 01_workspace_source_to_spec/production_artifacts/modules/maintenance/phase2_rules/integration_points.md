# Integration Points: Maintenance

| Source Module | Target Module | Trigger (UI) | Data Passed | Observable Result | Side Effect | Source | Status |
|---|---|---|---|---|---|---|---|
| Maintenance | PIM | Admin Purge terminated employees | Filter params (termination date range, etc.) | Xóa vĩnh viễn Employee records | Hard delete cascade tất cả related records (Leave, Attendance, v.v.) | `PurgeEmployeeService` | confirmed |
| Maintenance | Recruitment | Admin Purge candidates without consent | `consentToKeepData=false` | Xóa vĩnh viễn Candidate records | Hard delete cascade Attachment, History, Vacancy links | `PurgeCandidateService` | confirmed |
| Maintenance | Authentication | Admin Purge access logs | Date range | Xóa LoginLog records | | `PurgeAccessLogService` (inferred) | inferred |
