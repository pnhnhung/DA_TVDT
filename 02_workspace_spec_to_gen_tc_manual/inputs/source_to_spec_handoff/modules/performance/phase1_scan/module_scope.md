# Module Scope: Performance

## 1. Giới thiệu
Phân hệ **Performance (Đánh giá hiệu suất)** của OrangeHRM cung cấp bộ công cụ để thiết lập, theo dõi và tiến hành các đợt đánh giá hiệu suất của nhân viên. Hệ thống hỗ trợ đánh giá nhiều chiều (Tự đánh giá, Quản lý đánh giá) dựa trên các bộ chỉ số (KPIs) được cấu hình trước, đồng thời cho phép theo dõi các nhật ký (Tracker Logs) liên tục.

## 2. Các nhóm chức năng chính (Feature Groups)

### 2.1. Configuration (Cấu hình)
- **KPIs (Key Performance Indicators)**: Định nghĩa các chỉ số đo lường hiệu suất gắn với từng Job Title cụ thể. Mỗi KPI bao gồm mức đánh giá Tối thiểu/Tối đa và trạng thái Active.
- **Trackers**: Định nghĩa các "Sổ theo dõi" để ghi nhận phản hồi định kỳ. Gắn liền với nhân viên và được phân quyền cho Reviewers.

### 2.2. Performance Trackers (Theo dõi Hiệu suất)
- **Tracker Logs**: Employee hoặc Reviewer có thể thêm các "Log" (Nhật ký) dạng Positive hoặc Negative vào trong Tracker để làm bằng chứng đánh giá cuối kỳ.
- Hệ thống phân chia quyền xem rõ ràng giữa My Trackers (của tôi) và Employee Trackers (của nhân viên cấp dưới).

### 2.3. Performance Reviews (Đợt Đánh giá Hiệu suất)
Quản lý chu kỳ đánh giá chính thức (thường là hàng năm/quý).
- **Review Cycle**: Khởi tạo một đợt đánh giá cho một nhân viên, bao gồm khoảng thời gian đánh giá và ngày đáo hạn (Due Date).
- **Evaluations (Thực hiện đánh giá)**:
  - Tự đánh giá (Self Evaluation).
  - Quản lý đánh giá (Supervisor Evaluation).
  - Đánh giá tổng hợp / Cuối cùng (Final Evaluation).
- **Review Workflow**: Tương tự như Recruitment, Performance Review được quản lý bởi một State Machine (Khởi tạo -> In Progress -> Đã duyệt -> Hoàn tất), kiểm soát quyền ai được làm gì ở thời điểm nào.

## 3. Actors (Đối tượng sử dụng)
- **Admin**: Khởi tạo KPIs, Trackers, và các đợt Performance Review.
- **Supervisor / Reviewer**: Theo dõi (Tracker) và thực hiện đánh giá (Supervisor Evaluation) đối với nhân viên cấp dưới.
- **Employee (ESS)**: Ghi log theo dõi bản thân (Self-tracker) và tự đánh giá (Self Evaluation).
