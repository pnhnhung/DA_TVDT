/**
 * GENERATED SPEC
 * Module: Leave
 * Generated: 2026-05-09
 */
import { test, expect } from '@fixtures/leave.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';

test.describe.serial('Leave — Apply Leave', () => {
  const leaveTypeName = 'Annual ' + uniqueSuffix('QA');
  
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.admin.username, users.admin.password);
    await loginPage.page.waitForURL(/dashboard/);
  });

  test.afterEach(async ({ page, leavePage }) => {
    // Cleanup the created Leave Type
    await leavePage.deleteLeaveType(leaveTypeName);
  });

  test('TC_LEAVE_APPLY_001 - Employee applies for leave', async ({ page, leavePage, evidence }) => {
    await evidence.runtime();
    
    // Setup Data: Create a Leave Type
    await test.step('Setup Data: Create Leave Type', async () => {
      await leavePage.openLeaveTypes();
      await leavePage.clickAdd();
      await leavePage.fillLeaveTypeName(leaveTypeName);
      // Wait for response after save
      const respPromise = page.waitForResponse(resp => resp.url().includes('/leave-types') && resp.request().method() === 'GET', { timeout: 10000 }).catch(() => null);
      await leavePage.saveButton.click();
      await respPromise;
      await leavePage.waitForLoading();
      await expect(leavePage.successToast).toBeVisible({ timeout: 10000 }).catch(() => null);
    });

    await test.step('Navigate to Apply Leave', async () => {
      // Direct navigation to bypass topbar UI flakiness
      await page.goto('/web/index.php/leave/applyLeave');
      await expect(page).toHaveURL(/applyLeave/);
      await leavePage.waitForLoading();
    });

    await test.step('Fill Apply Leave form', async () => {
      // Select Leave Type
      await leavePage.leaveTypeDropdown.click();
      await page.waitForTimeout(500);
      await page.getByRole('option', { name: leaveTypeName }).click();
      await leavePage.waitForLoading();

      // Enter dates
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      const dateStr = nextWeek.toISOString().split('T')[0];
      
      await leavePage.fromDateInput.fill(dateStr);
      await page.keyboard.press('Tab');
      
      await leavePage.toDateInput.fill('');
      await leavePage.toDateInput.fill(dateStr);
      await page.keyboard.press('Tab');

      await leavePage.clearAndFill(leavePage.commentsTextarea, 'Applying for annual leave');
    });

    await test.step('Submit Leave Application', async () => {
      await leavePage.applyButton.click();
      await expect(leavePage.successToast).toBeVisible({ timeout: 10000 });
      await evidence.screenshot('apply-leave-success');
    });
  });
});
