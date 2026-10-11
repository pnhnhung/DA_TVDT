import type { Locator, Page } from '@playwright/test';
import { env, type ElibraryRole } from '@config/env';
import { elibraryLocators } from '@locators/elibrary/elibrary.locators';
import { BasePage } from '@pages/base.page';

export class EofficeLoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get usernameInput(): Locator {
    return this.by(elibraryLocators.usernameInput);
  }

  get passwordInput(): Locator {
    return this.by(elibraryLocators.passwordInput);
  }

  get loginButton(): Locator {
    return this.by(elibraryLocators.loginButton);
  }

  get libraryMenuLink(): Locator {
    return this.by(elibraryLocators.libraryMenuLink);
  }

  async open(): Promise<void> {
    await this.page.goto(env.elibrary.baseUrl, { waitUntil: 'domcontentloaded' });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginAsRole(role: ElibraryRole): Promise<void> {
    const account = env.elibrary.accounts[role];
    if (!account.username || !account.password) {
      throw new Error(
        `Chưa cấu hình tài khoản role "${role}". Thêm ELIBRARY_${role.toUpperCase()}_USERNAME và ELIBRARY_${role.toUpperCase()}_PASSWORD vào .env.`
      );
    }
    await this.open();
    await this.login(account.username, account.password);
    await this.openLibrary();
  }

  async openLibrary(): Promise<void> {
    await this.libraryMenuLink.click();
    await this.by(elibraryLocators.searchInput).waitFor({
      state: 'visible',
      timeout: 30_000
    });
  }
}
