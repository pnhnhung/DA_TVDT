| Rule ID | Type | Rule Statement | Status | Confidence | Evidence | Note |
|---|---|---|---|---|---|---|
| FR-001 | field | User Management `username`: min 5, max 40, unique, required | confirmed | high | `Api/UserAPI.php` | |
| FR-002 | field | User Management `password`: max 64, required | confirmed | high | `Api/UserAPI.php` | |
| FR-003 | field | User Management `userRoleId`: required, int | confirmed | high | `Api/UserAPI.php` | |
| FR-004 | field | User Management `empNumber`: required, int | confirmed | high | `Api/UserAPI.php` | |
| FR-005 | field | User Management `status`: required, boolean | confirmed | high | `Api/UserAPI.php` | |
| FR-006 | field | Job Titles `title`: max 100, unique, required | confirmed | high | `Api/JobTitleAPI.php` | |
| FR-007 | field | Job Titles `description`: max 400 | confirmed | high | `Api/JobTitleAPI.php` | |
| FR-008 | field | Job Titles `note`: max 400 | confirmed | high | `Api/JobTitleAPI.php` | |
| FR-009 | field | Job Titles `specification`: base64, max name 200 | confirmed | high | `Api/JobTitleAPI.php` | |
| FR-010 | field | Job Titles `currentJobSpecification`: keepCurrent/deleteCurrent/replaceCurrent | confirmed | high | `Api/JobTitleAPI.php` | |
| FR-011 | field | Job Categories `name`: max 50, unique, required | confirmed | high | `Api/JobCategoryAPI.php` | |
| FR-012 | field | Skills `name`: max 120, unique, required | confirmed | high | `Api/SkillAPI.php` | |
| FR-013 | field | Skills `description`: max 400 | confirmed | high | `Api/SkillAPI.php` | |
| FR-014 | field | Education `name`: max 100, unique, required | confirmed | high | `Api/EducationAPI.php` | |
| FR-015 | field | Languages `name`: max 120, unique, required | confirmed | high | `Api/LanguageAPI.php` | |
| FR-016 | field | Licenses `name`: max 100, unique, required | confirmed | high | `Api/LicenseAPI.php` | |
| FR-017 | field | Memberships `name`: max 100, unique, required | confirmed | high | `Api/MembershipAPI.php` | |
| FR-018 | field | Locations `name`: max 100, unique, required | confirmed | high | `Api/LocationAPI.php` | |
| FR-019 | field | Locations `countryCode`: required, ISO code | confirmed | high | `Api/LocationAPI.php` | |
| FR-020 | field | Organization `name`: max 100, required | confirmed | high | `Api/OrganizationAPI.php` | |
| FR-021 | field | Subunits `name`: max 100, unique, required | confirmed | high | `Api/SubunitAPI.php` | |
| FR-022 | field | Pay Grades `name`: max 100, unique, required | confirmed | high | `Api/PayGradeAPI.php` | |
| FR-023 | field | Pay Grade Currency `currencyId`: required, max 3 | confirmed | high | `Api/PayGradeCurrencyAPI.php` | |
| FR-024 | field | Pay Grade Currency `minSalary`: max 10^9, decimal 0-2 | confirmed | high | `Api/PayGradeCurrencyAPI.php` | |
| FR-025 | field | Pay Grade Currency `maxSalary`: max 10^9, decimal 0-2 | confirmed | high | `Api/PayGradeCurrencyAPI.php` | |
| BR-001 | business | Delete System Users: Xóa cứng (hard delete), không thể login được nữa, không thể xóa user hiện tại hoặc user mặc định | confirmed | high | `Api/UserAPI.php#getValidationRuleForDelete:474` | |
| BR-002 | business | Create System User: Tên đăng nhập phải là duy nhất. Liên kết với empNumber hợp lệ | confirmed | high | `Api/UserAPI.php#create:267` | |
| BR-003 | business | Update Job Specification: Logic Keep/Delete/Replace file đính kèm | confirmed | high | `Api/JobTitleAPI.php#update:429` | |
| BR-004 | business | Delete Subunit Protection: Không thể xóa node gốc (ID=1) của cấu trúc tổ chức | confirmed | high | `Api/SubunitAPI.php#getValidationRuleForDelete:426` | |
| BR-005 | business | Pay Grade Salary Range: Max Salary phải lớn hơn Min Salary | confirmed | high | `Api/PayGradeCurrencyAPI.php#savePayGradeCurrency:440` | |

