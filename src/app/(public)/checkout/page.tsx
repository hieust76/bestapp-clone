"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  User,
  Phone,
  QrCode,
  ShieldCheck,
  Zap,
  ArrowRight,
  Loader2,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/cart-store";
import { formatVND } from "@/lib/utils";
import { createOrderAction } from "@/actions/order-actions";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, couponCode, discountAmount, getSubtotal, getTotal, clearCart } =
    useCartStore();

  const [email, setEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const subtotal = getSubtotal();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] bg-slate-50 flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 text-center shadow-sm">
          <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-900">Giỏ hàng của bạn đang trống</h2>
          <p className="text-xs text-slate-500 mt-2 mb-6">
            Vui lòng chọn ít nhất một sản phẩm trước khi tiến hành thanh toán.
          </p>
          <Link href="/shop">
            <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-sm h-11">
              Xem sản phẩm
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes("@")) {
      setError("Vui lòng nhập địa chỉ email nhận hàng hợp lệ.");
      return;
    }

    if (!agreeTerms) {
      setError("Vui lòng đồng ý với Điều khoản dịch vụ và Chính sách bảo hành.");
      return;
    }

    startTransition(async () => {
      try {
        const payload = {
          email,
          customerName: customerName || undefined,
          customerPhone: customerPhone || undefined,
          couponCode: couponCode || undefined,
          notes: notes || undefined,
          items: items.map((i) => ({
            productId: i.productId,
            variantId: i.variantId,
            name: i.name,
            variantName: i.variantName,
            price: i.price,
            quantity: i.quantity,
            deliveryType: i.deliveryType,
            durationDays: i.durationDays,
            upgradeEmail: i.upgradeEmail,
          })),
        };

        const res = await createOrderAction(payload);

        if (res.success && res.orderCode) {
          clearCart();
          router.push(`/orders/payment/${res.orderCode}`);
        } else {
          setError(res.error || "Không thể khởi tạo đơn hàng. Vui lòng thử lại.");
        }
      } catch (err: any) {
        setError(err.message || "Đã xảy ra lỗi kết nối.");
      }
    });
  };

  return (
    <div className="bg-slate-50/60 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-8">
          Thanh Toán & Nhận Hàng Tự Động
        </h1>

        <form onSubmit={handleCheckout}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Customer Form & Payment Method */}
            <div className="lg:col-span-7 space-y-6">
              {/* Customer info card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <h2 className="font-bold text-sm text-slate-900">
                    Thông Tin Nhận Sản Phẩm (Bắt buộc)
                  </h2>
                </div>

                {error && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Địa chỉ Email nhận Key / Tài khoản <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email-nhan-hang@gmail.com"
                      className="pl-10 h-11 text-sm rounded-xl"
                      disabled={isPending}
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Key bản quyền và thông tin đăng nhập sẽ được gửi tức thì về email này.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Họ và tên (tuỳ chọn)
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className="pl-10 h-11 text-sm rounded-xl"
                        disabled={isPending}
                      />
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Số điện thoại / Zalo (tuỳ chọn)
                    </label>
                    <div className="relative">
                      <Input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="0988123456"
                        className="pl-10 h-11 text-sm rounded-xl"
                        disabled={isPending}
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Ghi chú đơn hàng (tuỳ chọn)
                  </label>
                  <Input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ghi chú thêm về yêu cầu cài đặt..."
                    className="h-11 text-sm rounded-xl"
                    disabled={isPending}
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                  <QrCode className="w-4 h-4 text-blue-600" />
                  <h2 className="font-bold text-sm text-slate-900">
                    Phương Thức Thanh Toán
                  </h2>
                </div>

                <div className="p-4 rounded-2xl border-2 border-blue-600 bg-blue-50/40 flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900">
                        Chuyển Khoản Ngân Hàng Quét Mã QR (SePay)
                      </span>
                      <Badge variant="success" className="text-[10px]">
                        Tự động 24/7
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Mở app ngân hàng bất kỳ (Vietcombank, MB, Techcombank, VPBank, TPBank...) quét mã QR để thanh toán và nhận key tức thì trong 1 phút.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Place Order */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
                  Đơn Hàng ({items.length} sản phẩm)
                </h3>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div
                      key={item.variantId}
                      className="flex justify-between items-start text-xs border-b border-slate-50 pb-2.5"
                    >
                      <div>
                        <p className="font-bold text-slate-900">{item.name}</p>
                        <p className="text-slate-500">
                          {item.variantName} x {item.quantity}
                        </p>
                        {item.upgradeEmail && (
                          <p className="text-amber-700 text-[11px]">
                            Mail: {item.upgradeEmail}
                          </p>
                        )}
                      </div>
                      <span className="font-bold text-slate-800">
                        {formatVND(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span className="font-semibold text-slate-900">{formatVND(subtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Mã giảm giá ({couponCode}):</span>
                      <span>-{formatVND(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Cấp phát tự động 24/7:</span>
                    <span className="font-bold text-emerald-600">0đ (Miễn phí)</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                  <span className="font-bold text-sm text-slate-900">Tổng tiền cần chuyển:</span>
                  <span className="text-2xl font-black text-blue-600">
                    {formatVND(total)}
                  </span>
                </div>

                {/* Terms agreement checkbox */}
                <div className="pt-2">
                  <label className="flex items-start space-x-2 text-[11px] text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>
                      Tôi đồng ý với <b>Điều khoản sử dụng</b> và chính sách bảo hành 1-đổi-1 của BestApp.vn
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm shadow-lg shadow-blue-500/25"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <span>Đang khởi tạo đơn hàng...</span>
                    </>
                  ) : (
                    <>
                      <span>Tạo Đơn & Quét Mã QR Thanh Toán</span>
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400 pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Bảo mật SePay Idempotent Webhook 256-bit</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
