import { HttpError } from "../middleware/errorHandler";
import {
  listCategoriesWithCounts,
  findCategoryById,
  findCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategoryById,
  countProductsInCategory,
} from "../repositories/categoryRepository";
import { toPublicCategory, PublicCategory } from "../utils/publicCategory";
import { CreateCategoryInput, UpdateCategoryInput } from "../validators/categoryValidators";

export async function listCategories(): Promise<PublicCategory[]> {
  const rows = await listCategoriesWithCounts();
  return rows.map(toPublicCategory);
}

export async function createCategoryEntry(input: CreateCategoryInput): Promise<PublicCategory> {
  const existing = await findCategoryBySlug(input.slug);
  if (existing) {
    throw new HttpError(409, "A category with this slug already exists");
  }
  const row = await createCategory(input);
  return toPublicCategory(row);
}

export async function updateCategoryEntry(id: string, input: UpdateCategoryInput): Promise<PublicCategory> {
  const existing = await findCategoryById(id);
  if (!existing) {
    throw new HttpError(404, "Category not found");
  }
  if (input.slug && input.slug !== existing.slug) {
    const slugTaken = await findCategoryBySlug(input.slug);
    if (slugTaken) {
      throw new HttpError(409, "A category with this slug already exists");
    }
  }
  const row = await updateCategory(id, input);
  return toPublicCategory(row!);
}

export async function deleteCategoryEntry(id: string): Promise<void> {
  const existing = await findCategoryById(id);
  if (!existing) {
    throw new HttpError(404, "Category not found");
  }
  const productCount = await countProductsInCategory(id);
  if (productCount > 0) {
    throw new HttpError(409, `Cannot delete: ${productCount} product(s) still use this category`);
  }
  await deleteCategoryById(id);
}
