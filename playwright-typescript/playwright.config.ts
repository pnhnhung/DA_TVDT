import { defineConfig, devices } from '@playwright/test';
import { env } from './src/config/env';

const isCi = Boolean(process.env.CI);

export default defineConfig({
  testDir: './tests',

  // Global setup: validate env + optional DB ping trước khi chạy suite
  globalSetup: './src/core/global-setup.ts',

  timeout: env.DEFAULT_TIMEOUT_MS * 4,
  expect: {
    timeout: env.EXPECT_TIMEOUT_MS
  },

  fullyParallel: true,
  forbidOnly: isCi,
  retries: isCi ? 2 : 0,
  workers: isCi ? 2 : 6,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: `test-results/${env.TEST_ENV}/junit.xml` }],
    ['json', { outputFile: `test-results/${env.TEST_ENV}/results.json` }],
    ['allure-playwright', { outputFolder: `allure-results/${env.TEST_ENV}`, detail: true }]
  ],

  metadata: {
    testEnv: env.TEST_ENV,
    envFile: env.ENV_FILE,
    accountProfile: env.ACCOUNT_PROFILE,
    baseUrl: env.BASE_URL
  },

  use: {
    baseURL: env.BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: env.ACTION_TIMEOUT_MS,
    navigationTimeout: env.NAVIGATION_TIMEOUT_MS,
    // Desktop viewport chuẩn — tuân thủ global rule 1920x1080
    viewport: { width: 1920, height: 1080 }
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    // Bật WebKit để test trên Safari:
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },

    // Bật Edge để test trên Microsoft Edge (sẽ dùng Edge cài sẵn trên máy):
    { name: 'edge', use: { channel: 'msedge' } }
  ],

  outputDir: `test-results/${env.TEST_ENV}/artifacts`
});
