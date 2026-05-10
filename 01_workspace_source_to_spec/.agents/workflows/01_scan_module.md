---
description: "[Phase 1] Khảo sát module — xác định phạm vi, cấu trúc, entities, routes, actors."
---

# Workflow 01: /scan_module — Phase 1: Khảo Sát Module

## Agent
`@repo_researcher`

## Skills
- `repo-source-scanner`
- `data-model-mapper`

## Rules
- `R00-common.md`
- `R01-source-evidence.md`

## Input
- `source-system/`
- `inputs/` (tài liệu tham khảo nếu có)

## Steps

### Bước 1 — Xác định module boundary
- Đọc route file → liệt kê TẤT CẢ endpoint thuộc module
- Xác định Controller, Service, FormRequest liên quan
- Ghi rõ: HTTP method, path, Controller@Action, role/middleware

### Bước 2 — Liệt kê features & actors
- Với mỗi endpoint: xác định action (create/read/update/delete/approve/...)
- Xác định actor/role nào có quyền thực hiện
- Gắn screen/UI tương ứng nếu có

### Bước 3 — Bóc entities & data model
- Đọc Model: `$fillable`, `$casts`, `$hidden`, accessor/mutator
- Đọc migration/schema: columns, types, nullable, unique, default, foreign key
- Đọc Enum: tất cả case values
- Ghi conflict nếu migration/entity/validator không thống nhất

### Bước 4 — Cross-check completeness
- Endpoint count trong route file = feature rows trong `feature_list.md`?
- Nếu chưa khớp → ghi gap, giải thích lý do

## Output (`production_artifacts/modules/{module_id}/phase1_scan/`)

| File | Nội dung |
|---|---|
| `module_scope.md` | Phạm vi module, feature chính, actors/roles, boundary |
| `feature_list.md` | Danh sách feature/action/API có source trace đầy đủ |
| `entity_map.md` | Entity, fields, types, constraints, relations |

**Global output** (nếu là lần đầu scan repo): `production_artifacts/modules/global/data_model_map.md`

## Guardrails
- Không kết luận business rule nếu mới chỉ thấy UI label.
- Không bỏ qua endpoint nhỏ (destroy, stopResume, index...).
- Nếu chưa xác định được framework/entry point → ghi gap trước khi chuyển Phase 2.