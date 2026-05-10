---
trigger: always_on
---

# Rule 03 — Test Data First

Automation chỉ ổn định khi data setup/pre-condition được kiểm soát trước action chính.

## 1. Không giả định data tồn tại

- Tuyệt đối không dùng sample data nếu chưa xác nhận data đó tồn tại.
- **ƯU TIÊN KIỂM TRA TẠI NGUỒN (MANDATORY PRE-CHECK):** Mọi test case sử dụng dữ liệu danh mục (Job Title, Hiring Manager, Employee, Vacancy) BẮT BUỘC phải thực hiện kiểm tra sự tồn tại và tính hợp lệ (Active) của dữ liệu đó tại module quản lý (Admin, PIM) trong bước `@given`. Nếu dữ liệu không tồn tại, phải tự động khởi tạo dữ liệu mồi hợp lệ. Không được để test fail do thiếu- Dữ liệu random phải **traceable / deterministic** — có thể truy ngược test gây lỗi.
- **BẮT BUỘC:** Các trường có ràng buộc Unique (Email, Username, Vacancy Name, Code/ID) phải sử dụng suffix timestamp hoặc random string.
  - Ví dụ email: `auto_user_1712049200@auto.test`
 kiểm tra bằng một trong các cách hợp lệ:
  - UI search/list/detail.
  - API nếu framework/app cho phép.
  - DB query nếu app context và helper DB hợp lệ.
  - Setup flow hợp lệ qua UI.

## 2. Idempotent data setup

Với mỗi data cần dùng:

1. Tìm xem đã tồn tại chưa.
2. Nếu tồn tại và phù hợp, reuse.
3. Nếu không tồn tại, tạo mới bằng flow hợp lệ.
4. Sau khi tạo, verify lại data đã sẵn sàng.
5. Ghi data key vào `scenario_context`, `test_context` hoặc context tương ứng nếu cần.

## 3. Unique data strategy

Data có ràng buộc unique phải có suffix để chạy lại nhiều lần không bị trùng:

```text
<prefix>_<testcase_id>_<YYYYMMDDHHMMSS>_<random>
```

Ví dụ:

```text
auto_vacancy_TC001_20260427113022_A3F2
```

Không hardcode username/email/name unique nếu testcase có thể chạy lại.
## 7. Xử lý Dropdown/Select (OrangeHRM 5)
- Với các dropdown dạng custom (`.oxd-select-wrapper`), không giả định toàn bộ option có sẵn trong DOM.
- Chiến thuật ưu tiên: Click vào dropdown -> Nhập ít nhất 3 ký tự của item cần tìm để filter -> Chọn item từ list kết quả.
- Nếu không cho filter, phải thực hiện scroll trong container của listbox cho đến khi item xuất hiện và visible hoàn toàn trước khi click.

## 8. Xử lý Hộp thoại xác nhận (Confirmation Dialog)
- Các hành động "Reset", "Delete", hoặc thay đổi dữ liệu đang có ràng buộc (như đổi Vacancy khi đã có lịch phỏng vấn) thường kích hoạt hộp thoại xác nhận.
- Script phải chủ động kiểm tra sự xuất hiện của các nút như "Yes, Confirm" hoặc "Yes, Delete" và xử lý trước khi tiếp tục flow chính.

## 4. Data liên module

Nếu module đang test phụ thuộc data của module khác, phải vào đúng module liên quan để tìm/tạo data.

Ví dụ:

```text
Muốn tạo Vacancy
→ cần Job Title
→ vào Admin/Job Title để tìm hoặc tạo Job Title
→ verify Job Title active/usable
→ quay lại Recruitment/Vacancy để tạo Vacancy
```

Không được giả định Job Title, Hiring Manager, Employee, Vacancy, Candidate hoặc data liên quan khác tồn tại nếu chưa verify.

## 5. Verify data trên list/table

- Phải search/filter nếu UI hỗ trợ.
- Nếu có pagination, phải tìm qua toàn bộ page trước khi kết luận không tồn tại.
- Nếu list dùng lazy loading/infinite scroll, phải scroll/load thêm theo strategy rõ ràng.
- Nếu verify bằng DB/API, vẫn phải đảm bảo testcase yêu cầu UI behavior thì UI behavior đã được kiểm tra đúng.

## 6. DB check

Có thể dùng DB để kiểm tra data trước/sau khi thực hiện nếu:

- Framework đã có DB helper hoặc config DB hợp lệ.
- Query chỉ đọc hoặc setup an toàn.
- Không phá dữ liệu thật.
- Không dùng DB để né business flow UI nếu testcase đang kiểm tra UI behavior.

## 9. Test Data Isolation — Tránh Cascade Failure

### Nguyên tắc

**Mỗi TC phải tự setup precondition data riêng**, không được phụ thuộc vào data được tạo bởi TC khác trong cùng suite.

**Lý do:**
Khi data share theo chuỗi A → B → C:
- TC_A fail → TC_B, TC_C fail theo dù logic của chúng hoàn toàn đúng
- Report hiện **3 lỗi** nhưng chỉ có **1 root cause** thật sự
- Không xác định được TC_B, TC_C có vấn đề gì không
- Debug tốn thời gian vì phải phân biệt lỗi cascade với lỗi logic thật

### Chiến lược theo loại TC

| Loại TC | Data Strategy |
|---|---|
| **Validate empty/invalid** | Không cần pre-data — test trực tiếp UI form |
| **Duplicate check** | Tự tạo data riêng → thử duplicate → verify lỗi → cleanup |
| **Edit** | Tự tạo data riêng ở đầu test → edit → cleanup |
| **Delete** | Tự tạo data riêng ở đầu test → delete |
| **Search/View** | Tự tạo data riêng ở đầu test → search/verify → cleanup |

### Khi nào chấp nhận shared data?

Chỉ chấp nhận shared data (ở `describe` scope) khi:
1. Đã dùng `test.describe.serial()` để đảm bảo thứ tự
2. Có sự phụ thuộc rõ ràng theo nghiệp vụ (Create → Edit → Delete là 1 flow liên tục)
3. Đã cân nhắc và chấp nhận: nếu TC đầu fail → TC sau sẽ **skip** (không phải fail)

**Ưu tiên isolated data** — chỉ dùng shared data khi flow nghiệp vụ thực sự yêu cầu và đã dùng `serial()`.

### Trade-off

| | Shared Data (serial) | Isolated Data |
|---|---|---|
| Tốc độ | Nhanh hơn (ít setup) | Chậm hơn (mỗi TC setup riêng) |
| Accuracy failure report | Thấp (cascade risk) | Cao (thật sự độc lập) |
| Chạy song song | Không an toàn | An toàn |
| Debug | Khó hơn | Dễ hơn |

**Kết luận: Isolated data được ưu tiên cho maintainability và report accuracy.**
