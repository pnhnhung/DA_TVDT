# Gaps & Assumptions: <module_name>

| ID | Feature | Description | Impact | Type | Note |
|---|---|---|---|---|---|
| G-001 | Approval | Chưa rõ behavior khi manager bị inactive | Không thể test flow approval | gap | Cần xác nhận BA |
| A-001 | Login | Giả định hệ thống dùng LDAP mặc định | Ảnh hưởng test data | assumption | Inferred từ config |
| C-001 | Delete | Controller báo xóa thành công nhưng Service có check constraint | Mâu thuẫn logic | conflict | Cần kiểm tra DB thực tế |
