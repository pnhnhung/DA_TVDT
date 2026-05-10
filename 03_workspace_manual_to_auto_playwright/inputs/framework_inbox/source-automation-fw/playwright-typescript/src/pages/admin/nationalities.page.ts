import { BasePage } from '@pages/base.page';
import { nationalitiesLocators } from '@locators/admin/nationalities.locators';
import { expect, type Locator } from '@playwright/test';

export class NationalitiesPage extends BasePage {
  // Locators
  get adminMenu() { return this.by(nationalitiesLocators.adminMenu); }
  get topNavNationalitiesMenu() { return this.by(nationalitiesLocators.topNavNationalitiesMenu); }
  get addButton() { return this.by(nationalitiesLocators.addButton); }
  get nameInput() { return this.by(nationalitiesLocators.nameInput); }
  get saveButton() { return this.by(nationalitiesLocators.saveButton); }
  get cancelButton() { return this.by(nationalitiesLocators.cancelButton); }
  get successToast() { return this.by(nationalitiesLocators.successToast); }
  get confirmDeleteButton() { return this.by(nationalitiesLocators.confirmDeleteButton); }
  get errorMessage() { return this.by(nationalitiesLocators.errorMessage); }

  // Actions
  async openNationalities(): Promise<void> {
    await this.adminMenu.click();
    await this.topNavNationalitiesMenu.waitFor({ state: 'visible' });
    await this.topNavNationalitiesMenu.click();
    await this.expectUrlContains(/nationality/);
    await this.page.locator('.oxd-table-body').waitFor({ state: 'visible' });
    await this.page.waitForLoadState('networkidle');
  }

  async startAdd(): Promise<void> {
    await this.addButton.click();
    await this.expectUrlContains(/saveNationality/);
  }

  async fillName(name: string): Promise<void> {
    await this.clearAndFill(this.nameInput, name);
  }

  async save(): Promise<void> {
    // Wait for API response after save
    const savePromise = this.page.waitForResponse(resp => 
      resp.url().includes('/nationalities') && (resp.status() === 200 || resp.status() === 201),
      { timeout: 15000 }
    ).catch(() => null);

    await this.saveButton.click();
    await savePromise;
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async deleteByName(name: string): Promise<void> {
    const row = await this.findRowByName(name);
    await row.locator(nationalitiesLocators.deleteIcon.selector!).click();
    await this.confirmDeleteButton.click();
    await this.waitForHidden(this.confirmDeleteButton);
  }

  async editByName(name: string, newName: string): Promise<void> {
    const row = await this.findRowByName(name);
    await row.locator(nationalitiesLocators.editIcon.selector!).click();
    await this.expectUrlContains(/saveNationality/);
    await this.clearAndFill(this.nameInput, newName);
    await this.save();
  }

  async waitForLoading(): Promise<void> {
    const spinner = this.page.locator('.oxd-loading-spinner');
    // Small delay to let the spinner appear if it's going to
    await this.page.waitForTimeout(300);
    if (await spinner.isVisible()) {
      await spinner.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => null);
    }
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
        const respPromise = this.page.waitForResponse(resp => resp.url().includes('/nationalities') && resp.request().method() === 'GET', { timeout: 10000 }).catch(() => null);
        await nextBtn.click();
        await respPromise;
        await this.waitForLoading();
        await this.page.waitForTimeout(500); 
        attempts++;
      } else {
        break;
      }
    }
    
    throw new Error(`Nationality "${name}" not found after searching ${attempts + 1} pages.`);
  }

  async isNationalityInList(name: string): Promise<boolean> {
    try {
      await this.findRowByName(name);
      return true;
    } catch {
      return false;
    }
  }
}
