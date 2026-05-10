import { BasePage } from '@pages/base.page';
import { jobCategoriesLocators } from '@locators/admin/job_categories.locators';
import { expect, type Locator } from '@playwright/test';

export class JobCategoriesPage extends BasePage {
  // Locators
  get adminMenu() { return this.by(jobCategoriesLocators.adminMenu); }
  get topNavJobMenu() { return this.by(jobCategoriesLocators.topNavJobMenu); }
  get jobCategoriesMenuItem() { return this.by(jobCategoriesLocators.jobCategoriesMenuItem); }
  get addButton() { return this.by(jobCategoriesLocators.addButton); }
  get nameInput() { return this.by(jobCategoriesLocators.nameInput); }
  get saveButton() { return this.by(jobCategoriesLocators.saveButton); }
  get cancelButton() { return this.by(jobCategoriesLocators.cancelButton); }
  get successToast() { return this.by(jobCategoriesLocators.successToast); }
  get confirmDeleteButton() { return this.by(jobCategoriesLocators.confirmDeleteButton); }
  get errorMessage() { return this.by(jobCategoriesLocators.errorMessage); }

  // Actions
  async openJobCategories(): Promise<void> {
    await this.adminMenu.click();
    await this.topNavJobMenu.waitFor({ state: 'visible' });
    await this.topNavJobMenu.click();
    await this.jobCategoriesMenuItem.click();
    await this.expectUrlContains(/jobCategory/);
    await this.page.locator('.oxd-table-body').waitFor({ state: 'visible' });
    await this.page.waitForLoadState('networkidle');
  }

  async startAdd(): Promise<void> {
    await this.addButton.click();
    await this.expectUrlContains(/saveJobCategory/);
  }

  async fillName(name: string): Promise<void> {
    await this.clearAndFill(this.nameInput, name);
  }

  async save(): Promise<void> {
    const savePromise = this.page.waitForResponse(resp => 
      resp.url().includes('/job-categories') && resp.status() === 200,
      { timeout: 3000 }
    ).catch(() => null);

    await this.saveButton.click();
    await savePromise;
  }

  async deleteByName(name: string): Promise<void> {
    const row = await this.findRowByName(name);
    await row.locator(jobCategoriesLocators.deleteIcon.selector!).click();
    await this.confirmDeleteButton.click();
    await this.waitForHidden(this.confirmDeleteButton);
  }

  async editByName(name: string, newName: string): Promise<void> {
    const row = await this.findRowByName(name);
    await row.locator(jobCategoriesLocators.editIcon.selector!).click();
    await this.expectUrlContains(/saveJobCategory/);
    await this.clearAndFill(this.nameInput, newName);
    await this.save();
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
    
    throw new Error(`Job Category "${name}" not found after searching ${attempts + 1} pages.`);
  }

  async isCategoryInList(name: string): Promise<boolean> {
    try {
      await this.findRowByName(name);
      return true;
    } catch {
      return false;
    }
  }
}
