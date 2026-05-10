# SAMPLE SPEC – B2B Order Portal

## 1. Mục tiêu tài liệu
Tài liệu này mô tả một chức năng mẫu để kiểm chứng workspace Antigravity có intake spec đúng, chọn manual scope hợp lý theo risk và sinh ra manual testcase đủ tốt để làm đầu vào cho automation.

## 2. Bối cảnh nghiệp vụ
Hệ thống B2B Order Portal cho phép nhân viên kinh doanh tạo đơn hàng cho khách doanh nghiệp, gửi phê duyệt giảm giá khi vượt ngưỡng, theo dõi trạng thái đơn hàng, tìm kiếm đơn hàng và xuất danh sách đơn hàng ra CSV.

Mục tiêu business:
- Giảm sai sót khi tạo đơn hàng.
- Không cho người dùng vượt quyền phê duyệt.
- Không để đơn hàng bị submit trùng.
- Đảm bảo dữ liệu order hiển thị đúng ở form, danh sách và file export.

## 3. In scope
Chỉ dùng spec mẫu này để kiểm chứng các feature sau:
1. Đăng nhập hệ thống.
2. Tạo đơn hàng bán hàng.
3. Gửi phê duyệt giảm giá.
4. Phê duyệt / từ chối đơn hàng.
5. Tìm kiếm đơn hàng trong màn hình Order List.
6. Export danh sách order ra CSV.
7. Email notification khi order được submit hoặc approve/reject.

## 4. Out of scope
- Thanh toán online.
- Tích hợp bản đồ / geolocation.
- Batch job cuối ngày.
- Mobile app.
- Multi-language.

## 5. Vai trò và quyền
### 5.1 Sales
- Đăng nhập.
- Tạo Draft Order.
- Sửa order ở trạng thái Draft hoặc Rejected.
- Submit order để xin phê duyệt.
- Xem danh sách các order do chính mình tạo.
- Không được approve hoặc reject order.
- Không được xem order của Sales khác, trừ khi được Manager chia sẻ trong tương lai. Feature chia sẻ chưa nằm trong release này.

### 5.2 Sales Manager
- Đăng nhập.
- Xem order của team mình.
- Approve hoặc Reject order nếu tổng discount của order <= 15% và total amount < 200,000,000 VND.
- Không được approve order vượt 15% discount.

### 5.3 Finance Approver
- Đăng nhập.
- Xem mọi order đã được submit.
- Approve hoặc Reject order nếu:
  - discount > 15%, hoặc
  - total amount >= 200,000,000 VND, hoặc
  - customer đang ở trạng thái credit hold.

### 5.4 Unauthorized access
- Nếu user không có quyền vào màn hình Approval Queue mà nhập trực tiếp URL, hệ thống phải chặn và chuyển về trang 403.

## 6. Workflow chính
### 6.1 Create and submit order
1. Sales đăng nhập.
2. Sales vào màn hình Create Order.
3. Sales nhập thông tin order.
4. Sales bấm Save Draft hoặc Submit.
5. Nếu hợp lệ, hệ thống lưu order.
6. Nếu bấm Submit:
   - Nếu discount <= 10% và customer không bị credit hold và total amount < 50,000,000 VND, order tự động chuyển trạng thái `Approved`.
   - Nếu discount > 10% và <= 15%, order chuyển trạng thái `Pending Manager Approval`.
   - Nếu discount > 15% hoặc total amount >= 200,000,000 VND hoặc customer đang credit hold, order chuyển trạng thái `Pending Finance Approval`.

### 6.2 Manager approval
1. Sales Manager mở Approval Queue.
2. Chỉ thấy order của team mình đang chờ manager approval.
3. Có thể Approve hoặc Reject.
4. Nếu Reject, bắt buộc nhập lý do reject.
5. Sau khi Reject, order về trạng thái `Rejected` và Sales được phép sửa.

### 6.3 Finance approval
1. Finance mở Approval Queue.
2. Finance thấy tất cả order thuộc luồng Finance Approval.
3. Có thể Approve hoặc Reject.
4. Nếu customer đang credit hold, hệ thống phải hiển thị cảnh báo `Customer is under credit hold` trên detail screen.

## 7. Màn hình và field chính

## 7.1 Login
### Fields
- Email
- Password
- Login button

### Rules
- Email là bắt buộc.
- Password là bắt buộc.
- Email phải đúng format email.
- Password tối thiểu 8 ký tự, tối đa 32 ký tự.
- Password phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số.
- Sau 5 lần đăng nhập sai liên tiếp trong vòng 15 phút, account bị khóa 15 phút.
- Khi login thành công, điều hướng theo role:
  - Sales -> Order List
  - Sales Manager -> Approval Queue
  - Finance Approver -> Approval Queue

## 7.2 Create Order
### Fields
- Customer Code (text field)
- Customer Name (read only, auto-fill nếu Customer Code hợp lệ)
- Order Date
- Currency
- Unit Price
- Quantity
- Discount Percent
- Remarks
- Save Draft button
- Submit button

