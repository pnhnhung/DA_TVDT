import type { LocatorSpec } from '@core/locator';

export const leaveLocators = {
  // Common Top Menu
  applyTab: { strategy: 'text', text: 'Apply', exact: true, description: 'Apply tab' } satisfies LocatorSpec,
  myLeaveTab: { strategy: 'text', text: 'My Leave', exact: true, description: 'My Leave tab' } satisfies LocatorSpec,
  entitlementsTab: { strategy: 'text', text: 'Entitlements', description: 'Entitlements tab' } satisfies LocatorSpec,
  configureTab: { strategy: 'css', selector: 'span.oxd-topbar-body-nav-tab-item:has-text("Configure")', description: 'Configure tab dropdown' } satisfies LocatorSpec,
  leaveTypesMenu: { strategy: 'role', role: 'menuitem', name: 'Leave Types', description: 'Leave Types menu item' } satisfies LocatorSpec,
  assignLeaveTab: { strategy: 'text', text: 'Assign Leave', exact: true, description: 'Assign Leave tab' } satisfies LocatorSpec,

  // Common UI Elements
  addButton: { strategy: 'css', selector: 'button:has-text("Add")', description: 'Add button' } satisfies LocatorSpec,
  saveButton: { strategy: 'css', selector: 'button:has-text("Save")', description: 'Save button' } satisfies LocatorSpec,
  applyButton: { strategy: 'css', selector: 'button:has-text("Apply")', description: 'Apply button' } satisfies LocatorSpec,
  assignButton: { strategy: 'css', selector: 'button:has-text("Assign")', description: 'Assign button' } satisfies LocatorSpec,
  successToast: { strategy: 'css', selector: '.oxd-toast-content--success', description: 'Success toast message' } satisfies LocatorSpec,
  deleteConfirmButton: { strategy: 'css', selector: '.oxd-button--label-danger', description: 'Confirm delete button' } satisfies LocatorSpec,

  // Leave Types Form
  leaveTypeNameInput: { strategy: 'css', selector: 'div.oxd-input-group:has(label:has-text("Name")) input', description: 'Leave Type name input' } satisfies LocatorSpec,

  // Apply Leave & Assign Leave Form Elements
  leaveTypeDropdown: { strategy: 'css', selector: 'div.oxd-input-group:has(> .oxd-input-group__label-wrapper > label:has-text("Leave Type")) .oxd-select-wrapper', description: 'Leave Type dropdown' } satisfies LocatorSpec,
  employeeNameInput: { strategy: 'css', selector: 'div.oxd-input-group:has(> .oxd-input-group__label-wrapper > label:has-text("Employee Name")) input', description: 'Employee Name input' } satisfies LocatorSpec,
  fromDateInput: { strategy: 'css', selector: 'div.oxd-input-group:has(> .oxd-input-group__label-wrapper > label:has-text("From Date")) input', description: 'From Date input' } satisfies LocatorSpec,
  toDateInput: { strategy: 'css', selector: 'div.oxd-input-group:has(> .oxd-input-group__label-wrapper > label:has-text("To Date")) input', description: 'To Date input' } satisfies LocatorSpec,
  commentsTextarea: { strategy: 'css', selector: 'div.oxd-input-group:has(> .oxd-input-group__label-wrapper > label:has-text("Comments")) textarea', description: 'Comments textarea' } satisfies LocatorSpec,
};
