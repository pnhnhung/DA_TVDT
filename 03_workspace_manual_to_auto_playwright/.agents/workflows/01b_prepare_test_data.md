---
description: Chuẩn bị data test trước khi vào bước gen code automation
---

# Workflow: 01b - Prepare Test Data

## 1. Mục tiêu

Workflow này chuẩn bị và quản lý test data trước khi generate automation code.


Mục tiêu:

- để AI hỗ trợ xác định data cần dùng
- tìm/get data hiện có
- tạo data dependency nếu thiếu và được phép
- ghi nhận data vào file quản lý
- mapping data với testcase
- tạo summary để user review
- giảm lỗi pre-condition khi execute automation

---

## 2. Agent

```text
test-data-manager
```

Nếu workspace chưa định nghĩa agent riêng, có thể dùng agent hiện tại phụ trách planning/generation nhưng phải tuân thủ skill và rule bên dưới.

---

## 3. Skill chính

```text
.agents/skills/test-data-manager/SKILL.md
```

---

## 4. Skill hỗ trợ

```text
.agents/skills/playwright-mcp-investigator/SKILL.md
```

Dùng khi cần:

- xác nhận data trên UI
- kiểm tra list/search/pagination
- xác định flow tạo data qua UI
- xác nhận locator phục vụ thao tác data setup

---

## 5. Rules bắt buộc

```text
.agents/rules/00-common-governance.md
.agents/rules/03-test-data-first.md
.agents/rules/04-locator-and-mcp.md
.agents/rules/07-test-data-management.md
```

Nếu workspace chưa có `07-test-data-management.md`, phải bổ sung trước khi dùng workflow này.

---

## 6. Input

```text
inputs/manual_pack_inbox/
inputs/reference/
inputs/framework_contract/
inputs/test_data_registry/
production_artifacts/planning/<module>/<state_id>/
```

| Input | Vai trò |
|---|---|
| Manual testcase đã analyze | Xác định testcase nào cần data |
| Automation scope/state | Biết state hiện tại gồm case nào |
| Reference/spec | Hiểu status/type/business data |
| Existing test data registry | Reuse data đã có |
| Framework contract | Biết có helper/API/DB utility không |
| UI/MCP/browser | Verify hoặc tạo data nếu cần |

---

## 7. Output

Workflow phải tạo hoặc cập nhật:

```text
inputs/test_data_registry/modules/<module>/data_inventory.md
inputs/test_data_registry/modules/<module>/data_testcase_mapping.md
inputs/test_data_registry/modules/<module>/data_setup_log.md
inputs/test_data_registry/modules/<module>/data_review_checklist.md
production_artifacts/planning/<module>/<state_id>/test_data_review_summary.md
```

---

## 8. Step 1 - Load state và testcase cần xử lý

Đọc danh sách testcase trong state hiện tại từ output của workflow:

```text
01_analyze_manual_testcases.md
```

Với mỗi testcase, xác định:

- Testcase ID
- Testcase Name
- module
- pre-condition
- steps
- expected result
- data được nhắc đến trong manual testcase
- data còn thiếu/chưa rõ

---

## 9. Step 2 - Phân tích required data

Với mỗi testcase, tạo phân tích data:

| Field | Ý nghĩa |
|---|---|
| Testcase ID | ID testcase |
| Required Data | Data cần dùng |
| Entity | Loại data |
| Usage Type | Dependency/Test Target/Scenario Data/Runtime Data |
| Required Before Test | Yes/No |
| Created In Test | Yes/No |
| Unique | Yes/No |
| Dependency Module | Module liên quan nếu có |
| Strategy | Reuse/Find/Create/Runtime/User Review |
| Note | Ghi chú |

Nguyên tắc:

- Nếu data là object chính của testcase create, đánh dấu `Test Target`.
- Nếu data là điều kiện để testcase chạy, đánh dấu `Dependency`.
- Nếu data sẽ sinh trong lúc chạy, đánh dấu `Runtime Data`.
- Nếu thiếu thông tin quan trọng, đánh dấu `BLOCKED_NEED_REVIEW`.

---

## 10. Step 3 - Kiểm tra registry hiện có

Kiểm tra:

```text
inputs/test_data_registry/modules/<module>/data_inventory.md
inputs/test_data_registry/modules/<module>/data_testcase_mapping.md
```

Nếu file chưa tồn tại, tạo file mới theo template.

Nếu data đã tồn tại và phù hợp:

- reuse data
- cập nhật mapping với testcase
- nếu `Verified = No/Pending`, cần verify lại

Nếu data chưa tồn tại:

- chuyển sang step tìm data trên hệ thống hoặc tạo data mới

---

## 11. Step 4 - Tìm/get data hiện có

Ưu tiên tìm data hiện có trước khi tạo mới.

Các phương án:

```text
1. UI list/search
2. API nếu có sẵn và an toàn
3. DB nếu có connection và phù hợp
4. MCP Playwright nếu cần xác nhận UI/list/pagination/locator
```

Bắt buộc:

- nếu search trên list thì phải kiểm tra filter/search/pagination đầy đủ
- không kết luận not found chỉ vì không thấy ở page đầu
- mọi action Search/Reuse/Verify phải ghi vào `data_setup_log.md`

---

## 12. Step 5 - Tạo data mới nếu cần

