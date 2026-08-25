"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Zap, ShieldCheck, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatVND, calculateDiscountPercent } from "@/lib/utils";
import { MockProduct } from "@/lib/products-service";

export function ProductCard({ product }: { product: MockProduct }) {
  const primaryVariant = product.variants?.[0];
  const salePrice = primaryVariant?.salePrice || primaryVariant?.price || 0;
  const originalPrice = primaryVariant?.price || salePrice;
  const discount = calculateDiscountPercent(originalPrice, salePrice);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Cover Image Container */}
        <div className="relative w-full h-44 bg-slate-100 overflow-hidden">
          <Image
            src={product.coverImage}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
            {product.badgeText ? (
              <Badge variant="hot" className="text-[10px] px-2 py-0.5 shadow-sm">
                {product.badgeText}
              </Badge>
            ) : (
              <span className="text-[10px] font-bold text-slate-800 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm">
                {product.category?.name || "Sản phẩm số"}
              </span>
            )}

            {discount > 0 && (
              <Badge variant="discount" className="text-[10px] px-2 py-0.5 shadow-sm">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Bottom badge on image */}
          <div className="absolute bottom-2 left-2.5 pointer-events-none">
            <span className="inline-flex items-center text-[10px] font-bold text-white bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded-md">
              <Zap className="w-3 h-3 text-amber-400 mr-1 fill-amber-400" />
              Giao tự động 1p
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-sm sm:text-base leading-snug line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Ratings and Sold */}
          <div className="flex items-center space-x-2 mt-3 text-xs text-slate-600">
            <div className="flex items-center text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
              <span>{product.rating}</span>
            </div>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 text-[11px]">
              Đã bán {product.totalSold.toLocaleString("vi-VN")}
            </span>
          </div>

          {/* Warranty tag */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center text-[11px] text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 mr-1 shrink-0" />
            <span className="truncate">{product.warrantyPolicy || "Bảo hành 1-đổi-1"}</span>
          </div>

          {/* Price */}
          <div className="mt-3 pt-2.5 border-t border-slate-100">
            <div className="flex items-baseline space-x-2">
              <span className="text-lg sm:text-xl font-black text-blue-600">
                {formatVND(salePrice)}
              </span>
              {originalPrice > salePrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formatVND(originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="p-4 sm:p-5 pt-0 grid grid-cols-2 gap-2">
        <Link href={`/products/${product.slug}`} className="w-full">
          <Button
            variant="outline"
            className="w-full text-xs font-semibold rounded-xl border-slate-200 hover:bg-slate-50 h-9"
          >
            Chi tiết
          </Button>
        </Link>
        <Link href={`/products/${product.slug}`} className="w-full">
          <Button className="w-full text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 h-9">
            <ShoppingCart className="w-3.5 h-3.5 mr-1" />
            <span>Mua ngay</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
