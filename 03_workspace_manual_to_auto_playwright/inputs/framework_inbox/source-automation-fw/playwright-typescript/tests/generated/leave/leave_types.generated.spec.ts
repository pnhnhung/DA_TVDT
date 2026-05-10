/**
 * GENERATED SPEC
 * Module : Leave > Configure > Leave Types
 * Generated: 2026-05-09
 */
import { test, expect } from '@fixtures/leave.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';

test.describe('Leave > Configure > Leave Types', () => {

  test.beforeEach(async ({ loginPage, leavePage, page }) => {
    await loginPage.open();
    await loginPage.login(users.admin.username, users.admin.password);
    await page.waitForURL(/dashboard/);
    await leavePage.openLeave();
    await leavePage.openLeaveTypes();
  });

  test('TC_LEAVE_TYPE_001 - Create new Leave Type', async ({ leavePage, evidence, page }) => {
    await evidence.runtime();
    
    const leaveTypeName = 'Annual ' + uniqueSuffix('QA');
    
    await test.step('Navigate', async () => {
      await leavePage.openLeaveTypes();
      await leavePage.clickAdd();
      await expect(page).toHaveURL(/defineLeaveType/);
    });
    
    await test.step('Fill mandatory fields and save', async () => {
      await leavePage.fillLeaveTypeName(leaveTypeName);
      await leavePage.saveLeaveType();
    });
    
    await test.step('Verify creation', async () => {
      await expect(page).toHaveURL(/leaveTypeList/);
      const row = await leavePage.findRowByName(leaveTypeName);
      await expect(row).toBeVisible();
      await evidence.screenshot('create-leave-type-success');
    });

    await test.step('Cleanup', async () => {
      await leavePage.deleteLeaveType(leaveTypeName);
    });
  });

  test('TC_LEAVE_TYPE_002 - Delete existing Leave Type', async ({ leavePage, evidence, page }) => {
    await evidence.runtime();
    
    const leaveTypeName = 'Sick ' + uniqueSuffix('QA');
    
    await test.step('Pre-condition: Create Leave Type', async () => {
      await leavePage.clickAdd();
      await leavePage.fillLeaveTypeName(leaveTypeName);
      await leavePage.saveLeaveType();
      await expect(page).toHaveURL(/leaveTypeList/);
    });
    
    await test.step('Delete Leave Type', async () => {
      await leavePage.deleteLeaveType(leaveTypeName);
    });
    
    await test.step('Verify deletion', async () => {
      await leavePage.openLeaveTypes(); // Refresh
      const row = await leavePage.findRowByName(leaveTypeName);
      await expect(row).toBeHidden();
      await evidence.screenshot('delete-leave-type-success');
    });
  });

});
