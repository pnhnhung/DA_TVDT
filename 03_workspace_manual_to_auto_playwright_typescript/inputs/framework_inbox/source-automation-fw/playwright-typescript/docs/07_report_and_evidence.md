# Report and Evidence

Framework đã bật sẵn các lớp report/evidence sau:

## Report

| Loại | Output | Mục đích |
|---|---|---|
| List reporter | Console | Xem nhanh kết quả khi chạy local/CI |
| HTML report | `playwright-report/` | Review test result trực quan |
| JUnit XML | `test-results/<env>/junit.xml` | Tích hợp CI/Jenkins/GitLab/Azure |
| JSON result | `test-results/<env>/results.json` | Parse tự động hoặc dashboard nội bộ |
| Allure result | `allure-results/<env>/` | Dùng khi team cần Allure report |

## Evidence tự động

Trong `playwright.config.ts`:

```ts
trace: 'retain-on-failure'
screenshot: 'only-on-failure'
video: 'retain-on-failure'
```

Nghĩa là khi test fail, framework giữ lại trace, screenshot và video trong `test-results/<env>/artifacts`.

## Evidence chủ động trong test

Fixture `evidence` hỗ trợ attach evidence vào report:

```ts
await evidence.runtime();
await evidence.json('test-data', data);
await evidence.screenshot('after-submit');
await evidence.text('note', 'Some debug note');
```

Khi test fail, fixture tự attach thêm:

- `runtime-context-redacted.json`
- `failure-full-page.png`

## Quy tắc cho AI-generated spec

AI nên capture evidence tại các điểm nghiệp vụ quan trọng:

1. Sau login thành công.
2. Sau khi mở đúng màn hình/module.
3. Sau khi submit form/action chính.
4. Sau assertion cuối cùng.
5. Attach test data đã dùng, nhưng không attach password/secret thật.

Không nên lạm dụng screenshot sau mọi click nhỏ vì report sẽ nặng và khó đọc.
