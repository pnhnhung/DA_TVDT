# Integration Points: Leave Module

| Source Module | Target Module | Trigger | Data Passed | Observable Result | Side Effect | Source | Status |
|---|---|---|---|---|---|---|---|
| Admin | Leave | Tạo Holiday | | Ngày nghỉ được thiết lập | Không trừ phép vào ngày này | inferred | inferred |
| PIM | Leave | Lọc Location/Subunit | `locationId`, `subunitId` | Danh sách nhân viên | Dùng để Bulk Assign Entitlements | `Api/LeaveEntitlementAPI.php` | confirmed |
| PIM | Leave | Tạo Employee | Employee ID | Có thể cấp quỹ phép cho nhân viên | | inferred | inferred |
| PIM | Leave | Đổi Joined Date | Employee ID, Date | `JoinedDateChangedEvent` | Tính toán lại quỹ phép tự động | `PIM JobDetailAPI` | confirmed |
