import type { Locator, Page, Response } from '@playwright/test';
import { expect } from '@playwright/test';
import { by, type LocatorSpec } from '@core/locator';

/**
 * BasePage — abstract base cho tất cả Page Object trong framework.
 *
 * Cung cấp:
 * - Locator helper (by)
 * - Navigation với waitForLoad
 * - Smart waits (waitForNetworkIdle, waitForSelector, waitForResponse)
 * - Scroll helper
 * - URL assertion
 * - Modal close helper
 * - Soft assertion wrapper (không fail ngay)
 */
export abstract class BasePage {
  constructor(public readonly page: Page) {}

  // ── Locator ───────────────────────────────────────────────────────────────

  public by(spec: LocatorSpec): Locator {
    return by(this.page, spec);
  }

  // ── Navigation ────────────────────────────────────────────────────────────

  async gotoPath(path: string, options?: { waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' }): Promise<void> {
    await this.page.goto(path, { waitUntil: options?.waitUntil ?? 'domcontentloaded' });
  }

  // ── Load State ────────────────────────────────────────────────────────────

  /**
   * Chờ page đạt trạng thái load mong muốn.
   * @default 'domcontentloaded' — nhanh hơn 'networkidle', đủ dùng cho hầu hết SPA
   */
  async waitForLoad(
    state: 'load' | 'domcontentloaded' | 'networkidle' = 'domcontentloaded'
  ): Promise<void> {
    await this.page.waitForLoadState(state);
  }

  /**
   * Chờ network idle — dùng cho page có nhiều API call sau khi navigate.
   * Chỉ dùng khi cần thiết, vì có thể chậm.
   */
  async waitForNetworkIdle(timeout = 10_000): Promise<void> {
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  // ── Element Waits ─────────────────────────────────────────────────────────

  /**
   * Chờ locator visible — sugar wrapper cho expect().toBeVisible()
   */
  async waitForVisible(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeVisible({ timeout });
  }

  /**
   * Chờ locator hidden
   */
  async waitForHidden(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeHidden({ timeout });
  }

  /**
   * Chờ network response match URL pattern — dùng cho API-backed actions.
   * Trả về Response để assert status / body nếu cần.
   *
   * @example
   *   const res = await this.waitForResponse(/\/api\/v2\/recruitment\/vacancies/);
   *   expect(res.status()).toBe(200);
   */
  async waitForResponse(urlPattern: string | RegExp, timeout = 15_000): Promise<Response> {
    return this.page.waitForResponse(urlPattern, { timeout });
  }

  // ── Scroll ────────────────────────────────────────────────────────────────

  /**
   * Scroll element vào viewport trước khi interact.
   */
  async scrollIntoView(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Scroll tới cuối trang — dùng cho infinite scroll hoặc load-more pattern.
   */
  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  // ── Assertion ─────────────────────────────────────────────────────────────

  async expectUrlContains(value: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(value);
  }

  async expectTitle(value: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(value);
  }

  /**
   * Soft assertion — ghi nhận fail nhưng không dừng test.
   * Dùng khi muốn collect nhiều lỗi trong một test step.
   */
  async softAssert(assertion: () => Promise<void>): Promise<void> {
    try {
      await assertion();
    } catch (err) {
      // Playwright's soft assertion accumulates errors — rethrow as soft
      expect.soft(false, String(err)).toBe(true);
    }
  }

  // ── Modal / Dialog ────────────────────────────────────────────────────────

  /**
   * Click nút đóng modal và chờ modal disappear.
   */
  async closeModal(closeButtonLocator: Locator): Promise<void> {
    await closeButtonLocator.click();
    await expect(closeButtonLocator).toBeHidden();
  }

  // ── Input helpers ─────────────────────────────────────────────────────────

  /**
   * Clear và fill input — xử lý Vue.js / React controlled inputs.
   * Equivalent: .clear() rồi .fill() để trigger change event.
   */
  async clearAndFill(locator: Locator, value: string): Promise<void> {
    // Wait for any loading spinner to disappear before clicking
    await this.page.locator('.oxd-loading-spinner').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => null);
    await locator.click();
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.press('Backspace');
    await locator.fill(value);
  }

  /**
   * Select option trong <select> hoặc custom dropdown bằng value.
   */
  async selectOption(locator: Locator, value: string): Promise<void> {
    await locator.selectOption(value);
  }

  // ── Page context ──────────────────────────────────────────────────────────

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }
}
