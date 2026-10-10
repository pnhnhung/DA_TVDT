import { QualificationBasePage } from './qualification_base.page';
import { qualificationLocators } from '@locators/admin/qualifications.locators';
import type { Locator, Page } from '@playwright/test';

export class QualMembershipsPage extends QualificationBasePage {
  constructor(page: Page) {
    super(page);
  }

  // Map mainInput to Name field for Memberships
  get mainInput(): Locator {
    return this.by(qualificationLocators.nameInput);
  }

  async open(): Promise<void> {
    await this.navigateToMenu(qualificationLocators.menuItemMemberships);
  }
}
