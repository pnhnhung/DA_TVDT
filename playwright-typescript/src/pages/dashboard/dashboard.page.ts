import type { Locator, Page } from '@playwright/test';
import { dashboardLocators } from '@locators/dashboard/dashboard.locators';
import { BasePage } from '@pages/base.page';

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get pageHeader(): Locator {
    return this.by(dashboardLocators.pageHeader);
  }

  get userMenu(): Locator {
    return this.by(dashboardLocators.userMenu);
  }
}
