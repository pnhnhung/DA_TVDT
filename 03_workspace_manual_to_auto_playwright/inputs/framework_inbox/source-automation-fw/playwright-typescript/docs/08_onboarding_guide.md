# Hướng dẫn Nhập môn (Onboarding Guide)

Chào mừng bạn đến với **Playwright TypeScript AI-Automation Framework**. Tài liệu này được viết theo cách đơn giản nhất để một kỹ sư mới (hoặc AI Agent) có thể nắm bắt ngay cấu trúc, chức năng và luồng (flow) chạy của một test case.

---

## 1. Cấu trúc tổng quan

Framework tuân thủ chặt chẽ mô hình **Page Object Model (POM)** kết hợp với **Playwright Fixtures**. 

Hãy tưởng tượng framework như một nhà hàng:
- **Locators** (`src/locators/`): Danh sách nguyên liệu (tìm các nút bấm, ô nhập liệu ở đâu trên web).
- **Page Objects** (`src/pages/`): Đầu bếp (biết cách kết hợp nguyên liệu để thực hiện một món ăn/hành động như "Đăng nhập", "Tạo mới").
- **Fixtures** (`src/fixtures/`): Người phục vụ (mang Page Object đến tận bàn cho Test).
- **Specs** (`tests/generated/`): Thực khách (gọi món, ra lệnh thực hiện các bước và kiểm tra xem món ăn có đúng ý không - Assertion).
- **Core & Data** (`src/core/`, `src/config/`): Bếp trưởng & Quản lý (lo về database, API, xuất báo cáo, cấu hình môi trường).

---

## 2. Khi thêm 1 Test Case mới, cần động vào những file nào?

Giả sử bạn cần tự động hóa một test case: *"Tạo mới chức danh (Job Title) trong Admin"*. 
Bạn KHÔNG viết tất cả code vào 1 file. Luồng thêm mới bắt buộc đi qua 4 tầng sau (theo thứ tự từ dưới lên trên):

### Bước 1: Khai báo UI Elements (Locator Layer)
**Mở file:** `src/locators/admin/job_titles.locators.ts`
- **Mục đích:** Định nghĩa các selector (nút Save, ô Input Name) theo kiểu chuẩn hóa `LocatorSpec`.
- **Ví dụ:**
  ```typescript
  export const jobTitleLocators = {
    nameInput: { strategy: 'label', label: 'Job Title', description: 'Ô nhập tên' },
    saveBtn: { strategy: 'role', role: 'button', name: 'Save', description: 'Nút lưu' }
  };
  ```

### Bước 2: Viết hành động (Page Object Layer)
**Mở file:** `src/pages/admin/job_titles.page.ts`
- **Mục đích:** Định nghĩa các hàm nghiệp vụ (nhập tên, bấm lưu). Kế thừa từ `BasePage`.
- **Ví dụ:**
  ```typescript
  export class JobTitlesPage extends BasePage {
    get nameInput() { return this.by(jobTitleLocators.nameInput); }
    get saveBtn() { return this.by(jobTitleLocators.saveBtn); }

    async fillName(name: string) {
      await this.clearAndFill(this.nameInput, name);
    }
    async clickSave() {
      await this.saveBtn.click();
    }
  }
  ```

### Bước 3: Đăng ký vào Fixture (Fixture Layer)
**Mở file:** `src/fixtures/admin.fixture.ts`
- **Mục đích:** Khai báo `JobTitlesPage` để test script có thể gọi ra dùng mà không cần tự dùng từ khóa `new JobTitlesPage(...)`.
- **Ví dụ:**
  ```typescript
  export const test = base.extend<{ jobTitlesPage: JobTitlesPage }>({
    jobTitlesPage: async ({ page }, use) => use(new JobTitlesPage(page)),
  });
  ```

### Bước 4: Viết Test Script (Spec Layer)
**Tạo file:** `tests/generated/admin/job_titles.generated.spec.ts`
- **Mục đích:** Khai báo các bước (steps) và thực hiện kiểm chứng (assert/expect).
- **Ví dụ:**
  ```typescript
  import { test, expect } from '@fixtures/admin.fixture';

  test('Tạo Job Title thành công', async ({ jobTitlesPage, evidence }) => {
    await evidence.runtime(); // Bắt buộc

    await test.step('Nhập dữ liệu', async () => {
      await jobTitlesPage.fillName('Automation QA');
    });

    await test.step('Lưu và Kiểm tra', async () => {
      await jobTitlesPage.clickSave();
      await expect(jobTitlesPage.successToast).toBeVisible();
      await evidence.screenshot('luu-thanh-cong');
    });
  });
  ```

---

## 3. Flow (Luồng) thực thi của một Test Case

Khi bạn gõ lệnh `make test-module MODULE=admin`:

1. **Khởi tạo:** Playwright đọc `playwright.config.ts`, load các biến môi trường từ `.env` (chọn chạy trên `dev` hay `stg`).
2. **Global Setup:** (Tùy chọn) Chạy file `src/core/global-setup.ts` để kiểm tra kết nối Database hoặc dọn dẹp data thừa trước khi test bắt đầu.
3. **Mở Trình Duyệt:** Playwright mở Chromium, tạo một Context và một Page mới, hoàn toàn sạch (như tab ẩn danh).
4. **Tiêm Fixture (Dependency Injection):**
   - Lấy đối tượng `page` truyền vào `JobTitlesPage` (nhờ Fixture layer).
   - Truyền đối tượng `jobTitlesPage` vào trong function `test(...)` của bạn.
5. **Thực thi Steps:** Code chạy từ trên xuống dưới trong hàm `test`.
   - Nếu gọi hàm thao tác UI, nó sẽ chui vào **Page Object** -> Page Object dùng **Locator Catalog** để tìm element trên màn hình -> Playwright thực hiện click/gõ phím.
6. **Assert & Báo lỗi:** Hàm `expect()` sẽ chờ cho đến khi điều kiện đúng (ví dụ: Toast thông báo hiển thị). Nếu quá 15-30s không đúng, test văng lỗi (Fail) và chụp ảnh màn hình lưu vào `test-results/`.
7. **Báo cáo (Teardown):** Lưu video, xuất json/html report vào thư mục `playwright-report/` và đóng trình duyệt.

## 4. Những điều CẤM KỴ (Anti-Patterns)
Để framework sống lâu và dễ bảo trì, người mới cần ghi nhớ tuyệt đối:
1. **Không viết locator trực tiếp trong file Test:** `await page.locator('.btn-save').click()` ❌ -> Chuyển vào Page Object ✅.
2. **Không dùng `waitForTimeout(3000)`:** Làm test chạy chậm và flaky ❌ -> Dùng `expect(element).toBeVisible()` ✅.
3. **Không dùng tài khoản Hardcode:** `login('admin', '123456')` ❌ -> Dùng `login(users.admin.username, users.admin.password)` ✅.
4. **Không Test chung chạ:** Dùng `test.describe.serial()` nếu các test phụ thuộc tài khoản đăng nhập/đăng xuất của nhau.
