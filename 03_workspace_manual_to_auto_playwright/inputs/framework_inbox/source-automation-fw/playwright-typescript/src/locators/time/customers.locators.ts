import type { LocatorSpec } from '@core/locator';

export const customersLocators = {
    // Top nav & Add
    addButton: { strategy: 'role', role: 'button', name: 'Add', description: 'Add new customer button' } satisfies LocatorSpec,
    
    // Add/Edit Form
    nameInput: { strategy: 'css', selector: 'div:has(> label:text-is("Name")) + div input', description: 'Customer Name input' } satisfies LocatorSpec,
    descriptionInput: { strategy: 'css', selector: 'div:has(> label:text-is("Description")) + div textarea', description: 'Customer Description textarea' } satisfies LocatorSpec,
    saveButton: { strategy: 'role', role: 'button', name: 'Save', description: 'Save customer button' } satisfies LocatorSpec,
    cancelButton: { strategy: 'role', role: 'button', name: 'Cancel', description: 'Cancel customer form button' } satisfies LocatorSpec,
    
    // Validation & Toast
    successToast: { strategy: 'css', selector: '.oxd-toast-content--success', description: 'Success toast message' } satisfies LocatorSpec,
    errorToast: { strategy: 'css', selector: '.oxd-toast-content--error', description: 'Error toast message' } satisfies LocatorSpec,
    errorMessage: { strategy: 'css', selector: '.oxd-input-group__message', description: 'Input validation error message' } satisfies LocatorSpec,
    
    // Grid
    customerRow: { strategy: 'css', selector: '.oxd-table-card', description: 'Customer table row' } satisfies LocatorSpec,
    deleteButton: { strategy: 'css', selector: '.bi-trash', description: 'Delete icon button in row' } satisfies LocatorSpec,
    editButton: { strategy: 'css', selector: '.bi-pencil-fill', description: 'Edit icon button in row' } satisfies LocatorSpec,
    
    // Delete Confirmation Modal
    confirmDeleteButton: { strategy: 'role', role: 'button', name: 'Yes, Delete', description: 'Confirm deletion button' } satisfies LocatorSpec,
};
