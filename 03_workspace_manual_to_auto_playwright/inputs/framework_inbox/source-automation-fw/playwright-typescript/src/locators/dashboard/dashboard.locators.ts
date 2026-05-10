import type { LocatorSpec } from '@core/locator';

export const dashboardLocators = {
  pageHeader: {
    strategy: 'role',
    role: 'heading',
    name: 'Dashboard',
    exact: true,
    description: 'Dashboard page heading'
  },
  userMenu: {
    strategy: 'css',
    selector: '.oxd-userdropdown-name',
    description: 'User dropdown in top bar'
  }
} satisfies Record<string, LocatorSpec>;
