# Integration Points: PIM

| Source Module | Target Module | Trigger | Data Passed | Observable Result | Side Effect | Source | Status |
|---|---|---|---|---|---|---|---|
| PIM | Leave (subscriber) | 1. Click Save (Add Employee)<br>2. Import CSV thành công | EmployeeAddedEvent (empNumber) | Cập nhật entitlement/quota ngày nghỉ cho nhân viên mới nếu có auto-assignment | | `Service/EmployeeService.php#173` | confirmed |
| PIM | Leave (subscriber) | 1. Click Delete Selected<br>2. Click icon Thùng rác | EmployeeDeletedEvent (empNumbers[]) | Xóa hoặc vô hiệu hóa dữ liệu liên quan của Leave Request | | `Service/EmployeeService.php#279` | confirmed |
| PIM | Admin | 1. Click Delete Selected<br>2. Click icon Thùng rác | Xóa Admin/User record | Xóa user đăng nhập map với Employee | | inferred | inferred |
| PIM | Leave (subscriber) | Click Save ở màn hình Job Details (nếu đổi Joined Date) | JoinedDateChangedEvent (employee, currentDate) | Recalculate ngày phép (entitlements) dựa trên thâm niên thay đổi | | `Api/EmployeeJobDetailAPI.php#176` | confirmed |
