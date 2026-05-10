# Official Testcases — module_admin_organization

| TC ID | Title | Level | Priority | Rule ID | Oracle | Precondition | Test Data | Steps | Expected Result |
|---|---|---|---|---|---|---|---|---|---|
| TC_UT_ORG_01 | Update General Info thành công | UT | P1 | R_ORG_01 | STRONG | Admin logged in | name="OrangeHRM Inc" | Config → General → fill → Save | Toast saved; data persisted after reload |
| TC_UT_ORG_02 | General Info thiếu Name | UT | P1 | R_ORG_02 | STRONG | Admin logged in | name="" | Fill empty name → Save | Error "Required" |
| TC_UT_ORG_03 | Tạo Location thành công | UT | P1 | R_ORG_03 | STRONG | Admin logged in | name="HQ Hanoi" | Add Location → fill → Save | Toast + row |
| TC_UT_ORG_04 | Location thiếu Name | UT | P1 | R_ORG_04 | STRONG | Admin logged in | name="" | Add → empty → Save | Error "Required" |
| TC_UT_ORG_05 | Location = 110 ký tự (max) | UT | P1 | R_ORG_05 | ACCEPTABLE | Admin logged in | name=110 chars | Add → fill 110 → Save | Toast saved |
| TC_UT_ORG_06 | Location = 111 ký tự (max+1) | UT | P1 | R_ORG_05 | ACCEPTABLE | Admin logged in | name=111 chars | Type 111 chars | Length ≤ 110 OR error |
| TC_UT_ORG_07 | Tạo Subunit thành công | UT | P1 | R_ORG_06 | STRONG | Admin logged in | unit_name="Engineering" | Add Subunit → fill → Save | Toast + node in tree |
| TC_UT_ORG_08 | Subunit thiếu Name | UT | P1 | R_ORG_07 | STRONG | Admin logged in | name="" | Add → empty → Save | Error "Required" |
| TC_IT_ORG_01 | Location → PIM Job tab | IT | P1 | BR_ORG_01 | STRONG | "HQ Hanoi" exists; E1 exists | location="HQ Hanoi" | PIM → E1 → Job tab → Location dropdown | "HQ Hanoi" selectable |
| TC_IT_ORG_02 | Subunit rename → PIM reflects | IT | P1 | BR_ORG_02 | STRONG | "DevTeam" exists; Employee in DevTeam | — | Rename "DevTeam" → "DevSquad" | PIM Employee: department = "DevSquad" |

# Suggested Testcases — module_admin_organization

| TC ID | Title | Lý do | Unblock condition |
|---|---|---|---|
| TC_IT_ORG_03 | Race condition: xóa Location lúc HR assign | Server behavior unconfirmed | Dev confirm |

# Testcase Coverage Matrix — module_admin_organization

| Rule ID | Rule Statement | Level | TC IDs | Status | Notes |
|---|---|---|---|---|---|
| R_ORG_01-02 | General Info required Name | UT | TC_UT_ORG_01, 02 | FULL | — |
| R_ORG_03-04 | Location required Name | UT | TC_UT_ORG_03, 04 | FULL | — |
| R_ORG_05 | Location max-length | UT | TC_UT_ORG_05, 06 | PARTIAL | Exact confirm needed |
| R_ORG_06-07 | Subunit CRUD | UT | TC_UT_ORG_07, 08 | PARTIAL | Delete/cascade missing |
| BR_ORG_01 | Location → PIM | IT | TC_IT_ORG_01 | FULL | — |
| BR_ORG_02 | Subunit name propagation | IT | TC_IT_ORG_02 | FULL | — |
| BR_ORG_RACE | Race condition | IT | TC_IT_ORG_03 | BLOCKED_BY_SPEC_GAP | SUGGESTED |
