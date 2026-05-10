/**
 * api.ts
 *
 * HTTP API helper layer — wrapper quanh Playwright APIRequestContext.
 * Cung cấp typed GET/POST/PUT/PATCH/DELETE với auto error handling.
 *
 * Cách dùng trong spec:
 *   import { ApiClient } from '@core/api';
 *   // Dùng qua fixture request (Playwright built-in)
 *   const api = new ApiClient(request, env.API_BASE_URL);
 *   const jobs = await api.get<Job[]>('/recruitment/vacancies');
 *
 * Cách dùng trong global-setup (không có page context):
 *   const request = await playwright.request.newContext({ baseURL: env.API_BASE_URL });
 *   const api = new ApiClient(request, env.API_BASE_URL);
 */

import type { APIRequestContext, APIResponse } from '@playwright/test';

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  timeout?: number;
  failOnStatusCode?: boolean;
}

export interface ApiError {
  status: number;
  url: string;
  body: unknown;
}

// ──────────────────────────────────────────────────────────────────────────────
// ApiClient
// ──────────────────────────────────────────────────────────────────────────────

export class ApiClient {
  private readonly defaultHeaders: Record<string, string>;

  constructor(
    private readonly request: APIRequestContext,
    private readonly baseUrl: string = '',
    private readonly token?: string
  ) {
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
  }

  // ── Factory: create authenticated client ──────────────────────────────────

  withToken(token: string): ApiClient {
    return new ApiClient(this.request, this.baseUrl, token);
  }

  withBaseUrl(baseUrl: string): ApiClient {
    return new ApiClient(this.request, baseUrl, this.token);
  }

  // ── Response handling ─────────────────────────────────────────────────────

  private resolveUrl(path: string): string {
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return `${this.baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
  }

  private mergeHeaders(options?: RequestOptions): Record<string, string> {
    return { ...this.defaultHeaders, ...(options?.headers ?? {}) };
  }

  private async parseResponse<T>(
    response: APIResponse,
    failOnStatusCode: boolean
  ): Promise<T> {
    if (failOnStatusCode && !response.ok()) {
      const body = await response.text().catch(() => '<unreadable>');
      const error: ApiError = {
        status: response.status(),
        url: response.url(),
        body
      };
      throw new Error(
        `[ApiClient] HTTP ${error.status} — ${error.url}\nBody: ${JSON.stringify(error.body)}`
      );
    }

    const contentType = response.headers()['content-type'] ?? '';
    if (contentType.includes('application/json')) {
      return response.json() as Promise<T>;
    }

    return response.text() as unknown as Promise<T>;
  }

  // ── HTTP Methods ──────────────────────────────────────────────────────────

  async get<T = unknown>(path: string, options?: RequestOptions): Promise<T> {
    const response = await this.request.get(this.resolveUrl(path), {
      headers: this.mergeHeaders(options),
      params: options?.params,
      timeout: options?.timeout
    });
    return this.parseResponse<T>(response, options?.failOnStatusCode ?? true);
  }

  async post<T = unknown>(
    path: string,
    body: unknown,
    options?: RequestOptions
  ): Promise<T> {
    const response = await this.request.post(this.resolveUrl(path), {
      headers: this.mergeHeaders(options),
      data: body,
      timeout: options?.timeout
    });
    return this.parseResponse<T>(response, options?.failOnStatusCode ?? true);
  }

  async put<T = unknown>(
    path: string,
    body: unknown,
    options?: RequestOptions
  ): Promise<T> {
    const response = await this.request.put(this.resolveUrl(path), {
      headers: this.mergeHeaders(options),
      data: body,
      timeout: options?.timeout
    });
    return this.parseResponse<T>(response, options?.failOnStatusCode ?? true);
  }

  async patch<T = unknown>(
    path: string,
    body: unknown,
    options?: RequestOptions
  ): Promise<T> {
    const response = await this.request.patch(this.resolveUrl(path), {
      headers: this.mergeHeaders(options),
      data: body,
      timeout: options?.timeout
    });
    return this.parseResponse<T>(response, options?.failOnStatusCode ?? true);
  }

  async delete<T = unknown>(path: string, options?: RequestOptions): Promise<T> {
    const response = await this.request.delete(this.resolveUrl(path), {
      headers: this.mergeHeaders(options),
      timeout: options?.timeout
    });
    return this.parseResponse<T>(response, options?.failOnStatusCode ?? true);
  }

  /**
   * Raw response — dùng khi cần check status code trực tiếp (negative test).
   */
  async raw(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    path: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<APIResponse> {
    const url = this.resolveUrl(path);
    const headers = this.mergeHeaders(options);
    switch (method) {
      case 'GET':
        return this.request.get(url, { headers, params: options?.params });
      case 'POST':
        return this.request.post(url, { headers, data: body });
      case 'PUT':
        return this.request.put(url, { headers, data: body });
      case 'PATCH':
        return this.request.patch(url, { headers, data: body });
      case 'DELETE':
        return this.request.delete(url, { headers });
    }
  }
}
