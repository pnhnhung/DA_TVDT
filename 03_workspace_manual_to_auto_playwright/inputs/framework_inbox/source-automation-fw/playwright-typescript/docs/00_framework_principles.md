# Framework Principles

## 1. Playwright native first

Framework dùng `@playwright/test` trực tiếp. Không dùng Cucumber/Gherkin trong runtime để giảm mapping thừa và giảm lỗi khi AI sinh code.

## 2. Test spec là nơi mô tả kiểm chứng

File `*.spec.ts` nên đọc gần giống testcase manual:

- `test.describe` = module/feature
- `test(...)` = testcase
- `test.step(...)` = manual step
- `expect(...)` = expected result

## 3. Page Object là nơi chứa thao tác UI

Page Object chứa:

- locator getter
- action method
- navigation method

Page Object không nên chứa assertion nghiệp vụ, trừ assertion kỹ thuật nhỏ như wait màn hình sẵn sàng nếu thật sự cần.

## 4. Locator package là nguồn kiểm soát selector

AI không được tự do viết selector trong spec. Locator phải nằm trong:

```txt
src/locators/<module>/<screen>.locators.ts
```

## 5. Generated spec phải dễ review

Mỗi generated spec cần có:

- testcase ID
- tags
- step rõ ràng
- dữ liệu rõ ràng
- assertion tương ứng expected result
- không có `test.only`
- không có `waitForTimeout`
