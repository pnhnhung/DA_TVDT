import { BasePage } from '@pages/base.page';
import { pimLocators } from '@locators/pim/pim.locators';
import { expect, type Locator } from '@playwright/test';

export class PIMPage extends BasePage {
  // Locators
  get pimMenu() { return this.by(pimLocators.pimMenu); }
  get topNavEmployeeList() { return this.by(pimLocators.topNavEmployeeList); }
  get topNavAddEmployee() { return this.by(pimLocators.topNavAddEmployee); }
  get firstNameInput() { return this.by(pimLocators.firstNameInput); }
  get middleNameInput() { return this.by(pimLocators.middleNameInput); }
  get lastNameInput() { return this.by(pimLocators.lastNameInput); }
  get employeeIdInput() { return this.by(pimLocators.employeeIdInput); }
  get createLoginDetailsToggle() { return this.by(pimLocators.createLoginDetailsToggle); }
  get saveButton() { return this.by(pimLocators.saveButton); }
  get cancelButton() { return this.by(pimLocators.cancelButton); }
  get successToast() { return this.by(pimLocators.successToast); }
  get errorMessage() { return this.by(pimLocators.errorMessage); }
  get confirmDeleteButton() { return this.by(pimLocators.confirmDeleteButton); }
  get searchNameInput() { return this.by(pimLocators.searchNameInput); }
  get searchIdInput() { return this.by(pimLocators.searchIdInput); }
  get searchButton() { return this.by(pimLocators.searchButton); }
  get resetButton() { return this.by(pimLocators.resetButton); }
  
  // Side Tabs
  get personalDetailsTab() { return this.by(pimLocators.personalDetailsTab); }
  get jobTab() { return this.by(pimLocators.jobTab); }
  get salaryTab() { return this.by(pimLocators.salaryTab); }
  get qualificationsTab() { return this.by(pimLocators.qualificationsTab); }
  get membershipsTab() { return this.by(pimLocators.membershipsTab); }

  // Personal Details
  get nationalitySelect() { return this.by(pimLocators.nationalitySelect); }
  get listbox() { return this.by(pimLocators.listbox); }
  get personalDetailsSaveButton() { return this.by(pimLocators.personalDetailsSaveButton); }

  // Qualifications buttons
  get addEducationBtn() { return this.by(pimLocators.addEducationBtn); }
  get addSkillBtn() { return this.by(pimLocators.addSkillBtn); }
  get addLanguageBtn() { return this.by(pimLocators.addLanguageBtn); }
  get addLicenseBtn() { return this.by(pimLocators.addLicenseBtn); }
  get qualSaveButton() { return this.by(pimLocators.qualSaveButton); }
  
  // Qualification Selects
  get educationLevelSelect() { return this.by(pimLocators.educationLevelSelect); }
  get skillSelect() { return this.by(pimLocators.skillSelect); }
  get languageSelect() { return this.by(pimLocators.languageSelect); }
  get fluencySelect() { return this.by(pimLocators.fluencySelect); }
  get competencySelect() { return this.by(pimLocators.competencySelect); }
  get licenseTypeSelect() { return this.by(pimLocators.licenseTypeSelect); }

  // Job & Salary
  get jobTabLink() { return this.by(pimLocators.jobTab); }
  get salaryTabLink() { return this.by(pimLocators.salaryTab); }
  get jobTitleSelect() { return this.by(pimLocators.jobTitleSelect); }
  get employmentStatusSelect() { return this.by(pimLocators.employmentStatusSelect); }
  get jobCategorySelect() { return this.by(pimLocators.jobCategorySelect); }
  get payGradeSelect() { return this.by(pimLocators.payGradeSelect); }
  get locationSelect() { return this.by(pimLocators.locationSelect); }
  get addSalaryBtn() { return this.by(pimLocators.addSalaryBtn); }

  // Memberships
  get addMembershipBtn() { return this.by(pimLocators.addMembershipBtn); }
  get membershipSelect() { return this.by(pimLocators.membershipSelect); }

  // Actions
  async openPIM(): Promise<void> {
    await this.pimMenu.click();
    await this.topNavEmployeeList.waitFor({ state: 'visible' });
    await this.expectUrlContains(/pim/);
    await this.page.waitForLoadState('networkidle');
  }

