/**
 * GENERATED SPEC
 * Module : PIM > Employee List
 * Generated: 2026-05-08
 */
import { test, expect } from '@fixtures/pim.fixture';
import { users } from '@data/users';

test.describe('PIM > Employee List', () => {

  test.beforeEach(async ({ loginPage, pimPage, page }) => {
    await loginPage.open();
    await loginPage.login(users.admin.username, users.admin.password);
    await page.waitForURL(/dashboard/);
    await pimPage.openPIM();
  });

  test('TC_UT_PIM_LIST_01 - Search Employee by Name', async ({ pimPage, evidence, page }) => {
    await evidence.runtime();
    const empId = 'E' + Math.random().toString(36).substring(2, 9);
    const firstName = 'Searchable';
    
    await test.step('Setup: Create employee to search', async () => {
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails(firstName, 'NameSync', '', empId);
      await pimPage.save();
    });
    
    await test.step('Search by Name', async () => {
      await pimPage.openEmployeeList();
      await pimPage.clearAndFill(pimPage.searchNameInput, firstName);
      await pimPage.searchButton.click();
      await page.waitForLoadState('networkidle');
    });
    
    await test.step('Verify Result', async () => {
      const row = page.locator('.oxd-table-row').filter({ hasText: firstName });
      await expect(row.first()).toBeVisible();
      await evidence.screenshot('search-by-name-success');
    });

    await test.step('Cleanup', async () => {
      await pimPage.deleteEmployeeById(empId);
    });
  });

  test('TC_UT_PIM_LIST_02 - Search Employee by ID', async ({ pimPage, evidence, page }) => {
    await evidence.runtime();
    const empId = 'ID' + Math.random().toString(36).substring(2, 5).toUpperCase();
    
    await test.step('Setup: Create employee', async () => {
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails('SearchBy', 'ID', '', empId);
      await pimPage.save();
    });
    
    await test.step('Search by ID', async () => {
      await pimPage.openEmployeeList();
      await pimPage.searchEmployeeById(empId);
    });
    
    await test.step('Verify Result', async () => {
      const row = page.locator('.oxd-table-row').filter({ hasText: empId });
      await expect(row.first()).toBeVisible();
      await evidence.screenshot('search-by-id-success');
    });

    await test.step('Cleanup', async () => {
      await pimPage.deleteEmployeeById(empId);
    });
  });

  test('TC_UT_PIM_LIST_03 - Reset search filters', async ({ pimPage, evidence }) => {
    await evidence.runtime();
    
    await test.step('Fill search filters', async () => {
      await pimPage.openEmployeeList();
      await pimPage.searchNameInput.fill('NonExistentUser');
      await pimPage.searchIdInput.fill('999999');
    });
    
    await test.step('Click Reset', async () => {
      await pimPage.resetButton.click();
    });
    
    await test.step('Verify fields are cleared', async () => {
      await expect(pimPage.searchNameInput).toHaveValue('');
      await expect(pimPage.searchIdInput).toHaveValue('');
      await evidence.screenshot('reset-search-success');
    });
  });

  test('TC_UT_PIM_LIST_04 - Delete Employee from list', async ({ pimPage, evidence }) => {
    await evidence.runtime();
    const empId = 'D' + Math.random().toString(36).substring(2, 9);
    
    await test.step('Setup: Create employee to delete', async () => {
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails('Delete', 'Me', '', empId);
      await pimPage.save();
    });
    
    await test.step('Delete Employee', async () => {
      await pimPage.deleteEmployeeById(empId);
    });
    
    await test.step('Verify Deletion', async () => {
      const isFound = await pimPage.isEmployeeInList(empId);
      expect(isFound).toBeFalsy();
      await evidence.screenshot('delete-from-list-success');
    });
  });
});
