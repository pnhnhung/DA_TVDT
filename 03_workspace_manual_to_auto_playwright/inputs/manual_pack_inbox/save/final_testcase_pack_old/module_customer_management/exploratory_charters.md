# Exploratory Charters — Customer Management
> Workflow: 09 | Date: 2026-05-02

## Charter 1: Card Token Expiry After Deletion
**Target**: Card management
**Risk**: GMO token vẫn active sau khi xóa thẻ khỏi App
**Explore**: Xóa thẻ → dùng GMO token cũ → verify bị rejected
**Time box**: 20 phút

## Charter 2: OTP Resend với Email Change Cũ
**Target**: Email change OTP
**Risk**: OTP gửi về email cũ hay email mới?
**Explore**: Trigger email change → check OTP destination
**Time box**: 15 phút

## Charter 3: Lock Customer During 3DS2 Flow
**Target**: Mid-flow lock
**Risk**: Lock giữa 3DS2 webview → session state inconsistent
**Explore**: Admin lock customer khi 3DS2 đang ở step 2 → verify behavior App
**Time box**: 30 phút
