import type { LocatorSpec } from '@core/locator';

export const workShiftsLocators = {
  // Navigation
  adminMenu: { 
    strategy: 'role', 
    role: 'link', 
    name: 'Admin' 
  } satisfies LocatorSpec,
  
  topNavJobMenu: { 
    strategy: 'text', 
    text: 'Job ',
    exact: true
  } satisfies LocatorSpec,
  
  workShiftsMenuItem: { 
    strategy: 'role', 
    role: 'menuitem', 
    name: 'Work Shifts' 
  } satisfies LocatorSpec,

  // List Actions
  addButton: { 
    strategy: 'role', 
    role: 'button', 
    name: 'Add' 
  } satisfies LocatorSpec,

  // Form Fields
  shiftNameInput: { 
    strategy: 'css', 
    selector: 'div:has(> label:text-is("Shift Name")) + div input' 
  } satisfies LocatorSpec,

  timeFromInput: {
    strategy: 'css',
    selector: 'div:has(> label:text-is("From")) + div input[placeholder="hh:mm"]'
  } satisfies LocatorSpec,

  timeToInput: {
    strategy: 'css',
    selector: 'div:has(> label:text-is("To")) + div input[placeholder="hh:mm"]'
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
