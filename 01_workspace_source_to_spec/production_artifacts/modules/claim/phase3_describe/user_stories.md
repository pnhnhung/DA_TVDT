# User Stories: Claim Module

## Topic: Claim Request Creation

### US-001: Nộp hồ sơ Yêu cầu Bồi hoàn (My Claims)
**Là một** Nhân viên (Employee)
**Tôi muốn** tạo một hồ sơ thanh toán (Claim Request) gắn với một Sự kiện (Event)
**Để** công ty biết tôi đã đi công tác và có phát sinh chi phí.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Sự kiện (Event) được chọn phải đang Active. Nếu không, hệ thống báo lỗi Invalid Param.
- Tiền tệ (Currency) là bắt buộc.
- Khi tạo thành công, hồ sơ của tôi ở trạng thái `INITIATED` (Nháp) và có một mã Reference ID ngẫu nhiên.
- Nếu tôi là nhân viên đã bị thanh lý hợp đồng (Terminated), tôi không thể nộp đơn (lỗi 403 Forbidden).

### US-002: HR gán hồ sơ thanh toán (Assign Claim)
**Là một** Admin / Quản lý
**Tôi muốn** tạo một hồ sơ thanh toán thay cho một nhân viên khác
**Để** hỗ trợ các nhân viên không có tài khoản hệ thống nộp chứng từ.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Tôi phải chỉ định mã số nhân viên (`empNumber`).
- Hệ thống bắt lỗi (Forbidden) nếu tôi không có quyền truy cập dữ liệu của nhân viên đó (do khác phòng ban/chi nhánh).
- Tương tự nhân viên, không thể tạo đơn cho người đã Terminated.

## Topic: Expenses Detail Management

### US-003: Khai báo dòng chi phí (Expenses)
**Là một** Nhân viên (Employee)
**Tôi muốn** thêm từng khoản chi phí (tiền ăn, vé xe) vào hồ sơ Claim Request
**Để** công ty biết chính xác tôi đã chi bao nhiêu tiền và cho mục đích gì.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Mỗi khoản chi bắt buộc phải chọn 1 `expenseTypeId` đang Active.
- Số tiền (Amount) phải lớn hơn hoặc bằng 0, không được nhập số âm, tối đa 2 chữ số thập phân (regex: `/^\d+(\.\d{1,2})?$/`).
- Bắt buộc phải có ngày (Date) chi tiêu.

### US-004: Chặn sửa đổi sau khi Submit
**Là một** Công ty / Quản lý (Company)
**Tôi muốn** hệ thống khóa các khoản chi phí khi hồ sơ đã nộp
**Để** nhân viên không thể sửa số tiền một cách gian lận sau khi hồ sơ đã bắt đầu quy trình duyệt.
**Tiêu chí chấp nhận (Acceptance Criteria):**
- Nếu Claim Request đã rời khỏi trạng thái `INITIATED` (nghĩa là đã nộp - SUBMITTED hoặc APPROVED), bất kỳ API nào gọi Update hoặc Delete vào các khoản chi phí (Expenses) đều bị chặn lại và báo lỗi Forbidden. Nhân viên muốn sửa thì hồ sơ phải được reject/cancel về trạng thái ban đầu trước.
