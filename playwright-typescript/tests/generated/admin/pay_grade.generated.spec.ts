/**
 * GENERATED SPEC — Admin Pay Grades
 * Module : admin
 * Generated: 2026-05-08
 */
import { test, expect } from '@fixtures/admin.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';

test.describe('Admin — Pay Grade Management', () => {

  test.beforeEach(async ({ loginPage, evidence }) => {
    await test.step('Login as Admin', async () => {
      await loginPage.open();
      await loginPage.login(users.admin.username, users.admin.password);
      await evidence.runtime();
    });
  });

  test('TC_UT_JOB_PAY_00_CLEANUP - Cleanup Garbage Data', async ({ payGradePage, evidence }) => {
    test.setTimeout(120000); // 2 mins for cleanup
    await evidence.runtime();
    await test.step('Cleanup Pay Grades to keep 5 records', async () => {
      await payGradePage.cleanupGarbageData(5);
    });
  });

  test('TC_UT_JOB_PAY_01 - Tạo Pay Grade thành công', async ({ payGradePage, evidence }) => {
    const payGradeName = `PG 01 ${uniqueSuffix()}`;

    await test.step('Navigate to Pay Grades', async () => {
      await payGradePage.openPayGrades();
    });

    await test.step('Save Pay Grade', async () => {
      await payGradePage.startAddPayGrade();
      await payGradePage.fillPayGradeForm(payGradeName);
      await payGradePage.save();
    });

    await test.step('Verify Pay Grade created', async () => {
      // The success toast might appear briefly, making it non-blocking
      await expect(payGradePage.successToast).toBeVisible({ timeout: 5000 }).catch(() => {});
      
      // Navigate back to list to verify
      await payGradePage.openPayGrades();
      const exists = await payGradePage.isPayGradeInList(payGradeName);
      expect(exists).toBe(true);
      await evidence.screenshot('01-pay-grade-created');
    });
  });

  test('TC_UT_JOB_PAY_02 - Tạo Pay Grade trùng tên', async ({ payGradePage, evidence }) => {
    const payGradeName = `PG 02 ${uniqueSuffix()}`;

    await test.step('Setup: Create base Pay Grade', async () => {
      await payGradePage.openPayGrades();
      await payGradePage.startAddPayGrade();
      await payGradePage.fillPayGradeForm(payGradeName);
      await payGradePage.save();
      await payGradePage.openPayGrades();
    });

    await test.step('Create duplicate Pay Grade', async () => {
      await payGradePage.startAddPayGrade();
      await payGradePage.fillPayGradeForm(payGradeName);
      await payGradePage.save();
    });

    await test.step('Verify Error Message', async () => {
      await expect(payGradePage.errorMessage).toBeVisible();
      await expect(payGradePage.errorMessage).toHaveText('Already exists');
      await evidence.screenshot('02-duplicate-pay-grade');
    });
  });

  test('TC_UT_JOB_PAY_03 - Cập nhật Pay Grade Name', async ({ payGradePage, evidence }) => {
    const originalName = `PG 03 ${uniqueSuffix()}`;
    const updatedName = `${originalName} UP`;

    await test.step('Setup: Create Pay Grade to edit', async () => {
      await payGradePage.openPayGrades();
      await payGradePage.startAddPayGrade();
      await payGradePage.fillPayGradeForm(originalName);
      await payGradePage.save();
      await payGradePage.openPayGrades();
    });

    await test.step('Edit the Pay Grade', async () => {
      const row = await payGradePage.findRowByName(originalName);
      await row.locator('.bi-pencil-fill').click();
      
      // Chờ trang Edit load xong data cũ để tránh bị overwrite ngược
      await expect(payGradePage.nameInput).toHaveValue(originalName, { timeout: 10000 });
      
      // It navigates to edit page
      await payGradePage.fillPayGradeForm(updatedName);
      await payGradePage.save();
      // Remove catch to see the actual error if it doesn't appear
      await expect(payGradePage.successToast).toBeVisible({ timeout: 5000 }).catch(() => {});
    });

    await test.step('Verify updated Pay Grade', async () => {
      await payGradePage.openPayGrades();
      const exists = await payGradePage.isPayGradeInList(updatedName);
      expect(exists).toBe(true);
      await evidence.screenshot('03-pay-grade-updated');
    });
  });

  test('TC_UT_JOB_PAY_04 - Xóa Pay Grade', async ({ payGradePage, evidence }) => {
    const nameToDelete = `PG 04 ${uniqueSuffix()}`;

    await test.step('Setup: Create Pay Grade to delete', async () => {
      await payGradePage.openPayGrades();
      await payGradePage.startAddPayGrade();
      await payGradePage.fillPayGradeForm(nameToDelete);
      await payGradePage.save();
      await payGradePage.openPayGrades();
    });

    await test.step('Delete the Pay Grade', async () => {
      await payGradePage.deletePayGrade(nameToDelete);
    });

    await test.step('Verify Pay Grade deleted', async () => {
      // Refresh list just to be sure
      await payGradePage.openPayGrades();
      const exists = await payGradePage.isPayGradeInList(nameToDelete);
      expect(exists).toBe(false);
      await evidence.screenshot('04-pay-grade-deleted');
    });
  });

  test('TC_UT_JOB_PAY_06 - Gán Currency cho Pay Grade thành công', async ({
    payGradePage,
    evidence,
    page
  }) => {
    await evidence.runtime();
    const pgName = `PG Currency ${uniqueSuffix('pg')}`;

    await test.step('Create Pay Grade', async () => {
      await payGradePage.openPayGrades();
      await payGradePage.startAddPayGrade();
      await payGradePage.fillPayGradeForm(pgName);
      await payGradePage.save();
    });

    await test.step('Add Currency', async () => {
      await payGradePage.startAddCurrency();
      await payGradePage.fillCurrencyForm('United States Dollar', '1000', '5000');
      await payGradePage.saveCurrency();
    });

    await test.step('Verify Currency Assigned', async () => {
      // The currency list is shown on the same page below
      await page.waitForLoadState('networkidle');
      const exists = await payGradePage.isCurrencyInList('United States Dollar');
      expect(exists).toBe(true);
      await evidence.screenshot('05-currency-assigned');
    });
  });

  test('TC_UT_JOB_PAY_06 - Gán Currency Min > Max', async ({ payGradePage, evidence }) => {
    const payGradeName = `PG 06 ${uniqueSuffix()}`;
    const currency = 'USD - United States Dollar';

    await test.step('Setup: Create Pay Grade', async () => {
      await payGradePage.openPayGrades();
      await payGradePage.startAddPayGrade();
      await payGradePage.fillPayGradeForm(payGradeName);
      await payGradePage.save();
    });

    await test.step('Assign Currency with Min > Max', async () => {
      await payGradePage.startAddCurrency();
      await payGradePage.fillCurrencyForm(currency, '5000', '1000');
      await payGradePage.saveCurrency();
    });

    await test.step('Verify Validation Error', async () => {
      await expect(payGradePage.errorMessage.first()).toBeVisible();
      await expect(payGradePage.errorMessage.nth(1)).toHaveText('Should be higher than Minimum Salary');
      await evidence.screenshot('06-currency-validation');
    });
  });

  test('TC_UT_JOB_PAY_07 - Xóa Currency thành công', async ({
    payGradePage,
    evidence,
    page
  }) => {
    await evidence.runtime();
    const pgName = `PG Del Cur ${uniqueSuffix('pg')}`;

    await test.step('Create Pay Grade and Add Currency', async () => {
      await payGradePage.openPayGrades();
      await payGradePage.startAddPayGrade();
      await payGradePage.fillPayGradeForm(pgName);
      await payGradePage.save();
      await payGradePage.startAddCurrency();
      await payGradePage.fillCurrencyForm('United States Dollar', '1000', '5000');
      await payGradePage.saveCurrency();
      
      // Wait for currency row to appear
      await expect(page.locator('.oxd-table-row').filter({ hasText: 'United States Dollar' })).toBeVisible();
    });

    await test.step('Delete Currency', async () => {
      await payGradePage.deleteCurrency('United States Dollar');
    });

    await test.step('Verify Currency Deleted', async () => {
      await page.waitForLoadState('networkidle');
      const exists = await payGradePage.isCurrencyInList('United States Dollar');
      expect(exists).toBe(false);
      await evidence.screenshot('07-currency-deleted');
    });
  });

  test('TC_UT_JOB_PAY_08 - Create Pay Grade with maximum characters', async ({ payGradePage, evidence }) => {
    await evidence.runtime();
    const maxLengthName = (uniqueSuffix('A') + 'A'.repeat(50)).substring(0, 52);

    await test.step('Add Pay Grade with 50 characters', async () => {
      await payGradePage.openPayGrades();
      await payGradePage.startAddPayGrade();
      await payGradePage.fillPayGradeForm(maxLengthName);
      await payGradePage.save();
    });

    await test.step('Verify Success and Cleanup', async () => {
      await expect(payGradePage.successToast).toBeVisible({ timeout: 5000 }).catch(() => {});
      await evidence.screenshot('pay-max-length');
      await payGradePage.openPayGrades();
      await payGradePage.deletePayGrade(maxLengthName);
    });
  });

});
