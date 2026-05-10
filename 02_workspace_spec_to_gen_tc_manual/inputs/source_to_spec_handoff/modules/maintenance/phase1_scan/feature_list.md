# Feature List: Maintenance

| Feature ID | Nhóm chức năng | Tên API/Endpoint | Method | Route | Controller/API File | Note | Status |
|---|---|---|---|---|---|---|---|
| MNT-001 | Purge | Xóa nhân viên | DELETE | `/api/v2/maintenance/purge` | `Api/PurgeEmployeeAPI.php` | Xóa vĩnh viễn Employee | inferred |
| MNT-002 | Purge | Lấy DS Ứng viên | GET | `/api/v2/maintenance/candidates` | `Api/PurgeCandidateAPI.php` | Danh sách để purge | inferred |
| MNT-003 | Purge | Xóa ứng viên | DELETE | `/api/v2/maintenance/candidates/purge` | `Api/PurgeCandidateAPI.php` | Xóa vĩnh viễn Candidate | inferred |
| MNT-004 | GDPR | Xuất file dữ liệu | GET | `/maintenance/accessEmployeeData/{empNumber}`| `Controller/File/AccessEmployeeFileController.php`| Tải cục file JSON | inferred |
