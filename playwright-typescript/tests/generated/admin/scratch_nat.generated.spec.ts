import { test, expect } from '@playwright/test';

test('debug nat', async ({ page }) => {
  await page.goto('http://tuanlm.ddns.net:8080/web/index.php/auth/login');
  await page.fill('[name="username"]', 'admin');
  await page.fill('[name="password"]', 'Admin@1234');
  await page.click('button[type="submit"]');
  await page.waitForURL(/dashboard/);
  
  await page.goto('http://tuanlm.ddns.net:8080/web/index.php/admin/viewNationalities');
  await page.waitForLoadState('networkidle');
  
  const text = await page.locator('.oxd-table-body').innerText();
  console.log("FIRST PAGE TEXT LENGTH:", text.length);
  
  // click next 3 times
  for (let i=0; i<4; i++) {
    const nextBtn = page.locator('button.oxd-pagination-page-item--previous-next:has(i.bi-chevron-right)');
    if (await nextBtn.isVisible() && await nextBtn.isEnabled()) {
        await nextBtn.click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);
        console.log(`PAGE ${i+2} TEXT LENGTH:`, (await page.locator('.oxd-table-body').innerText()).length);
        console.log(`Contains NAT on page ${i+2}?`, (await page.locator('.oxd-table-body').innerText()).includes('NAT'));
    }
  }
});
