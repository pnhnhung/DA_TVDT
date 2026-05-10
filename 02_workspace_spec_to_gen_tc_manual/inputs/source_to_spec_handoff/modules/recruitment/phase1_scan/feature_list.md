# Feature List: Recruitment

| Feature ID | Nhóm chức năng | Tên API/Endpoint | Method | Route | Controller/API File | Note | Status |
|---|---|---|---|---|---|---|---|
| REC-001 | Vacancy | Quản lý Vacancy | GET, POST, PUT, DELETE | `/api/v2/recruitment/vacancies` | `Api/VacancyAPI.php` | CRUD tin tuyển dụng | inferred |
| REC-002 | Vacancy | Vacancy Attachments | GET, POST, PUT, DELETE | `/api/v2/recruitment/vacancy/attachments` | `Api/VacancyAttachmentAPI.php` | Đính kèm cho Vacancy | inferred |
| REC-003 | Candidate | Quản lý Candidate | GET, POST, PUT, DELETE | `/api/v2/recruitment/candidates` | `Api/CandidateAPI.php` | CRUD ứng viên | inferred |
| REC-004 | Candidate | Candidate Attachments| GET, POST, PUT | `/api/v2/recruitment/candidate/attachments` | `Api/CandidateAttachmentAPI.php` | Quản lý CV ứng viên | inferred |
| REC-005 | Candidate | Candidate History | GET, PUT | `/api/v2/recruitment/candidates/{id}/history` | `Api/CandidateHistoryAPI.php` | | inferred |
| REC-006 | Workflow | Lấy trạng thái cho phép | GET | `/api/v2/recruitment/candidates/{id}/actions/allowed`| `Api/CandidateAllowedActionAPI.php` | | inferred |
| REC-007 | Workflow | Shortlist | PUT | `/api/v2/recruitment/candidates/{id}/shortlist` | `Api/CandidateShortlistingAPI.php` | | inferred |
| REC-008 | Workflow | Reject | PUT | `/api/v2/recruitment/candidates/{id}/reject` | `Api/CandidateRejectionAPI.php` | | inferred |
| REC-009 | Workflow | Schedule Interview | POST, GET, PUT | `/api/v2/recruitment/candidates/{id}/shedule-interview`| `Api/CandidateInterviewSchedulingAPI.php`| | inferred |
| REC-010 | Workflow | Đánh giá Phỏng vấn | PUT | `/api/v2/recruitment/candidates/{id}/interviews/{id}/*`| `Api/CandidateMarkingInterviewPassAPI.php` (và Fail) | Pass/Fail | inferred |
| REC-011 | Workflow | Quản lý Job Offer | PUT | `/api/v2/recruitment/candidates/{id}/job/*` | `Api/CandidateJobOfferingAPI.php` (và Decline)| Offer/Decline | inferred |
| REC-012 | Workflow | Hire | PUT | `/api/v2/recruitment/candidates/{id}/hire` | `Api/CandidateHiringAPI.php` | | inferred |
| REC-013 | Interview | Interview Attachments | GET, POST, PUT, DELETE| `/api/v2/recruitment/interviews/{id}/attachments`| `Api/InterviewAttachmentAPI.php` | | inferred |
| REC-014 | Public | Nộp hồ sơ (Apply) | POST | `/api/v2/recruitment/public/applicants` | `PublicController\ApplicantController.php`| Ứng viên tự apply | inferred |
| REC-015 | Public | Xem danh sách Vacancy | GET | `/api/v2/recruitment/public/vacancies` | `PublicController\VacancyListRestController.php`| | inferred |
