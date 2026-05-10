# Playwright Native AI Framework

Framework này dùng **Playwright Test native + TypeScript** để phục vụ flow **generate automation test từ testcase manual bằng AI**.

Mục tiêu chính: AI có thể sinh test nhanh, nhưng vẫn kiểm soát được bằng cấu trúc rõ ràng, locator package, test data package, Page Object, evidence, report và checklist review.

---

## 1. Framework này dùng để làm gì?

Framework phục vụ flow:

```txt
Manual testcase
  ↓
Locator package
  ↓
Test data package
  ↓
AI generate Playwright native spec
  ↓
QA review
  ↓
Execute theo môi trường dev/stg/uat/prod
  ↓
Debug bằng trace/screenshot/video/report
  ↓
Publish report/evidence
```

Framework này **không dùng Cucumber**. Lý do: với mục tiêu để AI sinh code automation, Playwright Test native giúp giảm một lớp mapping step-definition, dễ review hơn, dễ debug hơn và dễ ép rule hơn.

---

## 2. Cấu trúc thư mục

```txt
.agent/
  README.md
  rules/                         # Rule bắt buộc cho AI khi sinh code
  skills/                        # Skill generate automation từ testcase manual
  workflows/                     # Workflow generate / execute / debug

config/
  environments/                  # Config theo môi trường dev/stg/uat/prod
    dev.env.example
    stg.env.example
    uat.env.example
    prod.env.example
  accounts/                      # Account profile template
    accounts.example.json

docs/
  00_framework_principles.md
  01_ai_generation_contract.md
  02_manual_testcase_template.md
  03_locator_package_template.md
  04_review_checklist.md
  05_debug_workflow.md
  06_environment_config.md
  07_report_and_evidence.md

inputs/
  manual_testcases/              # Testcase manual đầu vào cho AI
  locator_packages/              # Locator package đã chuẩn hóa theo module
  test_data/                     # Test data package theo module

src/
  config/                        # Load env/runtime config
  core/                          # Evidence, DB helper, data helper, locator helper
  data/                          # User/account/test data loader
  fixtures/                      # Custom Playwright fixtures
  locators/                      # Locator catalog theo module
  pages/                         # Page Object / Component Object

tests/
  examples/                      # Test mẫu để verify framework
  generated/                     # AI sinh spec vào đây

tools/
  create-module.mjs              # Tạo module skeleton
  validate-generated-specs.mjs   # Kiểm tra rule output AI

playwright.config.ts             # Config chính của Playwright
package.json                     # Script chạy test/report/debug
.env.example                     # Runtime selector mẫu
```

---

## 3. Yêu cầu cài đặt

### 3.1. Tool bắt buộc

Cần cài sẵn:

```txt
Node.js LTS, khuyến nghị >= 20
npm
Git, nếu dùng clone repo
```

Kiểm tra:

```bash
node -v
npm -v
```

### 3.2. Tool khuyến nghị

```txt
VS Code hoặc Antigravity IDE
Playwright extension cho VS Code, nếu muốn debug trực quan
Java, nếu muốn dùng Allure CLI
```

### 3.3. Allure report

Framework đã có dependency `allure-commandline` trong `package.json`. Tuy nhiên Allure CLI cần Java để chạy ổn định.

Kiểm tra Java:

```bash
java -version
```

Nếu chưa cần Allure, bạn vẫn có thể dùng HTML report mặc định của Playwright.

---

## 4. Cài đặt framework lần đầu

Sau khi giải nén hoặc clone source:

```bash
cd playwright-native-ai-framework
npm install
npm run install:browsers
```

Lệnh tương đương:

```bash
npx playwright install
```

Nếu chạy trên Linux CI/server, có thể cần:

```bash
npx playwright install --with-deps
```

---

## 5. Cấu hình môi trường chạy test

Framework hỗ trợ các môi trường:

```txt
dev
stg
uat
prod
```

### 5.1. Tạo file `.env`

Mac/Linux:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Nội dung `.env` chỉ nên dùng để chọn môi trường và account profile:

