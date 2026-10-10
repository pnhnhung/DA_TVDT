/**
 * GENERATED SPEC
 * Module : PIM > Data Cleanup
 * Generated: 2026-05-09
 */
import { test, expect } from '@fixtures/pim.fixture';
import { users } from '@data/users';

test.describe('PIM > Data Cleanup', () => {

  test('TC_UT_PIM_CLEANUP - Xóa bớt data rác Employee', async ({ loginPage, pimPage, page, evidence }) => {
    test.setTimeout(120000); // 2 minutes for cleanup
    await evidence.runtime();
    
    await test.step('Login and open PIM', async () => {
      await loginPage.open();
      await loginPage.login(users.admin.username, users.admin.password);
      await page.waitForURL(/dashboard/);
      await pimPage.openPIM();
    });

    await test.step('Search for garbage records', async () => {
      // Find employees containing "EMP LOGDIS" or "EMP " (the prefixes we generated)
      await pimPage.searchNameInput.fill('EMP');
      
      const searchPromise = page.waitForResponse(resp => resp.url().includes('/employees') && resp.request().method() === 'GET', { timeout: 10000 }).catch(() => null);
      await pimPage.searchButton.click();
      await searchPromise;
      await page.waitForLoadState('networkidle');
    });

    await test.step('Delete older garbage records, keep 5', async () => {
      // Loop to delete records
      let attempts = 0;
      const keepCount = 5;
      
      while (attempts < 20) {
        // Find how many rows currently exist on this page
        const rowCount = await page.locator('.oxd-table-body .oxd-table-row').count();
        if (rowCount <= keepCount) {
          // If we have <= keepCount records left on the first page, and no pagination, we're done.
          // Wait, if there are multiple pages, we should keep going?
          // Since it's sorted, deleting from the top or just checking total count.
          const paginationText = await page.locator('.oxd-text--span').filter({ hasText: /Records Found/i }).innerText().catch(() => '');
          const match = paginationText.match(/\((\d+)\)/);
          const totalRecords = match ? parseInt(match[1], 10) : rowCount;
          
          if (totalRecords <= keepCount) {
            console.log(`Only ${totalRecords} garbage records remain. Cleanup complete.`);
            break;
          }
        }
        
        // Wait! We shouldn't delete ALL of them. We want to delete the ones beyond `keepCount`.
        // To be simple: we select the "Select All" checkbox, but uncheck the first `keepCount` items.
        // Wait, "Select All" selects all on the current page (max 50).
        if (rowCount === 0) {
           break; 
        }

        const deletePromises = [];
        // We will delete starting from index `keepCount` if on the first page
        const startIndex = (attempts === 0) ? keepCount : 0;
        
        if (startIndex >= rowCount) {
            // Need to go to next page
            const nextBtn = page.locator('button.oxd-pagination-page-item--previous-next:has(i.bi-chevron-right)');
            if (await nextBtn.isVisible() && await nextBtn.isEnabled()) {
              const respPromise = page.waitForResponse(resp => resp.url().includes('/employees') && resp.request().method() === 'GET', { timeout: 10000 }).catch(() => null);
              await nextBtn.click();
              await respPromise;
              await page.waitForLoadState('networkidle');
              attempts++;
              continue;
            } else {
              break;
            }
        }
        
        // Click delete on the row at startIndex
        const row = page.locator('.oxd-table-body .oxd-table-row').nth(startIndex);
        await row.locator('i.bi-trash').click();
        await page.locator('.oxd-button--label-danger').click();
        await expect(pimPage.successToast).toBeVisible();
        await expect(pimPage.successToast).toBeHidden();
        
        // The table reloads automatically, we need to wait for it
        await page.waitForLoadState('networkidle');
        attempts++;
      }
    });
  });
});
