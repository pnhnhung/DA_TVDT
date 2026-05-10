# Workspace Cleanup Tool

Công cụ này giúp dọn dẹp toàn bộ dữ liệu đầu ra (output artifacts) của Workspace 2 (`02_workspace_spec_to_gen_tc_manual`) để chuẩn bị tái sử dụng cho các dự án hoặc Sprint mới.

## Tác dụng của công cụ
- **Xóa sạch** toàn bộ thư mục `production_artifacts` (chứa báo cáo phân tích, testcases, coverage matrix, handoff manifest...).
- **Tái tạo lại** cấu trúc thư mục rỗng cần thiết để các Agent có thể ghi output mà không gặp lỗi thiếu thư mục (`analysis`, `review`, `coverage`, `final_testcase_pack`, `testcases/UT`, `testcases/IT`, `testcases/USERCASE`, `automation_input`, `modules`).
- **Giữ nguyên** thư mục `inputs/` và các cấu hình `.agents`, `README.md`.

## Hướng dẫn sử dụng

### Dành cho Windows
Cách nhanh nhất và an toàn nhất là chạy file batch đã được chuẩn bị sẵn:
1. Mở thư mục `clean_workspace`.
2. Click đúp chuột vào file **`run_clean.bat`**.
3. File batch sẽ tự động gọi PowerShell với quyền Bypass Policy để thực thi việc dọn dẹp.
4. Chờ thông báo hoàn tất trên cửa sổ Terminal và nhấn phím bất kỳ để thoát.

*Hoặc chạy qua PowerShell (nếu muốn):*
```powershell
# Di chuyển vào thư mục clean_workspace
cd clean_workspace

# Cấp quyền và chạy file ps1
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\clean.ps1
```

### Dành cho Mac/Linux (Bash)
Mở Terminal và chạy các lệnh sau:
```bash
# Di chuyển vào thư mục clean_workspace
cd clean_workspace

# Cấp quyền thực thi cho file shell script
chmod +x clean.sh

# Chạy script
./clean.sh
```

## Lưu ý quan trọng (⚠️)
- Hành động này **không thể hoàn tác (Unrecoverable)**. Hãy chắc chắn rằng bạn đã copy/lưu trữ toàn bộ các file testcase, báo cáo cần thiết ra khỏi `production_artifacts` trước khi chạy script.
- Bạn nên xóa thủ công thư mục `inputs/source_to_spec_handoff/modules/` và copy spec của dự án mới vào nếu muốn đổi dự án. Script này **không** xóa thư mục `inputs` để tránh mất mát nhầm tài liệu gốc.
