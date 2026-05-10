# Business Context: Maintenance Module

## 1. Mục Đích & Vai Trò
Phân hệ **Maintenance (Bảo trì)** ra đời nhằm đáp ứng các yêu cầu khắt khe về **Data Privacy (Quyền riêng tư dữ liệu)**, đặc biệt là đạo luật GDPR của Châu Âu. Phân hệ cung cấp công cụ cho Quản trị viên hệ thống để thực hiện "Quyền được lãng quên" (Right to be forgotten) bằng cách xóa vĩnh viễn (Purge) hồ sơ, và "Quyền truy cập dữ liệu" bằng cách xuất toàn bộ thông tin (Export Data).

## 2. Quy trình Nghiệp vụ Cốt lõi (Core Workflows)

### 2.1 Xóa vĩnh viễn (Purging)
Trong OrangeHRM, việc xóa một nhân viên từ giao diện PIM hay xóa ứng viên từ giao diện Recruitment bản chất chỉ là "Soft Delete" (xóa mềm) hoặc "Terminate" (chấm dứt). Dữ liệu vẫn còn nguyên trong DB để phục vụ báo cáo. 
Chỉ có tính năng **Purge** trong phân hệ Maintenance mới gọi câu lệnh DELETE thực sự xuống các bảng liên quan (Cascade Delete) để hủy hoàn toàn sự tồn tại của thực thể đó.

### 2.2 Bảo vệ dữ liệu ứng viên (GDPR Consent)
Hệ thống tuyển dụng cho phép ứng viên đánh dấu ô "Đồng ý cho lưu trữ hồ sơ cho các cơ hội sau này". Phân hệ Maintenance tôn trọng lựa chọn này một cách tuyệt đối: Nó không cho phép Admin nhìn thấy hay xóa (Purge) những ứng viên đã cấp quyền lưu trữ (`ConsentToKeepData = true`).

## 3. Rủi ro hệ thống
Đây là phân hệ có mức độ rủi ro cao nhất. Một sai sót trong thao tác Purge có thể làm mất dữ liệu nhân sự không thể phục hồi. Do đó, chỉ Admin tối cao mới được cấp quyền truy cập.
