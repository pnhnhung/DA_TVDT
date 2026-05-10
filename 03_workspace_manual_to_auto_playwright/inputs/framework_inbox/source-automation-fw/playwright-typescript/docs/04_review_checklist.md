# Review Checklist for Generated Playwright Spec

## A. Testcase mapping

- [ ] Tên test có testcase ID.
- [ ] Mỗi manual step quan trọng được map bằng `test.step`.
- [ ] Expected result có assertion tương ứng.
- [ ] Preconditions được xử lý rõ.

## B. Locator

- [ ] Không có `page.locator` trong file spec.
- [ ] Locator nằm trong `src/locators`.
- [ ] Ưu tiên role/label/placeholder/testId.
- [ ] XPath/CSS phức tạp có lý do.

## C. Test data

- [ ] Không hard-code credential.
- [ ] Dữ liệu dynamic có suffix để tránh trùng.
- [ ] Data nào được tạo mới thì có cơ chế verify/cleanup nếu cần.

## D. Stability

- [ ] Không dùng `waitForTimeout`.
- [ ] Không dùng `test.only`.
- [ ] Không phụ thuộc thứ tự test, trừ khi `serial` có lý do.
- [ ] Assertion không quá yếu, ví dụ chỉ check URL khi nghiệp vụ cần check data.

## E. Execute/debug

- [ ] Chạy được trên Chromium trước.
- [ ] Nếu fail, mở trace/video/screenshot để xác định lỗi thuộc locator, data, flow hay app.
- [ ] Sau khi fix, chạy lại testcase fail và ít nhất 1 testcase liên quan.
