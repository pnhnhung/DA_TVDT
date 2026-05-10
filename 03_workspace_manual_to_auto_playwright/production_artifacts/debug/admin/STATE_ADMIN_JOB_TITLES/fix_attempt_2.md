# Fix Attempt 2 — Job Title

- **Module**: admin
- **State ID**: STATE_ADMIN_JOB_TITLES
- **Attempt ID**: 2
- **Root Cause Hypothesis**: 
    1. Blocking redirect wait in `save()` was too slow, causing the test to miss the Success Toast.
    2. `save()` failed on validation cases (TC03) because it expected a redirect that never happened.
- **Evidence Support**:
    - Round 1 Verify failures showed "Toast not visible" even though the page had already redirected to the list.
    - TC03 timeout in Round 1 confirmed blocking redirect issues.
- **Patch Description**:
    - Modified `save()` to use an optional, non-blocking `waitForResponse`.
    - Removed mandatory URL redirect check from `save()` to allow the test to catch the toast immediately.
    - `findRowByName` remains improved from Attempt 1.

## Patch Changed Files
- `src/pages/admin/job_title.page.ts`

## Verify Command
`npm run test:dev -- tests/generated/admin/job_title.generated.spec.ts --project=chromium --headed --workers=1`
