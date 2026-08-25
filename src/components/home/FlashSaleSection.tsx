"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Flame, Zap, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatVND } from "@/lib/utils";

interface FlashSaleItem {
  id: string;
  slug: string;
  name: string;
  variant: string;
  originalPrice: number;
  salePrice: number;
  discountPercent: number;
  soldCount: number;
  totalLimit: number;
  category: string;
  deliveryType: string;
}

export function FlashSaleSection() {
  // Countdown timer simulation
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashItems: FlashSaleItem[] = [
    {
      id: "fs-1",
      slug: "chatgpt-plus-1m",
      name: "Tài Khoản ChatGPT Plus Chính Chủ",
      variant: "Gói 1 Tháng (Tài khoản cấp sẵn)",
      originalPrice: 499000,
      salePrice: 189000,
      discountPercent: 62,
      soldCount: 42,
      totalLimit: 50,
      category: "AI & Chatbot",
      deliveryType: "Giao tự động 10s",
    },
    {
      id: "fs-2",
      slug: "canva-pro-edu-1y",
      name: "Canva Pro Nâng Cấp Email Chính Chủ",
      variant: "Gói 1 Năm - Kích hoạt vào mail cá nhân",
      originalPrice: 350000,
      salePrice: 149000,
      discountPercent: 57,
      soldCount: 88,
      totalLimit: 100,
      category: "Thiết Kế",
      deliveryType: "Tự động kích hoạt",
    },
    {
      id: "fs-3",
      slug: "claude-pro-1m",
      name: "Claude 3.5 Sonnet Pro",
      variant: "Gói 1 Tháng - Không giới hạn model",
      originalPrice: 520000,
      salePrice: 219000,
      discountPercent: 58,
      soldCount: 29,
      totalLimit: 35,
      category: "AI & Chatbot",
      deliveryType: "Giao tự động",
    },
    {
      id: "fs-4",
      slug: "key-win-11-pro",
      name: "Key Bản Quyền Windows 11 Pro",
      variant: "Vĩnh viễn 1 PC - Update trọn đời",
      originalPrice: 390000,
      salePrice: 99000,
      discountPercent: 75,
      soldCount: 94,
      totalLimit: 100,
      category: "Bản Quyền OS",
      deliveryType: "Giao Key tức thì",
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-orange-50/70 via-rose-50/30 to-white border-y border-orange-200/60">
      <div className="container mx-auto px-4">
        {/* Flash Sale Header with Countdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-orange-200/70">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-600 to-rose-600 flex items-center justify-center text-white shadow-md shadow-orange-500/30 animate-pulse">
              <Flame className="w-6 h-6 fill-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  FLASH SALE <span className="text-orange-600">GIÁ SỐC</span>
                </h2>
                <Badge variant="discount" className="hidden sm:inline-flex">
                  GIẢM ĐẾN 75%
                </Badge>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Cơ hội sở hữu tài khoản số cao cấp với giá rẻ nhất trong ngày
              </p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl border border-orange-200 shadow-sm self-start md:self-auto">
            <span className="text-xs font-bold text-slate-700 mr-1 flex items-center">
              <Zap className="w-4 h-4 text-orange-500 fill-orange-500 mr-1" />
              Kết thúc trong:
            </span>
            <div className="flex items-center space-x-1.5 font-mono text-sm font-black text-white">
              <span className="bg-slate-900 px-2.5 py-1 rounded-lg">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-slate-800 font-bold">:</span>
              <span className="bg-slate-900 px-2.5 py-1 rounded-lg">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-slate-800 font-bold">:</span>
              <span className="bg-orange-600 px-2.5 py-1 rounded-lg animate-pulse">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {flashItems.map((item) => {
            const soldPercentage = Math.round((item.soldCount / item.totalLimit) * 100);

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-orange-200/90 shadow-sm hover:shadow-lg hover:border-orange-300 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-5">
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <Badge variant="discount" className="text-xs px-2 py-0.5">
                      -{item.discountPercent}%
                    </Badge>
                  </div>

                  {/* Title & Variant */}
                  <h3 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors text-base leading-snug line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    {item.variant}
                  </p>

                  {/* Delivery Badge */}
                  <div className="mt-3 inline-flex items-center text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                    <Zap className="w-3 h-3 mr-1 text-emerald-600" />
                    {item.deliveryType}
                  </div>

                  {/* Price */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-xl font-black text-rose-600">
                        {formatVND(item.salePrice)}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        {formatVND(item.originalPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Sold Progress Bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                      <span>Đã bán: {item.soldCount}/{item.totalLimit}</span>
                      <span className="text-orange-600">{soldPercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-rose-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${soldPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-4 pt-0">
                  <Link href={`/product/${item.slug}`}>
                    <Button
                      variant="flash"
                      className="w-full rounded-xl font-bold text-xs h-10 shadow-sm"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                      <span>Mua Ngay</span>
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Flash Sale Link */}
        <div className="mt-8 text-center">
          <Link href="/flash-sale">
            <Button
              variant="outline"
              className="rounded-xl border-orange-300 text-orange-700 hover:bg-orange-50 font-bold text-xs px-6"
            >
              <span>Xem toàn bộ 30+ sản phẩm Flash Sale</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
