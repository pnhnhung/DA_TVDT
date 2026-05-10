# Module Spec: Recruitment

## Phạm Vi & Mục Đích
Phân hệ **Recruitment** quản lý toàn bộ vòng đời tuyển dụng của công ty. Phân hệ bao gồm việc quản lý các vị trí tuyển dụng (Vacancies), hồ sơ ứng viên (Candidates), và luồng xử lý trạng thái ứng viên (Workflow State Machine) từ lúc nộp hồ sơ cho đến khi được tuyển dụng (Hired).

## Actors & Roles
| Role | Quyền chính |
|---|---|
| Admin | Có toàn quyền tạo Vacancy, thêm Candidate, lên lịch phỏng vấn và thay đổi trạng thái. |
| Hiring Manager | Có quyền quản lý các Vacancy được giao, tương tác với các ứng viên thuộc Vacancy đó. |
| Interviewer | Chỉ có quyền xem thông tin ứng viên và thực hiện đánh giá phỏng vấn (Mark Pass/Fail). |

## Features Chính
| Feature | Mô tả | Source |
|---|---|---|
| Vacancy Management | Tạo, sửa, xóa vị trí tuyển dụng. | `Api/VacancyAPI.php` |
| Candidate Management | Thêm ứng viên, quản lý hồ sơ, gán ứng viên vào Vacancy. | `Api/CandidateAPI.php` |
| Candidate Workflow | Quản lý vòng đời trạng thái của ứng viên thông qua state machine. | `Api/AbstractCandidateActionAPI.php` |
| Interviews | Lên lịch phỏng vấn và ghi nhận kết quả (đang thiếu spec). | GAP |
| Attachments | Đính kèm CV/Resume cho Candidate (đang thiếu spec). | GAP |

## Field Rules Quan Trọng
- **Vacancy**: Bắt buộc phải liên kết tới một `jobTitleId` hợp lệ và một `employeeId` (Hiring Manager).
- **Candidate**: Bắt buộc có `firstName`, `lastName`, và `email` hợp lệ.

## Business Rules Quan Trọng
- **State Machine Constraint**: Trạng thái của Candidate chuyển đổi tuần tự (VD: Shortlist -> Schedule Interview -> Interview Passed -> Offered -> Hired). Việc bỏ qua bước (nếu không được phép) sẽ bị chặn lại ở API mức độ hệ thống.
- **Auto Employee Creation**: Ngay khi trạng thái của ứng viên chuyển sang `HIRED`, hệ thống sẽ tự động tạo một tài khoản Employee mới dựa trên thông tin cá nhân và Vacancy tương ứng.
- **Attach/Change Vacancy**: Thay đổi Vacancy của Candidate sẽ reset toàn bộ quá trình tuyển dụng hiện tại về trạng thái `APPLICATION INITIATED`.

## Cross-Module Dependencies
| Module | Relationship | Contract Status |
|---|---|---|
| PIM | Tuyển dụng thành công tự động sinh dữ liệu Employee cho module PIM. | PARTIAL |
| Admin | Vacancy liên kết tới Job Titles từ module Admin. | PARTIAL |

## Gaps & Questions
Hiện tại Phase 2 extraction cho module Recruitment đã bao phủ rất tốt core features. Tuy nhiên còn thiếu:
- Chức năng lên lịch phỏng vấn (Schedule Interview, Interviewers, Time).
- Chức năng đính kèm tệp Resume/CV.
