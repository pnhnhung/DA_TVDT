# README — Workspace 02: Spec to Manual Testcase

Workspace này dùng để **sinh testcase manual từ spec đã được kiểm chứng**.

Nguyên tắc quan trọng nhất:

```text
Không sinh testcase nếu không trace được về spec/rule.
Không chấp nhận expected result mơ hồ.
Không finalize testcase nếu chưa có coverage matrix và oracle review.
```

---

## 1. Mục tiêu của workspace

Workspace `02_workspace_spec_to_gen_tc_manual` có nhiệm vụ:

- nhận spec package từ workspace `source-to-spec`;
- chuẩn hóa input spec;
- sinh testcase manual theo từng module;
- tách rõ UT / IT / Usecase / Manual functional case;
- tăng độ mạnh cho UT;
- mở rộng coverage cho IT;
- review coverage;
- review expected result/oracle;
- tạo handoff package cho bước automation nếu cần.

---

## 2. Cấu trúc workspace sau khi cập nhật

```text
02_workspace_spec_to_gen_tc_manual/
  .agents/
    rules/                          ← 9 rules
      01-source-of-truth.md
      02-tc-level-mapping.md
      03-test-design-principles.md
      04-traceability-gap-style.md
      05-it-coverage-gate.md
      06-quality-gates.md
      07-review-and-readiness.md
      99-model-routing-gen-testcase.md
      common.md

    skills/
      spec-intake-normalizer/
      risk-based-manual-test-designer/
      ut-strong-verification-designer/
      it-cross-module-expander/
      manual-pack-reviewer/
      testcase-handoff-packager/
      spec-readiness-gate-checker/
      testcase-coverage-reviewer/
      testcase-oracle-reviewer/

    workflows/                       ← 8 workflows 
      00_intake_spec.md
      01_prepare_manual_scope.md
      02_generate_ut.md
      03_generate_it.md
      04_generate_usercases.md
      05_review_and_gate.md
      06_clarify_and_finalize.md
      07_handoff.md

  docs/
  inputs/
  production_artifacts/
  agents.md
  README.md
```

---

## 3. Input bắt buộc

Input chính là spec package từ workspace 1.

Nên đặt vào:

```text
inputs/
  {module_name}/
    final_spec_package.md
    rule_catalog.md
    evidence_map.md
    module_interactions.md
    spec_readiness_report.md
    gaps_and_questions.md
```

Nếu tên file khác, cần nói rõ trong prompt.

---

## 4. Điều kiện đầu vào

Workspace này chỉ nên sinh testcase chính thức từ:

```text
confirmed rules
```

Không sinh official testcase từ:

```text
inferred rules
unknown rules
gap rules
conflict rules
```

Các rule chưa confirmed chỉ được đưa vào nhóm:

```text
SUGGESTED
EXPLORATORY
BLOCKED
```

---

## 5. Ý nghĩa các rule (9 rules)

| Rule | Nội dung |
|---|---|
| `01-source-of-truth.md` | Nguồn spec ưu tiên, exception cho WEAK oracle investigation |
| `02-tc-level-mapping.md` | Khi nào sinh UT/IT/USERCASE + Max-Coverage strategy |
| `03-test-design-principles.md` | Risk-first, Field Validation Depth, Generic Patterns, UT Strong Verification |
| `04-traceability-gap-style.md` | Trace về Rule ID, xử lý Gap/Assumption/Conflict, TC format bắt buộc |
| `05-it-coverage-gate.md` | IT expanded coverage (11 trục) + IT Completeness Gate (18 IT-AXIS) |
| `06-quality-gates.md` | Coverage Gate + Oracle Gate + TC Classification (OFFICIAL/NEEDS_CLARIFICATION/SUGGESTED/EXPLORATORY/BLOCKED) |
| `07-review-and-readiness.md` | Review checklist + Automation Readiness Contract (Max-Coverage, Pure Layout definition) |
| `99-model-routing-gen-testcase.md` | Model routing theo workflow |
| `common.md` | Ngôn ngữ, CSV format, Module Output Paths |

---

## 6. Ý nghĩa các skill mới

### `spec-readiness-gate-checker`

Kiểm tra spec đầu vào trước khi sinh testcase.

Nhiệm vụ:

- đọc readiness report từ workspace 1;
- xác định rule nào được phép sinh testcase;
- xác định rule nào bị block;
- tách official/suggested scope.

---

### `testcase-coverage-reviewer`

Review coverage sau khi sinh testcase.

Nhiệm vụ:

- tạo coverage matrix;
- phát hiện rule chưa có testcase;
- phát hiện rule chỉ cover một phần;
- đề xuất testcase cần bổ sung.

---

### `testcase-oracle-reviewer`

Review chất lượng expected result.

