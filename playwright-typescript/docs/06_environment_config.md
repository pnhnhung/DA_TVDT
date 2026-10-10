# Environment Configuration

Framework hỗ trợ chạy theo nhiều môi trường: `dev`, `stg`, `uat`, `prod`.

## Cách chọn môi trường

Tạo file `.env` từ `.env.example`:

```env
TEST_ENV=dev
ACCOUNT_PROFILE=admin
```

Sau đó tạo file cấu hình thật từ file mẫu:

```bash
cp config/environments/dev.env.example config/environments/dev.env
```

Khi chạy, framework load theo thứ tự:

1. `.env`
2. `config/environments/<TEST_ENV>.env`
3. OS environment variables / CI secrets có thể override bằng cách set trực tiếp trước khi chạy

Có thể chỉ định file riêng:

```bash
npx cross-env TEST_ENV=stg npx playwright test
```

## Nhóm biến chính

| Nhóm | Biến | Ý nghĩa |
|---|---|---|
| Runtime | `TEST_ENV`, `ENVIRONMENT_NAME` | Môi trường đang chạy |
| Domain | `APP_DOMAIN`, `BASE_URL`, `API_BASE_URL` | Domain web/API |
| Account | `ACCOUNT_PROFILE`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, ... | Account test theo role |
| Database | `DB_ENABLED`, `DB_CLIENT`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD`, `DB_SSL` | Thông tin connect DB |
| Key/Secret | `API_KEY`, `CLIENT_ID`, `CLIENT_SECRET`, `ENCRYPTION_KEY` | Key tích hợp/API |
| Timeout | `DEFAULT_TIMEOUT_MS`, `EXPECT_TIMEOUT_MS`, `ACTION_TIMEOUT_MS`, `NAVIGATION_TIMEOUT_MS` | Timeout runtime |

## Quy tắc bảo mật

- Không commit file `*.env` thật.
- Chỉ commit `*.env.example`.
- CI/CD nên dùng secret store của pipeline.
- Evidence chỉ attach runtime context dạng redacted, không ghi password/key thật vào report.

## Account profile

Trong test, dùng:

```ts
import { users } from '@data/users';

await loginPage.login(users.admin.username, users.admin.password);
```

Hoặc dùng profile mặc định:

```ts
await loginPage.login(users.selected.username, users.selected.password);
```

## Database

DB mặc định tắt:

```env
DB_ENABLED=false
```

Khi cần query DB để chuẩn bị/verify data:

```env
DB_ENABLED=true
DB_CLIENT=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=orangehrm
DB_USERNAME=orangehrm
DB_PASSWORD=change-me
```

Ví dụ dùng helper:

```ts
import { queryDb } from '@core/database';

const rows = await queryDb<{ id: number; name: string }>('select id, name from jobs where name = ?', [jobName]);
```

Hỗ trợ `mysql`, `mariadb`, `postgres`.
