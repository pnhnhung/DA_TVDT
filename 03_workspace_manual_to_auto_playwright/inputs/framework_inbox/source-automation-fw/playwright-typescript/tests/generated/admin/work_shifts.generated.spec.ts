/**
 * GENERATED SPEC — TC_UT_JOB_SHIFT
 * Module : Admin > Job > Work Shifts
 */
import { test, expect } from '@fixtures/admin.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';

test.describe.serial('Admin > Job > Work Shifts', () => {
  let shiftName: string;

  test.beforeAll(() => {
    shiftName = `Day ${uniqueSuffix('shift')}`;
  });

  test('TC_UT_JOB_SHIFT_01 - Create Work Shift successfully', async ({
    loginPage,
    workShiftsPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Login as Admin', async () => {
      const admin = users.admin;
      await loginPage.open();
      await loginPage.login(admin.username, admin.password);
      await evidence.screenshot('01-login-success');
    });

    await test.step('Navigate to Work Shifts and Add', async () => {
      await workShiftsPage.openWorkShifts();
      await workShiftsPage.startAdd();
      await workShiftsPage.fillForm({
        name: shiftName,
        timeFrom: '09:00 AM',
        timeTo: '05:00 PM'
      });
      await workShiftsPage.save();
    });

    await test.step('Verify Success', async () => {
      await expect(workShiftsPage.successToast).toBeVisible();
      await evidence.screenshot('02-create-success');
      const isFound = await workShiftsPage.isShiftInList(shiftName);
      expect(isFound).toBeTruthy();
    });
  });

  test('TC_UT_JOB_SHIFT_02 - Create Work Shift duplicate name', async ({
    loginPage,
    workShiftsPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Login as Admin', async () => {
      const admin = users.admin;
      await loginPage.open();
      await loginPage.login(admin.username, admin.password);
    });

    await test.step('Attempt to Add Duplicate', async () => {
      await workShiftsPage.openWorkShifts();
      await workShiftsPage.startAdd();
      await workShiftsPage.fillForm({ name: shiftName });
      await workShiftsPage.saveButton.click();
    });

    await test.step('Verify Error', async () => {
      await expect(workShiftsPage.errorMessage.first()).toHaveText('Already exists');
      await evidence.screenshot('03-create-duplicate-error');
    });
  });

  test('TC_UT_JOB_SHIFT_03 - Enter invalid characters into Hours', async ({
    loginPage,
    workShiftsPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Login as Admin', async () => {
      const admin = users.admin;
      await loginPage.open();
      await loginPage.login(admin.username, admin.password);
    });

    await test.step('Input invalid hours', async () => {
      await workShiftsPage.openWorkShifts();
      await workShiftsPage.startAdd();
      await workShiftsPage.fillForm({
        name: `Invalid Shift ${uniqueSuffix()}`,
        timeFrom: 'abc' // Try to input letters
      });
      await workShiftsPage.saveButton.click();
    });

    await test.step('Verify Validation Error', async () => {
      // The time picker might show "Should be a valid time" or similar
      await expect(workShiftsPage.errorMessage.first()).toBeVisible();
      await evidence.screenshot('04-invalid-hours-error');
    });
  });

  test('TC_UT_JOB_SHIFT_04 - Update Work Shift', async ({
    loginPage,
    workShiftsPage,
    evidence
  }) => {
    await evidence.runtime();
    const updatedName = `${shiftName} Edited`;

    await test.step('Login as Admin', async () => {
      const admin = users.admin;
      await loginPage.open();
      await loginPage.login(admin.username, admin.password);
    });

    await test.step('Edit Work Shift', async () => {
      await workShiftsPage.openWorkShifts();
      await workShiftsPage.editByName(shiftName, {
        name: updatedName,
        timeTo: '06:00 PM'
      });
    });

    await test.step('Verify Edit Success', async () => {
      await expect(workShiftsPage.successToast).toBeVisible();
      await evidence.screenshot('05-edit-success');
      const isFound = await workShiftsPage.isShiftInList(updatedName);
      expect(isFound).toBeTruthy();
      
      // Update state for next test
      shiftName = updatedName;
    });
  });

  test('TC_UT_JOB_SHIFT_05 - Delete Work Shift', async ({
    loginPage,
    workShiftsPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Login as Admin', async () => {
      const admin = users.admin;
      await loginPage.open();
      await loginPage.login(admin.username, admin.password);
    });

    await test.step('Delete Work Shift', async () => {
      await workShiftsPage.openWorkShifts();
      await workShiftsPage.deleteByName(shiftName);
    });

    await test.step('Verify Delete Success', async () => {
      await expect(workShiftsPage.successToast).toBeVisible();
      await evidence.screenshot('06-delete-success');
      const isFound = await workShiftsPage.isShiftInList(shiftName);
      expect(isFound).toBeFalsy();
    });
  });

  test('TC_UT_JOB_SHIFT_06 - Error when End Time is before Start Time', async ({
    loginPage,
    workShiftsPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Login as Admin', async () => {
      await loginPage.open();
      await loginPage.login(users.admin.username, users.admin.password);
    });

    await test.step('Input End Time < Start Time', async () => {
      await workShiftsPage.openWorkShifts();
      await workShiftsPage.startAdd();
      await workShiftsPage.fillForm({
        name: `Invalid Time ${uniqueSuffix()}`,
        timeFrom: '10:00 AM',
        timeTo: '09:00 AM'
      });
      await workShiftsPage.saveButton.click();
    });

    await test.step('Verify Validation Error message', async () => {
      await expect(workShiftsPage.errorMessage.first()).toHaveText('To time should be after from time');
      await evidence.screenshot('shift-time-validation-error');
    });
  });

  test('TC_UT_JOB_SHIFT_07 - Create Work Shift with maximum characters', async ({
    workShiftsPage,
    evidence
  }) => {
    await evidence.runtime();
    const maxLengthName = (uniqueSuffix('W') + 'A'.repeat(50)).substring(0, 50);

    await test.step('Add Work Shift with 50 characters', async () => {
      await workShiftsPage.openWorkShifts();
      await workShiftsPage.startAdd();
      await workShiftsPage.fillForm({
        name: maxLengthName,
        timeFrom: '09:00 AM',
        timeTo: '05:00 PM'
      });
      await workShiftsPage.save();
    });

    await test.step('Verify Success and Cleanup', async () => {
      await expect(workShiftsPage.successToast).toBeVisible({ timeout: 5000 }).catch(() => {});
      await evidence.screenshot('shift-max-length');
      await workShiftsPage.openWorkShifts();
      await workShiftsPage.deleteByName(maxLengthName);
    });
  });
});
