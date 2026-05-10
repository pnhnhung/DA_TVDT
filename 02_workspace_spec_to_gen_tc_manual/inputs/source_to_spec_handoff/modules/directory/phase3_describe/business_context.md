# Business Context: Directory Module

## 1. Mục Đích & Vai Trò
Phân hệ **Directory (Danh bạ Nội bộ)** cung cấp danh bạ điện tử cho công ty. Mục đích chính là giúp mọi nhân viên có thể nhanh chóng tra cứu thông tin liên lạc công việc (email công ty, số điện thoại bàn, vị trí ngồi) của đồng nghiệp mà không cần làm phiền tới phòng Nhân sự.

## 2. Quy trình Nghiệp vụ Cốt lõi (Core Workflows)

### 2.1 Tra cứu (Read-only Operation)
- Không giống như các phân hệ khác, **Directory hoàn toàn không có tính năng tạo mới hay chỉnh sửa dữ liệu**.
- Nguồn dữ liệu của Directory được lấy trực tiếp từ hồ sơ gốc ở phân hệ **PIM** (Quản lý thông tin nhân sự).
- Khi nhân sự (HR) thay đổi chức danh hoặc số điện thoại của một nhân viên trong PIM, dữ liệu đó lập tức phản ánh sang danh bạ.

### 2.2 Bảo mật Dữ liệu (Data Privacy)
- Danh bạ chỉ phơi bày các thông tin mang tính chất công việc (Work Contact Details, Job Title, Location, Department).
- Các thông tin riêng tư (Lương, Ngày sinh, Căn cước công dân, Quá trình kỷ luật) bị che giấu hoàn toàn khỏi Directory API.
