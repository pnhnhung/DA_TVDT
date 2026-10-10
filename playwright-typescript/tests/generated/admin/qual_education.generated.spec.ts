/**
 * GENERATED SPEC
 * Module : Admin > Qualifications > Education
 * Generated: 2026-05-08
 */
import { test, expect } from '@fixtures/admin.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';

test.describe.serial('Admin > Qualifications > Education', () => {
  const baseEduLevel = "Bachelor's " + uniqueSuffix('deg');
  const editedEduLevel = baseEduLevel + ' Updated';

  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.login(users.admin.username, users.admin.password);
    await page.waitForURL(/dashboard/);
  });

  test('TC_UT_QUAL_EDU_03 - Tạo Education thiếu Level bị báo lỗi validation', async ({
    qualEducationPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Education', async () => {
      await qualEducationPage.open();
    });

    await test.step('Click Add và bỏ trống Level rồi Save', async () => {
      await qualEducationPage.addButton.click();
      await qualEducationPage.fillForm('');
      await qualEducationPage.save();
    });

    await test.step('Verify hiển thị lỗi validation', async () => {
      await expect(qualEducationPage.errorMessage).toBeVisible();
      await evidence.screenshot('01-validation-empty-level');
      await qualEducationPage.cancel();
    });
  });

  test('TC_UT_QUAL_EDU_01 - Tạo mới Education thành công', async ({
    qualEducationPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Education', async () => {
      await qualEducationPage.open();
    });

    await test.step('Điền form và Save', async () => {
      await qualEducationPage.addButton.click();
      await qualEducationPage.fillForm(baseEduLevel);
      await qualEducationPage.save();
    });

    await test.step('Verify tạo thành công và hiện trong grid', async () => {
      await expect(qualEducationPage.successToast).toBeVisible();
      await evidence.screenshot('02-create-success');
      expect(await qualEducationPage.isRecordVisible(baseEduLevel)).toBeTruthy();
    });
  });

  test("TC_UT_QUAL_EDU_02 - Tạo Education bị trùng Level báo lỗi Already exists", async ({
    qualEducationPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Education', async () => {
      await qualEducationPage.open();
    });

    await test.step('Tạo lại Education với Level đã tồn tại', async () => {
      await qualEducationPage.addButton.click();
      await qualEducationPage.fillForm(baseEduLevel);
      await qualEducationPage.save();
    });

    await test.step('Verify lỗi Already exists', async () => {
      await expect(qualEducationPage.errorMessage).toHaveText('Already exists');
      await evidence.screenshot('03-validation-duplicate');
      await qualEducationPage.cancel();
    });
  });

  test('TC_UT_QUAL_EDU_05 - Cập nhật (Edit) Education thành công', async ({
    qualEducationPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Education', async () => {
      await qualEducationPage.open();
    });

    await test.step('Mở Edit và cập nhật Level', async () => {
      await qualEducationPage.editRecord(baseEduLevel);
      await qualEducationPage.fillForm(editedEduLevel);
      await qualEducationPage.save();
    });

    await test.step('Verify cập nhật thành công', async () => {
      await expect(qualEducationPage.successToast).toBeVisible();
      await evidence.screenshot('04-edit-success');
      expect(await qualEducationPage.isRecordVisible(editedEduLevel)).toBeTruthy();
    });
  });

  test('TC_UT_QUAL_EDU_06 - Xóa Education thành công', async ({
    qualEducationPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Education', async () => {
      await qualEducationPage.open();
    });

    await test.step('Xóa record và confirm', async () => {
      await qualEducationPage.deleteRecord(editedEduLevel);
    });

    await test.step('Verify xóa thành công và record biến mất khỏi grid', async () => {
      await expect(qualEducationPage.successToast).toBeVisible();
      await evidence.screenshot('05-delete-success');
      expect(await qualEducationPage.isRecordVisible(editedEduLevel)).toBeFalsy();
    });
  });

  test('TC_IT_QUAL_EDU_01 - Hiển thị và gán Education cho nhân viên bên PIM', async ({
    qualEducationPage,
    pimPage,
    evidence
  }) => {
    test.setTimeout(60000);
    await evidence.runtime();
    const eduLevel = 'IT Degree ' + uniqueSuffix('web');
    const empId = 'E' + Math.random().toString(36).substring(2, 9);

    await test.step('Admin: Tạo mới Education', async () => {
      await qualEducationPage.open();
      await qualEducationPage.addButton.click();
      await qualEducationPage.fillForm(eduLevel);
      await qualEducationPage.save();
      await expect(qualEducationPage.successToast).toBeVisible();
      await expect(qualEducationPage.successToast).toBeHidden();
    });

    await test.step('PIM: Tạo nhân viên mới', async () => {
      await pimPage.openPIM();
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails('Alice', 'Edu', undefined, empId);
      await pimPage.save();
      await expect(pimPage.successToast).toBeVisible();
      await expect(pimPage.successToast).toBeHidden();
    });

    await test.step('PIM: Gán Education cho nhân viên', async () => {
      await pimPage.openQualifications();
      await pimPage.addEmployeeEducation(eduLevel);
      await evidence.screenshot('it-edu-assigned');
    });

    await test.step('Teardown: Dọn dẹp data', async () => {
      await pimPage.openPIM();
      await pimPage.deleteEmployeeById(empId);
      await qualEducationPage.open();
      try {
        await qualEducationPage.deleteRecord(eduLevel);
      } catch (e) {
        // Ignored
      }
    });
  });

  test('TC_IT_QUAL_EDU_02 - Xóa Education khi đang sử dụng (SET NULL)', async ({
    qualEducationPage,
    pimPage,
    evidence,
    page
  }) => {
    test.setTimeout(60000);
    await evidence.runtime();
    const eduLevel = 'IT Degree ' + uniqueSuffix('del');
    const empId = 'E' + Math.random().toString(36).substring(2, 9);

    await test.step('Setup: Tạo Education và Nhân viên gắn Education', async () => {
      await qualEducationPage.open();
      await qualEducationPage.addButton.click();
      await qualEducationPage.fillForm(eduLevel);
      await qualEducationPage.save();
      await expect(qualEducationPage.successToast).toBeVisible();
      await expect(qualEducationPage.successToast).toBeHidden();

      await pimPage.openPIM();
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails('Bob', 'Eduman', undefined, empId);
      await pimPage.save();
      await expect(pimPage.successToast).toBeVisible();
      await expect(pimPage.successToast).toBeHidden();

      await pimPage.openQualifications();
      await pimPage.addEmployeeEducation(eduLevel);
    });

    await test.step('Admin: Xóa Education đang sử dụng', async () => {
      await qualEducationPage.open();
      await qualEducationPage.deleteRecord(eduLevel);
      await expect(qualEducationPage.successToast).toBeVisible();
      await expect(qualEducationPage.successToast).toBeHidden();
    });

    await test.step('PIM: Verify Education đã bị xóa khỏi profile nhân viên', async () => {
      await pimPage.openPIM();
      await test.step('Verify sync success in PIM Employee details', async () => {
        await pimPage.openPersonalDetails(empId);
        await pimPage.openQualifications();
        const eduRecord = page.locator('.oxd-table-row').filter({ hasText: eduLevel });
        await expect(eduRecord).toHaveCount(0);
        await evidence.screenshot('it-edu-deleted-cascade');
      });
    });

    await test.step('Teardown: Xóa nhân viên', async () => {
      await pimPage.openPIM();
      await pimPage.deleteEmployeeById(empId);
    });
  });

  test('TC_UT_QUAL_EDU_07 - Tạo Education với Level đạt độ dài tối đa (50 ký tự)', async ({
    qualEducationPage,
    evidence
  }) => {
    await evidence.runtime();
    const prefix = 'Edu_Max_';
    const suffix = uniqueSuffix('');
    const paddingLength = 50 - prefix.length - suffix.length;
    const padding = 'E'.repeat(Math.max(0, paddingLength));
    const maxLengthName = (prefix + padding + suffix).slice(0, 50);
    
    await test.step('Navigate to Education', async () => {
      await qualEducationPage.open();
    });

    await test.step('Tạo Education với 50 ký tự', async () => {
      await qualEducationPage.addButton.click();
      await qualEducationPage.fillForm(maxLengthName);
      await qualEducationPage.save();
    });

    await test.step('Verify tạo thành công', async () => {
      await expect(qualEducationPage.successToast).toBeVisible();
      await evidence.screenshot('06-max-length-success');
      expect(await qualEducationPage.isRecordVisible(maxLengthName)).toBeTruthy();
    });

    await test.step('Cleanup', async () => {
      await qualEducationPage.deleteRecord(maxLengthName);
    });
  });
});
