import { CategoryWithCountRow, CategoryRow } from "../repositories/categoryRepository.js";

export interface PublicCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

export function toPublicCategory(row: CategoryRow | CategoryWithCountRow): PublicCategory {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    image: row.image,
    productCount: "product_count" in row ? Number(row.product_count) : 0,
  };
}
