import { QualificationBasePage } from './qualification_base.page';
import { qualificationLocators } from '@locators/admin/qualifications.locators';
import type { Locator, Page } from '@playwright/test';

export class QualEducationPage extends QualificationBasePage {
  constructor(page: Page) {
    super(page);
  }

  // Map mainInput to Level field for Education
  get mainInput(): Locator {
    return this.by(qualificationLocators.levelInput);
  }

  async open(): Promise<void> {
    await this.navigateToMenu(qualificationLocators.menuItemEducation);
  }
}
