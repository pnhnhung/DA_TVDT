# Entity Map: Admin Module

| Entity / Model | Core Fields | Constraints / Rules | Related Entities | Source Trace | Status |
|---|---|---|---|---|---|
| Entity / Model | Core Fields | Constraints / Rules | Related Entities | Source Trace | Status |
|---|---|---|---|---|---|
| Entity / Model | Core Fields | Constraints / Rules | Related Entities | Source Trace | Status |
|---|---|---|---|---|---|
| **SystemUser** | id, user_role_id, emp_number, user_name, status, deleted | user_name unique, emp_number must exist | Employee (PIM), UserRole | `routes.yaml#37[inferred]` | inferred |
| **JobTitle** | id (int), job_title (string, 100), job_description (string, 400), note (string, 400), is_deleted (bool) | job_title unique | Employee (PIM) | `orangehrmAdminPlugin/entity/JobTitle.php#31[entity]` | confirmed |
| **PayGrade** | id (int), name (string, 60) | name unique | PayGradeCurrency, Employee | `orangehrmAdminPlugin/entity/PayGrade.php#29[entity]` | confirmed |
| **PayGradeCurrency** | pay_grade_id (int), currency_id (string), min_salary (float), max_salary (float) | min < max, composite PK (pay_grade_id, currency_id) | PayGrade, CurrencyType | `orangehrmAdminPlugin/entity/PayGradeCurrency.php#27[entity]` | confirmed |
| **EmploymentStatus** | id, name | name unique | Employee (PIM) | `routes.yaml#65[inferred]` | inferred |
| **JobCategory** | id, name | name unique | Employee (PIM) | `routes.yaml#23[inferred]` | inferred |
| **WorkShift** | id, name, hours_per_day, start_time, end_time | name unique | EmployeeWorkShift | `routes.yaml#200[inferred]` | inferred |
| **Location** | id (int), name (string, 110), country_code (string), province (string, 60), city (string, 60), address (string, 255), zip_code (string, 35), phone (string, 35), fax (string, 35), notes (string, 255) | name unique | Subunit, Employee (PIM) | `orangehrmAdminPlugin/entity/Location.php#32[entity]` | confirmed |
| **Organization** | id (int), name (string, 100), tax_id (string, 30), registration_number (string, 30), phone (string, 30), fax (string, 30), email (string, 30), country (string, 30), province (string, 30), city (string, 30), zip_code (string, 30), street1 (string, 100), street2 (string, 100), note (string, 255) | Single record info | Subunit | `orangehrmAdminPlugin/entity/Organization.php#29[entity]` | confirmed |
| **Subunit** (Organization) | id (int), name (string, 100), unit_id (string, 100), description (string, 400), level, lft, rgt | name unique, Tree structure (nested set) | Location, Employee | `orangehrmAdminPlugin/entity/Subunit.php#33[entity]` | confirmed |
| **Skill** | id (int), name (string, 120), description (text) | name unique | EmployeeSkill (PIM) | `orangehrmAdminPlugin/entity/Skill.php#29[entity]` | confirmed |
| **Education** | id (int), name (string, 100) | name unique | EmployeeEducation (PIM) | `orangehrmAdminPlugin/entity/Education.php#31[entity]` | confirmed |
| **License** | id (int), name (string, 100) | name unique | EmployeeLicense (PIM) | `orangehrmAdminPlugin/entity/License.php#29[entity]` | confirmed |
| **Language** | id (int), name (string, 120) | name unique | EmployeeLanguage (PIM) | `orangehrmAdminPlugin/entity/Language.php#29[entity]` | confirmed |
| **Membership** | id (int), name (string, 100) | name unique | EmployeeMembership (PIM) | `orangehrmAdminPlugin/entity/Membership.php#29[entity]` | confirmed |
| **Nationality** | id, name | name unique | Employee (PIM) | `routes.yaml#178[inferred]` | inferred |


*Ghi chú: Trạng thái `confirmed` là do đã đọc trực tiếp Doctrine Entity source code.*

