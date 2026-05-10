/**
 * GENERATED SPEC
 * Module : Recruitment > Vacancies
 * Generated: 2026-05-09
 */
import { test, expect } from '@fixtures/recruitment.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';

test.describe('Recruitment > Vacancies', () => {

  test.beforeEach(async ({ loginPage, recruitmentPage, page }) => {
    await loginPage.open();
    await loginPage.login(users.admin.username, users.admin.password);
    await page.waitForURL(/dashboard/);
    await recruitmentPage.openRecruitment();
    await recruitmentPage.openVacancies();
  });

  test('TC_REC_VAC_001 - Create active job vacancy successfully', async ({ recruitmentPage, evidence, page }) => {
    await evidence.runtime();
    const vacancyName = 'Vacancy ' + uniqueSuffix('QA');
    const hiringManager = 'a'; // Type 'a' and pick first
    
    await test.step('Open Add Vacancy form', async () => {
      await recruitmentPage.clickAdd();
    });
    
    await test.step('Fill mandatory fields and save', async () => {
      await recruitmentPage.fillVacancyDetails(vacancyName, '', hiringManager);
      await recruitmentPage.save();
    });
    
    await test.step('Verify creation', async () => {
      // Upon saving, it redirects to the edit page of the vacancy
      await expect(page).toHaveURL(/addJobVacancy/);
      await evidence.screenshot('create-vacancy-success');
    });

    await test.step('Cleanup', async () => {
      await recruitmentPage.deleteVacancy(vacancyName);
    });
  });

  test('TC_REC_VAC_002 - Edit existing vacancy', async ({ recruitmentPage, evidence, page }) => {
    await evidence.runtime();
    const vacancyName = 'Vacancy ' + uniqueSuffix('Dev');
    
    await test.step('Pre-condition: Create vacancy', async () => {
      await recruitmentPage.clickAdd();
      await recruitmentPage.fillVacancyDetails(vacancyName, '', 'a');
      await recruitmentPage.save();
      await recruitmentPage.openVacancies();
    });
    
    await test.step('Edit vacancy', async () => {
      const row = await recruitmentPage.findRowByName(vacancyName);
      await expect(row).toBeVisible();
      await row.locator('i.bi-pencil-fill').click();
      await page.waitForLoadState('networkidle');
      
      await recruitmentPage.clearAndFill(recruitmentPage.numOfPositionsInput, '5');
      await recruitmentPage.save();
    });
    
    await test.step('Verify edit', async () => {
      await expect(page).toHaveURL(/addJobVacancy/);
      await evidence.screenshot('edit-vacancy-success');
    });

    await test.step('Cleanup', async () => {
      await recruitmentPage.deleteVacancy(vacancyName);
    });
  });

});
