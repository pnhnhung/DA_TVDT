import type { LocatorSpec } from '@core/locator';

export const payGradeLocators = {
  // Navigation (Reused from job titles if needed, or specific)
  adminMenu: { 
    strategy: 'role', 
    role: 'link', 
    name: 'Admin' 
  } satisfies LocatorSpec,
  
  topNavJobMenu: { 
    strategy: 'text', 
    text: 'Job',
    exact: true
  } satisfies LocatorSpec,
  
  payGradesMenuItem: { 
    strategy: 'role', 
    role: 'menuitem', 
    name: 'Pay Grades' 
  } satisfies LocatorSpec,

  // List Actions
  addButton: { 
    strategy: 'css', 
    selector: 'button:has-text("Add")' 
  } satisfies LocatorSpec, // Use CSS or robust locator because there are multiple Add buttons on edit page

  // Form Fields - Pay Grade
  nameInput: { 
    strategy: 'css', 
    selector: 'div:has(> label:text-is("Name")) + div input' 
  } satisfies LocatorSpec,

  // Form Actions - Pay Grade
  saveButton: { 
    strategy: 'css', 
    selector: 'button[type="submit"]' 
  } satisfies LocatorSpec,

  // Currency Section
  addCurrencyButton: {
    strategy: 'css',
    selector: 'div:has(> h6:text-is("Currencies")) button:has-text("Add")'
  } satisfies LocatorSpec,

  currencySelect: {
    strategy: 'css',
    selector: '.oxd-select-text-input'
  } satisfies LocatorSpec,

  currencyListbox: {
    strategy: 'role',
    role: 'listbox'
  } satisfies LocatorSpec,

  minSalaryInput: {
    strategy: 'css',
    selector: 'div:has(> label:text-is("Minimum Salary")) + div input'
  } satisfies LocatorSpec,

  maxSalaryInput: {
    strategy: 'css',
    selector: 'div:has(> label:text-is("Maximum Salary")) + div input'
  } satisfies LocatorSpec,

  // The second save button is inside the currency form
  saveCurrencyButton: {
    strategy: 'css',
    selector: 'form.oxd-form:has(label:text-is("Currency")) button[type="submit"]'
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
    selector: '.oxd-toast--success' 
  } satisfies LocatorSpec,
  
  errorMessage: { 
    strategy: 'css', 
    selector: '.oxd-input-group__message' 
  } satisfies LocatorSpec
};
