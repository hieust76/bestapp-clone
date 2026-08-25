export type DeliveryType = "AUTO_KEY" | "AUTO_ACCOUNT" | "INVITE_LINK" | "MANUAL";

export type ProductStatus = "ACTIVE" | "DRAFT" | "OUT_OF_STOCK";

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  sortOrder: number;
  isFeatured: boolean;
}

export interface ProductVariantItem {
  id: string;
  productId: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  durationDays: number;
  sortOrder: number;
  isActive: boolean;
}

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  shortDesc?: string | null;
  description: string;
  categoryId: string;
  category?: ProductCategory;
  coverImage: string;
  images: string[];
  badgeText?: string | null;
  status: ProductStatus;
  deliveryType: DeliveryType;
  isFeatured: boolean;
  isFlashSale: boolean;
  flashSalePrice?: number | null;
  flashSaleEndsAt?: Date | string | null;
  warrantyPolicy?: string | null;
  instructionHtml?: string | null;
  totalSold: number;
  ratingAvg: number;
  ratingCount: number;
  variants: ProductVariantItem[];
}
