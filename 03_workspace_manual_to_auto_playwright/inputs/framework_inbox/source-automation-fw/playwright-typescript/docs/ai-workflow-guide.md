# AI Workflow Guide

Hướng dẫn sử dụng AI agent (Antigravity) để tự động sinh và debug test automation
từ manual test cases trong framework này.

---

## Tổng Quan Workflow

```
      ┌──────────────┐    ┌─────────────────┐    ┌───────────────┐
      │  Manual TC   │    │   AI Agent      │    │  Automation   │
      │  (CSV file)  │───▶│  (Antigravity)  │───▶│  Spec (.ts)   │
      └──────────────┘    └─────────────────┘    └───────────────┘
           │                      │                      │
      inputs/manual-         Workflow 01            tests/generated/
      testcases/*.csv      .agent/workflows/        <module>/*.spec.ts
```

---

## Workflow 01 — Sinh Spec Từ Manual TC

### Điều Kiện Kích Hoạt

Dùng khi:
- Có manual test case CSV trong `inputs/manual-testcases/`
- TC có `automationStatus = "AUTO_READY"`

### Cách Dùng với AI

**Option A — Tự động qua tool:**
```bash
# Sinh spec từ một file CSV
npm run gen:spec -- inputs/manual-testcases/login.csv

# Hoặc dùng Makefile
make gen-spec INPUT=inputs/manual-testcases/recruitment/tc-rec-001.csv
```

**Option B — Nhờ AI agent:**
Gõ lệnh trong chat:
```
/generate_automation_from_testcases
```
Rồi cung cấp path hoặc nội dung file CSV của Testcase.

### Các Bước AI Thực Hiện

| Bước | Mô Tả |
|---|---|
| 1. Intake | Đọc TC, xác định module/role/env/data/locator |
| 2. Gap check | Kiểm tra locator, page method, test data còn thiếu |
| 3. Update POM | Thêm method/locator nếu thiếu |
| 4. Gen spec | Sinh file `.generated.spec.ts` theo pattern chuẩn |
| 5. Self review | Đảm bảo không vi phạm rules (no raw locator, no hardcode...) |

---

## Workflow 02 — Execute & Debug Spec

### Sau Khi Có Spec

**1. Validate static rules trước:**
```bash
npm run validate:ai
# hoặc
make validate
```

**2. Verify file env:**
```
config/environments/dev.env   (cần tồn tại)
.env                           (TEST_ENV=dev)
```

**3. Chạy spec cụ thể trên Chromium:**

*Windows (dùng npm):*
```powershell
npm run clean:reports
npx cross-env TEST_ENV=dev npx playwright test tests/generated/<module> --project=chromium --headed
```

*Mac/Linux (dùng Makefile):*
```bash
make run-fresh MODULE=recruitment ENV=dev
```

**4. Xem report:**
```bash
make report          # HTML report
make report-allure   # Allure report
```

### Debug Khi Fail

| Loại lỗi | Hành động |
|---|---|
| Locator fail | Mở trace: `npx playwright show-trace test-results/.../trace.zip` |
| Data fail | Sửa test data, không sửa assertion |
| Env/auth fail | Kiểm tra `config/environments/{env}.env` |
| Flow fail | Sửa Page Object method, không sửa spec logic |
| Assertion fail | Đối chiếu expected result trong manual TC |

---

## Cấu Trúc Manual TC CSV

Tham chiếu tài liệu: `docs/02_manual_testcase_template.csv`

### Field quan trọng nhất (Cột trong CSV)

- `automationStatus`: Giá trị quyết định AI có thực hiện code hay không.
- `Steps`: Chi tiết hành động.
- `Expected Result`: Kết quả mong đợi dùng làm assertion.
- `Locator Ref`: Khóa ánh xạ với file locators.

### automationStatus Values

| Value | Ý nghĩa | AI action |
|---|---|---|
| `AUTO_READY` | Đủ điều kiện gen spec | ✅ Gen spec |
| `AUTO_WITH_CONDITION` | Cần thêm setup/data/locator | ⚠️ AI bổ sung rồi gen |
| `MANUAL_ONLY` | Không thể tự động (captcha, hardware) | ❌ Skip |
| `BLOCKED` | Blocked bởi bug hoặc dependency | ❌ Skip + ghi note |

---

## Thêm Module Mới

### 1. Scaffold tự động
```bash
make gen-module MODULE=admin
# hoặc
npm run new:module admin
```

Tạo ra:
```
src/pages/admin/admin.page.ts
src/locators/admin/admin.locators.ts
tests/generated/admin/.gitkeep
```

### 2. Tạo fixture riêng (nếu cần)

```typescript
// src/fixtures/admin.fixture.ts
import { test as base, expect } from '@fixtures/test';
import { PayGradePage } from '@pages/admin/pay-grade.page';

export const test = base.extend({
  payGradePage: async ({ page }, use) => use(new PayGradePage(page))
});
export { expect };
```

### 3. Import trong spec

```typescript
// tests/generated/admin/tc-admin-001.generated.spec.ts
import { test, expect } from '@fixtures/admin.fixture';

test('TC_ADMIN_001 - ...', async ({ payGradePage, evidence }) => {
  // ...
});
```

---

## Database trong Test

```typescript
import { queryDb } from '@core/database';          // Single query
import { queryPool } from '@core/database-pool';   // Pool query (fast, reused)

// Verify record sau khi UI action
const rows = await queryDb<{ name: string }>(
  'SELECT name FROM pay_grades WHERE name = ?',
  [expectedName]
);
expect(rows[0]?.name).toBe(expectedName);
```

Cấu hình DB trong `config/environments/dev.env`:
```
DB_ENABLED=true
DB_CLIENT=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=your_db
DB_USERNAME=your_user
DB_PASSWORD=...  (không commit giá trị thật)
```

---

## API Testing trong Spec

```typescript
import { test, expect } from '@fixtures/test';

test('TC_API_001 - GET /vacancies', async ({ apiClient, evidence }) => {
  const vacancies = await apiClient.get<Vacancy[]>('/recruitment/vacancies');
  expect(vacancies).toHaveLength(greaterThan(0));
  await evidence.json('api-response', vacancies);
});
```

---

## Tips & Best Practices

1. **Luôn chạy `validate:ai` trước khi commit** — ngăn anti-patterns vào codebase
2. **Giữ `automationStatus` cập nhật** — AI sẽ đọc field này để quyết định gen hay không
3. **Đặt `locatorRef` trong step** — AI dùng để map sang Page Object method
4. **Dùng `evidence.runtime()` ở đầu mỗi test** — traceability khi debug CI
5. **Spec chỉ remove `test.describe.skip` sau khi locator đã verify** — tránh false pass