```env
TEST_ENV=dev
ACCOUNT_PROFILE=admin
```

Có thể dùng `ENV_FILE` nếu muốn chỉ định file env cụ thể:

```env
TEST_ENV=stg
ENV_FILE=config/environments/stg.env
ACCOUNT_PROFILE=admin
```

### 5.2. Tạo file env thật theo môi trường

Ví dụ chạy dev:

Mac/Linux:

```bash
cp config/environments/dev.env.example config/environments/dev.env
```

Windows PowerShell:

```powershell
Copy-Item config/environments/dev.env.example config/environments/dev.env
```

Sau đó mở file:

```txt
config/environments/dev.env
```

Điền thông tin thật:

```env
BASE_URL=https://your-dev-domain.example.com
API_BASE_URL=https://your-dev-api.example.com
APP_DOMAIN=your-dev-domain.example.com

ADMIN_USERNAME=admin@example.com
ADMIN_PASSWORD=your_password

DB_ENABLED=false
DB_CLIENT=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=app_db
DB_USERNAME=app_user
DB_PASSWORD=your_db_password
DB_SSL=false

API_KEY=
CLIENT_ID=
CLIENT_SECRET=
ENCRYPTION_KEY=

DEFAULT_TIMEOUT_MS=30000
EXPECT_TIMEOUT_MS=10000
ACTION_TIMEOUT_MS=15000
NAVIGATION_TIMEOUT_MS=30000
```

### 5.3. Nguyên tắc bảo mật config

Không commit các file sau nếu chứa thông tin thật:

```txt
.env
config/environments/*.env
```

Chỉ commit file mẫu:

```txt
.env.example
config/environments/*.env.example
config/accounts/accounts.example.json
```

Không attach password, token, API key, secret key vào evidence/report.

---

## 6. Cấu hình account test

Framework hỗ trợ lấy account từ env thông qua `src/data/users.ts`.

Ví dụ trong env:

```env
ADMIN_USERNAME=admin@example.com
ADMIN_PASSWORD=admin_password
RECRUITER_USERNAME=recruiter@example.com
RECRUITER_PASSWORD=recruiter_password
VIEWER_USERNAME=viewer@example.com
VIEWER_PASSWORD=viewer_password
```

Trong test hoặc Page Object, ưu tiên dùng helper đã có thay vì hard-code account:

```ts
import { getUserByProfile } from '@data/users';

const admin = getUserByProfile('admin');
```

Nguyên tắc:

```txt
Không hard-code username/password trong test generated.
Không ghi password ra console.
Không attach password vào report.
Không để AI tự bịa account.
```

---

## 7. Cấu hình database và SSH Tunnel

DB helper nằm tại:

```txt
src/core/database.ts       # queryDb cho single connection
src/core/database-pool.ts  # DbPool, select, selectOne, selectValue, execute cho pool (Khuyến nghị)
src/core/ssh-tunnel.ts     # Helper tạo SSH local port forwarding
```

Các biến env chính:

```env
DB_ENABLED=true
DB_CLIENT=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=app_db
DB_USERNAME=app_user
DB_PASSWORD=app_password
DB_SSL=false

# SSH Tunnel (Tuỳ chọn - dùng khi DB nằm trong mạng nội bộ/Docker không public ra ngoài)
SSH_TUNNEL_ENABLED=true
SSH_HOST=tuanlm.ddns.net
SSH_PORT=22
SSH_USER=your_ssh_user
SSH_PASSWORD=your_ssh_pass
```

Hỗ trợ:

```txt
mysql
mariadb
postgres
```

Ví dụ query DB trong test/helper sử dụng các hàm tiện ích mới (Khuyến nghị):

