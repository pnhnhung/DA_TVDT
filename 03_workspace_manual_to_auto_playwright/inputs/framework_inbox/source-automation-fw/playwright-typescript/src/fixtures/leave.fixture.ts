import { test as base, expect } from './test';
import { LeavePage } from '../pages/leave/leave.page';

type LeaveFixtures = {
  leavePage: LeavePage;
};

export const test = base.extend<LeaveFixtures>({
  leavePage: async ({ page }, use) => {
    await use(new LeavePage(page));
  },
});

export { expect };