Chỉ tạo data mới nếu thỏa các điều kiện:

- data là dependency/pre-condition hợp lệ
- data không phải object chính của testcase create
- chưa tìm thấy data phù hợp
- có đủ thông tin để tạo data
- môi trường cho phép tạo test data
- naming convention rõ ràng

Naming convention:

```text
AUTO_<ENTITY>_<TESTCASE_ID_OR_STATUS>_<YYYYMMDD_HHMMSS>
```

Ví dụ:

```text
AUTO_JOB_TITLE_A_20260427_103000
AUTO_VACANCY_REC_003_20260427_103100
```

Sau khi tạo:

1. verify data
2. cập nhật `data_inventory.md`
3. cập nhật `data_testcase_mapping.md`
4. cập nhật `data_setup_log.md`

---

## 13. Step 6 - Cập nhật data inventory

File:

```text
inputs/test_data_registry/modules/<module>/data_inventory.md
```

Template nếu chưa có:

```md
# <Module> - Data Inventory

| Data ID | Entity | Data Name | Status/Type | Source | Verify Method | Verified | Created By | Cleanup Policy | Note |
|---|---|---|---|---|---|---|---|---|---|
```

Quy tắc:

- mỗi data có một `Data ID`
- data tạo bởi AI phải có `Source = Created by AI`
- data tìm thấy từ hệ thống phải có `Source = Discovered from UI/API/DB`
- data chưa chắc chắn phải có `Verified = Pending`
- data có rủi ro phải ghi note rõ

---

## 14. Step 7 - Cập nhật testcase mapping

File:

```text
inputs/test_data_registry/modules/<module>/data_testcase_mapping.md
```

Template nếu chưa có:

```md
# <Module> - Data Testcase Mapping

| Testcase ID | Testcase Name | Required Data | Data ID | Usage Type | Required Before Test | Created In Test | Note |
|---|---|---|---|---|---|---|---|
```

Quy tắc:

- testcase cần data dependency thì bắt buộc có mapping
- runtime data vẫn cần ghi placeholder
- mapping trùng lặp được chấp nhận để debug dễ hơn
- nếu data chưa sẵn sàng, ghi `BLOCKED_NEED_REVIEW`

---

## 15. Step 8 - Cập nhật setup log

File:

```text
inputs/test_data_registry/modules/<module>/data_setup_log.md
```

Template nếu chưa có:

```md
# <Module> - Data Setup Log

| Time | Action | Entity | Data Name | Result | Verify Method | Related Testcase | Note |
|---|---|---|---|---|---|---|---|
```

Bắt buộc log:

- Search
- Reuse
- Create
- Verify
- Update
- Skip
- Blocked
- Cleanup

---

## 16. Step 9 - Tạo review checklist

File:

```text
inputs/test_data_registry/modules/<module>/data_review_checklist.md
```

Template:

```md
# <Module> - Data Review Checklist

| Item | Status | Note |
|---|---|---|
| All required dependency data are mapped | Pending |  |
| All newly created data are verified | Pending |  |
| No test target is created as pre-condition incorrectly | Pending |  |
| Unique data naming is valid | Pending |  |
| Cross-module dependency data are verified | Pending |  |
| Data pending user review are listed | Pending |  |
```

---

## 17. Step 10 - Tạo test data review summary

File:

```text
production_artifacts/planning/<module>/<state_id>/test_data_review_summary.md
```

Nội dung:

```md
# Test Data Review Summary

## Module

## State

## Testcases Covered

## Data Reused

## Data Discovered

## Data Created

## Data Pending / Need Review

## Data Mapping Summary

## Risks

## Recommendation

## User Review Checklist
```

Summary phải đủ để user review nhanh:

- AI đã dùng lại data nào
- AI đã tìm thấy data nào
- AI đã tạo data nào
- data nào đang pending
- testcase nào còn blocker data
- có rủi ro trùng data không
- có data nào cần cleanup không

---

## 18. Quality Gate

Workflow chỉ được coi là hoàn tất khi:

```text
[ ] data_inventory.md đã tồn tại/cập nhật
[ ] data_testcase_mapping.md đã tồn tại/cập nhật
[ ] data_setup_log.md đã tồn tại/cập nhật nếu có action data
[ ] mọi testcase cần dependency data đều có mapping
[ ] data mới tạo đã verify
[ ] data mới tạo đã ghi inventory
[ ] data mới tạo đã ghi setup log
[ ] không setup trước object chính của testcase create
[ ] data pending/blocker đã được ghi rõ
[ ] test_data_review_summary.md đã được tạo
```

Nếu quality gate chưa đạt, không được chuyển sang:

```text
02_generate_auto_direct_to_framework.md
```

---

## 19. Handoff sang workflow generate code

Khi chuyển sang workflow generate code, agent phải cung cấp:

```text
inputs/test_data_registry/modules/<module>/data_inventory.md
inputs/test_data_registry/modules/<module>/data_testcase_mapping.md
production_artifacts/planning/<module>/<state_id>/test_data_review_summary.md
```

Workflow generate code chỉ được dùng:

- data đã có trong inventory
- data đã mapping với testcase
- runtime data có naming convention rõ
- data được user xác nhận nếu đang pending

Không được tự hardcode data ngoài registry/mapping.