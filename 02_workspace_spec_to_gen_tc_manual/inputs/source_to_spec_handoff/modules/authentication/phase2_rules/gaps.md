# Gaps: Authentication

| Gap ID | Feature | Rule ID | Mô tả | Status | Confidence | Investigation Status | Action |
|---|---|---|---|---|---|---|---|
| GAP-AUTH-001 | Password strength rules | N/A | `PasswordStrengthService` và `PasswordStrengthValidationAPI` tồn tại nhưng chưa được extract đầy đủ validation rules (min length, require uppercase, số, ký tự đặc biệt). | gap | medium | Đã điều tra — file tồn tại chưa đọc | Cần đọc PasswordStrengthService và PasswordStrengthValidationAPI |
| GAP-AUTH-002 | Reset code expiry | N/A | `ResetPasswordRequest.expired` field tồn tại nhưng chưa rõ expiry time (1 giờ? 24 giờ?). | gap | medium | Đã điều tra — entity đọc được, service chưa đọc | Cần đọc ResetPasswordService để tìm expiry logic |
| GAP-AUTH-003 | EnforcePasswordRequest | N/A | Entity `EnforcePasswordRequest` tồn tại nhưng chưa extract — không biết khi nào Admin set enforce password và rules là gì. | gap | medium | Đã điều tra — chưa đọc entity đầy đủ | Cần đọc entity/EnforcePasswordRequest.php và EnforcePasswordDao |
| GAP-AUTH-004 | LDAP auth provider | N/A | `AuthProviderChain` hỗ trợ multi-provider (local + LDAP) nhưng chưa extract LDAP configuration rules và fallback behavior. | inferred | low | Đã điều tra — tồn tại trong Auth/ folder | Cần extract từ LDAP config trong Admin module |
| GAP-AUTH-005 | State Transition (không có) | N/A | Authentication module không có workflow state machine — không cần state_transitions.md. | gap | high | Xác nhận — không có state machine | Đánh dấu N/A cho state_transitions.md |
