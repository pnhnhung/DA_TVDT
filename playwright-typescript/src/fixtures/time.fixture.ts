import { test as base, expect } from '@fixtures/test';
import { CustomersPage } from '@pages/time/customers.page';
import { ProjectsPage } from '@pages/time/projects.page';
import { TimesheetsPage } from '@pages/time/timesheets.page';

export type TimeFixtures = {
  customersPage: CustomersPage;
  projectsPage: ProjectsPage;
  timesheetsPage: TimesheetsPage;
};

export const test = base.extend<TimeFixtures>({
  customersPage: async ({ page }, use) => use(new CustomersPage(page)),
  projectsPage: async ({ page }, use) => use(new ProjectsPage(page)),
  timesheetsPage: async ({ page }, use) => use(new TimesheetsPage(page)),
});

export { expect };
