# Exploratory Charters — Authentication
> Workflow: 09 | Date: 2026-05-02
> Risk-based exploration. Không trace trực tiếp tới confirmed rule.

## Charter 1: Session Security Boundaries
**Target**: Admin login flow
**Risk**: Session token có thể bị reuse hoặc không invalidate đúng
**Explore**: Thử dùng lại token sau khi logout; thử dùng token của user A cho user B
**Time box**: 30 phút

## Charter 2: IP Whitelist Edge Cases
**Target**: IP Allowlist logic
**Risk**: IPv6, CIDR block notation, loopback (127.0.0.1) có thể xử lý khác nhau
**Explore**: Thử với IPv6 addresses, CIDR notation, empty string
**Time box**: 20 phút

## Charter 3: Password Reset Race Condition
**Target**: Forgot password flow
**Risk**: 2 reset request liên tiếp — token cũ còn hiệu lực?
**Explore**: Gửi 2 reset request, dùng link cũ sau khi link mới đã được gửi
**Time box**: 20 phút

## Charter 4: OTP Timing Attack
**Target**: OTP verification
**Risk**: OTP expire time có thể bị exploit nếu quá dài
**Explore**: Gửi OTP, chờ gần hết hạn, submit — verify hành vi tại boundary
**Time box**: 15 phút
