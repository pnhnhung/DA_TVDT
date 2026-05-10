# Field Validation Policy

File này dùng để hướng dẫn cách sinh manual testcase validation cho field khi user cần kiểm sâu một số field hoặc một màn hình cụ thể.

## Nguyên tắc chung
- Không áp dụng máy móc mọi heuristic cho mọi field.
- Chỉ sinh testcase khi có căn cứ từ spec, checklist, viewpoint, hoặc khi heuristic đó là chuẩn kiểm thử cơ bản và không tạo suy diễn sai.
- Nếu thiếu rule quan trọng, ghi `Gap / Open Question`.

## Text / Lookup Field
Xem xét khi phù hợp:
- required / optional
- existing / non-existing in master data hoặc DB lookup
- uniqueness / duplicate nếu spec có nói
- min / max length nếu spec có nói
- allowed / disallowed character set nếu spec có nói
- trim / case sensitivity nếu spec có nói
- autofill / dependent field behavior

## Numeric Field
Xem xét khi phù hợp:
- required / optional / default
- positive / negative / zero
- integer / decimal
- min / max / boundary
- precision / scale / rounding
- downstream calculation impact

## Date / Time Field
Xem xét khi phù hợp:
- required / optional
- past / current / future
- min / max / boundary
- date range dependency
- format / timezone nếu spec có nói rõ

## Choice / State Field
Xem xét khi phù hợp:
- default value
- valid options
- hidden / disabled / readonly
- permission-based visibility
- dependency tới field khác

## Khi nào phải nâng lên ưu tiên cao
Ưu tiên kiểm sâu khi field là:
- amount / quantity / price / rate / tax
- identifier / code / key / reference
- date ảnh hưởng workflow
- password / OTP / token
- field quyết định role routing, status transition hoặc data persistence
