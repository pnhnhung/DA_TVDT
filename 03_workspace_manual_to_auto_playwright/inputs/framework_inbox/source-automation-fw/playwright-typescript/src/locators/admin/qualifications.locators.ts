import type { LocatorSpec } from '@core/locator';

export const qualificationLocators = {
  // Common Top Navigation (Qualifications Menu)
  topNavQualificationsMenu: {
    strategy: 'css',
    selector: '.oxd-topbar-body-nav-tab',
    description: 'Qualifications Top Menu. Use filter({ hasText: "Qualifications" })'
  } satisfies LocatorSpec,

  // Menu Items under Qualifications
  menuItemSkills: { strategy: 'role', role: 'menuitem', name: 'Skills' } satisfies LocatorSpec,
  menuItemEducation: { strategy: 'role', role: 'menuitem', name: 'Education' } satisfies LocatorSpec,
  menuItemLicenses: { strategy: 'role', role: 'menuitem', name: 'Licenses' } satisfies LocatorSpec,
  menuItemLanguages: { strategy: 'role', role: 'menuitem', name: 'Languages' } satisfies LocatorSpec,
  menuItemMemberships: { strategy: 'role', role: 'menuitem', name: 'Memberships' } satisfies LocatorSpec,

  // List Actions
  addButton: { strategy: 'role', role: 'button', name: 'Add' } satisfies LocatorSpec,

  // Common Form Fields
  nameInput: {
    strategy: 'css',
    selector: 'div:has(> label:text-is("Name")) + div input',
    description: 'Tên của Skill, License, Language, Membership'
  } satisfies LocatorSpec,

  levelInput: {
    strategy: 'css',
    selector: 'div:has(> label:text-is("Level")) + div input',
    description: 'Dành riêng cho màn hình Education'
  } satisfies LocatorSpec,

  descriptionTextarea: {
    strategy: 'css',
    selector: 'div:has(> label:text-is("Description")) + div textarea'
  } satisfies LocatorSpec,

  // Form Actions
  saveButton: { strategy: 'role', role: 'button', name: 'Save' } satisfies LocatorSpec,
  cancelButton: { strategy: 'role', role: 'button', name: 'Cancel' } satisfies LocatorSpec,

  // Delete Dialog Actions
  confirmDeleteButton: { strategy: 'role', role: 'button', name: 'Yes, Delete' } satisfies LocatorSpec,

  // Notifications
  successToast: { strategy: 'css', selector: '.oxd-toast-content--success' } satisfies LocatorSpec,
  errorMessage: { strategy: 'css', selector: '.oxd-input-group__message' } satisfies LocatorSpec
};
