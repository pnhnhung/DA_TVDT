# Testcase Oracle Review — module_admin_organization

| TC ID | Oracle | Quality | Notes | Status |
|---|---|---|---|---|
| TC_UT_ORG_01 | Toast saved; data persisted | STRONG | — | PASS |
| TC_UT_ORG_02 | Error "Required" | STRONG | — | PASS |
| TC_UT_ORG_03 | Toast + row | STRONG | — | PASS |
| TC_UT_ORG_04 | Error "Required" | STRONG | — | PASS |
| TC_UT_ORG_05 | Toast saved | ACCEPTABLE | Exact max (110?) confirm | PASS |
| TC_UT_ORG_06 | Length ≤ 110 OR error | ACCEPTABLE | — | PASS |
| TC_UT_ORG_07 | Toast + node in tree | STRONG | — | PASS |
| TC_UT_ORG_08 | Error "Required" | STRONG | — | PASS |
| TC_IT_ORG_01 | "HQ Hanoi" in dropdown | STRONG | — | PASS |
| TC_IT_ORG_02 | Department = "DevSquad" | STRONG | — | PASS |

**Oracle Gate: ✅ PASS**

---

# Automation Readiness — module_admin_organization

| TC ID | Candidate | Layer | Blocker |
|---|---|---|---|
| TC_UT_ORG_01..08 | Yes | UI | — |
| TC_IT_ORG_01 | Yes | UI | PIM dependency |
| TC_IT_ORG_02 | Yes | UI | PIM dependency + data setup |
| TC_IT_ORG_03 | Partial | UI-MultiSession | MultiSession WS03 |

---

# Exploratory Charters — module_admin_organization

## Charter 1: Subunit tree với nhiều cấp
Tạo 5 cấp Subunit lồng nhau → verify tree render đúng; verify xóa node giữa cascade đúng.

## Charter 2: Location với country dropdown
Country field empty hoặc invalid → save behavior?

## Charter 3: Subunit với character đặc biệt
Name = `&`, `<>`, emoji → display đúng trong PIM dropdown?

---

# Final Handoff Decision

**Decision: READY_FOR_AUTOMATION_PREP**

**Reason:** Oracle PASS; 10/11 `Yes`; simple CRUD module.

**Next action:**
- Build `Page_Organization` trong WS03 (3 tabs: General, Locations, Structure)
- IT_ORG_01/02 phụ thuộc `Page_PIM`
- Confirm max-length cho Location (110?) trước boundary
