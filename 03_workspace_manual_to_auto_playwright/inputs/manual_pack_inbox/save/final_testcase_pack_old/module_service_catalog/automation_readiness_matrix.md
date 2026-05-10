# Automation Readiness Matrix — Service Catalog
> Workflow: 09 | Date: 2026-05-02

| Testcase ID | Automation readiness | Blocker | Required data | Required locator/helper | Notes |
|---|---|---|---|---|---|
| IT-SERV-001 | READY | — | `ServiceContextSwitcher` | API test cross-tenant headers | Helper switch tenant cần build |
| IT-SERV-003 | READY | — | DB: MASTER config | `CMSClientPage.assertMasterHidden()` | — |
| IT-SERV-004 | NEED_LOCATOR | App maintenance screen | DB: Status=INACTIVE | `AppHomePage.assertMaintenance()` | — |
| IT-SERV-006 | READY | — | Invalid Category ID | `CMSMenuPage.submit()`, `.error-category` | — |
| IT-SERV-010 | READY | — | Empty Contract | `CMSEstimatePage.submit()`, `.error-contract` | — |
| IT-SERV-012 | NEED_LOCATOR | Delete popup | Estimate linked | `CMSContractPage.delete()`, popup assert | Linked to Contract Mod |
