import { test as base, expect } from '@fixtures/test';
import { EofficeLoginPage } from '@pages/elibrary/eoffice-login.page';
import { ElibrarySearchPage } from '@pages/elibrary/elibrary-search.page';

export type ElibraryFixtures = {
  eofficeLoginPage: EofficeLoginPage;
  elibrarySearchPage: ElibrarySearchPage;
};

export const test = base.extend<ElibraryFixtures>({
  eofficeLoginPage: async ({ page }, use) => use(new EofficeLoginPage(page)),
  elibrarySearchPage: async ({ page }, use) => use(new ElibrarySearchPage(page))
});

export { expect };
