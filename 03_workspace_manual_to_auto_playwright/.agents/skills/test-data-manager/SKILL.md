---
name: test-data-manager
description: Manage test data lifecycle — find, classify, create, verify, map, and log test data before automation code generation.
---

# Skill: Test Data Manager

## 1. Mục tiêu

Skill này giúp AI quản lý test data một cách thực dụng trong workspace gen automation test từ manual testcase.

Skill chịu trách nhiệm:

- phân tích manual testcase để xác định required data
- phân loại data
- tìm data đã có trong inventory
- tìm/get data từ UI/API/DB nếu có thể
- tạo data dependency nếu thiếu và được phép
- verify data sau khi tìm/tạo
- mapping data với testcase
- ghi log mọi thao tác data
- tạo summary để user review trước khi generate automation code

---

## 2. Khi nào dùng skill này

Dùng trong các workflow:

- `01_analyze_manual_testcases.md`
- `01b_prepare_test_data.md`
- `02_generate_auto_direct_to_framework.md`
- `04_execute_debug_fix.md`

Bắt buộc dùng khi:

- testcase có pre-condition
- testcase cần data từ module khác
- testcase cần verify data trên list
- testcase cần data unique
- testcase fail nghi do data/pre-condition
- AI chưa chắc data sample có tồn tại hay không

---

## 3. Input

```text
inputs/manual_pack_inbox/
inputs/test_data_registry/modules/<module>/
inputs/reference/
inputs/framework_contract/
production_artifacts/planning/<module>/<state_id>/
```

| Input | Mục đích |
|---|---|
| Manual testcase | Xác định data cần dùng |
| Module scope | Xác định module cần quản lý data |
| Existing data inventory | Reuse data đã biết |
| Existing testcase mapping | Tránh duplicate và hỗ trợ debug |
| Reference/spec | Hiểu business data/status/type |
| Framework contract | Biết có helper/API/DB utility nào dùng được không |
| UI/browser/MCP evidence | Get/verify data nếu cần |

---

## 4. Output

Skill phải tạo hoặc cập nhật:

```text
inputs/test_data_registry/modules/<module>/data_inventory.md
inputs/test_data_registry/modules/<module>/data_testcase_mapping.md
inputs/test_data_registry/modules/<module>/data_setup_log.md
inputs/test_data_registry/modules/<module>/data_review_checklist.md
production_artifacts/planning/<module>/<state_id>/test_data_review_summary.md
```

---

## 5. Quy trình thực hiện

### Step 1. Đọc testcase và xác định required data

Với mỗi testcase, xác định:

- testcase cần data gì
- data đó là dependency hay test target
- data có cần tồn tại trước test không
- data có được tạo trong test không
- data có unique không
- data có phụ thuộc module khác không
- data có status/type cụ thể không
- data có cần cleanup không

Output nội bộ:

```text
Testcase ID
Required Data
Entity
Usage Type
Required Before Test
Created In Test
Unique
Dependency Module
Note
```

---

### Step 2. Phân loại data

Phân loại thành một trong các nhóm:

```text
REFERENCE_DATA
DEPENDENCY_DATA
SCENARIO_DATA
TEST_TARGET
RUNTIME_DATA
USER_PROVIDED_DATA
DISCOVERED_EXISTING_DATA
MISSING_NEED_CREATE
BLOCKED_NEED_REVIEW
```

Quy tắc quan trọng:

> Không được setup trước `TEST_TARGET` nếu testcase đang kiểm thử hành vi tạo mới object đó.

---

### Step 3. Kiểm tra data_inventory hiện có

Tìm trong:

```text
inputs/test_data_registry/modules/<module>/data_inventory.md
```

Nếu có data phù hợp:

- reuse data
- cập nhật mapping
- nếu data chưa verified thì cần verify lại

Nếu chưa có data phù hợp:

- chuyển sang step search UI/API/DB hoặc tạo mới

