import type { Locator, Page } from '@playwright/test';
import { loginLocators } from '@locators/auth/login.locators';
import { BasePage } from '@pages/base.page';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get usernameInput(): Locator {
    return this.by(loginLocators.usernameInput);
  }

  get passwordInput(): Locator {
    return this.by(loginLocators.passwordInput);
  }

  get loginButton(): Locator {
    return this.by(loginLocators.loginButton);
  }

  get invalidCredentialAlert(): Locator {
    return this.by(loginLocators.invalidCredentialAlert);
  }

  async open(): Promise<void> {
    await this.gotoPath('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async logout(): Promise<void> {
    await this.page.locator('.oxd-userdropdown-tab').click();
    await this.page.getByRole('menuitem', { name: 'Logout' }).click();
    await this.page.waitForURL(/login/);
  }
}
