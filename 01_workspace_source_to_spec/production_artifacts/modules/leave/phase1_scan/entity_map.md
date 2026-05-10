# Entity Map: Leave Module

| Entity / Model | Core Fields | Constraints / Rules | Related Entities | Source Trace | Status |
|---|---|---|---|---|---|
| **LeaveType** | id, name, exclude_in_reports_if_no_entitlement, operational_country_id | name unique | LeaveEntitlement, LeaveRequest | `routes.yaml#39[inferred]` | inferred |
| **LeavePeriod** | id, start_month, start_date, end_month, end_date | Có thể chỉ có 1 record hệ thống | LeaveEntitlement | `routes.yaml#24[inferred]` | inferred |
| **WorkWeek** | id, monday, tuesday... sunday (chiều dài làm việc) | Định nghĩa ngày làm việc | Employee | `routes.yaml#16[inferred]` | inferred |
| **Holiday** | id, name, date, recurring, length | date và recurring ảnh hưởng số ngày nghỉ | | `routes.yaml#2[inferred]` | inferred |
| **LeaveEntitlement** | id, emp_number, no_of_days, leave_type_id, from_date, to_date, credited_date, note, entitlement_type | Tổng số ngày phép được cấp | Employee (PIM), LeaveType | `routes.yaml#103[inferred]` | inferred |
| **LeaveRequest** | id, emp_number, leave_type_id, date_applied, comments | Đại diện cho 1 lần xin nghỉ (gồm nhiều ngày) | Employee (PIM), LeaveType, Leave | `routes.yaml#62[inferred]` | inferred |
| **Leave** | id, leave_request_id, date, length_hours, length_days, status, comments | Đại diện cho từng ngày nghỉ chi tiết trong 1 Request | LeaveRequest | `routes.yaml#186[inferred]` | inferred |
| **LeaveComment** | id, leave_id, created_by_emp_number, comments, created | Log comment | Leave, LeaveRequest | `routes.yaml#172[inferred]` | inferred |

*Note: Trạng thái hiện đang là `inferred` do chỉ lấy từ Routes. Sẽ được verify thành `confirmed` khi scan tới API/Service thực tế trong code ở Phase 2.*
