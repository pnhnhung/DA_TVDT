# Integration Points: Recruitment

| Source Module | Target Module | Trigger (UI) | Data Passed | Observable Result | Side Effect | Source | Status |
|---|---|---|---|---|---|---|---|
| Recruitment | PIM | Click "Hire" (Candidate Hiring action) | `empNumber` mới tạo hoặc liên kết với Employee | Ứng viên được thêm vào hệ thống như một nhân viên; bản ghi Candidate chuyển sang HIRED | Có thể tạo Employee record mới trong PIM | `Api/CandidateHiringAPI.php` | confirmed |
| Recruitment | PIM | Tạo/xem Vacancy — chọn Hiring Manager | `hiringManager.empNumber` | Danh sách Hiring Manager lấy từ Employee trong PIM | | `Api/HiringManagerAPI.php`, `entity/Vacancy.php#hiring_manager_id` | confirmed |
| Recruitment | Admin (Job) | Tạo/xem Vacancy — chọn Job Title | `jobTitle.id` | Danh sách Job Titles lấy từ Admin module | | `entity/Vacancy.php#job_title_code` | confirmed |
| Recruitment | Maintenance (Purge) | Admin thực hiện Purge Candidates | `vacancyId`, `consentToKeepData=false` | Xóa vĩnh viễn hồ sơ ứng viên không có consent | Xóa `Candidate`, `CandidateAttachment`, `CandidateHistory`, `CandidateVacancy` | `Api/PurgeCandidateAPI.php` (Maintenance module) | confirmed |
| Recruitment | Dashboard | Supervisor/Admin load Dashboard My Actions widget | `accessibleCandidateIds` | Số lượng ứng viên đang chờ action hiển thị trên Dashboard | | `Api/EmployeeActionSummaryAPI.php` (Dashboard module) | confirmed |
