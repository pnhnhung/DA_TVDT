# Manual Gap Report: Service Catalog

| Gap ID | Testcase / UC Ref | Mô tả vấn đề | Mức độ | Đề xuất xử lý |
|---|---|---|---|---|
| GAP-SERV-01 | IT-SERV-005, UC-SERV-003 | Header `x-enterpriser-token` được khởi tạo/refresh như thế nào trên App? | Medium | Cần Dev App confirm cơ chế truyền token này vào request. |
| GAP-SERV-02 | UC-SERV-002 | Khi MASTER tắt Service (INACTIVE), session của Customer đang online có bị revoke (xóa token khỏi cache/DB) ngay lập tức không? | High | Dev cần confirm cơ chế forced logout để QA thiết kế kịch bản auto chuẩn (nếu chỉ check ở middleware thì token vẫn tồn tại, nhưng response là 403). |
| GAP-SERV-03 | UC-SERV-004 | Rule unique cho tên Menu trong cùng Shop có tồn tại không? | Low | Xác nhận với Dev để tạo thêm testcase unique nếu cần. |
