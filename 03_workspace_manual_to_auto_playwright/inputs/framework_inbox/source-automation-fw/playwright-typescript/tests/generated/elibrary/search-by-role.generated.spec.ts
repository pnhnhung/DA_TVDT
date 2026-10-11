/**
 * Shared E-Library search smoke check for each configured role.
 * Role-specific actions (borrow/return/approval) should live in separate specs.
 */
import { test, expect } from '@fixtures/elibrary.fixture';
import { env, type ElibraryRole } from '@config/env';

const roles: ElibraryRole[] = ['admin', 'employee', 'warehouse'];

for (const role of roles) {
  test(`TC_ROLE_SEARCH_${role.toUpperCase()} - Role ${role} can use shared document search`, async ({
    eofficeLoginPage,
    elibrarySearchPage
  }) => {
    const account = env.elibrary.accounts[role];
    test.skip(
      !account.username || !account.password,
      `Chưa cấu hình tài khoản role ${role} trong .env; xem .env.example`
    );

    await eofficeLoginPage.loginAsRole(role);
    await elibrarySearchPage.search('HƯỚNG DẪN SỬ DỤNG');

    await expect(elibrarySearchPage.resultCount).toHaveText(/^[1-9]\d*$/);
    await expect(elibrarySearchPage.firstResultTitle).toHaveText('HƯỚNG DẪN SỬ DỤNG');
  });
}
