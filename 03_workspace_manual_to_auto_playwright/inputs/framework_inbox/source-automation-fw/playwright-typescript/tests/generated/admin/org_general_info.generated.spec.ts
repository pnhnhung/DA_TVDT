/**
 * GENERATED SPEC — TC_UT_ORG
 * Module : Admin > Organization > General Information
 */
import { test, expect } from '@fixtures/admin.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';

test.describe.serial('Admin > Organization > General Information', () => {
  let orgName: string;

  test.beforeAll(() => {
    orgName = `Auto Org ${uniqueSuffix('org')}`;
  });

  test.beforeEach(async ({ loginPage }) => {
    const admin = users.admin;
    await loginPage.open();
    await loginPage.login(admin.username, admin.password);
  });

  test('TC_UT_ORG_01 - Lưu General Information thành công', async ({
    orgGeneralInfoPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to General Information', async () => {
      await orgGeneralInfoPage.openGeneralInfo();
      await evidence.screenshot('01-general-info-page');
    });

    await test.step('Enable Edit mode', async () => {
      await orgGeneralInfoPage.toggleEdit(true);
    });

    await test.step('Fill new data and Save', async () => {
      await orgGeneralInfoPage.fillForm({
        name: orgName,
        regNumber: 'REG-12345'
      });
      await orgGeneralInfoPage.save();
    });

    await test.step('Verify Success', async () => {
      await expect(orgGeneralInfoPage.successToast).toBeVisible();
      await evidence.screenshot('02-save-success');
      
      // Form should return to disabled state after saving successfully
      const input = orgGeneralInfoPage.organizationNameInput;
      await expect(input).toBeDisabled();
      await expect(input).toHaveValue(orgName);
    });
  });

  test('TC_UT_ORG_02 - Lưu General Info thiếu trường bắt buộc', async ({
    orgGeneralInfoPage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('Navigate to General Information', async () => {
      await orgGeneralInfoPage.openGeneralInfo();
    });

    await test.step('Enable Edit mode', async () => {
      await orgGeneralInfoPage.toggleEdit(true);
    });

    await test.step('Clear required field and attempt to Save', async () => {
      await orgGeneralInfoPage.fillForm({ name: '' });
      await orgGeneralInfoPage.saveButton.click();
    });

    await test.step('Verify Error', async () => {
      await expect(orgGeneralInfoPage.errorMessage.first()).toHaveText('Required');
      await evidence.screenshot('03-required-error');
      
      // Cẩn thận: Không nên để trống tên Org làm hỏng DB nếu test thoát ra,
      // nhưng vì chưa Save được nên DB chưa update.
    });
  });
});
