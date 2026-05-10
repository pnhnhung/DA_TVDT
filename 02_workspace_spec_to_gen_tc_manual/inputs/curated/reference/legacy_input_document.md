# Tài liệu đầu vào cho Google Antigravity

## 1. Mục đích

Tài liệu này là bản làm sạch và tái cấu trúc từ `checklist.xlsx` và `viewpoint_ai.xlsx` để dùng làm input cho workspace Google Antigravity. 
Mục tiêu là giữ lại **logic bắt buộc phải verify**, loại bỏ nội dung **Format/common**, và gán **mức độ ưu tiên theo rủi ro** cho viewpoint.

## 2. Các nguyên tắc đã áp dụng khi làm sạch dữ liệu

- Loại bỏ hoàn toàn nhóm **Format/common** khỏi đầu vào sinh testcase.

- Phân biệt rõ **Test Logic** và **Guardrail**. Guardrail là quy tắc sinh/review testcase, không phải testcase nghiệp vụ.

- Đối với viewpoint, không mặc định test tất cả. Áp dụng chiến lược:

  - **P1**: bắt buộc nếu feature tồn tại.

  - **P2**: nên test khi feature tồn tại, module có thay đổi hoặc đang build regression.

  - **P3**: chỉ test khi có yêu cầu UI/UX riêng, bug history hoặc cần tăng độ phủ hiển thị.

- Ưu tiên được đánh giá dựa trên rủi ro nếu lỗi xảy ra: **Security & Access**, **Payment & Financial**, **Data Integrity**, **Workflow Continuity**, **API Contract**, cuối cùng mới đến **UI/UX**.

## 3. Tóm tắt dữ liệu sau làm sạch

| Hạng mục          |   Số lượng | Ghi chú                                                  |
|:------------------|-----------:|:---------------------------------------------------------|
| Checklist nguồn   |         31 | Loại bỏ toàn bộ nhóm Format/common khỏi tài liệu đầu vào |
| Checklist refined |         56 | 53 test logic + 3 guardrails                             |
| Viewpoint tổng    |        392 | Đã gán ưu tiên theo rủi ro                               |
| Viewpoint P1      |         70 | Nhóm bắt buộc nếu feature tồn tại                        |
| Viewpoint P2      |        239 | Nhóm khuyến nghị                                         |
| Viewpoint P3      |         83 | Nhóm optional/UI-leaning                                 |

## 4. Checklist refined dùng cho Antigravity

### 4.1. Tóm tắt theo layer

| source_layer   | entry_kind   |   Số lượng |
|:---------------|:-------------|-----------:|
| API            | Test Logic   |         10 |
| IT             | Guardrail    |          1 |
| IT             | Test Logic   |         18 |
| UT             | Guardrail    |          2 |
| UT             | Test Logic   |         25 |

### 4.2. Logic P1 bắt buộc phải verify kỹ