Nhiệm vụ:

- phát hiện expected result mơ hồ;
- yêu cầu bổ sung message/code/state/side effect;
- rewrite expected result rõ hơn nếu spec có đủ thông tin;
- nếu spec không đủ thông tin thì đưa vào gap, không tự bịa.

---

## 7. Flow chạy chuẩn

```text
00_intake_spec
  ↓
01_prepare_manual_scope
  ↓
02_generate_ut
  ↓
03_generate_it
  ↓
04_generate_usercases
  ↓
05_review_and_gate          ← Review gap + Coverage Gate + Oracle Gate + WEAK clarification
  ↓ (sau khi QA confirm oracle nếu có)
06_clarify_and_finalize     ← Finalize official pack + Automation Readiness (Max-Coverage)
  ↓
07_handoff                  ← Manifest bàn giao cho Workspace 3
```

Ghi chú:

- Nếu chỉ cần manual testcase, có thể dừng ở `06_clarify_and_finalize.md` (bỏ qua WF07).
- WF05 sẽ DỪNG và yêu cầu QA confirm nếu có oracle WEAK cần làm rõ — không tự tiến sang WF06.

---

## 8. Khi nào dùng từng workflow?

| Workflow | Khi nào dùng | Output chính |
|---|---|---|
| `00_intake_spec.md` | Nhận spec từ workspace 1 | spec intake summary |
| `01_prepare_manual_scope.md` | Chọn scope/risk/module | manual_scope.md, coverage_plan.md |
| `02_generate_ut.md` | Sinh UT testcase | ut_manual_testcases.csv, ut_verification_matrix.csv |
| `03_generate_it.md` | Sinh IT testcase | it_manual_testcases.csv, it_coverage_matrix.csv |
| `04_generate_usercases.md` | Sinh Usercases | usercases.csv |
| `05_review_and_gate.md` | Review gap + Coverage Gate + Oracle Gate + WEAK clarification | manual_gap_report.md, coverage_matrix.csv, oracle_review.csv, clarification_requests.csv |
| `06_clarify_and_finalize.md` | QA confirm → finalize official pack + automation readiness | official_testcases.csv, automation_readiness_matrix.csv, automation_mapping.csv |
| `07_handoff.md` | Manifest bàn giao cuối → Workspace 3 | handoff_summary.md, final_handoff_manifest.csv |

---

## 9. Prompt mẫu để chạy workspace 2

### 9.1. Prompt tổng hợp: Gen testcase toàn trình cho 1 Module

Dùng prompt này khi bạn muốn AI tự động chạy toàn bộ quy trình sinh testcase (từ đọc spec đến khi đóng gói bàn giao) cho một module cụ thể.

```text
Hãy sinh manual testcase cho module: {module_name}.
Thực hiện lần lượt các workflow sau, sau mỗi workflow hãy báo cáo kết quả tổng quan và đợi tôi xác nhận trước khi chạy bước tiếp theo:
1. Chạy `/00_intake_spec` và `/01_prepare_manual_scope`.
2. Chạy `/02_generate_ut` (tập trung verify mạnh các business/field rules).
3. Chạy `/03_generate_it` (mở rộng cross-module/cross-role).
4. Chạy `/04_generate_usercases` (E2E business journey).
5. Chạy `/05_review_and_gate` (Review coverage, oracle gate. Dừng lại nếu có WEAK oracle cần tôi confirm).
6. Chạy `/06_clarify_and_finalize` (sau khi tôi đã confirm oracle) và `/07_handoff`.

Chú ý tuân thủ chặt chẽ các rule trong workspace, đặc biệt là Max-Coverage, Traceability và không tự suy diễn expected result.
```

---

### 9.2. Prompt tổng hợp: Gen testcase cho toàn bộ module (Triển khai theo Sprint)

Dùng prompt này khi hệ thống có quá nhiều module và bạn muốn AI lên kế hoạch chia nhỏ để xử lý dần, đảm bảo context AI không bị quá tải.

```text
Mục tiêu: Sinh testcase manual cho toàn bộ các module của dự án dựa trên tài liệu tại `inputs/source_to_spec_handoff`.

Do số lượng module lớn, hãy chia việc triển khai thành nhiều Sprint. 
1. Trước tiên, hãy quét thư mục `inputs/source_to_spec_handoff/modules/` để xác định danh sách các module hiện có.
2. Lập một Kế hoạch Triển khai (Sprint Plan) phân bổ các module vào từng Sprint dựa trên luồng nghiệp vụ, mức độ ưu tiên và sự phụ thuộc dữ liệu (ví dụ: module Core/Admin làm trước, module phụ trợ làm sau).
3. Trình bày bảng Sprint Plan để tôi xem xét. 

Sau khi tôi phê duyệt plan, chúng ta sẽ bắt đầu áp dụng quy trình chạy toàn trình (WF00 đến WF07) cho các module thuộc Sprint đầu tiên.
```

