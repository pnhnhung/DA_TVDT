---
trigger: always_on
---

# Rule 00 — Common Governance

Áp dụng cho toàn bộ workspace manual testcase → automation code.

## 1. Ngôn ngữ và cách trình bày

- Output bằng tiếng Việt, rõ ràng, có cấu trúc.
- Luôn tách rõ: `confirmed`, `inferred`, `gap/unknown`, `action_required`.
- Không suy diễn nghiệp vụ, data, locator, framework convention nếu input không xác nhận.
- Không lẫn manual testcase layer với automation implementation layer.

## 2. Traceability bắt buộc

Mọi output và code mới phải trace được:

```text
manual testcase id
→ automation decision
→ state id
→ test file / test function
→ page object method
→ test data strategy
→ execution result
```

Nếu không trace được testcase ID đến source code hoặc execution result, state chưa đạt Definition of Done.

## 3. Bảo mật và config

- Không hardcode secret, password, token, account thật, private URL trong code hoặc artifact.
- Dùng config/env loader hiện có của framework (ví dụ: `configs/config.py` hoặc đọc trực tiếp `configs/environments/*.yaml`).
- **BẮT BUỘC:** Khi điều tra UI (MCP/Browser), phải sử dụng đúng `base_url` và `credentials` (username/password) được định nghĩa trong framework config. KHÔNG được tự ý dùng account mặc định hoặc truy cập các site demo công khai nếu không có yêu cầu.
- **BẮT BUỘC QUY TRÌNH BROWSER SUBAGENT:** 
  1. Trước khi gọi Subagent thực hiện bất kỳ tác vụ nào yêu cầu đăng nhập, Agent PHẢI chủ động đọc file `dev.env` (ví dụ: `config/environments/dev.env`) để lấy chính xác thông tin đăng nhập.
  2. Trong prompt gửi cho Subagent, PHẢI cung cấp tường minh thông tin đăng nhập (VD: "Login using username 'admin' and password 'Admin@1234'"), TUYỆT ĐỐI không dùng các câu lệnh chung chung như "login as admin".
- Không tự tạo `.env`, YAML, credential file mới nếu framework đã có convention.
- Nếu thiếu account/env/data để chạy, đánh dấu `ACTION_REQUIRED` thay vì tự bịa.
- **BẮT BUỘC:** Trước khi triển khai bất kỳ sửa đổi logic hoặc code fix nào, Agent phải trình bày phương án (root cause + giải pháp) và chờ User xác nhận bằng tin nhắn mới được tiến hành.

## 4. Output governance

Output phải tách theo module/state:

```text
production_artifacts/automation_scope/
production_artifacts/automation_design/
production_artifacts/generation_state/<module>/<state_id>/
production_artifacts/review/<module>/<state_id>/
production_artifacts/execution/<module>/<state_id>/
production_artifacts/debug/<module>/<state_id>/
production_artifacts/final_report/<module>/
```

Mỗi artifact cần có header:

```text
module:
state_id:
source_input:
framework_root:
generated_at:
status:
```

## 5. Direct-to-framework principle

- Flow chính là generate trực tiếp vào framework thật.
- `production_artifacts/code_drafts/` không còn là output chính.
- Không được generate code trực tiếp nếu chưa có framework contract/reuse inventory tối thiểu.
- Sau mỗi state phải report kết quả và chờ user xác nhận trước khi sang state tiếp theo.

## 6. Khi thiếu dữ kiện

Nếu thiếu dữ kiện để code an toàn, dùng một trong các trạng thái:

```text
AUTO_WITH_CONDITION
BLOCKED
NEED_USER_CONFIRMATION
```

Không được đẩy rủi ro mơ hồ xuống bước execute/debug.
- Agent không được để lại file tạm/scratch trong framework sau khi hoàn tất workflow. File tạm phải được cleanup hoặc report rõ lý do cần giữ lại.

## 7. Tất cả suy luận, phán đoán cần hiển thị ra màn hình để tôi biết được bạn đang điều tra theo hướng nào.

## 8. Khi thực hiện debug, luôn tuân thủ đưa file debug vào thư mục /ai_debug, không được tự ý tạo file các thư mục khác.
sau khi hoàn thành phải clear các file rác

## 9. Khi bắt đầu thực thi module nào cần trình bày rõ plan:
Có mấy phase, phase nào làm gì, khối lượng công việc bao nhiêu (ví dụ: Phase 1: gen testcase module A, 10 case từ 1-10,..)

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

**AI đề xuất:** Option [X] — vì [lý do ngắn gọn]

→ Vui lòng xác nhận option nào để AI tiếp tục.
```

### Nguyên tắc

- **KHÔNG tự suy đoán** rồi thực thi khi chưa chắc chắn — ngay cả khi AI cho rằng hướng đó có vẻ đúng.
- **KHÔNG đưa ra hơn 3 option** — nếu có nhiều hướng hơn, gộp các hướng tương tự lại.
- **Phải có AI đề xuất** — không được chỉ liệt kê option mà không nêu quan điểm.
- **Dừng hoàn toàn** — không tiếp tục thực thi bất kỳ phần nào khác cho đến khi có xác nhận.
- Ngoại lệ duy nhất: task hoàn toàn rõ ràng, không có cách hiểu nào khác → tiến hành bình thường.