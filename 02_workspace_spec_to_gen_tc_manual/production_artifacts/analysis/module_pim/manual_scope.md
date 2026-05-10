# Manual Scope: PIM

## Scope bao gồm (In-Scope)
- **Employee Lifecycle (P1)**: Add (UI/CSV), Terminate, Delete.
- **Core Info Updates (P1)**: Personal Details, Contact Details, Job Details.
- **Employee Extensions (P2)**: Dependents, Salary, Emergency Contacts, Qualifications.
- **Report & Export (P2)**: PIM Reports, View employee data.

## Scope loại trừ (Out-of-Scope / Blocked)
- Reactivate Employee (Bị Block do thiếu spec).
- Chỉnh sửa sơ đồ tổ chức (Thuộc quyền của Admin module).
- Phê duyệt Workflow nghỉ phép (Thuộc quyền của Leave module).

## Risk Assessment
- **Data Integrity**: Thông tin Employee là master data cực kỳ quan trọng. Trùng `employeeId` hoặc sai logic email sẽ gây lỗi domino.
- **Data Dependency**: Sửa ngày gia nhập (JoinedDate) sẽ trigger sự kiện ảnh hưởng tới Leave.
- **Access/Security**: Employee không được tự ý sửa đổi Contact Details/Job Details của người khác nếu không có Role phù hợp.
