/**
 * GENERATED SPEC
 * Module : Admin > Job > Permissions
 * Generated: 2026-05-09
 */
import { test, expect } from '@fixtures/admin.fixture';
import { users } from '@data/users';

test.describe('Admin > Job > Permissions', () => {

  test('TC_UT_JOB_PERM_01 - ESS User should not see Admin Job menu and cannot access direct URL', async ({
    page,
    loginPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Login as ESS user', async () => {
      await loginPage.open();
      await loginPage.login(users.ess.username, users.ess.password);
      await page.waitForURL(/dashboard/);
    });

    await test.step('Verify Admin menu is not visible', async () => {
      const adminMenu = page.locator('.oxd-main-menu-item').filter({ hasText: 'Admin' });
      await expect(adminMenu).toBeHidden();
      await evidence.screenshot('ess-no-admin-menu');
    });

    await test.step('Attempt direct access to Job Titles URL', async () => {
      // Direct navigate to Job Titles page
      await page.goto('/web/index.php/admin/viewJobTitleList');
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify access is restricted', async () => {
      // Usually redirects to dashboard or shows an error
      const url = page.url();
      if (url.includes('viewJobTitleList')) {
        // If still on the page, check if elements are missing
        const addButton = page.locator('button:has-text("Add")');
        await expect(addButton).toBeHidden();
      } else {
        // Redirected
        expect(url).not.toContain('viewJobTitleList');
      }
      await evidence.screenshot('ess-access-restricted');
    });
  });
});
