# Fix Attempt 1 — Job Title

- **Module**: admin
- **State ID**: STATE_ADMIN_JOB_TITLES
- **Attempt ID**: 1
- **Root Cause Hypothesis**: 
    1. Navigation to Job Titles was flaky due to missing waits for the menu expansion.
    2. Verification failed because the test didn't wait for the redirect after saving.
    3. `findRowByName` failed because the "Next" button locator was incorrect (didn't have text "Next") and it didn't always start from page 1.
- **Evidence Support**:
    - Browser subagent confirmed the "Next" button has no text and uses `bi-chevron-right` icon.
    - Browser subagent confirmed 93 records, requiring pagination.
    - Previous failures occurred immediately after the success toast, suggesting no wait for redirect.
- **Patch Description**:
    - Improved `openJobTitles` to wait for the Job menu visibility.
    - Updated `save()` to wait for the redirect URL and list body visibility.
    - Updated `findRowByName` to:
        - Always start from Page 1.
        - Use the correct CSS locator for the "Next" button.
        - Add a small delay after pagination to allow the list to refresh.

## Patch Changed Files
- `src/pages/admin/job_title.page.ts`

## Verify Command
`npm run test:dev -- tests/generated/admin/job_title.generated.spec.ts --project=chromium --headed --workers=1`
