---
trigger: always_on
---

# Rule 02 — Automation Scope, Readiness & State Control

Không code toàn bộ manual testcase một cách mù quáng.

## 1. Automation decision

Mỗi testcase manual phải được phân loại một trong các trạng thái:

```text
AUTO_READY
AUTO_WITH_CONDITION
MANUAL_ONLY
BLOCKED
```

Ý nghĩa:

- `AUTO_READY`: đủ rõ để code, data chuẩn bị được, oracle đo được, locator có thể xác minh.
- `AUTO_WITH_CONDITION`: auto được nhưng cần xử lý điều kiện trước như data dependency, account/env, locator verification, quyền truy cập.
- `MANUAL_ONLY`: phù hợp manual/exploratory/UX/cosmetic/captcha/OTP/thao tác không deterministic.
- `BLOCKED`: thiếu spec, thiếu oracle, thiếu data, thiếu quyền, thiếu dependency hoặc chưa rõ expected.

## 2. Tiêu chí được code

Chỉ được code testcase khi có đủ:

- Objective rõ.
- Pre-condition rõ hoặc có strategy setup an toàn.
- Step/action đủ rõ để map automation.
- Expected/oracle đo được.
- Data dependency xác định được.
- Role/account/env xác định được.
- Locator có thể verify bằng framework/UI/MCP.
- Có khả năng chạy lại nhiều lần không lỗi do data trùng.

Không đưa testcase vào `AUTO_READY` nếu assertion không đo được hoặc data không thể setup/verify ổn định.

## 3. State-based generation

- Generate theo `state`, không generate toàn bộ module trong một lần nếu số testcase lớn.
- Mỗi state mặc định 8–10 testcase.
- Giảm xuống 1–5 testcase nếu flow dài, liên module, nhiều locator mới, data setup phức tạp, có DB/API/UI dependency hoặc rủi ro flaky cao.
- Mỗi state phải có: state ID, module, testcase IDs, target files, data strategy, locator strategy, command execute nhỏ nhất.

## 4. Dừng sau mỗi state

Sau mỗi state phải:

1. Generate code xong.
2. Review source.
3. Execute/debug/fix state.
4. Report kết quả.
5. Chờ user xác nhận trước khi mở state tiếp theo.

Không mở state mới nếu state hiện tại còn fail mà chưa có failure analysis hoặc chưa có xác nhận của user.

## 5. Ưu tiên scope

Ưu tiên code trước:

- Smoke/sanity.
- Core business flow.
- Permission/role chính.
- Validation nghiệp vụ rủi ro cao.
- Regression lặp lại nhiều.
- Case có oracle rõ và data setup được kiểm soát.

## 6. Có plan rõ ràng

Luôn có plan rõ ràng:
- Mấy state
- State có những case nào
- Thứ tự triển khai như thế nào

## 7. Test Structure Principle — BẮT BUỘC

### Mỗi TC = 1 `test()` riêng biệt

Mọi testcase phải được implement thành **1 `test()` riêng biệt**, không được gộp nhiều TC vào 1 test dùng `test.step()` để phân cấp. Lý do:

- Report hiện số thứ tự `1. 2. 3.` rõ ràng cho từng TC
- Failure isolation: TC A fail không kéo theo TC B, C báo sai
- Debug chính xác hơn: biết đúng TC nào thật sự lỗi

### Test Data Isolation

Mỗi TC phải **tự setup precondition data riêng** thay vì phụ thuộc data từ TC trước. Lý do:

- Tránh **cascade failure**: A lỗi → B, C lỗi theo dù logic của B, C không có vấn đề
- Report chính xác số lượng lỗi thật sự
- TC độc lập có thể chạy riêng lẻ hoặc song song

### Khi nào dùng `test.describe.serial()`

Dùng `test.describe.serial()` thay vì `test.describe()` khi:
- Các TC **chia sẻ biến data** ở describe scope (e.g. record tạo ở TC_01, dùng ở TC_05 Edit)
- Muốn TC sau **skip** thay vì fail giả khi TC trước fail

Ưu tiên `isolated data` nếu có thể — chỉ dùng `serial + shared data` khi flow nghiệp vụ yêu cầu rõ ràng.