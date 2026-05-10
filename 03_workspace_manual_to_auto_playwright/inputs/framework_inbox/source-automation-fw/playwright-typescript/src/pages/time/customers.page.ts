import { expect } from '@playwright/test';
import { BasePage } from '../base.page';
import { customersLocators } from '../../locators/time/customers.locators';

export class CustomersPage extends BasePage {
    get addButton() { return this.by(customersLocators.addButton); }
    get nameInput() { return this.by(customersLocators.nameInput); }
    get descriptionInput() { return this.by(customersLocators.descriptionInput); }
    get saveButton() { return this.by(customersLocators.saveButton); }
    get cancelButton() { return this.by(customersLocators.cancelButton); }
    
    get successToast() { return this.by(customersLocators.successToast); }
    get errorToast() { return this.by(customersLocators.errorToast); }
    get errorMessage() { return this.by(customersLocators.errorMessage); }
    
    get confirmDeleteButton() { return this.by(customersLocators.confirmDeleteButton); }

    /**
     * Opens the Customers list page.
     */
    async open() {
        await this.page.goto('/web/index.php/time/viewCustomers');
        await expect(this.page).toHaveURL(/viewCustomers/);
        // Wait for grid to load if needed
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Fills the Customer form.
     */
    async fillCustomerForm(name: string, description?: string) {
        await this.clearAndFill(this.nameInput, name);
        if (description !== undefined) {
            await this.clearAndFill(this.descriptionInput, description);
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
     * Checks if a customer exists in the grid, waiting if necessary.
     */
    async hasCustomer(name: string): Promise<boolean> {
        const row = this.by(customersLocators.customerRow).filter({ hasText: name });
        try {
            await row.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Deletes a customer by its exact name from the grid.
     */
    async deleteCustomer(name: string) {
        const row = this.by(customersLocators.customerRow).filter({ hasText: name });
        await row.locator(customersLocators.deleteButton.selector!).click();
        await this.confirmDeleteButton.click();
        await expect(this.successToast).toBeVisible();
    }
}
