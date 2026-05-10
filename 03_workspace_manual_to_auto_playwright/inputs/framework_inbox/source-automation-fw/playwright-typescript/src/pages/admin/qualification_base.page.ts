import { BasePage } from '@pages/base.page';
import { qualificationLocators } from '@locators/admin/qualifications.locators';
import { expect, type Locator, type Page } from '@playwright/test';

export abstract class QualificationBasePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Getters for common locators
  get addButton() { return this.by(qualificationLocators.addButton); }
  get saveButton() { return this.by(qualificationLocators.saveButton); }
  get cancelButton() { return this.by(qualificationLocators.cancelButton); }
  get confirmDeleteButton() { return this.by(qualificationLocators.confirmDeleteButton); }
  get successToast() { return this.by(qualificationLocators.successToast); }
  get errorMessage() { return this.by(qualificationLocators.errorMessage); }
  get descriptionTextarea() { return this.by(qualificationLocators.descriptionTextarea); }

  // Must be implemented by child classes (e.g., Name input for Skills, Level input for Edu)
  abstract get mainInput(): Locator;

  /**
   * Navigate to a specific menu under Admin > Qualifications
   */
  protected async navigateToMenu(menuLocator: any): Promise<void> {
    await this.page.goto('/web/index.php/admin/viewSystemUsers'); // Go to Admin first
    const topNav = this.page.locator('.oxd-topbar-body-nav-tab').filter({ hasText: 'Qualifications' }).first();
    await topNav.click();
    await this.by(menuLocator).click();
    // Wait for the grid to load
    await expect(this.addButton).toBeVisible();
  }

  /**
   * Fill the form for creating or editing a qualification
   */
  async fillForm(name: string, description?: string): Promise<void> {
    await this.clearAndFill(this.mainInput, name);
    if (description !== undefined) {
      await this.clearAndFill(this.descriptionTextarea, description);
    }
  }

  /**
   * Save the form
   */
  async save(): Promise<void> {
    await this.saveButton.click();
  }

  /**
   * Cancel the form
   */
  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  /**
   * Find a row in the grid by its main name/level
   */
  async findRowByName(name: string): Promise<Locator> {
    // Simple approach: look for the row containing the text
    return this.page.locator('.oxd-table-row').filter({ hasText: name }).first();
  }

  /**
   * Edit an existing qualification
   */
  async editRecord(name: string): Promise<void> {
    const row = await this.findRowByName(name);
    // Click the edit button (pencil icon) in that row
    await row.locator('.bi-pencil-fill').click();
    await expect(this.saveButton).toBeVisible();
  }

  /**
   * Delete an existing qualification
   */
  async deleteRecord(name: string): Promise<void> {
    const row = await this.findRowByName(name);
    // Click the delete button (trash icon) in that row
    await row.locator('i[class*="trash"]').click();
    await this.confirmDeleteButton.click();
    await this.waitForHidden(this.confirmDeleteButton);
  }

  /**
   * Verify if a record exists in the grid
   */
  async isRecordVisible(name: string): Promise<boolean> {
    const row = await this.findRowByName(name);
    try {
      await expect(row).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}
