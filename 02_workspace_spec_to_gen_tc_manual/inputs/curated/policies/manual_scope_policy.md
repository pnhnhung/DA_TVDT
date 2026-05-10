# Manual Scope Policy

## Giữ trong manual input mặc định
- Logic gây rủi ro cao nếu lỗi xảy ra:
  - Security / authorization
  - Transaction / payment
  - Data integrity / DB mapping
  - Duplicate submit / concurrency
  - Workflow continuity
  - Import / export ảnh hưởng dữ liệu
  - Batch / cron / scheduled jobs
  - Notification quan trọng
  - Password / OTP / captcha / token / session

## Chỉ giữ theo điều kiện
- Feature-specific packs:
  - Map / geolocation
  - Payment flow
  - Device/browser capability
  - Copy/paste password policy
  - Offline handling riêng cho app/module

## Không giữ thành manual input mặc định
- UI/cosmetic thuần túy
- Legend/axis/view tweaks
- Responsive nhỏ
- Common formatting checks
- Generic required / valid / invalid / boundary / sort / filter / pagination / control state
  -> các nhóm này được xử lý bằng rule/skill
