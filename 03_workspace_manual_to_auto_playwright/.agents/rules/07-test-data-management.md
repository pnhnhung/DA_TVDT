---
trigger: always_on
---

# Rule: Test Data Management

## 1. Mục tiêu

Rule này kiểm soát việc AI hỗ trợ xác định, tìm kiếm, tạo mới, verify và ghi nhận test data trong workspace gen automation test.

Nguyên tắc cốt lõi:

> AI không được tự giả định test data tồn tại.  
> Mọi test data dùng cho automation phải được phân tích, verify, mapping với testcase và ghi nhận vào file quản lý data.

Rule này ưu tiên tính **thực dụng, dễ review, dễ debug**, không phức tạp hóa bằng YAML/JSON ở giai đoạn đầu.

---

## 2. Phạm vi áp dụng

Áp dụng cho các workflow:

- `01_analyze_manual_testcases.md`
- `01b_prepare_test_data.md`
- `02_generate_auto_direct_to_framework.md`
- `04_execute_debug_fix.md`
- `05_final_execute_report.md`

Áp dụng cho:

- data pre-condition
- dependency data
- scenario data
- runtime data
- reference data
- data user cung cấp
- data AI tìm thấy từ UI/API/DB
- data AI tạo mới

---

## 3. Cấu trúc quản lý data

Mỗi module có bộ file data riêng:

```text
inputs/test_data_registry/
  modules/
    <module_name>/
      data_inventory.md
      data_testcase_mapping.md
      data_setup_log.md
      data_review_checklist.md
```

Ví dụ:

```text
inputs/test_data_registry/
  modules/
    recruitment/
      data_inventory.md
      data_testcase_mapping.md
      data_setup_log.md
      data_review_checklist.md
```

Không bắt buộc dùng YAML. Ưu tiên Markdown table vì dễ đọc, dễ sửa tay, dễ copy sang Excel/Google Sheet.

---

## 4. `data_inventory.md`

File này quản lý danh sách data đã biết hoặc có thể dùng lại.

Template:

```md
# <Module> - Data Inventory

| Data ID | Entity | Data Name | Status/Type | Source | Verify Method | Verified | Created By | Cleanup Policy | Note |
|---|---|---|---|---|---|---|---|---|---|
| JOB_TITLE_A_001 | Job Title | AUTO_JOB_TITLE_A_20260427_103000 | A | Created by AI | UI List | Yes | AI | Keep | Used for vacancy cases |
```

Quy tắc:

- `Data ID` phải ngắn, ổn định, dùng để mapping với testcase.
- `Data Name` là giá trị thật trên hệ thống.
- `Source` nên là một trong: `User Provided`, `Discovered from UI`, `Discovered from API`, `DB Verified`, `Created by AI`.
- `Verified` dùng: `Yes`, `No`, `Pending`.
- `Cleanup Policy` dùng: `Keep`, `Cleanup`, `Optional`, `User Confirm`.

---

## 5. `data_testcase_mapping.md`

File này quản lý data nào được dùng cho testcase nào.

Template:

```md
# <Module> - Data Testcase Mapping

| Testcase ID | Testcase Name | Required Data | Data ID | Usage Type | Required Before Test | Created In Test | Note |
|---|---|---|---|---|---|---|---|
| REC_001 | Create vacancy successfully | Job Title | JOB_TITLE_A_001 | Dependency | Yes | No | Must exist before creating vacancy |
```

Quy tắc:

- Một testcase có thể có nhiều dòng mapping.
- Một data có thể được nhiều testcase dùng lại.
- Chấp nhận trùng lặp có kiểm soát để debug dễ hơn.
- Testcase cần data dependency thì bắt buộc có mapping trước khi generate code.
- Runtime data vẫn cần ghi placeholder, ví dụ `VACANCY_REC_001_RUNTIME`.

`Usage Type` khuyến nghị:

```text
Dependency
Test Target
Scenario Data
Runtime Data
Reference Data
```

---

## 6. `data_setup_log.md`

File này ghi lại thao tác AI đã làm với data.

Template:

```md
# <Module> - Data Setup Log

| Time | Action | Entity | Data Name | Result | Verify Method | Related Testcase | Note |
|---|---|---|---|---|---|---|---|
| 2026-04-27 10:20 | Search | Job Title | AUTO_JOB_TITLE_A_20260427_103000 | Not Found | UI List | REC_001 | Need create |
| 2026-04-27 10:23 | Create | Job Title | AUTO_JOB_TITLE_A_20260427_103000 | Success | UI Form | REC_001 | Created as dependency |
| 2026-04-27 10:24 | Verify | Job Title | AUTO_JOB_TITLE_A_20260427_103000 | Found | UI List | REC_001 | Ready to use |
```

