import { test as base, expect } from '@fixtures/test';
import { RecruitmentPage } from '@pages/recruitment/recruitment.page';

export const test = base.extend<{ recruitmentPage: RecruitmentPage }>({
  recruitmentPage: async ({ page }, use) => {
    await use(new RecruitmentPage(page));
  }
});

export { expect };
