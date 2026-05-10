# Suggested Testcases — module_admin_job

| TC ID | Title | Level | Reason | Rule ID | Expected Result |
|---|---|---|---|---|---|
| TC_IT_JOB_03 | Race condition xóa Job Title lúc tạo Vacancy | IT | Behavior hữu ích chưa confirm | BR_REC_JOB | Submit bị từ chối do Job Title không còn tồn tại |
| TC_UT_JOB_11 | Salary Min > Max | UT | Confirm behavior của validation | R_JOB_09 | Hiển thị lỗi Min không được lớn hơn Max |
