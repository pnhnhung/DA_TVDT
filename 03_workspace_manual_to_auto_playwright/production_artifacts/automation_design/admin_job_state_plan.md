# State Plan — Admin Job Module

Lộ trình triển khai tự động hóa cho module Admin > Job.

| State ID | Module Area | Testcase IDs | Priority | Target Specs | Data Strategy |
|---|---|---|---|---|---|
| **STATE_ADMIN_JOB_TITLES** | Job Titles | TC_UT_JOB_TITLE_01, 02, 03, 05, 06 | P1 | `tests/generated/admin/job_title.spec.ts` | Unique Job Title name |
| **STATE_ADMIN_PAY_GRADES** | Pay Grades | TC_UT_JOB_PAY_01, 02, 03, 04, 05, 06, 07 | P1 | `tests/generated/admin/pay_grade.spec.ts` | Unique Pay Grade, existing Currency |
| **STATE_ADMIN_JOB_CONFIGS** | Emp Status & Categories | TC_UT_JOB_EMP_01-04, TC_UT_JOB_CAT_01-04 | P2 | `tests/generated/admin/job_configs.spec.ts` | Unique Status/Category names |
| **STATE_ADMIN_WORK_SHIFTS** | Work Shifts | TC_UT_JOB_SHIFT_01, 02, 03, 04, 05 | P1 | `tests/generated/admin/work_shift.spec.ts` | Unique Shift name |
| **STATE_ADMIN_JOB_SECURITY** | Permissions | TC_UT_JOB_PERM_01 | P2 | `tests/generated/admin/job_security.spec.ts` | Non-admin user login |

## Execution Sequence
1. Triển khai **STATE_ADMIN_JOB_TITLES** đầu tiên vì đây là dữ liệu nền quan trọng cho nhiều module khác.
2. Các State khác có thể thực hiện song song sau khi State 1 ổn định.
