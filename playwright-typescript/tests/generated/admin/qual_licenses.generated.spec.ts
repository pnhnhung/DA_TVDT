/**
 * GENERATED SPEC
 * Module : Admin > Qualifications > Licenses
 * Generated: 2026-05-08
 */
import { test, expect } from '@fixtures/admin.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';

test.describe.serial('Admin > Qualifications > Licenses', () => {
  const baseLicenseName = 'License ' + uniqueSuffix('drv');
  const editedLicenseName = baseLicenseName + ' Updated';

  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.login(users.admin.username, users.admin.password);
    await page.waitForURL(/dashboard/);
  });

  test('TC_UT_QUAL_LIC_03 - Tạo License thiếu Name bị báo lỗi validation', async ({
    qualLicensesPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Licenses', async () => {
      await qualLicensesPage.open();
    });

    await test.step('Click Add và bỏ trống Name rồi Save', async () => {
      await qualLicensesPage.addButton.click();
      await qualLicensesPage.fillForm('');
      await qualLicensesPage.save();
    });

    await test.step('Verify hiển thị lỗi validation', async () => {
      await expect(qualLicensesPage.errorMessage).toBeVisible();
      await evidence.screenshot('01-validation-empty-name');
      await qualLicensesPage.cancel();
    });
  });

  test('TC_UT_QUAL_LIC_01 - Tạo mới License thành công', async ({
    qualLicensesPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Licenses', async () => {
      await qualLicensesPage.open();
    });

    await test.step('Điền form và Save', async () => {
      await qualLicensesPage.addButton.click();
      await qualLicensesPage.fillForm(baseLicenseName);
      await qualLicensesPage.save();
    });

    await test.step('Verify tạo thành công và hiện trong grid', async () => {
      await expect(qualLicensesPage.successToast).toBeVisible();
      await evidence.screenshot('02-create-success');
      expect(await qualLicensesPage.isRecordVisible(baseLicenseName)).toBeTruthy();
    });
  });

  test('TC_UT_QUAL_LIC_02 - Tạo License bị trùng tên báo lỗi Already exists', async ({
    qualLicensesPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Licenses', async () => {
      await qualLicensesPage.open();
    });

    await test.step('Tạo lại License với tên đã tồn tại', async () => {
      await qualLicensesPage.addButton.click();
      await qualLicensesPage.fillForm(baseLicenseName);
      await qualLicensesPage.save();
    });

    await test.step('Verify lỗi Already exists', async () => {
      await expect(qualLicensesPage.errorMessage).toHaveText('Already exists');
      await evidence.screenshot('03-validation-duplicate');
      await qualLicensesPage.cancel();
    });
  });

  test('TC_UT_QUAL_LIC_05 - Cập nhật (Edit) License thành công', async ({
    qualLicensesPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Licenses', async () => {
      await qualLicensesPage.open();
    });

    await test.step('Mở Edit và cập nhật Name', async () => {
      await qualLicensesPage.editRecord(baseLicenseName);
      await qualLicensesPage.fillForm(editedLicenseName);
      await qualLicensesPage.save();
    });

    await test.step('Verify cập nhật thành công', async () => {
      await expect(qualLicensesPage.successToast).toBeVisible();
      await evidence.screenshot('04-edit-success');
      expect(await qualLicensesPage.isRecordVisible(editedLicenseName)).toBeTruthy();
    });
  });

  test('TC_UT_QUAL_LIC_06 - Xóa License thành công', async ({
    qualLicensesPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Licenses', async () => {
      await qualLicensesPage.open();
    });

    await test.step('Xóa record và confirm', async () => {
      await qualLicensesPage.deleteRecord(editedLicenseName);
    });

    await test.step('Verify xóa thành công và record biến mất khỏi grid', async () => {
      await expect(qualLicensesPage.successToast).toBeVisible();
      await evidence.screenshot('05-delete-success');
      expect(await qualLicensesPage.isRecordVisible(editedLicenseName)).toBeFalsy();
    });
  });

  test('TC_IT_QUAL_LIC_01 - Hiển thị và gán License cho nhân viên bên PIM', async ({
    qualLicensesPage,
    pimPage,
    evidence
  }) => {
    test.setTimeout(60000);
    await evidence.runtime();
    const licenseName = 'IT License ' + uniqueSuffix('web');
    const empId = 'E' + Math.random().toString(36).substring(2, 9);

    await test.step('Admin: Tạo mới License', async () => {
      await qualLicensesPage.open();
      await qualLicensesPage.addButton.click();
      await qualLicensesPage.fillForm(licenseName);
      await qualLicensesPage.save();
      await expect(qualLicensesPage.successToast).toBeVisible();
      await expect(qualLicensesPage.successToast).toBeHidden();
    });

    await test.step('PIM: Tạo nhân viên mới', async () => {
      await pimPage.openPIM();
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails('Alice', 'Lic', undefined, empId);
      await pimPage.save();
      await expect(pimPage.successToast).toBeVisible();
      await expect(pimPage.successToast).toBeHidden();
    });

    await test.step('PIM: Gán License cho nhân viên', async () => {
      await pimPage.openQualifications();
      await pimPage.addEmployeeLicense(licenseName);
      await evidence.screenshot('it-lic-assigned');
    });

    await test.step('Teardown: Dọn dẹp data', async () => {
      await pimPage.openPIM();
      await pimPage.deleteEmployeeById(empId);
      await qualLicensesPage.open();
      try {
        await qualLicensesPage.deleteRecord(licenseName);
      } catch (e) {
        // Ignored
      }
    });
  });

  test('TC_IT_QUAL_LIC_02 - Xóa License khi đang sử dụng (SET NULL)', async ({
    qualLicensesPage,
    pimPage,
    evidence,
    page
  }) => {
    test.setTimeout(60000);
    await evidence.runtime();
    const licenseName = 'IT License ' + uniqueSuffix('del');
    const empId = 'E' + Math.random().toString(36).substring(2, 9);

    await test.step('Setup: Tạo License và Nhân viên gắn License', async () => {
      await qualLicensesPage.open();
      await qualLicensesPage.addButton.click();
      await qualLicensesPage.fillForm(licenseName);
      await qualLicensesPage.save();
      await expect(qualLicensesPage.successToast).toBeVisible();
      await expect(qualLicensesPage.successToast).toBeHidden();

      await pimPage.openPIM();
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails('Bob', 'Licman', undefined, empId);
      await pimPage.save();
      await expect(pimPage.successToast).toBeVisible();
      await expect(pimPage.successToast).toBeHidden();

      await pimPage.openQualifications();
      await pimPage.addEmployeeLicense(licenseName);
    });

    await test.step('Admin: Xóa License đang sử dụng', async () => {
      await qualLicensesPage.open();
      await qualLicensesPage.deleteRecord(licenseName);
      await expect(qualLicensesPage.successToast).toBeVisible();
      await expect(qualLicensesPage.successToast).toBeHidden();
    });

    await test.step('PIM: Verify License đã bị xóa khỏi profile nhân viên', async () => {
      await pimPage.openPIM();
      await pimPage.openPersonalDetails(empId);
      await test.step('Verify sync success in PIM Employee details', async () => {
        await pimPage.openQualifications();
        const licRecord = page.locator('.oxd-table-row').filter({ hasText: licenseName });
        await expect(licRecord).toHaveCount(0);
        await evidence.screenshot('it-lic-deleted-cascade');
      });
    });

    await test.step('Teardown: Xóa nhân viên', async () => {
      await pimPage.openPIM();
      await pimPage.deleteEmployeeById(empId);
    });
  });
});