### Field rules
- Customer Code: bắt buộc, phải tồn tại trong Customer Master.
- Nếu Customer Code không tồn tại, hiển thị lỗi `Customer code does not exist`.
- Order Date: bắt buộc, không được lớn hơn ngày hiện tại.
- Currency: chỉ hỗ trợ `VND` và `USD` trong release này.
- Unit Price: bắt buộc, số dương, tối đa 2 chữ số thập phân.
- Quantity: bắt buộc, số nguyên dương từ 1 đến 9999.
- Discount Percent: không bắt buộc, mặc định 0 nếu để trống, giá trị từ 0 đến 30.
- Remarks: không bắt buộc, tối đa 500 ký tự.

### Calculation rules
- Line Total = Unit Price * Quantity.
- Net Amount = Line Total - (Line Total * Discount Percent / 100).
- Total Amount của order chính là Net Amount vì release này chỉ có 1 line item.
- Giá trị hiển thị trên UI phải khớp với giá trị lưu DB và giá trị xuất CSV.

### Persistence rules
- Khi Save Draft thành công:
  - sinh Order No theo format `SO-YYYYMMDD-XXXX`, với XXXX là số tăng dần trong ngày.
  - trạng thái là `Draft`.
- Khi Submit thành công:
  - không được tạo duplicate order nếu user double click Submit.
  - hệ thống chỉ tạo 1 order record.
  - trạng thái follow đúng rule ở mục 6.1.

## 7.3 Order List
### Columns
- Order No
- Customer Code
- Customer Name
- Total Amount
- Discount Percent
- Status
- Created By
- Created At

### Search conditions
- Order No
- Customer Code
- Status
- Order Date From
- Order Date To
- Amount From
- Amount To

### Search rules
- User chỉ thấy dữ liệu trong phạm vi quyền của mình.
- Search Order Date From/To phải trả đúng kết quả trong khoảng ngày.
- Search Amount From/To phải trả đúng kết quả trong khoảng tiền.
- Nếu From > To, hiển thị lỗi validation.
- Search có thể được kích hoạt bằng button Search.
- Nút Clear reset điều kiện tìm kiếm và danh sách quay về trạng thái mặc định của màn hình.

## 7.4 Export CSV
- Chỉ export các bản ghi mà user đang có quyền nhìn thấy.
- File name format: `order-list_YYYYMMDD_HHMMSS.csv`.
- Nội dung export phải khớp với dữ liệu đang hiển thị sau khi filter.
- Các cột bắt buộc trong file export:
  - Order No
  - Customer Code
  - Customer Name
  - Total Amount
  - Discount Percent
  - Status

## 7.5 Notification
- Khi order được submit vào luồng manager approval, gửi email cho Sales Manager của team.
- Khi order được submit vào luồng finance approval, gửi email cho Finance Approver group.
- Khi order bị reject, gửi email cho Sales đã tạo order.
- Email không cần verify template HTML chi tiết trong release test này; chỉ cần verify:
  - đúng người nhận
  - đúng event gửi
  - subject đúng loại event

## 8. Tích hợp
### 8.1 Customer Master API
- API: `GET /api/customers/{customerCode}`
- Nếu customer tồn tại, trả về:
  - customerCode
  - customerName
  - creditHold (true/false)
- Nếu không tồn tại, trả về HTTP 404.

### 8.2 Notification Service
- Dùng internal service để gửi email event-based.
- Nếu Notification Service lỗi, order vẫn được lưu/submit thành công, nhưng hệ thống phải log lỗi gửi email.
- Không có retry trong scope release này.

## 9. Business rules bắt buộc phải verify kỹ
1. Không user nào được vượt quyền approve.
2. Truy cập trực tiếp URL không hợp lệ phải bị chặn đúng.
3. Discount routing phải đúng ngưỡng.
4. Credit hold phải đẩy order vào Finance Approval bất kể discount.
5. Double click Submit không được tạo duplicate order.
6. Dữ liệu order phải nhất quán giữa form detail, order list và export CSV.
7. Tìm kiếm phải trả đúng dữ liệu trong phạm vi quyền của user.
8. Reject bắt buộc phải có lý do.

## 10. Test data gợi ý
### Customers
- CUST001: tồn tại, creditHold = false
- CUST002: tồn tại, creditHold = true
- CUST999: không tồn tại

### Users
- sales01@example.com / Password1 / role Sales
- mgr01@example.com / Password1 / role Sales Manager
- fin01@example.com / Password1 / role Finance Approver

## 11. Assumptions đã biết
- Release này chỉ có 1 line item trên mỗi order.
- Chưa có chức năng share order giữa các Sales.
- Không test UI responsive ở tài liệu mẫu này.
- Không test localization.

## 12. Những điểm cố ý để Antigravity phải phát hiện gap
1. Chưa mô tả rõ behavior khi Save Draft với customer đang credit hold.
2. Chưa mô tả rõ timezone của `Created At` trong export CSV.
3. Chưa mô tả rõ Finance có được sửa order sau khi reject hay không.
4. Chưa mô tả rõ status sau khi Notification Service lỗi có hiển thị cảnh báo cho user hay chỉ log nội bộ.

