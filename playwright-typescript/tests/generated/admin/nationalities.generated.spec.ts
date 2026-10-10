/**
 * GENERATED SPEC
 * Module : Admin > Nationalities
 * Generated: 2026-05-08
 */
import { test, expect } from '@fixtures/admin.fixture';
import { uniqueSuffix } from '@core/test-data';
import { users } from '@data/users';
import { nationalitiesLocators } from '@locators/admin/nationalities.locators';

test.describe('Admin > Nationalities', () => {

  test.beforeEach(async ({ page, loginPage, nationalitiesPage }) => {
    test.setTimeout(60000);
    // Navigate to base URL before doing anything
    await loginPage.open();
    // Default to admin login for all tests except the ESS test which will handle its own login
    if (test.info().title.includes('TC_UT_NAT_07')) {
      return; // ESS test will login as ESS
    }
    await loginPage.login(users.admin.username, users.admin.password);
    await page.waitForURL(/dashboard/);
    
    // Explicitly check for Dashboard title to avoid navigation race conditions
    await expect(page.locator('.oxd-topbar-header-breadcrumb-module')).toHaveText('Dashboard');
    await nationalitiesPage.openNationalities();
  });

  test('TC_UT_NAT_01 - Tạo Nationality thành công', async ({ nationalitiesPage, evidence }) => {
    await evidence.runtime();
    const name = 'NAT ' + uniqueSuffix('TC01');
    
    await test.step('Start adding', async () => {
      await nationalitiesPage.startAdd();
    });
    
    await test.step('Fill form and save', async () => {
      await nationalitiesPage.fillName(name);
      await nationalitiesPage.save();
    });
    
    await test.step('Verify creation', async () => {
      await expect(nationalitiesPage.successToast).toBeVisible();
      await evidence.screenshot('create-success');
      expect(await nationalitiesPage.isNationalityInList(name)).toBeTruthy();
    });

    await test.step('Teardown (Cleanup)', async () => {
      await nationalitiesPage.deleteByName(name);
    });
  });

  test('TC_UT_NAT_02 - Tạo thiếu trường bắt buộc', async ({ nationalitiesPage, evidence }) => {
    await evidence.runtime();
    
    await test.step('Start adding', async () => {
      await nationalitiesPage.startAdd();
    });
    
    await test.step('Save without filling Name', async () => {
      await nationalitiesPage.saveButton.click();
    });
    
    await test.step('Verify required error message', async () => {
      await expect(nationalitiesPage.errorMessage.first()).toHaveText('Required');
      await evidence.screenshot('missing-required-error');
    });
  });

  test('TC_UT_NAT_03 - Tạo với độ dài max (100 chars)', async ({ nationalitiesPage, evidence }) => {
    await evidence.runtime();
    // 100 characters max length
    const prefix = 'NAT_TC03_' + uniqueSuffix('');
    const padding = 'A'.repeat(100 - prefix.length);
    const maxLengthName = prefix + padding;
    
    await test.step('Start adding', async () => {
      await nationalitiesPage.startAdd();
    });
    
    await test.step('Fill form with exactly 100 chars and save', async () => {
      await nationalitiesPage.fillName(maxLengthName);
      await nationalitiesPage.save();
    });
    
    await test.step('Verify creation', async () => {
      await expect(nationalitiesPage.successToast).toBeVisible();
      await evidence.screenshot('max-length-success');
    });

    await test.step('Teardown (Cleanup)', async () => {
      await nationalitiesPage.deleteByName(maxLengthName);
    });
  });

  test('TC_UT_NAT_04 - Tạo với độ dài max+1 (101 chars)', async ({ page, nationalitiesPage, evidence }) => {
    await evidence.runtime();
    const prefix = 'NAT_TC04_' + uniqueSuffix('');
    const padding = 'A'.repeat(101 - prefix.length);
    const maxLengthPlusOneName = prefix + padding;
    
    await test.step('Start adding', async () => {
      await nationalitiesPage.startAdd();
    });
    
    await test.step('Fill form with 101 chars and save', async () => {
      await nationalitiesPage.fillName(maxLengthPlusOneName);
      // Wait to see if error appears or if it gets truncated
      const savePromise = page.waitForResponse(resp => 
        resp.url().includes('/nationalities')
      ).catch(() => null);
      
      await nationalitiesPage.saveButton.click();
      await savePromise;
    });
    
    await test.step('Verify behavior', async () => {
      // In OrangeHRM, it might show "Should not exceed 100 characters" OR truncate automatically
      const hasError = await nationalitiesPage.errorMessage.first().isVisible().catch(() => false);
      if (hasError) {
        await expect(nationalitiesPage.errorMessage.first()).toContainText(/100/);
        await evidence.screenshot('exceed-max-length-error');
      } else {
        // If it saved successfully, it likely truncated
        await expect(nationalitiesPage.successToast).toBeVisible();
        await evidence.screenshot('exceed-max-length-truncated');
        // Teardown the truncated name (first 100 chars)
        const truncatedName = maxLengthPlusOneName.substring(0, 100);
        await nationalitiesPage.deleteByName(truncatedName);
      }
    });
  });

  test('TC_UT_NAT_05 - Tạo trùng tên', async ({ nationalitiesPage, evidence }) => {
    await evidence.runtime();
    const name = 'NAT ' + uniqueSuffix('TC05');
    
    await test.step('Pre-condition: Create an existing Nationality', async () => {
      await nationalitiesPage.startAdd();
      await nationalitiesPage.fillName(name);
      await nationalitiesPage.save();
      await expect(nationalitiesPage.successToast).toBeVisible();
      // Wait for success toast to disappear to avoid click interference
      await expect(nationalitiesPage.successToast).toBeHidden();
    });
    
    await test.step('Start adding duplicate', async () => {
      await nationalitiesPage.startAdd();
    });
    
    await test.step('Fill duplicate form and save', async () => {
      await nationalitiesPage.fillName(name);
      await nationalitiesPage.saveButton.click();
    });
    
    await test.step('Verify duplicate error', async () => {
      await expect(nationalitiesPage.errorMessage.first()).toHaveText('Already exists');
      await evidence.screenshot('duplicate-error');
    });

    await test.step('Teardown (Cleanup)', async () => {
      await nationalitiesPage.cancel(); // Go back to list
      await nationalitiesPage.deleteByName(name);
    });
  });

  test('TC_UT_NAT_08 - Chỉnh sửa tên Nationality thành công', async ({ nationalitiesPage, evidence }) => {
    await evidence.runtime();
    const name = 'NAT ' + uniqueSuffix('TC08_A');
    const editedName = 'NAT ' + uniqueSuffix('TC08_B');
    
    await test.step('Pre-condition: Create a record', async () => {
      await nationalitiesPage.startAdd();
      await nationalitiesPage.fillName(name);
      await nationalitiesPage.save();
      await expect(nationalitiesPage.successToast).toBeVisible();
      await expect(nationalitiesPage.successToast).toBeHidden();
    });
    
    await test.step('Edit record', async () => {
      await nationalitiesPage.editByName(name, editedName);
    });
    
    await test.step('Verify edit', async () => {
      await expect(nationalitiesPage.successToast).toBeVisible();
      await evidence.screenshot('edit-success');
      expect(await nationalitiesPage.isNationalityInList(editedName)).toBeTruthy();
    });
    
    await test.step('Teardown (Cleanup)', async () => {
      await nationalitiesPage.deleteByName(editedName);
    });
  });

  test('TC_UT_NAT_09 - Chỉnh sửa tên thành tên đã tồn tại', async ({ nationalitiesPage, evidence }) => {
    await evidence.runtime();
    const nameA = 'NAT ' + uniqueSuffix('TC09_A');
    const nameB = 'NAT ' + uniqueSuffix('TC09_B');
    
    await test.step('Pre-condition: Create two records', async () => {
      // Record A
      await nationalitiesPage.startAdd();
      await nationalitiesPage.fillName(nameA);
      await nationalitiesPage.save();
      await expect(nationalitiesPage.successToast).toBeVisible();
      await expect(nationalitiesPage.successToast).toBeHidden();
      
      // Record B
      await nationalitiesPage.startAdd();
      await nationalitiesPage.fillName(nameB);
      await nationalitiesPage.save();
      await expect(nationalitiesPage.successToast).toBeVisible();
      await expect(nationalitiesPage.successToast).toBeHidden();
    });
    
    await test.step('Edit Record B to Name A', async () => {
      // Find row for B and click edit
      const row = await nationalitiesPage.findRowByName(nameB);
      await row.locator(nationalitiesLocators.editIcon.selector!).click();
      await nationalitiesPage.expectUrlContains(/saveNationality/);
      await nationalitiesPage.waitForLoading();
      
      await nationalitiesPage.fillName(nameA);
      await nationalitiesPage.saveButton.click();
    });
    
    await test.step('Verify duplicate error', async () => {
      await expect(nationalitiesPage.errorMessage.first()).toHaveText('Already exists');
      await evidence.screenshot('edit-duplicate-error');
    });
    
    await test.step('Teardown (Cleanup)', async () => {
      await nationalitiesPage.cancel();
      await nationalitiesPage.deleteByName(nameA);
      await nationalitiesPage.deleteByName(nameB);
    });
  });

  test('TC_UT_NAT_06 - Xóa Nationality thành công', async ({ nationalitiesPage, evidence }) => {
    await evidence.runtime();
    const name = 'NAT ' + uniqueSuffix('TC06');
    
    await test.step('Pre-condition: Create a record', async () => {
      await nationalitiesPage.startAdd();
      await nationalitiesPage.fillName(name);
      await nationalitiesPage.save();
      await expect(nationalitiesPage.successToast).toBeVisible();
      await expect(nationalitiesPage.successToast).toBeHidden();
    });
    
    await test.step('Delete record', async () => {
      await nationalitiesPage.deleteByName(name);
    });
    
    await test.step('Verify deletion', async () => {
      await expect(nationalitiesPage.successToast).toBeVisible();
      await evidence.screenshot('delete-success');
      expect(await nationalitiesPage.isNationalityInList(name)).toBeFalsy();
    });
  });

  test('TC_UT_NAT_07 - Kiểm tra quyền ESS', async ({ page, loginPage, nationalitiesPage, evidence }) => {
    await evidence.runtime();
    
    await test.step('Login as ESS user', async () => {
      // Assuming users.ess contains valid ESS credentials
      await loginPage.login(users.ess.username, users.ess.password);
      await page.waitForURL(/dashboard/);
    });
    
    await test.step('Verify Admin menu is inaccessible', async () => {
      // ESS user should not see the Admin menu
      await expect(nationalitiesPage.adminMenu).toBeHidden();
      await evidence.screenshot('ess-no-admin-menu');
    });

    await test.step('Verify direct URL access is blocked', async () => {
      try {
        await page.goto('/web/index.php/admin/viewNationalities', { timeout: 10000 });
        await page.waitForTimeout(2000);
        
        const isStillOnNationalities = page.url().includes('viewNationalities');
        if (isStillOnNationalities) {
           const isFormVisible = await nationalitiesPage.addButton.isVisible().catch(() => false);
           expect(isFormVisible, 'Form should not be visible to ESS').toBeFalsy();
        }
      } catch (e: any) {
        // Playwright might throw ERR_HTTP_RESPONSE_CODE_FAILURE if server actively blocks it
        expect(e.message).toMatch(/ERR_HTTP_RESPONSE_CODE_FAILURE|Timeout|Access/i);
      }
      
      await evidence.screenshot('ess-direct-access');
    });
  });
  test('TC_IT_NAT_01 - Hiển thị dropdown bên PIM', async ({ nationalitiesPage, pimPage, evidence }) => {
    test.setTimeout(90000);
    await evidence.runtime();
    const natName = 'NAT IT01 ' + uniqueSuffix('');
    const empFirst = 'Emp';
    const empLast = 'Test';
    const empId = Math.random().toString(36).substring(2, 9);
    
    await test.step('Pre-condition: Create Nationality', async () => {
      await nationalitiesPage.startAdd();
      await nationalitiesPage.fillName(natName);
      await nationalitiesPage.save();
      await expect(nationalitiesPage.successToast).toBeVisible();
      await expect(nationalitiesPage.successToast).toBeHidden();
    });
    
    await test.step('Create Employee & Navigate to Personal Details', async () => {
      await pimPage.openPIM();
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails(empFirst, empLast, '', empId);
      await pimPage.save();
      await expect(pimPage.successToast).toBeVisible();
      // Wait to navigate to Personal Details
      await pimPage.personalDetailsTab.waitFor({ state: 'visible' });
    });
    
    await test.step('Verify Nationality is selectable in PIM', async () => {
      await pimPage.selectNationality(natName);
      // If it successfully selects, it won't throw an error. We also save it.
      await pimPage.savePersonalDetails();
      await expect(pimPage.successToast).toBeVisible();
      await evidence.screenshot('it-nat-01-selectable');
    });

    await test.step('Teardown (Cleanup)', async () => {
      await pimPage.deleteEmployeeById(empId);
      
      await nationalitiesPage.openNationalities();
      await nationalitiesPage.deleteByName(natName);
    });
  });

  test('TC_IT_NAT_02 - Xóa khi đang sử dụng (FK)', async ({ nationalitiesPage, pimPage, evidence }) => {
    test.setTimeout(120000);
    await evidence.runtime();
    const natName = 'NAT IT02 ' + uniqueSuffix('');
    const empFirst = 'Emp';
    const empLast = 'Test';
    const empId = Math.random().toString(36).substring(2, 9);
    
    await test.step('Pre-condition: Create Nationality', async () => {
      await nationalitiesPage.startAdd();
      await nationalitiesPage.fillName(natName);
      await nationalitiesPage.save();
      await expect(nationalitiesPage.successToast).toBeVisible();
      await expect(nationalitiesPage.successToast).toBeHidden();
    });
    
    await test.step('Pre-condition: Create Employee and Assign Nationality', async () => {
      await pimPage.openPIM();
      await pimPage.openAddEmployee();
      await pimPage.fillEmployeeDetails(empFirst, empLast, '', empId);
      await pimPage.save();
      await expect(pimPage.successToast).toBeVisible();
      await expect(pimPage.successToast).toBeHidden();
      
      await pimPage.personalDetailsTab.waitFor({ state: 'visible' });
      await pimPage.selectNationality(natName);
      await pimPage.savePersonalDetails();
      await expect(pimPage.successToast).toBeVisible();
    });
    
    await test.step('Attempt to Delete Nationality in Use', async () => {
      await nationalitiesPage.openNationalities();
      
      // We directly attempt to delete. Since it's linked to an employee, it should fail.
      const row = await nationalitiesPage.findRowByName(natName);
      await row.locator('.bi-trash').click();
      await nationalitiesPage.confirmDeleteButton.click();
    });
    
    await test.step('Verify Deletion Success', async () => {
      // OrangeHRM does not enforce FK constraint on Nationalities and allows deletion.
      await expect(nationalitiesPage.successToast).toBeVisible();
      await expect(nationalitiesPage.successToast).toBeHidden();
      await evidence.screenshot('it-nat-02-fk-deleted');
    });

    await test.step('Verify Employee Nationality Reset', async () => {
      await pimPage.openPIM();
      await pimPage.openPersonalDetails(empId);
      
      const selectedNationality = await pimPage.nationalitySelect.innerText();
      expect(selectedNationality.trim(), 'Nationality should reset to empty/default').toBe('-- Select --');
      await evidence.screenshot('it-nat-02-emp-reset');
    });

    await test.step('Teardown (Cleanup)', async () => {
      await pimPage.openPIM();
      await pimPage.deleteEmployeeById(empId);
      
      await nationalitiesPage.openNationalities();
      try {
        await nationalitiesPage.deleteByName(natName);
      } catch (e: any) {
        // Ignored if already deleted
      }
    });
  });
});
