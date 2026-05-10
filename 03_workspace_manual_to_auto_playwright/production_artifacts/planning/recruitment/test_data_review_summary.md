# Test Data Review Summary

## Module
Recruitment (Tất cả các States: `STATE_REC_VACANCY`, `STATE_REC_CANDIDATE`, `STATE_REC_WORKFLOW`, `STATE_REC_IT`)

## Testcases Covered
- 16 Test Cases (TC_UT_REC_VAC_01 -> TC_IT_REC_04)

## Data Reused
- Không có (Khởi tạo mới hoàn toàn để đảm bảo Test Data Strategy độc lập).

## Data Discovered
- Không có.

## Data Created (Dự kiến tạo qua Playwright MCP hoặc Auto-Setup)
- `JOB_TITLE_A_001`: Dùng làm dependency cho Vacancy.
- `VACANCY_BASE_001`: Dùng làm Vacancy mồi cho Candidate apply.
- `CANDIDATE_BASE_001`: Dùng làm Candidate mồi để đẩy qua các luồng Workflow (Shortlist, Interview, Hire).

## Data Pending / Need Review
- Toàn bộ data mồi hiện tại đang ở trạng thái **Pending**.
- **Lý do:** Đây là các bản ghi ảo (Placeholder), chúng cần được Playwright chạy thực tế trên UI/API để sinh data thật trên hệ thống (OrangeHRM) trước khi Generate Code cho Test Cases.

## Data Mapping Summary
- Mapping hoàn tất: `TC_UT_REC_VAC_01` đã trỏ về `JOB_TITLE_A_001`.
- Mapping hoàn tất: Các TC Candidate đã trỏ về `VACANCY_BASE_001`.
- Mapping hoàn tất: Các TC Workflow đã trỏ về `CANDIDATE_BASE_001`.

## Risks
1. **Liên Module (Cross-Module):** Việc tạo `Job Title` yêu cầu quyền và luồng từ module Admin. Nếu luồng Admin thay đổi, Setup Test Data Recruitment sẽ tèo.
2. **State Candidate:** Để test được trạng thái `Interview Passed`, Candidate phải đi qua `Initiated -> Shortlisted -> Interview Scheduled`. Flakiness có thể cao nếu test chạy quá nhanh.

## Recommendation
- Dùng API (`ApiClient`) để setup test data ngầm cho Vacancy và Candidate Workflow thay vì UI clicks, nhằm giảm thời gian chạy (execution time) và tăng độ ổn định (stability).
- Nếu không có API, viết các helper function trong `src/pages/recruitment/recruitment.page.ts` để tự động hóa setup.

## User Review Checklist
- [x] Đã mapping toàn bộ Required Data.
- [ ] Xác nhận đồng ý cho phép tạo Dummy Job Title qua UI/API.
- [ ] Xác nhận cách thức sinh file cứng (Dummy >1MB file) cho case Upload CV.
