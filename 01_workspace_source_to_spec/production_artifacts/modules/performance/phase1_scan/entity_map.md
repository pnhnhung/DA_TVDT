# Entity Map: Performance

## Entity: PerformanceReview

**DB Table**: `ohrm_performance_review`
**Source**: `orangehrmPerformancePlugin/entity/PerformanceReview.php`

### Status Constants
| Constant | Value | Mô tả |
|---|---|---|
| `STATUS_INACTIVE` | `1` | Đánh giá được tạo nhưng chưa kích hoạt |
| `STATUS_ACTIVATED` | `2` | Đánh giá đã được kích hoạt, nhân viên/reviewer có thể xem |
| `STATUS_IN_PROGRESS` | `3` | Reviewer đang thực hiện đánh giá |
| `STATUS_COMPLETED` | `4` | Đánh giá hoàn tất |

### Fields
| Field (PHP) | DB Column | Type | Nullable | Note |
|---|---|---|---|---|
| `id` | `id` | integer(7) | No | PK, AUTO_INCREMENT |
| `statusId` | `status_id` | integer(7) | Yes | Enum: 1=INACTIVE, 2=ACTIVATED, 3=IN_PROGRESS, 4=COMPLETED |
| `reviewPeriodStart` | `work_period_start` | date | Yes | |
| `reviewPeriodEnd` | `work_period_end` | date | Yes | |
| `dueDate` | `due_date` | date | Yes | |
| `completedDate` | `completed_date` | date | Yes | Điền khi status=COMPLETED |
| `activatedDate` | `activated_date` | datetime | Yes | Điền khi status=ACTIVATED |
| `finalComment` | `final_comment` | text | Yes | Nhận xét cuối của người đánh giá |
| `finalRate` | `final_rate` | decimal(18,2) | Yes | Điểm tổng cuối |
| `jobTitle` | `job_title_code` | integer (FK) | Yes | FK → `JobTitle.id` |
| `subunit` | `department_id` | integer (FK) | Yes | FK → `Subunit.id` |
| `employee` | `employee_number` | integer (FK) | Yes | FK → `Employee.emp_number` (nhân viên được đánh giá) |

### Relations
| Relation | Type | Target Entity | FK Column | Note |
|---|---|---|---|---|
| `employee` | ManyToOne | `Employee` | `employee_number` → `emp_number` | nullable |
| `jobTitle` | ManyToOne | `JobTitle` | `job_title_code` → `id` | nullable |
| `subunit` | ManyToOne | `Subunit` | `department_id` → `id` | nullable |
| `reviewers` | OneToMany | `Reviewer` | `review_id` | Danh sách reviewer (có thể nhiều người) |
| `reviewerRatings` | ManyToMany | `ReviewerRating` | `review_id` | Điểm chi tiết từng KPI |

---

## Entity: Reviewer

**Source**: `orangehrmPerformancePlugin/entity/Reviewer.php`
**DB Table**: (inferred — cần xác nhận)
**Note**: Liên kết PerformanceReview với các reviewer cụ thể (Supervisor, Employee tự đánh giá)

---

## Entity: Kpi

**Source**: `orangehrmPerformancePlugin/entity/Kpi.php`
**DB Table**: (inferred — cần đọc thêm)
**Note**: Key Performance Indicator — các tiêu chí đánh giá

---

## Entity: PerformanceTracker

**Source**: `orangehrmPerformancePlugin/entity/PerformanceTracker.php`
**DB Table**: (inferred — cần đọc thêm)
**Note**: Chức năng track performance theo thời gian thực (khác với cycle review)
