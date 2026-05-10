/**
 * database-pool.ts
 *
 * Singleton connection pool cho PostgreSQL (pg) và MySQL/MariaDB (mysql2).
 * Tái sử dụng pool xuyên suốt test suite — tránh tạo mới connection mỗi query.
 *
 * Cách dùng:
 *   import { queryDb } from '@core/database';        // single query (simple)
 *   import { DbPool }  from '@core/database-pool';   // pool management (advanced)
 *
 * Pool tự động đóng qua globalTeardown hoặc khi gọi DbPool.closeAll().
 */

import { env } from '@config/env';
import type { QueryParams, QueryResult } from '@core/database';
import { getDbConnectionTarget } from '@core/ssh-tunnel';

// ──────────────────────────────────────────────────────────────────────────────
// Type shims (avoid importing pg/mysql2 at top-level when not enabled)
// ──────────────────────────────────────────────────────────────────────────────
type PgPool = import('pg').Pool;
type MysqlPool = import('mysql2/promise').Pool;

// ──────────────────────────────────────────────────────────────────────────────
// Singleton State
// ──────────────────────────────────────────────────────────────────────────────
let _pgPool: PgPool | null = null;
let _mysqlPool: MysqlPool | null = null;

function assertDbEnabled(): void {
  if (!env.db.enabled) {
    throw new Error(
      'DB is disabled. Set DB_ENABLED=true in the selected environment file before using the pool.'
    );
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// PostgreSQL Pool
// ──────────────────────────────────────────────────────────────────────────────
async function getPgPool(): Promise<PgPool> {
  if (_pgPool) return _pgPool;
  const { Pool } = await import('pg');
  const target = getDbConnectionTarget();
  _pgPool = new Pool({
    host: target.host,
    port: target.port,
    database: env.db.database,
    user: env.db.username,
    password: env.db.password,
    ssl: env.db.ssl ? { rejectUnauthorized: false } : undefined,
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000
  });

  _pgPool.on('error', (err) => {
    console.error('[DbPool][postgres] Unexpected pool error:', err.message);
  });

  return _pgPool;
}

// ──────────────────────────────────────────────────────────────────────────────
// MySQL / MariaDB Pool
// ──────────────────────────────────────────────────────────────────────────────
async function getMysqlPool(): Promise<MysqlPool> {
  if (_mysqlPool) return _mysqlPool;
  const mysql = await import('mysql2/promise');
  const target = getDbConnectionTarget();
  _mysqlPool = mysql.createPool({
    host: target.host,
    port: target.port,
    database: env.db.database,
    user: env.db.username,
    password: env.db.password,
    ssl: env.db.ssl ? {} : undefined,
    connectionLimit: 5,
    waitForConnections: true,
    queueLimit: 0,
    connectTimeout: 15_000
  });
  return _mysqlPool;
}

// ──────────────────────────────────────────────────────────────────────────────
// Public API
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Thực thi SQL query qua connection pool (hiệu quả hơn queryDb() đơn lẻ).
 * Dùng khi cần chạy nhiều queries trong cùng test hoặc setup/teardown.
 */
export async function queryPool<T = unknown>(
  sql: string,
  params: QueryParams = []
): Promise<QueryResult<T>> {
  assertDbEnabled();

  if (env.db.client === 'postgres') {
    const pool = await getPgPool();
    const result = await pool.query(sql, params as never[]);
    return result.rows as QueryResult<T>;
  }

  const pool = await getMysqlPool();
  const [rows] = await pool.execute(sql, params as never[]);
  // Nếu là SELECT, rows là array. Nếu là UPDATE/INSERT, rows là ResultSetHeader object.
  // Để tương thích ngược, ép kiểu sang QueryResult<T>
  return rows as QueryResult<T>;
}

/**
 * Thực thi câu lệnh SELECT và trả về danh sách các bản ghi (Array of Objects).
 * Sử dụng List (Array) là phương án tối ưu nhất trong TypeScript vì hỗ trợ sẵn
 * các hàm map, filter, find...
 */
export async function select<T = any>(sql: string, params: QueryParams = []): Promise<T[]> {
  assertDbEnabled();
  if (env.db.client === 'postgres') {
    const pool = await getPgPool();
    const result = await pool.query(sql, params as never[]);
    return result.rows as T[];
  }

  const pool = await getMysqlPool();
  const [rows] = await pool.execute(sql, params as never[]);
  if (Array.isArray(rows)) {
    return rows as T[];
  }
  return []; // Trường hợp truyền nhầm câu UPDATE vào hàm select
}

/**
 * Thực thi câu lệnh SELECT và trả về DUY NHẤT 1 bản ghi đầu tiên, hoặc null nếu không có.
 */
export async function selectOne<T = any>(sql: string, params: QueryParams = []): Promise<T | null> {
  const rows = await select<T>(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

/**
 * Thực thi câu lệnh SELECT và trả về giá trị của 1 CỘT DUY NHẤT trong bản ghi đầu tiên.
 * Phù hợp để lấy cấu hình, đếm số lượng (COUNT), v.v.
 */
export async function selectValue<T = any>(sql: string, columnName: string, params: QueryParams = []): Promise<T | null> {
  const row = await selectOne<Record<string, any>>(sql, params);
  if (row && columnName in row) {
    return row[columnName] as T;
  }
  return null;
}

/**
 * Thực thi các câu lệnh thay đổi dữ liệu (INSERT, UPDATE, DELETE) 
 * và trả về số lượng dòng bị ảnh hưởng (affected rows).
 */
export async function execute(sql: string, params: QueryParams = []): Promise<number> {
  assertDbEnabled();
  if (env.db.client === 'postgres') {
    const pool = await getPgPool();
    const result = await pool.query(sql, params as never[]);
    return result.rowCount ?? 0;
  }

  const pool = await getMysqlPool();
  const [result] = await pool.execute(sql, params as never[]);
  // Trong mysql2, kết quả của UPDATE/INSERT là ResultSetHeader
  return (result as any).affectedRows || 0;
}


/**
 * Đóng tất cả pool connections — gọi trong globalTeardown.
 */
export async function closeAllPools(): Promise<void> {
  const errors: string[] = [];

  if (_pgPool) {
    try {
      await _pgPool.end();
    } catch (err) {
      errors.push(`postgres pool: ${String(err)}`);
    } finally {
      _pgPool = null;
    }
  }

  if (_mysqlPool) {
    try {
      await _mysqlPool.end();
    } catch (err) {
      errors.push(`mysql pool: ${String(err)}`);
    } finally {
      _mysqlPool = null;
    }
  }

  if (errors.length > 0) {
    throw new Error(`[DbPool] Errors closing pools:\n${errors.join('\n')}`);
  }
}

/** Namespace export cho trường hợp import toàn bộ pool module */
export const DbPool = {
  query: queryPool,
  select,
  selectOne,
  selectValue,
  execute,
  closeAll: closeAllPools
} as const;
