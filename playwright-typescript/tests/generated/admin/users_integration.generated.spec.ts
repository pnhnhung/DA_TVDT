import { test, expect } from '@fixtures/admin.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';

test.describe.serial('Admin > User Management > Integration', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.admin.username, users.admin.password);
    await loginPage.page.waitForURL(/dashboard/);
  });

  test('TC_IT_USR_03 - Chặn Admin tự xóa tài khoản đang đăng nhập', async ({ userManagementPage, evidence }) => {
    await evidence.runtime();
    
    const currentUser = users.admin.username;

    await test.step('Navigate to User Management', async () => {
      await userManagementPage.open();
    });

    await test.step('Attempt to Delete Current User', async () => {
      await userManagementPage.searchUser(currentUser);
      // Ensure we match the exact username in the second cell
      const row = userManagementPage.tableRow.filter({
        has: userManagementPage.page.locator('.oxd-table-cell').nth(1).filter({ hasText: new RegExp(`^${currentUser}$`) })
      });
      
      // The logged-in user might have a delete icon, but clicking it will block deletion
      const deleteIcon = row.locator('.bi-trash');
      await deleteIcon.click();
      
      // Handle confirmation dialog if it appears
      if (await userManagementPage.confirmDeleteButton.isVisible({ timeout: 2000 }).catch(() => false)) {
        await userManagementPage.confirmDeleteButton.click();
      }
    });

    await test.step('Verify Deletion Blocked', async () => {
      // In OrangeHRM, it usually shows an error or info toast
      const errorToast = userManagementPage.page.locator('.oxd-toast-content--error, .oxd-toast-content--info');
      await expect(errorToast).toBeVisible();
      await evidence.screenshot('usr-self-delete-blocked');
    });
  });

  test('TC_IT_USR_04 - Liên kết User account với Employee Profile', async ({ loginPage, userManagementPage, pimPage, evidence }) => {
    await evidence.runtime();
    const empName = uniqueSuffix('E_LNK');
    const username = 'usr' + uniqueSuffix('link04');
    const password = 'StrongP@ssw0rd!';

    await test.step('Create Employee', async () => {
      await pimPage.openPIM();
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails(empName, 'Test');
      await pimPage.save();
    });

    await test.step('Create User Linked to Employee', async () => {
      await userManagementPage.open();
      await userManagementPage.startAdd();
      await userManagementPage.fillForm({
        userRole: 'ESS',
        employeeName: empName + ' Test',
        status: 'Enabled',
        username: username,
        password: password,
        confirmPassword: password
      });
      await userManagementPage.save();
      await expect(userManagementPage.successToast).toBeVisible({ timeout: 10000 });
    });

    await test.step('Login as Linked User', async () => {
      await loginPage.logout();
      await loginPage.login(username, password);
      await loginPage.page.waitForURL(/dashboard/);
    });

    await test.step('Verify My Info matches Linked Employee', async () => {
      // Go to My Info
      await loginPage.page.getByRole('link', { name: 'My Info' }).click();
      await loginPage.page.waitForURL(/viewPersonalDetails/);
      
      // Verify Employee Name input value contains the linked name
      const firstNameInput = loginPage.page.locator('input[name="firstName"]');
      await expect(firstNameInput).toHaveValue(empName);
      await evidence.screenshot('usr-linked-employee');
    });

    // Cleanup
    await test.step('Cleanup', async () => {
      await loginPage.logout();
      await loginPage.login(users.admin.username, users.admin.password);
      await userManagementPage.open();
      await userManagementPage.deleteUser(username);
    });
  });

  test('TC_IT_USR_05 - Xóa Employee làm mất hiệu lực User account liên kết', async ({ loginPage, userManagementPage, pimPage, evidence }) => {
    await evidence.runtime();
    const empName = uniqueSuffix('E_CAS');
    const username = 'usr' + uniqueSuffix('casc05');
    const password = 'StrongP@ssw0rd!';

    await test.step('Create Setup Data (Employee + User)', async () => {
      await pimPage.openPIM();
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails(empName, 'Test');
      await pimPage.save();

      await userManagementPage.open();
      await userManagementPage.startAdd();
      await userManagementPage.fillForm({
        userRole: 'ESS',
        employeeName: empName + ' Test',
        status: 'Enabled',
        username: username,
        password: password,
        confirmPassword: password
      });
      await userManagementPage.save();
      await expect(userManagementPage.successToast).toBeVisible({ timeout: 10000 });
    });

    await test.step('Delete the Employee from PIM', async () => {
      await pimPage.openPIM();
      await pimPage.clearAndFill(pimPage.searchNameInput, empName);
      await pimPage.searchButton.click();
      await pimPage.page.waitForTimeout(1000); // wait for search
      
      const row = pimPage.page.locator('.oxd-table-row').filter({ hasText: empName });
      await row.locator('.bi-trash').click();
      await pimPage.confirmDeleteButton.click();
      await expect(pimPage.successToast).toBeVisible({ timeout: 10000 });
    });

    await test.step('Verify User Account is Cascade Deleted', async () => {
      await userManagementPage.open();
      await userManagementPage.searchUser(username);
      await expect(userManagementPage.page.getByText('No Records Found').first()).toBeVisible();
      await evidence.screenshot('usr-cascade-deleted');
    });

    await test.step('Try to Login as Cascade Deleted User', async () => {
      await loginPage.logout();
      await loginPage.login(username, password);
      await expect(loginPage.page.getByText('Invalid credentials')).toBeVisible();
      await evidence.screenshot('usr-cascade-login-failed');
    });

    // Re-login as admin so the next tests don't fail starting point
    await test.step('Re-login Admin', async () => {
      await loginPage.login(users.admin.username, users.admin.password);
    });
  });
});
