# Entity Map: Claim

## Entity: ClaimRequest

**DB Table**: `ohrm_claim_request`
**Source**: `orangehrmClaimPlugin/entity/ClaimRequest.php`

### Status Constants
| Constant | Value | Mô tả |
|---|---|---|
| `REQUEST_STATUS_INITIATED` | `"INITIATED"` | Yêu cầu vừa được tạo, chưa nộp |

> **Lưu ý**: Từ entity chỉ thấy `INITIATED`. Các trạng thái khác (`SUBMITTED`, `APPROVED`, `REJECTED`, `CANCELLED`) được lưu dưới dạng string trong cột `status` — cần verify từ WorkflowStateMachine.

### Fields
| Field (PHP) | DB Column | Type | Nullable | Constraint | Note |
|---|---|---|---|---|---|
| `id` | `id` | bigint | No | PK, AUTO_INCREMENT | |
| `employee` | `emp_number` | integer (FK) | No | FK → `Employee.emp_number` | Nhân viên làm claim |
| `user` | `added_by` | integer (FK) | No | FK → `User.id` | User tạo claim |
| `referenceId` | `reference_id` | string(255) | No | | Mã tham chiếu |
| `claimEvent` | `event_type_id` | integer (FK) | No | FK → `ClaimEvent.id` | Loại sự kiện claim |
| `description` | `description` | string(255) | Yes | | Mô tả |
| `currencyType` | `currency_id` | string (FK) | No | FK → `CurrencyType.currency_id` | cascade persist |
| `isDeleted` | `is_deleted` | boolean | No | Default: false | Soft delete |
| `status` | `status` | string(255) | No | Enum-like: xem state_transitions.md | |
| `createdDate` | `created_date` | datetime | No | | |
| `submittedDate` | `submitted_date` | datetime | Yes | | Null nếu chưa submit |

### Relations
| Relation | Type | Target Entity | FK Column | Note |
|---|---|---|---|---|
| `employee` | ManyToOne | `Employee` | `emp_number` → `emp_number` | |
| `user` | ManyToOne | `User` | `added_by` → `id` | |
| `claimEvent` | ManyToOne | `ClaimEvent` | `event_type_id` → `id` | |
| `currencyType` | OneToOne | `CurrencyType` | `currency_id` | cascade persist |

---

## Entity: ClaimEvent

**Source**: `orangehrmClaimPlugin/entity/ClaimEvent.php`
**DB Table**: (inferred — cần đọc thêm)
**Note**: Định nghĩa loại claim (ví dụ: Travel, Medical, Training)

---

## Entity: ClaimExpense

**Source**: `orangehrmClaimPlugin/entity/ClaimExpense.php`
**DB Table**: (inferred — cần đọc thêm)
**Note**: Chi tiết từng khoản chi trong một ClaimRequest

---

## Entity: ExpenseType

**Source**: `orangehrmClaimPlugin/entity/ExpenseType.php`
**DB Table**: (inferred — cần đọc thêm)
**Note**: Loại chi phí (Travel, Accommodation, Meals, v.v.)

---

## Entity: ClaimAttachment

**Source**: `orangehrmClaimPlugin/entity/ClaimAttachment.php`
**DB Table**: (inferred — cần đọc thêm)
**Note**: File đính kèm hoá đơn/chứng từ
