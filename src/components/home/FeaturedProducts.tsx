"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Star,
  Zap,
  ShieldCheck,
  ShoppingCart,
  ArrowRight,
  Bot,
  Sparkles,
  Palette,
  Laptop,
  GraduationCap,
  Film,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatVND, calculateDiscountPercent } from "@/lib/utils";

interface ProductCardData {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  category: string;
  categoryKey: string;
  originalPrice: number;
  salePrice: number;
  rating: number;
  reviewsCount: number;
  totalSold: number;
  badge?: string;
  deliveryType: string;
  warranty: string;
}

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("all");

  const filterTabs = [
    { key: "all", label: "Tất Cả Sản Phẩm" },
    { key: "ai", label: "Công Cụ AI & Chatbot", icon: Bot },
    { key: "design", label: "Thiết Kế & Đồ Hoạ", icon: Palette },
    { key: "os", label: "Bản Quyền OS & Office", icon: Laptop },
    { key: "learning", label: "Học Tập & Ngoại Ngữ", icon: GraduationCap },
    { key: "entertainment", label: "Giải Trí & Âm Nhạc", icon: Film },
  ];

  const products: ProductCardData[] = [
    {
      id: "p1",
      slug: "chatgpt-plus",
      name: "Tài Khoản ChatGPT Plus Chính Chủ",
      shortDesc: "Truy cập GPT-4o, DALL-E 3, Canvas, Voice Mode nâng cao không giới hạn",
      category: "AI & Chatbot",
      categoryKey: "ai",
      originalPrice: 499000,
      salePrice: 199000,
      rating: 4.9,
      reviewsCount: 342,
      totalSold: 1520,
      badge: "Bán Chạy Nhất",
      deliveryType: "Giao ngay trong 1 phút",
      warranty: "Bảo hành 1-đổi-1 full time",
    },
    {
      id: "p2",
      slug: "claude-3-5-sonnet-pro",
      name: "Claude 3.5 Sonnet Pro",
      shortDesc: "Đỉnh cao lập trình và xử lý tài liệu lớn với Artifacts & Project feature",
      category: "AI & Chatbot",
      categoryKey: "ai",
      originalPrice: 520000,
      salePrice: 229000,
      rating: 5.0,
      reviewsCount: 189,
      totalSold: 840,
      badge: "HOT AI",
      deliveryType: "Giao ngay trong 1 phút",
      warranty: "Bảo hành trọn gói",
    },
    {
      id: "p3",
      slug: "canva-pro-1-year",
      name: "Tài Khoản Canva Pro 1 Năm",
      shortDesc: "Nâng cấp trực tiếp email cá nhân, mở khoá 100M+ mẫu và tính năng Magic AI",
      category: "Thiết Kế",
      categoryKey: "design",
      originalPrice: 350000,
      salePrice: 149000,
      rating: 4.9,
      reviewsCount: 520,
      totalSold: 2890,
      badge: "Phổ Biến",
      deliveryType: "Kích hoạt tự động",
      warranty: "Bảo hành 12 tháng",
    },
    {
      id: "p4",
      slug: "key-windows-11-pro",
      name: "Key Bản Quyền Windows 11 Pro",
      shortDesc: "Key Retail chính hãng kích hoạt online 1 PC vĩnh viễn, update thoải mái",
      category: "Bản Quyền OS",
      categoryKey: "os",
      originalPrice: 390000,
      salePrice: 99000,
      rating: 5.0,
      reviewsCount: 410,
      totalSold: 3400,
      badge: "Giảm 75%",
      deliveryType: "Giao key tức thì",
      warranty: "Kích hoạt vĩnh viễn",
    },
    {
      id: "p5",
      slug: "office-365-personal",
      name: "Tài Khoản Microsoft 365 + 1TB OneDrive",
      shortDesc: "Cài đặt Word, Excel, PowerPoint trên 5 thiết bị, kèm 1000GB lưu trữ đám mây",
      category: "Bản Quyền OS",
      categoryKey: "os",
      originalPrice: 450000,
      salePrice: 179000,
      rating: 4.8,
      reviewsCount: 230,
      totalSold: 1120,
      badge: "Kèm 1TB Cloud",
      deliveryType: "Giao tài khoản tự động",
      warranty: "Bảo hành 1 năm",
    },
    {
      id: "p6",
      slug: "duolingo-super-1-year",
      name: "Gói Duolingo Super 1 Năm",
      shortDesc: "Học ngoại ngữ không giới hạn trái tim, không quảng cáo, làm bài luyện chuyên sâu",
      category: "Học Tập",
      categoryKey: "learning",
      originalPrice: 300000,
      salePrice: 159000,
      rating: 4.9,
      reviewsCount: 168,
      totalSold: 920,
      badge: "Học Ngoại Ngữ",
      deliveryType: "Gia nhập nhóm học tập",
      warranty: "Bảo hành 365 ngày",
    },
    {
      id: "p7",
      slug: "youtube-premium-1-year",
      name: "YouTube Premium 1 Năm",
      shortDesc: "Xem video không quảng cáo, nghe nhạc tắt màn hình, kèm YouTube Music",
      category: "Giải Trí",
      categoryKey: "entertainment",
      originalPrice: 400000,
      salePrice: 249000,
      rating: 4.9,
      reviewsCount: 680,
      totalSold: 4150,
      badge: "Cực Hot",
      deliveryType: "Gia nhập gia đình tự động",
      warranty: "Bảo hành trọn gói",
    },
    {
      id: "p8",
      slug: "spotify-premium-1-year",
      name: "Spotify Premium 1 Năm",
      shortDesc: "Nghe nhạc chất lượng cao Lossless không quảng cáo trên mọi thiết bị",
      category: "Giải Trí",
      categoryKey: "entertainment",
      originalPrice: 360000,
      salePrice: 189000,
      rating: 4.9,
      reviewsCount: 310,
      totalSold: 1870,
      badge: "Âm Nhạc",
      deliveryType: "Kích hoạt tự động",
      warranty: "Bảo hành 12 tháng",
    },
  ];

  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter((p) => p.categoryKey === activeTab);

  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-4">
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sản Phẩm Được Ưa Chuộng</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Sản Phẩm Số Nổi Bật & Bán Chạy
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            Cam kết tài khoản chất lượng cao, cấp phát hoàn toàn tự động 24/7 với chế độ bảo hành chu đáo.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const discount = calculateDiscountPercent(
              product.originalPrice,
              product.salePrice
            );

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-200 flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    {product.badge ? (
                      <Badge variant="hot" className="text-[11px] px-2.5 py-0.5">
                        {product.badge}
                      </Badge>
                    ) : (
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {product.category}
                      </span>
                    )}
                    <Badge variant="discount" className="text-xs">
                      -{discount}%
                    </Badge>
                  </div>

                  {/* Product Title */}
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-base leading-snug line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Short Description */}
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                    {product.shortDesc}
                  </p>

                  {/* Ratings and Sold */}
                  <div className="flex items-center space-x-2 mt-3 text-xs text-slate-600">
                    <div className="flex items-center text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                      <span>{product.rating}</span>
                    </div>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500">
                      Đã bán {product.totalSold.toLocaleString("vi-VN")}
                    </span>
                  </div>

                  {/* Delivery & Warranty tags */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
                    <div className="flex items-center text-emerald-700 font-medium">
                      <Zap className="w-3.5 h-3.5 text-emerald-600 mr-1.5 shrink-0" />
                      <span>{product.deliveryType}</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600 mr-1.5 shrink-0" />
                      <span>{product.warranty}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-xl font-black text-blue-600">
                        {formatVND(product.salePrice)}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        {formatVND(product.originalPrice)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <Link href={`/product/${product.slug}`} className="w-full">
                    <Button
                      variant="outline"
                      className="w-full text-xs font-semibold rounded-xl border-slate-200 hover:bg-slate-50"
                    >
                      Chi tiết
                    </Button>
                  </Link>
                  <Link href={`/product/${product.slug}`} className="w-full">
                    <Button
                      className="w-full text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                      <span>Mua ngay</span>
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link href="/categories">
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl border-slate-300 hover:bg-slate-100 font-bold text-slate-800 text-sm px-8"
            >
              <span>Xem tất cả sản phẩm ({products.length * 4}+ dịch vụ)</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
