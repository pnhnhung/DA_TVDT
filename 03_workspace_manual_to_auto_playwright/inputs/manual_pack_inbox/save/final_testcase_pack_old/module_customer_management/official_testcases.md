# Official Testcases — Customer Management
> Class: OFFICIAL | Workflow: 09 | Date: 2026-05-02

## BR_CUST_001 — Affiliate Registration

| TC ID | Title | Rule | Oracle |
|---|---|---|---|
| UT-CUST-001 | Affiliate ID hợp lệ → đăng ký thành công | BR_CUST_001 | STRONG |
| IT-CUST-001 | Affiliate ID tồn tại → Customer được tạo, visible CMS | BR_CUST_001 | STRONG |
| IT-CUST-002 | Affiliate ID không tồn tại → từ chối | BR_CUST_001 | STRONG |
| UC-CUST-001 | Full journey registration | BR_CUST_001 | ACCEPTABLE |

## BR_CUST_002 — Card Limit

| TC ID | Title | Rule | Oracle |
|---|---|---|---|
| UT-CUST-004 | Thêm thẻ khi chưa đạt limit → thành công | BR_CUST_002 | STRONG |
| UT-CUST-005 | Thêm thẻ khi đã đạt limit → rejected | BR_CUST_002 | ACCEPTABLE |
| IT-CUST-004 | Thêm thẻ hợp lệ → visible card list App | BR_CUST_002 | STRONG |
| IT-CUST-005 | Thêm thẻ khi maxCard → lỗi UI | BR_CUST_002 | ACCEPTABLE |

## BR_CUST_003 — GMO 3DS2 Registration

| TC ID | Title | Rule | Oracle |
|---|---|---|---|
| IT-CUST-003 | Đăng ký 3DS2 thành công → thẻ linked, GMO memberId tạo | BR_CUST_003 | STRONG |
| UC-CUST-002 | Full 3DS2 journey | BR_CUST_003 | ACCEPTABLE |

## BR_CUST_004 — memberId Check

| TC ID | Title | Rule | Oracle |
|---|---|---|---|
| IT-CUST-006 | Xóa thẻ cuối cùng → memberId bị xóa | BR_CUST_004 | STRONG |
| UC-CUST-003 | Full card management journey | BR_CUST_004 | ACCEPTABLE |

## BR_CUST_005 — OTP Throttle

| TC ID | Title | Rule | Oracle |
|---|---|---|---|
| UT-CUST-002 | Resend OTP nhiều lần → throttle error | BR_CUST_005 | ACCEPTABLE |
| IT-CUST-007 | Resend OTP trong giới hạn → OTP mới gửi | BR_CUST_005 | STRONG |
| IT-CUST-008 | Resend OTP vượt throttle → bị chặn | BR_CUST_005 | ACCEPTABLE |
| IT-CUST-009 | OTP sai → không kích hoạt SIM | BR_CUST_005 | STRONG |
| UC-CUST-006 | Full OTP throttle journey | BR_CUST_005 | ACCEPTABLE |

## BR_CUST_006 — Email Change Unique

| TC ID | Title | Rule | Oracle |
|---|---|---|---|
| UT-CUST-003 | Email mới trùng email hiện tại → rejected | BR_CUST_006 | STRONG |
| IT-CUST-010 | Email trùng email Customer khác → rejected | BR_CUST_006 | STRONG |
| IT-CUST-011 | Email hợp lệ → Mailhog xác nhận | BR_CUST_006 | STRONG |
| UC-CUST-004 | Full email change journey | BR_CUST_006 | ACCEPTABLE |

## CMS Management (Cross-role)

| TC ID | Title | Rule | Oracle |
|---|---|---|---|
| UT-CUST-006 | SHOP role không được lock Customer | BR_CUST_001 | STRONG |
| IT-CUST-012 | Tenant isolation: Admin A không thấy Customer B | BR_CUST_001 | STRONG |
| IT-CUST-013 | Admin lock Customer → App forced logout | BR_CUST_001 | STRONG |
| IT-CUST-014 | Admin unlock → Customer login lại được | BR_CUST_001 | STRONG |
| UC-CUST-005 | Full CMS management journey | BR_CUST_001 | ACCEPTABLE |
