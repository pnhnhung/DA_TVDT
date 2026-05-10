/**
 * GENERATED SPEC
 * Module : Recruitment > Candidates
 * Generated: 2026-05-09
 */
import { test, expect } from '@fixtures/recruitment.fixture';
import { uniqueSuffix, uniqueEmail } from '@core/test-data';
import { users } from '@data/users';

test.describe('Recruitment > Candidates', () => {

  test.beforeEach(async ({ loginPage, recruitmentPage, page }) => {
    await loginPage.open();
    await loginPage.login(users.admin.username, users.admin.password);
    await page.waitForURL(/dashboard/);
    await recruitmentPage.openRecruitment();
    await recruitmentPage.openCandidates();
  });

  test('TC_REC_CAN_001 - Add new candidate with mandatory fields', async ({ recruitmentPage, evidence, page }) => {
    await evidence.runtime();
    
    // Candidate requires a Vacancy to exist, so we use a general one or let it be empty if not strict
    // OrangeHRM Candidate form allows Vacancy to be selected from dropdown
    
    const firstName = 'John ' + uniqueSuffix('QA');
    const lastName = 'Doe';
    const email = uniqueEmail('cand');
    const fullName = `${firstName}  ${lastName}`; // OrangeHRM list displays middle name as empty space if not provided
    
    await test.step('Open Add Candidate form', async () => {
      await recruitmentPage.clickAdd();
    });
    
    await test.step('Fill mandatory fields and save', async () => {
      await recruitmentPage.fillCandidateDetails(firstName, lastName, email);
      
      // Select first available Vacancy
      await recruitmentPage.vacancyDropdown.click();
      await page.waitForTimeout(500); // Give dropdown time to render
      await page.getByRole('option').nth(1).click(); // nth(0) is usually '-- Select --', so nth(1) is the first actual option
      
      await recruitmentPage.save();
    });
    
    await test.step('Verify creation', async () => {
      // Upon saving, it redirects to the candidate profile
      await expect(page).toHaveURL(/addCandidate/);
      await evidence.screenshot('create-candidate-success');
    });

    await test.step('Cleanup', async () => {
      await recruitmentPage.deleteCandidate(firstName); // findRowByName uses hasText, so firstName should match
    });
  });

  test('TC_REC_CAN_002 - Delete existing candidate', async ({ recruitmentPage, evidence, page }) => {
    await evidence.runtime();
    
    const firstName = 'Jane ' + uniqueSuffix('QA');
    const lastName = 'Smith';
    const email = uniqueEmail('jane');
    
    await test.step('Pre-condition: Create candidate', async () => {
      await recruitmentPage.clickAdd();
      await recruitmentPage.fillCandidateDetails(firstName, lastName, email);
      // Select Vacancy
      await recruitmentPage.vacancyDropdown.click();
      await page.waitForTimeout(500);
      await page.getByRole('option').nth(1).click();
      await recruitmentPage.save();
      await recruitmentPage.openCandidates();
    });
    
    await test.step('Delete candidate', async () => {
      await recruitmentPage.deleteCandidate(firstName);
    });
    
    await test.step('Verify deletion', async () => {
      // Find row should not return a visible row after deletion
      await recruitmentPage.openCandidates(); // Refresh list just to be sure
      const row = await recruitmentPage.findRowByName(firstName);
      await expect(row).toBeHidden();
      await evidence.screenshot('delete-candidate-success');
    });
  });

});
