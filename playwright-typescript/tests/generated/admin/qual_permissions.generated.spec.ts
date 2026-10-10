/**
 * GENERATED SPEC
 * Module : Admin > Qualifications > Permissions
 * Generated: 2026-05-08
 */
import { test, expect } from '@fixtures/admin.fixture';
import { users } from '@data/users';

test.describe('Admin > Qualifications > Permissions', () => {

  test('TC_UT_QUAL_PERM_01 - ESS user cannot access Qualifications menu', async ({ page, loginPage, evidence }) => {
    await evidence.runtime();
    
    await test.step('Login as ESS user', async () => {
      await loginPage.open();
      await loginPage.login(users.ess.username, users.ess.password);
      await page.waitForURL(/dashboard/);
    });

    await test.step('Verify Qualifications menu is not visible in Admin (Admin menu itself should be hidden)', async () => {
      const adminMenu = page.locator('.oxd-main-menu-item').filter({ hasText: 'Admin' });
      await expect(adminMenu).toHaveCount(0);
      await evidence.screenshot('ess-no-admin-menu');
    });

    await test.step('Try direct navigation to Skills page', async () => {
      await page.goto('/web/index.php/admin/viewSkills');
      
      // OrangeHRM might keep the URL but show an error or blank page.
      // Assert that the Skills page content (header or Add button) is not accessible.
      await expect(page.locator('h6').filter({ hasText: 'Skills' })).toHaveCount(0);
      await expect(page.getByRole('button', { name: 'Add' })).toHaveCount(0);
      
      await evidence.screenshot('ess-direct-access-blocked');
    });
  });
});
