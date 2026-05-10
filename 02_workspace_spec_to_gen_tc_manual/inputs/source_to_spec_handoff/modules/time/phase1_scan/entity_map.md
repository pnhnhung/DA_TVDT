# Entity Map: Time

## Entity: Timesheet

**DB Table**: `ohrm_timesheet`
**Source**: `orangehrmTimePlugin/entity/Timesheet.php`

### State Constants
| Constant | Value | Mô tả |
|---|---|---|
| `STATE_INITIAL` | `"INITIAL"` | Timesheet mới tạo, chưa được submit |
| `RESET_ACTION` | `"RESET"` | Action đặc biệt — Manager reset timesheet đã reject về lại trạng thái ban đầu |

> **Lưu ý**: Các states khác (`SUBMITTED`, `ACCEPTED`, `REJECTED`) được lưu dưới dạng string trong cột `state` — cần verify từ WorkflowStateMachine FLOW_TIME.

### Fields
| Field (PHP) | DB Column | Type | Nullable | Note |
|---|---|---|---|---|
| `id` | `timesheet_id` | integer | No | PK, AUTO_INCREMENT |
| `state` | `state` | string(255) | No | Enum-like: INITIAL, SUBMITTED, ACCEPTED, REJECTED |
| `startDate` | `start_date` | date | No | Ngày bắt đầu tuần |
| `endDate` | `end_date` | date | No | Ngày kết thúc tuần |
| `employee` | `employee_id` | integer (FK) | No | FK → `Employee.emp_number` |

### Relations
| Relation | Type | Target Entity | FK Column | Note |
|---|---|---|---|---|
| `employee` | ManyToOne | `Employee` | `employee_id` → `emp_number` | |

---

## Entity: TimesheetItem

**Source**: `orangehrmTimePlugin/entity/TimesheetItem.php`
**DB Table**: (inferred — cần đọc thêm)
**Note**: Dòng log giờ làm việc theo Project + Activity + Day trong 1 Timesheet

---

## Entity: TimesheetActionLog

**Source**: `orangehrmTimePlugin/entity/TimesheetActionLog.php`
**DB Table**: (inferred — cần đọc thêm)
**Note**: Lịch sử action (submit/approve/reject) trên Timesheet — dùng cho audit trail

---

## Entity: Project

**Source**: `orangehrmTimePlugin/entity/Project.php`
**DB Table**: (inferred — cần đọc thêm)
**Note**: Dự án mà nhân viên log giờ

---

## Entity: ProjectActivity

**Source**: `orangehrmTimePlugin/entity/ProjectActivity.php`
**DB Table**: (inferred — cần đọc thêm)
**Note**: Hoạt động cụ thể trong Project (breakdown nhỏ hơn)

---

## Entity: Customer

**Source**: `orangehrmTimePlugin/entity/Customer.php`
**DB Table**: (inferred — cần đọc thêm)
**Note**: Khách hàng — Project thuộc về Customer

---

## Entity: ProjectAdmin

**Source**: `orangehrmTimePlugin/entity/ProjectAdmin.php`
**DB Table**: (inferred — cần đọc thêm)
**Note**: Nhân viên được chỉ định làm Project Admin (có quyền approve timesheet của project)
