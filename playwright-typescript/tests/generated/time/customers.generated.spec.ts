/**
 * GENERATED SPEC
 * Module : time
 * State  : State 1 - Customers Administration
 */
import { test, expect } from '@fixtures/time.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';

test.describe.serial('Time — Customers Administration', () => {
    // Shared data between tests since TC_UT_TIM_08 depends on TC_UT_TIM_07's data
    const customerName = 'Auto Customer ' + uniqueSuffix('TC_TIM');
    const customerDesc = 'Description for ' + customerName;

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.open();
        await loginPage.login(users.admin.username, users.admin.password);
        await loginPage.page.waitForURL(/dashboard/);
    });

    test('TC_UT_TIM_07 - Admin tạo Customer thành công', async ({ customersPage, evidence }) => {
        await evidence.runtime();

        await test.step('Navigate to Customers page', async () => {
            await customersPage.open();
        });

        await test.step('Add new Customer', async () => {
            await customersPage.addButton.click();
            await customersPage.fillCustomerForm(customerName, customerDesc);
            await customersPage.save();
            await evidence.screenshot('TC_UT_TIM_07-Saved');
        });

        // Ensure we are back on the list and the customer exists
        await test.step('Verify customer exists in list', async () => {
            const exists = await customersPage.hasCustomer(customerName);
            expect(exists).toBeTruthy();
        });
    });

    test('TC_UT_TIM_08 - Tạo Customer bị trùng tên báo lỗi', async ({ customersPage, evidence }) => {
        await evidence.runtime();

        await test.step('Navigate to Customers page', async () => {
            await customersPage.open();
        });

        await test.step('Attempt to add duplicate Customer', async () => {
            await customersPage.addButton.click();
            await customersPage.fillCustomerForm(customerName, 'This should fail');
            await customersPage.saveButton.click();
        });

        await test.step('Verify Already exists error message', async () => {
            await expect(customersPage.errorMessage).toHaveText('Already exists');
            await evidence.screenshot('TC_UT_TIM_08-Error');
            // Cancel to go back
            await customersPage.cancelButton.click();
        });
    });

    test('TC_IT_TIM_03 - Không thể xóa Customer đang có Project gắn liền', async ({ customersPage, evidence }) => {
        await evidence.runtime();
        test.skip(true, 'Skipped in State 1: requires Project creation which is in State 2. Will implement in State 2.');
    });

    test.afterAll(async ({ browser }) => {
        // Create a new context and page for cleanup
        const context = await browser.newContext();
        const page = await context.newPage();
        
        // Import Page Objects
        const { LoginPage } = await import('@pages/auth/login.page');
        const { CustomersPage } = await import('@pages/time/customers.page');
        
        const loginPage = new LoginPage(page);
        const customersPage = new CustomersPage(page);

        try {
            await loginPage.open();
            await loginPage.login(users.admin.username, users.admin.password);
            await loginPage.page.waitForURL(/dashboard/);

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
