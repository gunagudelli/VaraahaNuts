import type { Product, Category } from '../types';

// Relative path: the Vite dev server proxies /api to the local backend
// (see vite.config.ts), and in production both are served from the same
// Vercel deployment - so this works unchanged in both environments.
const API_BASE = '/api';

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

// Cached for the lifetime of the tab: product/category pages navigate
// between each other constantly (e.g. switching weight variants), and
// re-fetching the whole catalog on every navigation would flash a loading
// state where the old static data used to be instant. A full page reload
// always gets fresh data, which is enough to reflect admin edits in practice.
let productsCache: Promise<Product[]> | null = null;
let categoriesCache: Promise<Category[]> | null = null;

export function fetchProducts(): Promise<Product[]> {
  if (!productsCache) {
    productsCache = getJson<{ products: Product[] }>('/products').then((d) => d.products);
    productsCache.catch(() => { productsCache = null; }); // don't cache a failure
  }
  return productsCache;
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const data = await getJson<{ product: Product }>(`/products/${encodeURIComponent(slug)}`);
    return data.product;
  } catch {
    return null;
  }
}

export function fetchCategories(): Promise<Category[]> {
  if (!categoriesCache) {
    categoriesCache = getJson<{ categories: Category[] }>('/categories').then((d) => d.categories);
    categoriesCache.catch(() => { categoriesCache = null; });
  }
  return categoriesCache;
}
