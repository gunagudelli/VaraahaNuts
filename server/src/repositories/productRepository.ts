import { pool } from "../config/db";

export interface ProductRow {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  category_slug: string;
  price: string; // NUMERIC comes back as a string from pg
  original_price: string | null;
  weight: string;
  image: string;
  images: string[];
  rating: string;
  review_count: number;
  description: string;
  benefits: string[];
  tags: string[];
  in_stock: boolean;
  is_featured: boolean;
  is_best_seller: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ListProductsFilters {
  categorySlug?: string;
  weight?: string;
  search?: string;
  sort: "popular" | "price-asc" | "price-desc" | "rating";
  featured?: boolean;
  bestSeller?: boolean;
}

const BASE_SELECT = `
  SELECT p.*, c.slug AS category_slug
  FROM products p
  JOIN categories c ON c.id = p.category_id
`;

const SORT_CLAUSE: Record<ListProductsFilters["sort"], string> = {
  popular: "p.review_count DESC",
  "price-asc": "p.price ASC",
  "price-desc": "p.price DESC",
  rating: "p.rating DESC",
};

export async function listProducts(filters: ListProductsFilters): Promise<ProductRow[]> {
  const conditions: string[] = [];
  const values: unknown[] = [];

  if (filters.categorySlug) {
    values.push(filters.categorySlug);
    conditions.push(`c.slug = $${values.length}`);
  }
  if (filters.weight) {
    values.push(filters.weight);
    conditions.push(`p.weight = $${values.length}`);
  }
  if (filters.search) {
    values.push(`%${filters.search}%`);
    conditions.push(`(p.name ILIKE $${values.length} OR p.description ILIKE $${values.length})`);
  }
  if (filters.featured !== undefined) {
    values.push(filters.featured);
    conditions.push(`p.is_featured = $${values.length}`);
  }
  if (filters.bestSeller !== undefined) {
    values.push(filters.bestSeller);
    conditions.push(`p.is_best_seller = $${values.length}`);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const orderBy = SORT_CLAUSE[filters.sort];

  const { rows } = await pool.query<ProductRow>(`${BASE_SELECT} ${where} ORDER BY ${orderBy}`, values);
  return rows;
}

export async function findProductBySlug(slug: string): Promise<ProductRow | null> {
  const { rows } = await pool.query<ProductRow>(`${BASE_SELECT} WHERE p.slug = $1`, [slug]);
  return rows[0] ?? null;
}

export async function findProductById(id: string): Promise<ProductRow | null> {
  const { rows } = await pool.query<ProductRow>(`${BASE_SELECT} WHERE p.id = $1`, [id]);
  return rows[0] ?? null;
}

export interface ProductWriteParams {
  name: string;
  slug: string;
  categoryId: string;
  price: number;
  originalPrice: number | null;
  weight: string;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  description: string;
  benefits: string[];
  tags: string[];
  inStock: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
}

export async function createProduct(p: ProductWriteParams): Promise<ProductRow> {
  const { rows } = await pool.query<{ id: string }>(
    `INSERT INTO products
       (name, slug, category_id, price, original_price, weight, image, images,
        rating, review_count, description, benefits, tags, in_stock, is_featured, is_best_seller)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
     RETURNING id`,
    [
      p.name, p.slug, p.categoryId, p.price, p.originalPrice, p.weight, p.image, p.images,
      p.rating, p.reviewCount, p.description, p.benefits, p.tags, p.inStock, p.isFeatured, p.isBestSeller,
    ]
  );
  return (await findProductById(rows[0].id))!;
}

// Takes the FULLY resolved set of values (the service merges the partial
// input over the existing row first) - a plain SET, no COALESCE trickery,
// so clearing a nullable field like original_price to null actually works
// instead of being indistinguishable from "not touching it".
export async function updateProduct(id: string, p: ProductWriteParams): Promise<ProductRow | null> {
  await pool.query(
    `UPDATE products SET
       name = $2,
       slug = $3,
       category_id = $4,
       price = $5,
       original_price = $6,
       weight = $7,
       image = $8,
       images = $9,
       rating = $10,
       review_count = $11,
       description = $12,
       benefits = $13,
       tags = $14,
       in_stock = $15,
       is_featured = $16,
       is_best_seller = $17
     WHERE id = $1`,
    [
      id, p.name, p.slug, p.categoryId, p.price, p.originalPrice, p.weight, p.image, p.images,
      p.rating, p.reviewCount, p.description, p.benefits, p.tags, p.inStock, p.isFeatured, p.isBestSeller,
    ]
  );
  return findProductById(id);
}

export async function deleteProductById(id: string): Promise<void> {
  await pool.query("DELETE FROM products WHERE id = $1", [id]);
}
