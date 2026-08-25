import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/products-service";
import { ProductCard } from "@/components/shop/ProductCard";
import { ChevronRight, Home, LayoutGrid } from "lucide-react";

export const revalidate = 60;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const categories = await getCategories();
  const currentCategory = categories.find((c) => c.slug === categorySlug);

  if (!currentCategory) {
    notFound();
  }

  const products = await getProducts({ categorySlug });

  return (
    <div className="bg-slate-50/60 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600 flex items-center">
            <Home className="w-3.5 h-3.5 mr-1" />
            <span>Trang chủ</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/shop" className="hover:text-blue-600">
            Cửa hàng
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-900">{currentCategory.name}</span>
        </nav>

        {/* Category Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {currentCategory.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-2xl">
            {currentCategory.description || "Tổng hợp các sản phẩm và gói dịch vụ bản quyền uy tín."}
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <Link
            href="/shop"
            className="px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          >
            Tất cả
          </Link>
          {categories.map((cat) => {
            const isActive = cat.slug === categorySlug;
            return (
              <Link
                key={cat.id}
                href={`/shop/${cat.slug}`}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
            <LayoutGrid className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">
              Chưa có sản phẩm trong danh mục này
            </h3>
            <Link
              href="/shop"
              className="inline-block mt-3 text-xs font-bold text-blue-600 hover:underline"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
