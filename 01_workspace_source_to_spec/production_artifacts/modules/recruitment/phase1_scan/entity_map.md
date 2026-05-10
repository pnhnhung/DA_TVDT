# Entity Map: Recruitment
 
 ## Entity: Candidate
 
 **DB Table**: `ohrm_job_candidate`
 **Source**: `orangehrmRecruitmentPlugin/entity/Candidate.php`
 
 ### Constants
 | Constant | Value | Mô tả |
 |---|---|---|
 | `MODE_OF_APPLICATION_MANUAL` | `1` | Ứng viên được thêm thủ công bởi Admin/HR |
 | `MODE_OF_APPLICATION_ONLINE` | `2` | Ứng viên tự nộp đơn online |
 
 ### Fields
 | Field (PHP) | DB Column | Type | Nullable | Constraint | Note |
 |---|---|---|---|---|---|
 | `id` | `id` | integer(13) | No | PK, AUTO_INCREMENT | |
 | `firstName` | `first_name` | string(30) | No | | |
 | `middleName` | `middle_name` | string(30) | Yes | | |
 | `lastName` | `last_name` | string(30) | No | | |
 | `email` | `email` | string(100) | No | | |
 | `contactNumber` | `contact_number` | string(30) | Yes | | |
 | `status` | `status` | integer(4) | No | Default: 1 | **@deprecated** — không dùng, logic chuyển sang `CandidateVacancy.status` |
 | `comment` | `comment` | text | Yes | | |
 | `modeOfApplication` | `mode_of_application` | integer(4) | No | 1=MANUAL, 2=ONLINE | |
 | `dateOfApplication` | `date_of_application` | date | No | | |
 | `cvFileId` | `cv_file_id` | integer(13) | Yes | **@deprecated** | Dùng `CandidateAttachment` thay thế |
 | `cvTextVersion` | `cv_text_version` | text | Yes | **@deprecated** | |
 | `keywords` | `keywords` | string(255) | Yes | | |
 | `addedPerson` | `added_person` | integer (FK) | Yes | FK → `Employee.emp_number` | Người tạo hồ sơ |
 | `consentToKeepData` | `consent_to_keep_data` | boolean | No | Default: false | GDPR — nếu true, không được Purge |
 
 ### Relations
 | Relation | Type | Target Entity | FK Column | Note |
 |---|---|---|---|---|
 | `addedPerson` | ManyToOne | `Employee` | `added_person` → `emp_number` | nullable |
 | `candidateVacancy` | OneToMany | `CandidateVacancy` | `candidate_id` | Ứng viên có thể ứng tuyển nhiều Vacancy |
 | `candidateAttachment` | OneToMany | `CandidateAttachment` | `candidate_id` | |
 | `candidateHistory` | OneToMany | `CandidateHistory` | `candidate_id` | |
 
 ---
 
 ## Entity: Vacancy
 
 **DB Table**: `ohrm_job_vacancy`
 **Source**: `orangehrmRecruitmentPlugin/entity/Vacancy.php`
 
 ### Fields
 | Field (PHP) | DB Column | Type | Nullable | Constraint | Default | Note |
 |---|---|---|---|---|---|---|
 | `id` | `id` | integer(13) | No | PK, AUTO_INCREMENT | | |
 | `jobTitle` | `job_title_code` | integer (FK) | No | FK → `JobTitle.id` | | |
 | `hiringManager` | `hiring_manager_id` | integer (FK) | Yes | FK → `Employee.emp_number` | | nullable |
 | `name` | `name` | string(100) | No | | | |
 | `description` | `description` | text | Yes | | | |
 | `numOfPositions` | `no_of_positions` | integer(13) | Yes | | null | |
 | `status` | `status` | boolean | No | | true (Active) | |
 | `isPublished` | `published_in_feed` | boolean | No | | false | Hiển thị trên RSS/public feed hay không |
 | `definedTime` | `defined_time` | datetime | No | | | Thời gian tạo |
 | `updatedTime` | `updated_time` | datetime | No | | | Thời gian cập nhật cuối |
 
 ### Relations
 | Relation | Type | Target Entity | FK Column | Note |
 |---|---|---|---|---|
 | `jobTitle` | ManyToOne | `JobTitle` | `job_title_code` → `id` | cascade persist+remove |
 | `hiringManager` | ManyToOne | `Employee` | `hiring_manager_id` → `emp_number` | nullable, cascade persist+remove |
 
 ---
 
 ## Entity: CandidateVacancy
 
 **DB Table**: `ohrm_job_candidate_vacancy`
 **Source**: `orangehrmRecruitmentPlugin/entity/CandidateVacancy.php`
 **Note**: Bảng join giữa Candidate và Vacancy. Chứa trạng thái (status) của ứng viên TRONG từng Vacancy cụ thể.
 
 ### Fields
 | Field (PHP) | DB Column | Type | Nullable | Note |
 |---|---|---|---|---|
 | `id` | `id` | integer(13) | No | PK, AUTO_INCREMENT |
 | `candidate` | `candidate_id` | integer (FK) | No | FK → `Candidate.id`, cascade persist+remove |
 | `vacancy` | `vacancy_id` | integer (FK) | No | FK → `Vacancy.id`, cascade persist+remove |
 | `status` | `status` | string(100) | No | Enum-like theo State Machine — xem `state_transitions.md` |
 | `appliedDate` | `applied_date` | date | No | |
 
 ---
 
 ## Entity: Interview
 
 **DB Table**: `ohrm_job_interview`
 **Source**: `orangehrmRecruitmentPlugin/entity/Interview.php`
 
 ### Fields
 | Field (PHP) | DB Column | Type | Nullable | Note |
 |---|---|---|---|---|
 | `id` | `id` | integer(13) | No | PK, AUTO_INCREMENT |
 | `candidateVacancy` | `candidate_vacancy_id` | integer (FK) | Yes | FK → `CandidateVacancy.id` |
 | `candidate` | `candidate_id` | integer (FK) | Yes | FK → `Candidate.id` |
 | `interviewName` | `interview_name` | string(100) | No | |
 | `interviewDate` | `interview_date` | date | Yes | |
 | `interviewTime` | `interview_time` | time | Yes | |
 | `note` | `note` | text | Yes | |
 
 ### Relations
 | Relation | Type | Target Entity | FK Column | Note |
 |---|---|---|---|---|
 | `candidateVacancy` | ManyToOne | `CandidateVacancy` | `candidate_vacancy_id` | |
 | `interviewers` | ManyToMany | `Employee` | `ohrm_job_interview_interviewer` | |
 
 **Status**: confirmed
 
 ---
 
 ## Deprecated Fields (Ghi Chú Quan Trọng)
 - `Candidate.status` — Trường `status` trên entity **Candidate** bị `@deprecated`. Logic trạng thái thực tế nằm ở `CandidateVacancy.status`.
 - `Candidate.cvFileId`, `Candidate.cvTextVersion` — Bị `@deprecated`. File đính kèm nay quản lý qua `CandidateAttachment`.
