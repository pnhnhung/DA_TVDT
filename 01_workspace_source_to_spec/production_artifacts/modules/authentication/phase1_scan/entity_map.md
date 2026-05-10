# Entity Map: Authentication

## Entity: LoginLog

**DB Table**: `ohrm_login`
**Source**: `orangehrmAuthenticationPlugin/entity/LoginLog.php`

### Fields
| Field (PHP) | DB Column | Type | Nullable | Note |
|---|---|---|---|---|
| `id` | `id` | integer | No | PK, AUTO_INCREMENT |
| `userId` | `user_id` | integer | No | ID người dùng đăng nhập |
| `userName` | `user_name` | string(255) | Yes | Username tại thời điểm đăng nhập |
| `userRoleName` | `user_role_name` | string(100) | No | Role name (Admin, ESS, v.v.) |
| `userRolePredefined` | `user_role_predefined` | integer | No | 1=predefined role, 0=custom |
| `loginTime` | `login_time` | datetime | No | Auto-set trong constructor = NOW() |

---

## Entity: ResetPasswordRequest

**DB Table**: `ohrm_reset_password`
**Source**: `orangehrmAuthenticationPlugin/entity/ResetPasswordRequest.php`

### Fields
| Field (PHP) | DB Column | Type | Nullable | Constraint | Note |
|---|---|---|---|---|---|
| `id` | `id` | integer | No | PK, AUTO_INCREMENT | |
| `resetEmail` | `reset_email` | string(60) | No | | Email nhận link reset |
| `resetRequestDate` | `reset_request_date` | datetime | No | | Thời gian yêu cầu |
| `resetCode` | `reset_code` | string(200) | No | | Token bí mật — link reset sẽ chứa code này |
| `expired` | `expired` | boolean | No | | True khi link đã hết hạn hoặc đã sử dụng |

---

## Entity: EnforcePasswordRequest

**Source**: `orangehrmAuthenticationPlugin/entity/EnforcePasswordRequest.php`
**DB Table**: (inferred — chưa đọc đầy đủ)
**Note**: Dùng khi Admin enforce user phải đổi password lần đầu đăng nhập (weak password enforcement)

---

## Entity: UserAuthProvider

**Source**: `orangehrmAuthenticationPlugin/entity/UserAuthProvider.php`
**DB Table**: (inferred — chưa đọc đầy đủ)
**Note**: Liên kết User với Auth Provider (local, LDAP). Hỗ trợ multi-auth-provider.
