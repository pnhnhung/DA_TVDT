# Testcase Oracle Review — module_admin_configuration

| TC ID | Oracle | Quality | Issue | Improvement | Status |
|---|---|---|---|---|---|
| TC_UT_CFG_03 | Date format matches on Leave page | STRONG | — | — | PASS |
| TC_UT_CFG_04 | UI text changes to locale | ACCEPTABLE | Not all locales confirmed available | Confirm supported locales | PASS |
| TC_UT_CFG_05 | Access Denied OR redirect | ACCEPTABLE | Exact redirect URL not confirmed | Confirm once manually | PASS |
| TC_IT_CFG_01 | Time menu absent on ESS after disable | STRONG | — | — | PASS |
| TC_IT_CFG_02 | Timesheet dates in new format | STRONG | — | — | PASS |

**Oracle Gate: ✅ PASS — 0 WEAK, 0 MISSING**

---

# Automation Readiness Matrix — module_admin_configuration

| TC ID | Candidate | Layer | Key Component | Blocker |
|---|---|---|---|---|
| TC_UT_CFG_01 | Partial | UI | Page_Configuration | SMTP test server needed |
| TC_UT_CFG_02 | Partial | UI | Page_Configuration | SMTP test server needed |
| TC_UT_CFG_03 | Yes | UI | Page_Configuration + Page_Leave | Leave data needed |
| TC_UT_CFG_04 | Yes | UI | Page_Configuration | Confirm available locales |
| TC_UT_CFG_05 | Yes | UI | Page_Configuration + ESS | ESS account |
| TC_IT_CFG_01 | Yes | UI | Page_Configuration + Menu | ESS session needed |
| TC_IT_CFG_02 | Yes | UI | Page_Configuration + Page_Timesheet | Timesheet data |
| TC_IT_CFG_03 | Partial | UI-MultiSession | MultiSessionContext | MultiSession WS03 |

---

# Exploratory Charters — module_admin_configuration

## Charter 1: Config rollback behavior
**Mục tiêu:** Thay đổi Date Format → save → revert → verify không có orphan data hiển thị sai.

## Charter 2: Module disable → existing data
**Mục tiêu:** Disable Leave module → check Leave requests đang pending → re-enable → data còn không?
**Risk:** Data loss hoặc state inconsistency.

## Charter 3: Concurrent config change
**Mục tiêu:** 2 Admin sessions cùng change Date Format khác nhau → last-write-wins?
**Risk:** Config inconsistency.

## Charter 4: SMTP config với self-signed cert
**Mục tiêu:** SMTP server dùng self-signed cert → Test Connection fail? accept? error message rõ không?
