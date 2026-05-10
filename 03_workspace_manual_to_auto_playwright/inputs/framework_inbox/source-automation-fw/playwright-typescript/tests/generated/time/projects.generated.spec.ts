/**
 * GENERATED SPEC
 * Module : time
 * State  : State 2 - Projects Administration
 */
import { test, expect } from '@fixtures/time.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';
import { customersLocators } from '@locators/time/customers.locators';

test.describe.serial('Time — Projects Administration', () => {
    // Isolated data for this suite
    const customerName = 'Auto Cust ' + uniqueSuffix('TC_TIM');
    const projectName = 'Auto Proj ' + uniqueSuffix('TC_TIM');
    const projectDesc = 'Description for ' + projectName;

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.open();
        await loginPage.login(users.admin.username, users.admin.password);
        await loginPage.page.waitForURL(/dashboard/);
    });

    test('Pre-condition: Admin tạo Customer', async ({ customersPage, evidence }) => {
        await evidence.runtime();
        await test.step('Navigate to Customers', async () => {
            await customersPage.open();
        });
        await test.step('Add Customer', async () => {
            await customersPage.addButton.click();
            await customersPage.fillCustomerForm(customerName, 'For project testing');
            await customersPage.save();
        });
    });

    test('TC_UT_TIM_12 - Admin tạo Project thành công', async ({ projectsPage, evidence }) => {
        await evidence.runtime();

        await test.step('Navigate to Projects page', async () => {
            await projectsPage.open();
        });

        await test.step('Add new Project', async () => {
            await projectsPage.addButton.click();
            // Enter Customer Name (Autocomplete) and Project Name
            await projectsPage.fillProjectForm(customerName, projectName, projectDesc);
            await projectsPage.save();
            await evidence.screenshot('TC_UT_TIM_12-Saved');
        });

        await test.step('Verify project exists in list', async () => {
            await projectsPage.open();
            const exists = await projectsPage.hasProject(projectName);
            expect(exists).toBeTruthy();
        });
    });

    test('TC_UT_TIM_09 - Tạo Project bị trùng tên trong cùng Customer báo lỗi', async ({ projectsPage, evidence }) => {
        await evidence.runtime();

        await test.step('Navigate to Projects page', async () => {
            await projectsPage.open();
        });

        await test.step('Attempt to add duplicate Project', async () => {
            await projectsPage.addButton.click();
            await projectsPage.fillProjectForm(customerName, projectName, 'Duplicate test');
            await projectsPage.saveButton.click();
        });

        await test.step('Verify error message', async () => {
            // OrangeHRM usually shows validation error on the field
            await expect(projectsPage.errorMessage).toHaveText('Already exists');
            await evidence.screenshot('TC_UT_TIM_09-Error');
            await projectsPage.cancelButton.click();
        });
    });

    test('TC_IT_TIM_03 - Không thể xóa Customer đang có Project gắn liền', async ({ customersPage, evidence }) => {
        await evidence.runtime();

        await test.step('Navigate to Customers page', async () => {
            await customersPage.open();
        });

        await test.step('Attempt to delete Customer', async () => {
            const row = customersPage.by(customersLocators.customerRow).filter({ hasText: customerName });
            await row.locator(customersLocators.deleteButton.selector!).click();
            await customersPage.confirmDeleteButton.click();
            await evidence.screenshot('TC_IT_TIM_03-Delete-Warning');
        });

        await test.step('Verify delete is blocked or warning appears', async () => {
            const genericToast = customersPage.page.locator('.oxd-toast-content');
            await expect(genericToast).toBeVisible({ timeout: 5000 });
            
            const isSuccess = await customersPage.successToast.isVisible();
            const isError = await customersPage.errorToast.isVisible();
            
            if (isSuccess) {
                test.info().annotations.push({ type: 'Bug', description: 'OrangeHRM allows deleting a Customer with Projects (Cascade deletes) instead of blocking it.' });
                expect.soft(isSuccess, 'Expected Error toast but got Success toast (App Bug)').toBe(false);
            } else if (!isError) {
                throw new Error('Expected an error toast saying Customer is in use, but did not appear.');
            }
        });
    });

    test.afterAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        
        const { LoginPage } = await import('@pages/auth/login.page');
        const { ProjectsPage } = await import('@pages/time/projects.page');
        const { CustomersPage } = await import('@pages/time/customers.page');
        
        const loginPage = new LoginPage(page);
        const projectsPage = new ProjectsPage(page);
        const customersPage = new CustomersPage(page);

        try {
            await loginPage.open();
            await loginPage.login(users.admin.username, users.admin.password);
            await loginPage.page.waitForURL(/dashboard/);

            // Delete Project first
            await projectsPage.open();
            if (await projectsPage.hasProject(projectName)) {
                await projectsPage.deleteProject(projectName);
            }

            // Then Delete Customer
            await customersPage.open();
            if (await customersPage.hasCustomer(customerName)) {
                await customersPage.deleteCustomer(customerName);
            }
        } finally {
            await page.close();
            await context.close();
        }
    });
});
