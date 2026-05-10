# Rule Catalog: Recruitment
 
 ## Field Rules (FR)
 | Rule ID | Entity | Field | Constraint | Source Trace | Status |
 |---|---|---|---|---|---|
 | FR-001 | vacancy | name | max:100 | Api/VacancyAPI.php#462 | confirmed |
 | FR-002 | vacancy | status | boolean | Api/VacancyAPI.php#467 | confirmed |
 | FR-003 | vacancy | jobTitleId | active job title | Api/VacancyAPI.php#471 | confirmed |
 | FR-004 | vacancy | isPublished | boolean | Api/VacancyAPI.php#476 | confirmed |
 | FR-005 | vacancy | description | string | Api/VacancyAPI.php#481 | confirmed |
 | FR-006 | vacancy | numOfPositions | int(13) | Api/VacancyAPI.php#488 | confirmed |
 | FR-007 | vacancy | employeeId | active employee | Api/VacancyAPI.php#494 | confirmed |
 | FR-008 | candidate | firstName | max:30 | Api/CandidateAPI.php#643 | confirmed |
 | FR-009 | candidate | middleName | max:30 | Api/CandidateAPI.php#649 | confirmed |
 | FR-010 | candidate | lastName | max:30 | Api/CandidateAPI.php#657 | confirmed |
 | FR-011 | candidate | email | email format | Api/CandidateAPI.php#662 | confirmed |
 | FR-012 | candidate | contactNumber | string | Api/CandidateAPI.php#667 | confirmed |
 | FR-013 | candidate | vacancyId | exists | Api/CandidateAPI.php#674 | confirmed |
 | FR-014 | candidate | keywords | max:250 | Api/CandidateAPI.php#680 | confirmed |
 | FR-015 | candidate | comment | max:250 | Api/CandidateAPI.php#688 | confirmed |
 | FR-016 | candidate | dateOfApplication | api_date | Api/CandidateAPI.php#696 | confirmed |
 | FR-017 | candidate | consentToKeepData | boolean | Api/CandidateAPI.php#702 | confirmed |
 | FR-018 | candidate_action | note | string | AbstractCandidateActionAPI.php#190 | confirmed |
 | FR-019 | interview | interviewName | max:100 | CandidateInterviewSchedulingAPI.php#297 | confirmed |
 | FR-020 | interview | interviewDate | api_date | CandidateInterviewSchedulingAPI.php#302 | confirmed |
 | FR-021 | interview | interviewerEmpNumbers | count:1-5 | CandidateInterviewSchedulingAPI.php#320 | confirmed |
 | FR-022 | attachment | attachment | base64 | CandidateAttachmentAPI.php#152 | confirmed |
 
 ## Business Rules (BR)
 | Rule ID | Feature | Rule Description | Source Trace | Status |
 |---|---|---|---|---|
 | BR-001 | Vacancy | Job Title phải Active | Api/VacancyAPI.php#389 | confirmed |
 | BR-002 | Vacancy | Hiring Manager phải Active | Api/VacancyAPI.php#397 | confirmed |
 | BR-003 | Candidate | Update Vacancy sẽ reset status và lưu History | Api/CandidateAPI.php#913 | confirmed |
 | BR-004 | Workflow | Phải tuân thủ State Machine (getAllowedActions) | AbstractCandidateActionAPI.php#113 | confirmed |
 | BR-005 | Workflow | Tự động tạo Employee khi trạng thái là HIRED | AbstractCandidateActionAPI.php#124 | confirmed |
 | BR-006 | Interview | Tối đa 2 cuộc phỏng vấn/ứng viên/vacancy | CandidateInterviewSchedulingAPI.php#175 | confirmed |
 | BR-007 | Attachment | Hỗ trợ Replace/Delete attachment | CandidateAttachmentAPI.php#285 | confirmed |
