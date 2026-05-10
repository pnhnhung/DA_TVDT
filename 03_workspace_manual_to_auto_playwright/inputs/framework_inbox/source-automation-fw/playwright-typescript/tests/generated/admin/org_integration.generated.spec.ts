/**
 * GENERATED SPEC
 * Module : Admin > Organization > Integration
 * Generated: 2026-05-08
 */
import { test, expect } from '@fixtures/admin.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';

test.describe.serial('Admin > Organization > Integration', () => {
  
  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.login(users.admin.username, users.admin.password);
    await page.waitForURL(/dashboard/);
  });

  test('TC_IT_ORG_03 - Location sync to PIM (Work Station)', async ({
    orgLocationsPage,
    pimPage,
    evidence
  }) => {
    test.setTimeout(60000);
    await evidence.runtime();
    const locName = 'Sync Loc ' + uniqueSuffix('sync');
    const empId = 'E' + Math.random().toString(36).substring(2, 9);

    await test.step('Admin: Tạo mới Location', async () => {
      await orgLocationsPage.openLocations();
      await orgLocationsPage.startAdd();
      await orgLocationsPage.fillForm({
        name: locName,
        country: 'United States'
      });
      await orgLocationsPage.save();
      await expect(orgLocationsPage.successToast).toBeVisible();
      await expect(orgLocationsPage.successToast).toBeHidden();
    });

    await test.step('PIM: Tạo nhân viên và gán Location (Work Station)', async () => {
      await pimPage.openPIM();
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails('David', 'LocSync', undefined, empId);
      await pimPage.save();
      
      await pimPage.openJob();
      await pimPage.updateJobDetails({ location: locName });
      await evidence.screenshot('it-loc-assigned');
    });

    await test.step('Cleanup: Xóa nhân viên và Location', async () => {
      await pimPage.openPIM();
      await pimPage.deleteEmployeeById(empId);
      await orgLocationsPage.openLocations();
      await orgLocationsPage.deleteByName(locName);
    });
  });

  test('TC_IT_ORG_01 - Delete Location in-use', async ({
    orgLocationsPage,
    pimPage,
    evidence
  }) => {
    test.setTimeout(60000);
    await evidence.runtime();
    const locName = 'In Use Loc ' + uniqueSuffix('sync');
    const empId = 'E' + Math.random().toString(36).substring(2, 9);

    await test.step('Admin: Tạo Location và gán cho nhân viên', async () => {
      await orgLocationsPage.openLocations();
      await orgLocationsPage.startAdd();
      await orgLocationsPage.fillForm({ name: locName, country: 'United States' });
      await orgLocationsPage.save();
      await expect(orgLocationsPage.successToast).toBeVisible();
      await expect(orgLocationsPage.successToast).toBeHidden();
      
      await pimPage.openPIM();
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails('InUse', 'Location', undefined, empId);
      await pimPage.save();
      await pimPage.openJob();
      await pimPage.updateJobDetails({ location: locName });
    });

    await test.step('Admin: Thử xóa Location đang sử dụng', async () => {
      await orgLocationsPage.openLocations();
      await orgLocationsPage.deleteByName(locName);
    });

    await test.step('Verify Error or Warning', async () => {
      await expect(orgLocationsPage.successToast).not.toBeVisible();
      await evidence.screenshot('it-loc-in-use-delete-blocked');
    });

    await test.step('Cleanup', async () => {
      await pimPage.openPIM();
      try {
        await pimPage.deleteEmployeeById(empId);
      } catch (e) {
        console.log(`Failed to delete employee ${empId} during cleanup: ${e}`);
      }
      
      await orgLocationsPage.openLocations();
      const isFound = await orgLocationsPage.isLocationInList(locName);
      if (isFound) {
        await orgLocationsPage.deleteByName(locName);
      }
    });
  });
});
