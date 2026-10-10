import type { LocatorSpec } from '@core/locator';

export const orgLocationsLocators = {
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
  
  locationsMenuItem: { 
    strategy: 'role', 
    role: 'menuitem', 
    name: 'Locations' 
  } satisfies LocatorSpec,

  // List Actions
  addButton: { 
    strategy: 'role', 
    role: 'button', 
    name: 'Add' 
  } satisfies LocatorSpec,

  // Form Fields
  nameInput: { 
    strategy: 'css', 
    selector: 'div:has(> label:text-is("Name")) + div input' 
  } satisfies LocatorSpec,

  cityInput: { 
    strategy: 'css', 
    selector: 'div:has(> label:text-is("City")) + div input' 
  } satisfies LocatorSpec,

  countryDropdown: {
    strategy: 'css',
    selector: 'div:has(> label:text-is("Country")) + div .oxd-select-wrapper'
  } satisfies LocatorSpec,

  countryDropdownInput: {
    strategy: 'css',
    selector: '.oxd-select-text-input' // Inside countryDropdown
  } satisfies LocatorSpec,

  // Form Actions
  saveButton: { 
    strategy: 'role', 
    role: 'button', 
    name: 'Save' 
  } satisfies LocatorSpec,
  
  cancelButton: { 
    strategy: 'role', 
    role: 'button', 
    name: 'Cancel' 
  } satisfies LocatorSpec,

  // Table & Grid
  tableBody: {
    strategy: 'css',
    selector: '.oxd-table-body'
  } satisfies LocatorSpec,

  tableRow: { 
    strategy: 'css', 
    selector: '.oxd-table-row' 
  } satisfies LocatorSpec,
  
  deleteIcon: { 
    strategy: 'css', 
    selector: '.bi-trash' 
  } satisfies LocatorSpec,

  // Dialogs
  confirmDeleteButton: { 
    strategy: 'role', 
    role: 'button', 
    name: 'Yes, Delete' 
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
