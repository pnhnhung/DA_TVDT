import { expect } from '@playwright/test';
import { BasePage } from '../base.page';
import { projectsLocators } from '../../locators/time/projects.locators';

export class ProjectsPage extends BasePage {
    get addButton() { return this.by(projectsLocators.addButton); }
    get searchProjectNameInput() { return this.by(projectsLocators.searchProjectNameInput); }
    get searchButton() { return this.by(projectsLocators.searchButton); }

    get customerNameInput() { return this.by(projectsLocators.customerNameInput); }
    get projectNameInput() { return this.by(projectsLocators.projectNameInput); }
    get descriptionInput() { return this.by(projectsLocators.descriptionInput); }
    get projectAdminInput() { return this.by(projectsLocators.projectAdminInput); }
    get saveButton() { return this.by(projectsLocators.saveButton); }
    get cancelButton() { return this.by(projectsLocators.cancelButton); }
    
    get successToast() { return this.by(projectsLocators.successToast); }
    get errorMessage() { return this.by(projectsLocators.errorMessage); }
    get confirmDeleteButton() { return this.by(projectsLocators.confirmDeleteButton); }

    /**
     * Opens the Projects list page.
     */
    async open() {
        await this.page.goto('/web/index.php/time/viewProjects');
        await expect(this.page).toHaveURL(/viewProjects/);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Selects an option from an autocomplete dropdown.
     */
    private async selectAutocompleteOption(inputLocator: ReturnType<typeof this.by>, value: string) {
        await this.clearAndFill(inputLocator, value);
        // Wait for dropdown to appear
        const dropdownOption = this.by(projectsLocators.autocompleteDropdownOption).filter({ hasText: value });
        await dropdownOption.first().waitFor({ state: 'visible', timeout: 10000 });
        await dropdownOption.first().click();
    }

    /**
     * Fills the Project form.
     */
    async fillProjectForm(customerName: string, projectName: string, description?: string, projectAdmin?: string) {
        await this.selectAutocompleteOption(this.customerNameInput, customerName);
        await this.clearAndFill(this.projectNameInput, projectName);
        
        if (description) {
            await this.clearAndFill(this.descriptionInput, description);
        }

        if (projectAdmin) {
            await this.selectAutocompleteOption(this.projectAdminInput, projectAdmin);
        }
    }

    /**
     * Clicks Save and waits for success toast.
     */
    async save() {
        await this.saveButton.click();
        await expect(this.successToast).toBeVisible();
    }

    /**
     * Searches for a project in the grid.
     */
    async searchProject(name: string) {
        // Clear first in case there is already text
        await this.clearAndFill(this.searchProjectNameInput, name);
        await this.searchButton.click();
        // Wait for grid to reload
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Checks if a project exists in the grid.
     */
    async hasProject(name: string): Promise<boolean> {
        try {
            await this.searchProject(name);
            await this.page.screenshot({ path: 'test-results/debug_after_search.png' });
            const row = this.by(projectsLocators.projectRow).filter({ hasText: name });
            await row.first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch (e: any) {
            console.log('hasProject error:', e.message);
            await this.page.screenshot({ path: 'test-results/debug_hasProject_catch.png' });
            return false;
        }
    }

    /**
     * Deletes a project by its exact name from the grid.
     */
    async deleteProject(name: string) {
        await this.searchProject(name);
        const row = this.by(projectsLocators.projectRow).filter({ hasText: name });
        await row.first().locator(projectsLocators.deleteButton.selector!).click();
        await this.confirmDeleteButton.click();
        await expect(this.successToast).toBeVisible();
    }
}