```ts
import { select, selectOne, selectValue, execute } from '@core/database-pool';

// Lấy danh sách (trả về Array of Objects)
const users = await select('SELECT id, user_name FROM ohrm_user LIMIT 10');

// Lấy 1 record duy nhất
const user = await selectOne('SELECT * FROM ohrm_user WHERE id = ?', [1]);

// Lấy 1 giá trị duy nhất (đếm số lượng, lấy config...)
const count = await selectValue<number>('SELECT COUNT(*) as total FROM ohrm_user', 'total');

// Thực thi thay đổi dữ liệu (INSERT, UPDATE, DELETE) -> trả về affectedRows
const affected = await execute('UPDATE ohrm_user SET status = 1 WHERE id = ?', [1]);
```

Khuyến nghị:

```txt
Chỉ dùng DB để prepare/check data khi thật sự cần.
Không assert quá sâu vào DB nếu test mục tiêu là UI flow.
Luôn ưu tiên dùng Array of Objects (select, selectOne) thay vì Map để tận dụng tối đa TS.
```

---

## 8. Hướng dẫn thao tác chi tiết (Từ Clone đến Report)

Phần này hướng dẫn chi tiết từng bước từ khi clone source code về máy, cài đặt, thực thi test đến khi đóng gói báo cáo. Hướng dẫn được phân tách rõ ràng cho **Windows** và **macOS**.

### Bước 1: Clone source code và Cài đặt

**Trên macOS:**
```bash
# 1. Clone source code từ Git
git clone <url-repo-cua-ban>
cd playwright-native-ai-framework

# (Tùy chọn) Cài Node.js qua nvm nếu chưa có:
# brew install nvm && nvm install --lts && nvm use --lts
# Lưu ý cho Mac Apple Silicon (M1/M2...): Ưu tiên Node bản arm64 (kiểm tra bằng: node -p "process.arch")

# 2. Cài đặt các package Node.js cần thiết
npm install

# 3. Cài đặt trình duyệt cho Playwright (Chromium, Firefox, WebKit)
npx playwright install --with-deps

# 4. Thiết lập file môi trường (Copy từ file mẫu)
cp .env.example .env
cp config/environments/dev.env.example config/environments/dev.env
```

**Trên Windows (PowerShell):**
```powershell
# 1. Clone source code từ Git
git clone <url-repo-cua-ban>
cd playwright-native-ai-framework

# 2. Cài đặt các package Node.js cần thiết
npm install

# 3. Cài đặt trình duyệt cho Playwright
npx playwright install --with-deps

# 4. Thiết lập file môi trường (Copy từ file mẫu)
Copy-Item .env.example .env
Copy-Item config/environments/dev.env.example config/environments/dev.env
```

---

### Bước 2: Thực thi Test (Execute Tests)

Framework sử dụng `cross-env` để đảm bảo lệnh chạy giống nhau trên cả Windows và macOS. 

#### 2.1. Chạy toàn bộ module (All modules)
Chạy tất cả các test case trong thư mục `tests/generated/`:
```bash
npm run test:dev
```
*Hoặc lệnh Playwright gốc:*
```bash
npx cross-env TEST_ENV=dev npx playwright test tests/generated/ --project=chromium
```

#### 2.2. Chạy theo từng module cụ thể
Ví dụ bạn chỉ muốn chạy các test case thuộc module `admin`:
```bash
npx cross-env TEST_ENV=dev npx playwright test tests/generated/admin/ --project=chromium
```

#### 2.3. Chạy song song (Parallel Execution)
Mặc định Playwright tự động chạy song song dựa trên số nhân CPU của máy. Để ép chạy song song với số luồng nhất định (ví dụ: 4 workers), bạn thêm cờ `--workers`:
```bash
npx cross-env TEST_ENV=dev npx playwright test tests/generated/ --project=chromium --workers=4
```

#### 2.4. Chạy tuần tự (Sequential Execution)
Rất quan trọng khi các test case dùng chung dữ liệu hoặc thao tác đăng xuất làm ảnh hưởng (chết session) các test khác. Để ép chạy từng test một (tuần tự), sử dụng tham số `--workers=1`:
```bash
npx cross-env TEST_ENV=dev npx playwright test tests/generated/admin/ --project=chromium --workers=1
```

