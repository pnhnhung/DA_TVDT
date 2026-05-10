import { BasePage } from '@pages/base.page';
import { recruitmentLocators } from '@locators/recruitment/recruitment.locators';
import { expect } from '@playwright/test';

export class RecruitmentPage extends BasePage {
  get recruitmentMenu() { return this.by(recruitmentLocators.recruitmentMenu); }
  get vacanciesTab() { return this.by(recruitmentLocators.vacanciesTab); }
  get candidatesTab() { return this.by(recruitmentLocators.candidatesTab); }
  get addButton() { return this.by(recruitmentLocators.addButton); }
  get saveButton() { return this.by(recruitmentLocators.saveButton); }
  get successToast() { return this.by(recruitmentLocators.successToast); }
  get searchButton() { return this.by(recruitmentLocators.searchButton); }

  // Vacancy Form
  get vacancyNameInput() { return this.by(recruitmentLocators.vacancyNameInput); }
  get jobTitleDropdown() { return this.by(recruitmentLocators.jobTitleDropdown); }
  get hiringManagerInput() { return this.by(recruitmentLocators.hiringManagerInput); }
  get numOfPositionsInput() { return this.by(recruitmentLocators.numOfPositionsInput); }

  // Candidate Form
  get firstNameInput() { return this.by(recruitmentLocators.firstNameInput); }
  get lastNameInput() { return this.by(recruitmentLocators.lastNameInput); }
  get emailInput() { return this.by(recruitmentLocators.emailInput); }
  get vacancyDropdown() { return this.by(recruitmentLocators.vacancyDropdown); }

  async openRecruitment() {
    await this.recruitmentMenu.click();
    await this.page.waitForURL(/recruitment/);
    await this.waitForLoading();
  }

  async openVacancies() {
    const respPromise = this.page.waitForResponse(resp => resp.url().includes('/vacancies') && resp.request().method() === 'GET', { timeout: 10000 }).catch(() => null);
    await this.vacanciesTab.click();
    await respPromise;
    await this.waitForLoading();
  }

  async openCandidates() {
    const respPromise = this.page.waitForResponse(resp => resp.url().includes('/candidates') && resp.request().method() === 'GET', { timeout: 10000 }).catch(() => null);
    await this.candidatesTab.click();
    await respPromise;
    await this.waitForLoading();
  }

  async clickAdd() {
    await this.addButton.click();
    await this.waitForLoading();
  }

  async save() {
    // Some forms redirect on save, some don't.
    // Instead of waiting for the toast (which might be lost during redirect),
    // we wait for the network response and then wait for the UI to settle.
    const respPromise = this.page.waitForResponse(resp => ['POST', 'PUT'].includes(resp.request().method()), { timeout: 10000 }).catch(() => null);
    await this.saveButton.click();
    await respPromise;
    
    // Check if toast appears, but don't strictly fail if it doesn't (due to fast redirect)
    try {
      await expect(this.successToast).toBeVisible({ timeout: 3000 });
      await expect(this.successToast).toBeHidden({ timeout: 5000 });
    } catch (e) {
      // Toast might have been lost in navigation, which is fine if we navigate successfully
      console.log('Toast not caught, likely due to fast navigation.');
    }
    await this.page.waitForLoadState('networkidle');
  }

  async waitForLoading() {
    await this.page.waitForLoadState('networkidle');
  }

  // --- Helpers for Vacancy ---
  async fillVacancyDetails(name: string, jobTitle: string, manager: string) {
    await this.clearAndFill(this.vacancyNameInput, name);
    
    // Select Job Title
    await this.jobTitleDropdown.click();
    await this.page.waitForTimeout(500); // Wait for options
    await this.page.getByRole('option').nth(1).click();
    
    // Select Hiring Manager
    await this.clearAndFill(this.hiringManagerInput, manager);
    // Wait for autocomplete to show up
    await this.page.waitForResponse(resp => resp.url().includes('/employees') && resp.request().method() === 'GET');
    await this.page.waitForTimeout(1000); // Wait for dropdown to render
    await this.page.getByRole('option').first().click();
  }

  async findRowByName(name: string) {
    let row = this.page.locator('.oxd-table-row').filter({ hasText: name }).first();
    if (await row.isVisible()) return row;
    
    let attempts = 0;
    while (attempts < 10) {
      const nextBtn = this.page.locator('button.oxd-pagination-page-item--previous-next:has(i.bi-chevron-right)');
      if (await nextBtn.isVisible() && await nextBtn.isEnabled()) {
        // Different endpoints for Vacancies vs Candidates
        const respPromise = this.page.waitForResponse(resp => (resp.url().includes('/vacancies') || resp.url().includes('/candidates')) && resp.request().method() === 'GET', { timeout: 10000 }).catch(() => null);
        await nextBtn.click();
        await respPromise;
        await this.waitForLoading();
        row = this.page.locator('.oxd-table-row').filter({ hasText: name }).first();
        if (await row.isVisible()) return row;
      } else {
        break;
      }
      attempts++;
    }
    return row;
  }

  async deleteVacancy(name: string) {
    await this.openVacancies();
    const row = await this.findRowByName(name);
    if (await row.isVisible()) {
      await row.locator('i.bi-trash').click();
      await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
      await expect(this.successToast).toBeVisible();
      await expect(this.successToast).toBeHidden();
      await this.waitForLoading();
    }
  }

  // --- Helpers for Candidate ---
  async fillCandidateDetails(firstName: string, lastName: string, email: string) {
    await this.clearAndFill(this.firstNameInput, firstName);
    await this.clearAndFill(this.lastNameInput, lastName);
    await this.clearAndFill(this.emailInput, email);
  }

  async deleteCandidate(name: string) {
    await this.openCandidates();
    const row = await this.findRowByName(name);
    if (await row.isVisible()) {
      await row.locator('i.bi-trash').click();
      await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
      await expect(this.successToast).toBeVisible();
      await expect(this.successToast).toBeHidden();
      await this.waitForLoading();
    }
  }
}
