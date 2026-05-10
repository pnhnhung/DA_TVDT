---
description: "[Phase 3] Chuyển rules kỹ thuật thành feature descriptions và user stories để cung cấp business context cho workspace testcase. Bắt buộc."
---

# Workflow 03: /describe_spec — Phase 3: Mô Tả Chức Năng

## Agent
`@rule_extractor`

## Skills
- `behavior-spec-writer`

## Rules
- `R00-common.md`
- `R03-workspace-constraints.md`

## Input
- Phase 1 output: `production_artifacts/modules/{module_id}/phase1_scan/`
- Phase 2 output: `production_artifacts/modules/{module_id}/phase2_rules/`

## Mục Tiêu
Cung cấp **business context** cho workspace testcase: chức năng này làm gì, phục vụ ai, tại sao cần tồn tại.

> **Bắt buộc** — không có phase này, workspace testcase không hiểu *tại sao* feature tồn tại,
> dẫn đến testcase thiếu ngữ cảnh hoặc bỏ sót flow quan trọng.

Không sinh testcase. Không viết Given-When-Then (workspace testcase tự làm).

## Steps

### Bước 1 — Feature Description
Với mỗi feature/action trong `feature_list.md`, viết mô tả nghiệp vụ:
- Chức năng này làm gì?
- Kết quả khi thực hiện thành công là gì?
- Ràng buộc nghiệp vụ quan trọng (không phải technical)?
- Điều gì xảy ra nếu thất bại?

### Bước 2 — User Stories
Với mỗi actor/feature có nghĩa, viết user story:

```
As a [role/actor],
I want to [hành động cụ thể],
So that [lợi ích / mục đích nghiệp vụ].

Preconditions: [điều kiện cần có trước khi dùng feature này]
Related rules: [rule_id liên quan]
```

**Nguyên tắc:**
- 1 user story = 1 flow chính (không viết tất cả edge cases)
- Ngôn ngữ business — không dùng thuật ngữ kỹ thuật
- Chỉ viết cho rule có status `confirmed`
- Nếu feature chưa rõ mục đích → ghi vào `gaps.md`

### Bước 3 — Business Context Summary
Với toàn bộ module, viết tóm tắt:
- Module phục vụ nghiệp vụ gì?
- Actors chính và vai trò của họ
- Các luồng chính (happy flows) theo thứ tự logic nghiệp vụ
- Mối quan hệ với module khác (ngôn ngữ business, không phải kỹ thuật)

## Output (`production_artifacts/modules/{module_id}/phase3_describe/`)

| File | Nội dung |
|---|---|
| `user_stories.md` | User stories theo actor và feature |
| `feature_descriptions.md` | Mô tả nghiệp vụ từng feature — không kỹ thuật |
| `business_context.md` | Tóm tắt toàn module — purpose, actors, main flows, dependencies |

## Format Chuẩn `user_stories.md`

```markdown
## Actor: [Tên Role]

### Feature: [Tên Feature]

**User Story**:
As a [role], I want [action], So that [benefit].

**Preconditions**: [điều kiện cần trước]
**Related rules**: [rule_id liên quan]
**Notes**: [lưu ý nghiệp vụ quan trọng nếu có]

---
```

## Format Chuẩn `feature_descriptions.md`

```markdown
## Feature: [Tên Feature]

**Mục đích**: [tại sao feature này cần tồn tại]
**Actor**: [ai sử dụng]
**Flow chính**: [mô tả ngắn gọn luồng thành công]
**Kết quả khi thành công**: [observable outcome]
**Kết quả khi thất bại**: [mô tả chung — chi tiết error message ở field_rules.csv]
**Ràng buộc nghiệp vụ quan trọng**: [các rule đặc biệt cần chú ý]
**Related rules**: [rule_id danh sách]
```

## Guardrails
- Không viết Given-When-Then — workspace testcase tự sinh.
- Không lặp lại technical details từ field_rules.csv.
- Không sinh testcase hay test scenario.
- Nếu behavior chưa rõ → ghi gap, không suy diễn.
