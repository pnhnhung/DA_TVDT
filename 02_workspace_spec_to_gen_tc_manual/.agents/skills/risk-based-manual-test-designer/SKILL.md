---
name: risk-based-manual-test-designer
description: Sinh manual testcase gọn, risk-first, traceable từ source-to-spec handoff/spec/checklist/viewpoint. Dùng cho UT, IT hoặc USERCASE.
---

# Risk-Based Manual Test Designer

## Goal
Tạo manual testcase đủ mạnh để dùng tiếp cho automation, nhưng không bị phình vì exhaustive viewpoints.

## Instructions
1. Xác định scope feature từ source-to-spec handoff, spec_curated, checklist_refined, core_manual_input, conditional packs nếu feature thực sự có.
2. Chọn testcase theo thứ tự: P1 mandatory -> P2 liên quan trực tiếp -> P3 chỉ khi user yêu cầu.
3. Tận dụng heuristic chung từ rules.
4. Khi viết testcase: objective rõ, preconditions/test data đủ, steps gọn, expected result quan sát được/đo được, trace cụ thể.
5. Giảm trùng lặp nhưng không gộp nhiều boundary/rule quan trọng nếu mất tính atomic.
6. Đặt mình là end user cuối để nghĩ ra các trường hợp có thể xảy ra trong thực tế.
7. Không nên tự ý thêm các trường hợp không có trong spec hoặc checklist

## Constraints
- Không brute-force toàn bộ viewpoint list.
- Không tạo testcase chỉ để kiểm UI cosmetic mặc định.
- Không bỏ sót P1 nếu feature tồn tại.
- Không dùng chi tiết framework/test harness như mock, HTTP status, stub, internal service behavior trong manual testcase trừ khi user yêu cầu.