---

### Step 4. Tìm/get data từ hệ thống

Ưu tiên cách ít gây side effect:

```text
1. UI list/search
2. API nếu framework/reference cho phép
3. DB nếu có connection và phù hợp
4. MCP Playwright nếu cần xác nhận UI/locator/list/pagination
```

Khi search trên màn list:

- không chỉ kiểm tra page đầu
- phải dùng filter/search nếu có
- nếu có pagination thì phải kiểm tra đầy đủ
- nếu kết luận not found thì phải ghi vào setup log

---

### Step 5. Tạo data mới nếu thiếu

Chỉ tạo mới khi:

- data là dependency hoặc pre-condition hợp lệ
- không phải object chính của testcase create
- không tìm thấy data có sẵn
- có đủ thông tin để tạo
- môi trường cho phép tạo data test

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

- verify lại qua UI/API/DB
- cập nhật inventory
- cập nhật mapping
- cập nhật setup log

---

### Step 6. Mapping data với testcase

Cập nhật:

```text
data_testcase_mapping.md
```

Mỗi testcase có thể có nhiều dòng mapping.

Mapping phải làm rõ:

- data nào dùng cho testcase nào
- data là dependency hay test target
- data cần trước test hay được tạo trong test
- data đã được verify chưa
- có blocker nào không

---

### Step 7. Ghi setup log

Mọi hành động data phải ghi vào:

```text
data_setup_log.md
```

Các action bắt buộc log:

```text
Search
Reuse
Create
Verify
Update
Skip
Blocked
Cleanup
```

Nếu AI tạo data mới nhưng không log, xem như vi phạm rule.

---

### Step 8. Tạo review summary cho user

Tạo file:

```text
production_artifacts/planning/<module>/<state_id>/test_data_review_summary.md
```

Nội dung bắt buộc:

```md
# Test Data Review Summary

## State

## Testcases Covered

## Data Reused

## Data Discovered

## Data Created

## Data Pending / Need Review

## Data Mapping Summary

## Risks

## User Review Checklist
```

---

## 6. Cách xử lý ví dụ Job Title có 3 status

Nếu testcase cần Job Title tương ứng status A/B/C:

```text
1. Kiểm tra data_inventory.md xem đã có Job Title status A/B/C chưa
2. Nếu chưa có, vào UI/API/DB để search
3. Nếu tìm thấy, ghi vào inventory với source = Discovered from UI/API/DB
4. Nếu không tìm thấy, tạo mới:
   - AUTO_JOB_TITLE_A_<timestamp>
   - AUTO_JOB_TITLE_B_<timestamp>
   - AUTO_JOB_TITLE_C_<timestamp>
5. Verify từng Job Title
6. Mapping từng Job Title với testcase tương ứng
7. Ghi setup log đầy đủ
8. Tạo review summary để user kiểm tra
```

---

## 7. Điều không được làm

Skill không được:

- hardcode sample data chưa verify
- tạo data nhưng không ghi inventory
- tạo data nhưng không mapping testcase
- tạo data nhưng không log setup
- tạo object chính của testcase create ở pre-condition
- kết luận data không tồn tại khi chưa kiểm tra list đầy đủ
- sửa locator/assertion trước khi kiểm tra data nếu lỗi nghi do pre-condition
- xóa data test nếu cleanup policy không cho phép

---

## 8. Quality checklist

Trước khi kết thúc, skill phải tự kiểm tra:

```text
[ ] Mọi testcase cần data đều có mapping
[ ] Mọi data dependency đều có inventory
[ ] Mọi data mới tạo đều đã verify
[ ] Mọi data mới tạo đều đã ghi setup log
[ ] Không setup trước object chính của testcase create
[ ] Data unique có suffix phù hợp
[ ] Data liên module đã được xử lý qua flow hợp lệ
[ ] Data pending/blocker đã được ghi rõ cho user review
```
