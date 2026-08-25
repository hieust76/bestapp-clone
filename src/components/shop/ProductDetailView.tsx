"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  Zap,
  ShieldCheck,
  RotateCcw,
  Headphones,
  CheckCircle2,
  ShoppingCart,
  ArrowRight,
  Plus,
  Minus,
  Mail,
  UserCheck,
  ChevronRight,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { formatVND, calculateDiscountPercent } from "@/lib/utils";
import { MockProduct, MockVariant } from "@/lib/products-service";
import { useCartStore } from "@/lib/cart-store";

export function ProductDetailView({ product }: { product: MockProduct }) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const [selectedVariant, setSelectedVariant] = useState<MockVariant>(
    product.variants[0] || {
      id: "default",
      productId: product.id,
      name: "Mặc định",
      price: 199000,
      salePrice: 199000,
      stock: 50,
      deliveryType: "AUTO_ACCOUNT",
      durationDays: 30,
    }
  );

  const [quantity, setQuantity] = useState(1);
  const [customerEmail, setCustomerEmail] = useState("");
  const [upgradeEmail, setUpgradeEmail] = useState("");
  const [activeTab, setActiveTab] = useState<"desc" | "warranty" | "guide">("desc");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const salePrice = selectedVariant.salePrice || selectedVariant.price;
  const originalPrice = selectedVariant.price;
  const discount = calculateDiscountPercent(originalPrice, salePrice);

  const isUpgradeType =
    product.type === "UPGRADE" || selectedVariant.deliveryType === "UPGRADE_LINK";

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      variantName: selectedVariant.name,
      price: salePrice,
      originalPrice: originalPrice,
      coverImage: product.coverImage,
      quantity,
      deliveryType: selectedVariant.deliveryType,
      durationDays: selectedVariant.durationDays,
      upgradeEmail: isUpgradeType ? upgradeEmail : undefined,
    });

    setToastMessage("Đã thêm sản phẩm vào giỏ hàng!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

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
          {product.category && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link
                href={`/shop/${product.category.slug}`}
                className="hover:text-blue-600"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-900 truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <Image
                src={product.coverImage}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              {discount > 0 && (
                <Badge
                  variant="discount"
                  className="absolute top-3 left-3 text-xs px-2.5 py-1 shadow-md"
                >
                  GIẢM {discount}%
                </Badge>
              )}
            </div>

            {/* Value Guarantees Box */}
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2.5 text-xs text-slate-700">
              <div className="flex items-center space-x-2 font-semibold text-blue-900">
                <Zap className="w-4 h-4 text-blue-600 fill-blue-600 shrink-0" />
                <span>Giao hàng tự động qua Email & Màn hình sau 1 phút</span>
              </div>
              <div className="flex items-center space-x-2 font-semibold text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Bảo hành 1-đổi-1 trong suốt thời gian sử dụng</span>
              </div>
              <div className="flex items-center space-x-2 font-semibold text-slate-700">
                <RotateCcw className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Hoàn tiền 100% nếu không kích hoạt được</span>
              </div>
            </div>
          </div>

          {/* Right Column: Information, Variants & Actions */}
          <div className="lg:col-span-7 space-y-5">
            {/* Title & Badges */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                {product.badgeText && (
                  <Badge variant="hot" className="text-xs px-2.5 py-0.5">
                    {product.badgeText}
                  </Badge>
                )}
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  {product.category?.name || "Bản Quyền Số"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Rating & Sold status */}
              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-600">
                <div className="flex items-center text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                  <span>{product.rating} / 5.0</span>
                </div>
                <span className="text-slate-300">|</span>
                <span>
                  Đã bán: <b>{product.totalSold.toLocaleString("vi-VN")}</b> lượt
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-emerald-600 font-bold flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Kho hàng: Còn {selectedVariant.stock} sản phẩm
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-baseline space-x-3">
              <span className="text-3xl font-black text-blue-600">
                {formatVND(salePrice * quantity)}
              </span>
              {originalPrice > salePrice && (
                <span className="text-sm text-slate-400 line-through">
                  {formatVND(originalPrice * quantity)}
                </span>
              )}
              {discount > 0 && (
                <Badge variant="discount" className="text-xs">
                  Tiết kiệm {formatVND((originalPrice - salePrice) * quantity)}
                </Badge>
              )}
            </div>

            {/* Variant Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Chọn gói thời hạn / loại tài khoản:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant.id === v.id;
                  const vPrice = v.salePrice || v.price;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3.5 rounded-xl text-left border transition-all ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/50 shadow-sm ring-2 ring-blue-500/20"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold ${
                            isSelected ? "text-blue-900" : "text-slate-800"
                          }`}
                        >
                          {v.name}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        )}
                      </div>
                      <div className="mt-1 flex items-center justify-between text-xs">
                        <span className="font-extrabold text-blue-600">
                          {formatVND(vPrice)}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {v.durationDays ? `${v.durationDays} ngày` : "Vĩnh viễn"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Upgrade Email Input (If applicable) */}
            {isUpgradeType && (
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-2">
                <label className="block text-xs font-bold text-amber-900 flex items-center">
                  <UserCheck className="w-4 h-4 mr-1.5 text-amber-600" />
                  Email tài khoản cần nâng cấp (Chính chủ của bạn):
                </label>
                <Input
                  type="email"
                  placeholder="nhap-email-can-nang-cap@gmail.com"
                  value={upgradeEmail}
                  onChange={(e) => setUpgradeEmail(e.target.value)}
                  className="bg-white border-amber-200 focus:border-amber-500 focus:ring-amber-500/20"
                />
                <p className="text-[11px] text-amber-700">
                  Hệ thống sẽ gửi link kích hoạt hoặc add quyền trực tiếp vào email này.
                </p>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <label className="text-xs font-bold text-slate-700">Số lượng:</label>
              <div className="flex items-center border border-slate-200 rounded-xl bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-slate-100 text-slate-600 rounded-l-xl transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-bold text-slate-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-slate-100 text-slate-600 rounded-r-xl transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Toast feedback */}
            {toastMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                <span>{toastMessage}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleAddToCart}
                className="h-12 rounded-2xl border-slate-300 hover:bg-slate-50 font-bold text-slate-800 text-sm"
              >
                <ShoppingCart className="w-4 h-4 mr-2 text-blue-600" />
                <span>Thêm Vào Giỏ</span>
              </Button>
              <Button
                type="button"
                onClick={handleBuyNow}
                className="h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm shadow-lg shadow-blue-500/25"
              >
                <span>Mua Ngay (Cấp tự động)</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Description, Warranty, Guides */}
        <div className="mt-10 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center space-x-4 border-b border-slate-200 pb-3 mb-6">
            <button
              onClick={() => setActiveTab("desc")}
              className={`text-sm font-bold pb-2 transition-colors relative ${
                activeTab === "desc"
                  ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Mô tả chi tiết
            </button>
            <button
              onClick={() => setActiveTab("warranty")}
              className={`text-sm font-bold pb-2 transition-colors relative ${
                activeTab === "warranty"
                  ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Chính sách bảo hành
            </button>
            <button
              onClick={() => setActiveTab("guide")}
              className={`text-sm font-bold pb-2 transition-colors relative ${
                activeTab === "guide"
                  ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Hướng dẫn kích hoạt
            </button>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed">
            {activeTab === "desc" && (
              <div className="space-y-3 whitespace-pre-line text-slate-700">
                {product.description}
              </div>
            )}

            {activeTab === "warranty" && (
              <div className="space-y-3 text-slate-700">
                <h4 className="font-bold text-sm text-slate-900">
                  Cam kết bảo hành của BestApp.vn
                </h4>
                <p>
                  - Tất cả sản phẩm số đều được bảo hành <b>1-đổi-1</b> trong suốt thời gian sử dụng tương ứng của gói.
                </p>
                <p>
                  - Hỗ trợ đổi tài khoản mới hoặc fix lỗi nhanh chóng qua Zalo kỹ thuật trong vòng 5-15 phút.
                </p>
                <p>
                  - Hoàn tiền 100% nếu phát sinh lỗi không thể khắc phục từ phía nhà cung cấp.
                </p>
              </div>
            )}

            {activeTab === "guide" && (
              <div className="space-y-3 text-slate-700">
                <h4 className="font-bold text-sm text-slate-900">
                  Quy trình nhận và sử dụng sản phẩm
                </h4>
                <ol className="list-decimal list-inside space-y-1.5">
                  <li>Thanh toán đơn hàng qua quét mã QR SePay tự động.</li>
                  <li>Nhận mã License Key hoặc Thông tin tài khoản (User/Pass) ngay trên màn hình và gửi qua Email.</li>
                  <li>Làm theo thông tin được cung cấp để đăng nhập hoặc nhập key vào phần mềm.</li>
                  <li>Nếu cần hỗ trợ, bấm nút Chat Zalo hoặc liên hệ Hotline 0988.123.456.</li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
