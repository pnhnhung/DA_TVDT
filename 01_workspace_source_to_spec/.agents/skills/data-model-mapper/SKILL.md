---
name: data-model-mapper
description: Extract entities, database tables, relationships, keys, enums, constraints, defaults, and data dependencies from source code, migration files, ORM models, schemas, and seed data.
---

# Data Model Mapper

## Goal
Tạo bản đồ dữ liệu đầy đủ để làm nền cho field rules, business rules và module interaction analysis.

## Instructions

### 1 — Migration / Schema
- Đọc migration files theo thứ tự chronological
- Bóc columns: name, type, nullable, default, unsigned, length/precision
- Bóc constraints: primary key, unique key, foreign key, index
- Ghi conflict nếu migration và entity/model không thống nhất

### 2 — Model / Entity / ORM
- Đọc `$fillable`, `$guarded`, `$casts`, `$hidden`, `$appends`
- Xác định accessor/mutator (ảnh hưởng đến data transformation)
- Đọc relationships: hasOne, hasMany, belongsTo, belongsToMany, morphTo...
- Ghi related model và foreign key

### 3 — Enum & Allowed Values
- Tìm PHP Enum class hoặc const array trong Model/Config
- Bóc TẤT CẢ case values
- Xác định column nào sử dụng enum này

### 4 — Seed Data (nếu có)
- Đọc seeder để xác định default records/values
- Ghi nếu seeder tạo ra data ảnh hưởng đến business logic

### 5 — Cross-check
- Model `$fillable` vs migration columns → conflict?
- Enum values trong Model vs constraint trong DB → nhất quán?

## Required Outputs

### Global (`production_artifacts/modules/global/`)
- `data_model_map.md` — toàn bộ entities/tables, relations overview

### Per Module (`production_artifacts/modules/{module_id}/phase1_scan/`)
- `entity_map.md` — entities thuộc module: fields, types, constraints, relations

## entity_map.md — Minimum Record Fields

```markdown
## Entity: [EntityName]

**Table**: [table_name]

| Field | Type | Nullable | Default | Constraint | Note |
|---|---|---|---|---|---|
| id | bigint | no | auto | PK | |
| name | varchar(100) | no | | | |
| status | enum | no | active | | Values: active, inactive |
| user_id | bigint | no | | FK → users.id | |

**Relationships**:
- hasMany: [RelatedModel] (via [foreign_key])
- belongsTo: [ParentModel] (via [foreign_key])

**Enums**:
| Field | Values |
|---|---|
| status | active, inactive, pending |

**Source trace**: [migration_file#line][model_file#line]
**Status**: confirmed / inferred
**Conflict**: [ghi nếu có]
```

## data_model_map.md — Overview Format

```markdown
## Entity Relationships Overview

| Entity | Table | Related To | Via | Type |
|---|---|---|---|---|
| Employee | employees | Department | dept_id | belongsTo |
| Employee | employees | User | user_id | hasOne |

## Module → Entity Mapping

| Module | Primary Entities | Shared Entities |
|---|---|---|
| employee_management | employees | users, departments |
```

## Guardrails
- Không kết luận business rule từ column name — chỉ ghi data constraint.
- Ghi `conflict` nếu migration và model không nhất quán — không tự chọn một phía.
- Không viết testcase.
- Enum values phải lấy từ source chính xác — không đoán.