#### 2.5. Các Arguments hữu ích khác
*   **Mở trình duyệt (Headed mode):** Thêm `--headed` để quan sát UI trực tiếp (rất tốt khi debug).
    ```bash
    npx cross-env TEST_ENV=dev npx playwright test tests/generated/admin/ --project=chromium --headed --workers=1
    ```
*   **Chạy đích danh một test (Grep):** Dùng cờ `-g "Tên test"`.
    ```bash
    npx cross-env TEST_ENV=dev npx playwright test -g "TC_IT_USR_05" --project=chromium
    ```
*   **Debug từng step (Inspector):** Bật công cụ debug UI của Playwright để đi từng bước lệnh.
    ```bash
    npx cross-env TEST_ENV=dev npx playwright test --project=chromium --debug
    ```

#### 2.6. Cú pháp và Bảng tra cứu Arguments (Cheat Sheet)

Cú pháp tổng quát của một câu lệnh chạy test hoàn chỉnh:
`npx cross-env TEST_ENV=<env> npx playwright test <đường_dẫn> [các_tham_số_cấu_hình]`

| Tham số / Cờ | Ý nghĩa & Tác dụng | Ví dụ giá trị |
| :--- | :--- | :--- |
| **`TEST_ENV`** | *(Biến môi trường)* Chỉ định môi trường test sẽ trỏ tới file `.env` tương ứng. | `dev`, `stg`, `uat`, `prod` |
| **`<đường_dẫn>`** | Vị trí file hoặc thư mục test cần chạy. Để trống Playwright sẽ chạy toàn bộ thư mục `tests/` theo config. | `tests/generated/admin/` |
| **`--project`** | Chọn cấu hình/trình duyệt dùng để chạy test (đã được định nghĩa sẵn trong `playwright.config.ts`). Để chạy toàn bộ trình duyệt, hãy **bỏ qua** tham số này. | `chromium`, `firefox`, `webkit` |
| **`--headed`** | Tắt chế độ chạy ngầm (headless). Mở trình duyệt thực tế để bạn có thể xem các thao tác click/gõ phím. | *(Không cần giá trị)* |
| **`--workers`** | Số luồng chạy test song song. Dùng `--workers=1` để ép các test chạy nối đuôi nhau (tuần tự), tránh xung đột. | `1`, `4`, `8` |
| **`-g`** (hoặc `--grep`) | Chỉ chạy các test case có tên (title) hoặc tag chứa chuỗi ký tự này. Rất tiện để debug 1 case cụ thể. | `"TC_IT_USR_05"` hoặc `"@smoke"` |
| **`--debug`** | Mở cửa sổ **Playwright Inspector**. Test sẽ tạm dừng ở bước đầu tiên, bạn có thể click nút "Step over" để chạy từng dòng code một. | *(Không cần giá trị)* |
| **`--ui`** | Mở **UI Mode** - Giao diện cao cấp nhất của Playwright. Cho phép bạn xem code, test, timeline, DOM, và logs cùng lúc. | *(Không cần giá trị)* |
| **`--retries`** | Tự động chạy lại test case nếu bị FAIL. Rất hữu ích khi chạy trên hệ thống CI/CD để chống lại lỗi flaky. | `2`, `3` |

---

### Bước 3: Xem báo cáo (Get Report), Gỡ lỗi (Trace) và Đóng gói

Sau khi chạy xong, Playwright tự động lưu kết quả vào thư mục `test-results/` và báo cáo HTML vào `playwright-report/`.

#### 3.1. Xem HTML Report (Get Report)
Mở báo cáo dạng web trực quan (lệnh giống nhau trên Windows/macOS):
```bash
npx playwright show-report
```
*Lưu ý: Nhấn `Ctrl+C` trong terminal để tắt server báo cáo sau khi xem xong.*

