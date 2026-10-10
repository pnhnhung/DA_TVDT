/**
 * GENERATED SPEC
 * Module : PIM > Add Employee
 * Generated: 2026-05-08
 */
import { test, expect } from '@fixtures/pim.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';

test.describe('PIM > Add Employee', () => {

  test.beforeEach(async ({ loginPage, pimPage, page }) => {
    await loginPage.open();
    await loginPage.login(users.admin.username, users.admin.password);
    await page.waitForURL(/dashboard/);
    await pimPage.openPIM();
  });

  test('TC_UT_PIM_ADD_01 - Add Employee basic successfully', async ({ pimPage, evidence }) => {
    await evidence.runtime();
    const firstName = 'Alice';
    const lastName = 'Wonder';
    const employeeId = 'E' + Math.random().toString(36).substring(2, 9);
    
    await test.step('Start adding', async () => {
      await pimPage.openAddEmployee();
    });
    
    await test.step('Fill form and save', async () => {
      await pimPage.fillEmployeeDetails(firstName, lastName, '', employeeId);
      await pimPage.save();
    });
    
    await test.step('Verify creation', async () => {
      await expect(pimPage.successToast).toBeVisible();
      await evidence.screenshot('create-basic-success');
      expect(await pimPage.isEmployeeInList(employeeId)).toBeTruthy();
    });

    await test.step('Cleanup', async () => {
      await pimPage.deleteEmployeeById(employeeId);
    });
  });

  test('TC_UT_PIM_ADD_02 - Add Employee with Login details', async ({ pimPage, evidence, page }) => {
    await evidence.runtime();
    const firstName = 'Login';
    const lastName = 'User';
    const employeeId = 'E' + Math.random().toString(36).substring(2, 9);
    const username = 'user' + uniqueSuffix('pim');
    
    await test.step('Start adding and enable Login Details', async () => {
      await pimPage.openAddEmployee();
      await pimPage.createLoginDetailsToggle.click();
    });
    
    await test.step('Fill login details', async () => {
      await pimPage.fillEmployeeDetails(firstName, lastName, '', employeeId);
      await page.locator('div.oxd-input-group:has(label:text-is("Username")) input').fill(username);
      await page.locator('div.oxd-input-group:has(label:text-is("Password")) input').first().fill('Admin@1234');
      await page.locator('div.oxd-input-group:has(label:text-is("Confirm Password")) input').fill('Admin@1234');
      await pimPage.save();
    });
    
    await test.step('Verify creation', async () => {
      await expect(pimPage.successToast).toBeVisible();
      await evidence.screenshot('create-with-login-success');
    });

    await test.step('Cleanup', async () => {
      await pimPage.deleteEmployeeById(employeeId);
    });
  });

  test('TC_UT_PIM_ADD_03 - Add Employee duplicate ID error', async ({ pimPage, evidence }) => {
    await evidence.runtime();
    const employeeId = 'E' + Math.random().toString(36).substring(2, 9);
    
    await test.step('Pre-condition: Create existing employee', async () => {
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails('Existing', 'User', '', employeeId);
      await pimPage.save();
      await expect(pimPage.successToast).toBeVisible();
      await expect(pimPage.successToast).toBeHidden();
    });
    
    await test.step('Add another with same ID', async () => {
      await pimPage.openPIM();
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails('Duplicate', 'ID', '', employeeId);
      await pimPage.saveButton.click();
    });
    
    await test.step('Verify Error', async () => {
      await expect(pimPage.errorMessage.filter({ hasText: /exists/i }).first()).toBeVisible();
      await evidence.screenshot('duplicate-id-error');
    });

    await test.step('Cleanup', async () => {
      await pimPage.deleteEmployeeById(employeeId);
    });
  });
});
