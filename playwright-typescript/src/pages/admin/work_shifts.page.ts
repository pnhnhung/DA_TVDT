import { BasePage } from '@pages/base.page';
import { workShiftsLocators } from '@locators/admin/work_shifts.locators';
import { expect, type Locator } from '@playwright/test';

export class WorkShiftsPage extends BasePage {
  // Locators
  get adminMenu() { return this.by(workShiftsLocators.adminMenu); }
  get topNavJobMenu() { return this.by(workShiftsLocators.topNavJobMenu); }
  get workShiftsMenuItem() { return this.by(workShiftsLocators.workShiftsMenuItem); }
  get addButton() { return this.by(workShiftsLocators.addButton); }
  get shiftNameInput() { return this.by(workShiftsLocators.shiftNameInput); }
  get timeFromInput() { return this.by(workShiftsLocators.timeFromInput); }
  get timeToInput() { return this.by(workShiftsLocators.timeToInput); }
  get saveButton() { return this.by(workShiftsLocators.saveButton); }
  get cancelButton() { return this.by(workShiftsLocators.cancelButton); }
  get successToast() { return this.by(workShiftsLocators.successToast); }
  get confirmDeleteButton() { return this.by(workShiftsLocators.confirmDeleteButton); }
  get errorMessage() { return this.by(workShiftsLocators.errorMessage); }

  // Actions
  async openWorkShifts(): Promise<void> {
    await this.adminMenu.click();
    await this.topNavJobMenu.waitFor({ state: 'visible' });
    await this.topNavJobMenu.click();
    await this.workShiftsMenuItem.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('.oxd-table-body').waitFor({ state: 'visible' });
  }

  async startAdd(): Promise<void> {
    await this.addButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector('.orangehrm-card-container', { state: 'visible' });
  }

  async fillForm(data: { name: string; timeFrom?: string; timeTo?: string }): Promise<void> {
    await this.clearAndFill(this.shiftNameInput, data.name);
    
    if (data.timeFrom) {
      await this.clearAndFill(this.timeFromInput, data.timeFrom);
      // Wait to ensure Vue updates the state if time picker is tricky
      await this.timeFromInput.press('Tab');
    }
    
    if (data.timeTo) {
      await this.clearAndFill(this.timeToInput, data.timeTo);
      await this.timeToInput.press('Tab');
    }
  }

  async save(): Promise<void> {
    const savePromise = this.page.waitForResponse(resp => 
      resp.url().includes('/work-shifts') && resp.status() === 200,
      { timeout: 3000 }
    ).catch(() => null);

    await this.saveButton.click();
    await savePromise;
  }

  async deleteByName(name: string): Promise<void> {
    const row = await this.findRowByName(name);
    await row.locator(workShiftsLocators.deleteIcon.selector!).click();
    await this.confirmDeleteButton.click();
    await this.waitForHidden(this.confirmDeleteButton);
  }

  async editByName(name: string, newData: { name: string; timeFrom?: string; timeTo?: string }): Promise<void> {
    const row = await this.findRowByName(name);
    await row.locator(workShiftsLocators.editIcon.selector!).click();
    await this.page.waitForLoadState('networkidle');
    await this.fillForm(newData);
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
    
    throw new Error(`Work Shift "${name}" not found after searching ${attempts + 1} pages.`);
  }

  async isShiftInList(name: string): Promise<boolean> {
    try {
      await this.findRowByName(name);
      return true;
    } catch {
      return false;
    }
  }
}
