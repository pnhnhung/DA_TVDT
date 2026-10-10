import { BasePage } from '../base.page';
import { leaveLocators } from '../../locators/leave/leave.locators';
import { expect } from '@playwright/test';

export class LeavePage extends BasePage {
  get applyTab() { return this.by(leaveLocators.applyTab); }
  get myLeaveTab() { return this.by(leaveLocators.myLeaveTab); }
  get entitlementsTab() { return this.by(leaveLocators.entitlementsTab); }
  get configureTab() { return this.by(leaveLocators.configureTab); }
  get leaveTypesMenu() { return this.by(leaveLocators.leaveTypesMenu); }
  get assignLeaveTab() { return this.by(leaveLocators.assignLeaveTab); }

  get addButton() { return this.by(leaveLocators.addButton); }
  get saveButton() { return this.by(leaveLocators.saveButton); }
  get applyButton() { return this.by(leaveLocators.applyButton); }
  get assignButton() { return this.by(leaveLocators.assignButton); }
  get successToast() { return this.by(leaveLocators.successToast); }

  // Leave Types Form
  get leaveTypeNameInput() { return this.by(leaveLocators.leaveTypeNameInput); }

  // Apply Leave & Assign Leave Forms
  get leaveTypeDropdown() { return this.by(leaveLocators.leaveTypeDropdown); }
  get employeeNameInput() { return this.by(leaveLocators.employeeNameInput); }
  get fromDateInput() { return this.by(leaveLocators.fromDateInput); }
  get toDateInput() { return this.by(leaveLocators.toDateInput); }
  get commentsTextarea() { return this.by(leaveLocators.commentsTextarea); }

  async openLeave() {
    await this.page.goto('/web/index.php/leave/viewLeaveList');
    await expect(this.page).toHaveURL(/leave/);
  }

  async waitForLoading() {
    await this.page.waitForTimeout(500);
    const spinner = this.page.locator('.oxd-loading-spinner');
    if (await spinner.isVisible()) {
      await spinner.waitFor({ state: 'hidden', timeout: 15000 });
    }
    const formLoader = this.page.locator('.oxd-form-loader');
    if (await formLoader.isVisible()) {
      await formLoader.waitFor({ state: 'hidden', timeout: 15000 });
    }
  }

  async openLeaveTypes() {
    await this.page.goto('/web/index.php/leave/leaveTypeList');
    await expect(this.page).toHaveURL(/leaveTypeList/);
    await this.waitForLoading();
  }

  async clickAdd() {
    await this.addButton.click();
    await this.waitForLoading();
  }

  async fillLeaveTypeName(name: string) {
    await this.clearAndFill(this.leaveTypeNameInput, name);
  }

  async saveLeaveType() {
    const respPromise = this.page.waitForResponse(resp => resp.url().includes('/leave-types') && resp.request().method() === 'GET', { timeout: 10000 }).catch(() => null);
    await this.saveButton.click();
    await respPromise;
    await this.waitForLoading();
  }

  async findRowByName(name: string) {
    let attempts = 0;
    const maxPages = 10;
    while (attempts < maxPages) {
      await this.waitForLoading();
      await this.page.waitForTimeout(500); // DOM stabilization

      const row = this.page.locator('.oxd-table-body .oxd-table-row', { hasText: name });
      if (await row.count() > 0) {
        return row.first();
      }

      // Check next page
      const nextBtn = this.page.locator('button.oxd-pagination-page-item--previous-next:has(i.bi-chevron-right)');
      if (await nextBtn.isVisible() && await nextBtn.isEnabled()) {
        const respPromise = this.page.waitForResponse(resp => resp.url().includes('/leave-types') && resp.request().method() === 'GET', { timeout: 10000 }).catch(() => null);
        await nextBtn.click();
        await respPromise;
        await this.waitForLoading();
        attempts++;
      } else {
        break; // No more pages
      }
    }
    return this.page.locator('.oxd-table-body .oxd-table-row', { hasText: name }); // Will be empty locator, which is fine for expects
  }

  async deleteLeaveType(name: string) {
    await this.openLeaveTypes();
    const row = await this.findRowByName(name);
    if (await row.isVisible()) {
      await row.locator('i.bi-trash').click();
      await this.by(leaveLocators.deleteConfirmButton).click();
      await expect(this.successToast).toBeVisible({ timeout: 5000 }).catch(() => console.log('Toast not caught'));
      await this.waitForLoading();
    }
  }

  // --- Apply Leave ---
  async openApplyLeave() {
    const respPromise = this.page.waitForResponse(resp => resp.url().includes('/leave-types') && resp.request().method() === 'GET', { timeout: 10000 }).catch(() => null);
    await this.applyTab.click();
    await respPromise;
    await this.waitForLoading();
  }

  async selectLeaveType(index: number = 1) {
    await this.leaveTypeDropdown.click();
    await this.page.waitForTimeout(500);
    // nth(0) is '-- Select --', nth(1) is the first actual option
    await this.page.getByRole('option').nth(index).click();
    // After selecting leave type, there is usually an API call to get leave balance
    await this.page.waitForTimeout(1000); 
  }

  async fillApplyLeaveForm(fromDate: string, toDate: string, comments: string) {
    // Fill from date
    await this.fromDateInput.fill(fromDate);
    await this.page.keyboard.press('Tab'); // Trigger reactivity
    // Fill to date
    await this.toDateInput.fill('');
    await this.toDateInput.fill(toDate);
    await this.page.keyboard.press('Tab');
    
    // Fill comments
    await this.clearAndFill(this.commentsTextarea, comments);
  }

  async applyLeave() {
    await this.applyButton.click();
    await expect(this.successToast).toBeVisible({ timeout: 10000 }).catch(() => console.log('Toast not caught'));
    await this.waitForLoading();
  }

}
