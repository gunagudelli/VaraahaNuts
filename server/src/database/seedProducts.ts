// One-time seed: ports the storefront's previously-static product/category
// data into the database. Safe to re-run - it upserts on slug rather than
// blindly inserting duplicates.
import "dotenv/config";
import { pool } from "../config/db";
import { logger } from "../utils/logger";

import { env } from "../config/env";

const IMG_BASE = `${env.PUBLIC_BASE_URL}/products`;

const img = (file: string) => `${IMG_BASE}/${file}`;

const SKIN = img("skin-cashews.jpeg");
const KAJUBB = img("kaju-bb.jpeg");
const PIECE8 = img("8-piece.jpeg");
const PIECE4 = img("4-piece.jpeg");
const JHSPLITS = img("jh-splits.jpeg");
const WMIX = img("wmix-wholes.jpeg");
const NEW_1KG = img("1kg-new.webp");
const NEW_500 = img("500-grams-new.webp");
const NEW_250 = img("250-grams-new.webp");
const STUDIO_1KG = img("1kg-studio.webp");
const LABEL_500 = img("500-grams-label.webp");
const LABEL_250 = img("250-grams-label.webp");
const LABEL_IMG = img("label-3rd.webp");

const categories = [
  { name: "Wmix Cashews", slug: "wmix-cashews", image: WMIX },
  { name: "Split Cashews", slug: "split-cashews", image: JHSPLITS },
  { name: "4 Piece Cashews", slug: "4-piece-cashews", image: PIECE4 },
  { name: "8 Piece Cashews", slug: "8-piece-cashews", image: PIECE8 },
  { name: "Kaju BB (Nooka)", slug: "kaju-bb", image: KAJUBB },
  { name: "W180 Jumbo Cashews", slug: "w180-cashews", image: NEW_1KG },
  { name: "W240 Super Cashews", slug: "w240-cashews", image: NEW_1KG },
  { name: "W320 Cashews", slug: "w320-cashews", image: NEW_1KG },
  { name: "Skin Cashews", slug: "skin-cashews", image: SKIN },
];

interface SeedProduct {
  name: string;
  slug: string;
  categorySlug: string;
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
  isFeatured: boolean;
  isBestSeller: boolean;
}

