# Automation Readiness Matrix — Media & UI
> Workflow: 09 | Date: 2026-05-02

| Testcase ID | Automation readiness | Blocker | Required data | Required locator/helper | Notes |
|---|---|---|---|---|---|
| IT-MED-001 | READY | — | Valid image file | `CMSGalleryPage.upload()`, App assert visible | File path must be absolute |
| IT-MED-002 | NEED_TEST_DATA | Limit not confirmed | Oversized image | `CMSGalleryPage.assertSizeError()` | Wait limit |
| IT-MED-003 | NEED_TEST_DATA | Mimes not confirmed | Invalid mime file | `CMSGalleryPage.assertMimeError()` | Wait mime list |
| IT-MED-005 | READY | — | Category seeder | `CMSTopItemPage.add()` | — |
| IT-MED-008 | NEED_LOCATOR | App Like DOM | Shop seeder | `AppShopPage.clickLike()`, check API | — |
| IT-MED-009 | NEED_LOCATOR | App Unlike DOM | Shop with Like | `AppShopPage.clickUnlike()`, check API | — |
| IT-MED-011 | READY | — | Other tenant shop | API call POST like | Expect 403 |
