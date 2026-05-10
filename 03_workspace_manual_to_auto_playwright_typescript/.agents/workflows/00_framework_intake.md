---
description: Đọc framework automation thật và chốt contract/reuse inventory trước khi generate code trực tiếp.
---

# /00_framework_intake

## Mục tiêu

Chốt framework contract và reuse inventory để các bước sau không đoán convention.

## Agent / Skill / Rule

| Thành phần | Sử dụng |
|---|---|
| Agent | `@framework_analyst` |
| Skill | `framework-contract-intake` |
| Rules bắt buộc | `00-common-governance.md`, `01-framework-contract-and-reuse.md`, `05-playwright-ts-native.md` |

## Input

```text
FRAMEWORK_ROOT = inputs/framework_inbox/source-automation-fw/playwright-typescript
inputs/framework_contract/ nếu có
inputs/reference/ nếu có
```

## Thực hiện

1. Đọc cây thư mục framework thật, không chỉ README.
2. Xác định test runner (Playwright Test / npx playwright test), test file path (`tests/generated/<module>/`), Page Object pattern (`src/pages/<module>/`).
3. Xác định fixture/hook/auth/session/config/env/report/evidence pattern.
4. Xác định helper/data/DB utility có thể reuse.
5. Xác định command execute nhỏ nhất theo test file/tag/keyword/module.
6. Lập reuse inventory theo module/page/step/helper/fixture.
7. Ghi rõ `confirmed_from_framework`, `inferred`, `gap_or_unknown`, `must_follow`.
8. Không sinh testcase/code ở bước này.

## Output bắt buộc

```text
production_artifacts/automation_design/framework_contract.md
production_artifacts/automation_design/reuse_inventory.md
```

## Quality gate

- Contract đủ rõ để generate trực tiếp vào framework.
- Reuse inventory đủ để tránh tạo trùng test function/page/helper.
- Phải ghi rõ `FRAMEWORK_ROOT` đã dùng.
