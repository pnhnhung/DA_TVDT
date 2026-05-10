# Execution Round 0 — Job Title

- **Module**: admin
- **State ID**: STATE_ADMIN_JOB_TITLES
- **Command**: `npm run test:dev -- tests/generated/admin/job_title.generated.spec.ts --project=chromium --headed`
- **Timestamp**: 2026-05-08 07:20 (local)

## Results Summary

| Project | Total | Pass | Fail | Skip |
|---|---|---|---|---|
| chromium (Parallel) | 5 | 1 | 4 | 0 |
| chromium (Sequential) | 5 | 2 | 3 | 0 |

## Failure Details

### 1. [chromium] TC_UT_JOB_TITLE_01 - Tạo Job Title thành công
- **Error**: `Job Title "Auto Job Title tit-01_..." not found after searching pages.`
- **Step**: `Verify Job Title created`
- **Status**: FAILED

### 2. [chromium] TC_UT_JOB_TITLE_05 - Edit Job Title
- **Error**: `Job Title "Edit Me tit-05_..." not found after searching pages.`
- **Step**: `Edit the Job Title`
- **Status**: FAILED

### 3. [chromium] TC_UT_JOB_TITLE_06 - Delete Job Title
- **Error**: `Job Title "Delete Me tit-06_..." not found after searching pages.`
- **Step**: `Delete the Job Title`
- **Status**: FAILED

## Initial Analysis
The error is consistent across tests that involve finding a row by name in the grid. Even though the "Success" toast appears, the `findRowByName` method fails to locate the row. This could be due to:
- Timing issue (list not updated yet).
- Pagination logic skipping the page where the item is.
- Text matching issue in the grid.
