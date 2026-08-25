import { FlashSaleSection } from "@/components/home/FlashSaleSection";
import { getProducts } from "@/lib/products-service";
import { ProductCard } from "@/components/shop/ProductCard";
import { Flame, Sparkles, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Flash Sale - Săn Deal Sản Phẩm Số Giảm Tới 75% | BestApp.vn",
  description: "Cơ hội mua tài khoản AI, bản quyền Windows 11, Canva Pro với giá rẻ nhất trong ngày. Giao tự động trong 1 phút.",
};

export default async function FlashSalePage() {
  const products = await getProducts({ limit: 8 });

  return (
    <div className="bg-slate-50/60 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Banner */}
        <div className="bg-gradient-to-r from-orange-600 via-rose-600 to-red-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-orange-500/20 mb-10">
          <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider mb-2 bg-white/20 px-3 py-1 rounded-full w-fit backdrop-blur-sm">
            <Flame className="w-4 h-4 fill-white animate-bounce" />
            <span>SỰ KIỆN GIỜ VÀNG GIÁ SỐC</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            Flash Sale <span className="text-amber-300">Siêu Ưu Đãi</span>
          </h1>
          <p className="text-xs sm:text-sm text-orange-100 mt-2 max-w-xl">
            Số lượng có hạn, ưu đãi tự động kết thúc khi hết thời gian hoặc hết số lượng suất ưu đãi trong ngày.
          </p>
        </div>

        {/* Live Flash Sale Section */}
        <FlashSaleSection />

        {/* More Featured Deals */}
        <div className="mt-14">
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
            <Zap className="w-4 h-4" />
            <span>Có Thể Bạn Quan Tâm</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-6">
            Sản Phẩm Số Đang Giảm Giá Khác
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
