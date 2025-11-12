// Shared TypeScript types for cross-app reuse
export type ID = string;

export interface ApiResponse<T> {
  data: T | null;
  error?: string | null;
  status?: number;
}

export interface User {
  id: ID;
  name: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
}