#### 3.2. Xem file Trace (Gỡ lỗi chi tiết)
Khi test case thất bại (FAIL), framework tự động lưu lại toàn bộ hành vi (DOM snapshot, Network, Console) thành một file `trace.zip` tại thư mục `test-results/dev/artifacts/`.
Để mở file trace này lên xem:
```bash
npx playwright show-trace test-results/dev/artifacts/<tên-thư-mục-test-bị-lỗi>/trace.zip
```

#### 3.3. Đóng gói Report để gửi cho Team
Nếu bạn muốn gửi kết quả báo cáo cho người khác (Manager/QA), bạn cần nén toàn bộ thư mục `playwright-report` (vì nó chứa các file tĩnh HTML/CSS/JS). Người nhận chỉ cần giải nén và mở file `index.html`.

**Trên macOS/Linux:**
```bash
zip -r test_report.zip playwright-report/
```

**Trên Windows (PowerShell):**
```powershell
Compress-Archive -Path playwright-report\* -DestinationPath test_report.zip
```

---

## 12. Debug khi test fail

Thứ tự debug khuyến nghị:

```txt
1. Đọc terminal error
2. Mở HTML report
3. Xem screenshot/video nếu có
4. Mở trace viewer
5. Kiểm tra locator
6. Kiểm tra test data/account/env
7. Chạy headed hoặc debug mode
8. Chỉ sửa Page Object/locator/test data nếu xác định đúng nguyên nhân
```

### 12.1. Mở report

```bash
npm run report
```

### 12.2. Chạy lại test fail ở headed mode

```bash
npx playwright test path/to/test.spec.ts --project=chromium --headed
```

### 12.3. Chạy debug mode

```bash
npx playwright test path/to/test.spec.ts --project=chromium --debug
```

### 12.4. Mở trace thủ công

Nếu có file `trace.zip`:

```bash
npx playwright show-trace test-results/dev/artifacts/path-to-trace/trace.zip
```

### 12.5. Lỗi thường gặp

| Lỗi | Nguyên nhân thường gặp | Cách xử lý |
|---|---|---|
| `BASE_URL is required` | Chưa tạo hoặc chưa điền env file | Kiểm tra `.env` và `config/environments/<env>.env` |
| Login fail | Sai account/profile/password | Kiểm tra `ACCOUNT_PROFILE`, username/password trong env |
| Timeout | App chậm, locator sai, data chưa sẵn sàng | Xem trace, tăng wait bằng assertion đúng cách, không dùng `waitForTimeout` bừa bãi |
| Element not found | Locator package sai hoặc UI đổi | Cập nhật `src/locators`, không sửa trực tiếp trong generated spec |
| DB connection fail | Sai host/port/client/password hoặc DB chưa expose | Kiểm tra `DB_*`, thử connect bằng DB client trước |
| Allure không mở | Thiếu Java hoặc Allure CLI lỗi | Kiểm tra `java -version`, dùng HTML report nếu chưa cần Allure |
| Browser chưa cài | Chưa chạy install browser | Chạy `npx playwright install` |

---

## 13. Quy trình generate automation bằng AI

### 13.1. Input bắt buộc cho AI

Mỗi module nên có đủ:

```txt
1. Manual testcase
2. Locator package
3. Test data package
4. Framework knowledge / existing Page Object
5. Rule trong .agent/rules
6. Output target folder
```

Ví dụ:

```txt
inputs/manual_testcases/recruitment_job.sample.md
inputs/locator_packages/recruitment_job.locators.sample.json
inputs/test_data/recruitment_job.data.sample.json
```

### 13.2. Output mong muốn từ AI

AI nên sinh hoặc cập nhật:

```txt
src/locators/<module>/*.locators.ts
src/pages/<module>/*.page.ts
tests/generated/<module>/*.generated.spec.ts
```

### 13.3. Rule bắt buộc cho AI

```txt
Không viết page.locator(...) trực tiếp trong tests/generated/**/*.spec.ts.
Không hard-code domain/account/password/key.
Không dùng waitForTimeout nếu không có lý do review rõ ràng.
Không tự bịa expected result ngoài testcase manual.
Không bỏ qua assertion.
Không tự ý sửa framework core nếu chỉ đang gen test cho module.
Action nằm trong Page Object.
Assertion nằm trong spec.
Locator nằm trong locator catalog.
Test data lấy từ data package/helper.
```