| input_id   | source_layer   | theme                     | normalized_logic                                                                                                           | antigravity_usage                  |
|:-----------|:---------------|:--------------------------|:---------------------------------------------------------------------------------------------------------------------------|:-----------------------------------|
| CL-08-01   | UT             | Permission                | Xác nhận màn hình và quyền truy cập đúng theo từng role được mô tả trong spec.                                             | Sinh testcase UT                   |
| CL-08-02   | UT             | Permission                | Xác nhận role thấp hơn phản ánh đúng thay đổi được áp dụng từ role cao hơn, không xuất hiện quyền dư hoặc thiếu.           | Sinh testcase UT/IT                |
| CL-08-03   | UT             | Permission                | Xác nhận màn hình/chức năng không có quyền truy cập thì không thể access bằng cách nhập trực tiếp URL.                     | Sinh testcase UT/IT                |
| CL-09-01   | UT             | Coverage                  | Tách riêng testcase cho từng nhánh điều kiện OR; không gộp nhiều nhánh OR vào một case duy nhất.                           | Dùng làm rule/generation guardrail |
| CL-10-01   | UT             | Coverage                  | Bảo đảm phạm vi testcase bao phủ tất cả màn hình liên quan của chức năng; không bỏ sót screen trong luồng.                 | Dùng làm rule/review guardrail     |
| CL-11-01   | UT             | Register/Update           | Có testcase thành công cho cả trường hợp nhập full field và chỉ nhập các field bắt buộc.                                   | Sinh testcase UT                   |
| CL-11-02   | UT             | Register/Update           | Xác nhận dữ liệu được lưu đúng vào DB/table liên quan sau khi register/update thành công.                                  | Sinh testcase UT/IT                |
| CL-11-03   | UT             | Register/Update           | Xác nhận dữ liệu hiển thị trên màn hình sau khi lưu đúng với dữ liệu đã submit.                                            | Sinh testcase UT                   |
| CL-12-01   | UT             | Format Validation         | Kiểm tra định dạng cho các item DATE, TEL, FAX, số tiền, số âm, số dương.                                                  | Sinh testcase UT                   |
| CL-12-02   | UT             | Date Validation           | Kiểm tra ngày hợp lệ/không hợp lệ, ngày tồn tại và các ràng buộc ngày quá khứ/tương lai theo spec.                         | Sinh testcase UT                   |
| CL-12-03   | UT             | Number Validation         | Kiểm tra số thập phân, số âm/dương, min/max và rule làm tròn nếu có.                                                       | Sinh testcase UT                   |
| CL-13-01   | UT             | Payment Consistency       | Xác nhận số tiền đơn hàng nhất quán trên màn hình thanh toán, order detail, order history, email và DB.                    | Sinh testcase UT/IT                |
| CL-13-02   | UT             | Payment Validation        | Kiểm tra validate các trường hợp nhập thẻ sai, PIN/security code sai và dữ liệu thanh toán không hợp lệ.                   | Sinh testcase UT                   |
| CL-15-01   | UT             | CSV Import                | Kiểm tra import sai định dạng file.                                                                                        | Sinh testcase UT                   |
| CL-15-02   | UT             | CSV Import                | Kiểm tra validate dữ liệu từng field khi import CSV.                                                                       | Sinh testcase UT                   |
| CL-15-03   | UT             | CSV Import                | Kiểm tra file import thiếu cột bắt buộc.                                                                                   | Sinh testcase UT                   |
| CL-16-02   | UT             | Notification/Email        | Kiểm tra dữ liệu động trong email được lấy đúng.                                                                           | Sinh testcase UT/IT                |
| CL-16-03   | UT             | Notification/Email        | Kiểm tra giới hạn thời gian hiệu lực của URL/link trong email.                                                             | Sinh testcase UT/IT                |
| CL-17-01   | IT             | Payment Flow              | Giỏ hàng phải được clear sau một khoảng thời gian theo spec.                                                               | Sinh testcase IT                   |
| CL-17-02   | IT             | Payment Flow              | Có testcase thanh toán thành công end-to-end.                                                                              | Sinh testcase IT                   |
| CL-17-03   | IT             | Payment Flow              | Kiểm tra thanh toán thất bại khi thẻ hết tiền.                                                                             | Sinh testcase IT                   |
| CL-17-04   | IT             | Payment Flow              | Kiểm tra thanh toán thất bại khi thẻ hết hạn.                                                                              | Sinh testcase IT                   |
| CL-17-05   | IT             | Payment Flow              | Kiểm tra số tiền thanh toán dưới hoặc vượt hạn mức cho phép.                                                               | Sinh testcase IT                   |
| CL-17-06   | IT             | Payment Flow              | Kiểm tra thanh toán thất bại với thẻ không hợp lệ.                                                                         | Sinh testcase IT                   |
| CL-17-07   | IT             | Payment Flow              | Kiểm tra thanh toán thất bại khi security code sai.                                                                        | Sinh testcase IT                   |
| CL-17-08   | IT             | Payment Flow              | Kiểm tra xử lý khi lỗi phát sinh trong lúc đang thanh toán.                                                                | Sinh testcase IT                   |
| CL-17-09   | IT             | Payment Flow              | Kiểm tra tổng point + coupon lớn hơn tổng tiền đơn hàng.                                                                   | Sinh testcase IT                   |
| CL-18-01   | IT             | Stock & Concurrency       | Kiểm tra mua hàng vượt quá số lượng tồn kho cho phép.                                                                      | Sinh testcase IT                   |
| CL-18-02   | IT             | Stock & Concurrency       | Kiểm tra 2 user mua đồng thời làm tổng số lượng vượt stock.                                                                | Sinh testcase IT                   |
| CL-19-01   | IT             | Delete                    | User không được tự xóa chính mình; nếu hệ thống cho phép xóa thì phải xử lý session/login đúng theo spec.                  | Sinh testcase IT                   |
| CL-19-02   | IT             | Delete                    | Nhiều user xóa cùng một data đồng thời không được gây trạng thái bất thường.                                               | Sinh testcase IT                   |
| CL-20-01   | IT             | Password Flow             | Sau khi Change/Forgot/Setting password thành công, phải login được bằng mật khẩu mới và không login được bằng mật khẩu cũ. | Sinh testcase IT                   |
| CL-21-01   | IT             | Account Lifecycle         | Flow tạo account thành công -> kích hoạt -> login thành công phải hoàn chỉnh end-to-end.                                   | Sinh testcase IT/Usercase          |
| CL-23-01   | IT             | Coverage                  | Bao phủ đầy đủ toàn bộ màn hình liên quan đến chức năng đang viết testcase.                                                | Dùng làm rule/review guardrail     |
| CL-24-01   | IT             | Cross-function Dependency | Bao phủ tương quan giữa các function, đặc biệt flow admin -> front và các phụ thuộc chéo giữa module.                      | Sinh testcase IT/Usercase          |
| CL-25-01   | IT             | Authentication            | Kiểm tra xử lý khi login fail quá nhiều lần theo đúng spec (lock/retry/captcha/throttle...).                               | Sinh testcase IT                   |
| CL-26-01   | API            | API Contract              | Kiểm tra URL endpoint đúng theo spec.                                                                                      | Sinh testcase API                  |
| CL-26-02   | API            | API Contract              | Kiểm tra HTTP method đúng theo spec (GET/POST/PUT/DELETE...).                                                              | Sinh testcase API                  |
| CL-27-01   | API            | API Request Contract      | Kiểm tra cấu trúc parameter request đúng tài liệu.                                                                         | Sinh testcase API                  |
| CL-27-02   | API            | API Request Contract      | Kiểm tra request có đầy đủ property bắt buộc theo tài liệu.                                                                | Sinh testcase API                  |
| CL-28-01   | API            | API Request Validation    | Kiểm tra request với data valid/invalid/null.                                                                              | Sinh testcase API                  |
| CL-28-02   | API            | API Response Mapping      | Kiểm tra response data/status_code/message map đúng với tài liệu.                                                          | Sinh testcase API                  |
| CL-29-01   | API            | API Response Contract     | Kiểm tra cấu trúc parameter return đúng tài liệu.                                                                          | Sinh testcase API                  |
| CL-29-02   | API            | API Response Contract     | Kiểm tra response có đầy đủ property bắt buộc theo tài liệu.                                                               | Sinh testcase API                  |
| CL-30-01   | API            | API Data Integrity        | Kiểm tra data trả về phù hợp với data gửi lên và mapping đúng DB.                                                          | Sinh testcase API/IT               |
| CL-31-01   | API            | Token & Concurrency       | Kiểm tra xử lý token khi 2 user cùng lúc gửi request; không được rò rỉ/chồng chéo token.                                   | Sinh testcase API                  |

