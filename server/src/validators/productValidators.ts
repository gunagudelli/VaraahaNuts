import { z } from "zod";

export const listProductsQuerySchema = z.object({
  category: z.string().trim().toLowerCase().optional(),
  weight: z.string().trim().optional(),
  search: z.string().trim().optional(),
  sort: z.enum(["popular", "price-asc", "price-desc", "rating"]).default("popular"),
  featured: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === "true")),
  bestSeller: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === "true")),
});

export type ListProductsQuery = z.infer<typeof listProductsQuerySchema>;

const slugField = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Slug is required")
  .max(160, "Slug is too long")
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Slug must be lowercase letters, numbers and hyphens only");

export const createProductSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200, "Name is too long"),
  slug: slugField,
  categorySlug: z.string().trim().toLowerCase().min(1, "Category is required"),
  price: z.coerce.number().nonnegative("Price must be 0 or more"),
  originalPrice: z.coerce.number().nonnegative().nullable().optional(),
  weight: z.string().trim().min(1, "Weight is required").max(40, "Weight is too long"),
  image: z.string().trim().min(1, "Image is required"),
  images: z.array(z.string().trim().min(1)).optional().default([]),
  rating: z.coerce.number().min(0).max(5).optional().default(0),
  reviewCount: z.coerce.number().int().nonnegative().optional().default(0),
  description: z.string().trim().max(2000, "Description is too long").optional().default(""),
  benefits: z.array(z.string().trim().min(1)).optional().default([]),
  tags: z.array(z.string().trim().min(1)).optional().default([]),
  inStock: z.boolean().optional().default(true),
  isFeatured: z.boolean().optional().default(false),
  isBestSeller: z.boolean().optional().default(false),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const updateProductSchema = createProductSchema.partial();

export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export const productIdParamSchema = z.object({
  id: z.uuid("Invalid product id"),
});

export type ProductIdParam = z.infer<typeof productIdParamSchema>;

export const productSlugParamSchema = z.object({
  slug: z.string().trim().toLowerCase().min(1, "Invalid product slug"),
});

export type ProductSlugParam = z.infer<typeof productSlugParamSchema>;
