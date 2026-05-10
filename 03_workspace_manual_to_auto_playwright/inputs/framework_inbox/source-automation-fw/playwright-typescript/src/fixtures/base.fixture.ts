/**
 * base.fixture.ts
 *
 * Fixture gốc — chứa các fixture dùng chung không phụ thuộc module:
 *   - testEnv   : môi trường đang chạy (dev/stg/uat/prod)
 *   - evidence  : capture screenshot/json/text vào report
 *   - apiClient : HTTP client gắn với Playwright request context
 *
 * Các fixture Page Object nằm trong src/fixtures/test.ts (common pages)
 * hoặc module fixture file riêng (vd: src/fixtures/admin.fixture.ts).
 *
 * Import trong spec:
 *   import { test, expect } from '@fixtures/test';
 */

import { test as playwrightTest, expect } from '@playwright/test';
import type { TestEnvironment } from '@config/env';
import { env } from '@config/env';
import { Evidence } from '@core/evidence';
import { ApiClient } from '@core/api';

export type BaseFixtures = {
  /** Môi trường hiện tại: 'dev' | 'stg' | 'uat' | 'prod' */
  testEnv: TestEnvironment;

  /** Evidence helper — screenshot/json/text đính kèm vào Allure report */
  evidence: Evidence;

  /** API client — anonymous hoặc inject token sau khi login */
  apiClient: ApiClient;
};

export const baseTest = playwrightTest.extend<BaseFixtures>({
  testEnv: async ({}, use) => {
    await use(env.TEST_ENV);
  },

  evidence: async ({ page }, use, testInfo) => {
    const ev = new Evidence(page, testInfo);
    await use(ev);

    // Auto-capture failure evidence sau khi test kết thúc
    if (testInfo.status !== testInfo.expectedStatus) {
      try {
        await ev.failureSnapshot();
      } catch (error) {
        await testInfo.attach('failure-evidence-error.txt', {
          body: Buffer.from(String(error)),
          contentType: 'text/plain'
        });
      }
    }
  },

  apiClient: async ({ request }, use) => {
    const client = new ApiClient(request, env.API_BASE_URL || env.BASE_URL);
    await use(client);
  }
});

export { expect };
