import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products-service";
import { ProductDetailView } from "@/components/shop/ProductDetailView";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Sản phẩm không tồn tại - BestApp.vn",
    };
  }

  return {
    title: `${product.name} - Giá Rẻ Giao Tự Động | BestApp.vn`,
    description: product.shortDescription || `Mua ${product.name} bản quyền chính hãng tại BestApp.vn`,
    openGraph: {
      title: `${product.name} - BestApp.vn`,
      description: product.shortDescription,
      images: [product.coverImage],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
