# Entity Map: Directory

## Không Có Entity Riêng

**Kết luận**: Module Directory **không có entity riêng**. Nó là một **read-only view** tổng hợp dữ liệu từ PIM:
- Employee basic info (name, job title, department, location, phone)
- Filter by: Job Title, Department, Location, Employee Name

**DB Source**: Dữ liệu đến từ các tables của PIM/Admin:
- `hs_hr_employee` (Employee entity từ PIM)
- `ohrm_job_title` (JobTitle từ Admin)
- `ohrm_subunit` (Subunit từ Admin)
- `ohrm_location` (Location từ Admin)

**Source**: `orangehrmDirectoryPlugin/Api/EmployeeDirectoryAPI.php`
**Evidence**: `Api/EmployeeDirectoryAPI.php` → throws `NotImplementedException` trên create/update/delete → **Read-only module**

> Business Rule BR-001 đã confirmed: Directory là read-only, tất cả write operations throw NotImplementedException.
