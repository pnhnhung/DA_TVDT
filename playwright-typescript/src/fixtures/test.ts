/**
 * test.ts — Main test fixture (entry point cho mọi spec)
 *
 * Extends baseTest với các Page Object phổ biến (auth + dashboard).
 * Để thêm module mới, KHÔNG cần sửa file này.
 *
 * Cách thêm module mới:
 *   1. Tạo Page Object tại src/pages/<module>/<module>.page.ts
 *   2. Tạo fixture riêng tại src/fixtures/<module>.fixture.ts
 *      → extend từ `test` export ở đây
 *   3. Import fixture đó trong spec của module
 *
 * Ví dụ module fixture:
 *   // src/fixtures/admin.fixture.ts
 *   import { test as base, expect } from '@fixtures/test';
 *   import { PayGradePage } from '@pages/admin/pay-grade.page';
 *
 *   export const test = base.extend({
 *     payGradePage: async ({ page }, use) => use(new PayGradePage(page))
 *   });
 *   export { expect };
 */

import { baseTest, expect } from '@fixtures/base.fixture';
import { LoginPage } from '@pages/auth/login.page';
import { DashboardPage } from '@pages/dashboard/dashboard.page';
// Removed RecruitmentJobPage import
import type { BaseFixtures } from '@fixtures/base.fixture';

// ──────────────────────────────────────────────────────────────────────────────
// Common Page Fixtures (shared across most modules)
// ──────────────────────────────────────────────────────────────────────────────

export type CommonPageFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  // recruitmentJobPage: RecruitmentJobPage; (Removed)
};

export type AppFixtures = BaseFixtures & CommonPageFixtures;

export const test = baseTest.extend<CommonPageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  // recruitmentJobPage: async ({ page }, use) => {
  //   await use(new RecruitmentJobPage(page));
  // }
});

export { expect };
