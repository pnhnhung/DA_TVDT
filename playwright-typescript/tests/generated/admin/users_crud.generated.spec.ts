import { test, expect } from '@fixtures/admin.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';

test.describe('Admin > User Management > Users CRUD', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.admin.username, users.admin.password);
    await loginPage.page.waitForURL(/dashboard/);
  });

  test('TC_UT_USR_01 - Tạo User thành công', async ({ userManagementPage, pimPage, evidence }) => {
    await evidence.runtime();
    const empName = 'EMP ' + uniqueSuffix('USR');
    const username = 'usr' + uniqueSuffix('01');
    const password = 'StrongP@ssw0rd!';

    await test.step('Create Dependency Employee', async () => {
      await pimPage.openPIM();
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails(empName, 'Test');
      await pimPage.save();
    });

    await test.step('Navigate to User Management', async () => {
      await userManagementPage.open();
    });

    await test.step('Create User', async () => {
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
    });

    await test.step('Verify Success', async () => {
      await expect(userManagementPage.successToast).toBeVisible({ timeout: 10000 });
      await evidence.screenshot('usr-create-success');
    });
    
    // Cleanup
    await test.step('Cleanup User', async () => {
      await userManagementPage.deleteUser(username);
    });
  });

  test('TC_UT_USR_02 - Tạo User thiếu trường bắt buộc', async ({ userManagementPage, evidence }) => {
    await evidence.runtime();

    await test.step('Navigate and Submit Empty Form', async () => {
      await userManagementPage.open();
      await userManagementPage.startAdd();
      await userManagementPage.save();
    });

    await test.step('Verify Required Errors', async () => {
      await expect(userManagementPage.errorMessage.first()).toBeVisible();
      const errorCount = await userManagementPage.errorMessage.count();
      expect(errorCount).toBeGreaterThanOrEqual(4); // Role, Name, Status, Username...
      await evidence.screenshot('usr-empty-error');
    });
  });

  test('TC_UT_USR_03 - Tạo User trùng Username', async ({ userManagementPage, pimPage, evidence }) => {
    await evidence.runtime();
    
    // Attempting to create a user with the same username as the currently logged in admin
    const duplicateUsername = users.admin.username; // e.g. "Admin"

    await test.step('Navigate to User Management', async () => {
      await userManagementPage.open();
    });

    await test.step('Create User with duplicate username', async () => {
      await userManagementPage.startAdd();
      // We only fill username to trigger inline validation (or save to trigger)
      await userManagementPage.fillForm({ username: duplicateUsername });
      
      // Usually validation happens on blur or typing
      // Click somewhere else to trigger blur
      await userManagementPage.passwordInput.click();
    });

    await test.step('Verify Duplicate Error', async () => {
      await expect(userManagementPage.errorMessage.filter({ hasText: 'Already exists' })).toBeVisible();
      await evidence.screenshot('usr-duplicate-error');
    });
  });

  test('TC_UT_USR_04 - Password không đủ mạnh', async ({ userManagementPage, evidence }) => {
    await evidence.runtime();

    await test.step('Navigate to Add User', async () => {
      await userManagementPage.open();
      await userManagementPage.startAdd();
    });

    await test.step('Enter weak password', async () => {
      await userManagementPage.fillForm({ password: '123' });
      await userManagementPage.confirmPasswordInput.click(); // trigger blur
    });

    await test.step('Verify Weak Password Error', async () => {
      await expect(userManagementPage.errorMessage.filter({ hasText: 'Should have at least 8 characters' })).toBeVisible();
      await evidence.screenshot('usr-weak-pwd-error');
    });
  });

  test('TC_UT_USR_05 - Password confirm không khớp', async ({ userManagementPage, evidence }) => {
    await evidence.runtime();

    await test.step('Navigate to Add User', async () => {
      await userManagementPage.open();
      await userManagementPage.startAdd();
    });

    await test.step('Enter mismatching passwords', async () => {
      await userManagementPage.fillForm({ password: 'StrongP@ssw0rd!', confirmPassword: 'Password@456' });
      await userManagementPage.usernameInput.click(); // trigger blur
    });

    await test.step('Verify Mismatch Error', async () => {
      await expect(userManagementPage.passwordMismatchError).toBeVisible();
      await evidence.screenshot('usr-pwd-mismatch-error');
    });
  });

  test('TC_UT_USR_10 - Tìm kiếm User theo Username và Role', async ({ userManagementPage, pimPage, evidence }) => {
    await evidence.runtime();
    
    // Search for the existing admin user
    const searchTarget = users.admin.username;

    await test.step('Navigate to User Management', async () => {
      await userManagementPage.open();
    });

    await test.step('Search User', async () => {
      await userManagementPage.searchUser(searchTarget, 'Admin');
    });

    await test.step('Verify Search Results', async () => {
      const row = userManagementPage.tableRow.filter({ hasText: searchTarget });
      await expect(row).toBeVisible();
      await evidence.screenshot('usr-search-success');
    });
  });

  test('TC_UT_USR_09 - Xóa User account hợp lệ', async ({ userManagementPage, pimPage, evidence }) => {
    await evidence.runtime();
    const empName = 'EMP ' + uniqueSuffix('DEL');
    const username = 'usr' + uniqueSuffix('09');
    const password = 'StrongP@ssw0rd!';

    await test.step('Create Dependency Employee & User', async () => {
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

    await test.step('Delete User', async () => {
      await userManagementPage.deleteUser(username);
    });

    await test.step('Verify Deletion', async () => {
      await userManagementPage.searchUser(username);
      await expect(userManagementPage.page.getByText('No Records Found').first()).toBeVisible();
      await evidence.screenshot('usr-delete-success');
    });
  });
});
