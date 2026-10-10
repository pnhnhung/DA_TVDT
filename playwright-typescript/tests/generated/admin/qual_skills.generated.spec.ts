/**
 * GENERATED SPEC
 * Module : Admin > Qualifications > Skills
 * Generated: 2026-05-08
 */
import { test, expect } from '@fixtures/admin.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';

test.describe.serial('Admin > Qualifications > Skills', () => {
  const baseSkillName = 'Skill ' + uniqueSuffix('python');
  const editedSkillName = baseSkillName + ' Updated';

  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.login(users.admin.username, users.admin.password);
    await page.waitForURL(/dashboard/);
  });

  test('TC_UT_QUAL_SKILL_03 - Tạo Skill thiếu Name bị báo lỗi validation', async ({
    qualSkillsPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Skills', async () => {
      await qualSkillsPage.open();
    });

    await test.step('Click Add và bỏ trống Name rồi Save', async () => {
      await qualSkillsPage.addButton.click();
      await qualSkillsPage.fillForm('', 'This should fail');
      await qualSkillsPage.save();
    });

    await test.step('Verify hiển thị lỗi validation', async () => {
      await expect(qualSkillsPage.errorMessage).toBeVisible();
      await evidence.screenshot('01-validation-empty-name');
      await qualSkillsPage.cancel();
    });
  });

  test('TC_UT_QUAL_SKILL_01 - Tạo mới Skill thành công', async ({
    qualSkillsPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Skills', async () => {
      await qualSkillsPage.open();
    });

    await test.step('Điền form và Save', async () => {
      await qualSkillsPage.addButton.click();
      await qualSkillsPage.fillForm(baseSkillName, 'Test Skill Description');
      await qualSkillsPage.save();
    });

    await test.step('Verify tạo thành công và hiện trong grid', async () => {
      await expect(qualSkillsPage.successToast).toBeVisible();
      await evidence.screenshot('02-create-success');
      expect(await qualSkillsPage.isRecordVisible(baseSkillName)).toBeTruthy();
    });
  });

  test('TC_UT_QUAL_SKILL_02 - Tạo Skill bị trùng tên báo lỗi Already exists', async ({
    qualSkillsPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Skills', async () => {
      await qualSkillsPage.open();
    });

    await test.step('Tạo lại Skill với tên đã tồn tại', async () => {
      await qualSkillsPage.addButton.click();
      await qualSkillsPage.fillForm(baseSkillName, 'Duplicate Skill');
      await qualSkillsPage.save();
    });

    await test.step('Verify lỗi Already exists', async () => {
      await expect(qualSkillsPage.errorMessage).toHaveText('Already exists');
      await evidence.screenshot('03-validation-duplicate');
      await qualSkillsPage.cancel();
    });
  });

  test('TC_UT_QUAL_SKILL_05 - Cập nhật (Edit) Skill thành công', async ({
    qualSkillsPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Skills', async () => {
      await qualSkillsPage.open();
    });

    await test.step('Mở Edit và cập nhật thông tin', async () => {
      await qualSkillsPage.editRecord(baseSkillName);
      await qualSkillsPage.fillForm(editedSkillName, 'Updated Description');
      await qualSkillsPage.save();
    });

    await test.step('Verify cập nhật thành công', async () => {
      await expect(qualSkillsPage.successToast).toBeVisible();
      await evidence.screenshot('04-edit-success');
      expect(await qualSkillsPage.isRecordVisible(editedSkillName)).toBeTruthy();
    });
  });

  test('TC_UT_QUAL_SKILL_06 - Xóa Skill thành công', async ({
    qualSkillsPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Skills', async () => {
      await qualSkillsPage.open();
    });

    await test.step('Xóa record và confirm', async () => {
      await qualSkillsPage.deleteRecord(editedSkillName);
    });

    await test.step('Verify xóa thành công và record biến mất khỏi grid', async () => {
      await expect(qualSkillsPage.successToast).toBeVisible();
      await evidence.screenshot('05-delete-success');
      expect(await qualSkillsPage.isRecordVisible(editedSkillName)).toBeFalsy();
    });
  });

  test('TC_IT_QUAL_SKILL_01 - Hiển thị và gán Skill cho nhân viên bên PIM', async ({
    qualSkillsPage,
    pimPage,
    evidence
  }) => {
    test.setTimeout(60000);
    await evidence.runtime();
    const skillName = 'IT Skill ' + uniqueSuffix('web');
    const empId = 'E' + Math.random().toString(36).substring(2, 9);
    const firstName = 'Alice';
    const lastName = 'Skillman';

    await test.step('Admin: Tạo mới Skill', async () => {
      await qualSkillsPage.open();
      await qualSkillsPage.addButton.click();
      await qualSkillsPage.fillForm(skillName, 'Skill for integration test');
      await qualSkillsPage.save();
      await expect(qualSkillsPage.successToast).toBeVisible();
      await expect(qualSkillsPage.successToast).toBeHidden();
    });

    await test.step('PIM: Tạo nhân viên mới', async () => {
      await pimPage.openPIM();
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails(firstName, lastName, undefined, empId);
      await pimPage.save();
      await expect(pimPage.successToast).toBeVisible();
      await expect(pimPage.successToast).toBeHidden();
    });

    await test.step('PIM: Gán Skill cho nhân viên', async () => {
      await pimPage.openQualifications();
      await pimPage.addEmployeeSkill(skillName);
      await evidence.screenshot('it-skill-assigned');
    });

    await test.step('Teardown: Dọn dẹp data', async () => {
      await pimPage.openPIM();
      await pimPage.deleteEmployeeById(empId);
      await qualSkillsPage.open();
      try {
        await qualSkillsPage.deleteRecord(skillName);
      } catch (e) {
        // Ignored
      }
    });
  });

  test('TC_IT_QUAL_SKILL_02 - Xóa Skill khi đang sử dụng (SET NULL)', async ({
    qualSkillsPage,
    pimPage,
    evidence,
    page
  }) => {
    test.setTimeout(60000);
    await evidence.runtime();
    const skillName = 'IT Skill ' + uniqueSuffix('del');
    const empId = 'E' + Math.random().toString(36).substring(2, 9);

    await test.step('Setup: Tạo Skill và Nhân viên gắn Skill', async () => {
      await qualSkillsPage.open();
      await qualSkillsPage.addButton.click();
      await qualSkillsPage.fillForm(skillName, 'Skill to be deleted');
      await qualSkillsPage.save();
      await expect(qualSkillsPage.successToast).toBeVisible();
      await expect(qualSkillsPage.successToast).toBeHidden();

      await pimPage.openPIM();
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails('Bob', 'Deleteman', undefined, empId);
      await pimPage.save();
      await expect(pimPage.successToast).toBeVisible();
      await expect(pimPage.successToast).toBeHidden();

      await pimPage.openQualifications();
      await pimPage.addEmployeeSkill(skillName);
    });

    await test.step('Admin: Xóa Skill đang sử dụng', async () => {
      await qualSkillsPage.open();
      await qualSkillsPage.deleteRecord(skillName);
      await expect(qualSkillsPage.successToast).toBeVisible();
      await expect(qualSkillsPage.successToast).toBeHidden();
    });

    await test.step('PIM: Verify Skill đã bị xóa khỏi profile nhân viên', async () => {
      await pimPage.openPIM();
      await pimPage.openPersonalDetails(empId);
      await test.step('Verify sync success in PIM Employee details', async () => {
        await pimPage.openQualifications();
        const skillRecord = page.locator('.oxd-table-row').filter({ hasText: skillName });
        await expect(skillRecord).toHaveCount(0);
        await evidence.screenshot('it-skill-deleted-cascade');
      });
    });

    await test.step('Teardown: Xóa nhân viên', async () => {
      await pimPage.openPIM();
      await pimPage.deleteEmployeeById(empId);
    });
  });

  test('TC_UT_QUAL_SKILL_07 - Tạo Skill với Name đạt độ dài tối đa (120 ký tự)', async ({
    qualSkillsPage,
    evidence
  }) => {
    await evidence.runtime();
    const prefix = 'Skill_Max_';
    const suffix = uniqueSuffix('');
    const paddingLength = 120 - prefix.length - suffix.length;
    const padding = 'S'.repeat(Math.max(0, paddingLength));
    const maxLengthName = (prefix + padding + suffix).slice(0, 120);
    
    await test.step('Navigate to Skills', async () => {
      await qualSkillsPage.open();
    });

    await test.step('Tạo Skill với 120 ký tự', async () => {
      await qualSkillsPage.addButton.click();
      await qualSkillsPage.fillForm(maxLengthName, 'Max length test');
      await qualSkillsPage.save();
    });

    await test.step('Verify tạo thành công', async () => {
      await expect(qualSkillsPage.successToast).toBeVisible();
      await evidence.screenshot('06-max-length-success');
      expect(await qualSkillsPage.isRecordVisible(maxLengthName)).toBeTruthy();
    });

    await test.step('Cleanup', async () => {
      await qualSkillsPage.deleteRecord(maxLengthName);
    });
  });
});
