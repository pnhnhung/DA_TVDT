# Selected Viewpoints: Authentication

Dựa trên scope và risk, các viewpoint sau sẽ được áp dụng khi sinh testcase (UT & IT):

## Core Viewpoints (Mặc định)
- **Required/Null/Blank**: Áp dụng cho username, password, _token.
- **Valid/Invalid Partition**: Áp dụng cho credentials (đúng/sai).
- **Error message validation**: Áp dụng cho sai CSRF, sai username/pass.

## Conditional Packs (Được kích hoạt)
- **Security / Auth Pack**: 
  - CSRF Token verification.
  - Password strength validation (Dù đang gap detail, vẫn test logic: vi phạm policy -> điểm tối đa là BETTER).
- **Session Pack**: 
  - Login success -> tạo session (cần verify qua redirect).
