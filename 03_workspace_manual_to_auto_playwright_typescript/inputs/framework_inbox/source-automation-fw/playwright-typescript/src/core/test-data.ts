import fs from 'node:fs';
import path from 'node:path';

// ──────────────────────────────────────────────────────────────────────────────
// File I/O
// ──────────────────────────────────────────────────────────────────────────────

export function readJsonFile<T>(relativePathFromRoot: string): T {
  const fullPath = path.resolve(process.cwd(), relativePathFromRoot);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Test data file not found: ${fullPath}`);
  }
  const raw = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(raw) as T;
}

// ──────────────────────────────────────────────────────────────────────────────
// Unique / Traceable Data Generation
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Sinh suffix unique dạng `{prefix}_{timestamp}_{random}`.
 * Traceable: timestamp có thể truy ra thời điểm chạy test.
 *
 * @param prefix  - Prefix rõ ràng, ví dụ: 'login', 'vacancy', 'user'
 * @param format  - 'compact' (mặc định) | 'readable' | 'epoch'
 *
 * Ví dụ output:
 *   compact:  auto_20260506T192355_x7k2a
 *   readable: auto_2026-05-06_19-23-55_x7k2a
 *   epoch:    auto_1746538435123_x7k2a
 */
export function uniqueSuffix(
  prefix = 'auto',
  format: 'compact' | 'readable' | 'epoch' = 'compact'
): string {
  const random = Math.random().toString(36).slice(2, 7);
  const now = new Date();

  let timestamp: string;
  switch (format) {
    case 'readable':
      timestamp = now
        .toISOString()
        .replace('T', '_')
        .replace(/:/g, '-')
        .slice(0, 19);
      break;
    case 'epoch':
      timestamp = String(now.getTime());
      break;
    case 'compact':
    default:
      timestamp = now.toISOString().replace(/[-:.TZ]/g, '').slice(0, 15);
  }

  return `${prefix}_${timestamp}_${random}`;
}

/**
 * Sinh email unique traceable.
 * Format: {prefix}_{timestamp}_{random}@{domain}
 *
 * @example
 *   uniqueEmail('login')  →  login_20260506T192355_x7k2a@auto.test
 */
export function uniqueEmail(prefix = 'auto', domain = 'auto.test'): string {
  return `${uniqueSuffix(prefix)}@${domain}`;
}

/**
 * Sinh username unique.
 *
 * @example
 *   uniqueUsername('qa')  →  qa_20260506T192355_x7k2a
 */
export function uniqueUsername(prefix = 'user'): string {
  return uniqueSuffix(prefix);
}

/**
 * Sinh test case code unique cho traceability.
 *
 * @example
 *   uniqueTcCode('LOGIN')  →  TC_LOGIN_20260506T192355_x7k2a
 */
export function uniqueTcCode(module = 'MODULE'): string {
  return uniqueSuffix(`TC_${module.toUpperCase()}`);
}

// ──────────────────────────────────────────────────────────────────────────────
// Date / Time Helpers
// ──────────────────────────────────────────────────────────────────────────────

/** Trả về ISO 8601 timestamp hiện tại */
export function nowIso(): string {
  return new Date().toISOString();
}

/** Trả về date string dạng YYYY-MM-DD */
export function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Trả về Unix epoch (ms) */
export function nowEpoch(): number {
  return Date.now();
}
