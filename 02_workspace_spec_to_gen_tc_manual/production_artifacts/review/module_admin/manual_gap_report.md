# Manual Gap Report: Admin

## 1. Duplicate Testcases
- Không phát hiện TC trùng lặp.

## 2. Missing Coverage
- **Missing P1**: Đã cover đầy đủ BR-001, BR-002, BR-003, BR-004, BR-005.
- **Missing Negative Paths**: Đã có TC chặn xóa Root, xóa Admin, tạo trùng username/title.
- **Missing Cross-module**: Đã có IT kiểm tra ràng buộc `empNumber` với PIM và sync Job Title sang PIM.

## 3. Traceability
- Toàn bộ 15 testcases đều có Trace ID hợp lệ (map về BR-001 đến BR-005, và các FR tương ứng).

## 4. Automation Readiness Blockers
- Tính năng Email Configuration đang thiếu spec (được đánh dấu Blocked ở spec_gap_report). KHÔNG sinh TC cho các phần này.
