import { HttpError } from "../middleware/errorHandler";
import {
  listProducts as listProductsRepo,
  findProductBySlug,
  findProductById,
  createProduct as createProductRepo,
  updateProduct as updateProductRepo,
  deleteProductById,
  ProductWriteParams,
} from "../repositories/productRepository";
import { findCategoryBySlug } from "../repositories/categoryRepository";
import { toPublicProduct, PublicProduct } from "../utils/publicProduct";
import { CreateProductInput, UpdateProductInput, ListProductsQuery } from "../validators/productValidators";

export async function listProducts(query: ListProductsQuery): Promise<PublicProduct[]> {
  const rows = await listProductsRepo({
    categorySlug: query.category,
    weight: query.weight,
    search: query.search,
    sort: query.sort,
    featured: query.featured,
    bestSeller: query.bestSeller,
  });
  return rows.map(toPublicProduct);
}

export async function getProductBySlug(slug: string): Promise<PublicProduct> {
  const row = await findProductBySlug(slug);
  if (!row) {
    throw new HttpError(404, "Product not found");
  }
  return toPublicProduct(row);
}

async function resolveCategoryId(categorySlug: string): Promise<string> {
  const category = await findCategoryBySlug(categorySlug);
  if (!category) {
    throw new HttpError(400, `Unknown category "${categorySlug}"`);
  }
  return category.id;
}

async function assertSlugAvailable(slug: string, excludeProductId?: string) {
  const existing = await findProductBySlug(slug);
  if (existing && existing.id !== excludeProductId) {
    throw new HttpError(409, "A product with this slug already exists");
  }
}

export async function createProductEntry(input: CreateProductInput): Promise<PublicProduct> {
  await assertSlugAvailable(input.slug);
  const categoryId = await resolveCategoryId(input.categorySlug);

  const row = await createProductRepo({
    name: input.name,
    slug: input.slug,
    categoryId,
    price: input.price,
    originalPrice: input.originalPrice ?? null,
    weight: input.weight,
    image: input.image,
    images: input.images,
    rating: input.rating,
    reviewCount: input.reviewCount,
    description: input.description,
    benefits: input.benefits,
    tags: input.tags,
    inStock: input.inStock,
    isFeatured: input.isFeatured,
    isBestSeller: input.isBestSeller,
  });
  return toPublicProduct(row);
}

export async function updateProductEntry(id: string, input: UpdateProductInput): Promise<PublicProduct> {
  const existing = await findProductById(id);
  if (!existing) {
    throw new HttpError(404, "Product not found");
  }
  if (input.slug && input.slug !== existing.slug) {
    await assertSlugAvailable(input.slug, id);
  }
  const categoryId = input.categorySlug ? await resolveCategoryId(input.categorySlug) : existing.category_id;

  // Merge the partial input over the existing row so the repository always
  // writes a fully-resolved set of values - see productRepository.updateProduct
  // for why this matters for nullable fields like originalPrice.
  const merged: ProductWriteParams = {
    name: input.name ?? existing.name,
    slug: input.slug ?? existing.slug,
    categoryId,
    price: input.price ?? Number(existing.price),
    originalPrice:
      "originalPrice" in input ? input.originalPrice ?? null : existing.original_price !== null ? Number(existing.original_price) : null,
    weight: input.weight ?? existing.weight,
    image: input.image ?? existing.image,
    images: input.images ?? existing.images,
    rating: input.rating ?? Number(existing.rating),
    reviewCount: input.reviewCount ?? existing.review_count,
    description: input.description ?? existing.description,
    benefits: input.benefits ?? existing.benefits,
    tags: input.tags ?? existing.tags,
    inStock: input.inStock ?? existing.in_stock,
    isFeatured: input.isFeatured ?? existing.is_featured,
    isBestSeller: input.isBestSeller ?? existing.is_best_seller,
  };

  const row = await updateProductRepo(id, merged);
  return toPublicProduct(row!);
}

export async function deleteProductEntry(id: string): Promise<void> {
  const existing = await findProductById(id);
  if (!existing) {
    throw new HttpError(404, "Product not found");
  }
  await deleteProductById(id);
}
