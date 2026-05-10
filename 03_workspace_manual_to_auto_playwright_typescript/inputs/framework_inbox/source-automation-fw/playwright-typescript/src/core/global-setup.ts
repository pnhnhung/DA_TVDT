/**
 * global-setup.ts
 *
 * Chạy một lần trước toàn bộ test suite.
 * - Validate environment config
 * - Pre-flight DB connectivity check (nếu DB enabled)
 * - Log runtime context (redacted)
 *
 * Để kích hoạt: thêm vào playwright.config.ts
 *   globalSetup: './src/core/global-setup.ts'
 */

import { chromium, type FullConfig } from '@playwright/test';
import { env, redactedRuntimeInfo } from '@config/env';
import { queryPool, closeAllPools } from '@core/database-pool';
import { openSshTunnel, closeSshTunnel } from '@core/ssh-tunnel';

export default async function globalSetup(_config: FullConfig): Promise<void> {
  console.log('\n🚀 [GlobalSetup] Starting pre-flight checks...');
  console.log('[GlobalSetup] Runtime context:', JSON.stringify(redactedRuntimeInfo(), null, 2));

  // ── 1. Validate required env vars ───────────────────────────────────────────
  if (!env.BASE_URL) {
    throw new Error('[GlobalSetup] BASE_URL is not set. Check your environment file.');
  }
  console.log(`[GlobalSetup] ✅ BASE_URL: ${env.BASE_URL}`);
  console.log(`[GlobalSetup] ✅ TEST_ENV: ${env.TEST_ENV}`);
  console.log(`[GlobalSetup] ✅ ACCOUNT_PROFILE: ${env.ACCOUNT_PROFILE}`);

  // ── 2. DB connectivity check (optional) ─────────────────────────────────────
  if (env.db.enabled) {
    console.log(`[GlobalSetup] 🔍 Checking DB connectivity (${env.db.client})...`);
    try {
      // Mở SSH tunnel nếu được cấu hình
      if (env.sshTunnel.enabled) {
        await openSshTunnel();
      }
      const ping = env.db.client === 'postgres' ? 'SELECT 1 AS ok' : 'SELECT 1 AS ok';
      const result = await queryPool<{ ok: number }>(ping);
      if (result[0]?.ok !== 1) throw new Error('Unexpected ping result');
      console.log(`[GlobalSetup] ✅ DB connection OK (${env.db.client} @ ${env.db.host}:${env.db.port})`);
    } catch (err) {
      console.error('[GlobalSetup] ❌ DB connection FAILED:', String(err));
      throw err;
    } finally {
      await closeAllPools();
      await closeSshTunnel();
    }
  } else {
    console.log('[GlobalSetup] ℹ️  DB disabled — skipping connectivity check.');
  }

  // ── 3. Optional: UI reachability check ──────────────────────────────────────
  // Chỉ check khi có env var GLOBAL_SETUP_CHECK_UI=true
  const checkUi = process.env.GLOBAL_SETUP_CHECK_UI === 'true';
  if (checkUi) {
    console.log(`[GlobalSetup] 🌐 Checking UI reachability: ${env.BASE_URL}`);
    const browser = await chromium.launch();
    const page = await browser.newPage();
    try {
      const response = await page.goto(env.BASE_URL, { timeout: 30_000 });
      if (!response?.ok()) {
        throw new Error(`UI returned HTTP ${response?.status() ?? 'N/A'}`);
      }
      console.log(`[GlobalSetup] ✅ UI reachable (HTTP ${response.status()})`);
    } catch (err) {
      console.error('[GlobalSetup] ❌ UI not reachable:', String(err));
      throw err;
    } finally {
      await browser.close();
    }
  }

  console.log('[GlobalSetup] ✅ All pre-flight checks passed.\n');
}
