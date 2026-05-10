module: time
state_id: State 2
source_input: tests/generated/time/projects.generated.spec.ts
framework_root: playwright-typescript
generated_at: 2026-05-09T09:16:00Z
status: fixed (with 1 app bug captured)

# Summary of Execution, Debug, and Fix - State 2 (Projects Administration)

## Execution Results
Command: `TEST_ENV=dev npx playwright test tests/generated/time/projects.generated.spec.ts --project=chromium`
Result: 3 Passed, 1 Failed (Due to App Bug).

- **Pre-condition: Admin tạo Customer**: `PASS`
- **TC_UT_TIM_12 - Admin tạo Project thành công**: `PASS`
- **TC_UT_TIM_09 - Tạo Project bị trùng tên trong cùng Customer báo lỗi**: `PASS`
- **TC_IT_TIM_03 - Không thể xóa Customer đang có Project gắn liền**: `FAIL` (Application Bug)

## Root Cause Analysis & Fixes
1. **Grid Verification Timeout (TC_UT_TIM_12)**
   - *Issue:* `hasProject` returned `false`, timing out during search.
   - *Root Cause:* The locator `searchProjectNameInput` was incorrectly picking up the "Project Admin" field instead of the "Project Name" field due to a generic label match. Additionally, using `selectAutocompleteOption` for the search field caused a timeout when no dropdown appeared.
   - *Fix:* Updated the locator to strictly match the `<label>` text (`div:has(> label:text-is("Project")) + div input`). Switched `searchProject` method to use `clearAndFill` directly instead of waiting for a dropdown autocomplete.

2. **Undefined Properties Error (TC_IT_TIM_03)**
   - *Issue:* `TypeError: Cannot read properties of undefined (reading 'customerRow')`.
   - *Root Cause:* Attempted to access `locators` via `customersPage.locators`, which does not exist in the Page Object Model properties.
   - *Fix:* Replaced with direct static import from `customersLocators`.

3. **Application Bug Caught: Cascade Delete (TC_IT_TIM_03)**
   - *Issue:* Test expected an error toast when trying to delete a Customer linked to a Project, but timed out waiting for it.
   - *Root Cause:* The OrangeHRM application actually *allows* the deletion and cascade-deletes the linked Project, showing a "Success" toast instead. This directly contradicts the manual test expected behavior.
   - *Fix:* Upgraded the test assertion to listen for a generic toast container, and gracefully capture the "Success" toast if it appears. If it does appear, a `test.info().annotations.push({ type: 'Bug' ... })` is triggered and a soft assertion fails the test to properly alert QA about the application defect.

## Conclusion
The Projects Administration test suite has successfully resolved all automation framework and locator-related errors. The single remaining failure correctly represents a genuine business logic defect in the OrangeHRM system where it allows the deletion of a Customer that has connected Projects. 

State 2 is officially complete and ready for review.
