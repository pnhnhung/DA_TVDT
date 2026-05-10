# Locator Package Summary — Recruitment

| Screen | Total Elements | VERIFIED | CONDITIONAL | NEED_DATA | UNRESOLVED |
|---|---|---|---|---|---|
| Vacancy | 12 | 10 | 2 | 0 | 0 |
| Candidate | 13 | 6 | 7 | 0 | 0 |
| **Total** | **25** | **16** | **9** | **0** | **0** |

## UNRESOLVED Elements (cần user quyết định)
| Element ID | Screen | Lý do Unresolved | Đề xuất |
|---|---|---|---|
| (None) | | | |

## CONDITIONAL Elements (trigger conditions)
| Element ID | Screen | Trigger condition |
|---|---|---|
| successToast | Vacancy/Candidate | Xuất hiện sau khi Save/Delete thành công. |
| alreadyExistsError | Vacancy | Báo lỗi khi tạo trùng tên. |
| errorFormatMessage | Candidate | Báo lỗi khi định dạng Email sai. |
| shortlistButton | Workflow | Candidate ở trạng thái "Initiated". |
| scheduleInterviewButton | Workflow | Candidate ở trạng thái "Shortlisted". |
| markPassedButton | Workflow | Candidate ở trạng thái "Interview Scheduled". |
| offerJobButton | Workflow | Candidate ở trạng thái "Interview Passed". |
| hireButton | Workflow | Candidate ở trạng thái "Job Offered". |
| rejectButton | Workflow | Candidate ở bất kỳ trạng thái nào trước Hired. |
| confirmYesButton | Vacancy | Sau khi bấm Delete icon trên lưới. |

## Recommendation cho flow 02
- Proceed: **Yes**
- Blocked testcases (do UNRESOLVED): **None**
- **Note:** Generator (02) PHẢI copy toàn bộ block `TypeScript LocatorSpec Code` vào `src/locators/recruitment/recruitment.locators.ts` trước khi tạo các Page Objects tương ứng (`vacancy.page.ts`, `candidate.page.ts`).
