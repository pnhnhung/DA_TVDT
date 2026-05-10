# Selected Viewpoints: PIM

Dựa trên scope và risk, các viewpoint sau sẽ được áp dụng:

## Core Viewpoints
- **Required/Null/Blank**: First/Last name.
- **Unique Validation**: `employeeId` toàn cục, `workEmail` & `otherEmail` (cũng phải khác nhau).
- **Boundary**: Giới hạn độ dài tên (30 chars).
- **State Transition**: Terminate Employee -> Phải đổi trạng thái sang Terminated.
- **Image Validation**: Upload `empPicture` (check loại file jpg, png... và size).

## Conditional Packs
- **Cross-module Events**:
  - Employee creation -> Leave/Time trigger.
  - Delete Admin user -> Thất bại (Undeletable check).
- **File Upload Pack**: Import CSV, Upload Picture.
