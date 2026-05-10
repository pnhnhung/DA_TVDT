---
trigger: always_on
---

# R00 — Common Rules (Always On)

## Ngôn ngữ & Giao tiếp
- Luôn output bằng **tiếng Việt**, rõ ràng, dễ hiểu.
- Không dùng từ kỹ thuật khó hiểu nếu có từ thay thế đơn giản hơn.

## Source & Evidence
- **Nguồn sự thật chính**: source code, schema/entity, route/controller, service, validation, config, seed data, tài liệu trong `inputs/`.
- **Thứ tự ưu tiên bằng chứng**: service/business logic > validator/schema/entity > controller/API > UI/form > test fixture.
- Mọi rule phải có `source_trace` hoặc bị đánh dấu `gap`.
- **NGHIÊM CẤM** thêm, sửa, xóa bất kỳ file nào trong `source-system/`. Chỉ được đọc.
- **NGHIÊM CẤM TỰ ĐỘNG HÓA**: Tuyệt đối KHÔNG ĐƯỢC tự ý viết script (Python, Bash, PHP, v.v.) để tự động quét, parse, hoặc trích xuất logic (field rules, business rules, v.v.) từ source code nhằm mục đích "làm nhanh". Mọi logic phải được AI đọc thủ công 100% bằng công cụ (view_file) để phân tích chiều sâu, nhằm đảm bảo an toàn và tính chính xác tuyệt đối. Không được tự ý "sáng tạo" quy trình khi chưa có sự cho phép rõ ràng từ User.

## Phân loại kết luận (bắt buộc)
Mọi rule/record phải được phân loại rõ:

| Status | Nghĩa |
|---|---|
| `confirmed` | Có bằng chứng trực tiếp từ source |
| `inferred` | Có khả năng đúng nhưng chưa chứng minh trực tiếp |
| `gap` | Cần thiết để test nhưng đang thiếu/mâu thuẫn |
| `conflict` | Từ 2+ nguồn mâu thuẫn nhau |

- `low confidence` không được bàn giao như `confirmed`.
- `conflict` phải đưa vào `gaps.md`.
- Không tự nâng status/confidence nếu chưa có evidence mới.

## Module Output
- Mỗi module phải có `module_id` dạng snake_case (ví dụ: `employee_management`).
- Toàn bộ output của module lưu vào: `production_artifacts/modules/{module_id}/`
- Không viết testcase trong workspace này.

## Source Trace Format
```
path/to/file.ext#symbol:line_start-line_end[evidence_type]
```
Ví dụ: `source-system/app/Services/UserService.php#createUser:45-89[service]`

Evidence type hợp lệ: `route`, `controller`, `request_validator`, `schema`, `entity`, `model`, `service`, `domain`, `policy`, `middleware`, `config`, `migration`, `seed`, `document`.

Không hợp lệ: `"xem trong source"`, `"theo code"`, `"controller xử lý"`.

## Quản lý File Tạm (Progress / Scratch files)
- Mọi script tự động (Python, PHP, bash...) sinh ra trong quá trình quét dữ liệu bắt buộc phải lưu trong thư mục `progress_file/`.
- Không lưu các file tạm này lộn xộn trong thư mục `scratch/` mặc định của hệ thống mà không quản lý.
- **Cleanup Rule**: Sau khi hoàn tất một workflow hoặc trích xuất xong dữ liệu cho module, phải chủ động xóa hoặc dọn dẹp các file rác sinh ra trong quá trình xử lý (như file text dump tạm, script chạy 1 lần không còn dùng), giữ lại không gian làm việc sạch sẽ. Các file script có giá trị tái sử dụng cao thì để lại trong `progress_file/`.

## Triết lý Làm Việc: Chậm nhưng Chắc (Quality First)
- **CẤM SKELETON**: Tuyệt đối không được tạo các file spec chỉ có khung hoặc ghi chú chung chung ("thiếu spec", "GAP"). Mỗi file khi đã được tạo/bàn giao phải chứa thông tin có giá trị nghiệp vụ thực tế dựa trên việc phân tích source code.
- **ƯU TIÊN CHIỀU SÂU**: Ưu tiên hoàn tất triệt để 4 Phase cho MỘT module duy nhất trước khi bắt đầu module tiếp theo. Tuyệt đối không làm song song nhiều module dẫn đến loãng thông tin và thiếu sót logic.
- **NGUYÊN TẮC "GỐC-NGỌN"**: Luôn ghi nhớ đây là bước nền tảng. Sai một rule ở đây sẽ dẫn đến sai hàng loạt ở bước sinh testcase manual và automation. Phải double-check logic tại Service/API layer trước khi confirm rule.
- **ĐIỀU KIỆN READY**: Một module chỉ được đánh dấu `READY` khi đã xóa bỏ hoàn toàn các `gap` quan trọng (blockers) liên quan đến field rules, business rules và permissions. Nếu còn gap, module đó bắt buộc phải giữ trạng thái `PARTIAL_READY` hoặc `NOT_READY`.