### 4.3. Guardrails dùng cho rule/review

| input_id   | source_layer   | theme    | normalized_logic                                                                                           | priority   | antigravity_usage                  |
|:-----------|:---------------|:---------|:-----------------------------------------------------------------------------------------------------------|:-----------|:-----------------------------------|
| CL-09-01   | UT             | Coverage | Tách riêng testcase cho từng nhánh điều kiện OR; không gộp nhiều nhánh OR vào một case duy nhất.           | P1         | Dùng làm rule/generation guardrail |
| CL-10-01   | UT             | Coverage | Bảo đảm phạm vi testcase bao phủ tất cả màn hình liên quan của chức năng; không bỏ sót screen trong luồng. | P1         | Dùng làm rule/review guardrail     |
| CL-23-01   | IT             | Coverage | Bao phủ đầy đủ toàn bộ màn hình liên quan đến chức năng đang viết testcase.                                | P1         | Dùng làm rule/review guardrail     |

## 5. Viewpoint: đánh giá ưu tiên theo rủi ro

### 5.1. Phân bố ưu tiên theo nhóm lớn

| level1                         |   P1 |   P2 |   P3 |
|:-------------------------------|-----:|-----:|-----:|
| Action Controls                |    4 |   20 |    1 |
| Advanced                       |   26 |   50 |    1 |
| Batch/Job/Cron                 |   12 |    0 |    0 |
| Common                         |    0 |    0 |    3 |
| Container/ Structural Controls |    2 |   11 |    6 |
| Data Visualization Controls    |    3 |   27 |    6 |
| Display Controls               |    0 |    0 |   46 |
| Input Controls                 |   11 |   92 |   10 |
| Mobile-specific                |   12 |   23 |    0 |
| Navigation                     |    0 |   16 |   10 |