const products: SeedProduct[] = [
  { name: "Average Wmix Cashews — 1kg", slug: "wmix-cashews-1kg", categorySlug: "wmix-cashews", price: 760, originalPrice: 800, weight: "1kg", image: WMIX, images: [NEW_1KG, WMIX, LABEL_IMG], rating: 4.5, reviewCount: 98, isFeatured: true, isBestSeller: true, description: "Premium quality Average Wmix Cashews with rich taste and natural freshness. Ideal for daily snacking, sweets, and cooking.", benefits: ["Rich Taste", "Natural Fresh", "Daily Snacking", "FSSAI Certified"], tags: ["wmix"] },
  { name: "Average Wmix Cashews — 500g", slug: "wmix-cashews-500g", categorySlug: "wmix-cashews", price: 380, originalPrice: 400, weight: "500g", image: WMIX, images: [NEW_500, WMIX, LABEL_IMG], rating: 4.5, reviewCount: 74, isFeatured: false, isBestSeller: false, description: "Premium quality Average Wmix Cashews with rich taste and natural freshness. Ideal for daily snacking, sweets, and cooking.", benefits: ["Rich Taste", "Natural Fresh", "Daily Snacking", "FSSAI Certified"], tags: ["wmix"] },
  { name: "Average Wmix Cashews — 250g", slug: "wmix-cashews-250g", categorySlug: "wmix-cashews", price: 200, originalPrice: 250, weight: "250g", image: WMIX, images: [NEW_250, WMIX, LABEL_IMG], rating: 4.5, reviewCount: 52, isFeatured: false, isBestSeller: false, description: "Premium quality Average Wmix Cashews with rich taste and natural freshness. Ideal for daily snacking, sweets, and cooking.", benefits: ["Rich Taste", "Natural Fresh", "Daily Snacking", "FSSAI Certified"], tags: ["wmix"] },

  { name: "Split Cashews — 1kg", slug: "split-cashews-1kg", categorySlug: "split-cashews", price: 770, originalPrice: 820, weight: "1kg", image: JHSPLITS, images: [NEW_1KG, JHSPLITS, LABEL_IMG], rating: 4.4, reviewCount: 86, isFeatured: true, isBestSeller: false, description: "Economical split cashews perfect for curries, gravies, bakery items, and sweets.", benefits: ["Great for Curries", "Bakery Use", "Economical", "Natural Fresh"], tags: ["split"] },
  { name: "Split Cashews — 500g", slug: "split-cashews-500g", categorySlug: "split-cashews", price: 380, originalPrice: 400, weight: "500g", image: JHSPLITS, images: [NEW_500, JHSPLITS, LABEL_IMG], rating: 4.4, reviewCount: 61, isFeatured: false, isBestSeller: false, description: "Economical split cashews perfect for curries, gravies, bakery items, and sweets.", benefits: ["Great for Curries", "Bakery Use", "Economical", "Natural Fresh"], tags: ["split"] },
  { name: "Split Cashews — 250g", slug: "split-cashews-250g", categorySlug: "split-cashews", price: 200, originalPrice: 240, weight: "250g", image: JHSPLITS, images: [NEW_250, JHSPLITS, LABEL_IMG], rating: 4.4, reviewCount: 39, isFeatured: false, isBestSeller: false, description: "Economical split cashews perfect for curries, gravies, bakery items, and sweets.", benefits: ["Great for Curries", "Bakery Use", "Economical", "Natural Fresh"], tags: ["split"] },

  { name: "4 Piece Cashews — 1kg", slug: "4-piece-cashews-1kg", categorySlug: "4-piece-cashews", price: 685, originalPrice: 720, weight: "1kg", image: PIECE4, images: [NEW_1KG, PIECE4, LABEL_IMG], rating: 4.6, reviewCount: 112, isFeatured: true, isBestSeller: true, description: "Medium-sized premium cashews offering a perfect balance of taste, texture, and value.", benefits: ["Premium Grade", "Balanced Taste", "Best Value", "FSSAI Certified"], tags: ["4-piece"] },
  { name: "4 Piece Cashews — 500g", slug: "4-piece-cashews-500g", categorySlug: "4-piece-cashews", price: 360, originalPrice: 375, weight: "500g", image: PIECE4, images: [NEW_500, PIECE4, LABEL_IMG], rating: 4.6, reviewCount: 88, isFeatured: false, isBestSeller: false, description: "Medium-sized premium cashews offering a perfect balance of taste, texture, and value.", benefits: ["Premium Grade", "Balanced Taste", "Best Value", "FSSAI Certified"], tags: ["4-piece"] },
  { name: "4 Piece Cashews — 250g", slug: "4-piece-cashews-250g", categorySlug: "4-piece-cashews", price: 200, originalPrice: null, weight: "250g", image: PIECE4, images: [NEW_250, PIECE4, LABEL_IMG], rating: 4.6, reviewCount: 55, isFeatured: false, isBestSeller: false, description: "Medium-sized premium cashews offering a perfect balance of taste, texture, and value.", benefits: ["Premium Grade", "Balanced Taste", "Best Value", "FSSAI Certified"], tags: ["4-piece"] },

  { name: "8 Piece Cashews — 1kg", slug: "8-piece-cashews-1kg", categorySlug: "8-piece-cashews", price: 580, originalPrice: 620, weight: "1kg", image: PIECE8, images: [NEW_1KG, PIECE8, LABEL_IMG], rating: 4.4, reviewCount: 93, isFeatured: false, isBestSeller: true, description: "Affordable cashews suitable for regular home use, desserts, and cooking.", benefits: ["Affordable", "Home Use", "Desserts", "Cooking Grade"], tags: ["8-piece"] },
  { name: "8 Piece Cashews — 500g", slug: "8-piece-cashews-500g", categorySlug: "8-piece-cashews", price: 300, originalPrice: 340, weight: "500g", image: PIECE8, images: [NEW_500, PIECE8, LABEL_IMG], rating: 4.4, reviewCount: 67, isFeatured: false, isBestSeller: false, description: "Affordable cashews suitable for regular home use, desserts, and cooking.", benefits: ["Affordable", "Home Use", "Desserts", "Cooking Grade"], tags: ["8-piece"] },
  { name: "8 Piece Cashews — 250g", slug: "8-piece-cashews-250g", categorySlug: "8-piece-cashews", price: 150, originalPrice: 180, weight: "250g", image: PIECE8, images: [NEW_250, PIECE8, LABEL_IMG], rating: 4.4, reviewCount: 44, isFeatured: false, isBestSeller: false, description: "Affordable cashews suitable for regular home use, desserts, and cooking.", benefits: ["Affordable", "Home Use", "Desserts", "Cooking Grade"], tags: ["8-piece"] },

  { name: "Kaju BB (Nooka) — 1kg", slug: "kaju-bb-nooka-1kg", categorySlug: "kaju-bb", price: 280, originalPrice: 320, weight: "1kg", image: KAJUBB, images: [NEW_1KG, KAJUBB, LABEL_IMG], rating: 4.3, reviewCount: 78, isFeatured: false, isBestSeller: false, description: "Budget-friendly cashew variety for everyday consumption and recipes.", benefits: ["Budget Friendly", "Everyday Use", "Recipe Grade", "Natural Fresh"], tags: ["kaju-bb", "budget"] },
  { name: "Kaju BB (Nooka) — 500g", slug: "kaju-bb-nooka-500g", categorySlug: "kaju-bb", price: 150, originalPrice: null, weight: "500g", image: KAJUBB, images: [NEW_500, KAJUBB, LABEL_IMG], rating: 4.3, reviewCount: 54, isFeatured: false, isBestSeller: false, description: "Budget-friendly cashew variety for everyday consumption and recipes.", benefits: ["Budget Friendly", "Everyday Use", "Recipe Grade", "Natural Fresh"], tags: ["kaju-bb", "budget"] },
  { name: "Kaju BB (Nooka) — 250g", slug: "kaju-bb-nooka-250g", categorySlug: "kaju-bb", price: 50, originalPrice: 130, weight: "250g", image: KAJUBB, images: [NEW_250, KAJUBB, LABEL_IMG], rating: 4.3, reviewCount: 36, isFeatured: false, isBestSeller: false, description: "Budget-friendly cashew variety for everyday consumption and recipes.", benefits: ["Budget Friendly", "Everyday Use", "Recipe Grade", "Natural Fresh"], tags: ["kaju-bb", "budget"] },

  { name: "W180 Jumbo Cashew — 1kg", slug: "w180-jumbo-cashew-1kg", categorySlug: "w180-cashews", price: 960, originalPrice: 1400, weight: "1kg", image: NEW_1KG, images: [NEW_1KG, STUDIO_1KG, LABEL_IMG], rating: 4.9, reviewCount: 145, isFeatured: true, isBestSeller: true, description: "Large premium whole cashews with excellent taste and crunchy texture. Best for gifting and premium dry fruit packs.", benefits: ["King Size", "Premium Grade", "Gift Ready", "Crunchy Texture"], tags: ["w180", "premium", "jumbo"] },
  { name: "W180 Jumbo Cashew — 500g", slug: "w180-jumbo-cashew-500g", categorySlug: "w180-cashews", price: 860, originalPrice: 1000, weight: "500g", image: NEW_500, images: [NEW_500, LABEL_500, LABEL_IMG], rating: 4.9, reviewCount: 102, isFeatured: true, isBestSeller: false, description: "Large premium whole cashews with excellent taste and crunchy texture. Best for gifting and premium dry fruit packs.", benefits: ["King Size", "Premium Grade", "Gift Ready", "Crunchy Texture"], tags: ["w180", "premium", "jumbo"] },
  { name: "W180 Jumbo Cashew — 250g", slug: "w180-jumbo-cashew-250g", categorySlug: "w180-cashews", price: 355, originalPrice: null, weight: "250g", image: NEW_250, images: [NEW_250, LABEL_250, LABEL_IMG], rating: 4.9, reviewCount: 68, isFeatured: false, isBestSeller: false, description: "Large premium whole cashews with excellent taste and crunchy texture. Best for gifting and premium dry fruit packs.", benefits: ["King Size", "Premium Grade", "Gift Ready", "Crunchy Texture"], tags: ["w180", "premium", "jumbo"] },

  { name: "W240 Super Cashew — 1kg", slug: "w240-super-cashew-1kg", categorySlug: "w240-cashews", price: 830, originalPrice: 999, weight: "1kg", image: NEW_1KG, images: [NEW_1KG, STUDIO_1KG, LABEL_IMG], rating: 4.8, reviewCount: 134, isFeatured: true, isBestSeller: true, description: "High-quality whole cashews with uniform size, ideal for snacks and festive occasions.", benefits: ["Uniform Size", "Festive Grade", "Premium Snack", "FSSAI Certified"], tags: ["w240", "premium"] },
  { name: "W240 Super Cashew — 500g", slug: "w240-super-cashew-500g", categorySlug: "w240-cashews", price: 460, originalPrice: null, weight: "500g", image: NEW_500, images: [NEW_500, LABEL_500, LABEL_IMG], rating: 4.8, reviewCount: 97, isFeatured: false, isBestSeller: false, description: "High-quality whole cashews with uniform size, ideal for snacks and festive occasions.", benefits: ["Uniform Size", "Festive Grade", "Premium Snack", "FSSAI Certified"], tags: ["w240", "premium"] },
  { name: "W240 Super Cashew — 250g", slug: "w240-super-cashew-250g", categorySlug: "w240-cashews", price: 250, originalPrice: 400, weight: "250g", image: NEW_250, images: [NEW_250, LABEL_250, LABEL_IMG], rating: 4.8, reviewCount: 63, isFeatured: false, isBestSeller: false, description: "High-quality whole cashews with uniform size, ideal for snacks and festive occasions.", benefits: ["Uniform Size", "Festive Grade", "Premium Snack", "FSSAI Certified"], tags: ["w240", "premium"] },

  { name: "W320 Cashew — 1kg", slug: "w320-cashew-1kg", categorySlug: "w320-cashews", price: 760, originalPrice: 840, weight: "1kg", image: NEW_1KG, images: [NEW_1KG, STUDIO_1KG, LABEL_IMG], rating: 4.7, reviewCount: 189, isFeatured: true, isBestSeller: true, description: "Popular grade cashews offering premium quality at an affordable price for daily use.", benefits: ["Popular Grade", "Affordable", "Daily Use", "Farm Direct"], tags: ["w320"] },
  { name: "W320 Cashew — 500g", slug: "w320-cashew-500g", categorySlug: "w320-cashews", price: 420, originalPrice: null, weight: "500g", image: NEW_500, images: [NEW_500, LABEL_500, LABEL_IMG], rating: 4.7, reviewCount: 143, isFeatured: false, isBestSeller: false, description: "Popular grade cashews offering premium quality at an affordable price for daily use.", benefits: ["Popular Grade", "Affordable", "Daily Use", "Farm Direct"], tags: ["w320"] },
  { name: "W320 Cashew — 250g", slug: "w320-cashew-250g", categorySlug: "w320-cashews", price: 260, originalPrice: 390, weight: "250g", image: NEW_250, images: [NEW_250, LABEL_250, LABEL_IMG], rating: 4.7, reviewCount: 98, isFeatured: false, isBestSeller: false, description: "Popular grade cashews offering premium quality at an affordable price for daily use.", benefits: ["Popular Grade", "Affordable", "Daily Use", "Farm Direct"], tags: ["w320"] },

  { name: "Skin Cashews — 1kg", slug: "skin-cashews-1kg", categorySlug: "skin-cashews", price: 950, originalPrice: 1000, weight: "1kg", image: SKIN, images: [NEW_1KG, SKIN, LABEL_IMG], rating: 4.6, reviewCount: 77, isFeatured: true, isBestSeller: true, description: "Naturally processed skin-on cashews with authentic flavor and nutritional benefits.", benefits: ["Skin-On", "Authentic Flavor", "Nutritional", "Natural Process"], tags: ["skin", "natural"] },
  { name: "Skin Cashews — 500g", slug: "skin-cashews-500g", categorySlug: "skin-cashews", price: 499, originalPrice: null, weight: "500g", image: SKIN, images: [NEW_500, SKIN, LABEL_IMG], rating: 4.6, reviewCount: 53, isFeatured: false, isBestSeller: false, description: "Naturally processed skin-on cashews with authentic flavor and nutritional benefits.", benefits: ["Skin-On", "Authentic Flavor", "Nutritional", "Natural Process"], tags: ["skin", "natural"] },
  { name: "Skin Cashews — 250g", slug: "skin-cashews-250g", categorySlug: "skin-cashews", price: 200, originalPrice: 400, weight: "250g", image: SKIN, images: [NEW_250, SKIN, LABEL_IMG], rating: 4.6, reviewCount: 34, isFeatured: false, isBestSeller: false, description: "Naturally processed skin-on cashews with authentic flavor and nutritional benefits.", benefits: ["Skin-On", "Authentic Flavor", "Nutritional", "Natural Process"], tags: ["skin", "natural"] },
];

