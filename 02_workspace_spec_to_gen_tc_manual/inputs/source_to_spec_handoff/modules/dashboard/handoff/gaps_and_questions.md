| Gap ID | Related Rule ID | Feature | Description | Impact on Testing | Investigation Status | Action |
|---|---|---|---|---|---|---|
| GAP-DAS-001 | N/A | Widget data source | Cụ thể mỗi widget gọi API nào và aggregation logic chưa được extract. | Không biết test data cần setup gì để widget hiển thị đúng. | Đã điều tra — chưa phân tích API source | Cần extract từ DashboardAPI files |
| GAP-DAS-002 | N/A | Widget visibility | Một số widget chỉ hiển thị với Admin — rule phân quyền widget chưa rõ. | Security test Dashboard có thể sai. | Đã điều tra — phát hiện gap | Cần verify từ Dashboard API permissions |
