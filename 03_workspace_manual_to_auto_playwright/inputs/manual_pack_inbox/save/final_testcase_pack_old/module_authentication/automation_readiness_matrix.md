# Automation Readiness Matrix — Authentication
> Workflow: 09 | Date: 2026-05-02

| Testcase ID | Automation readiness | Blocker | Required data | Required locator/API/helper | Notes |
|---|---|---|---|---|---|
| IT-AUTH-001 | READY | — | DB: allowedIps=[test-IP] | `LoginPage.fillAndSubmit()`, `CMSHomePage.assertVisible()` | — |
| IT-AUTH-002 | READY | — | DB: allowedIps=[other-IP] | `LoginPage.fillAndSubmit()`, assert 403 screen | — |
| IT-AUTH-003 | READY | — | DB: allowedIps=[] | Same as above | — |
| IT-AUTH-004 | NEED_LOCATOR | DOM locator IP whitelist form | DB: IP in list | `IPWhitelistPage.deleteIP()`, wait, login again | — |
| IT-AUTH-005 | NEED_TEST_DATA | Lockout threshold chưa confirm | N sai attempts | `LoginPage` × N loop | Confirm N trước |
| IT-AUTH-006 | NEED_TEST_DATA | Threshold chưa confirm | N-1 sai attempts | Same | Confirm N-1 |
| IT-AUTH-007 | NEED_LOCATOR | DOM: locked account msg | DB: locked account | `LoginPage.assertLockedMsg()` | — |
| IT-AUTH-008 | NEED_TEST_DATA | blockedTo duration | Timer wait | Time-based assertion | Confirm wait time |
| IT-AUTH-010 | NEED_LOCATOR | App ForgotPassword locator | Mailhog setup | `ForgotPasswordPage`, `MailhogHelper.getLatestEmail()` | — |
| IT-AUTH-011 | NEED_LOCATOR | Force change password screen | Temp password | `ChangePasswordPage.assertRequired()` | — |
| IT-AUTH-012 | NEED_TEST_DATA | Password TTL | Time wait | Time-based assertion | — |
| IT-AUTH-013 | NEED_LOCATOR | New device detection (User-Agent) | Mailhog + fake UA | `MailhogHelper.getLatestOTP()` | — |
| IT-AUTH-014 | NEED_LOCATOR | OTP input screen locator | OTP from Mailhog | `OTPPage.submitOTP(code)` | — |
| IT-AUTH-015 | NEED_LOCATOR | OTP error message locator | Wrong OTP | `OTPPage.assertError()` | — |
| IT-AUTH-016 | NEED_LOCATOR | Trusted device skip OTP | DB: trusted device | Login flow → skip OTP screen | — |
| IT-AUTH-017 | READY | — | OTP string >6 chars | `OTPPage.fillCode(longString)` | — |
| IT-AUTH-018 | NEED_TEST_DATA | Token TTL | Wait for expire | Expired token → 401 assertion | — |
| UT-AUTH-009 | READY | — | Empty OTP | `OTPPage.submitEmpty()` | — |
| UC-AUTH-001 | NEED_LOCATOR | Multiple screen locators | Full seeder | Full flow chain | — |
| UC-AUTH-002 | NEED_LOCATOR | Multiple screen + App locators | Full seeder | Full flow chain | — |
| UC-AUTH-003 | NEED_LOCATOR | Multiple screen locators | Mailhog + seeder | Full flow chain | — |
| UC-AUTH-004 | NEED_LOCATOR | Multiple screen locators | Mailhog + seeder | Full flow chain | — |
| IT-AUTH-025~028 | BLOCKED | Concurrency setup required | Race condition setup | Load test tooling | Partial only |
