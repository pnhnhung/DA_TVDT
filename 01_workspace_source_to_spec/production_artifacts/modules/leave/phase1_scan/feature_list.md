# Feature List: Leave Module

| Feature | Screen / Action | API Endpoint | Methods | Source Trace | Status |
|---|---|---|---|---|---|
| **Configuration** | Leave Period | `/api/v2/leave/leave-period` | GET, PUT | `config/routes.yaml#24[route]` | confirmed |
| Configuration | Leave Types | `/api/v2/leave/leave-types`, `/{id}` | GET, POST, PUT, DELETE | `config/routes.yaml#39[route]` | confirmed |
| Configuration | Work Week | `/api/v2/leave/workweek` | GET, PUT | `config/routes.yaml#16[route]` | confirmed |
| Configuration | Holidays | `/api/v2/leave/holidays`, `/{id}` | GET, POST, PUT, DELETE | `config/routes.yaml#2[route]` | confirmed |
| **Entitlements** | Add/Edit/View Entitlements | `/api/v2/leave/leave-entitlements`, `/{id}` | GET, POST, PUT, DELETE | `config/routes.yaml#103[route]` | confirmed |
| Entitlements | Employee Entitlements | `/api/v2/leave/employees/{empNumber}/leave-entitlements` | GET | `config/routes.yaml#119[route]` | confirmed |
| Entitlements | Validation | `/api/v2/leave/leave-entitlements/{id}/validation/entitlements` | GET | `config/routes.yaml#151[route]` | confirmed |
| **Leave Operations** | My Leave Requests (ESS) | `/api/v2/leave/leave-requests`, `/{id}` | GET, POST, PUT, DELETE | `config/routes.yaml#62[route]` | confirmed |
| Leave Operations | Employee Leave Requests (Admin/Sup) | `/api/v2/leave/employees/leave-requests` | GET, POST, PUT, DELETE | `config/routes.yaml#79[route]` | confirmed |
| Leave Operations | Bulk Leave Request | `/api/v2/leave/employees/leave-requests/bulk` | PUT | `config/routes.yaml#96[route]` | confirmed |
| Leave Operations | Overlap Leaves Check | `/api/v2/leave/overlap-leaves` | GET | `config/routes.yaml#158[route]` | confirmed |
| Leave Operations | Actions on specific leaves (Approve/Reject) | `/api/v2/leave/leaves/{leaveId}` | PUT | `config/routes.yaml#186[route]` | confirmed |
| Leave Operations | Bulk Actions on leaves | `/api/v2/leave/leaves/bulk` | PUT | `config/routes.yaml#196[route]` | confirmed |
| Leave Operations | Leave Comments | `/api/v2/leave/leaves/{leaveId}/leave-comments` | GET, POST | `config/routes.yaml#172[route]` | confirmed |
| **Reports** | Leave Balance / Employee Leave Balance | `/api/v2/leave/leave-balance/...` | GET | `config/routes.yaml#136[route]` | confirmed |
| Reports | Reports Data | `/api/v2/leave/reports`, `/api/v2/leave/reports/data` | GET | `config/routes.yaml#203[route]` | confirmed |
