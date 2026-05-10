# Manual Scope: Authentication

## Scope bao gồm (In-Scope)
- **AUTH-003**: Process login (CSRF & Credential validation) -> **P1 (Critical)**. Bắt buộc test vì đây là cổng vào hệ thống.
- **AUTH-001**: Password validation -> **P1**. Bắt buộc test vì liên quan đến security.

## Scope loại trừ (Out-of-Scope / Blocked)
Các chức năng sau đang thiếu spec hoặc bị GAP, chỉ sinh TC ở mức SUGGESTED/BLOCKED:
- AUTH-004 (Logout)
- AUTH-005 (Request password reset)
- AUTH-006 (Reset password)
- AUTH-007 (Admin verify)
- LDAP Authentication (GAP-AUTH-004)
- Password Expiry / Enforce Password Change (GAP-AUTH-003)

## Risk Assessment
- **Security & Access**: Login và Password strength là rủi ro cực cao, cần ưu tiên UT kiểm tra boundary và error message.
- **Workflow Continuity**: Login thành công phải tạo session và redirect đúng.
