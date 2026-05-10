/**
 * GENERATED SPEC
 * Module : Admin > Qualifications > Memberships
 * Generated: 2026-05-08
 */
import { test, expect } from '@fixtures/admin.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';

test.describe.serial('Admin > Qualifications > Memberships', () => {
  const baseMembershipName = 'Membership ' + uniqueSuffix('mem');
  const editedMembershipName = baseMembershipName + ' Updated';

  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.login(users.admin.username, users.admin.password);
    await page.waitForURL(/dashboard/);
  });

  test('TC_UT_QUAL_MEM_03 - Tạo Membership thiếu Name bị báo lỗi validation', async ({
    qualMembershipsPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Memberships', async () => {
      await qualMembershipsPage.open();
    });

    await test.step('Click Add và bỏ trống Name rồi Save', async () => {
      await qualMembershipsPage.addButton.click();
      await qualMembershipsPage.fillForm('');
      await qualMembershipsPage.save();
    });

    await test.step('Verify hiển thị lỗi validation', async () => {
      await expect(qualMembershipsPage.errorMessage).toBeVisible();
      await evidence.screenshot('01-validation-empty-name');
      await qualMembershipsPage.cancel();
    });
  });

  test('TC_UT_QUAL_MEM_01 - Tạo mới Membership thành công', async ({
    qualMembershipsPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Memberships', async () => {
      await qualMembershipsPage.open();
    });

    await test.step('Điền form và Save', async () => {
      await qualMembershipsPage.addButton.click();
      await qualMembershipsPage.fillForm(baseMembershipName);
      await qualMembershipsPage.save();
    });

    await test.step('Verify tạo thành công và hiện trong grid', async () => {
      await expect(qualMembershipsPage.successToast).toBeVisible();
      await evidence.screenshot('02-create-success');
      expect(await qualMembershipsPage.isRecordVisible(baseMembershipName)).toBeTruthy();
    });
  });

  test('TC_UT_QUAL_MEM_02 - Tạo Membership bị trùng tên báo lỗi Already exists', async ({
    qualMembershipsPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Memberships', async () => {
      await qualMembershipsPage.open();
    });

    await test.step('Tạo lại Membership với tên đã tồn tại', async () => {
      await qualMembershipsPage.addButton.click();
      await qualMembershipsPage.fillForm(baseMembershipName);
      await qualMembershipsPage.save();
    });

    await test.step('Verify lỗi Already exists', async () => {
      await expect(qualMembershipsPage.errorMessage).toHaveText('Already exists');
      await evidence.screenshot('03-validation-duplicate');
      await qualMembershipsPage.cancel();
    });
  });

  test('TC_UT_QUAL_MEM_05 - Cập nhật (Edit) Membership thành công', async ({
    qualMembershipsPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Memberships', async () => {
      await qualMembershipsPage.open();
    });

    await test.step('Mở Edit và cập nhật Name', async () => {
      await qualMembershipsPage.editRecord(baseMembershipName);
      await qualMembershipsPage.fillForm(editedMembershipName);
      await qualMembershipsPage.save();
    });

    await test.step('Verify cập nhật thành công', async () => {
      await expect(qualMembershipsPage.successToast).toBeVisible();
      await evidence.screenshot('04-edit-success');
      expect(await qualMembershipsPage.isRecordVisible(editedMembershipName)).toBeTruthy();
    });
  });

  test('TC_UT_QUAL_MEM_06 - Xóa Membership thành công', async ({
    qualMembershipsPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to Memberships', async () => {
      await qualMembershipsPage.open();
    });

    await test.step('Xóa record và confirm', async () => {
      await qualMembershipsPage.deleteRecord(editedMembershipName);
    });

    await test.step('Verify xóa thành công và record biến mất khỏi grid', async () => {
      await expect(qualMembershipsPage.successToast).toBeVisible();
      await evidence.screenshot('05-delete-success');
      expect(await qualMembershipsPage.isRecordVisible(editedMembershipName)).toBeFalsy();
    });
  });

  test('TC_IT_QUAL_MEM_01 - Hiển thị và gán Membership cho nhân viên bên PIM', async ({
    qualMembershipsPage,
    pimPage,
    evidence
  }) => {
    test.setTimeout(60000);
    await evidence.runtime();
    const membershipName = 'IT Membership ' + uniqueSuffix('web');
    const empId = 'E' + Math.random().toString(36).substring(2, 9);

    await test.step('Admin: Tạo mới Membership', async () => {
      await qualMembershipsPage.open();
      await qualMembershipsPage.addButton.click();
      await qualMembershipsPage.fillForm(membershipName);
      await qualMembershipsPage.save();
      await expect(qualMembershipsPage.successToast).toBeVisible();
      await expect(qualMembershipsPage.successToast).toBeHidden();
    });

    await test.step('PIM: Tạo nhân viên mới', async () => {
      await pimPage.openPIM();
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails('Alice', 'Mem', undefined, empId);
      await pimPage.save();
      await expect(pimPage.successToast).toBeVisible();
      await expect(pimPage.successToast).toBeHidden();
    });

    await test.step('PIM: Gán Membership cho nhân viên', async () => {
      await pimPage.openMemberships();
      await pimPage.addEmployeeMembership(membershipName);
      await evidence.screenshot('it-mem-assigned');
    });

    await test.step('Teardown: Dọn dẹp data', async () => {
      await pimPage.openPIM();
      await pimPage.deleteEmployeeById(empId);
      await qualMembershipsPage.open();
      try {
        await qualMembershipsPage.deleteRecord(membershipName);
      } catch (e) {
        // Ignored
      }
    });
  });

  test('TC_IT_QUAL_MEM_02 - Xóa Membership khi đang sử dụng (SET NULL)', async ({
    qualMembershipsPage,
    pimPage,
    evidence,
    page
  }) => {
    test.setTimeout(60000);
    await evidence.runtime();
    const membershipName = 'IT Membership ' + uniqueSuffix('del');
    const empId = 'E' + Math.random().toString(36).substring(2, 9);

    await test.step('Setup: Tạo Membership và Nhân viên gắn Membership', async () => {
      await qualMembershipsPage.open();
      await qualMembershipsPage.addButton.click();
      await qualMembershipsPage.fillForm(membershipName);
      await qualMembershipsPage.save();
      await expect(qualMembershipsPage.successToast).toBeVisible();
      await expect(qualMembershipsPage.successToast).toBeHidden();

      await pimPage.openPIM();
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails('Bob', 'Memman', undefined, empId);
      await pimPage.save();
      await expect(pimPage.successToast).toBeVisible();
      await expect(pimPage.successToast).toBeHidden();

      await pimPage.openMemberships();
      await pimPage.addEmployeeMembership(membershipName);
    });

    await test.step('Admin: Xóa Membership đang sử dụng', async () => {
      await qualMembershipsPage.open();
      await qualMembershipsPage.deleteRecord(membershipName);
      await expect(qualMembershipsPage.successToast).toBeVisible();
      await expect(qualMembershipsPage.successToast).toBeHidden();
    });

    await test.step('PIM: Verify Membership đã bị xóa khỏi profile nhân viên', async () => {
      await pimPage.openPIM();
      await pimPage.openPersonalDetails(empId);
      await test.step('Verify sync success in PIM Employee details', async () => {
        await pimPage.openMemberships();
        const memRecord = page.locator('.oxd-table-row').filter({ hasText: membershipName });
        await expect(memRecord).toHaveCount(0);
        await evidence.screenshot('it-mem-deleted-cascade');
      });
    });

    await test.step('Teardown: Xóa nhân viên', async () => {
      await pimPage.openPIM();
      await pimPage.deleteEmployeeById(empId);
    });
  });
});
