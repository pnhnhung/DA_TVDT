---
name: it-cross-module-expander
description: Sinh IT manual testcase mở rộng cho cross-screen, cross-module, cross-role, API/data propagation, export/report/notification/batch/concurrency.
---

# IT Cross-Module Expander

## Goal
Tạo IT manual testcase có giá trị tích hợp thật, không chỉ lặp lại UT.

## Instructions
1. Đọc các file sau để nắm cross-module context (theo cấu trúc mới):
   - `inputs/source_to_spec_handoff/modules/global/data_model_map.md`
   - `inputs/source_to_spec_handoff/modules/<module_name>/phase2_rules/integration_points.md`
   - `inputs/source_to_spec_handoff/modules/<module_name>/phase2_rules/state_transitions.md`
   - `inputs/source_to_spec_handoff/modules/<module_name>/phase2_rules/business_rules.md`
   - `inputs/source_to_spec_handoff/modules/<module_name>/phase2_rules/permissions.csv`
   - `inputs/source_to_spec_handoff/modules/<module_name>/handoff/rule_catalog.csv`
   - UT output để tránh trùng.
2. Xác định chain kiểm chứng:
   - trigger
   - source module/screen/API
   - target module/screen/API
   - role liên quan
   - data object
   - state before/after
   - observable oracle
3. Sinh IT cho end-to-end flow, role handoff, state transition, data consistency, API lookup, notification, export/report, batch/scheduler, duplicate submit/idempotency.
4. Không sinh IT nếu không có interaction hoặc observable result rõ.
5. Tạo matrix để review coverage.
6. Đối với mỗi đối tượng, cần verify các trường hợp CRUD nếu có để đảm bảo hoạt động đúng, không được bỏ sót.
Sinh testcase IT phải tập trung vào tương tác module, contract, data flow, state flow, transaction, error propagation và side-effect.
Không sinh testcase IT như testcase UT đơn thuần.
7. Tương tự với permission, cần verify các trường hợp valid/invalid, deny/allow, view/edit/delete, cross-module permission
8. Hãy đặt vai trò là người dùng cuối, để từ đó đưa ra các trường hợp kiểm thử có thể xảy ra trong thực tế
9. Không được tư duy chủ quan là: "trường hợp này không thể xảy ra", "trường hợp này không hợp lý", "trường hợp này không cần thiết", "trường hợp này không quan trọng"

10. IT testcase phải mở rộng theo các nhóm sau nếu workspace source-to-spec có evidence:

```text
- module A tạo data cho module B sử dụng
- module A thay đổi state làm module B đổi behavior
- role/permission ảnh hưởng nhiều module
- API/service call chain
- shared table / foreign key
- notification / export / background job
- rollback / failure path
- duplicate / concurrent request
- data consistency giữa màn hình/API/database
- user journey nhiều bước
```


Ví dụ hướng mở rộng IT:

```text
Create User
→ Assign Role
→ Login by created user
→ Verify menu visibility
→ Verify allowed action
→ Verify denied action
```
11. Đối với IT cần đặc biệt triển khai việc giao tiếp, tương tác giữa các module với nhau, tương tác giữa các field với nhau, mối tương quan, liên hệ, tính liên kết. Không được chỉ sinh IT dạng đơn module nếu spec có interaction liên module, có thể chủ động mở rộng phạm vi ảnh hưởng đối với các module khác có liên quan đến module hiện tại.
- Module A có các field nào liên quan, giao tiếp trực tiếp với field nào ở các module khác?
- Các module liên quan có các trạng thái data nào ? (null, blank, status=active/inactive, deleted/not deleted, locked/unlocked,...) 
- Sự thay đổi trạng thái ở module A thể hiện mối tương quan và ảnh hưởng thế nào đến tính liên kết dữ liệu ở module B và ngược lại?

12. Data test được chỉ định cụ thể trong testcase, không mô tả chung chung
ví dụ: nhập email format hợp lệ: testuser@example.com, 
nhập email format không hợp lệ: testuser@example, [EMAIL_ADDRESS], testuser@example.com@domain.com

Nếu data test thay đổi theo biến thì cần chỉ định format dự kiến:
ví dụ: username_{random_number} với random_number là số ngẫu nhiên từ 1 đến 1000
ví dụ: job_title_{timestamp} với timestamp là thời gian hiện tại
ví dụ: employee_id_{sequence} với sequence là số thứ tự từ 1 đến 1000

13. Cần verify các case đồng thời CRUD của 1 module với các trường hợp CRUD, delete, update, edit, ví dụ:
- Username unique, cùng lúc tạo username ở 2 tab khác nhau bởi 2 user khác nhau
- Đang login 2 user A và B, cùng lúc đó user A và B delete user C
- Đang login 2 user A và B, cùng lúc đó user A và B update user C
- Đang login user C và tạo user A, cùng lúc đó user B delete user C
- Đang login user C và edit user A, cùng lúc đó user B delete user C
- Đang login user A (admin) và đang edit data module job title (chỉ role admin có thể edit) cùng lúc đó admin update role của A từ admin thành manager thì user A không thể tiếp tục edit data job title, submit lỗi
và còn nhiều case đồng thời có thể phân tích và khai thác, cần triển khai đầy đủ nhất có thể.



## Required Outputs
- `production_artifacts/testcases/IT/module_<module_name>/it_manual_testcases.csv`
- `production_artifacts/testcases/IT/module_<module_name>/it_coverage_matrix.csv`
- **BẮT BUỘC:** Tuân thủ chuẩn CSV tại [common.md](file:///.agents/rules/common.md) (Encoding UTF-8 no BOM, Quoting...).

## Tham Chiếu Rule
- **Rule 05** (`05-it-coverage-gate.md`) — IT-AXIS-01 đến IT-AXIS-18: checklist bắt buộc trước khi finalize IT pack.
  - Số trục tối thiểu: ≥12 (Security/Payment/Auth), ≥9 (Cross-module/State machine), ≥6 (CRUD+filter), ≥3 (Display only).
- **Rule 03** (`03-test-design-principles.md`) — Risk-first selection và Field Validation Depth.

