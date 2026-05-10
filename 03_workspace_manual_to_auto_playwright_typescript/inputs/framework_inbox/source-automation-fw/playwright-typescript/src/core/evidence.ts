import type { Page, TestInfo } from '@playwright/test';
import { redactedRuntimeInfo } from '@config/env';

function safeFileName(name: string): string {
  return name
    .trim()
    .replace(/[^a-zA-Z0-9-_\.]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 120) || 'evidence';
}

export class Evidence {
  constructor(
    private readonly page: Page,
    private readonly testInfo: TestInfo
  ) {}

  async screenshot(name: string, options: { fullPage?: boolean } = {}): Promise<void> {
    const screenshot = await this.page.screenshot({ fullPage: options.fullPage ?? true });
    await this.testInfo.attach(`${safeFileName(name)}.png`, {
      body: screenshot,
      contentType: 'image/png'
    });
  }

  async json(name: string, value: unknown): Promise<void> {
    await this.testInfo.attach(`${safeFileName(name)}.json`, {
      body: Buffer.from(JSON.stringify(value, null, 2)),
      contentType: 'application/json'
    });
  }

  async text(name: string, value: string): Promise<void> {
    await this.testInfo.attach(`${safeFileName(name)}.txt`, {
      body: Buffer.from(value),
      contentType: 'text/plain'
    });
  }

  async runtime(): Promise<void> {
    await this.json('runtime-context-redacted', redactedRuntimeInfo());
  }

  async failureSnapshot(): Promise<void> {
    await this.runtime();
    await this.screenshot('failure-full-page', { fullPage: true });
  }
}
