# Hướng Dẫn Sử Dụng Script Dọn Dẹp Workspace

## Mục đích
Script `clean_workspace.js` được tạo ra để xóa toàn bộ các file output do AI generate ra trong quá trình làm việc của dự án hiện tại. Sau khi dọn dẹp, workspace sẽ trở lại trạng thái sạch (clean state) ban đầu, sẵn sàng để bắt đầu tự động hóa cho một dự án/module mới mà không bị lẫn lộn dữ liệu cũ.

## Tính năng chính
- Xóa toàn bộ các test script đã sinh ra trong framework (`tests/generated`).
- Xóa các Page Objects, Locators và Fixtures tương ứng của module cũ.
- Xóa các file artifacts, log và debug files (`production_artifacts`, `ai_debug`).
- Xóa các dữ liệu test và locator packages (`inputs/test_data_registry`, `inputs/locator_packages`).
- Xóa các report của Playwright và Allure (`playwright-report`, `test-results`, `allure-results`, `allure-report`, v.v.).
- Chạy được trên mọi hệ điều hành (Windows, macOS, Linux) thông qua Node.js.

## Yêu cầu
- Đã cài đặt [Node.js](https://nodejs.org/) trên máy tính.

## Cách chạy Script

Mở terminal (hoặc command prompt / PowerShell) tại thư mục gốc của dự án và chạy lệnh sau:

```bash
node clean_workspace.js
```

### Kết quả mong đợi
Script sẽ quét và xóa dữ liệu bên trong các thư mục mục tiêu. Những thư mục trống hoặc không tồn tại sẽ được tự động bỏ qua. Bạn sẽ thấy log chi tiết trong terminal cho biết thư mục/file nào đã được xử lý.

```text
🧹 Bắt đầu dọn dẹp workspace...

[Đã dọn dẹp] Nội dung bên trong: production_artifacts
[Đã dọn dẹp] Nội dung bên trong: inputs/locator_packages
...
✨ Dọn dẹp thành công! Workspace đã sẵn sàng cho dự án mới.
```

> **Lưu ý quan trọng**: Hành động này **không thể hoàn tác**! Hãy đảm bảo bạn đã lưu trữ/backup tất cả các source code, report hoặc artifacts cần thiết trước khi chạy script.
