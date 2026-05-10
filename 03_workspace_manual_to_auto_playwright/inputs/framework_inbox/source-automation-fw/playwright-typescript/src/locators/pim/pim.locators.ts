import type { LocatorSpec } from '@core/locator';

export const pimLocators = {
  // Navigation
  pimMenu: { strategy: 'role', role: 'link', name: 'PIM', description: 'Side menu PIM link' } satisfies LocatorSpec,
  topNavEmployeeList: { strategy: 'role', role: 'link', name: 'Employee List', description: 'Top nav Employee List' } satisfies LocatorSpec,
  topNavAddEmployee: { strategy: 'role', role: 'link', name: 'Add Employee', description: 'Top nav Add Employee' } satisfies LocatorSpec,

  // Add Employee Form
  firstNameInput: { strategy: 'css', selector: 'input[name="firstName"]', description: 'First Name input' } satisfies LocatorSpec,
  middleNameInput: { strategy: 'css', selector: 'input[name="middleName"]', description: 'Middle Name input' } satisfies LocatorSpec,
  lastNameInput: { strategy: 'css', selector: 'input[name="lastName"]', description: 'Last Name input' } satisfies LocatorSpec,
  employeeIdInput: { strategy: 'css', selector: 'div:has(> label:text("Employee Id")) + div input', description: 'Employee ID input' } satisfies LocatorSpec,
  createLoginDetailsToggle: { strategy: 'css', selector: 'span.oxd-switch-input', description: 'Create Login Details toggle' } satisfies LocatorSpec,
  saveButton: { strategy: 'role', role: 'button', name: 'Save', description: 'Save button' } satisfies LocatorSpec,
  cancelButton: { strategy: 'role', role: 'button', name: 'Cancel', description: 'Cancel button' } satisfies LocatorSpec,

  // Side Tabs
  personalDetailsTab: { strategy: 'role', role: 'link', name: 'Personal Details', description: 'Personal Details side tab' } satisfies LocatorSpec,
  jobTab: { strategy: 'role', role: 'link', name: 'Job', description: 'Job side tab' } satisfies LocatorSpec,
  salaryTab: { strategy: 'role', role: 'link', name: 'Salary', description: 'Salary side tab' } satisfies LocatorSpec,
  qualificationsTab: { strategy: 'role', role: 'link', name: 'Qualifications', description: 'Qualifications side tab' } satisfies LocatorSpec,
  membershipsTab: { strategy: 'role', role: 'link', name: 'Memberships', description: 'Memberships side tab' } satisfies LocatorSpec,

  // Qualifications Form
  addEducationBtn: { strategy: 'xpath', selector: "//h6[text()='Education']/following::button[contains(., 'Add')][1]", description: 'Add Education button' } satisfies LocatorSpec,
  addSkillBtn: { strategy: 'xpath', selector: "//h6[text()='Skills']/following::button[contains(., 'Add')][1]", description: 'Add Skill button' } satisfies LocatorSpec,
  addLanguageBtn: { strategy: 'xpath', selector: "//h6[text()='Languages']/following::button[contains(., 'Add')][1]", description: 'Add Language button' } satisfies LocatorSpec,
  addLicenseBtn: { strategy: 'xpath', selector: "//h6[text()='License']/following::button[contains(., 'Add')][1]", description: 'Add License button' } satisfies LocatorSpec,
  
  // Generic Qual Save (within a section)
  qualSaveButton: { strategy: 'role', role: 'button', name: 'Save', description: 'Generic Save button for qualification sections' } satisfies LocatorSpec,

  // Qualification Form Inputs (Selects)
  educationLevelSelect: { strategy: 'css', selector: 'div:has(> label:text-is("Level")) + div .oxd-select-text-input', description: 'Education Level select' } satisfies LocatorSpec,
  skillSelect: { strategy: 'css', selector: 'div:has(> label:text-is("Skill")) + div .oxd-select-text-input', description: 'Skill select' } satisfies LocatorSpec,
  languageSelect: { strategy: 'css', selector: 'div:has(> label:text-is("Language")) + div .oxd-select-text-input', description: 'Language select' } satisfies LocatorSpec,
  fluencySelect: { strategy: 'css', selector: 'div:has(> label:text-is("Fluency")) + div .oxd-select-text-input', description: 'Fluency dropdown' } satisfies LocatorSpec,
  competencySelect: { strategy: 'css', selector: 'div:has(> label:text-is("Competency")) + div .oxd-select-text-input', description: 'Competency dropdown' } satisfies LocatorSpec,
  licenseTypeSelect: { strategy: 'css', selector: 'div:has(> label:text-is("License Type")) + div .oxd-select-text-input', description: 'License Type select' } satisfies LocatorSpec,

  // Job & Salary Tab Inputs
  jobTitleSelect: { strategy: 'css', selector: 'div.oxd-input-group:has(label:text-is("Job Title")) .oxd-select-wrapper', description: 'Job Title select' } satisfies LocatorSpec,
  employmentStatusSelect: { strategy: 'css', selector: 'div.oxd-input-group:has(label:text-is("Employment Status")) .oxd-select-wrapper', description: 'Employment Status select' } satisfies LocatorSpec,
  jobCategorySelect: { strategy: 'css', selector: 'div.oxd-input-group:has(label:text-is("Job Category")) .oxd-select-wrapper', description: 'Job Category select' } satisfies LocatorSpec,
  payGradeSelect: { strategy: 'css', selector: 'div.oxd-input-group:has(label:text-is("Pay Grade")) .oxd-select-wrapper', description: 'Pay Grade select' } satisfies LocatorSpec,
  locationSelect: { strategy: 'css', selector: 'div.oxd-input-group:has(label:text-is("Location")) .oxd-select-wrapper', description: 'Location select' } satisfies LocatorSpec,
  addSalaryBtn: { strategy: 'xpath', selector: "//h6[text()='Assigned Salary Components']/following::button[contains(., 'Add')][1]", description: 'Add Salary button' } satisfies LocatorSpec,

  membershipSelect: { strategy: 'css', selector: 'div:has(> label:text-is("Membership")) + div .oxd-select-text-input', description: 'Membership select' } satisfies LocatorSpec,
  addMembershipBtn: { strategy: 'xpath', selector: "//h6[text()='Assigned Memberships']/following::button[contains(., 'Add')][1]", description: 'Add Membership button' } satisfies LocatorSpec,

  // Personal Details Extras
  nationalitySelect: { strategy: 'css', selector: 'div:has(> label:text-is("Nationality")) + div .oxd-select-text-input', description: 'Nationality dropdown input' } satisfies LocatorSpec,
  listbox: { strategy: 'role', role: 'listbox', description: 'Dropdown listbox' } satisfies LocatorSpec,
  personalDetailsSaveButton: { strategy: 'css', selector: 'div.orangehrm-custom-fields ~ div > form button[type="submit"], div.orangehrm-edit-employee-content > div:first-of-type form button[type="submit"]', description: 'Save button in Personal Details section' } satisfies LocatorSpec,

  // Common UI
  successToast: { strategy: 'css', selector: '.oxd-toast-content--success', description: 'Success toast message' } satisfies LocatorSpec,
  errorMessage: { strategy: 'css', selector: '.oxd-input-group__message', description: 'Field error message' } satisfies LocatorSpec,
  confirmDeleteButton: { strategy: 'role', role: 'button', name: 'Yes, Delete', description: 'Confirm delete button' } satisfies LocatorSpec,
  
  // Employee List Search Grid
  searchNameInput: { strategy: 'css', selector: 'div.oxd-input-group:has(label:has-text("Employee Name")) input', description: 'Employee Name search input' } satisfies LocatorSpec,
  searchIdInput: { strategy: 'css', selector: 'div.oxd-input-group:has(label:has-text("Employee Id")) input', description: 'Employee ID search input' } satisfies LocatorSpec,
  searchButton: { strategy: 'role', role: 'button', name: 'Search', description: 'Search button' } satisfies LocatorSpec,
  resetButton: { strategy: 'role', role: 'button', name: 'Reset', description: 'Reset button' } satisfies LocatorSpec,
  
  // Grid actions
  editIcon: { strategy: 'css', selector: 'i.bi-pencil-fill', description: 'Edit icon on grid row' } satisfies LocatorSpec,
  deleteIcon: { strategy: 'css', selector: 'i.bi-trash', description: 'Delete icon on grid row' } satisfies LocatorSpec,
};
