# Exploratory Charters — Contract Management
> Workflow: 09 | Date: 2026-05-02

## Charter 1: Payment Flow Edge Cases
**Target**: MPM 4-step payment
**Risk**: Network timeout hoặc partial failure giữa payEntry và payConfirm
**Explore**: Ngắt kết nối sau step 2, verify Tx status và recovery
**Time box**: 30 phút

## Charter 2: Cancel Transaction Race
**Target**: cancelEntry + cancelSubmit
**Risk**: Network failure giữa 2 bước → trạng thái inconsistent
**Explore**: Gửi cancelEntry thành công, fail cancelSubmit — Tx có revert về SUCCESS không?
**Time box**: 30 phút

## Charter 3: Fee Calculation Edge Cases
**Target**: membershipFee priority
**Risk**: Khi có cả 3 mức fee → UI hiển thị fee nào?
**Explore**: Test với Contract có fee, Shop có fee khác, Service có fee khác — App hiển thị fee nào?
**Time box**: 20 phút

## Charter 4: QR Code Expiry
**Target**: QR contract generation
**Risk**: QR có thể expire sau thời gian nhất định
**Explore**: Tạo QR, chờ, quét QR cũ — behavior có rõ ràng không?
**Time box**: 20 phút
