/**
 * GENERATED SPEC — STATE_ADMIN_JOB_TITLES
 * Module : Admin > Job > Job Titles
 * Generated: 2026-05-06
 */
import { test, expect } from '@fixtures/admin.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';

test.describe('Admin — Job Title Management', () => {
  
  test.beforeEach(async ({ loginPage, dashboardPage, evidence }) => {
    await test.step('Login as Admin', async () => {
      await loginPage.open();
      await loginPage.login(users.admin.username, users.admin.password);
      await expect(dashboardPage.pageHeader).toBeVisible();
    });
  });

  test('TC_UT_JOB_TITLE_01 - Tạo Job Title thành công', async ({ jobTitlePage, evidence }) => {
    const jobTitleName = `Auto Job Title ${uniqueSuffix('tit-01')}`;
    await evidence.runtime();
    await evidence.json('test-data', { jobTitleName });

    await test.step('Open Job Titles page', async () => {
      await jobTitlePage.openJobTitles();
      await evidence.screenshot('job-titles-list');
    });

    await test.step('Fill and save Job Title', async () => {
      await jobTitlePage.startAddJobTitle();
      await jobTitlePage.fillJobTitleForm({ 
        name: jobTitleName, 
        description: 'Automated Job Title Description' 
      });
      await jobTitlePage.save();
      await evidence.screenshot('job-title-submitted');
    });

    await test.step('Verify Job Title created', async () => {
      await expect(jobTitlePage.successToast).toBeVisible();
      const exists = await jobTitlePage.isJobTitleInList(jobTitleName);
      expect(exists).toBe(true);
      await evidence.screenshot('job-title-verified');
    });
  });

  test('TC_UT_JOB_TITLE_02 - Tạo Job Title trùng tên', async ({ jobTitlePage, evidence }) => {
    // Setup: Create a base job title to duplicate
    const baseTitle = `Duplicate Base ${uniqueSuffix('tit-02')}`;
    
    await test.step('Setup: Create base Job Title', async () => {
      await jobTitlePage.openJobTitles();
      await jobTitlePage.startAddJobTitle();
      await jobTitlePage.fillJobTitleForm({ name: baseTitle });
      await jobTitlePage.save();
      await expect(jobTitlePage.successToast).toBeVisible();
    });

    await test.step('Try to create Job Title with same name', async () => {
      await jobTitlePage.startAddJobTitle();
      await jobTitlePage.fillJobTitleForm({ name: baseTitle });
      await jobTitlePage.save();
    });

    await test.step('Verify error message appears', async () => {
      await expect(jobTitlePage.errorMessage).toHaveText('Already exists');
      await evidence.screenshot('duplicate-error');
    });
  });

  test('TC_UT_JOB_TITLE_03 - Tạo Job Title trống Name', async ({ jobTitlePage, evidence }) => {
    await test.step('Open Job Titles page', async () => {
      await jobTitlePage.openJobTitles();
    });

    await test.step('Save empty form', async () => {
      await jobTitlePage.startAddJobTitle();
      await jobTitlePage.save();
    });

    await test.step('Verify validation error', async () => {
      await expect(jobTitlePage.errorMessage).toHaveText('Required');
      await evidence.screenshot('required-error');
    });
  });

  test('TC_UT_JOB_TITLE_05 - Edit Job Title', async ({ jobTitlePage, evidence }) => {
    const originalName = `Edit Me ${uniqueSuffix('tit-05')}`;
    const updatedName = `Updated ${uniqueSuffix('tit-05')}`;

    await test.step('Setup: Create Job Title to edit', async () => {
      await jobTitlePage.openJobTitles();
      await jobTitlePage.startAddJobTitle();
      await jobTitlePage.fillJobTitleForm({ name: originalName });
      await jobTitlePage.save();
      await expect(jobTitlePage.successToast).toBeVisible();
    });

    await test.step('Edit the Job Title', async () => {
      await jobTitlePage.editJobTitle(originalName, updatedName);
      await expect(jobTitlePage.successToast).toBeVisible();
    });

    await test.step('Verify Job Title updated in list', async () => {
      const exists = await jobTitlePage.isJobTitleInList(updatedName);
      expect(exists).toBe(true);
      await evidence.screenshot('job-title-edited');
    });
  });

  test('TC_UT_JOB_TITLE_06 - Delete Job Title', async ({ jobTitlePage, evidence }) => {
    const nameToDelete = `Delete Me ${uniqueSuffix('tit-06')}`;

    await test.step('Setup: Create Job Title to delete', async () => {
      await jobTitlePage.openJobTitles();
      await jobTitlePage.startAddJobTitle();
      await jobTitlePage.fillJobTitleForm({ name: nameToDelete });
      await jobTitlePage.save();
      await expect(jobTitlePage.successToast).toBeVisible();
    });

    await test.step('Delete the Job Title', async () => {
      await jobTitlePage.deleteJobTitle(nameToDelete);
      await expect(jobTitlePage.successToast).toBeVisible();
    });

    await test.step('Verify Job Title absent from list', async () => {
      const exists = await jobTitlePage.isJobTitleInList(nameToDelete);
      expect(exists).toBe(false);
      await evidence.screenshot('job-title-deleted');
    });
  });

});
