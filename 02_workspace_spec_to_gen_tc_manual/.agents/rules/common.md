---
trigger: always_on
---

# Common Rules

1. BẮT BUỘC: Toàn bộ quá trình giao tiếp (chat), giải thích, comment, báo cáo, và các artifact sinh ra đều phải bằng TIẾNG VIỆT 100%. Rõ ràng và dễ review.
2. Giữ nguyên tên field, role, API, màn hình, trạng thái nếu đó là định danh hệ thống.
3. Không suy diễn business rule, validation rule, permission, workflow nếu nguồn không xác nhận.
4. Mọi testcase phải có trace tối thiểu về spec/handoff/checklist/viewpoint.
5. Tách rõ `confirmed`, `inferred`, `gap`, `conflict`.
6. Output theo module: dùng `module_<module_name>`, không dùng `modul_*`.
7. Không sinh automation code trong workspace này.
8. Module Output Structure Rule
9. Chống gộp Testcase (Anti-condensation Rule): Cấm tuyệt đối việc gộp các màn hình, thực thể, hoặc tab có cấu trúc giống nhau vào chung 1 bộ testcase (ví dụ: gộp Skill, Education, License). Phải sinh testcase CRUD tách biệt cho từng endpoint/UI screen để phục vụ Automation.

## Xác Nhận Trước Khi Thực Thi (BẮT BUỘC)

**Khi gặp bất kỳ tình huống nào sau đây, AI phải DỪNG lại và xác nhận với QA/User trước khi thực thi:**

- Yêu cầu không rõ ràng, có thể hiểu theo nhiều cách khác nhau
- Phạm vi thực hiện không chắc chắn (ví dụ: không rõ áp dụng cho 1 module hay nhiều module)
- Có mâu thuẫn giữa yêu cầu hiện tại và rule/spec đã có
- Cần đưa ra quyết định thiết kế quan trọng ảnh hưởng đến output
- Dữ liệu đầu vào thiếu hoặc mâu thuẫn
- Bước tiếp theo có nhiều hướng thực hiện và mỗi hướng cho output khác nhau

### Format xác nhận bắt buộc

```md
## ❓ Cần Xác Nhận Trước Khi Tiếp Tục

**Tình huống:** [Mô tả ngắn gọn vấn đề đang gặp phải]

**Tại sao cần xác nhận:** [Lý do — ví dụ: có thể hiểu theo 2 hướng, ảnh hưởng lớn đến output]

**Các phương án:**

- Option 1: [Mô tả cụ thể hướng thực hiện 1 — ưu/nhược điểm nếu có]
- Option 2: [Mô tả cụ thể hướng thực hiện 2 — ưu/nhược điểm nếu có]
- Option 3: [Mô tả cụ thể hướng thực hiện 3 — hoặc "Không thực hiện bước này"]

**AI đề xuất:** Option [X] — vì [lý do ngắn gọn, cốt lõ]

→ Vui lòng xác nhận option nào để AI tiếp tục.
```

### Nguyên tắc

- **KHÔNG tự suy đoán** rồi thực thi khi chưa chắc chắn — ngay cả khi AI cho rằng hướng đó có vẻ đúng.
- **KHÔNG đưa ra hơn 3 option** — nếu có nhiều hướng hơn, gộp các hướng tương tự lại.
- **Phải có AI đề xuất** — không được chỉ liệt kê option mà không nêu quan điểm.
- **Dừng hoàn toàn** — không tiếp tục thực thi bất kỳ phần nào khác cho đến khi có xác nhận.
- Ngoại lệ duy nhất: task hoàn toàn rõ ràng, không có cách hiểu nào khác → tiến hành bình thường.

## Mục tiêu

Khi xử lý theo từng module, toàn bộ artifact chi tiết phải được lưu tách riêng theo module để dễ quản lý, review và handoff.

## Quy ước module_id

Mỗi lần chạy workflow phải xác định rõ:

- module_name
- module_id

`module_id` phải dùng dạng snake_case.

Ví dụ:

| Module name | module_id |
|---|---|
| User Management | user_management |
| Role Permission | role_permission |
| Employee Management | employee_management |
| Authentication | authentication |

## Quy tắc lưu output

Tất cả output chi tiết của module phải lưu vào:

```text
production_artifacts/modules/{module_id}/
```

## Quy định về định dạng CSV (BẮT BUỘC)

Để đảm bảo các Agent Automation có thể đọc dữ liệu chính xác, mọi file CSV sinh ra phải tuân thủ:

1.  **Encoding:** BẮT BUỘC dùng **UTF-8 (không có BOM)**. Tránh lỗi hiển thị tiếng Việt.
2.  **Dấu phân cách:** Dùng dấu phẩy (`,`).
3.  **Bao đóng (Quoting):** Dùng dấu ngoặc kép (`"`) cho các ô có chứa dấu phẩy, dấu xuống dòng, hoặc dấu ngoặc kép.
4.  **Escaping:** Dấu ngoặc kép bên trong nội dung phải được viết lặp hai lần (`""`). Ví dụ: `Error "Required"` -> `"Error ""Required"""`.
5.  **Headers:** Luôn có dòng Header ở đầu file.
6.  **Hybrid Content:** Nếu file chứa cả văn bản giải thích và bảng (như `handoff_summary.csv`), hãy đưa văn bản vào cột đầu tiên của CSV để bảo toàn nội dung.

## Module Output Paths

Tất cả output chi tiết của module phải lưu vào đúng cấu trúc:

```text
production_artifacts/analysis/module_<module_name>/
production_artifacts/testcases/UT/module_<module_name>/
production_artifacts/testcases/IT/module_<module_name>/
production_artifacts/testcases/USERCASE/module_<module_name>/
production_artifacts/review/module_<module_name>/
production_artifacts/coverage/module_<module_name>/
production_artifacts/final_testcase_pack/module_<module_name>/
production_artifacts/automation_input/module_<module_name>/
```

- Dùng `module_<module_name>` (snake_case). KHÔNG dùng `modul_*`.
- TC liên quan nhiều module → đặt tại module chính, ghi related modules trong testcase/matrix.