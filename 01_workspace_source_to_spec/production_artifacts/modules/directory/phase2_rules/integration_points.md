# Integration Points: Directory

| Source Module | Target Module | Trigger (UI) | Data Passed | Observable Result | Side Effect | Source | Status |
|---|---|---|---|---|---|---|---|
| Directory | PIM | Xem danh sách nhân viên trong directory | Filter params | Dữ liệu Employee lấy từ PIM | | `Api/EmployeeDirectoryAPI.php` | confirmed |
| Directory | Admin (Job) | Filter by Job Title | `jobTitleId` | Danh sách Job Titles từ Admin | | `Api/EmployeeDirectoryAPI.php` | confirmed |
| Directory | Admin (Org) | Filter by Department/Location | `subunitId`, `locationId` | Danh sách Subunit/Location từ Admin | | `Api/EmployeeDirectoryAPI.php` | confirmed |