---

### 9.3. Các Prompt chi tiết chạy lẻ từng Workflow

### 9.3.1. Intake spec

```text
Chạy workspace spec-to-testcase cho module: {module_name}.

Input nằm tại:
./inputs/source_to_spec_handoff/modules

Yêu cầu:
- Đọc spec package từ workspace source-to-spec.
- Không sinh testcase từ inferred/unknown/gap/conflict rule như official testcase.
- Tách rõ OFFICIAL / SUGGESTED / EXPLORATORY / BLOCKED.
- Chuẩn bị scope sinh testcase theo risk-first.

Hãy chạy workflow 00_intake_spec.md và 01_prepare_manual_scope.md trước.
```

---

### 9.3.2. Sinh UT testcase mạnh hơn

```text
Chạy workflow 02_generate_ut.md cho module: {module_name}.

Yêu cầu:
- Sinh UT testcase từ confirmed rules.
- Verify mạnh branch logic, validation, boundary, exception path, dependency failure.
- Không viết UI flow trong UT.
- Mỗi testcase phải trace về Rule ID và Spec ID.
- Expected result phải cụ thể, có thể verify.
```

UT cần chú ý:

```text
- valid input
- invalid input
- null / empty
- min / max
- over limit
- duplicate
- permission logic nếu nằm trong service
- dependency returns error
- dependency throws exception
- repository save called / not called
- transaction/rollback nếu xác nhận được
```

---

### 9.3.3. Sinh IT testcase mở rộng

```text
Chạy workflow 03_generate_it.md cho module: {module_name}.

Yêu cầu:
- Sinh IT testcase tập trung vào tương tác giữa các module.
- Dựa vào module_interactions và cross-module contracts từ spec package.
- Verify data consistency, permission propagation, transaction/rollback, side effect.
- Mỗi testcase phải trace về Rule ID, Spec ID và Contract ID nếu có.
```

IT cần chú ý:

```text
- module A tạo dữ liệu → module B sử dụng được
- role được gán → permission có hiệu lực ở module khác
- API thành công → DB/UI/log/notification nhất quán
- lỗi ở module sau → module trước rollback hoặc xử lý đúng
- request lặp lại → không tạo duplicate nếu spec yêu cầu
```

---

### 9.3.4. Sinh testcase theo usecase

```text
Chạy workflow 04_generate_usecases.md cho module: {module_name}.

Yêu cầu:
- Sinh testcase theo luồng người dùng/end-to-end ở mức manual.
- Không trộn testcase usecase với UT.
- Với mỗi flow, nêu rõ precondition, test data, steps, expected result.
- Chỉ dùng confirmed behavior cho official testcase.
```

---

### 9.3.5. Review + Coverage Gate + Oracle Gate (WF05)

```text
Chạy workflow 05_review_and_gate.md cho module: {module_name}.

Yêu cầu:
- Review gap, duplicate, missing P1, missing role coverage.
- Tạo coverage matrix (FULL/PARTIAL/NOT_COVERED/BLOCKED_BY_SPEC_GAP).
- Review oracle từng TC (STRONG/ACCEPTABLE/WEAK/MISSING).
- Với TC oracle WEAK: điều tra browser recon → source code → tạo CLARIFICATION REQUEST.
- Dừng lại, trình bày clarification requests để QA xác nhận trước khi tiếp tục.
```

---

### 9.3.6. Finalize + Automation Readiness (WF06)

```text
Chạy workflow 06_clarify_and_finalize.md cho module: {module_name}.
(Chỉ chạy sau khi QA đã confirm toàn bộ clarification requests từ WF05)

Yêu cầu:
- Cập nhật oracle từ QA confirm.
- Finalize official/suggested/blocked/exploratory testcases.
- Đánh automation readiness theo Max-Coverage (UT+IT+USERCASE đều READY trừ pure layout).
- Tạo automation mapping cho Workspace 3.
```

---

## 10. Output chuẩn của workspace 2

Output nên đặt trong:

```text
production_artifacts/
  {module_name}/
    01_spec_intake_summary.md
    02_manual_scope.md
    03_ut_testcases.md
    04_it_testcases.md
    05_usecase_testcases.md
    06_manual_pack_review.md
    07_coverage_matrix.md
    08_oracle_review_report.md
    09_final_testcase_pack.md
    10_suggested_exploratory_blocked_testcases.md
    11_gap_report.md
    12_automation_input_pack.md
```

Tên file có thể thay đổi, nhưng bắt buộc phải có:

