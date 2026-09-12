import { pool } from "../config/db.js";

export interface CategoryRow {
  id: string;
  name: string;
  slug: string;
  image: string;
  created_at: Date;
  updated_at: Date;
}

export interface CategoryWithCountRow extends CategoryRow {
  product_count: string; // COUNT(*) comes back as a string from pg
}

export async function listCategoriesWithCounts(): Promise<CategoryWithCountRow[]> {
  const { rows } = await pool.query<CategoryWithCountRow>(
    `SELECT c.*, COUNT(p.id) AS product_count
     FROM categories c
     LEFT JOIN products p ON p.category_id = c.id
     GROUP BY c.id
     ORDER BY c.name ASC`
  );
  return rows;
}

export async function findCategoryById(id: string): Promise<CategoryRow | null> {
  const { rows } = await pool.query<CategoryRow>("SELECT * FROM categories WHERE id = $1", [id]);
  return rows[0] ?? null;
}

export async function findCategoryBySlug(slug: string): Promise<CategoryRow | null> {
  const { rows } = await pool.query<CategoryRow>("SELECT * FROM categories WHERE slug = $1", [slug]);
  return rows[0] ?? null;
}

export async function createCategory(params: { name: string; slug: string; image: string }): Promise<CategoryRow> {
  const { rows } = await pool.query<CategoryRow>(
    `INSERT INTO categories (name, slug, image) VALUES ($1, $2, $3) RETURNING *`,
    [params.name, params.slug, params.image]
  );
  return rows[0];
}

export async function updateCategory(
  id: string,
  params: { name?: string; slug?: string; image?: string }
): Promise<CategoryRow | null> {
  const { rows } = await pool.query<CategoryRow>(
    `UPDATE categories SET
       name = COALESCE($2, name),
       slug = COALESCE($3, slug),
       image = COALESCE($4, image)
     WHERE id = $1
     RETURNING *`,
    [id, params.name ?? null, params.slug ?? null, params.image ?? null]
  );
  return rows[0] ?? null;
}

export async function deleteCategoryById(id: string): Promise<void> {
  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
}

export async function countProductsInCategory(categoryId: string): Promise<number> {
  const { rows } = await pool.query<{ count: string }>(
    "SELECT COUNT(*) AS count FROM products WHERE category_id = $1",
    [categoryId]
  );
  return Number(rows[0].count);
}
