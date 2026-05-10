# Spec Gap Report: Admin

| Gap ID | Description | Impact on Testing | Action Required |
|---|---|---|---|
| GAP-ADMIN-001 | File gaps_and_questions.md báo thiếu field/business rules cho các module danh mục (Pay Grade, Qualifications, Structure) nhưng thực tế `field_rules.csv` đã có. | Thiếu business rules chuyên sâu, chỉ có thể test validation bề mặt. | Cần BA bổ sung Business Rules cho các danh mục (nếu có logic đặc thù). Trước mắt test theo CRUD chuẩn. |
| GAP-ADMIN-002 | Thiếu đặc tả về Workflow liên quan đến các cấu hình Configuration (Email, Modules). | Không test được tác động hệ thống khi đổi cấu hình. | Blocked phần test tác động hệ thống, chỉ test API Save. |
