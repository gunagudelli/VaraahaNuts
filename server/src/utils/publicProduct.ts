import { ProductRow } from "../repositories/productRepository.js";

export interface PublicProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  weight: string;
  image: string;
  images?: string[];
  rating: number;
  reviewCount: number;
  description: string;
  benefits: string[];
  inStock: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isActive?: boolean;
  tags?: string[];
}

export function toPublicProduct(row: ProductRow): PublicProduct {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category_slug,
    price: Number(row.price),
    originalPrice: row.original_price !== null ? Number(row.original_price) : undefined,
    weight: row.weight,
    image: row.image,
    images: row.images,
    rating: Number(row.rating),
    reviewCount: row.review_count,
    description: row.description,
    benefits: row.benefits,
    inStock: row.in_stock,
    isBestSeller: row.is_best_seller,
    isFeatured: row.is_featured,
    isActive: row.is_active,
    tags: row.tags,
  };
}
