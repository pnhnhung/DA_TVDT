import type { LocatorSpec } from '@core/locator';

export const projectsLocators = {
    // Top nav & Add
    addButton: { strategy: 'role', role: 'button', name: 'Add', description: 'Add new project button' } satisfies LocatorSpec,
    
    // Search Form
    searchProjectNameInput: { strategy: 'css', selector: 'div:has(> label:text-is("Project")) + div input', description: 'Search Project autocomplete input' } satisfies LocatorSpec,
    searchButton: { strategy: 'role', role: 'button', name: 'Search', description: 'Search project button' } satisfies LocatorSpec,
    
    // Add/Edit Form
    customerNameInput: { strategy: 'css', selector: 'div:has(> label:text-is("Customer Name")) + div input', description: 'Customer Name autocomplete input' } satisfies LocatorSpec,
    projectNameInput: { strategy: 'css', selector: 'div:has(> label:text-is("Name")) + div input', description: 'Project Name input' } satisfies LocatorSpec,
    descriptionInput: { strategy: 'css', selector: 'textarea.oxd-textarea', description: 'Project Description textarea' } satisfies LocatorSpec,
    projectAdminInput: { strategy: 'css', selector: 'div:has(> label:text-is("Project Admin")) + div input', description: 'Project Admin autocomplete input' } satisfies LocatorSpec,
    
    autocompleteDropdownOption: { strategy: 'css', selector: '.oxd-autocomplete-dropdown .oxd-autocomplete-option', description: 'Autocomplete dropdown option' } satisfies LocatorSpec,
    
    saveButton: { strategy: 'role', role: 'button', name: 'Save', description: 'Save project button' } satisfies LocatorSpec,
    cancelButton: { strategy: 'role', role: 'button', name: 'Cancel', description: 'Cancel project form button' } satisfies LocatorSpec,
    
    // Validation & Toast
    successToast: { strategy: 'css', selector: '.oxd-toast-content--success', description: 'Success toast message' } satisfies LocatorSpec,
    errorMessage: { strategy: 'css', selector: '.oxd-input-group__message', description: 'Input validation error message' } satisfies LocatorSpec,
    
    // Grid
    projectRow: { strategy: 'css', selector: '.oxd-table-card', description: 'Project table row' } satisfies LocatorSpec,
    deleteButton: { strategy: 'css', selector: '.bi-trash', description: 'Delete icon button in row' } satisfies LocatorSpec,
    editButton: { strategy: 'css', selector: '.bi-pencil-fill', description: 'Edit icon button in row' } satisfies LocatorSpec,
    
    // Delete Confirmation Modal
    confirmDeleteButton: { strategy: 'role', role: 'button', name: 'Yes, Delete', description: 'Confirm deletion button' } satisfies LocatorSpec,
};
