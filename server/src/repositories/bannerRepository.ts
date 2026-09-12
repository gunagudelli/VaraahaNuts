import { pool } from "../config/db.js";

export interface BannerRow {
  id: string;
  image: string;
  link_url: string | null;
  created_at: Date;
  updated_at: Date;
}

// Treated as a singleton by the API layer (at most one banner exists at a
// time), so "get the current one" is just "the most recent row".
export async function getBanner(): Promise<BannerRow | null> {
  const { rows } = await pool.query<BannerRow>("SELECT * FROM banners ORDER BY created_at DESC LIMIT 1");
  return rows[0] ?? null;
}

export async function setBanner(params: { image: string; linkUrl: string | null }): Promise<BannerRow> {
  // Replace-not-append: clear any existing banner(s) first so there's
  // never more than one row, keeping "the current banner" unambiguous.
  await pool.query("DELETE FROM banners");
  const { rows } = await pool.query<BannerRow>(
    "INSERT INTO banners (image, link_url) VALUES ($1, $2) RETURNING *",
    [params.image, params.linkUrl]
  );
  return rows[0];
}

export async function clearBanner(): Promise<void> {
  await pool.query("DELETE FROM banners");
}
