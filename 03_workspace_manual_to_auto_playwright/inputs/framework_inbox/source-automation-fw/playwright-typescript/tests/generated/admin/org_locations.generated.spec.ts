/**
 * GENERATED SPEC — TC_UT_ORG_LOCATIONS
 * Module : Admin > Organization > Locations
 */
import { test, expect } from '@fixtures/admin.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';

test.describe.serial('Admin > Organization > Locations', () => {
  let locationName: string;

  test.beforeAll(() => {
    locationName = `HQ ${uniqueSuffix('loc')}`;
  });

  test.beforeEach(async ({ loginPage }) => {
    const admin = users.admin;
    await loginPage.open();
    await loginPage.login(admin.username, admin.password);
  });

  test('TC_UT_ORG_03 - Tạo Location thành công', async ({
    orgLocationsPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Locations and Add', async () => {
      await orgLocationsPage.openLocations();
      await orgLocationsPage.startAdd();
      await evidence.screenshot('01-locations-form');
    });

    await test.step('Fill form and Save', async () => {
      await orgLocationsPage.fillForm({
        name: locationName,
        country: 'United States'
      });
      await orgLocationsPage.save();
    });

    await test.step('Verify Success', async () => {
      await expect(orgLocationsPage.successToast).toBeVisible();
      await evidence.screenshot('02-create-success');
      const isFound = await orgLocationsPage.isLocationInList(locationName);
      expect(isFound).toBeTruthy();
    });
  });

  test('TC_UT_ORG_04 - Tạo Location thiếu Country', async ({
    orgLocationsPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Locations and Add', async () => {
      await orgLocationsPage.openLocations();
      await orgLocationsPage.startAdd();
    });

    await test.step('Fill name but omit Country and Save', async () => {
      await orgLocationsPage.fillForm({
        name: `Invalid ${uniqueSuffix('loc')}`
        // Country is omitted intentionally
      });
      await orgLocationsPage.saveButton.click();
    });

    await test.step('Verify Validation Error', async () => {
      await expect(orgLocationsPage.errorMessage.first()).toHaveText('Required');
      await evidence.screenshot('03-required-error');
    });
  });

  test('TC_UT_ORG_05 - Xóa Location thành công', async ({
    orgLocationsPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Locations', async () => {
      await orgLocationsPage.openLocations();
    });

    await test.step('Delete Location', async () => {
      await orgLocationsPage.deleteByName(locationName);
    });

    await test.step('Verify Delete Success', async () => {
      await expect(orgLocationsPage.successToast).toBeVisible();
      await evidence.screenshot('04-delete-success');
      const isFound = await orgLocationsPage.isLocationInList(locationName);
      expect(isFound).toBeFalsy();
    });
  });

  test('TC_UT_ORG_07 - Tạo Location với tên tối đa ký tự', async ({
    orgLocationsPage,
    evidence
  }) => {
    await evidence.runtime();
    const maxLengthName = 'A'.repeat(100);

    await test.step('Thêm Location với 100 ký tự', async () => {
      await orgLocationsPage.openLocations();
      await orgLocationsPage.startAdd();
      await orgLocationsPage.fillForm({
        name: maxLengthName,
        country: 'United States'
      });
      await orgLocationsPage.save();
    });

    await test.step('Verify Success and Cleanup', async () => {
      await expect(orgLocationsPage.successToast).toBeVisible();
      await evidence.screenshot('loc-max-length');
      await orgLocationsPage.openLocations();
      await orgLocationsPage.deleteByName(maxLengthName);
    });
  });
});
