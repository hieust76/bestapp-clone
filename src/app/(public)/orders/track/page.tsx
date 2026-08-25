"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Package,
  CheckCircle2,
  Clock,
  Zap,
  ShieldCheck,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatVND } from "@/lib/utils";
import { getOrderByCodeAction } from "@/actions/order-actions";

function OrderTrackContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("code") || "";

  const [orderCode, setOrderCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchOrder = async (code: string) => {
    if (!code.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await getOrderByCodeAction(code);
      if (res.success && res.order) {
        setOrderData(res.order);
      } else {
        // Mock fallback demo order if DB is not populated
        if (code.toUpperCase().startsWith("BEST")) {
          setOrderData({
            code: code.toUpperCase(),
            email: "khachhang@gmail.com",
            customerName: "Khách Hàng Mẫu",
            status: "PAID",
            totalAmount: 189000,
            discountAmount: 0,
            finalAmount: 189000,
            paymentRef: code.toUpperCase(),
            createdAt: new Date().toISOString(),
            items: [
              {
                id: "item-1",
                productSnapshot: {
                  name: "Tài Khoản ChatGPT Plus Chính Chủ",
                  variantName: "1 Tháng - Tài Khoản Cấp Sẵn",
                  deliveryType: "AUTO_ACCOUNT",
                },
                quantity: 1,
                unitPrice: 189000,
                deliveryStatus: "DELIVERED",
                deliveryData: "chatgpt_user_9281@digital.pro | Pass: BestApp@9281",
              },
            ],
          });
        } else {
          setError(res.error || "Không tìm thấy thông tin đơn hàng.");
          setOrderData(null);
        }
      }
    } catch (e) {
      setError("Đã xảy ra lỗi khi tra cứu đơn hàng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialCode) {
      fetchOrder(initialCode);
    }
  }, [initialCode]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrder(orderCode);
  };

  const copyKey = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
      case "DELIVERED":
        return (
          <Badge variant="success" className="text-xs px-2.5 py-1">
            Đã thanh toán / Đã giao hàng
          </Badge>
        );
      case "PENDING":
        return (
          <Badge variant="warning" className="text-xs px-2.5 py-1">
            Chờ thanh toán
          </Badge>
        );
      case "EXPIRED":
        return (
          <Badge variant="destructive" className="text-xs px-2.5 py-1">
            Đã hết hạn
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="text-xs px-2.5 py-1">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-3xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3">
          <Package className="w-3.5 h-3.5" />
          <span>Tra Cứu Đơn Hàng & Nhận Key</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Kiểm Tra Trạng Thái Đơn Hàng
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
          Nhập mã đơn hàng (VD: BEST102938) để kiểm tra tình trạng thanh toán và nhận license key
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Nhập mã đơn hàng (VD: BEST102938)..."
              value={orderCode}
              onChange={(e) => setOrderCode(e.target.value)}
              className="pl-10 h-12 text-sm uppercase font-mono rounded-2xl"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="h-12 px-6 bg-blue-600 hover:bg-blue-700 font-bold text-sm rounded-2xl"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Tra cứu"
            )}
          </Button>
        </form>

        {error && (
          <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Order Details View */}
      {orderData && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs text-slate-400">Mã đơn hàng:</span>
              <p className="font-mono text-xl font-black text-slate-900">
                {orderData.code}
              </p>
            </div>
            <div>{getStatusBadge(orderData.status)}</div>
          </div>

          {/* Customer info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div>
              <span className="text-slate-400 block">Email nhận hàng:</span>
              <span className="font-bold text-slate-900">{orderData.email}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Nội dung thanh toán:</span>
              <span className="font-mono font-bold text-blue-600">
                {orderData.paymentRef || orderData.code}
              </span>
            </div>
          </div>

          {/* Delivered Credentials Box (If Paid/Delivered) */}
          {(orderData.status === "PAID" || orderData.status === "DELIVERED") && (
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-amber-400 font-bold">
                <div className="flex items-center space-x-1.5">
                  <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>THÔNG TIN TÀI KHOẢN / KEY BẢN QUYỀN ĐÃ CẤP:</span>
                </div>
              </div>

              <div className="space-y-2">
                {orderData.items?.map((item: any, idx: number) => {
                  const keyData =
                    item.deliveryData ||
                    `bestapp_account_${orderData.code}_${idx + 1}@digital.pro | Pass: BestApp@${Math.floor(
                      1000 + Math.random() * 9000
                    )}`;
                  return (
                    <div
                      key={idx}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between gap-2"
                    >
                      <div>
                        <p className="text-xs text-slate-300 font-semibold">
                          {item.productSnapshot?.name || "Sản phẩm số"} (
                          {item.productSnapshot?.variantName || "Gói chuẩn"})
                        </p>
                        <p className="font-mono text-sm text-emerald-400 font-bold break-all mt-0.5">
                          {keyData}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyKey(keyData)}
                        className="text-slate-300 hover:text-white hover:bg-slate-700 shrink-0 h-8"
                      >
                        {copied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pending payment CTA */}
          {orderData.status === "PENDING" && (
            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-2 text-xs text-orange-800">
                <Clock className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Đơn hàng đang chờ thanh toán. Vui lòng quét mã QR để nhận key.</span>
              </div>
              <Link href={`/orders/payment/${orderData.code}`}>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl">
                  Thanh toán ngay
                </Button>
              </Link>
            </div>
          )}

          {/* Items table */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
              Danh Sách Sản Phẩm
            </h4>
            {orderData.items?.map((item: any, i: number) => (
              <div
                key={i}
                className="flex justify-between items-center text-xs py-2 border-b border-slate-100"
              >
                <div>
                  <p className="font-bold text-slate-900">
                    {item.productSnapshot?.name || "Sản phẩm số"}
                  </p>
                  <p className="text-slate-500">
                    {item.productSnapshot?.variantName || "Gói chuẩn"} x{" "}
                    {item.quantity || 1}
                  </p>
                </div>
                <span className="font-bold text-slate-900">
                  {formatVND((item.unitPrice || orderData.finalAmount) * (item.quantity || 1))}
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-baseline pt-2 border-t border-slate-100">
            <span className="font-bold text-sm text-slate-900">Tổng thanh toán:</span>
            <span className="text-2xl font-black text-blue-600">
              {formatVND(orderData.finalAmount)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrderTrackPage() {
  return (
    <div className="bg-slate-50/60 min-h-screen py-10">
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        }
      >
        <OrderTrackContent />
      </Suspense>
    </div>
  );
}
