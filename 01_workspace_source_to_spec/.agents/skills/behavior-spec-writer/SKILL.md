---
name: behavior-spec-writer
description: Chuyển rules kỹ thuật từ Phase 2 thành feature descriptions và user stories để cung cấp business context cho workspace testcase.
---

# Behavior Spec Writer

## Goal
Tạo **business context** mà workspace testcase cần để hiểu: chức năng này làm gì, phục vụ ai, tại sao cần.
**Không sinh testcase. Không viết Given-When-Then.**

## Instructions

### 1 — Feature Descriptions
Với mỗi feature/action trong `feature_list.md`:

**Câu hỏi cần trả lời:**
- Chức năng này làm gì trong hệ thống?
- Actor nào sử dụng và tại sao?
- Kết quả khi thực hiện thành công là gì (observable outcome)?
- Điều gì xảy ra khi thất bại (ngôn ngữ business — không phải error message kỹ thuật)?
- Có ràng buộc nghiệp vụ đặc biệt nào cần biết?

**Input từ Phase 2:**
- `business_rules.md` → extract business purpose
- `field_rules.csv` → extract key constraints (ngôn ngữ business)
- `state_transitions.md` → extract flow narrative
- `permissions.csv` → extract ai được làm gì

### 2 — User Stories
```
As a [role/actor],
I want to [hành động cụ thể],
So that [lợi ích / mục đích nghiệp vụ].

Preconditions: [điều kiện cần có trước]
Related rules: [rule_id]
```

**Nguyên tắc:**
- 1 user story = 1 luồng chính — không gộp nhiều flows
- Ngôn ngữ business — không dùng thuật ngữ kỹ thuật
- Chỉ viết cho rule `confirmed`
- Nếu feature chưa rõ mục đích → ghi vào `gaps.md`

### 3 — Business Context Summary (cho toàn module)
- Module phục vụ nghiệp vụ gì?
- Actors và vai trò của họ
- Các luồng chính theo thứ tự logic nghiệp vụ
- Quan hệ với module khác (ngôn ngữ business)

## Required Outputs (`production_artifacts/modules/{module_id}/phase3_describe/`)

| File | Nội dung |
|---|---|
| `user_stories.md` | User stories theo actor và feature |
| `feature_descriptions.md` | Mô tả nghiệp vụ từng feature |
| `business_context.md` | Tóm tắt toàn module — purpose, actors, flows |

## Output Templates

### user_stories.md
```markdown
## Actor: [Tên Role]

### Feature: [Tên Feature]
As a [role], I want [action], So that [benefit].

**Preconditions**: ...
**Related rules**: [rule_id]
**Notes**: [lưu ý nghiệp vụ nếu có]
```

### feature_descriptions.md
```markdown
## Feature: [Tên Feature]

| Thuộc tính | Nội dung |
|---|---|
| Mục đích | ... |
| Actor | ... |
| Flow chính | ... |
| Kết quả thành công | ... |
| Kết quả thất bại | ... |
| Ràng buộc quan trọng | ... |
| Related rules | [rule_id list] |
```

## Guardrails
- Không viết Given-When-Then.
- Không lặp lại technical details từ field_rules.csv.
- Không sinh testcase.
- Mọi gap về business purpose → ghi vào `gaps.md`.
