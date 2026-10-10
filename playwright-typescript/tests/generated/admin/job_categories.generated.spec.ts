/**
 * GENERATED SPEC — TC_UT_JOB_CAT
 * Module : Admin > Job > Job Categories
 */
import { test, expect } from '@fixtures/admin.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';

test.describe.serial('Admin > Job > Job Categories', () => {
  let jobCategoryName: string;

  test.beforeAll(() => {
    jobCategoryName = `IT ${uniqueSuffix('cat')}`;
  });

  test('TC_UT_JOB_CAT_01 - Create Job Category successfully', async ({
    loginPage,
    jobCategoriesPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Login as Admin', async () => {
      const admin = users.admin;
      await loginPage.open();
      await loginPage.login(admin.username, admin.password);
      await evidence.screenshot('01-login-success');
    });

    await test.step('Navigate to Job Categories and Add', async () => {
      await jobCategoriesPage.openJobCategories();
      await jobCategoriesPage.startAdd();
      await jobCategoriesPage.fillName(jobCategoryName);
      await jobCategoriesPage.save();
    });

    await test.step('Verify Success', async () => {
      await expect(jobCategoriesPage.successToast).toBeVisible();
      await evidence.screenshot('02-create-success');
      const isFound = await jobCategoriesPage.isCategoryInList(jobCategoryName);
      expect(isFound).toBeTruthy();
    });
  });

  test('TC_UT_JOB_CAT_02 - Create Job Category duplicate name', async ({
    loginPage,
    jobCategoriesPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Login as Admin', async () => {
      const admin = users.admin;
      await loginPage.open();
      await loginPage.login(admin.username, admin.password);
    });

    await test.step('Attempt to Add Duplicate', async () => {
      await jobCategoriesPage.openJobCategories();
      await jobCategoriesPage.startAdd();
      await jobCategoriesPage.fillName(jobCategoryName);
      await jobCategoriesPage.saveButton.click();
    });

    await test.step('Verify Error', async () => {
      await expect(jobCategoriesPage.errorMessage).toHaveText('Already exists');
      await evidence.screenshot('03-create-duplicate-error');
    });
  });

  test('TC_UT_JOB_CAT_03 - Update Job Category', async ({
    loginPage,
    jobCategoriesPage,
    evidence
  }) => {
    await evidence.runtime();
    const updatedName = `${jobCategoryName} Edited`;

    await test.step('Login as Admin', async () => {
      const admin = users.admin;
      await loginPage.open();
      await loginPage.login(admin.username, admin.password);
    });

    await test.step('Edit Job Category', async () => {
      await jobCategoriesPage.openJobCategories();
      await jobCategoriesPage.editByName(jobCategoryName, updatedName);
    });

    await test.step('Verify Edit Success', async () => {
      await expect(jobCategoriesPage.successToast).toBeVisible();
      await evidence.screenshot('04-edit-success');
      const isFound = await jobCategoriesPage.isCategoryInList(updatedName);
      expect(isFound).toBeTruthy();
      
      // Update state for next test
      jobCategoryName = updatedName;
    });
  });

  test('TC_UT_JOB_CAT_04 - Delete Job Category', async ({
    loginPage,
    jobCategoriesPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Login as Admin', async () => {
      const admin = users.admin;
      await loginPage.open();
      await loginPage.login(admin.username, admin.password);
    });

    await test.step('Delete Job Category', async () => {
      await jobCategoriesPage.openJobCategories();
      await jobCategoriesPage.deleteByName(jobCategoryName);
    });

    await test.step('Verify Delete Success', async () => {
      await expect(jobCategoriesPage.successToast).toBeVisible();
      await evidence.screenshot('05-delete-success');
      const isFound = await jobCategoriesPage.isCategoryInList(jobCategoryName);
      expect(isFound).toBeFalsy();
    });
  });

  test('TC_UT_JOB_CAT_06 - Create Job Category with maximum characters', async ({
    loginPage,
    jobCategoriesPage,
    evidence
  }) => {
    await evidence.runtime();
    
    // Calculate 50 chars exactly
    const prefix = 'Max_'; 
    const suffix = uniqueSuffix(''); 
    const paddingLength = 50 - prefix.length - suffix.length;
    const padding = 'A'.repeat(Math.max(0, paddingLength));
    const maxLengthName = (prefix + padding + suffix).slice(0, 50);

    await test.step('Login as Admin', async () => {
      await loginPage.open();
      await loginPage.login(users.admin.username, users.admin.password);
    });

    await test.step('Add Job Category with 50 characters', async () => {
      await jobCategoriesPage.openJobCategories();
      await jobCategoriesPage.startAdd();
      await jobCategoriesPage.fillName(maxLengthName);
      await jobCategoriesPage.save();
    });

    await test.step('Verify Success and Cleanup', async () => {
      await expect(jobCategoriesPage.successToast).toBeVisible();
      await evidence.screenshot('cat-max-length');
      await jobCategoriesPage.openJobCategories();
      await jobCategoriesPage.deleteByName(maxLengthName);
    });
  });
});
