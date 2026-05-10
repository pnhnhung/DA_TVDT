# Spec Gap Report: PIM

| Gap ID | Description | Impact on Testing | Action Required |
|---|---|---|---|
| GAP-PIM-001 | Undeletable Employee IDs chưa được xác định tĩnh (Chưa rõ ID nào là Admin mặc định). | Nguy cơ xóa nhầm hoặc fail testcase "Delete all". | Cần dùng script lấy ID thực tế từ DB hoặc config env trước khi run Automation. Testcase sẽ đặt Assumption. |
| GAP-PIM-002 | Thiếu đặc tả API Reactivate Employee. | Không test được E2E luồng Terminate -> Reactivate. | Blocked luồng Reactivate, chỉ test Terminate (F-010). |
