-- Product catalog for the Varaaha Cashews storefront. Self-contained schema
-- for a fresh database - this project does not assume any other app's
-- tables or helper functions already exist.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  image       TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE products (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  category_id     UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  price           NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  original_price  NUMERIC(10,2) CHECK (original_price IS NULL OR original_price >= 0),
  weight          TEXT NOT NULL,
  image           TEXT NOT NULL,
  images          TEXT[] NOT NULL DEFAULT '{}',
  rating          NUMERIC(2,1) NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count    INTEGER NOT NULL DEFAULT 0 CHECK (review_count >= 0),
  description     TEXT NOT NULL DEFAULT '',
  benefits        TEXT[] NOT NULL DEFAULT '{}',
  tags            TEXT[] NOT NULL DEFAULT '{}',
  in_stock        BOOLEAN NOT NULL DEFAULT true,
  is_featured     BOOLEAN NOT NULL DEFAULT false,
  is_best_seller  BOOLEAN NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Shop page filters by category and toggles featured/best-seller sections.
CREATE INDEX idx_products_category_id ON products (category_id);
CREATE INDEX idx_products_featured ON products (is_featured) WHERE is_featured = true;
CREATE INDEX idx_products_best_seller ON products (is_best_seller) WHERE is_best_seller = true;

CREATE TRIGGER trg_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
