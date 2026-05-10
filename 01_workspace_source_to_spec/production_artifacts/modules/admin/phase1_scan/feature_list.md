# Feature List: Admin Module

| Feature | Screen / Action | API Endpoint | Methods | Source Trace | Status |
|---|---|---|---|---|---|
| **User Management** | View System Users | `/api/v2/admin/users` | GET | `config/routes.yaml#44[route]` | confirmed |
| User Management | Add/Edit System User | `/api/v2/admin/users`, `/api/v2/admin/users/{id}` | POST, PUT | `config/routes.yaml#37[route]` | confirmed |
| User Management | Delete System User | `/api/v2/admin/users` | DELETE | `config/routes.yaml#44[route]` | confirmed |
| **Job** | View Job Titles | `/api/v2/admin/job-titles` | GET | `config/routes.yaml#8[route]` | confirmed |
| Job | Add/Edit/Delete Job Title | `/api/v2/admin/job-titles`, `/{id}` | POST, PUT, DELETE | `config/routes.yaml#1[route]` | confirmed |
| Job | View Pay Grades | `/api/v2/admin/pay-grades` | GET | `config/routes.yaml#244[route]` | confirmed |
| Job | Add/Edit/Delete Pay Grades | `/api/v2/admin/pay-grades`, `/{id}` | POST, PUT, DELETE | `config/routes.yaml#251[route]` | confirmed |
| Job | Pay Grade Currencies | `/api/v2/admin/pay-grades/{payGradeId}/currencies` | GET, POST, PUT, DELETE | `config/routes.yaml#164[route]` | confirmed |
| Job | View Employment Status | `/api/v2/admin/employment-statuses` | GET | `config/routes.yaml#72[route]` | confirmed |
| Job | Add/Edit/Delete Emp Status | `/api/v2/admin/employment-statuses`, `/{id}` | POST, PUT, DELETE | `config/routes.yaml#65[route]` | confirmed |
| Job | View Job Categories | `/api/v2/admin/job-categories` | GET | `config/routes.yaml#30[route]` | confirmed |
| Job | Add/Edit/Delete Job Category | `/api/v2/admin/job-categories`, `/{id}` | POST, PUT, DELETE | `config/routes.yaml#23[route]` | confirmed |
| Job | View Work Shifts | `/api/v2/admin/work-shifts` | GET | `config/routes.yaml#209[route]` | confirmed |
| Job | Add/Edit/Delete Work Shifts | `/api/v2/admin/work-shifts`, `/{id}` | POST, PUT, DELETE | `config/routes.yaml#200[route]` | confirmed |
| **Organization** | View/Edit Gen Info | `/api/v2/admin/organization` | GET, PUT | `config/routes.yaml#149[route]` | confirmed |
| Organization | View Locations | `/api/v2/admin/locations` | GET | `config/routes.yaml#230[route]` | confirmed |
| Organization | Add/Edit/Delete Locations | `/api/v2/admin/locations`, `/{id}` | POST, PUT, DELETE | `config/routes.yaml#223[route]` | confirmed |
| Organization | View/Edit Subunits (Struct) | `/api/v2/admin/subunits`, `/{id}` | GET, POST, PUT, DELETE | `config/routes.yaml#51[route]` | confirmed |
| **Qualifications** | Skills (CRUD) | `/api/v2/admin/skills`, `/{id}` | GET, POST, PUT, DELETE | `config/routes.yaml#93[route]` | confirmed |
| Qualifications | Educations (CRUD) | `/api/v2/admin/educations`, `/{id}` | GET, POST, PUT, DELETE | `config/routes.yaml#79[route]` | confirmed |
| Qualifications | Licenses (CRUD) | `/api/v2/admin/licenses`, `/{id}` | GET, POST, PUT, DELETE | `config/routes.yaml#107[route]` | confirmed |
| Qualifications | Languages (CRUD) | `/api/v2/admin/languages`, `/{id}` | GET, POST, PUT, DELETE | `config/routes.yaml#121[route]` | confirmed |
| Qualifications | Memberships (CRUD) | `/api/v2/admin/memberships`, `/{id}` | GET, POST, PUT, DELETE | `config/routes.yaml#135[route]` | confirmed |
| **Nationalities** | Nationalities (CRUD) | `/api/v2/admin/nationalities`, `/{id}` | GET, POST, PUT, DELETE | `config/routes.yaml#178[route]` | confirmed |
| **Configuration** | Email Configuration | `/api/v2/admin/email-configuration` | GET, PUT | `config/routes.yaml#192[route]` | confirmed |
| Configuration | Email Subscriptions | `/api/v2/admin/email-subscriptions` | GET, PUT | `config/routes.yaml#258[route]` | confirmed |
| Configuration | Localization | `/api/v2/admin/localization` | GET, PUT | `config/routes.yaml#294[route]` | confirmed |
| Configuration | Modules | `/api/v2/admin/modules` | GET, PUT | `config/routes.yaml#237[route]` | confirmed |
