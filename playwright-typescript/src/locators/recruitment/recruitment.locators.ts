import type { LocatorSpec } from '@core/locator';

export const recruitmentLocators = {
  // Navigation
  recruitmentMenu: { strategy: 'role', role: 'link', name: 'Recruitment', description: 'Recruitment menu item' } satisfies LocatorSpec,
  vacanciesTab: { strategy: 'role', role: 'link', name: 'Vacancies', description: 'Vacancies tab' } satisfies LocatorSpec,
  candidatesTab: { strategy: 'role', role: 'link', name: 'Candidates', description: 'Candidates tab' } satisfies LocatorSpec,
  
  // Common Actions
  addButton: { strategy: 'role', role: 'button', name: 'Add', description: 'Add button' } satisfies LocatorSpec,
  saveButton: { strategy: 'role', role: 'button', name: 'Save', description: 'Save button' } satisfies LocatorSpec,
  cancelButton: { strategy: 'role', role: 'button', name: 'Cancel', description: 'Cancel button' } satisfies LocatorSpec,
  successToast: { strategy: 'css', selector: '.oxd-toast-content--success', description: 'Success toast message' } satisfies LocatorSpec,
  
  // Vacancy Form
  vacancyNameInput: { strategy: 'css', selector: 'div.oxd-input-group:has(label:text-is("Vacancy Name")) input', description: 'Vacancy name input' } satisfies LocatorSpec,
  jobTitleDropdown: { strategy: 'css', selector: '.oxd-select-wrapper', description: 'Job title dropdown wrapper (first one)' } satisfies LocatorSpec,
  descriptionTextarea: { strategy: 'css', selector: 'textarea[placeholder="Type description here"]', description: 'Description textarea' } satisfies LocatorSpec,
  hiringManagerInput: { strategy: 'css', selector: 'div.oxd-input-group:has(label:text-is("Hiring Manager")) input', description: 'Hiring manager autocomplete input' } satisfies LocatorSpec,
  hiringManagerDropdownOption: { strategy: 'role', role: 'option', description: 'Autocomplete option' } satisfies LocatorSpec,
  numOfPositionsInput: { strategy: 'css', selector: 'div.oxd-input-group:has(label:text-is("Number of Positions")) input', description: 'Number of positions input' } satisfies LocatorSpec,
  activeSwitch: { strategy: 'css', selector: '.oxd-switch-wrapper', description: 'Active switch' } satisfies LocatorSpec,
  
  // Candidate Form
  firstNameInput: { strategy: 'css', selector: 'input[name="firstName"]', description: 'First name input' } satisfies LocatorSpec,
  middleNameInput: { strategy: 'css', selector: 'input[name="middleName"]', description: 'Middle name input' } satisfies LocatorSpec,
  lastNameInput: { strategy: 'css', selector: 'input[name="lastName"]', description: 'Last name input' } satisfies LocatorSpec,
  vacancyDropdown: { strategy: 'css', selector: '.oxd-select-wrapper', description: 'Vacancy dropdown wrapper' } satisfies LocatorSpec,
  emailInput: { strategy: 'css', selector: 'div.oxd-input-group:has(label:text-is("Email")) input', description: 'Email input' } satisfies LocatorSpec,
  contactNumInput: { strategy: 'css', selector: 'div.oxd-input-group:has(label:text-is("Contact Number")) input', description: 'Contact number input' } satisfies LocatorSpec,
  resumeInput: { strategy: 'css', selector: 'input[type="file"]', description: 'Resume file upload' } satisfies LocatorSpec,
  keywordsInput: { strategy: 'css', selector: 'div.oxd-input-group:has(label:text-is("Keywords")) input', description: 'Keywords input' } satisfies LocatorSpec,
  notesTextarea: { strategy: 'css', selector: 'textarea[placeholder="Type here"]', description: 'Notes textarea' } satisfies LocatorSpec,
  consentCheckbox: { strategy: 'css', selector: '.oxd-checkbox-wrapper', description: 'Consent checkbox' } satisfies LocatorSpec,
  
  // Grid / Table
  searchButton: { strategy: 'role', role: 'button', name: 'Search', description: 'Search button' } satisfies LocatorSpec,
  tableRow: { strategy: 'css', selector: '.oxd-table-card', description: 'Table row' } satisfies LocatorSpec,
  confirmDeleteButton: { strategy: 'role', role: 'button', name: 'Yes, Delete', description: 'Confirm delete button in dialog' } satisfies LocatorSpec,
};
