/**
 * GENERATED SPEC
 * Module : time
 * State  : State 3 - Timesheets Administration
 */
import { test, expect } from '@fixtures/time.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';
import { projectsLocators } from '@locators/time/projects.locators';

test.describe.serial('Time — Timesheets Administration', () => {
    // Isolated data for this suite
    const customerName = 'Auto Cust ' + uniqueSuffix('TC_TIM');
    const projectName = 'Auto Proj ' + uniqueSuffix('TC_TIM');
    const projectDesc = 'Description for ' + projectName;
    const activityName = 'Auto Act ' + uniqueSuffix('TC_TIM');
    const employeeName = 'Admin'; // Admin employee is used for Timesheet tests since they are already linked to the current user

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.open();
        await loginPage.login(users.admin.username, users.admin.password);
        await loginPage.page.waitForURL(/dashboard/);
    });

    test('Pre-condition: Admin tạo Customer, Project và Activity', async ({ customersPage, projectsPage, evidence }) => {
        await evidence.runtime();
        
        // 1. Add Customer
        await test.step('Navigate to Customers and add', async () => {
            await customersPage.open();
            await customersPage.addButton.click();
            await customersPage.fillCustomerForm(customerName, 'For timesheet testing');
            await customersPage.save();
        });

        // 2. Add Project
        await test.step('Navigate to Projects and add', async () => {
            await projectsPage.open();
            await projectsPage.addButton.click();
            await projectsPage.fillProjectForm(customerName, projectName, projectDesc);
            await projectsPage.save();
            await evidence.screenshot('Pre-cond-Project-Saved');
        });

        // 3. Add Activity (inside the project edit form via Modal Dialog)
        await test.step('Add Activity to Project', async () => {
            // Navigate back to Projects list, search and open edit page
            await projectsPage.open();
            await projectsPage.searchProject(projectName);
            
            // Click Edit on the matched row
            const row = projectsPage.by(projectsLocators.projectRow).filter({ hasText: projectName });
            await row.locator(projectsLocators.editButton.selector!).click();
            
            // Wait for Activities section to load
            const activitiesHeader = projectsPage.page.locator('h6:has-text("Activities")');
            await activitiesHeader.waitFor({ state: 'visible', timeout: 10000 });
            await projectsPage.page.waitForLoadState('networkidle');
            
            // Scroll to Activities section before clicking Add
            await activitiesHeader.scrollIntoViewIfNeeded();
            
            // Click Add button scoped to the Activities section header container
            // Confirmed from DOM: button is inside .orangehrm-action-header that contains h6 "Activities"
            const addActivityButton = projectsPage.page
                .locator('.orangehrm-action-header')
                .filter({ has: projectsPage.page.locator('h6:has-text("Activities")') })
                .getByRole('button', { name: 'Add' });
            await addActivityButton.waitFor({ state: 'visible', timeout: 5000 });
            await addActivityButton.click();
            
            // OrangeHRM opens a MODAL DIALOG for Add Project Activity
            // Must scope ALL interactions into the modal to avoid filling the Project Name field above
            const modal = projectsPage.page.locator('.oxd-dialog-container-default');
            await modal.waitFor({ state: 'visible', timeout: 10000 });
            
            // Fill Activity Name inside the modal
            const activityNameInput = modal.getByLabel('Name');
            await activityNameInput.waitFor({ state: 'visible', timeout: 5000 });
            await activityNameInput.fill(activityName);
            
            // Save inside the modal
            const activitySaveBtn = modal.getByRole('button', { name: 'Save' });
            await activitySaveBtn.click();
            
            // Wait for modal to close and success toast
            await modal.waitFor({ state: 'hidden', timeout: 10000 });
            await expect(projectsPage.successToast).toBeVisible({ timeout: 5000 });
            await evidence.screenshot('Pre-cond-Activity-Added');
        });
    });

    test('TC_UT_TIM_20 - Nhân viên có thể xem My Timesheet', async ({ timesheetsPage, evidence }) => {
        await evidence.runtime();

        await test.step('Navigate to My Timesheets', async () => {
            await timesheetsPage.openMyTimesheets();
            await timesheetsPage.page.waitForLoadState('networkidle');
        });

        await test.step('Verify timesheet view', async () => {
            // Verify Edit button is visible or Status is visible
            await expect(timesheetsPage.editButton.or(timesheetsPage.statusText)).toBeVisible();
            await evidence.screenshot('TC_UT_TIM_20-MyTimesheet');
        });
    });

    test('TC_UT_TIM_21 - Chỉnh sửa và Save Timesheet nháp', async ({ timesheetsPage, evidence }) => {
        await evidence.runtime();

        await test.step('Navigate to My Timesheets and click Edit', async () => {
            await timesheetsPage.openMyTimesheets();
            await timesheetsPage.editButton.click();
        });

        await test.step('Add row and fill hours', async () => {
            // Using the helper to add Project, Activity and 8 hours on Monday
            await timesheetsPage.addTimesheetRow(projectName, activityName, ['8']);
        });

        await test.step('Save Draft', async () => {
            await timesheetsPage.saveDraft();
            await evidence.screenshot('TC_UT_TIM_21-SavedDraft');
        });
    });

    test('TC_UT_TIM_22 - Submit Timesheet thành công', async ({ timesheetsPage, evidence }) => {
        await evidence.runtime();

        await test.step('Navigate to My Timesheets and submit', async () => {
            await timesheetsPage.openMyTimesheets();
            // Wait for grid to load the saved row
            await timesheetsPage.page.waitForLoadState('networkidle');
            await timesheetsPage.submitTimesheet();
            await evidence.screenshot('TC_UT_TIM_22-Submitted');
        });

        await test.step('Verify status changes to Submitted', async () => {
            // Sometimes it has a confirmation modal or just toasts
            // And then status changes
            await expect(timesheetsPage.statusText).toContainText('Submitted', { timeout: 10000 });
        });
    });

    test('TC_IT_TIM_04 - Quản lý xem Employee Timesheet', async ({ timesheetsPage, evidence }) => {
        await evidence.runtime();

        await test.step('Navigate to Employee Timesheets', async () => {
            await timesheetsPage.openEmployeeTimesheets();
        });

        await test.step('Search for Employee and View', async () => {
            await timesheetsPage.viewEmployeeTimesheet(employeeName);
            await evidence.screenshot('TC_IT_TIM_04-EmployeeTimesheet');
        });

        await test.step('Verify Submitted status', async () => {
            await expect(timesheetsPage.statusText).toContainText('Submitted', { timeout: 10000 });
        });
    });

    test.afterAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        
        const { LoginPage } = await import('@pages/auth/login.page');
        const { ProjectsPage } = await import('@pages/time/projects.page');
        const { CustomersPage } = await import('@pages/time/customers.page');
        const { TimesheetsPage } = await import('@pages/time/timesheets.page');
        
        const loginPage = new LoginPage(page);
        const projectsPage = new ProjectsPage(page);
        const customersPage = new CustomersPage(page);
        const timesheetsPage = new TimesheetsPage(page);

        try {
            await loginPage.open();
            await loginPage.login(users.admin.username, users.admin.password);
            await loginPage.page.waitForURL(/dashboard/);

            // 1. Delete Timesheet entries (reset)
            await timesheetsPage.openMyTimesheets();
            if (await timesheetsPage.editButton.isVisible()) {
                await timesheetsPage.editButton.click();
            }
            // Reset timesheet
            const resetButton = page.locator('button:has-text("Reset")');
            if (await resetButton.isVisible()) {
                await resetButton.click();
                await expect(timesheetsPage.successToast).toBeVisible();
            }

            // 2. Delete Project
            await projectsPage.open();
            if (await projectsPage.hasProject(projectName)) {
                await projectsPage.deleteProject(projectName);
            }

            // 3. Delete Customer
            await customersPage.open();
            if (await customersPage.hasCustomer(customerName)) {
                await customersPage.deleteCustomer(customerName);
            }
        } catch (e) {
            console.error('Cleanup error:', e);
        } finally {
            await page.close();
            await context.close();
        }
    });
});