Bắt buộc log các action:

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

---

## 7. Phân loại data

Agent phải phân loại data trước khi xử lý.

| Loại | Ý nghĩa | Cách xử lý |
|---|---|---|
| `REFERENCE_DATA` | Data nền dùng lại nhiều lần | Tìm trong inventory hoặc hệ thống |
| `DEPENDENCY_DATA` | Data phụ thuộc để testcase chạy được | Find or create trước khi test |
| `SCENARIO_DATA` | Data phục vụ riêng một testcase | Có thể tạo unique |
| `TEST_TARGET` | Object chính mà testcase đang kiểm thử | Không tạo trước nếu testcase là case create |
| `RUNTIME_DATA` | Data sinh trong lúc chạy automation | Ghi placeholder vào mapping |
| `USER_PROVIDED_DATA` | Data user cung cấp | Ghi source là User Provided |
| `DISCOVERED_EXISTING_DATA` | Data AI tìm thấy từ UI/API/DB | Ghi inventory và mapping |
| `MISSING_NEED_CREATE` | Data thiếu, cần tạo | Tạo theo rule nếu được phép |
| `BLOCKED_NEED_REVIEW` | Không đủ thông tin hoặc có rủi ro | Dừng và report user |

---

## 8. Chiến lược xử lý data

Thứ tự bắt buộc:

```text
1. Tìm trong data_inventory.md
2. Nếu chưa có, tìm trên UI/API/DB nếu workspace/framework cho phép
3. Nếu tìm thấy data phù hợp, ghi vào data_inventory.md
4. Nếu không tìm thấy, tạo mới theo naming convention nếu được phép
5. Verify lại data sau khi tạo/tìm thấy
6. Cập nhật data_inventory.md
7. Cập nhật data_testcase_mapping.md
8. Cập nhật data_setup_log.md
9. Chỉ sau đó mới được dùng data trong automation code
```

---

## 9. Rule: Không giả định sample data

Agent không được hardcode hoặc giả định sample data nếu chưa verify.

Ví dụ không được tự dùng:

```text
Admin
QA Engineer
Test Vacancy
John Smith
Sample Customer
Default Role
Default Department
Demo User
```

Chỉ được dùng khi:

- user cung cấp rõ
- đã có trong `data_inventory.md`
- đã verify qua UI/API/DB
- hoặc đã được tạo mới và ghi log đầy đủ

---

## 10. Rule: Data unique

Nếu data có khả năng trùng, phải dùng prefix và suffix.

Format khuyến nghị:

```text
AUTO_<ENTITY>_<TESTCASE_ID_OR_STATUS>_<YYYYMMDD_HHMMSS>
```

Ví dụ:

```text
AUTO_JOB_TITLE_A_20260427_103000
AUTO_VACANCY_REC_001_20260427_103100
AUTO_EMPLOYEE_REC_002_20260427_103200
```

Không được:

- tạo data unique bằng tên cố định
- tạo lại data trùng tên khi chạy lại
- dùng data cũ nếu testcase yêu cầu tạo mới object

---

## 11. Rule: Tạo data mới thì bắt buộc ghi nhận

Nếu agent tạo bất kỳ data mới nào, agent bắt buộc cập nhật đủ 3 file:

```text
data_inventory.md
data_testcase_mapping.md
data_setup_log.md
```

Không được:

- tạo data mới nhưng không ghi inventory
- tạo data mới nhưng không mapping với testcase
- tạo data mới nhưng không log search/create/verify
- dùng data mới trong code khi chưa verify

---

## 12. Rule: Không setup trước object chính của testcase create

Agent phải phân biệt:

```text
Dependency data
```

và:

```text
Test target
```

Ví dụ:

- Testcase: “Create Vacancy successfully”
  - `Job Title` là dependency data, có thể find/create trước.
  - `Vacancy` là test target, không được tạo trước nếu testcase kiểm thử hành vi tạo Vacancy.

- Testcase: “Search existing Vacancy”
  - `Vacancy` là required pre-condition, có thể find/create trước.

Quy tắc:

