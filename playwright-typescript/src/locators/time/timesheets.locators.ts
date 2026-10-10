import type { LocatorSpec } from '@core/locator';

export const timesheetsLocators = {
    // Navigation inside Time module
    myTimesheetsMenu: { strategy: 'role', role: 'menuitem', name: 'My Timesheets', description: 'My Timesheets menu item' } satisfies LocatorSpec,
    employeeTimesheetsMenu: { strategy: 'role', role: 'menuitem', name: 'Employee Timesheets', description: 'Employee Timesheets menu item' } satisfies LocatorSpec,

    // My Timesheets Page Actions
    editButton: { strategy: 'role', role: 'button', name: 'Edit', description: 'Edit Timesheet button' } satisfies LocatorSpec,
    saveButton: { strategy: 'role', role: 'button', name: 'Save', description: 'Save Timesheet button' } satisfies LocatorSpec,
    submitButton: { strategy: 'role', role: 'button', name: 'Submit', description: 'Submit Timesheet button' } satisfies LocatorSpec,
    addRowButton: { strategy: 'css', selector: 'button.orangehrm-timesheet-icon', description: 'Add Row button in Timesheet' } satisfies LocatorSpec,
    
    // Timesheet Grid Input Fields
    projectAutocompleteInput: { strategy: 'css', selector: '[placeholder="Type for hints..."]', description: 'Project Name input in Timesheet row' } satisfies LocatorSpec,
    autocompleteDropdownOption: { strategy: 'css', selector: '.oxd-autocomplete-dropdown .oxd-autocomplete-option', description: 'Autocomplete dropdown option' } satisfies LocatorSpec,
    activityDropdown: { strategy: 'css', selector: '.oxd-select-text', description: 'Activity dropdown in Timesheet row' } satisfies LocatorSpec,
    activityDropdownOption: { strategy: 'role', role: 'option', description: 'Activity dropdown option' } satisfies LocatorSpec,
    
    // Day hour inputs (Monday to Sunday) - We will locate them relative to the table row
    hoursInput: { strategy: 'css', selector: 'input.oxd-input', description: 'Hour input field in Timesheet table' } satisfies LocatorSpec,

    // Status
    statusText: { strategy: 'css', selector: '.orangehrm-timesheet-header--title p', description: 'Timesheet Status Text' } satisfies LocatorSpec,

    // Employee Timesheets Page
    employeeNameInput: { strategy: 'css', selector: 'div:has(> label:text-is("Employee Name")) + div input', description: 'Employee Name autocomplete input' } satisfies LocatorSpec,
    viewButton: { strategy: 'role', role: 'button', name: 'View', description: 'View Timesheet button' } satisfies LocatorSpec,
    
    // Toast Messages
    successToast: { strategy: 'css', selector: '.oxd-toast-content--success', description: 'Success toast message' } satisfies LocatorSpec,
    errorToast: { strategy: 'css', selector: '.oxd-toast-content--error', description: 'Error toast message' } satisfies LocatorSpec,
};