### 13.4. Validate output AI

Sau khi AI sinh code:

```bash
npm run validate:ai
```

Tool này kiểm tra các lỗi phổ biến:

```txt
page.locator trong generated spec
waitForTimeout
.only
Hard-code pattern không phù hợp
```

---

## 14. Tạo module mới

Dùng script:

```bash
npm run new:module -- recruitment/job
```

Script sẽ tạo skeleton tương ứng cho module.

Sau đó bổ sung:

```txt
Manual testcase
Locator package
Test data package
Page Object method
Generated spec
```

Khuyến nghị đặt tên module theo nghiệp vụ:

```txt
recruitment/job
recruitment/candidate
admin/user-management
leave/apply-leave
pim/employee
```

---

## 15. Quy ước viết test generated

Ví dụ skeleton:

```ts
import { expect } from '@playwright/test';
import { test } from '@fixtures/test';

test.describe('Recruitment - Job', () => {
  test('@smoke TC_JOB_001 - Create job successfully', async ({ loginPage, recruitmentJobPage, evidence }) => {
    await test.step('Login as admin', async () => {
      await loginPage.goto();
      await loginPage.loginAs('admin');
    });

    await test.step('Create job', async () => {
      await recruitmentJobPage.goto();
      await recruitmentJobPage.createJob({
        title: 'Automation QA',
        description: 'Created by automation test'
      });
      await evidence.screenshot('after-create-job');
    });

    await test.step('Verify job is displayed', async () => {
      await expect(recruitmentJobPage.jobRow('Automation QA')).toBeVisible();
    });
  });
});
```

Nguyên tắc:

```txt
Mỗi testcase manual tương ứng một test hoặc một nhóm test rõ ràng.
Tên test nên có Test Case ID.
Dùng test.step để map với step manual.
Assertion phải thể hiện expected result.
Evidence nên gắn ở checkpoint quan trọng.
```

---

## 16. Quy trình review trước khi merge

Checklist tối thiểu:

```txt
[ ] Test có đúng Test Case ID không?
[ ] Step có map đúng manual testcase không?
[ ] Expected result có assertion rõ ràng không?
[ ] Có hard-code account/domain/password không?
[ ] Có page.locator trực tiếp trong generated spec không?
[ ] Locator có nằm trong locator catalog không?
[ ] Action có nằm trong Page Object không?
[ ] Test data có lấy từ package/helper không?
[ ] Evidence có đủ cho business checkpoint không?
[ ] Chạy pass trên dev/stg chưa?
[ ] Report có trace/screenshot/video khi fail chưa?
```

Chạy trước khi review:

```bash
npm run validate:ai
npm run test:dev -- --project=chromium
npm run report
```

---

## 17. Clean output report/evidence

Mac/Linux:

```bash
rm -rf test-results playwright-report allure-results
```

Windows PowerShell:

```powershell
Remove-Item -Recurse -Force test-results, playwright-report, allure-results
```

Sau đó chạy lại:

```bash
npm run test:dev
npm run report
```

---

## 18. Gợi ý dùng trong Antigravity / AI IDE

Dùng các file có sẵn:

```txt
.agent/rules/01_playwright_native_generation_rule.md
.agent/skills/generate_playwright_native_from_manual_tc.md
.agent/workflows/01_generate_native_spec_from_manual_tc.md
.agent/workflows/02_execute_and_debug_native_spec.md
```

Prompt mẫu:

```txt
Hãy generate Playwright native automation test cho module <module_name>.

Input:
- Manual testcase: <path>
- Locator package: <path>
- Test data package: <path>
- Existing Page Object: <path>
- Framework rule: .agent/rules/01_playwright_native_generation_rule.md

Yêu cầu:
- Không dùng Cucumber.
- Không viết page.locator trực tiếp trong generated spec.
- Bổ sung locator vào src/locators nếu thiếu.
- Bổ sung action vào src/pages nếu thiếu.
- Assertion nằm trong spec.
- Dùng evidence fixture ở checkpoint quan trọng.
- Sau khi sinh code, chạy npm run validate:ai.
- Nếu fail, chỉ sửa đúng nguyên nhân dựa trên trace/report.
```

