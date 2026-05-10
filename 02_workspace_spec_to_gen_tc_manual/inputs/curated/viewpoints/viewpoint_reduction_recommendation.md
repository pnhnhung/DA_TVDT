# Đề xuất rút gọn viewpoint cho Antigravity
## Kết luận chính
- Quan điểm **không giữ quá nhiều viewpoint cho manual testcase source là đúng**.
- Với bối cảnh **Antigravity đọc tài liệu để sinh manual testcase**, chỉ nên giữ các viewpoint có giá trị như **business/risk oracle**.
- Nhiều viewpoint generic kiểu required/boundary/format/sort/filter/pagination/state không nên giữ thành từng record trong input; nên chuyển thành **rule/skill heuristics** để tránh bloat và nhiễu.
- Các viewpoint UI/cosmetic, format/common hoặc quá phụ thuộc platform/module nên **không nạp mặc định**.

## Tiêu chí đánh giá giữ / bỏ
### Giữ trong core input
- Nếu lỗi xảy ra có thể gây sai dữ liệu, đứt luồng nghiệp vụ, sai phân quyền, mất tiền hoặc sai tích hợp.
- Nếu đây là logic khó suy ra chỉ từ checklist control-level.
- Nếu đây là oracle quan trọng cho manual testcase và về sau cho automation.

### Chuyển sang rule/skill
- Nếu đây là heuristic test design lặp lại trên nhiều control: required, blank, min/max, format, valid/invalid, enabled/disabled, sort/filter/search/pagination, navigation boundary...
- Nếu framework/skill có thể tự sinh các biến thể này từ metadata field hoặc checklist refined.

### Không đưa vào default input
- UI/cosmetic, display/common, sticky/highlight/spacing/màu sắc thuần hiển thị.
- Viewpoint chỉ phù hợp mobile/device/payment/map/batch ops khi project không có các feature đó.

## Kết quả phân loại từ file viewpoint hiện tại
- KEEP_CORE: **39**
- KEEP_CONDITIONAL: **104**
- MOVE_TO_RULE_SKILL: **166**
- DROP_DEFAULT: **83**

