# R01 — Source Evidence & Confidence

## Confidence Levels

| Level | Dùng khi |
|---|---|
| `high` | Rule xác nhận trực tiếp bởi: service/domain layer, validator/schema/entity, policy/middleware, DB constraint |
| `medium` | Bằng chứng gián tiếp nhưng hợp lý: controller + UI form, route + request field, config + usage |
| `low` | Chỉ có dấu hiệu: tên field, UI label, comment, naming convention |
| `conflict` | Từ 2+ nguồn mâu thuẫn nhau |

## Evidence Strength

| Strength | Ví dụ |
|---|---|
| `strong` | Validation code rõ ràng, permission check, DB unique constraint, error message chính xác, transaction/rollback |
| `medium` | DB column length (chưa thấy request validation), UI label gợi ý mục đích, existing test thể hiện behavior |
| `weak` | Naming convention, comment, cấu trúc thư mục |

**Weak evidence không được đưa vào official spec.**

## Gate Rules

- Chỉ rule `confirmed` + `high/medium confidence` được đưa vào official spec.
- Rule `inferred` chỉ được ghi trong section **"Inferred — Cần Xác Nhận"**.
- Item `gap` và `conflict` phải ghi vào `gaps.md`.
- Không âm thầm chuyển `inferred` thành `confirmed`.

## Incremental Scan (cho Laravel/PHP repo)

Thứ tự bắt buộc khi phân tích một module:

```
1. Route Discovery      → route file → liệt kê TẤT CẢ endpoint
2. Controller Mapping   → Controller → FormRequest class mapping
3. FormRequest Scan     → list_dir Requests/{Module}/ → đọc TỪNG file
                          → grep custom Rule class → đọc Rule class đó
4. Model & Enum         → $fillable, $casts, enum values
5. Service/Business     → extract business rules từ Service layer
6. Cross-check          → endpoint count = feature rows?
                          → FormRequest fields ≈ field_rules rows?
                          → messages() keys → error_messages rows?
```

> ⚠️ Không bỏ qua bước `list_dir` — đây là nguyên nhân hay bỏ sót FormRequest.
