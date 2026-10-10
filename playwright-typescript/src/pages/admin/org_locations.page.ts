import { BasePage } from '@pages/base.page';
import { orgLocationsLocators } from '@locators/admin/org_locations.locators';
import { expect, type Locator } from '@playwright/test';

export class OrgLocationsPage extends BasePage {
  // Locators
  get adminMenu() { return this.by(orgLocationsLocators.adminMenu); }
  get topNavOrgMenu() { return this.page.locator(orgLocationsLocators.topNavOrgMenu.selector!).filter({ hasText: 'Organization' }); }
  get locationsMenuItem() { return this.by(orgLocationsLocators.locationsMenuItem); }
  get addButton() { return this.by(orgLocationsLocators.addButton); }
  get nameInput() { return this.by(orgLocationsLocators.nameInput); }
  get countryDropdown() { return this.by(orgLocationsLocators.countryDropdown); }
  get saveButton() { return this.by(orgLocationsLocators.saveButton); }
  get successToast() { return this.by(orgLocationsLocators.successToast); }
  get confirmDeleteButton() { return this.by(orgLocationsLocators.confirmDeleteButton); }
  get errorMessage() { return this.by(orgLocationsLocators.errorMessage); }

  // Actions
  async openLocations(): Promise<void> {
    await this.adminMenu.click();
    await this.topNavOrgMenu.waitFor({ state: 'visible' });
    await this.topNavOrgMenu.click();
    await this.locationsMenuItem.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('.oxd-table-body').waitFor({ state: 'visible' }).catch(() => null);
  }

  async startAdd(): Promise<void> {
    await this.addButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector('.orangehrm-card-container', { state: 'visible' });
  }

  async fillForm(data: { name: string; country?: string }): Promise<void> {
    if (data.name !== undefined) {
      await this.clearAndFill(this.nameInput, data.name);
    }
    
    if (data.country) {
      await this.countryDropdown.click();
      const option = this.page.getByRole('option', { name: data.country, exact: true });
      await option.scrollIntoViewIfNeeded();
      await option.click();
    }
  }

  async save(): Promise<void> {
    const savePromise = this.page.waitForResponse(resp => 
      resp.url().includes('/organization/locations') && resp.status() === 200,
      { timeout: 3000 }
    ).catch(() => null);

    await this.saveButton.click();
    await savePromise;
  }

  async deleteByName(name: string): Promise<void> {
    const row = await this.findRowByName(name);
    await row.locator(orgLocationsLocators.deleteIcon.selector!).click();
    await this.confirmDeleteButton.click();
    await this.waitForHidden(this.confirmDeleteButton);
  }

  // Helpers
  async findRowByName(name: string): Promise<Locator> {
    await this.page.locator('.oxd-table-body').waitFor({ state: 'visible' });

    const firstPageBtn = this.page.locator('.oxd-pagination-page-item--page').filter({ hasText: '1' });
    if (await firstPageBtn.isVisible() && !(await firstPageBtn.getAttribute('class'))?.includes('selected')) {
      await firstPageBtn.click();
      await this.page.waitForLoadState('networkidle');
    }

    let attempts = 0;
    const maxPages = 15; 

    while (attempts < maxPages) {
      const row = this.page.locator('.oxd-table-row').filter({ hasText: name });
      if (await row.count() > 0) {
        await row.first().scrollIntoViewIfNeeded();
        return row.first();
      }
      
      const nextBtn = this.page.locator('button.oxd-pagination-page-item--previous-next:has(i.bi-chevron-right)');
      if (await nextBtn.isVisible() && await nextBtn.isEnabled()) {
        await nextBtn.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(500); 
        attempts++;
      } else {
        break;
      }
    }
    
    throw new Error(`Location "${name}" not found after searching ${attempts + 1} pages.`);
  }

  async isLocationInList(name: string): Promise<boolean> {
    try {
      await this.findRowByName(name);
      return true;
    } catch {
      return false;
    }
  }
}