> Không được setup trước chính object mà testcase đang kiểm tra hành vi tạo mới.

---

## 13. Rule: Data dependency giữa các module

Nếu module hiện tại phụ thuộc data từ module khác, agent phải xử lý qua flow hợp lệ.

Ví dụ:

```text
Create Vacancy
→ cần Job Title
→ vào Admin / Job / Job Titles
→ search Job Title
→ nếu chưa có thì tạo Job Title
→ verify Job Title
→ quay lại Recruitment / Vacancies
→ tạo Vacancy
```

Không được giả định data module khác tồn tại nếu chưa verify.

---

## 14. Rule: Verify list phải kiểm tra đầy đủ

Khi verify data trên màn list, agent phải đảm bảo đã tìm kiếm đầy đủ trước khi kết luận không tồn tại.

Các cách hợp lệ:

- dùng search/filter nếu có
- kiểm tra pagination
- kiểm tra tất cả page liên quan
- dùng DB/API nếu được phép và đáng tin cậy hơn
- dùng MCP Playwright nếu cần xác nhận UI thực tế

Không được kết luận `not found` chỉ vì không thấy ở page đầu.

---

## 15. Rule: Cleanup policy

Mỗi data trong inventory phải có cleanup policy.

| Policy | Ý nghĩa |
|---|---|
| `Keep` | Giữ lại để tái sử dụng cho automation |
| `Cleanup` | Có thể xóa sau test |
| `Optional` | Có thể giữ hoặc xóa tùy report |
| `User Confirm` | Không xóa nếu chưa có xác nhận user |

Không tự động xóa data business nếu chưa chắc chắn.

---

## 16. Rule: Debug data first

Khi testcase fail, agent phải kiểm tra theo thứ tự:

```text
1. Data/pre-condition
2. Locator
3. Flow/action
4. Assertion
5. Framework/config
```

Nếu lỗi có thể do data, agent không được sửa assertion hoặc locator trước khi xác nhận data.

Agent phải kiểm tra:

- data có trong `data_testcase_mapping.md` không
- data có trong `data_inventory.md` không
- data đã verified chưa
- data có bị đổi/xóa không
- data dependency có đủ không
- unique data có bị trùng không

---

## 17. Quality gate

Không được chuyển sang generate automation code nếu:

- testcase cần dependency data nhưng chưa có mapping
- data mới tạo nhưng chưa verify
- data mới tạo nhưng chưa ghi inventory
- data mới tạo nhưng chưa log setup
- data có status `Pending` nhưng không có note/blocker
- object chính của testcase create bị setup trước sai cách
- data dependency liên module chưa được xác nhận


## 18. Có thể connect database đã cung cấp ở dev.yalm để compare

## 19. Rule: Chống lệch dữ liệu Danh mục (Dropdown/Reference Data)
Khi tự động hóa các trường dữ liệu danh mục của hệ thống (Ví dụ: Currency, Nationality, Job Category, v.v.):
- KHÔNG được assume (giả định) text từ kịch bản Manual là text hiển thị thực tế trên UI (Ví dụ: Manual ghi "British Pound" nhưng hệ thống ghi "Pound Sterling").
- **Dữ liệu Input và Assertion phải đồng nhất:** Bắt buộc phải điều tra UI thực tế bằng tay hoặc MCP để xác định chính xác text xuất hiện trong Dropdown và trên lưới Grid trước khi đưa chuỗi string đó vào hàm `verify` hoặc `delete`.
- Phải ưu tiên gõ text (filter) vào ô dropdown để lọc kết quả thay vì chỉ cuộn và tìm kiếm lỏng lẻo.

## 20. Rule: Xác thực logic dữ liệu (Numeric Boundaries & Constraints)
Khi xử lý hoặc sinh test data cho các trường có quan hệ logic với nhau (Ví dụ: Minimum Salary và Maximum Salary):
- KHÔNG BAO GIỜ hardcode giá trị tùy tiện mà không xem xét ràng buộc. Giá trị Min luôn phải nhỏ hơn giá trị Max để tạo thành công.
- Đối với các test case **Negative/Validation Error** (kiểm thử bắt lỗi hệ thống), cần cố tình truyền sai logic (Ví dụ: Min > Max) và **bắt buộc phải verify chính xác message lỗi** hiển thị ở đúng ô input tương ứng, đảm bảo xử lý triệt để Strict Mode nếu có nhiều ô cùng báo lỗi một lúc.