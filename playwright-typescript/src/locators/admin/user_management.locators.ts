import type { LocatorSpec } from '@core/locator';

export const userLocators = {
  // Navigation
  adminMenu: { 
    strategy: 'role', 
    role: 'link', 
    name: 'Admin' 
  } satisfies LocatorSpec,
  
  topNavUserManagementMenu: { 
    strategy: 'text', 
    text: 'User Management',
    exact: false
  } satisfies LocatorSpec,
  
  usersMenuItem: { 
    strategy: 'role', 
    role: 'menuitem', 
    name: 'Users' 
  } satisfies LocatorSpec,

  // List Actions
  addButton: { 
    strategy: 'role', 
    role: 'button', 
    name: 'Add' 
  } satisfies LocatorSpec,
  
  searchButton: { 
    strategy: 'role', 
    role: 'button', 
    name: 'Search' 
  } satisfies LocatorSpec,
  
  resetButton: { 
    strategy: 'role', 
    role: 'button', 
    name: 'Reset' 
  } satisfies LocatorSpec,

  // Search Fields
  searchUsernameInput: { 
    strategy: 'css', 
    selector: 'div:has(> label:text-is("Username")) + div input' 
  } satisfies LocatorSpec,
  
  searchUserRoleSelect: { 
    strategy: 'css', 
    selector: 'div:has(> label:text-is("User Role")) + div .oxd-select-wrapper' 
  } satisfies LocatorSpec,

  searchEmployeeNameInput: { 
    strategy: 'css', 
    selector: 'div:has(> label:text-is("Employee Name")) + div input' 
  } satisfies LocatorSpec,

  searchStatusSelect: { 
    strategy: 'css', 
    selector: 'div:has(> label:text-is("Status")) + div .oxd-select-wrapper' 
  } satisfies LocatorSpec,

  // Form Fields
  userRoleSelect: { 
    strategy: 'css', 
    selector: 'div:has(> label:text-is("User Role")) + div .oxd-select-wrapper' 
  } satisfies LocatorSpec,
  
  employeeNameInput: { 
    strategy: 'css', 
    selector: 'div:has(> label:text-is("Employee Name")) + div input' 
  } satisfies LocatorSpec,
  
  employeeNameOption: { 
    strategy: 'css', 
    selector: '.oxd-autocomplete-option' 
  } satisfies LocatorSpec,

  statusSelect: { 
    strategy: 'css', 
    selector: 'div:has(> label:text-is("Status")) + div .oxd-select-wrapper' 
  } satisfies LocatorSpec,

  dropdownOption: { 
    strategy: 'css', 
    selector: '.oxd-select-option' 
  } satisfies LocatorSpec,

  usernameInput: { 
    strategy: 'css', 
    selector: 'div:has(> label:text-is("Username")) + div input' 
  } satisfies LocatorSpec,
  
  passwordInput: { 
    strategy: 'css', 
    selector: 'div:has(> label:text-is("Password")) + div input[type="password"]' 
  } satisfies LocatorSpec,
  
  confirmPasswordInput: { 
    strategy: 'css', 
    selector: 'div:has(> label:text-is("Confirm Password")) + div input[type="password"]' 
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
  tableRow: { 
    strategy: 'css', 
    selector: '.oxd-table-row' 
  } satisfies LocatorSpec,
  
  tableCell: { 
    strategy: 'css', 
    selector: '.oxd-table-cell' 
  } satisfies LocatorSpec,
  
  deleteIcon: { 
    strategy: 'css', 
    selector: '.bi-trash' 
  } satisfies LocatorSpec,
  
  editIcon: { 
    strategy: 'css', 
    selector: '.bi-pencil-fill' 
  } satisfies LocatorSpec,

  // Dialogs
  confirmDeleteButton: { 
    strategy: 'role', 
    role: 'button', 
    name: 'Yes, Delete' 
  } satisfies LocatorSpec,

  // Messages
  successToast: { 
    strategy: 'css', 
    selector: '.oxd-toast-content--success' 
  } satisfies LocatorSpec,
  
  errorMessage: { 
    strategy: 'css', 
    selector: '.oxd-input-group__message' 
  } satisfies LocatorSpec,
  
  passwordMismatchError: { 
    strategy: 'text', 
    text: 'Passwords do not match' 
  } satisfies LocatorSpec
};
