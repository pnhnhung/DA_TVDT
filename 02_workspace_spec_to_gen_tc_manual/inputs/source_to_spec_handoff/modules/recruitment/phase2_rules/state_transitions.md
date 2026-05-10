# State Transitions: Recruitment

## State Machine: CandidateVacancy.status

**State Field**: `ohrm_job_candidate_vacancy.status`
**Flow Name**: `WorkflowStateMachine::FLOW_RECRUITMENT`
**Source**: `orangehrmRecruitmentPlugin/Service/CandidateService.php#STATUS_MAP`

### Valid States
| Status Value | Action Constant (WorkflowStateMachine) | Mô tả |
|---|---|---|
| `APPLICATION INITIATED` | `RECRUITMENT_APPLICATION_ACTION_ATTACH_VACANCY` | Hồ sơ vừa được gắn vào Vacancy (khởi đầu) |
| `SHORTLISTED` | `RECRUITMENT_APPLICATION_ACTION_SHORTLIST` | Được chọn vào vòng tiếp theo |
| `REJECTED` | `RECRUITMENT_APPLICATION_ACTION_REJECT` | Bị từ chối ở bất kỳ giai đoạn nào |
| `INTERVIEW SCHEDULED` | `RECRUITMENT_APPLICATION_ACTION_SHEDULE_INTERVIEW` | Đã lên lịch phỏng vấn |
| `INTERVIEW PASSED` | `RECRUITMENT_APPLICATION_ACTION_MARK_INTERVIEW_PASSED` | Đã phỏng vấn — kết quả PASS |
| `INTERVIEW FAILED` | `RECRUITMENT_APPLICATION_ACTION_MARK_INTERVIEW_FAILED` | Đã phỏng vấn — kết quả FAIL |
| `JOB OFFERED` | `RECRUITMENT_APPLICATION_ACTION_OFFER_JOB` | Đã gửi thư mời nhận việc |
| `OFFER DECLINED` | `RECRUITMENT_APPLICATION_ACTION_DECLINE_OFFER` | Ứng viên từ chối đề nghị |
| `HIRED` | `RECRUITMENT_APPLICATION_ACTION_HIRE` | Được tuyển dụng |

### Other Actions (không phải status transition)
| Action | Action ID | Mô tả |
|---|---|---|
| `ADDED` | `RECRUITMENT_CANDIDATE_ACTION_ADD` (16) | Ứng viên được thêm thủ công |
| `APPLIED` | `RECRUITMENT_CANDIDATE_ACTION_APPLIED` (17) | Ứng viên tự nộp đơn online |
| `REMOVED` | `RECRUITMENT_CANDIDATE_VACANCY_REMOVED` (15) | Xóa liên kết Candidate khỏi Vacancy |

---

### Transition Flow (Happy Path)

```
APPLICATION INITIATED → SHORTLISTED → INTERVIEW SCHEDULED → INTERVIEW PASSED → JOB OFFERED → HIRED
```

### Rejection / Alternative Paths
```
[Bất kỳ state nào] → REJECTED (qua action REJECT)
APPLICATION INITIATED / SHORTLISTED → [không thể hire trực tiếp]
JOB OFFERED → OFFER DECLINED (ứng viên từ chối)
INTERVIEW SCHEDULED → INTERVIEW FAILED
```

---

### Transitions chi tiết

| Trigger (UI) | Actor | From State | To State | API | Source |
|---|---|---|---|---|---|
| Click "Shortlist" | Admin/HR | APPLICATION INITIATED | SHORTLISTED | `CandidateShortlistingAPI` | `Api/CandidateShortlistingAPI.php` |
| Click "Reject" | Admin/HR | Any | REJECTED | `CandidateRejectionAPI` | `Api/CandidateRejectionAPI.php` |
| Click "Schedule Interview" | Admin/HR | SHORTLISTED | INTERVIEW SCHEDULED | `CandidateInterviewSchedulingAPI` | `Api/CandidateInterviewSchedulingAPI.php` |
| Click "Mark Interview Pass" | Admin/HR | INTERVIEW SCHEDULED | INTERVIEW PASSED | `CandidateMarkingInterviewPassAPI` | `Api/CandidateMarkingInterviewPassAPI.php` |
| Click "Mark Interview Fail" | Admin/HR | INTERVIEW SCHEDULED | INTERVIEW FAILED | `CandidateMarkingInterviewFailAPI` | `Api/CandidateMarkingInterviewFailAPI.php` |
| Click "Job Offer" | Admin/HR | INTERVIEW PASSED | JOB OFFERED | `CandidateJobOfferingAPI` | `Api/CandidateJobOfferingAPI.php` |
| Click "Decline Offer" | Admin/HR | JOB OFFERED | OFFER DECLINED | `CandidateOfferDecliningAPI` | `Api/CandidateOfferDecliningAPI.php` |
| Click "Hire" | Admin/HR | JOB OFFERED | HIRED | `CandidateHiringAPI` | `Api/CandidateHiringAPI.php` |
| Admin thêm thủ công | Admin | N/A | APPLICATION INITIATED | `CandidateAPI#create` | `Api/CandidateAPI.php` |
| Ứng viên nộp đơn online | Public | N/A | APPLICATION INITIATED | Public Controller | `Controller/PublicController/` |

> **Lưu ý**: Danh sách actions được phép từ state hiện tại do `CandidateAllowedActionAPI` trả về động — frontend call trước để biết nút nào được kích hoạt.