---

## 19. Lệnh hay dùng

```bash
# Cài dependency
npm install

# Cài browser
npm run install:browsers

# Chạy tất cả test
npm test

# Chạy dev/stg/uat/prod
npm run test:dev
npm run test:stg
npm run test:uat
npm run test:prod:smoke

# Chạy generated test
npm run test:generated

# Chạy headed
npm run test:headed

# Chạy debug
npm run test:debug

# Chạy UI mode
npm run test:ui

# Xem HTML report
npm run report

# Xem Allure report
npm run report:allure

# Validate code AI sinh
npm run validate:ai

# Tạo module mới
npm run new:module -- recruitment/job

# Record/codegen locator
npm run codegen -- https://your-domain.example.com
```

---

## 20. Ghi chú vận hành thực tế

Với dự án thật, nên triển khai theo thứ tự:

```txt
1. Chạy test mẫu để verify framework.
2. Cấu hình env dev.
3. Chuẩn hóa account test.
4. Chọn một module nhỏ để pilot.
5. Chuẩn bị manual testcase + locator package + test data package.
6. Cho AI generate spec.
7. QA review code generated.
8. Execute trên dev.
9. Debug bằng report/evidence.
10. Sau khi ổn mới nhân rộng sang module khác.
```

Không nên để AI generate ồ ạt nhiều module ngay từ đầu. Nên chạy theo batch nhỏ, ví dụ 5-10 testcase/lần, review và ổn định rule trước khi scale.

---

## 21. Tài liệu nội bộ nên đọc

```txt
docs/architecture.md          ← Kiến trúc tổng quan và data flow (v2)
docs/ai-workflow-guide.md     ← Hướng dẫn dùng AI gen spec, debug, thêm module (v2)
docs/00_framework_principles.md
docs/01_ai_generation_contract.md
docs/04_review_checklist.md
docs/05_debug_workflow.md
docs/06_environment_config.md
docs/07_report_and_evidence.md
```

Nếu chỉ muốn bắt đầu nhanh, đọc theo thứ tự:

```txt
README.md
.env.example
config/environments/dev.env.example
docs/architecture.md
docs/ai-workflow-guide.md
```

---

## 22. Makefile — Lệnh Nhanh

Framework v2.0 cung cấp Makefile để thống nhất lệnh trên mọi môi trường.

> **Windows:** Cần cài `make` qua `winget install GnuWin32.Make` hoặc dùng Git Bash.
> Có thể thay thế bằng các lệnh `npm run *` tương đương.

| Makefile | npm script tương đương | Mô tả |
|---|---|---|
| `make setup` | `npm ci && npm run install:browsers` | First-time setup |
| `make install` | `npm ci` | Clean install dependencies |
| `make test-dev` | `npm run test:dev` | Chạy test trên DEV |
| `make test-stg` | `npm run test:stg` | Chạy test trên STAGING |
| `make test-generated` | `npm run test:generated` | Chạy generated specs |
| `make validate` | `npm run validate:ai` | Kiểm tra anti-patterns |
| `make lint` | `npm run lint` | ESLint check |
| `make format` | `npm run format` | Prettier format |
| `make report` | `npm run report` | Mở HTML report |
| `make report-allure` | `npm run report:allure` | Mở Allure report |
| `make clean-reports` | — | Xóa tất cả report/result dirs |
| `make clean-all` | — | Xóa node_modules + reports |
| `make gen-module MODULE=admin` | `npm run new:module admin` | Tạo module skeleton |
| `make gen-spec INPUT=file.json` | `npm run gen:spec -- file.json` | Gen spec từ TC JSON |

---

## 23. Database — Connection Pool

