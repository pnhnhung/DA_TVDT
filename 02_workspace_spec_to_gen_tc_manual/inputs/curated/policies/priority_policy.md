# Risk Priority Policy

## P1 - Mandatory / Severe
Giữ lại hoặc sinh testcase bắt buộc nếu feature tồn tại khi:
- lỗi có thể gây mất quyền kiểm soát truy cập
- sai tiền / sai trạng thái giao dịch
- sai dữ liệu lưu / hiển thị / đồng bộ
- submit trùng / race condition / mất idempotency
- đứt luồng nghiệp vụ chính
- lỗi bảo mật, token, session, password, OTP, captcha
- import/export/batch/report làm sai dữ liệu

## P2 - Important / Recommended
Giữ theo module hoặc regression khi:
- lỗi ảnh hưởng đáng kể đến trải nghiệm hoặc kết quả xử lý phụ
- logic cần test nhưng mức độ thiệt hại thường thấp hơn P1
- phù hợp để kích hoạt theo change scope

## P3 - Optional / Cosmetic
Không dùng mặc định cho manual source pack khi:
- chủ yếu là trình bày / hiển thị
- ít khả năng gây lỗi nghiệp vụ hoặc dữ liệu
- không có giá trị cao cho input automation