### 5.2. Các nhóm viewpoint có P1 nhiều nhất

| Level 1                        | Level 2                                              |   Số viewpoint P1 |
|:-------------------------------|:-----------------------------------------------------|------------------:|
| Advanced                       | Payment                                              |                12 |
| Advanced                       | Import                                               |                 6 |
| Mobile-specific                | Face authentication                                  |                 6 |
| Input Controls                 | Password Field                                       |                 5 |
| Action Controls                | Submit Button                                        |                 4 |
| Advanced                       | Access & Permission                                  |                 4 |
| Input Controls                 | Captcha                                              |                 4 |
| Mobile-specific                | Fingerprint authentication                           |                 4 |
| Advanced                       | Notifications (Email, SMS, Push Notif, In-app Notif) |                 3 |
| Batch/Job/Cron                 | Error Handling & Recovery                            |                 3 |
| Batch/Job/Cron                 | Input / Output Handling                              |                 3 |
| Batch/Job/Cron                 | Job Trigger                                          |                 3 |
| Batch/Job/Cron                 | Monitoring & Audit                                   |                 3 |
| Data Visualization Controls    | Map                                                  |                 2 |
| Input Controls                 | Text Field                                           |                 2 |
| Mobile-specific                | Device Operation                                     |                 2 |
| Advanced                       | Analytics / Reporting                                |                 1 |
| Container/ Structural Controls | Card                                                 |                 1 |
| Container/ Structural Controls | List View / Flat List                                |                 1 |
| Data Visualization Controls    | Chart/ Graph                                         |                 1 |

### 5.3. Những nhóm phải đưa vào review bắt buộc nếu hệ thống có feature tương ứng

- Access & Permission
- Payment
- Password / Authentication / OTP / Captcha
- Submit + lưu DB + duplicate submission
- Import/Export có ảnh hưởng dữ liệu thực
- Batch/Job/Cron: trigger, input/output, monitoring/audit
- Map / Geolocation / capability thiết bị nếu có liên quan đến quyền truy cập hoặc xử lý lỗi
- Các logic liên quan DB mapping, response mapping, token/concurrency

### 5.4. Lưu ý áp dụng viewpoint

- `mandatory_if_applicable = Yes` nghĩa là không được bỏ qua nếu màn hình/chức năng thực sự có feature đó.

- Mobile-specific chỉ áp dụng nếu dự án là mobile app/web mobile và có capability tương ứng.

- P3 chủ yếu là viewpoint hiển thị/cosmetic; không nên chiếm ưu tiên trước logic nghiệp vụ.

## 6. Hướng dùng tài liệu này trong workspace Antigravity

### 6.1. Dùng cho skill

- `antigravity_input_checklist_refined.csv`: input để skill sinh testcase UT/IT/API.

- `antigravity_input_viewpoint_risk_review.csv`: input để skill chọn viewpoint theo risk.

- `antigravity_input_viewpoint_P1_mandatory.csv`: input để skill dựng mandatory regression pack.

### 6.2. Dùng cho rule

- Đưa 3 guardrails vào rule/generation rule thay vì coi là testcase.

- Bắt buộc trace mỗi testcase về ít nhất 1 `input_id` hoặc `vp_id`.

- Với logic Payment / Access / DB / API / Token / Concurrency: không được giảm độ phủ khi dedup.

### 6.3. Dùng cho workflow

1. Đọc `antigravity_input_checklist_refined.csv`.
2. Đọc `antigravity_input_viewpoint_risk_review.csv`.
3. Sinh testcase theo thứ tự ưu tiên P1 -> P2 -> P3.
4. Review dedup nhưng không làm mất logic P1.

## 7. Kết luận

Bản đầu vào sau làm sạch này đã loại bỏ phần thừa của checklist, giữ lại logic nghiệp vụ quan trọng, và tái xếp hạng viewpoint theo rủi ro thực tế. Đây là bộ input phù hợp để dùng làm nguồn cho skill, rule và workflow trong Google Antigravity.
