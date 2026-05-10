# Module Scope: Claim

## 1. Giới thiệu
Phân hệ **Claim (Thanh toán / Công tác phí)** của OrangeHRM cho phép nhân viên nộp các yêu cầu bồi hoàn chi phí công tác hoặc chi tiêu nội bộ. Quá trình xử lý yêu cầu đi qua một quy trình phê duyệt (Workflow) rõ ràng trước khi được duyệt chi.

## 2. Các nhóm chức năng chính (Feature Groups)

### 2.1. Configuration (Cấu hình)
- **Events (Sự kiện/Chiến dịch)**: Định nghĩa các chương trình công tác hoặc quỹ tài trợ mà chi phí sẽ được tính vào (VD: "Q1 Sales Trip", "Hội nghị thường niên"). Mỗi sự kiện có trạng thái Active/Inactive.
- **Expense Types (Loại chi phí)**: Danh mục các loại chi phí được phép bồi hoàn (VD: Khách sạn, Di chuyển, Ăn uống).

### 2.2. Claim Requests (Yêu cầu thanh toán)
- **My Claims (ESS)**: Nhân viên tự tạo một Claim Request, liên kết với một Event và chọn loại tiền tệ (Currency).
- **Assign Claims (Admin)**: Admin hoặc HR có quyền tạo hộ (Assign) một Claim Request cho một nhân viên khác.

### 2.3. Expenses & Attachments (Chi tiết & Chứng từ)
- **Expenses**: Mỗi Claim Request chứa nhiều khoản chi phí (Expense Items). Từng khoản chi phí phải xác định ngày, số tiền, loại chi phí (Expense Type), và ghi chú.
- **Attachments**: Nhân viên có thể đính kèm file (ảnh chụp hóa đơn, vé máy bay) làm bằng chứng cho cả bộ hồ sơ Claim.

### 2.4. Workflow Actions (Quy trình duyệt)
- Quy trình duyệt Claim được quản lý bằng State Machine. Khi nhân viên Submit, Claim chuyển trạng thái sang "Submitted" và nằm trong hàng đợi của cấp quản lý để Approve hoặc Reject.

## 3. Actors (Đối tượng sử dụng)
- **Admin**: Cấu hình Events, Expense Types, tạo hộ Claim cho nhân viên, và duyệt chi đợt cuối.
- **Supervisor**: Duyệt (Approve/Reject) các Claim do nhân viên cấp dưới nộp.
- **Employee**: Tự nộp Claim của mình, thêm các chi phí và đính kèm hóa đơn.
