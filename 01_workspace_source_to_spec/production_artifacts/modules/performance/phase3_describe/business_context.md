# Business Context: Performance Module

## 1. Mục Đích & Vai Trò
Phân hệ **Performance (Đánh giá hiệu suất)** cung cấp công cụ để các công ty chuẩn hóa quy trình đánh giá định kỳ (hàng năm/hàng quý). Thay vì đánh giá cảm tính, hệ thống sử dụng các bộ KPI được gán sẵn cho từng chức danh, kết hợp với các sổ tay ghi nhận (Tracker) để đảm bảo việc đánh giá là khách quan và minh bạch. 
Kết quả của phân hệ này không tự động tác động đến hệ thống khác (như lương/thưởng), nhưng cung cấp dữ liệu cơ sở (Final Rating) để bộ phận nhân sự tham khảo cho các quyết định tăng lương hoặc thăng tiến.

## 2. Quy trình Nghiệp vụ Cốt lõi (Core Workflows)

### 2.1 Chuẩn bị & Cấu hình (Configuration)
Trước khi đánh giá, hệ thống phải được chuẩn bị:
- **Định nghĩa KPIs**: Nhân sự thiết lập các tiêu chí đo lường (KPI) cho từng Job Title. Ví dụ: "Tỷ lệ chốt sale" cho chức danh "Nhân viên Kinh doanh", điểm từ 1-10.
- **Trackers**: Một dạng sổ tay mở xuyên suốt cả năm. Nhân viên và sếp có thể ghi lại các điểm sáng (Positive log) hoặc lỗi lầm (Negative log) bất cứ lúc nào làm căn cứ.

### 2.2 Mở đợt Đánh giá (Performance Review Initialization)
- Quản trị viên khởi tạo một đợt Review cho nhân viên (chỉ định ai là người đánh giá - Supervisor, và giới hạn thời gian nộp bài - Due Date).
- Khi chọn "Activate", hệ thống chính thức báo cho nhân viên biết đợt đánh giá đã bắt đầu.

### 2.3 Thực hiện Đánh giá (Evaluation Workflow)
Quá trình chấm điểm được chia làm nhiều khâu, bị khóa chặt bởi Workflow State Machine:
1. **Self Evaluation (Tự đánh giá)**: Nhân viên vào chấm điểm cho chính mình trên các KPI được giao và để lại comment. Trong lúc nhân viên đang làm (In Progress), cấp trên **không thể xem** điểm này (Blind Review) để tránh định kiến.
2. **Nộp bài (Complete)**: Nhân viên chốt điểm và nộp. Lúc này, sếp mới có thể xem điểm của nhân viên.
3. **Supervisor Evaluation (Cấp trên đánh giá)**: Sếp vào chấm điểm độc lập dựa trên KPI và tham khảo điểm tự đánh giá của nhân viên.
4. **Final Evaluation**: Sau khi đối thoại, cấp trên chốt điểm số cuối cùng (Final) và đóng đợt đánh giá (Completed). Lúc này, không ai được quyền sửa điểm nữa.

## 3. Tính Ràng buộc & Toàn vẹn dữ liệu
- **Ràng buộc cây sơ đồ tổ chức**: Hệ thống sẽ chặn đứng việc gán một người làm Reviewer (Người chấm điểm) nếu người đó không thực sự là Supervisor (Cấp trên) của nhân viên bị chấm điểm (dựa trên dữ liệu khai báo ở phân hệ PIM).
- **Tính bất biến**: Khi một KPI đã được mang vào một kỳ Review đang chạy hoặc đã chạy, việc cấu hình lại KPI (sửa min/max/title) sẽ bị chặn để không làm hỏng dữ liệu quá khứ.
