# Spec Gap Report: Authentication

| Gap ID | Description | Impact on Testing | Action Required |
|---|---|---|---|
| GAP-AUTH-001 | PasswordStrengthService chưa extract (min length, uppercase, number, special char). | Không test được boundary password validation. | Cần bổ sung spec. |
| GAP-AUTH-002 | Thời gian hết hạn của reset token chưa rõ. | Không test được expired token. | Cần bổ sung spec. |
| GAP-AUTH-003 | EnforcePasswordRequest conditions chưa rõ. | Không test được forced password change. | Cần bổ sung spec. |
| GAP-AUTH-004 | LDAP config rules và fallback behavior chưa rõ. | Không test được LDAP login. | Cần bổ sung spec. |
| GAP-AUTH-LOGOUT | Nghiệp vụ Đăng xuất thiếu spec. | Không sinh được official testcase. | Blocked until spec is updated. |
| GAP-AUTH-RESET | Khôi phục mật khẩu thiếu spec chi tiết. | Không sinh được official testcase. | Blocked until spec is updated. |
| GAP-AUTH-ADMIN | Admin Verify thiếu spec chi tiết. | Không sinh được official testcase. | Blocked until spec is updated. |
| GAP-CROSS-001 | Dependency với `HomePageService` (module core) là GAP. | Chưa rõ route redirect. | Có thể dùng assumption: redirect to /dashboard. |
