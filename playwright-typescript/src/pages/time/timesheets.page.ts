import { BasePage } from '@pages/base.page';
import { expect } from '@playwright/test';
import { timesheetsLocators } from '@locators/time/timesheets.locators';

export class TimesheetsPage extends BasePage {
    // Buttons
    get editButton() { return this.by(timesheetsLocators.editButton); }
    get saveButton() { return this.by(timesheetsLocators.saveButton); }
    get submitButton() { return this.by(timesheetsLocators.submitButton); }
    get addRowButton() { return this.by(timesheetsLocators.addRowButton); }
    get viewButton() { return this.by(timesheetsLocators.viewButton); }

    // Navigation menus
    get myTimesheetsMenu() { return this.by(timesheetsLocators.myTimesheetsMenu); }
    get employeeTimesheetsMenu() { return this.by(timesheetsLocators.employeeTimesheetsMenu); }

    // Form inputs
    get employeeNameInput() { return this.by(timesheetsLocators.employeeNameInput); }

    // Status elements
    get statusText() { return this.by(timesheetsLocators.statusText); }

    // Toasts
    get successToast() { return this.by(timesheetsLocators.successToast); }
    get errorToast() { return this.by(timesheetsLocators.errorToast); }

    /**
     * Navigates to My Timesheets page.
     */
    async openMyTimesheets() {
        await this.page.goto('/web/index.php/time/viewMyTimesheet');
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navigates to Employee Timesheets page.
     */
    async openEmployeeTimesheets() {
        await this.page.goto('/web/index.php/time/viewEmployeeTimesheet');
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Search and view an employee's timesheet.
     */
    async viewEmployeeTimesheet(employeeName: string) {
        await this.selectAutocompleteOption(this.employeeNameInput, employeeName);
        await this.viewButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Fills a timesheet row with project, activity and hours.
     * Assumes you are already in "Edit" mode.
     */
    async addTimesheetRow(projectName: string, activityName: string, hours: string[]) {
        // Wait for grid to be ready
        await this.page.waitForTimeout(1000); // Small wait for UI rendering

        // Click Add Row if there are no existing rows, or if we want to add another one
        // Wait, if it's the first time, there might be 0 rows. Let's just use the last row.
        const rowCount = await this.page.locator('.orangehrm-timesheet-table-body-row')
            .filter({ has: this.page.locator('input[placeholder="Type for hints..."]') })
            .count();
            
        if (rowCount > 0) {
            // Check if the last row is empty (Project Name is empty)
            const lastRowProjectInput = this.page.locator('.orangehrm-timesheet-table-body-row')
                .filter({ has: this.page.locator('input[placeholder="Type for hints..."]') })
                .last().locator('input[placeholder="Type for hints..."]');
            const val = await lastRowProjectInput.inputValue();
            if (val.trim() !== '') {
                await this.addRowButton.last().click();
            }
        } else {
            await this.addRowButton.last().click();
        }

        const newRow = this.page.locator('.orangehrm-timesheet-table-body-row')
            .filter({ has: this.page.locator('input[placeholder="Type for hints..."]') })
            .last();
        
        // Fill Project Name
        const projectInput = newRow.locator('input[placeholder="Type for hints..."]');
        await projectInput.click();
        await projectInput.fill('');
        await projectInput.type(projectName, { delay: 100 });
        await this.page.waitForTimeout(2000); // Wait for API
        const options = await this.page.locator('.oxd-autocomplete-dropdown .oxd-autocomplete-option').allInnerTexts();
        console.log('Autocomplete options found:', options);
        // Wait for autocomplete dropdown and click option
        const projectOption = this.by(timesheetsLocators.autocompleteDropdownOption).filter({ hasText: projectName });
        await projectOption.first().waitFor({ state: 'visible', timeout: 10000 });
        await projectOption.first().click();

        // Select Activity
        const activityDropdown = newRow.locator(timesheetsLocators.activityDropdown.selector!);
        await activityDropdown.click();
        const activityOption = this.by(timesheetsLocators.activityDropdownOption).filter({ hasText: activityName });
        await activityOption.waitFor({ state: 'visible', timeout: 5000 });
        await activityOption.click();

        // Fill Hours
        // There are usually 7 inputs for Monday to Sunday
        const hourInputs = newRow.locator(timesheetsLocators.hoursInput.selector!);
        const count = await hourInputs.count();
        for (let i = 0; i < Math.min(hours.length, count); i++) {
            if (hours[i] && hours[i] !== '0') {
                await this.clearAndFill(hourInputs.nth(i), hours[i]);
            }
        }
    }

    /**
     * Saves the draft timesheet.
     */
    async saveDraft() {
        await this.saveButton.click();
        await expect(this.successToast).toBeVisible();
    }

    /**
     * Submits the timesheet.
     */
    async submitTimesheet() {
        await this.submitButton.click();
        await expect(this.successToast).toBeVisible();
    }

    /**
     * Helper to select an option from autocomplete fields.
     */
    async selectAutocompleteOption(inputLocator: any, value: string) {
        await inputLocator.click();
        await inputLocator.fill('');
        await inputLocator.type(value, { delay: 50 });
        // Wait for dropdown
        const dropdownOption = this.by(timesheetsLocators.autocompleteDropdownOption).filter({ hasText: value });
        await dropdownOption.first().waitFor({ state: 'visible', timeout: 10000 });
        await dropdownOption.first().click();
    }
}
