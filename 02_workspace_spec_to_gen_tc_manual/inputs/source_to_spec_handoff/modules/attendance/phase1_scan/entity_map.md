# Entity Map: Attendance

| Entity / Model | Core Fields | Constraints / Rules | Related Entities | Source Trace | Status |
|---|---|---|---|---|---|
| **AttendanceRecord** | id (int), punchInUtcTime (datetime), punchInNote (255), punchOutUtcTime (datetime), punchOutNote (255), state (string) | state values: PUNCHED IN, PUNCHED OUT | Employee | `AttendancePlugin/entity/AttendanceRecord.php#33[entity]` | confirmed |
| **AttendanceConfiguration** | canEmployeeEditAttendance, canEmployeeCreateAttendance, canEmployeeDeleteAttendance | Boolean flags | - | `AttendancePlugin/Dto/AttendanceConfiguration.php#22[dto]` | inferred |

## Detailed Fields: AttendanceRecord
| Field (PHP) | DB Column | Type | Nullable | Note |
|---|---|---|---|---|
| `id` | `id` | integer(20) | No | PK, AUTO_INCREMENT |
| `employee` | `employee_id` | integer (FK) | No | FK → `Employee.emp_number` |
| `punchInUtcTime` | `punch_in_utc_time` | datetime | No | Time in UTC |
| `punchInNote` | `punch_in_note` | string(255) | Yes | |
| `punchInUserTime` | `punch_in_user_time` | datetime | No | Local time of user |
| `punchOutUtcTime` | `punch_out_utc_time` | datetime | Yes | |
| `punchOutNote` | `punch_out_note` | string(255) | Yes | |
| `state` | `state` | string(255) | No | `PUNCHED IN` or `PUNCHED OUT` |

## Source Trace
- `orangehrmAttendancePlugin/entity/AttendanceRecord.php`
