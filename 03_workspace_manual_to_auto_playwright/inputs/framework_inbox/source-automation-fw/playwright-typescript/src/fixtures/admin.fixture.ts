import { test as base, expect } from '@fixtures/test';
import { JobTitlePage } from '@pages/admin/job_title.page';
import { PayGradePage } from '@pages/admin/pay_grade.page';
import { EmploymentStatusPage } from '@pages/admin/employment_status.page';
import { JobCategoriesPage } from '@pages/admin/job_categories.page';
import { WorkShiftsPage } from '@pages/admin/work_shifts.page';
import { OrgGeneralInfoPage } from '@pages/admin/org_general_info.page';
import { OrgLocationsPage } from '@pages/admin/org_locations.page';
import { OrgStructurePage } from '@pages/admin/org_structure.page';
import { QualSkillsPage } from '@pages/admin/qual_skills.page';
import { QualEducationPage } from '@pages/admin/qual_education.page';
import { QualLicensesPage } from '@pages/admin/qual_licenses.page';
import { QualLanguagesPage } from '@pages/admin/qual_languages.page';
import { QualMembershipsPage } from '@pages/admin/qual_memberships.page';
import { NationalitiesPage } from '@pages/admin/nationalities.page';
import { UserManagementPage } from '@pages/admin/user_management.page';
import { PIMPage } from '@pages/pim/pim.page';

export type AdminFixtures = {
  jobTitlePage: JobTitlePage;
  payGradePage: PayGradePage;
  employmentStatusPage: EmploymentStatusPage;
  jobCategoriesPage: JobCategoriesPage;
  workShiftsPage: WorkShiftsPage;
  orgGeneralInfoPage: OrgGeneralInfoPage;
  orgLocationsPage: OrgLocationsPage;
  orgStructurePage: OrgStructurePage;
  qualSkillsPage: QualSkillsPage;
  qualEducationPage: QualEducationPage;
  qualLicensesPage: QualLicensesPage;
  qualLanguagesPage: QualLanguagesPage;
  qualMembershipsPage: QualMembershipsPage;
  nationalitiesPage: NationalitiesPage;
  userManagementPage: UserManagementPage;
  pimPage: PIMPage;
};

export const test = base.extend<AdminFixtures>({
  jobTitlePage: async ({ page }, use) => {
    await use(new JobTitlePage(page));
  },
  payGradePage: async ({ page }, use) => {
    await use(new PayGradePage(page));
  },
  employmentStatusPage: async ({ page }, use) => {
    await use(new EmploymentStatusPage(page));
  },
  jobCategoriesPage: async ({ page }, use) => {
    await use(new JobCategoriesPage(page));
  },
  workShiftsPage: async ({ page }, use) => {
    await use(new WorkShiftsPage(page));
  },
  orgGeneralInfoPage: async ({ page }, use) => {
    await use(new OrgGeneralInfoPage(page));
  },
  orgLocationsPage: async ({ page }, use) => use(new OrgLocationsPage(page)),
  orgStructurePage: async ({ page }, use) => use(new OrgStructurePage(page)),
  qualSkillsPage: async ({ page }, use) => use(new QualSkillsPage(page)),
  qualEducationPage: async ({ page }, use) => use(new QualEducationPage(page)),
  qualLicensesPage: async ({ page }, use) => use(new QualLicensesPage(page)),
  qualLanguagesPage: async ({ page }, use) => use(new QualLanguagesPage(page)),
  qualMembershipsPage: async ({ page }, use) => use(new QualMembershipsPage(page)),
  nationalitiesPage: async ({ page }, use) => use(new NationalitiesPage(page)),
  userManagementPage: async ({ page }, use) => use(new UserManagementPage(page)),
  pimPage: async ({ page }, use) => use(new PIMPage(page)),
});

export { expect };
