---
trigger: always_on
---

# Rule 05 — IT Coverage: Expanded & Completeness Gate

## 5.1 IT Phải Mở Rộng Theo Các Trục

IT không được chỉ copy UT sang nhiều màn hình. Mỗi IT phải có chain rõ:

```text
Trigger → Module/Screen/API liên quan → Data/State thay đổi → Observable result → Trace
```

Áp dụng các trục sau nếu có evidence từ spec/handoff:

| # | Trục | Áp dụng khi |
|---|---|---|
| 1 | Cross-screen: form → detail → list → export/report | Luôn xem xét |
| 2 | Cross-module: module nguồn → module đích | Có module interaction map |
| 3 | Cross-role: role tạo → role duyệt → role xem kết quả | Spec có role |
| 4 | Data propagation: nhập/lưu/hiển thị/export/notification đồng nhất | Có cross-module contract |
| 5 | Workflow/state: state before → action → state after → allowed next | Có state machine |
| 6 | API/integration: lookup, external service, queue/event | Có integration |
| 7 | Notification: đúng event, đúng người nhận, đúng nội dung | Có notification |
| 8 | Import/export/report: nội dung và scope quyền khớp filter/role | Có file feature |
| 9 | Batch/scheduler: trigger, input, output, idempotency | Có async |
| 10 | Concurrency/idempotency: double submit, xử lý song song | Có risk |
| 11 | Error propagation: integration lỗi → business transaction xử lý | Spec có nêu |

**Output bắt buộc:** `it_coverage_matrix.csv`
```csv
interaction_id,testcase_id,module_flow,source_module,target_module,roles,data_object,state_before,state_after,coverage_type,observable_oracle,trace,status,priority,gap_or_note
```

## 5.2 IT Completeness Gate — Checklist Bắt Buộc

Trước khi finalize IT pack, kiểm tra từng IT-AXIS. Nếu trục áp dụng được theo spec mà không có TC → bổ sung hoặc ghi rõ lý do bỏ qua.

| IT-AXIS | Mô tả | Áp dụng khi |
|---|---|---|
| IT-AXIS-01 | Happy path integration flow chính | Luôn có |
| IT-AXIS-02 | Negative path: input sai / trạng thái không hợp lệ | Luôn có |
| IT-AXIS-03 | State transition thuận (A→B) | Có state machine |
| IT-AXIS-04 | State transition ngược (B→A, A→không thể B) | Có state machine |
| IT-AXIS-05 | Cross-role: role được phép | Spec có role |
| IT-AXIS-06 | Cross-role: role bị từ chối | Spec có role |
| IT-AXIS-07 | Data propagation: source → target đúng dữ liệu | Có cross-module contract |
| IT-AXIS-08 | Data propagation: source xóa/thay đổi → target phản ánh đúng | Có cascade/sync |
| IT-AXIS-09 | Boundary: min/max/min-1/max+1 | Có field rule limit |
| IT-AXIS-10 | Duplicate: giá trị trùng bị từ chối đúng scope | Có unique rule |
| IT-AXIS-11 | Background job: trigger → queue → worker → UI result | Có async |
| IT-AXIS-12 | Background job: worker fail/timeout → UI thông báo đúng | Có async |
| IT-AXIS-13 | Concurrency/idempotency: submit 2 lần / đồng thời | Risk cao |
| IT-AXIS-14 | Permission: guest/unauthenticated bị từ chối | Có auth gate |
| IT-AXIS-15 | File export/import: nội dung, scope, format đúng | Có file feature |
| IT-AXIS-16 | Tenant isolation: dữ liệu không lọt sang tenant khác | Có multi-tenant |
| IT-AXIS-17 | Error propagation: external service fail → system xử lý đúng | Có external integration |
| IT-AXIS-18 | Cleanup/rollback: thất bại không để lại dữ liệu thừa | Có transaction risk |

**Yêu cầu trục tối thiểu theo risk:**

| Risk Level | Trục tối thiểu |
|---|---|
| Rất cao (Security/Payment/Auth) | ≥ 12 trục |
| Cao (Cross-module/State machine) | ≥ 9 trục |
| Trung bình (CRUD + filter) | ≥ 6 trục |
| Thấp (Display only) | ≥ 3 trục |

**Hard gate:** Không finalize IT pack nếu:
- Có Confirmed Cross-module Contract không có IT nào
- State transition chỉ test 1 chiều
- Async flow chỉ test happy path, không test error/timeout
- Role permission chỉ test denied, thiếu allowed (hoặc ngược lại)