  async openAddEmployee(): Promise<void> {
    await this.topNavAddEmployee.click();
    await this.expectUrlContains(/addEmployee/);
    await this.firstNameInput.waitFor({ state: 'visible' });
  }

  async openEmployeeList(): Promise<void> {
    await this.topNavEmployeeList.click();
    await this.expectUrlContains(/viewEmployeeList/);
    await this.searchNameInput.waitFor({ state: 'visible' });
  }

  async fillEmployeeDetails(firstName: string, lastName: string, middleName?: string, employeeId?: string): Promise<void> {
    await this.clearAndFill(this.firstNameInput, firstName);
    await this.clearAndFill(this.lastNameInput, lastName);
    
    if (middleName) {
      await this.clearAndFill(this.middleNameInput, middleName);
    }
    
    if (employeeId) {
      // Often Employee ID is pre-filled, so we need to clear it carefully if Vue.js is reactive
      await this.clearAndFill(this.employeeIdInput, employeeId);
    }
  }

  async save(): Promise<void> {
    const savePromise = this.page.waitForResponse(resp => 
      resp.url().includes('/employees') || resp.url().includes('/personal-details')
    ).catch(() => null);
    
    await this.saveButton.click();
    await savePromise;
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async searchEmployeeById(employeeId: string): Promise<void> {
    await this.clearAndFill(this.searchIdInput, employeeId);
    
    const searchPromise = this.page.waitForResponse(resp => 
      resp.url().includes('/employees') && resp.request().method() === 'GET',
      { timeout: 10000 }
    ).catch(() => null);
    
    await this.searchButton.click();
    await searchPromise;
    await this.page.waitForTimeout(500); // Give Vue a moment to render
  }

  async deleteEmployeeById(employeeId: string): Promise<void> {
    await this.openEmployeeList();
    await this.searchEmployeeById(employeeId);
    
    const row = this.page.locator('.oxd-table-row').filter({ hasText: employeeId });
    if (await row.count() === 0) {
      throw new Error(`Employee with ID ${employeeId} not found in the grid to delete.`);
    }
    
    await row.first().locator(pimLocators.deleteIcon.selector!).click();
    await this.confirmDeleteButton.click();
    await expect(this.successToast).toBeVisible();
    await expect(this.successToast).toBeHidden();
  }

  async isEmployeeInList(employeeId: string): Promise<boolean> {
    await this.openEmployeeList();
    await this.searchEmployeeById(employeeId);
    const recordsText = await this.page.locator('.orangehrm-horizontal-padding > span').innerText();
    return !recordsText.includes('No Records Found');
  }

  // --- Personal Details Actions ---
  
  async openPersonalDetails(employeeId: string): Promise<void> {
    await this.openEmployeeList();
    await this.searchEmployeeById(employeeId);
    
    const row = this.page.locator('.oxd-table-row').filter({ hasText: employeeId });
    if (await row.count() === 0) {
      throw new Error(`Employee with ID ${employeeId} not found.`);
    }
    await row.first().locator(pimLocators.editIcon.selector!).click();
    await this.personalDetailsTab.waitFor({ state: 'visible' });
    await this.expectUrlContains(/viewPersonalDetails/);
  }

  async selectNationality(nationalityName: string): Promise<void> {
    await this.nationalitySelect.click();
    await this.listbox.waitFor({ state: 'visible' });
    
    // Type first characters to filter
    await this.page.keyboard.type(nationalityName.substring(0, 3));
    await this.page.waitForTimeout(1000); 
    
    // Find exact option
    const option = this.listbox.getByRole('option', { name: nationalityName, exact: true });
    await this.scrollIntoView(option);
    await option.click();
    await expect(this.listbox).toBeHidden();
  }

  async savePersonalDetails(): Promise<void> {
    const savePromise = this.page.waitForResponse(resp => 
      resp.url().includes('/personal-details')
    ).catch(() => null);
    
    await this.personalDetailsSaveButton.first().click();
    await savePromise;
  }

  // --- Qualifications & Memberships Actions ---

  async openQualifications(): Promise<void> {
    await this.qualificationsTab.click();
    await this.expectUrlContains(/viewQualifications/);
  }

  async openJob(): Promise<void> {
    await this.jobTab.click();
    await this.expectUrlContains(/viewJobDetails/);
  }

  async openSalary(): Promise<void> {
    await this.salaryTab.click();
    await this.expectUrlContains(/viewSalaryList/);
  }

  async openMemberships(): Promise<void> {
    await this.membershipsTab.click();
    await this.expectUrlContains(/viewMemberships/);
  }

  async addEmployeeSkill(skillName: string): Promise<void> {
    await this.addSkillBtn.click();
    await this.skillSelect.click();
    await this.selectFromListbox(skillName);
    await this.qualSaveButton.first().click();
    await this.waitForSuccessToast();
  }

  async addEmployeeEducation(level: string): Promise<void> {
    await this.addEducationBtn.click();
    await this.educationLevelSelect.click();
    await this.selectFromListbox(level);
    await this.qualSaveButton.first().click();
    await this.waitForSuccessToast();
  }

  async addEmployeeLanguage(languageName: string, fluency: string = 'Writing', competency: string = 'Good'): Promise<void> {
    await this.addLanguageBtn.click();
    await this.languageSelect.click();
    await this.selectFromListbox(languageName);
    
    await this.fluencySelect.click();
    await this.selectFromListbox(fluency);
    
    await this.competencySelect.click();
    await this.selectFromListbox(competency);

    await this.qualSaveButton.first().click();
    await this.waitForSuccessToast();
  }

  async addEmployeeLicense(licenseName: string): Promise<void> {
    await this.addLicenseBtn.click();
    await this.licenseTypeSelect.click();
    await this.selectFromListbox(licenseName);
    await this.qualSaveButton.first().click();
    await this.waitForSuccessToast();
  }

  async addEmployeeMembership(membershipName: string): Promise<void> {
    await this.addMembershipBtn.click();
    await this.membershipSelect.click();
    await this.selectFromListbox(membershipName);
    await this.qualSaveButton.first().click();
    await this.waitForSuccessToast();
  }

  async updateJobDetails(details: { jobTitle?: string, employmentStatus?: string, jobCategory?: string, location?: string }): Promise<void> {
    if (details.jobTitle) {
      await this.jobTitleSelect.click();
      await this.selectFromListbox(details.jobTitle);
    }
    if (details.employmentStatus) {
      await this.employmentStatusSelect.click();
      await this.selectFromListbox(details.employmentStatus);
    }
    if (details.jobCategory) {
      await this.jobCategorySelect.click();
      await this.selectFromListbox(details.jobCategory);
    }
    if (details.location) {
      await this.locationSelect.click();
      await this.selectFromListbox(details.location);
    }
    await this.saveButton.first().click();
    await this.waitForSuccessToast();
  }

  async updateSalaryPayGrade(payGradeName: string): Promise<void> {
    await this.addSalaryBtn.click();
    await this.payGradeSelect.click();
    await this.selectFromListbox(payGradeName);
    // Salary components usually require more fields, but for sync test we just check if it appears
    await this.page.locator('div.oxd-input-group:has(label:text-is("Salary Component")) input').fill('Sync Test Component');
    await this.saveButton.first().click();
    await this.waitForSuccessToast();
  }

  private async selectFromListbox(value: string): Promise<void> {
    await this.listbox.waitFor({ state: 'visible' });
    
    const option = this.listbox.locator('.oxd-select-option').filter({ hasText: value }).first();
    
    // Type to jump (supports some OrangeHRM selects)
    await this.page.keyboard.type(value.substring(0, 3));
    await this.page.waitForTimeout(500);

    // If not visible, scroll the listbox
    if (!(await option.isVisible())) {
      await this.listbox.evaluate((el) => {
        el.scrollTop = 0; // Reset to top
      });
      
      // Attempt to scroll until visible or timeout
      let found = false;
      for (let i = 0; i < 10; i++) {
        if (await option.isVisible()) {
          found = true;
          break;
        }
        await this.listbox.evaluate((el) => {
          el.scrollTop += 300;
        });
        await this.page.waitForTimeout(200);
      }
    }

    await option.scrollIntoViewIfNeeded();
    await option.click({ timeout: 15000 });
    await expect(this.listbox).toBeHidden();
  }

  private async waitForSuccessToast(): Promise<void> {
    await expect(this.successToast).toBeVisible({ timeout: 10000 }).catch(() => null);
    await expect(this.successToast).toBeHidden();
  }
}
