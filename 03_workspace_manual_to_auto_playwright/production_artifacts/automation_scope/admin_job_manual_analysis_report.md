# Manual Analysis Report — Admin Job Module

## Overview
- **Module:** Admin > Job
- **Total Test Cases:** 26
- **Automation Ready:** 26
- **Automation With Condition:** 0
- **Manual Only:** 0
- **Blocked:** 0

## Classification Summary

### Job Titles (5 TCs)
- Kiểm tra CRUD cơ bản cho chức danh công việc.
- Validation trùng tên và bỏ trống trường bắt buộc.

### Pay Grades & Currencies (7 TCs)
- Quản lý bậc lương và gán đơn vị tiền tệ.
- Validation logic Min/Max salary.

### Employment Status (4 TCs)
- CRUD đơn giản cho trạng thái nhân viên (Full-time, Part-time...).

### Job Categories (4 TCs)
- CRUD đơn giản cho danh mục công việc.

### Work Shifts (5 TCs)
- Quản lý ca làm việc, gán nhân viên (nếu có).
- Validation định dạng giờ làm việc.

### Security/Permission (1 TC)
- Kiểm tra quyền truy cập của người dùng không phải Admin vào module này.

## Strategy
- Sử dụng POM để tách biệt các màn hình con trong Admin > Job.
- Dữ liệu test (Name, Code) sẽ được sinh ngẫu nhiên kèm timestamp để tránh xung đột dữ liệu khi chạy lại.
- Các State sẽ được chia theo tiểu mục để dễ quản lý và thực hiện.
