import { test as base, expect } from '@fixtures/test';
import { PIMPage } from '@pages/pim/pim.page';

type PIMFixtures = {
  pimPage: PIMPage;
};

export const test = base.extend<PIMFixtures>({
  pimPage: async ({ page }, use) => {
    await use(new PIMPage(page));
  },
});

export { expect };
