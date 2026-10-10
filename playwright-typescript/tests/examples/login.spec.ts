import { test, expect } from '@fixtures/test';
import { users } from '@data/users';

test.describe('@smoke Login', () => {
  test('TC_LOGIN_001 - admin can login successfully', async ({ loginPage, dashboardPage, evidence }) => {
    await evidence.runtime();

    await loginPage.open();
    await loginPage.login(users.admin.username, users.admin.password);

    await expect(dashboardPage.pageHeader).toBeVisible();
    await evidence.screenshot('login-success-dashboard');
  });

  test('TC_LOGIN_002 - invalid credential shows error message', async ({ loginPage, evidence }) => {
    await loginPage.open();
    await loginPage.login('invalid-user', 'invalid-password');

    await expect(loginPage.invalidCredentialAlert).toBeVisible();
    await evidence.screenshot('invalid-login-error');
  });
});
