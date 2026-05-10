/**
 * GENERATED SPEC — TC_UT_ORG_STRUCTURE
 * Module : Admin > Organization > Structure
 */
import { test, expect } from '@fixtures/admin.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';

test.describe.serial('Admin > Organization > Structure', () => {
  let unitName: string;

  test.beforeAll(() => {
    unitName = `IT Dept ${uniqueSuffix('unit')}`;
  });

  test.beforeEach(async ({ loginPage }) => {
    const admin = users.admin;
    await loginPage.open();
    await loginPage.login(admin.username, admin.password);
  });

  test('TC_UT_ORG_06_CRUD - Tạo, Cập nhật, Xóa Structure Unit', async ({
    orgStructurePage,
    evidence
  }) => {
    await evidence.runtime();

    await test.step('1. Navigate to Structure and Enable Edit', async () => {
      await orgStructurePage.openStructure();
      await orgStructurePage.toggleEdit(true);
      await evidence.screenshot('01-structure-page');
    });

    await test.step('2. Add new Unit', async () => {
      await orgStructurePage.addNodeUnder();
      await orgStructurePage.fillForm({
        unitId: `ID_${uniqueSuffix('unit')}`,
        name: unitName,
        description: 'Initial Description'
      });
      await orgStructurePage.save();
      await expect(orgStructurePage.successToast).toBeVisible();
      await evidence.screenshot('02-create-success');
      expect(await orgStructurePage.isNodeVisible(unitName)).toBeTruthy();
    });

    await test.step('3. Edit the created Unit', async () => {
      await orgStructurePage.editNode(unitName);
      unitName = `${unitName} Updated`;
      await orgStructurePage.fillForm({ 
        unitId: `ID_${uniqueSuffix('unit_upd')}`,
        name: unitName,
        description: 'Updated Description'
      });
      await orgStructurePage.save();
      await expect(orgStructurePage.successToast).toBeVisible();
      await evidence.screenshot('03-edit-success');
      expect(await orgStructurePage.isNodeVisible(unitName)).toBeTruthy();
    });

    await test.step('4. Delete the created Unit', async () => {
      await orgStructurePage.toggleEdit(true); // Ensure Edit mode is still ON after Save
      await orgStructurePage.deleteNode(unitName);
      await expect(orgStructurePage.successToast).toBeVisible();
      await evidence.screenshot('04-delete-success');
      const isFound = await orgStructurePage.isNodeVisible(unitName).catch(() => false);
      expect(isFound).toBeFalsy();
    });
  });

  test('TC_UT_ORG_STR_04 - Tạo Structure Unit với tên tối đa ký tự', async ({
    orgStructurePage,
    evidence
  }) => {
    await evidence.runtime();
    const maxLengthName = 'A'.repeat(100);

    await test.step('Thêm Unit với 100 ký tự', async () => {
      await orgStructurePage.openStructure();
      await orgStructurePage.toggleEdit(true);
      await orgStructurePage.addNodeUnder();
      await orgStructurePage.fillForm({
        unitId: `ID_${uniqueSuffix('max')}`,
        name: maxLengthName
      });
      await orgStructurePage.save();
    });

    await test.step('Verify Success and Cleanup', async () => {
      await expect(orgStructurePage.successToast).toBeVisible();
      await evidence.screenshot('str-max-length');
      await orgStructurePage.toggleEdit(true);
      await orgStructurePage.deleteNode(maxLengthName);
    });
  });
});
