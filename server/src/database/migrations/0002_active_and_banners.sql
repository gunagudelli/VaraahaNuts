-- Lets admin hide a product from the storefront entirely (distinct from
-- in_stock, which still shows the product but marks it unavailable).
ALTER TABLE products ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true;

-- A single promotional banner (festival sales, etc). Deliberately a plain
-- table with manual add/remove rather than date-scheduled auto-expiry -
-- simpler to reason about and admin controls it directly. In practice only
-- one row exists at a time (the API treats it as a singleton), but no
-- unique constraint is needed since the API layer enforces that.
CREATE TABLE banners (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image       TEXT NOT NULL,
  link_url    TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_banners_updated_at
  BEFORE UPDATE ON banners
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
