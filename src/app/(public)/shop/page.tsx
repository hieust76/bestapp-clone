import Link from "next/link";
import { getCategories, getProducts } from "@/lib/products-service";
import { ProductCard } from "@/components/shop/ProductCard";
import { LayoutGrid, Filter, Search, Sparkles } from "lucide-react";

export const revalidate = 60; // ISR revalidate every 60 seconds

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;
  const categories = await getCategories();
  const products = await getProducts({
    query: q,
    categorySlug: category,
  });

  return (
    <div className="bg-slate-50/60 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header Title */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kho Sản Phẩm Số Chính Hãng</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {q ? `Kết quả tìm kiếm: "${q}"` : "Tất Cả Sản Phẩm Số Bản Quyền"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Khám phá hơn 50+ tài khoản công cụ AI, bản quyền phần mềm, đồ hoạ, văn phòng và giải trí với chính sách bảo hành 1-đổi-1 toàn diện.
            </p>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <Link
            href="/shop"
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              !category
                ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
            }`}
          >
            Tất cả ({products.length})
          </Link>
          {categories.map((cat) => {
            const isActive = category === cat.slug;
            return (
              <Link
                key={cat.id}
                href={`/shop/${cat.slug}`}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>

        {/* Product Grid */}
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
              Không tìm thấy sản phẩm phù hợp
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Thử tìm kiếm với từ khoá khác như "ChatGPT", "Canva", "Windows", "Office"...
            </p>
            <Link
              href="/shop"
              className="inline-block mt-4 text-xs font-bold text-blue-600 hover:underline"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
