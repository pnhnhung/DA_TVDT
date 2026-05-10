| Gap ID | Related Rule ID | Feature | Description | Impact on Testing | Investigation Status | Action |
|---|---|---|---|---|---|---|
| GAP-001 | BR-002 | Delete Employee | Delete action không cho phép xóa user hiện tại và user admin mặc định. Chưa rõ logic để xác định user admin mặc định là ai ở mức độ Automation. | Có thể fail testcase xóa hàng loạt | Đã điều tra — có trong `EmployeeService.php#333` | Cần xác nhận user |
| GAP-002 | | Reactivate Employee | Chưa có API explicit để Reactivate, chỉ thấy implicit qua event. | Không thể thiết kế test case reactivate tự động hoàn chỉnh | Đã điều tra — không tìm thấy source explicit | Cần hỏi BA/PO |
