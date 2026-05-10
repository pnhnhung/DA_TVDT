import { QualificationBasePage } from './qualification_base.page';
import { qualificationLocators } from '@locators/admin/qualifications.locators';
import type { Locator, Page } from '@playwright/test';

export class QualLicensesPage extends QualificationBasePage {
  constructor(page: Page) {
    super(page);
  }

  // Map mainInput to Name field for Licenses
  get mainInput(): Locator {
    return this.by(qualificationLocators.nameInput);
  }

  async open(): Promise<void> {
    await this.navigateToMenu(qualificationLocators.menuItemLicenses);
  }
}
