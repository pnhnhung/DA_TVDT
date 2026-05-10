---
name: repo-source-scanner
description: Phân tích repo theo pha tăng dần để build feature inventory, screen catalog, module map và entity map cho reverse-spec work.
---

# Repo Source Scanner

## Goal
Đọc source theo pha tăng dần để hiểu kiến trúc, module, route, UI forms, entities và integration points — **không kết luận business rule** ở giai đoạn này.

## Instructions

1. **Bắt đầu từ cấu trúc thư mục** — `list_dir` từ root, xác định framework/entry point/config chính.
2. **Route Discovery** — đọc route file, liệt kê TẤT CẢ endpoint với: method, path, Controller@Action, middleware/role.
3. **Controller Mapping** — đọc Controller → xác định FormRequest, Service được gọi.
4. **Entity/Model** — đọc Model ($fillable, $casts), migration (columns, constraints, enums).
5. **Ghi kết quả** vào `phase1_scan/` trước khi đào sâu vào business logic.
6. **Không kết luận business rule** nếu mới chỉ thấy UI label hoặc route name.

## Outputs (`production_artifacts/modules/{module_id}/phase1_scan/`)
- `module_scope.md` — phạm vi, actor, features chính, boundary
- `feature_list.md` — danh sách feature/action/API có source trace
- `entity_map.md` — entities, fields, types, constraints, relations
