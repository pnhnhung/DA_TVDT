# Selected Viewpoints: Admin

Dựa trên scope và risk, các viewpoint sau sẽ được áp dụng:

## Core Viewpoints
- **Required/Null/Blank**: Áp dụng cho các trường bắt buộc (username, password, empNumber, title...).
- **Boundary Validation**: Kiểm tra length max (username <= 40, password <= 64, title <= 100...).
- **Unique Validation**: Kiểm tra trùng lặp (username, job title, category, subunit...).
- **State Transition / Logic Control**:
  - Delete User: Self-deletion check, Default Admin check.
  - Delete Subunit: Root node protection (id=1).
  - Pay Grade: Min/Max logic check.

## Conditional Packs
- **File Upload Pack**: Áp dụng cho Job Specification (base64, cờ currentJobSpecification: keep/replace/delete).
- **Cross-module Pack**: Liên kết giữa User và Employee (PIM).
