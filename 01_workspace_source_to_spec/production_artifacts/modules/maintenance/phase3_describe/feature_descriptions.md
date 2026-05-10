# Feature Descriptions: Maintenance Module

## 1. Tính năng Dọn dẹp Dữ liệu (Data Purging)

### 1.1 Purge Employee (Xóa nhân viên)
- Giao diện Admin gửi DELETE request với tham số `empNumber`.
- Hệ thống chặn nếu nhân viên vẫn đang hoạt động (không thuộc diện Purgeable).
- Xóa thành công sẽ trigger việc xóa dây chuyền toàn bộ thông tin lương, chấm công, ngày phép... liên quan đến ID đó.

### 1.2 Purge Candidates (Xóa ứng viên)
- Giao diện Admin có thể liệt kê các hồ sơ ứng viên rác của một chiến dịch tuyển dụng (`vacancyId`).
- Bộ lọc mặc định sẽ CHE giấu toàn bộ các ứng viên có cờ `consentToKeepData` (Đã đồng ý lưu hồ sơ). Nghĩa là Admin không thể lỡ tay xóa mất hồ sơ của những người đã cấp quyền này.
- Gọi DELETE để xóa toàn bộ dữ liệu (CV đính kèm, lịch sử phỏng vấn...) của những ứng viên không được bảo vệ.

## 2. Tính năng Export (Quyền truy cập dữ liệu)

### 2.1 Access Employee Data
- Endpoint tải xuống một file JSON (`AccessEmployeeFileController.php`).
- File này gom toàn bộ các thuộc tính, thông tin cá nhân của nhân sự nhằm cung cấp cho họ khi họ yêu cầu trích xuất dữ liệu.
