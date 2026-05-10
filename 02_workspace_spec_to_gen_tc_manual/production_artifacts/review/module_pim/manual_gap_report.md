# Manual Gap Report: PIM

## 1. Duplicate Testcases
- Không phát hiện TC trùng lặp.

## 2. Missing Coverage
- **Missing P1**: Đã cover đầy đủ BR-001, BR-002, BR-004, BR-005.
- **Missing Negative Paths**: Đã có TC chặn tạo trùng Employee ID, trùng Email (giữa các user), và trùng Email (giữa Work/Other của cùng 1 user).
- **Missing Cross-module**: Đã có IT kiểm tra trigger event (EmployeeAdded, EmployeeDeleted, JoinedDateChanged) sang các module Leave/Time/Admin.

## 3. Traceability
- Toàn bộ 13 testcases đều có Trace ID hợp lệ (map về BR-001 đến BR-005, và các FR tương ứng).

## 4. Automation Readiness Blockers
- Tính năng Reactivate Employee đang thiếu spec (được đánh dấu Blocked ở spec_gap_report). KHÔNG sinh TC cho phần này.
- Ghi nhận cảnh báo về việc tìm kiếm ID của tài khoản Admin mặc định để loại trừ trong quá trình chạy test xóa (Undeletable check).
