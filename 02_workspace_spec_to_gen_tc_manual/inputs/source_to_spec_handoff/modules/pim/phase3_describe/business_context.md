# Business Context: PIM

## Overview
PIM (Personnel Information Management) là module cốt lõi, hoạt động như cơ sở dữ liệu tập trung (Centralized Database) về nhân sự của OrangeHRM. Nó quản lý toàn bộ vòng đời của nhân viên, từ khi được thêm mới đến khi nghỉ việc.

## Business Value
- Duy trì một Single Source of Truth về thông tin nhân viên cho toàn hệ thống.
- Cung cấp nền tảng dữ liệu để các chức năng như xin nghỉ phép, chấm công, phê duyệt hoạt động.
- Trích xuất các báo cáo nhân sự toàn diện.

## Key Stakeholders
- **HR Admin / Manager**: Người cấu hình cấu trúc dữ liệu, thêm mới và quản lý vòng đời nhân sự.
- **Employees**: Cập nhật thông tin cá nhân và xem hồ sơ nội bộ.
- **Managers / Supervisors**: Quản lý thông tin và báo cáo về nhân viên cấp dưới trực tiếp.

## Business Calendar / Cycles
- Việc thêm nhân viên diễn ra liên tục theo đợt tuyển dụng.
- Cập nhật thông tin cá nhân thường xảy ra định kỳ (hàng năm) hoặc khi có sự kiện thay đổi (địa chỉ, số điện thoại, hợp đồng mới).

## Compliance / Legal Requirements
- Dữ liệu PIM thường chứa PII (Personally Identifiable Information) như CMND/Passport, mã số thuế, cần bảo mật phân quyền chặt chẽ.