async function seed() {
  const categoryIds = new Map<string, string>();

  for (const c of categories) {
    const { rows } = await pool.query<{ id: string }>(
      `INSERT INTO categories (name, slug, image) VALUES ($1, $2, $3)
       ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, image = EXCLUDED.image
       RETURNING id`,
      [c.name, c.slug, c.image]
    );
    categoryIds.set(c.slug, rows[0].id);
  }
  logger.info(`Upserted ${categories.length} categories`);

  for (const p of products) {
    const categoryId = categoryIds.get(p.categorySlug);
    if (!categoryId) throw new Error(`Unknown category slug in seed data: ${p.categorySlug}`);

    await pool.query(
      `INSERT INTO products
         (name, slug, category_id, price, original_price, weight, image, images,
          rating, review_count, description, benefits, tags, in_stock, is_featured, is_best_seller)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,true,$14,$15)
       ON CONFLICT (slug) DO UPDATE SET
         name = EXCLUDED.name, category_id = EXCLUDED.category_id, price = EXCLUDED.price,
         original_price = EXCLUDED.original_price, weight = EXCLUDED.weight, image = EXCLUDED.image,
         images = EXCLUDED.images, rating = EXCLUDED.rating, review_count = EXCLUDED.review_count,
         description = EXCLUDED.description, benefits = EXCLUDED.benefits, tags = EXCLUDED.tags,
         is_featured = EXCLUDED.is_featured, is_best_seller = EXCLUDED.is_best_seller`,
      [
        p.name, p.slug, categoryId, p.price, p.originalPrice, p.weight, p.image, p.images,
        p.rating, p.reviewCount, p.description, p.benefits, p.tags, p.isFeatured, p.isBestSeller,
      ]
    );
  }
  logger.info(`Upserted ${products.length} products`);
}

seed()
  .then(() => pool.end())
  .catch((err) => {
    logger.error({ err }, "Seed failed");
    pool.end().finally(() => process.exit(1));
  });
