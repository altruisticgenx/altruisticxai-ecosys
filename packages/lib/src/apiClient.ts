import { ApiResponse } from "./types";

export type ApiClientOptions = {
  baseUrl?: string;
  defaultHeaders?: Record<string, string>;
};

const DEFAULT_BASE =
  (typeof process !== 'undefined' && process.env?.VITE_API_URL) ||
  (typeof process !== 'undefined' && process.env?.NX_API_URL) ||
  (typeof process !== 'undefined' && process.env?.API_URL) ||
  "https://api.example.com";

export class ApiClient {
  baseUrl: string;
  defaultHeaders: Record<string, string>;

  constructor(opts?: ApiClientOptions) {
    this.baseUrl = opts?.baseUrl || DEFAULT_BASE;
    this.defaultHeaders = opts?.defaultHeaders || {
      "Content-Type": "application/json",
    };
  }

  private buildUrl(path: string) {
    if (path.startsWith("http")) return path;
    return `${this.baseUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
  }

  async get<T = any>(path: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(path, { method: "GET", headers });
  }

  async post<T = any>(path: string, body?: unknown, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(path, { method: "POST", headers, body: JSON.stringify(body) });
  }

  async put<T = any>(path: string, body?: unknown, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(path, { method: "PUT", headers, body: JSON.stringify(body) });
  }

  async delete<T = any>(path: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(path, { method: "DELETE", headers });
  }

  private async request<T = any>(path: string, init: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = this.buildUrl(path);
    const headers = { ...this.defaultHeaders, ...(init.headers || {}) };

    try {
      const res = await fetch(url, { ...init, headers });
      const status = res.status;
      const text = await res.text();

      let data: any = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = text;
      }

      if (!res.ok) {
        return { data: null, error: (data && (data as any).message) || res.statusText || "Request failed", status };
      }

      return { data, error: null, status };
    } catch (err: any) {
      return { data: null, error: err?.message || "Network error", status: 0 };
    }
  }
}

export const defaultClient = new ApiClient();
