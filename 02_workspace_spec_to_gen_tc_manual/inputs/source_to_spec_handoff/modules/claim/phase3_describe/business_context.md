# Business Context: Claim Module

## 1. Mục Đích & Vai Trò
Phân hệ **Claim (Yêu cầu thanh toán / Công tác phí)** số hóa hoàn toàn quy trình xử lý các khoản chi tiêu nội bộ hoặc công tác của nhân viên. Hệ thống cho phép ghi nhận các khoản chi (Expenses), gộp chúng thành một yêu cầu (Claim Request), đính kèm chứng từ (Attachments) và đệ trình lên cấp trên phê duyệt (Workflow). Việc này giúp kế toán và bộ phận quản lý minh bạch hóa dòng tiền, dễ dàng audit các sự kiện chi tiêu.

## 2. Quy trình Nghiệp vụ Cốt lõi (Core Workflows)

### 2.1 Thiết lập Môi trường (Configuration)
Trước khi bất kỳ yêu cầu nào được tạo ra, Admin phải định nghĩa sẵn 2 thư mục:
- **Events (Sự kiện)**: Tên gọi đợt công tác, chương trình team building hoặc ngân sách theo quý (VD: "Triển lãm CES 2024"). Tất cả Claim phải tham chiếu đến một Event.
- **Expense Types (Loại chi phí)**: Các danh mục được phép chi (VD: Di chuyển, Vé máy bay, Khách sạn, Ăn uống).

### 2.2 Tạo Hồ sơ Thanh toán (Claim Request & Expenses)
Quy trình nộp Claim diễn ra theo 3 bước đối với nhân viên (ESS):
1. **Khởi tạo Claim**: Tạo một bộ hồ sơ vỏ (Claim Request), chọn Sự kiện, loại tiền tệ và viết mô tả. Lúc này, hồ sơ ở trạng thái **INITIATED** (Nháp).
2. **Khai báo Chi phí**: Nhập từng dòng chi phí con (Expense). Ví dụ: 1 dòng cho vé máy bay, 1 dòng cho tiền ăn. Mỗi dòng đều phải nhập ngày tháng và số tiền (Amount).
3. **Đính kèm hóa đơn**: Upload ảnh chụp hóa đơn, bill thanh toán tương ứng để đối soát.

### 2.3 Phê duyệt (Workflow & Actions)
Sau khi khai báo xong, nhân viên "Submit" (Nộp) hồ sơ.
- **Khóa dữ liệu**: Khi hồ sơ được Submit, nhân viên không thể sửa/xóa các dòng Expense bên trong nữa.
- **Quyết định (Approval)**: Cấp trên có thể Approve (Duyệt), Reject (Từ chối) hoặc Cancel. Cuối cùng, kế toán sẽ đổi thành PAID khi đã chuyển tiền thực tế.

## 3. Tính Toàn vẹn & Ràng buộc (Integrity Constraints)
- **Kiểm soát Nhân sự**: Một nhân viên đã nghỉ việc (Terminated) tuyệt đối không thể tạo hay nhận Claim Request mới.
- **Chặn gian lận thay đổi**: Hệ thống kiểm tra Workflow liên tục. Bất kỳ nỗ lực sửa xóa số tiền chi phí (Amount) nào khi Claim đã bị Submit hoặc Approve đều bị chặn bằng `ForbiddenException`.
