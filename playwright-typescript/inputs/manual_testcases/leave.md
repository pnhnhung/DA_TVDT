# Manual Testcase Package - Leave Module

## Leave Types Management

### TC_LEAVE_TYPE_001
| Field | Value |
|---|---|
| Module | Leave / Configure / Leave Types |
| Title | Create new Leave Type |
| Priority | P1 |
| Type | Positive |
| Preconditions | User has Admin role. |
| Tags | `@leave`, `@leave_type`, `@smoke` |

#### Steps
| No | Action | Expected Result |
|---:|---|---|
| 1 | Login as Admin and open Leave > Configure > Leave Types | Leave Types list is displayed |
| 2 | Click Add | Add Leave Type form is displayed |
| 3 | Fill "Name" with unique text | |
| 4 | Click Save | Success message is displayed |
| 5 | Verify in Leave Types list | New Leave Type is found in the list |

### TC_LEAVE_TYPE_002
| Field | Value |
|---|---|
| Module | Leave / Configure / Leave Types |
| Title | Delete existing Leave Type |
| Priority | P2 |
| Type | Positive |
| Preconditions | A Leave Type exists |
| Tags | `@leave`, `@leave_type`, `@regression` |

#### Steps
| No | Action | Expected Result |
|---:|---|---|
| 1 | Login as Admin and open Leave > Configure > Leave Types | Leave Types list is displayed |
| 2 | Click Delete icon for a Leave Type | Confirmation dialog is displayed |
| 3 | Confirm Delete | Success message is displayed |
| 4 | Verify in Leave Types list | Leave Type is no longer found |

## Employee Apply Leave

### TC_LEAVE_APPLY_001
| Field | Value |
|---|---|
| Module | Leave / Apply |
| Title | Employee applies for leave |
| Priority | P1 |
| Type | Positive |
| Preconditions | User has ESS role (or Admin). A Leave Type exists. |
| Tags | `@leave`, `@apply_leave`, `@smoke` |

#### Steps
| No | Action | Expected Result |
|---:|---|---|
| 1 | Login and open Leave > Apply | Apply Leave form is displayed |
| 2 | Select "Leave Type" | |
| 3 | Enter "From Date" | |
| 4 | Enter "To Date" | |
| 5 | Enter "Comment" | |
| 6 | Click Apply | Success message is displayed |
| 7 | Verify in My Leave list | Leave request is shown |

## Assign Leave (Admin)

### TC_LEAVE_ASSIGN_001
| Field | Value |
|---|---|
| Module | Leave / Assign Leave |
| Title | Admin assigns leave to an employee |
| Priority | P2 |
| Type | Positive |
| Preconditions | User has Admin role. A Leave Type exists. An Employee exists. |
| Tags | `@leave`, `@assign_leave`, `@regression` |

#### Steps
| No | Action | Expected Result |
|---:|---|---|
| 1 | Login as Admin and open Leave > Assign Leave | Assign Leave form is displayed |
| 2 | Enter "Employee Name" and select | |
| 3 | Select "Leave Type" | |
| 4 | Enter "From Date" and "To Date" | |
| 5 | Click Assign | Confirm Leave Assignment dialog might appear or success message |
| 6 | Click Ok on Confirm dialog if appears | Success message is displayed |
