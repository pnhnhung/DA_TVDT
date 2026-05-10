# Spec Inbox

Đây là nơi đặt tài liệu trước khi bắt đầu conversation với Antigravity.

## Nên đặt gì vào đây

- SRS / BRD / FRD / use case
- User story + acceptance criteria
- API spec
- Screen flow / sitemap
- Excel checklist mới
- Tài liệu phân quyền / role matrix
- Tài liệu import-export / batch / report / notification
- Ghi chú release / change request

## Quy ước tên file

- `01_srs_<module>.md|docx|pdf`
- `02_user_stories_<release>.xlsx|md`
- `03_api_spec_<module>.yaml|json|md`
- `04_role_matrix.xlsx`
- `05_screen_flow.png|pdf`
- `06_release_note.md`

## Cách dùng

1. Thả file vào `spec_inbox/`
2. Chạy workflow `/00_intake_spec`
3. Antigravity sẽ tạo bản tóm tắt có cấu trúc vào `inputs/spec_curated/` và `production_artifacts/analysis/`
