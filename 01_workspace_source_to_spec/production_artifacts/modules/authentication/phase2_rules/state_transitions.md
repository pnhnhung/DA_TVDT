# State Transitions: Authentication

## Kết Luận

Module Authentication **không có workflow state machine** theo nghĩa của `ohrm_workflow_state_machine`. Authentication là module xử lý session/token — không có entity nào có cột `status`/`state` trong flow.

**Các "trạng thái" đối với Authentication session (không lưu DB):**
- `ANONYMOUS` — Chưa đăng nhập
- `AUTHENTICATED` — Đã đăng nhập thành công (session active)
- `SESSION_EXPIRED` — Session hết hạn (exception được throw tại `Exception/SessionExpiredException.php`)

**Reset Password flow (token-based, không phải state machine):**
- Token tạo → `ResetPasswordRequest.expired = false`
- Token dùng xong → `ResetPasswordRequest.expired = true`
- **Source**: `entity/ResetPasswordRequest.php#expired`

> **Ghi chú**: Vì không có state machine, file này chỉ ghi nhận kết luận điều tra. Automation team không cần thiết kế state transition tests cho Authentication — thay vào đó tập trung vào positive/negative login tests và password reset flow.
