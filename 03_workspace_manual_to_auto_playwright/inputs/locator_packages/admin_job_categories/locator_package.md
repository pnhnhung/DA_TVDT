# Admin Job Categories - Locator Package

## Module: Admin > Job > Job Categories

| Component | Strategy | Locator Value | Description | Status |
|---|---|---|---|---|
| **admin_menu** | `role` | `link`, { name: 'Admin' } | Left sidebar Admin menu | VERIFIED |
| **top_nav_job_menu** | `text` | `'Job '`, { exact: true } | Top navigation Job dropdown | VERIFIED |
| **job_categories_menu_item** | `role` | `menuitem`, { name: 'Job Categories' } | Job Categories item in Job dropdown | VERIFIED |
| **add_button** | `role` | `button`, { name: 'Add' } | Add button on Job Categories list | VERIFIED |
| **name_input** | `label` | `'Name'` | Input for Job Category name | VERIFIED |
| **save_button** | `role` | `button`, { name: 'Save' } | Save button on form | VERIFIED |
| **cancel_button** | `role` | `button`, { name: 'Cancel' } | Cancel button on form | VERIFIED |
| **success_toast** | `css` | `.oxd-toast-content--success` | Success message notification | VERIFIED |
| **table_row** | `css` | `.oxd-table-row` | Row in the data table | VERIFIED |
| **delete_icon** | `css` | `.bi-trash` | Delete icon within a row | VERIFIED |
| **edit_icon** | `css` | `.bi-pencil-fill` | Edit icon within a row | VERIFIED |
| **dialog_confirm_delete** | `role` | `button`, { name: 'Yes, Delete' } | Confirmation button in delete dialog | VERIFIED |

## Evidence
- Extracted and verified directly from the Playwright test Chromium context.
- Screenshot path: `ai_debug/locator_evidence/job_category.png`
- HTML DOM saved at: `ai_debug/locator_evidence/job_category_dom_list.html` and `job_category_dom_form.html`