## 39 viewpoint nên giữ làm core input
- **VP-050** | Data Visualization Controls > Chart/ Graph > Data accuracy | Check hiển thị data tại chart | Data Integrity
- **VP-113** | Container/ Structural Controls > Card > Data accuracy | Kiểm tra dữ liệu hiển thị trong card | Data Integrity
- **VP-128** | Container/ Structural Controls > List View / Flat List > Data accuracy | Kiểm tra dữ liệu hiển thị trong danh sách | Data Integrity
- **VP-147** | Input Controls > Text Field > Validation with DB (exist or not) | Kiểm tra nhập giá trị có tồn tại trong DB | Data Integrity
- **VP-148** | Input Controls > Text Field > Validation with DB (exist or not) | Kiểm tra nhập giá trị không tồn tại trong DB | Data Integrity
- **VP-164** | Input Controls > Password Field > Valid password format | Kiểm tra nhập mật khẩu hợp lệ | Security & Access
- **VP-165** | Input Controls > Password Field > Invalid password format | Kiểm tra nhập mật khẩu sai format | Security & Access
- **VP-166** | Input Controls > Password Field > Masking characters | Kiểm tra ký tự nhập có được che dấu | Security & Access
- **VP-167** | Input Controls > Password Field > Show / Hide toggle | Kiểm tra nút show/hide mật khẩu | Security & Access
- **VP-228** | Input Controls > Captcha > Load success | Kiểm tra captcha hiển thị | Security & Access
- **VP-229** | Input Controls > Captcha > Expiry | Kiểm tra captcha sau khi hết hạn | Security & Access
- **VP-230** | Input Controls > Captcha > Refresh captcha | Kiểm tra đổi captcha | Security & Access
- **VP-231** | Input Controls > Captcha > Incorrect handling | Kiểm tra nhập captcha sai | Security & Access
- **VP-253** | Action Controls > Submit Button > Submits correct data | Kiểm tra khi Submit với dữ liệu hợp lệ | Data Integrity, Workflow Continuity
- **VP-254** | Action Controls > Submit Button > Role / Permission check | Kiểm tra Submit bằng user không đủ quyền | Security & Access, Workflow Continuity
- **VP-255** | Action Controls > Submit Button > Database verification | Kiểm tra dữ liệu trong DB sau khi Submit thành công | Data Integrity, Workflow Continuity
- **VP-256** | Action Controls > Submit Button > Fallback message | Kiểm tra khi Submit gặp lỗi server (timeout, 500…) | Workflow Continuity
- **VP-283** | Advanced > Access & Permission > Role-based UI visibility | Kiểm tra hiển thị UI theo vai trò người dùng | Security & Access
- **VP-284** | Advanced > Access & Permission > Access Denied Handling | Kiểm tra xử lý khi người dùng không có quyền truy cập | Security & Access
- **VP-285** | Advanced > Access & Permission > Unauthorized redirect | Kiểm tra khi truy cập page/thao tác không được phép | Security & Access
- **VP-286** | Advanced > Access & Permission > Enable/disable for restricted controls | Kiểm tra nút/chức năng bị disable khi không có quyền | Security & Access
- **VP-299** | Advanced > Notifications (Email, SMS, Push Notif, In-app Notif) > Trigger event | Kiểm tra thông báo khi có sự kiện  | Workflow Continuity
- **VP-303** | Advanced > Notifications (Email, SMS, Push Notif, In-app Notif) > OTP validity period | Kiểm tra link/nút trong email/SMS | Security & Access
- **VP-304** | Advanced > Notifications (Email, SMS, Push Notif, In-app Notif) > Resend restriction | Kiểm tra thời hạn OTP | Security & Access
- **VP-313** | Advanced > Import > Required fields check | Kiểm tra dữ liệu có thiếu trường bắt buộc không | Data Integrity
- **VP-314** | Advanced > Import > Wrong file type | Kiểm tra upload sai định dạng file | Data Integrity
- **VP-319** | Advanced > Import > Missing required columns | Kiểm tra file thiếu cột bắt buộc | Data Integrity
- **VP-320** | Advanced > Import > Duplicate data handling | Kiểm tra dữ liệu trùng lặp trong file | Data Integrity
- **VP-323** | Advanced > Import > Data saved in DB | Kiểm tra dữ liệu sau import có lưu DB không | Data Integrity
- **VP-324** | Advanced > Import > Mapping fields in DB | Kiểm tra dữ liệu mapping vào đúng cột DB | Data Integrity
- **VP-338** | Advanced > Analytics / Reporting > Data accuracy | Kiểm tra dữ liệu trong báo cáo có chính xác | Data Integrity
- **VP-381** | Batch/Job/Cron > Job Trigger > Manual trigger | Kiểm tra job khi chạy thủ công | Workflow Continuity
- **VP-382** | Batch/Job/Cron > Job Trigger > Scheduled (cron, daily, weekly, monthly) | Kiểm tra job chạy theo lịch (cron, daily, weekly, monthly) | Workflow Continuity
- **VP-383** | Batch/Job/Cron > Job Trigger > Event-based trigger (data update, API call, …) | Event-based trigger – Kiểm tra job kích hoạt theo sự kiện (data update, API call…) | Workflow Continuity
- **VP-384** | Batch/Job/Cron > Input / Output Handling > Input validation (format, missing, invalid) | Input validation – Kiểm tra xử lý input (format sai, thiếu, null, invalid) | Workflow Continuity
- **VP-385** | Batch/Job/Cron > Input / Output Handling > Data source availability (file, DB, API) | Data source availability – Kiểm tra khi nguồn dữ liệu không khả dụng (file, DB, API) | Data Integrity, Workflow Continuity
- **VP-386** | Batch/Job/Cron > Input / Output Handling > Output file / DB update correctness | Kiểm tra tính đúng đắn của output file/DB update | Data Integrity, Workflow Continuity
- **VP-388** | Batch/Job/Cron > Error Handling & Recovery > Retry on failure | Kiểm tra cơ chế retry khi job lỗi | Workflow Continuity
- **VP-389** | Batch/Job/Cron > Error Handling & Recovery > Notification/alert on error | Kiểm tra thông báo/alert khi job lỗi | Workflow Continuity

## Cách dùng trong workspace
1. `viewpoint_core_manual_input.csv` → input mặc định cho workflow sinh manual testcase.
2. `viewpoint_move_to_rule_skill.csv` → không dùng làm data input; chuyển ý tưởng sang rule/skill test design.
3. `viewpoint_conditional_packs.csv` → chỉ nạp khi project có feature tương ứng như payment, map, mobile, batch ops.
4. `viewpoint_drop_default.csv` → bỏ khỏi default flow.

## Khuyến nghị thực tế
- Manual testcase đầu vào cho automation nên **gọn nhưng sắc**, thiên về business logic và oracle.
- Đừng cố biến viewpoint thành bộ exhaustive UI checklist; phần đó nên để rule/skill/framework sinh theo pattern.
- Checklist refined + user story vẫn là nguồn chính; viewpoint chỉ bổ sung cho các rủi ro khó nhìn thấy từ checklist control-level.