Framework v2.0 có hai cách dùng database:

### 23.1. Single Query (đơn giản)

```ts
import { queryDb } from '@core/database';

const rows = await queryDb<{ name: string }>(
  'SELECT name FROM jobs WHERE id = ?',
  [jobId]
);
expect(rows[0]?.name).toBe('Expected Job Name');
```

### 23.2. Pool Query (hiệu suất cao — dùng khi test suite có nhiều query)

```ts
import { queryPool, closeAllPools } from '@core/database-pool';

// Trong test/fixture:
const rows = await queryPool<{ count: number }>('SELECT COUNT(*) AS count FROM vacancies');

// closeAllPools() được gọi tự động trong global teardown
// hoặc gọi thủ công:
await closeAllPools();
```

### 23.3. Cấu hình Database

```env
DB_ENABLED=true
DB_CLIENT=mysql       # mysql | mariadb | postgres
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=app_db
DB_USERNAME=app_user
DB_PASSWORD=change_me_in_env_file_not_here
DB_SSL=false
```

---

## 24. API Testing

Framework v2.0 có HTTP client layer (`src/core/api.ts`).

```ts
import { test, expect } from '@fixtures/test';

test('TC_API_001 - API returns vacancy list', async ({ apiClient, evidence }) => {
  await evidence.runtime();

  const vacancies = await apiClient.get<Vacancy[]>('/recruitment/vacancies');
  expect(vacancies.length).toBeGreaterThan(0);
  await evidence.json('vacancies', vacancies);
});
```

Dùng `raw()` cho negative test (kiểm tra HTTP status):

```ts
const response = await apiClient.raw('DELETE', '/admin/payGrades/99999');
expect(response.status()).toBe(404);
```

---

## 25. Code Quality

### ESLint

```bash
npm run lint          # Kiểm tra lỗi
npm run lint:fix      # Tự sửa lỗi có thể sửa
```

Rules quan trọng:
- `@typescript-eslint/no-floating-promises` — bắt `await` bị thiếu
- `@typescript-eslint/no-unused-vars` — bắt variable không dùng
- `consistent-type-imports` — enforce `import type`

### Prettier

```bash
npm run format        # Format tất cả TS files
npm run format:check  # Chỉ kiểm tra, không sửa (dùng trong CI)
```

---

## 26. Generate Spec Từ Manual TC JSON

### Chuẩn bị TC JSON

Copy template:

```bash
cp inputs/manual-testcases/template.json inputs/manual-testcases/recruitment/tc-rec-001.json
```

Điền thông tin và set:
```json
{ "automationStatus": "AUTO_READY" }
```

### Chạy generator

```bash
# Một file
npm run gen:spec -- inputs/manual-testcases/recruitment/tc-rec-001.json

# Toàn bộ thư mục
npm run gen:spec -- inputs/manual-testcases/recruitment/

# Makefile
make gen-spec INPUT=inputs/manual-testcases/recruitment/tc-rec-001.json
```

### Kiểm tra và activate spec

```bash
npm run validate:ai
```

Sau khi verify locator — xóa `test.describe.skip`:

```bash
npm run test:generated
```

---

## 27. Thêm Module Mới (v2.0 Pattern)

### Bước 1: Scaffold

```bash
make gen-module MODULE=admin
```

### Bước 2: Tạo module fixture (không cần sửa test.ts)

```ts
// src/fixtures/admin.fixture.ts
import { test as base, expect } from '@fixtures/test';
import { PayGradePage } from '@pages/admin/pay-grade.page';

export const test = base.extend({
  payGradePage: async ({ page }, use) => use(new PayGradePage(page))
});
export { expect };
```

### Bước 3: Import trong spec

```ts
import { test, expect } from '@fixtures/admin.fixture';

test('TC_ADMIN_001 - ...', async ({ payGradePage, evidence }) => {
  // ...
});
```

> **Ưu điểm v2.0:** Không cần sửa `src/fixtures/test.ts` mỗi khi thêm module mới.
