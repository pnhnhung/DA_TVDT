import type { LocatorSpec } from '@core/locator';

export const orgStructureLocators = {
  // Navigation
  adminMenu: { 
    strategy: 'role', 
    role: 'link', 
    name: 'Admin' 
  } satisfies LocatorSpec,
  
  topNavOrgMenu: { 
    strategy: 'css', 
    selector: '.oxd-topbar-body-nav-tab-item',
    description: 'Organization Top Menu. Use filter({ hasText: "Organization" })'
  } satisfies LocatorSpec,
  
  structureMenuItem: { 
    strategy: 'role', 
    role: 'menuitem', 
    name: 'Structure' 
  } satisfies LocatorSpec,

  // Mode Toggle
  editSwitch: {
    strategy: 'css',
    selector: '.oxd-switch-wrapper'
  } satisfies LocatorSpec,

  // Tree Nodes
  treeNode: {
    strategy: 'css',
    selector: '.oxd-tree-node-wrapper'
  } satisfies LocatorSpec,

  nodeTitle: {
    strategy: 'css',
    selector: '.org-name'
  } satisfies LocatorSpec,

  // Node Actions (Available when Edit mode is ON)
  addNodeIcon: {
    strategy: 'css',
    selector: '.bi-plus'
  } satisfies LocatorSpec,

  editNodeIcon: {
    strategy: 'css',
    selector: '.bi-pencil-fill'
  } satisfies LocatorSpec,

  deleteNodeIcon: {
    strategy: 'css',
    selector: 'i[class*="trash"]'
  } satisfies LocatorSpec,

  // Form Fields (Dialog)
  unitIdInput: {
    strategy: 'css',
    selector: 'div:has(> label:text-is("Unit Id")) + div input'
  } satisfies LocatorSpec,

  nameInput: {
    strategy: 'css',
    selector: 'div:has(> label:text-is("Name")) + div input'
  } satisfies LocatorSpec,

  descriptionTextarea: {
    strategy: 'css',
    selector: 'div:has(> label:text-is("Description")) + div textarea'
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