- final testcase pack;
- UT testcase;
- IT testcase;
- coverage matrix;
- oracle review report;
- gap report;
- automation input nếu chuyển sang automation.

---

## 11. Testcase format bắt buộc

Mỗi testcase nên có các field tối thiểu:

```text
Testcase ID
Module
Feature
Test level: UT / IT / USECASE / API / UI
Classification: OFFICIAL / SUGGESTED / EXPLORATORY / BLOCKED
Related Spec ID
Related Rule ID
Related Contract ID nếu có
Priority
Test type: positive / negative / boundary / permission / integration / regression
Precondition
Test data
Steps
Expected result
Automation readiness
Notes / Gap nếu có
```

---

## 12. Expected result đạt chuẩn

Expected result yếu:

```text
System displays error.
User cannot create user.
Data is invalid.
System works correctly.
```

Expected result tốt hơn:

```text
- Request bị reject.
- API trả về HTTP 409 nếu spec xác nhận.
- Error message hiển thị: "Email already exists" nếu spec xác nhận.
- Không có user record mới được tạo.
- Role mapping không được tạo.
- Existing user data không bị thay đổi.
```

Nếu spec không xác nhận exact message/status code, ghi rõ:

```text
Exact message/status code: GAP — not confirmed from spec/source.
```

Không được tự bịa.

---

## 13. Coverage matrix format

```text
Rule ID | Rule summary | Testcase ID | Coverage status | Missing case | Action
```

Ví dụ:

```text
USER-FIELD-001 | Username is required | TC_USER_001, TC_USER_002 | FULL | None | None
USER-FIELD-002 | Username max length 200 | TC_USER_003 | PARTIAL | Missing 201 chars | Add boundary negative case
USER-PERM-001 | Only admin can delete user | TC_USER_010 | PARTIAL | Missing normal user deletes another user | Add permission negative case
```

---

## 14. Điều kiện finalize testcase

Chỉ finalize khi:

```text
1. Mỗi OFFICIAL testcase trace được về Rule ID/Spec ID.
2. Confirmed critical rule không còn NOT_COVERED.
3. Expected result không còn MISSING.
4. Expected result WEAK phải được sửa hoặc đưa vào gap.
5. SUGGESTED/EXPLORATORY/BLOCKED được tách riêng.
6. Gap report được cập nhật.
```

Không finalize nếu:

```text
- testcase không trace được về rule;
- expected result chung chung;
- coverage matrix thiếu;
- rule critical chưa được cover;
- inferred rule bị đưa vào official testcase.
```

---

## 15. Cách xử lý khi review FAIL

| Lỗi | Cách xử lý |
|---|---|
| Rule chưa có testcase | Bổ sung testcase hoặc ghi rõ blocked by spec gap |
| Expected result yếu | Chạy lại `testcase-oracle-reviewer` để rewrite |
| Testcase không trace được | Loại khỏi official pack hoặc map lại rule |
| IT thiếu cross-module check | Chạy lại `03_generate_it.md` |
| UT thiếu boundary/exception | Chạy lại `02_generate_ut.md` |
| Spec không đủ thông tin | Tạo gap report và quay lại workspace 1 |

---

## 16. Nguyên tắc vận hành thực tế

Nên làm:

```text
1. Sinh theo từng module.
2. Sinh UT và IT tách riêng.
3. Review coverage sau khi sinh.
4. Review expected result trước khi finalize.
5. Tách official và suggested testcase.
6. Quay lại workspace 1 nếu spec thiếu.
```

Không nên làm:

```text
- Sinh toàn bộ testcase từ spec chưa READY.
- Gộp UT, IT, UI, API thành một danh sách lẫn lộn.
- Chấp nhận expected result kiểu chung chung.
- Dùng inferred rule làm testcase chính thức.
- Bỏ qua coverage matrix.
```

---

## 17. Câu lệnh/prompt kiểm tra nhanh trước khi finalize

```text
Hãy kiểm tra testcase pack hiện tại của module {module_name}.

Trả lời theo format:
1. Finalize status: PASS / FAIL
2. Coverage summary: FULL / PARTIAL / NOT_COVERED theo từng rule
3. Oracle summary: STRONG / ACCEPTABLE / WEAK / MISSING
4. Danh sách testcase không đủ điều kiện OFFICIAL
5. Danh sách rule cần bổ sung testcase
6. Gap cần quay lại workspace source-to-spec
7. Kết luận có được finalize không
```

---

## 18. Kết luận

Workspace này đóng vai trò là **bộ sinh testcase có kiểm soát chất lượng**.

Câu nhớ nhanh:

```text
Không có trace thì không phải official testcase.
Expected không verify được thì chưa đạt.
Không có coverage matrix thì chưa finalize.
Rule chưa confirmed thì không đưa vào official pack.
```
