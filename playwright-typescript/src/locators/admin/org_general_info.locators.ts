import type { LocatorSpec } from '@core/locator';

export const orgGeneralInfoLocators = {
  // Navigation
  adminMenu: { 
    strategy: 'role', 
    role: 'link', 
    name: 'Admin' 
  } satisfies LocatorSpec,
  
  topNavOrgMenu: { 
    strategy: 'css', 
    selector: '.oxd-topbar-body-nav-tab-item',
    description: 'Organization Top Menu. Use filter({ hasText: "Organization" })'
  } satisfies LocatorSpec,
  
  generalInfoMenuItem: { 
    strategy: 'role', 
    role: 'menuitem', 
    name: 'General Information' 
  } satisfies LocatorSpec,

  // Form Fields & Controls
  editSwitch: {
    strategy: 'css',
    selector: '.oxd-switch-wrapper'
  } satisfies LocatorSpec,

  organizationNameInput: { 
    strategy: 'css', 
    selector: 'div:has(> label:text-is("Organization Name")) + div input' 
  } satisfies LocatorSpec,

  numEmployeesText: {
    strategy: 'css',
    selector: 'div:has(> label:text-is("Number of Employees")) + div p'
  } satisfies LocatorSpec,

  registrationNumberInput: { 
    strategy: 'css', 
    selector: 'div:has(> label:text-is("Registration Number")) + div input' 
  } satisfies LocatorSpec,

  taxIdInput: { 
    strategy: 'css', 
    selector: 'div:has(> label:text-is("Tax ID")) + div input' 
  } satisfies LocatorSpec,

  // Save Actions
  saveButton: { 
    strategy: 'role', 
    role: 'button', 
    name: 'Save' 
  } satisfies LocatorSpec,

  // Toasts
  successToast: { 
    strategy: 'css', 
    selector: '.oxd-toast-content--success' 
  } satisfies LocatorSpec,
  
  errorMessage: { 
    strategy: 'css', 
    selector: '.oxd-input-group__message' 
  } satisfies LocatorSpec
};
