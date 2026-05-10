import { BasePage } from '@pages/base.page';
import { payGradeLocators } from '@locators/admin/pay_grade.locators';
import { expect, type Locator } from '@playwright/test';
export class PayGradePage extends BasePage {
  get adminMenu() { return this.by(payGradeLocators.adminMenu); }
  get topNavJobMenu() { return this.by(payGradeLocators.topNavJobMenu); }
  get payGradesMenuItem() { return this.by(payGradeLocators.payGradesMenuItem); }
  
  // Pay Grade Form
  get addButton() { return this.by(payGradeLocators.addButton).first(); }
  get nameInput() { return this.by(payGradeLocators.nameInput); }
  get saveButton() { return this.page.locator('button[type="submit"]').first(); }
  
  // Currency Form
  get addCurrencyButton() { return this.by(payGradeLocators.addCurrencyButton); }
  get currencySelect() { return this.by(payGradeLocators.currencySelect); }
  get currencyListbox() { return this.by(payGradeLocators.currencyListbox); }
  get minSalaryInput() { return this.by(payGradeLocators.minSalaryInput); }
  get maxSalaryInput() { return this.by(payGradeLocators.maxSalaryInput); }
  get saveCurrencyButton() { return this.page.locator('button[type="submit"]').nth(1); }

  // Shared
  get successToast() { return this.by(payGradeLocators.successToast); }
  get errorMessage() { return this.by(payGradeLocators.errorMessage); }
  get confirmDeleteButton() { return this.by(payGradeLocators.confirmDeleteButton); }

  // Actions
  async openPayGrades(): Promise<void> {
    await this.adminMenu.click();
    await this.topNavJobMenu.waitFor({ state: 'visible' });
    await this.topNavJobMenu.click();
    await this.payGradesMenuItem.click();
    await this.expectUrlContains(/viewPayGrades/);
    await this.page.locator('.oxd-table-body').waitFor({ state: 'visible' });
    await this.page.waitForLoadState('networkidle');
  }

  async startAddPayGrade(): Promise<void> {
    await this.addButton.click();
    await this.expectUrlContains(/payGrade/);
  }

  async fillPayGradeForm(name: string): Promise<void> {
    await this.clearAndFill(this.nameInput, name);
  }

  async save(): Promise<void> {
    const responsePromise = this.page.waitForResponse(/\/admin\/payGrade/, { timeout: 15000 }).catch(() => null);
    await this.saveButton.click();
    await responsePromise;
  }

  async saveCurrency(): Promise<void> {
    const savePromise = this.page.waitForResponse(resp => 
      resp.url().includes('/currencies') && resp.request().method() === 'POST',
      { timeout: 10000 }
    ).catch(() => null);
    
    await this.saveCurrencyButton.click();
    await savePromise;
  }

  async deletePayGrade(name: string): Promise<void> {
    const row = await this.findRowByName(name);
    await row.locator(payGradeLocators.deleteIcon.selector).click();
    await this.confirmDeleteButton.click();
    // Chờ grid update hoặc toast
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Finds a row by name. OrangeHRM table rows use role="row".
   */
  async findRowByName(name: string): Promise<Locator> {
    await this.page.locator('.oxd-table-body').waitFor({ state: 'visible' });

    // Luôn quay về trang 1 trước
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
    
    throw new Error(`Pay Grade "${name}" not found after searching ${attempts + 1} pages.`);
  }

  async isPayGradeInList(name: string): Promise<boolean> {
    try {
      await this.findRowByName(name);
      return true;
    } catch {
      return false;
    }
  }

  async startAddCurrency(): Promise<void> {
    await this.addCurrencyButton.click();
  }

  async fillCurrencyForm(currency: string, min?: string, max?: string): Promise<void> {
    // Select dropdown in OrangeHRM
    await this.currencySelect.click();
    await this.page.waitForTimeout(500);
    
    // Tìm kiếm bằng cách gõ text
    await this.page.keyboard.type(currency.substring(0, 3));
    await this.page.waitForTimeout(500);
    
    // Đảm bảo click được option
    const option = this.currencyListbox.getByRole('option').filter({ hasText: currency });
    await option.waitFor({ state: 'visible' });
    await option.click();

    if (min) await this.clearAndFill(this.minSalaryInput, min);
    if (max) await this.clearAndFill(this.maxSalaryInput, max);
  }

  async deleteCurrency(currencyName: string): Promise<void> {
    // Tìm trong bảng Currency (thường là bảng thứ 2 nếu có)
    const row = this.page.locator('.oxd-table-row').filter({ hasText: currencyName }).first();
    await row.locator(payGradeLocators.deleteIcon.selector).click();
    await this.confirmDeleteButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isCurrencyInList(currencyName: string): Promise<boolean> {
    const row = this.page.locator('.oxd-table-row').filter({ hasText: currencyName }).first();
    try {
      await row.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Cleanup garbage data via UI.
   * Keeps the first `keepCount` records to avoid breaking other tests.
   */
  async cleanupGarbageData(keepCount = 5): Promise<void> {
    await this.openPayGrades();
    
    // Loop max 10 times to avoid infinite loop
    for (let i = 0; i < 10; i++) {
      await this.page.waitForTimeout(1000); // Wait for grid stability
      
      const rows = this.page.locator('.oxd-table-body .oxd-table-row');
      const count = await rows.count();
      
      if (count <= keepCount) {
        break; // Stop if we have few records left on this page
      }
      
      // Click "Select All" in the header
      const selectAllCheckbox = this.page.locator('.oxd-table-header .oxd-checkbox-wrapper').first();
      await selectAllCheckbox.click();
      await this.page.waitForTimeout(500);
      
      // Uncheck the first `keepCount` rows so we don't delete everything
      for (let j = 0; j < keepCount; j++) {
        const rowCheckbox = rows.nth(j).locator('.oxd-checkbox-wrapper').first();
        await rowCheckbox.click();
      }
      
      // Click Delete Selected
      const deleteSelectedBtn = this.page.locator('button.oxd-button--label-danger').filter({ hasText: 'Delete Selected' });
      if (await deleteSelectedBtn.isVisible()) {
        await deleteSelectedBtn.click();
        await this.confirmDeleteButton.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000); // Wait for toast to disappear
      } else {
        break; // No delete button means nothing selected or no permission
      }
    }
  }
}
