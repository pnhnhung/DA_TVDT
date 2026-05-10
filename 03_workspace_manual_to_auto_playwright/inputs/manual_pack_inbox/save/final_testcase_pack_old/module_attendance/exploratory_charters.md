# Exploratory Charters — module_attendance

1. **Auto-Punch Out:** Kiểm tra xem nếu người dùng quên Punch Out, sau 24h hệ thống có tự động chốt giờ không, hay treo `Punch In` vĩnh viễn.
2. **Double Punch:** Mở 2 tab trên trình duyệt, nhấn nút Punch In cùng một giây xem hệ thống có sinh ra 2 records không (Concurrency test).
3. **Location spoofing:** Nếu có tính năng bắt IP/GPS khi chấm công, thử dùng VPN đổi IP xem form Punch In có bị chặn không.
