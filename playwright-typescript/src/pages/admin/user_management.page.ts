import { expect, type Page, type Locator } from '@playwright/test';
import { BasePage } from '../base.page';
import { userLocators } from '../../locators/admin/user_management.locators';

export class UserManagementPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  get adminMenu() { return this.by(userLocators.adminMenu); }
  get topNavUserManagementMenu() { return this.by(userLocators.topNavUserManagementMenu); }
  get usersMenuItem() { return this.by(userLocators.usersMenuItem); }
  
  get addButton() { return this.by(userLocators.addButton); }
  get searchButton() { return this.by(userLocators.searchButton); }
  get resetButton() { return this.by(userLocators.resetButton); }
  
  get searchUsernameInput() { return this.by(userLocators.searchUsernameInput); }
  get searchUserRoleSelect() { return this.by(userLocators.searchUserRoleSelect); }
  get searchEmployeeNameInput() { return this.by(userLocators.searchEmployeeNameInput); }
  get searchStatusSelect() { return this.by(userLocators.searchStatusSelect); }

  get userRoleSelect() { return this.by(userLocators.userRoleSelect); }
  get employeeNameInput() { return this.by(userLocators.employeeNameInput); }
  get employeeNameOption() { return this.by(userLocators.employeeNameOption); }
  get statusSelect() { return this.by(userLocators.statusSelect); }
  get dropdownOption() { return this.by(userLocators.dropdownOption); }
  
  get usernameInput() { return this.by(userLocators.usernameInput); }
  get passwordInput() { return this.by(userLocators.passwordInput); }
  get confirmPasswordInput() { return this.by(userLocators.confirmPasswordInput); }
  
  get saveButton() { return this.by(userLocators.saveButton); }
  get cancelButton() { return this.by(userLocators.cancelButton); }
  
  get tableRow() { return this.by(userLocators.tableRow); }
  get tableCell() { return this.by(userLocators.tableCell); }
  get confirmDeleteButton() { return this.by(userLocators.confirmDeleteButton); }
  
  get successToast() { return this.by(userLocators.successToast); }
  get errorMessage() { return this.by(userLocators.errorMessage); }
  get passwordMismatchError() { return this.by(userLocators.passwordMismatchError); }

  /**
   * Navigate to Admin > User Management > Users
   */
  async open() {
    await this.adminMenu.click();
    // Sometimes it's already on User Management, but we make sure by clicking Top Nav if needed
    // Actually, Admin menu defaults to User Management > Users.
    // Let's just wait for the URL to be correct
    await this.page.waitForURL(/.*admin\/viewSystemUsers/);
  }

  /**
   * Click Add button
   */
  async startAdd() {
    await this.addButton.click();
    await expect(this.saveButton).toBeVisible();
  }

  /**
   * Select an option from an OrangeHRM standard dropdown
   */
  async selectDropdown(dropdownLocator: Locator, optionText: string) {
    await dropdownLocator.click();
    await expect(this.dropdownOption.first()).toBeVisible();
    await this.page.getByRole('option', { name: optionText, exact: true }).click();
  }

  /**
   * Fill the Autocomplete Employee Name field
   */
  async selectEmployee(name: string) {
    await this.clearAndFill(this.employeeNameInput, name);
    
    // Wait for OrangeHRM to trigger the search API and show the option
    const optionLocator = this.employeeNameOption.filter({ hasText: name }).first();
    
    try {
      await expect(optionLocator).toBeVisible({ timeout: 10000 });
    } catch (e) {
      // If it fails to appear, trigger change by adding a space and removing it
      await this.employeeNameInput.press(' ');
      await this.page.waitForTimeout(500);
      await this.employeeNameInput.press('Backspace');
      await expect(optionLocator).toBeVisible({ timeout: 15000 });
    }
    
    await optionLocator.click();
  }

  /**
   * Fill the Add/Edit User Form
   */
  async fillForm(data: {
    userRole?: string;
    employeeName?: string;
    status?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
  }) {
    if (data.userRole) {
      await this.selectDropdown(this.userRoleSelect, data.userRole);
    }
    if (data.employeeName) {
      await this.selectEmployee(data.employeeName);
    }
    if (data.status) {
      await this.selectDropdown(this.statusSelect, data.status);
    }
    if (data.username !== undefined) {
      await this.clearAndFill(this.usernameInput, data.username);
    }
    if (data.password !== undefined) {
      await this.clearAndFill(this.passwordInput, data.password);
    }
    if (data.confirmPassword !== undefined) {
      await this.clearAndFill(this.confirmPasswordInput, data.confirmPassword);
    }
  }

  /**
   * Click save and wait for success toast or let caller handle errors
   */
  async save() {
    await this.page.waitForTimeout(1000); // Wait for inline validation (like username check, password strength)
    
    // We can also try waiting for network idle or a specific response
    const savePromise = this.page.waitForResponse(resp => 
      resp.url().includes('/users') && resp.request().method() !== 'GET',
      { timeout: 5000 }
    ).catch(() => null);
    
    await this.saveButton.click();
    await savePromise;
  }

  /**
   * Search for a user
   */
  async searchUser(username: string, userRole?: string) {
    await this.resetButton.click();
    // Wait for reset to clear grid or form
    await this.page.waitForTimeout(500); 

    await this.clearAndFill(this.searchUsernameInput, username);
    if (userRole) {
      await this.selectDropdown(this.searchUserRoleSelect, userRole);
    }
    await this.searchButton.click();
    // Wait for table to update (spinner or network)
    await this.page.waitForTimeout(1000);
  }

  /**
   * Delete a user by username
   */
  async deleteUser(username: string) {
    await this.searchUser(username);
    // Locate the row containing this username
    const row = this.tableRow.filter({ has: this.page.getByText(username, { exact: true }) });
    await expect(row).toBeVisible();
    await row.locator('.bi-trash').click();
    await this.confirmDeleteButton.click();
    await expect(this.successToast).toBeVisible();
  }
}
