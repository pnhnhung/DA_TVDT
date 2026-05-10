# Integration Points: Claim

| Source Module | Target Module | Trigger (UI) | Data Passed | Observable Result | Side Effect | Source | Status |
|---|---|---|---|---|---|---|---|
| Claim | PIM | Employee tạo claim request | `employee.empNumber` | Validate employee tồn tại | | `entity/ClaimRequest.php#emp_number` | confirmed |
| Claim | Admin (Currency) | Employee chọn currency khi tạo claim | `currencyType.currency_id` | Danh sách currency từ Admin module | | `entity/ClaimRequest.php#currency_id` | confirmed |
| Claim | Admin (Claim Config) | Employee xem danh sách Claim Events khi tạo claim | `claimEvent.id` | Danh sách Event Types (Travel, Medical...) | | `entity/ClaimRequest.php#event_type_id` | confirmed |
