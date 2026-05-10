import { BasePage } from '@pages/base.page';
import { orgGeneralInfoLocators } from '@locators/admin/org_general_info.locators';

export class OrgGeneralInfoPage extends BasePage {
  // Locators
  get adminMenu() { return this.by(orgGeneralInfoLocators.adminMenu); }
  get topNavOrgMenu() { return this.page.locator(orgGeneralInfoLocators.topNavOrgMenu.selector!).filter({ hasText: 'Organization' }); }
  get generalInfoMenuItem() { return this.by(orgGeneralInfoLocators.generalInfoMenuItem); }
  get editSwitch() { return this.by(orgGeneralInfoLocators.editSwitch); }
  get organizationNameInput() { return this.by(orgGeneralInfoLocators.organizationNameInput); }
  get registrationNumberInput() { return this.by(orgGeneralInfoLocators.registrationNumberInput); }
  get saveButton() { return this.by(orgGeneralInfoLocators.saveButton); }
  get successToast() { return this.by(orgGeneralInfoLocators.successToast); }
  get errorMessage() { return this.by(orgGeneralInfoLocators.errorMessage); }

  // Actions
  async openGeneralInfo(): Promise<void> {
    await this.adminMenu.click();
    await this.topNavOrgMenu.waitFor({ state: 'visible' });
    await this.topNavOrgMenu.click();
    await this.generalInfoMenuItem.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector('.orangehrm-card-container', { state: 'visible' });
  }

  async toggleEdit(enable: boolean): Promise<void> {
    const input = this.editSwitch.locator('input[type="checkbox"]');
    const isChecked = await input.isChecked();
    if (isChecked !== enable) {
      await this.editSwitch.click();
      // Wait for the form to become editable/disabled
      await this.page.waitForTimeout(500); 
    }
  }

  async fillForm(data: { name: string; regNumber?: string }): Promise<void> {
    await this.clearAndFill(this.organizationNameInput, data.name);
    
    if (data.regNumber !== undefined) {
      await this.clearAndFill(this.registrationNumberInput, data.regNumber);
    }
  }

  async save(): Promise<void> {
    const savePromise = this.page.waitForResponse(resp => 
      resp.url().includes('/organization/general-information') && resp.status() === 200,
      { timeout: 3000 }
    ).catch(() => null);

    await this.saveButton.click();
    await savePromise;
  }
}
