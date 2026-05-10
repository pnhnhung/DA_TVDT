import { env } from '@config/env';
import { getDbConnectionTarget } from '@core/ssh-tunnel';

export type QueryParams = unknown[];
export type QueryResult<T = unknown> = T[];

export async function queryDb<T = unknown>(sql: string, params: QueryParams = []): Promise<QueryResult<T>> {
  if (!env.db.enabled) {
    throw new Error('DB is disabled. Set DB_ENABLED=true in the selected environment file before using queryDb().');
  }

  if (env.db.client === 'postgres') {
    const { Client } = await import('pg');
    const target = getDbConnectionTarget();
    const client = new Client({
      host: target.host,
      port: target.port,
      database: env.db.database,
      user: env.db.username,
      password: env.db.password,
      ssl: env.db.ssl ? { rejectUnauthorized: false } : undefined
    });
    await client.connect();
    try {
      const result = await client.query(sql, params as never[]);
      return result.rows as QueryResult<T>;
    } finally {
      await client.end();
    }
  }

  const mysql = await import('mysql2/promise');
  const target = getDbConnectionTarget();
  const connection = await mysql.createConnection({
    host: target.host,
    port: target.port,
    database: env.db.database,
    user: env.db.username,
    password: env.db.password,
    ssl: env.db.ssl ? {} : undefined,
    connectTimeout: 15_000
  });
  try {
    const [rows] = await connection.execute(sql, params as never[]);
    return rows as QueryResult<T>;
  } finally {
    await connection.end();
  }
}
