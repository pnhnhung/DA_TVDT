# Manual Output Quality Policy

## Mục tiêu
Manual testcase sinh ra phải dùng được trực tiếp cho review nghiệp vụ và làm input cho automation mà không cần refactor lớn.

## Tiêu chuẩn bắt buộc
- Atomic: một testcase cho một điều kiện kiểm chính.
- Observable: expected result nhìn thấy hoặc xác định được.
- Assertable: expected result đủ rõ để chuyển thành assertion.
- Traceable: map được về rule cụ thể.
- Business-facing: ưu tiên diễn đạt theo hành vi hệ thống/nghiệp vụ.

## Không đạt chất lượng nếu
- gộp nhiều điều kiện biên vào một testcase
- dùng từ mơ hồ như `ok`, `hợp lệ`, `mượt`, `qua bước`
- nhắc tới mock, 404, stub, service internals trong manual testcase mặc định
- trace chỉ tới chương lớn mà không tới rule con
