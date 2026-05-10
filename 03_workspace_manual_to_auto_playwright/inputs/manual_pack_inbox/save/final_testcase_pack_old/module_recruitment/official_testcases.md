# Official Testcases — module_recruitment

| TC ID | Title | Level | P | Related Rule ID | Oracle | Expected Result | Precondition | Test Data |
|---|---|---|---|---|---|---|---|---|
| TC_UT_REC_VAC_01 | Tạo mới Vacancy | UT | P2 | R_REC_01 | STRONG | Toast saved; Vacancy Active | Admin logged in | Name="Dev" |
| TC_UT_REC_VAC_02 | Tạo Vacancy trùng tên | UT | P1 | R_REC_01 | STRONG | Error "Already exists" | Admin logged in | Duplicate name |
| TC_UT_REC_VAC_04 | Cập nhật Vacancy | UT | P2 | R_REC_01 | STRONG | Toast saved | Admin logged in | Edit name |
| TC_UT_REC_VAC_05 | Xóa Vacancy | UT | P2 | R_REC_01 | STRONG | Toast deleted | Admin logged in | Delete Vacancy |
| TC_UT_REC_CAN_01 | Candidate Apply thành công | UT | P1 | R_REC_02 | STRONG | State = Application Initiated | Admin/Candidate | Name, Email, CV |
| TC_UT_REC_CAN_02 | Candidate trùng Email 1 Vacancy | UT | P1 | BR_REC_02 | STRONG | Error "Email already exists" | Admin | Duplicate email |
| TC_UT_REC_CAN_03 | Candidate Email sai định dạng | UT | P1 | R_REC_02 | STRONG | Error invalid format | Admin | Email="abc" |
| TC_UT_REC_CAN_04 | Upload CV vượt dung lượng | UT | P1 | R_REC_0x | STRONG | Error file size | Admin | CV > 1MB |
| TC_UT_REC_CAN_06 | Xóa Candidate | UT | P2 | R_REC_02 | STRONG | Toast deleted | Admin | Delete Candidate |
| TC_UT_REC_WF_01 | Shortlist Candidate | UT | P1 | BR_REC_03 | STRONG | State = Shortlisted | Initiated | Shortlist action |
| TC_UT_REC_WF_02 | Schedule Interview | UT | P1 | BR_REC_03 | STRONG | State = Interview Scheduled | Shortlisted | Date, Time, Interviewer |
| TC_UT_REC_WF_04 | Mark Interview Passed | UT | P1 | BR_REC_03 | STRONG | State = Interview Passed | Interviewed | Mark Passed |
| TC_UT_REC_WF_05 | Offer Job | UT | P1 | BR_REC_03 | STRONG | State = Job Offered | Passed | Offer |
| TC_UT_REC_WF_06 | Hire Candidate | UT | P1 | BR_REC_03 | STRONG | State = Hired | Offered | Hire |
| TC_UT_REC_WF_07 | Reject Candidate | UT | P1 | BR_REC_03 | STRONG | State = Rejected | Shortlisted | Reject |
| TC_IT_REC_04 | Workflow Hire to PIM Employee | IT | P1 | GAP-REC-01 | STRONG | Email mapped to otherEmail | Candidate Hired | Check DB / PIM |
