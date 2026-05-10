# AI Generation Contract

Dùng file này làm prompt/rule cho AI khi sinh Playwright native spec từ manual testcase (định dạng CSV).

## Input bắt buộc

1. Manual testcase package
2. Locator package
3. Test data package
4. Framework knowledge
5. Module/page object hiện có

## Output bắt buộc

AI phải output các file sau nếu có thay đổi:

```txt
tests/generated/<module>/<testcase-id>.generated.spec.ts
src/pages/<module>/<screen>.page.ts
src/locators/<module>/<screen>.locators.ts
```

Nếu không cần sửa Page Object hoặc locator thì không được sinh lại file.

## Quy tắc sinh code

### Spec file

- Import từ `@fixtures/test`, không import trực tiếp từ `@playwright/test`.
- Dùng `test.step` để map với manual step.
- Assertion dùng `expect` trong spec.
- Không dùng raw `page.locator`.
- Không hard-code password; dùng env/test data.
- Tên test phải bắt đầu bằng testcase ID.
- **BẮT BUỘC:** Mỗi testcase phải là một block `test()` riêng biệt. Tuyệt đối không gộp chung nhiều TC vào 1 block `test()` và dùng `test.step()` để phân cấp.
- **BẮT BUỘC:** Ưu tiên Isolated Test Data (Mỗi TC tự setup data riêng). Tránh Cascade Failure.
- **BẮT BUỘC:** Chỉ dùng `test.describe.serial()` khi các test chia sẻ data bắt buộc và phụ thuộc logic (Vd: Create -> Edit -> Delete chung 1 record).

### Page Object

- Action đặt tên theo nghiệp vụ: `openVacancies`, `startCreateVacancy`, `fillVacancyName`, `save`.
- Không đặt tên action quá kỹ thuật như `clickButton1`.
- Locator getter phải dùng locator catalog.

### Locator

Ưu tiên strategy theo thứ tự:

1. `role`
2. `label`
3. `placeholder`
4. `testId`
5. `text`
6. `css`
7. `xpath`

`css` và `xpath` chỉ dùng khi không có selector tốt hơn.

## Definition of Done

- `npm run validate:ai` không báo lỗi.
- `npx playwright test tests/generated/<module> --project=chromium` chạy được hoặc lỗi có bằng chứng trace rõ ràng.
- Có trace/screenshot/video nếu fail.
- Không làm bẩn test data thật.
