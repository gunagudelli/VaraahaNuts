import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(5001),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  JWT_SECRET: z.string().min(16, "JWT_SECRET must be set to a strong value"),
  CORS_ORIGINS: z.string().default(""),

  // Single-owner admin login for the product catalog admin panel.
  PRODUCT_ADMIN_EMAIL: z.string().min(1, "PRODUCT_ADMIN_EMAIL is required"),
  PRODUCT_ADMIN_PASSWORD_HASH: z.string().min(1, "PRODUCT_ADMIN_PASSWORD_HASH is required"),

  // Base URL the STOREFRONT is served from (not this API) - product images
  // live in the frontend's /public/products and are served from there, so
  // this is what the seed script uses to build absolute image URLs. Locally
  // that's the Vite dev server; in production it's the same Vercel domain
  // this API is deployed alongside.
  PUBLIC_BASE_URL: z.string().default("http://localhost:5183"),

  // Supabase Storage - used for admin image uploads (banner/product/category photos).
  SUPABASE_URL: z.string().min(1, "SUPABASE_URL is required"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, "SUPABASE_SERVICE_ROLE_KEY is required"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = {
  ...parsed.data,
  CORS_ORIGINS: parsed.data.CORS_ORIGINS.split(",").map((s) => s.trim()).filter(Boolean),
};
