import { test, expect } from '@fixtures/admin.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';

test.describe('Admin > User Management > Role & Status', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.admin.username, users.admin.password);
    await loginPage.page.waitForURL(/dashboard/);
  });

  test('TC_UT_USR_06 - Disable Account', async ({ userManagementPage, pimPage, evidence }) => {
    await evidence.runtime();
    const empName = uniqueSuffix('E_DIS');
    const username = 'usr' + uniqueSuffix('06');
    const password = 'StrongP@ssw0rd!';

    await test.step('Create Setup User', async () => {
      await pimPage.openPIM();
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails(empName, 'Test');
      await pimPage.save();
      await expect(pimPage.successToast).toBeVisible({ timeout: 10000 });
      await pimPage.page.waitForURL(/\/pim\/viewPersonalDetails/, { timeout: 15000 });

      await userManagementPage.open();
      await userManagementPage.startAdd();
      await userManagementPage.fillForm({
        userRole: 'Admin',
        employeeName: empName + ' Test',
        status: 'Enabled',
        username: username,
        password: password,
        confirmPassword: password
      });
      await userManagementPage.save();
      await expect(userManagementPage.successToast).toBeVisible({ timeout: 10000 });
    });

    await test.step('Disable the User', async () => {
      await userManagementPage.searchUser(username);
      const row = userManagementPage.tableRow.filter({ hasText: username });
      await row.locator('.bi-pencil-fill').click();
      
      // Update status to Disabled
      await userManagementPage.fillForm({ status: 'Disabled' });
      await userManagementPage.save();
      await expect(userManagementPage.successToast).toBeVisible({ timeout: 10000 });
    });

    await test.step('Verify Status in Grid', async () => {
      await userManagementPage.searchUser(username);
      const row = userManagementPage.tableRow.filter({ hasText: username });
      await expect(row.locator('.oxd-table-cell').nth(4)).toHaveText('Disabled');
      await evidence.screenshot('usr-disabled');
    });

    // Cleanup
    await userManagementPage.deleteUser(username);
  });

  test('TC_UT_USR_07 - Đổi Role thành ESS', async ({ userManagementPage, pimPage, evidence }) => {
    await evidence.runtime();
    const empName = uniqueSuffix('E_ESS');
    const username = 'usr' + uniqueSuffix('07');
    const password = 'StrongP@ssw0rd!';

    await test.step('Create Setup User', async () => {
      await pimPage.openPIM();
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails(empName, 'Test');
      await pimPage.save();
      await expect(pimPage.successToast).toBeVisible({ timeout: 10000 });
      await pimPage.page.waitForURL(/\/pim\/viewPersonalDetails/, { timeout: 15000 });

      await userManagementPage.open();
      await userManagementPage.startAdd();
      await userManagementPage.fillForm({
        userRole: 'Admin',
        employeeName: empName + ' Test',
        status: 'Enabled',
        username: username,
        password: password,
        confirmPassword: password
      });
      await userManagementPage.save();
      await expect(userManagementPage.successToast).toBeVisible({ timeout: 10000 });
    });

    await test.step('Change Role to ESS', async () => {
      await userManagementPage.searchUser(username);
      const row = userManagementPage.tableRow.filter({ hasText: username });
      await row.locator('.bi-pencil-fill').click();
      
      // Update role
      await userManagementPage.fillForm({ userRole: 'ESS' });
      await userManagementPage.save();
      await expect(userManagementPage.successToast).toBeVisible({ timeout: 10000 });
    });

    await test.step('Verify Role in Grid', async () => {
      await userManagementPage.searchUser(username);
      const row = userManagementPage.tableRow.filter({ hasText: username });
      await expect(row.locator('.oxd-table-cell').nth(2)).toHaveText('ESS');
      await evidence.screenshot('usr-role-ess');
    });

    // Cleanup
    await userManagementPage.deleteUser(username);
  });

  test('TC_IT_USR_01 - Login sau khi bị Disable', async ({ loginPage, userManagementPage, pimPage, evidence }) => {
    await evidence.runtime();
    const empName = uniqueSuffix('E_LOG');
    const username = 'usr' + uniqueSuffix('login01');
    const password = 'StrongP@ssw0rd!';

    await test.step('Create and Disable User', async () => {
      await pimPage.openPIM();
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails(empName, 'Test');
      await pimPage.save();
      await expect(pimPage.successToast).toBeVisible({ timeout: 10000 });
      await pimPage.page.waitForURL(/\/pim\/viewPersonalDetails/, { timeout: 15000 });

      await userManagementPage.open();
      await userManagementPage.startAdd();
      await userManagementPage.fillForm({
        userRole: 'Admin',
        employeeName: empName + ' Test',
        status: 'Disabled', // Created as Disabled
        username: username,
        password: password,
        confirmPassword: password
      });
      await userManagementPage.save();
      await expect(userManagementPage.successToast).toBeVisible({ timeout: 10000 });
    });

    await test.step('Logout Admin', async () => {
      await loginPage.logout();
    });

    await test.step('Try Login as Disabled User', async () => {
      await loginPage.login(username, password);
    });

    await test.step('Verify Login Rejected', async () => {
      await expect(loginPage.page.getByText('Account disabled')).toBeVisible();
      await evidence.screenshot('usr-login-disabled');
    });

    // Relogin as admin for cleanup
    await test.step('Relogin as admin and Cleanup', async () => {
      await loginPage.login(users.admin.username, users.admin.password);
      await userManagementPage.open();
      await userManagementPage.deleteUser(username);
    });
  });

  test('TC_IT_USR_02 - Session cập nhật sau khi đổi Role (Admin -> ESS)', async ({ loginPage, userManagementPage, pimPage, evidence }) => {
    await evidence.runtime();
    const empName = uniqueSuffix('E_SES');
    const username = 'usr' + uniqueSuffix('login02');
    const password = 'StrongP@ssw0rd!';

    await test.step('Create Admin User', async () => {
      await pimPage.openPIM();
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails(empName, 'Test');
      await pimPage.save();

      await userManagementPage.open();
      await userManagementPage.startAdd();
      await userManagementPage.fillForm({
        userRole: 'Admin',
        employeeName: empName + ' Test',
        status: 'Enabled',
        username: username,
        password: password,
        confirmPassword: password
      });
      await userManagementPage.save();
      await expect(userManagementPage.successToast).toBeVisible({ timeout: 10000 });
    });

    await test.step('Change Role to ESS', async () => {
      await userManagementPage.searchUser(username);
      const row = userManagementPage.tableRow.filter({ hasText: username });
      await row.locator('.bi-pencil-fill').click();
      
      await userManagementPage.fillForm({ userRole: 'ESS' });
      await userManagementPage.save();
      await expect(userManagementPage.successToast).toBeVisible({ timeout: 10000 });
    });

    await test.step('Logout Admin', async () => {
      await loginPage.logout();
    });

    await test.step('Login as new ESS User', async () => {
      await loginPage.login(username, password);
      await loginPage.page.waitForURL(/dashboard/);
    });

    await test.step('Verify Admin Menu Absent', async () => {
      await expect(loginPage.page.getByRole('link', { name: 'Admin' })).toBeHidden();
      await evidence.screenshot('usr-ess-no-admin-menu');
    });

    // Relogin as admin for cleanup
    await test.step('Relogin as admin and Cleanup', async () => {
      await loginPage.logout();
      await loginPage.login(users.admin.username, users.admin.password);
      await userManagementPage.open();
      await userManagementPage.deleteUser(username);
    });
  });
});
