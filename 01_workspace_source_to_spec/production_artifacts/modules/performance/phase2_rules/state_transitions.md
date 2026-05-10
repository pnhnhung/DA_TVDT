# State Transitions: Performance

## State Machine: PerformanceReview.statusId

**State Field**: `ohrm_performance_review.status_id`
**Source**: `orangehrmPerformancePlugin/entity/PerformanceReview.php#STATUS_*`

### Valid States
| Status ID | Status Constant | Mô tả |
|---|---|---|
| `1` | `STATUS_INACTIVE` | Cycle được tạo nhưng chưa kích hoạt cho reviewer |
| `2` | `STATUS_ACTIVATED` | Admin đã activate — reviewer và reviewee có thể thấy và đánh giá |
| `3` | `STATUS_IN_PROGRESS` | Đánh giá đang diễn ra (ít nhất 1 reviewer đã bắt đầu điền) |
| `4` | `STATUS_COMPLETED` | Đánh giá hoàn tất — finalRate và finalComment được ghi |

### Transitions
| Trigger (UI) | Actor | From State | To State | API (inferred) | Precondition | Source |
|---|---|---|---|---|---|---|
| Tạo Performance Review mới | Admin | — | INACTIVE (1) | POST /api/v2/performance/reviews | | `entity/PerformanceReview.php` |
| Admin kích hoạt review cycle | Admin | INACTIVE (1) | ACTIVATED (2) | PUT /api/v2/performance/reviews/{id}/activate | Review có ít nhất 1 KPI và 1 Reviewer | `entity/PerformanceReview.php#activatedDate` |
| Reviewer bắt đầu điền đánh giá | Reviewer/Employee | ACTIVATED (2) | IN_PROGRESS (3) | (tự động khi reviewer điền lần đầu) | Reviewer trong danh sách được chỉ định | inferred |
| Admin hoàn tất review cycle | Admin | IN_PROGRESS (3) | COMPLETED (4) | PUT /api/v2/performance/reviews/{id}/complete | Tất cả reviewer đã submit | `entity/PerformanceReview.php#completedDate, finalRate, finalComment` |

> **Lưu ý**: Transitions chi tiết phụ thuộc vào WorkflowStateMachine FLOW_PERFORMANCE. Cần verify thêm từ service layer.

## State Machine: PerformanceTracker

**Note**: `PerformanceTracker` là chức năng song song (on-going tracking, không phải cycle review). Chưa được extract trạng thái cụ thể.
