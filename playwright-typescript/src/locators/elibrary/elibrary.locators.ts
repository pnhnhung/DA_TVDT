import type { LocatorSpec } from '@core/locator';

export const elibraryLocators = {
  usernameInput: {
    strategy: 'label',
    label: 'Tên đăng nhập',
    exact: true,
    description: 'eOffice username input'
  } satisfies LocatorSpec,
  passwordInput: {
    strategy: 'label',
    label: 'Mật khẩu',
    exact: true,
    description: 'eOffice password input'
  } satisfies LocatorSpec,
  loginButton: {
    strategy: 'role',
    role: 'button',
    name: 'Đăng nhập',
    exact: true,
    description: 'eOffice login button'
  } satisfies LocatorSpec,
  libraryMenuLink: {
    strategy: 'css',
    selector: 'a[href="/library"]',
    description: 'Thư viện điện tử navigation link'
  } satisfies LocatorSpec,
  searchInput: {
    strategy: 'css',
    selector: '[role="search"] input[type="search"]',
    description: 'E-Library search input'
  } satisfies LocatorSpec,
  searchButton: {
    strategy: 'css',
    selector: '[role="search"] button:has(ui-icon[name="search"])',
    description: 'E-Library submit search button'
  } satisfies LocatorSpec,
  voiceSearchButton: {
    strategy: 'css',
    selector: '[role="search"] button[aria-label^="Tìm bằng giọng nói"]',
    description: 'E-Library voice search button'
  } satisfies LocatorSpec,
  resultCards: {
    strategy: 'css',
    selector: 'section[aria-label^="Kết quả tìm kiếm"] article[role="button"]',
    description: 'E-Library search result cards'
  } satisfies LocatorSpec,
  resultCount: {
    strategy: 'css',
    selector: 'section[aria-label^="Kết quả tìm kiếm"] p[role="status"] strong',
    description: 'E-Library search result count'
  } satisfies LocatorSpec
} satisfies Record<string, LocatorSpec>;
