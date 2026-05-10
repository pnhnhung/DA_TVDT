/**
 * GENERATED SPEC — TC_UT_JOB_EMP
 * Module : Admin > Job > Employment Status
 */
import { test, expect } from '@fixtures/admin.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';

test.describe.serial('Admin > Job > Employment Status', () => {
  let empStatusName: string;

  test.beforeAll(() => {
    empStatusName = `Full-time ${uniqueSuffix('emp')}`;
  });

  test('TC_UT_JOB_EMP_01 - Create Emp Status successfully', async ({
    loginPage,
    employmentStatusPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Login as Admin', async () => {
      const admin = users.admin;
      await loginPage.open();
      await loginPage.login(admin.username, admin.password);
      await evidence.screenshot('01-login-success');
    });

    await test.step('Navigate to Employment Status and Add', async () => {
      await employmentStatusPage.openEmploymentStatus();
      await employmentStatusPage.startAdd();
      await employmentStatusPage.fillName(empStatusName);
      await employmentStatusPage.save();
    });

    await test.step('Verify Success', async () => {
      await expect(employmentStatusPage.successToast).toBeVisible();
      await evidence.screenshot('02-create-success');
      const isFound = await employmentStatusPage.isStatusInList(empStatusName);
      expect(isFound).toBeTruthy();
    });
  });

  test('TC_UT_JOB_EMP_02 - Create Emp Status duplicate name', async ({
    loginPage,
    employmentStatusPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Login as Admin', async () => {
      const admin = users.admin;
      await loginPage.open();
      await loginPage.login(admin.username, admin.password);
    });

    await test.step('Attempt to Add Duplicate', async () => {
      await employmentStatusPage.openEmploymentStatus();
      await employmentStatusPage.startAdd();
      await employmentStatusPage.fillName(empStatusName);
      await employmentStatusPage.saveButton.click();
    });

    await test.step('Verify Error', async () => {
      await expect(employmentStatusPage.errorMessage).toHaveText('Already exists');
      await evidence.screenshot('03-create-duplicate-error');
    });
  });

  test('TC_UT_JOB_EMP_03 - Update Emp Status', async ({
    loginPage,
    employmentStatusPage,
    evidence
  }) => {
    await evidence.runtime();
    const updatedName = `${empStatusName} Edited`;

    await test.step('Login as Admin', async () => {
      const admin = users.admin;
      await loginPage.open();
      await loginPage.login(admin.username, admin.password);
    });

    await test.step('Edit Employment Status', async () => {
      await employmentStatusPage.openEmploymentStatus();
      await employmentStatusPage.editByName(empStatusName, updatedName);
    });

    await test.step('Verify Edit Success', async () => {
      await expect(employmentStatusPage.successToast).toBeVisible();
      await evidence.screenshot('04-edit-success');
      const isFound = await employmentStatusPage.isStatusInList(updatedName);
      expect(isFound).toBeTruthy();
      
      // Update state for next test
      empStatusName = updatedName;
    });
  });

  test('TC_UT_JOB_EMP_04 - Delete Emp Status', async ({
    loginPage,
    employmentStatusPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Login as Admin', async () => {
      const admin = users.admin;
      await loginPage.open();
      await loginPage.login(admin.username, admin.password);
    });

    await test.step('Delete Employment Status', async () => {
      await employmentStatusPage.openEmploymentStatus();
      await employmentStatusPage.deleteByName(empStatusName);
    });

    await test.step('Verify Delete Success', async () => {
      await expect(employmentStatusPage.successToast).toBeVisible();
      await evidence.screenshot('05-delete-success');
      const isFound = await employmentStatusPage.isStatusInList(empStatusName);
      expect(isFound).toBeFalsy();
    });
  });

  test('TC_UT_JOB_EMP_05 - Create Emp Status with maximum characters', async ({
    loginPage,
    employmentStatusPage,
    evidence
  }) => {
    await evidence.runtime();
    
    // Calculate 50 chars exactly
    const prefix = 'Max_'; 
    const suffix = uniqueSuffix(''); // ~21 chars
    const paddingLength = 50 - prefix.length - suffix.length;
    const padding = 'A'.repeat(Math.max(0, paddingLength));
    const maxLengthName = (prefix + padding + suffix).slice(0, 50);

    await test.step('Login as Admin', async () => {
      await loginPage.open();
      await loginPage.login(users.admin.username, users.admin.password);
    });

    await test.step('Add Employment Status with 50 characters', async () => {
      await employmentStatusPage.openEmploymentStatus();
      await employmentStatusPage.startAdd();
      await employmentStatusPage.fillName(maxLengthName);
      await employmentStatusPage.save();
    });

    await test.step('Verify Success and Cleanup', async () => {
      await expect(employmentStatusPage.successToast).toBeVisible();
      await evidence.screenshot('emp-max-length');
      await employmentStatusPage.openEmploymentStatus();
      await employmentStatusPage.deleteByName(maxLengthName);
    });
  });
});
