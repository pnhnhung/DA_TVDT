/**
 * GENERATED SPEC
 * Module : Admin > Qualifications > Languages
 * Generated: 2026-05-08
 */
import { test, expect } from '@fixtures/admin.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';

test.describe.serial('Admin > Qualifications > Languages', () => {
  const baseLanguageName = 'Language ' + uniqueSuffix('lan');
  const editedLanguageName = baseLanguageName + ' Updated';

  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.login(users.admin.username, users.admin.password);
    await page.waitForURL(/dashboard/);
  });

  test('TC_UT_QUAL_LAN_03 - Tạo Language thiếu Name bị báo lỗi validation', async ({
    qualLanguagesPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Languages', async () => {
      await qualLanguagesPage.open();
    });

    await test.step('Click Add và bỏ trống Name rồi Save', async () => {
      await qualLanguagesPage.addButton.click();
      await qualLanguagesPage.fillForm('');
      await qualLanguagesPage.save();
    });

    await test.step('Verify hiển thị lỗi validation', async () => {
      await expect(qualLanguagesPage.errorMessage).toBeVisible();
      await evidence.screenshot('01-validation-empty-name');
      await qualLanguagesPage.cancel();
    });
  });

  test('TC_UT_QUAL_LAN_01 - Tạo mới Language thành công', async ({
    qualLanguagesPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Languages', async () => {
      await qualLanguagesPage.open();
    });

    await test.step('Điền form và Save', async () => {
      await qualLanguagesPage.addButton.click();
      await qualLanguagesPage.fillForm(baseLanguageName);
      await qualLanguagesPage.save();
    });

    await test.step('Verify tạo thành công và hiện trong grid', async () => {
      await expect(qualLanguagesPage.successToast).toBeVisible();
      await evidence.screenshot('02-create-success');
      expect(await qualLanguagesPage.isRecordVisible(baseLanguageName)).toBeTruthy();
    });
  });

  test('TC_UT_QUAL_LAN_02 - Tạo Language bị trùng tên báo lỗi Already exists', async ({
    qualLanguagesPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Languages', async () => {
      await qualLanguagesPage.open();
    });

    await test.step('Tạo lại Language với tên đã tồn tại', async () => {
      await qualLanguagesPage.addButton.click();
      await qualLanguagesPage.fillForm(baseLanguageName);
      await qualLanguagesPage.save();
    });

    await test.step('Verify lỗi Already exists', async () => {
      await expect(qualLanguagesPage.errorMessage).toHaveText('Already exists');
      await evidence.screenshot('03-validation-duplicate');
      await qualLanguagesPage.cancel();
    });
  });

  test('TC_UT_QUAL_LAN_05 - Cập nhật (Edit) Language thành công', async ({
    qualLanguagesPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Languages', async () => {
      await qualLanguagesPage.open();
    });

    await test.step('Mở Edit và cập nhật Name', async () => {
      await qualLanguagesPage.editRecord(baseLanguageName);
      await qualLanguagesPage.fillForm(editedLanguageName);
      await qualLanguagesPage.save();
    });

    await test.step('Verify cập nhật thành công', async () => {
      await expect(qualLanguagesPage.successToast).toBeVisible();
      await evidence.screenshot('04-edit-success');
      expect(await qualLanguagesPage.isRecordVisible(editedLanguageName)).toBeTruthy();
    });
  });

  test('TC_UT_QUAL_LAN_06 - Xóa Language thành công', async ({
    qualLanguagesPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Languages', async () => {
      await qualLanguagesPage.open();
    });

    await test.step('Xóa record và confirm', async () => {
      await qualLanguagesPage.deleteRecord(editedLanguageName);
    });

    await test.step('Verify xóa thành công và record biến mất khỏi grid', async () => {
      await expect(qualLanguagesPage.successToast).toBeVisible();
      await evidence.screenshot('05-delete-success');
      expect(await qualLanguagesPage.isRecordVisible(editedLanguageName)).toBeFalsy();
    });
  });

  test('TC_IT_QUAL_LAN_01 - Hiển thị và gán Language cho nhân viên bên PIM', async ({
    qualLanguagesPage,
    pimPage,
    evidence
  }) => {
    test.setTimeout(60000);
    await evidence.runtime();
    const languageName = 'IT Language ' + uniqueSuffix('web');
    const empId = 'E' + Math.random().toString(36).substring(2, 9);

    await test.step('Admin: Tạo mới Language', async () => {
      await qualLanguagesPage.open();
      await qualLanguagesPage.addButton.click();
      await qualLanguagesPage.fillForm(languageName);
      await qualLanguagesPage.save();
      await expect(qualLanguagesPage.successToast).toBeVisible();
      await expect(qualLanguagesPage.successToast).toBeHidden();
    });

    await test.step('PIM: Tạo nhân viên mới', async () => {
      await pimPage.openPIM();
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails('Alice', 'Lan', undefined, empId);
      await pimPage.save();
      await expect(pimPage.successToast).toBeVisible();
      await expect(pimPage.successToast).toBeHidden();
    });

    await test.step('PIM: Gán Language cho nhân viên', async () => {
      await pimPage.openQualifications();
      await pimPage.addEmployeeLanguage(languageName);
      await evidence.screenshot('it-lan-assigned');
    });

    await test.step('Teardown: Dọn dẹp data', async () => {
      await pimPage.openPIM();
      await pimPage.deleteEmployeeById(empId);
      await qualLanguagesPage.open();
      try {
        await qualLanguagesPage.deleteRecord(languageName);
      } catch (e) {
        // Ignored
      }
    });
  });

  test('TC_IT_QUAL_LAN_02 - Xóa Language khi đang sử dụng (SET NULL)', async ({
    qualLanguagesPage,
    pimPage,
    evidence,
    page
  }) => {
    test.setTimeout(60000);
    await evidence.runtime();
    const languageName = 'IT Language ' + uniqueSuffix('del');
    const empId = 'E' + Math.random().toString(36).substring(2, 9);

    await test.step('Setup: Tạo Language và Nhân viên gắn Language', async () => {
      await qualLanguagesPage.open();
      await qualLanguagesPage.addButton.click();
      await qualLanguagesPage.fillForm(languageName);
      await qualLanguagesPage.save();
      await expect(qualLanguagesPage.successToast).toBeVisible();
      await expect(qualLanguagesPage.successToast).toBeHidden();

      await pimPage.openPIM();
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails('Bob', 'Lanman', undefined, empId);
      await pimPage.save();
      await expect(pimPage.successToast).toBeVisible();
      await expect(pimPage.successToast).toBeHidden();

      await pimPage.openQualifications();
      await pimPage.addEmployeeLanguage(languageName);
    });

    await test.step('Admin: Xóa Language đang sử dụng', async () => {
      await qualLanguagesPage.open();
      await qualLanguagesPage.deleteRecord(languageName);
      await expect(qualLanguagesPage.successToast).toBeVisible();
      await expect(qualLanguagesPage.successToast).toBeHidden();
    });

    await test.step('PIM: Verify Language đã bị xóa khỏi profile nhân viên', async () => {
      await pimPage.openPIM();
      await pimPage.openPersonalDetails(empId);
      await test.step('Verify sync success in PIM Employee details', async () => {
        await pimPage.openQualifications();
        const lanRecord = page.locator('.oxd-table-row').filter({ hasText: languageName });
        await expect(lanRecord).toHaveCount(0);
        await evidence.screenshot('it-lan-deleted-cascade');
      });
    });

    await test.step('Teardown: Xóa nhân viên', async () => {
      await pimPage.openPIM();
      await pimPage.deleteEmployeeById(empId);
    });
  });
});
