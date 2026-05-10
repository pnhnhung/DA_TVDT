# Gaps: Leave

| Gap ID | Feature | Rule ID | Mô tả | Status | Confidence | Investigation Status | Action |
|---|---|---|---|---|---|---|---|
| GAP-LEA-001 | Leave Entitlement carry-forward | N/A | Business rule carry-forward balance năm cũ sang năm mới — chưa được extract rõ ràng. Chỉ biết có `carryForward` field trong LeaveType. | inferred | medium | Đã điều tra — phát hiện gap khi audit | Cần verify từ LeaveEntitlementService |
| GAP-LEA-002 | Working days calculation | N/A | Cách tính số ngày nghỉ (có trừ weekend và public holiday không) — chưa được extract đầy đủ. | inferred | medium | Đã điều tra — phát hiện gap khi audit | Cần verify từ LeaveCalculationService hoặc WorkScheduleService |
| GAP-LEA-003 | Assign Leave (Admin) | N/A | Luồng Admin gán Leave trực tiếp cho Employee — đã skip trong automation (TC_LEAVE_ASSIGN_001), chưa có spec đầy đủ. | gap | medium | Đã điều tra — phát hiện từ automation session | Cần extract từ LeaveAssignmentAPI |
| GAP-LEA-004 | Holiday calendar | N/A | Cấu hình Public Holiday và cách nó ảnh hưởng đến Leave calculation chưa được extract. | gap | medium | Đã điều tra — phát hiện gap khi audit | Cần extract từ HolidayAPI và LeaveService |
