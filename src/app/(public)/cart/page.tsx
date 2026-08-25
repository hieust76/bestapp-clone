"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Ticket,
  ShieldCheck,
  Zap,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/cart-store";
import { formatVND } from "@/lib/utils";
import { validateCouponAction } from "@/actions/order-actions";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    setUpgradeEmail,
    couponCode,
    discountAmount,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getTotal,
  } = useCartStore();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const subtotal = getSubtotal();
  const total = getTotal();

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;

    setCouponError(null);
    setCouponLoading(true);

    try {
      const res = await validateCouponAction(inputCoupon, subtotal);
      if (res.success && res.coupon) {
        applyCoupon(res.coupon.code, res.coupon.discount);
        setInputCoupon("");
      } else {
        setCouponError(res.error || "Mã giảm giá không hợp lệ.");
      }
    } catch (err) {
      setCouponError("Không thể áp dụng mã vào lúc này.");
    } finally {
      setCouponLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] bg-slate-50 flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Giỏ hàng của bạn đang trống</h2>
          <p className="text-xs text-slate-500 mt-2 mb-6">
            Hãy khám phá các gói tài khoản AI, bản quyền phần mềm và nhận ngay ưu đãi giảm tới 75%!
          </p>
          <Link href="/shop">
            <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-sm h-11">
              <span>Khám phá sản phẩm ngay</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/60 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-3 mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Giỏ Hàng Của Bạn
          </h1>
          <Badge variant="secondary" className="text-xs font-bold px-2.5 py-0.5">
            {items.length} sản phẩm
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.variantId}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Product Thumbnail & Details */}
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-20 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                    <Image
                      src={item.coverImage}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      {item.name}
                    </h3>
                    <p className="text-xs text-blue-600 font-semibold mt-0.5">
                      {item.variantName}
                    </p>
                    <div className="flex items-center space-x-2 mt-1.5 text-[11px] text-emerald-700">
                      <Zap className="w-3 h-3 text-emerald-600" />
                      <span>Giao tự động trong 1 phút</span>
                    </div>

                    {item.upgradeEmail && (
                      <p className="text-[11px] text-amber-700 mt-1 font-medium bg-amber-50 px-2 py-0.5 rounded-md inline-block">
                        Email nâng cấp: {item.upgradeEmail}
                      </p>
                    )}
                  </div>
                </div>

                {/* Quantity & Price Controls */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-6">
                  {/* Quantity */}
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50/70">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      className="p-1.5 hover:bg-slate-200/80 text-slate-600 rounded-l-xl transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      className="p-1.5 hover:bg-slate-200/80 text-slate-600 rounded-r-xl transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <span className="text-base font-black text-slate-900 block">
                      {formatVND(item.price * item.quantity)}
                    </span>
                    {item.originalPrice > item.price && (
                      <span className="text-xs text-slate-400 line-through">
                        {formatVND(item.originalPrice * item.quantity)}
                      </span>
                    )}
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeItem(item.variantId)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Xoá khỏi giỏ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Guarantees Box */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Giao hàng tự động 24/7</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Bảo hành 1-1 full time</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Hỗ trợ đổi trả & hoàn tiền</span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div className="lg:col-span-4 space-y-4">
            {/* Coupon Box */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <label className="block text-xs font-bold text-slate-800 flex items-center">
                <Ticket className="w-4 h-4 mr-1.5 text-blue-600" />
                <span>Mã giảm giá (Coupon):</span>
              </label>

              {couponCode ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-mono text-xs font-bold text-emerald-800">
                      {couponCode} (-{formatVND(discountAmount)})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-xs text-rose-600 font-semibold hover:underline"
                  >
                    Huỷ
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Nhập mã (VD: WELCOME10)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                    className="text-xs uppercase font-mono h-10 rounded-xl"
                  />
                  <Button
                    type="submit"
                    disabled={couponLoading}
                    className="h-10 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
                  >
                    {couponLoading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      "Áp dụng"
                    )}
                  </Button>
                </form>
              )}

              {couponError && (
                <p className="text-[11px] font-semibold text-rose-600 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1 shrink-0" />
                  <span>{couponError}</span>
                </p>
              )}
            </div>

            {/* Summary Box */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
                Tóm Tắt Đơn Hàng
              </h3>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Tạm tính ({items.length} món):</span>
                  <span className="font-semibold text-slate-900">{formatVND(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Giảm giá khuyến mãi:</span>
                    <span>-{formatVND(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Phí xử lý & giao key tự động:</span>
                  <span className="font-bold text-emerald-600">MIỄN PHÍ</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                <span className="font-bold text-sm text-slate-900">Tổng thanh toán:</span>
                <span className="text-2xl font-black text-blue-600">
                  {formatVND(total)}
                </span>
              </div>

              <Link href="/checkout" className="block w-full">
                <Button className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25">
                  <span>Tiến Hành Đặt Hàng</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
