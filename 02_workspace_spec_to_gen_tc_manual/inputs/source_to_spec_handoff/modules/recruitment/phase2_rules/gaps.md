# Gaps: Recruitment

| Gap ID | Feature | Rule ID | Mô tả | Status | Confidence | Investigation Status | Action |
|---|---|---|---|---|---|---|---|
| GAP-REC-001 | Interview Scheduling | N/A | `CandidateInterviewSchedulingAPI.php` tồn tại nhưng chưa extract field rules (ngày giờ phỏng vấn, địa điểm, interviewer). | gap | medium | Đã điều tra — phát hiện file chưa được phân tích | Cần extract từ CandidateInterviewSchedulingAPI |
| GAP-REC-002 | Interview Attachment | N/A | `InterviewAttachmentAPI.php` tồn tại — rule upload/download file đính kèm phỏng vấn chưa được extract. | gap | medium | Đã điều tra — phát hiện file chưa được phân tích | Cần extract từ InterviewAttachmentAPI |
| GAP-REC-003 | Candidate Attachment | N/A | `CandidateAttachmentAPI.php` — rule upload CV/hồ sơ đính kèm chưa được extract. | gap | medium | Đã điều tra — phát hiện file chưa được phân tích | Cần extract từ CandidateAttachmentAPI |
| GAP-REC-004 | Hiring Manager scope | PERM-REC-017, PERM-REC-018 | Chưa rõ scope permission của Hiring Manager khi xem/tương tác với ứng viên của vacancy mà họ quản lý. | inferred | low | Đã điều tra — logic phức tạp trong UserRoleManager | Cần verify HiringManagerPermission trong source |
| GAP-REC-005 | Public Apply validation | N/A | Validation rules cho form "Apply Online" của người dùng bên ngoài (public/anonymous) chưa được extract. | gap | medium | Đã điều tra — controller tại PublicController | Cần extract từ Controller/PublicController/ApplicantController |
| GAP-REC-006 | CandidateHistory | N/A | Business rule ghi `CandidateHistory` (action log) sau mỗi state transition — chưa có spec mô tả khi nào ghi, ghi gì. | inferred | medium | Đã điều tra — inferred từ entity structure | Cần verify từ AbstractCandidateActionAPI |
| GAP-REC-007 | Deprecated fields | N/A | `Candidate.status`, `cvFileId`, `cvTextVersion` bị `@deprecated` nhưng vẫn tồn tại trong DB. Cần xác nhận liệu old data migration đã xong chưa. | conflict | low | Đã điều tra — thấy @deprecated annotation | Cần xác nhận với BA/Dev |
