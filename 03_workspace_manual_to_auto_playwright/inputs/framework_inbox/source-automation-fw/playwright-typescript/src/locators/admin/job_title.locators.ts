import type { LocatorSpec } from '@core/locator';

export const jobTitleLocators = {
  // Navigation
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
  
  jobTitlesMenuItem: { 
    strategy: 'role', 
    role: 'menuitem', 
    name: 'Job Titles' 
  } satisfies LocatorSpec,

  // List Actions
  addButton: { 
    strategy: 'role', 
    role: 'button', 
    name: 'Add' 
  } satisfies LocatorSpec,

  // Form Fields
  jobTitleInput: { 
    strategy: 'css', 
    selector: 'div:has(> label:text-is("Job Title")) + div input' 
  } satisfies LocatorSpec,
  
  jobDescriptionTextarea: { 
    strategy: 'css', 
    selector: 'div:has(> label:text-is("Job Description")) + div textarea' 
  } satisfies LocatorSpec,
  
  jobNoteTextarea: { 
    strategy: 'css', 
    selector: 'div:has(> label:text-is("Note")) + div textarea' 
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
    selector: '.oxd-toast' 
  } satisfies LocatorSpec,
  
  errorMessage: { 
    strategy: 'css', 
    selector: '.oxd-input-group__message' 
  } satisfies LocatorSpec
};
