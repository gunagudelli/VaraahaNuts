import type { Product, Category, Banner } from '../types';
import { getAdminToken } from '../context/AdminAuthContext';

const API_BASE = '/api';

export class AdminApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function adminFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAdminToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 204) return undefined as T;

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new AdminApiError(res.status, data?.error || `Request failed: ${res.status}`);
  }
  return data as T;
}

// Products (admin sees inactive ones too, since the token is attached)
export const adminListProducts = () =>
  adminFetch<{ products: Product[] }>('/products').then((d) => d.products);

export const adminCreateProduct = (body: Record<string, unknown>) =>
  adminFetch<{ product: Product }>('/products', { method: 'POST', body: JSON.stringify(body) }).then((d) => d.product);

export const adminUpdateProduct = (id: string, body: Record<string, unknown>) =>
  adminFetch<{ product: Product }>(`/products/${id}`, { method: 'PUT', body: JSON.stringify(body) }).then((d) => d.product);

export const adminDeleteProduct = (id: string) =>
  adminFetch<void>(`/products/${id}`, { method: 'DELETE' });

// Categories
export const adminListCategories = () =>
  adminFetch<{ categories: Category[] }>('/categories').then((d) => d.categories);

export const adminCreateCategory = (body: Record<string, unknown>) =>
  adminFetch<{ category: Category }>('/categories', { method: 'POST', body: JSON.stringify(body) }).then((d) => d.category);

export const adminUpdateCategory = (id: string, body: Record<string, unknown>) =>
  adminFetch<{ category: Category }>(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(body) }).then((d) => d.category);

export const adminDeleteCategory = (id: string) =>
  adminFetch<void>(`/categories/${id}`, { method: 'DELETE' });

// Banner (singleton)
export const adminGetBanner = () =>
  adminFetch<{ banner: Banner | null }>('/banners/active').then((d) => d.banner);

export const adminSetBanner = (body: { image: string; linkUrl?: string }) =>
  adminFetch<{ banner: Banner }>('/banners', { method: 'PUT', body: JSON.stringify(body) }).then((d) => d.banner);

export const adminRemoveBanner = () =>
  adminFetch<void>('/banners', { method: 'DELETE' });
