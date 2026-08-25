"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  QrCode,
  Copy,
  Check,
  Clock,
  Zap,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ShoppingBag,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatVND } from "@/lib/utils";
import { simulatePaymentSuccessAction } from "@/actions/order-actions";

export function PaymentView({
  orderCode,
  finalAmount,
  paymentRef,
  expiresAtIso,
}: {
  orderCode: string;
  finalAmount: number;
  paymentRef: string;
  expiresAtIso: string;
}) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30 * 60);
  const [paymentStatus, setPaymentStatus] = useState<"PENDING" | "PAID" | "EXPIRED">("PENDING");
  const [isSimulating, setIsSimulating] = useState(false);
  const [deliveredData, setDeliveredData] = useState<string | null>(null);

  // Bank Info (SePay-style)
  const bankInfo = {
    bankName: "MBBank (Ngân hàng Quân Đội)",
    bankCode: "MB",
    accountNumber: "10287654321",
    accountName: "BESTAPP DIGITAL",
  };

  // VietQR QuickLink API
  const qrUrl = `https://img.vietqr.io/image/${bankInfo.bankCode}-${bankInfo.accountNumber}-compact2.png?amount=${finalAmount}&addInfo=${encodeURIComponent(
    paymentRef
  )}&accountName=${encodeURIComponent(bankInfo.accountName)}`;

  // Countdown timer 30m
  useEffect(() => {
    const expireTime = new Date(expiresAtIso).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.floor((expireTime - now) / 1000);

      if (diff <= 0) {
        setSecondsRemaining(0);
        if (paymentStatus === "PENDING") {
          setPaymentStatus("EXPIRED");
        }
        clearInterval(interval);
      } else {
        setSecondsRemaining(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAtIso, paymentStatus]);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // Test Handler: Simulate SePay Webhook Auto-Delivery
  const handleSimulatePayment = async () => {
    setIsSimulating(true);
    try {
      const res = await simulatePaymentSuccessAction(orderCode);
      if (res.success) {
        setPaymentStatus("PAID");
        setDeliveredData(
          `Tài khoản / Key: bestapp_user_${Math.floor(1000 + Math.random() * 9000)}@digital.pro | Pass: BestApp@${Math.floor(
            1000 + Math.random() * 9000
          )}`
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="bg-slate-50/60 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center max-w-lg mx-auto mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Hệ Thống Thanh Toán Tự Động SePay 24/7</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {paymentStatus === "PAID"
              ? "Thanh Toán Thành Công!"
              : "Quét Mã QR Chuyển Khoản"}
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            Mã đơn hàng: <b className="text-slate-800">{orderCode}</b>
          </p>
        </div>

        {paymentStatus === "PAID" ? (
          /* SUCCESS STATE: Display Delivered Key/Account */
          <div className="bg-white rounded-3xl p-8 border border-emerald-200 shadow-xl shadow-emerald-500/10 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-900">
                Giao Dịch Đã Hoàn Tất
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Hệ thống đã tự động cấp phát key / tài khoản theo đơn hàng của bạn.
              </p>
            </div>

            {/* Delivered Credentials Box */}
            <div className="p-5 bg-slate-900 text-left rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-amber-400">THÔNG TIN BÀN GIAO SẢN PHẨM:</span>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(deliveredData || orderCode, "credentials")
                  }
                  className="text-xs text-blue-400 hover:text-white flex items-center"
                >
                  {copiedField === "credentials" ? (
                    <Check className="w-3.5 h-3.5 mr-1" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 mr-1" />
                  )}
                  <span>Sao chép</span>
                </button>
              </div>

              <p className="font-mono text-sm text-emerald-400 font-bold break-all">
                {deliveredData || `KEY-BESTAPP-${orderCode}-AUTODELIVERED`}
              </p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-800 text-left space-y-1">
              <p className="font-bold">Hướng dẫn sau khi nhận:</p>
              <p>- Vui lòng lưu lại thông tin trên hoặc kiểm tra hòm thư Email của bạn.</p>
              <p>- Mọi thắc mắc và hỗ trợ kỹ thuật bảo hành 1-đổi-1, liên hệ Zalo 0988.123.456.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link href={`/orders/track?code=${orderCode}`}>
                <Button className="w-full sm:w-auto rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-xs h-11 px-6">
                  <span>Xem chi tiết & tra cứu đơn</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="/shop">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto rounded-xl border-slate-300 text-slate-800 font-bold text-xs h-11 px-6"
                >
                  Tiếp tục mua hàng
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* PENDING PAYMENT STATE */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: QR Code Box */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center space-y-4">
              <div className="flex items-center justify-center space-x-2 text-xs font-bold text-orange-600 bg-orange-50 py-1.5 px-3 rounded-full mx-auto w-fit">
                <Clock className="w-3.5 h-3.5" />
                <span>Hết hạn trong: {formatTimer(secondsRemaining)}</span>
              </div>

              {/* QR Image */}
              <div className="relative w-64 h-64 mx-auto p-2 border-2 border-dashed border-blue-300 rounded-2xl bg-white flex items-center justify-center">
                <img
                  src={qrUrl}
                  alt={`Mã QR Thanh Toán ${paymentRef}`}
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>

              <div className="text-xs text-slate-500 leading-snug">
                Mở App ngân hàng bất kỳ để <b>Quét mã QR</b>. Số tiền và nội dung sẽ được điền tự động chính xác 100%.
              </div>

              {/* Dev Simulation Button */}
              <div className="pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSimulatePayment}
                  disabled={isSimulating}
                  className="w-full rounded-xl border-emerald-300 bg-emerald-50/60 hover:bg-emerald-100 text-emerald-800 text-xs font-bold h-10"
                >
                  {isSimulating ? (
                    <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  ) : (
                    <Zap className="w-3.5 h-3.5 mr-1.5 text-emerald-600 fill-emerald-600" />
                  )}
                  <span>[Test Demo] Giả Lập Đã Chuyển Tiền Thành Công</span>
                </Button>
              </div>
            </div>

            {/* Right: Transfer Information Details */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
                <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
                  Thông Tin Chuyển Khoản Thủ Công
                </h3>

                {/* Amount */}
                <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-blue-900 uppercase">
                      Số tiền cần chuyển chính xác:
                    </span>
                    <p className="text-2xl font-black text-blue-600">
                      {formatVND(finalAmount)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(String(finalAmount), "amount")}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-xl transition-colors"
                    title="Sao chép số tiền"
                  >
                    {copiedField === "amount" ? (
                      <Check className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Transfer Content (paymentRef) */}
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-amber-900 uppercase">
                      Nội dung chuyển khoản (BẮT BUỘC ĐÚNG):
                    </span>
                    <p className="font-mono text-xl font-black text-amber-900">
                      {paymentRef}
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => copyToClipboard(paymentRef, "ref")}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl"
                  >
                    {copiedField === "ref" ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1" /> Đã chép
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 mr-1" /> Sao chép
                      </>
                    )}
                  </Button>
                </div>

                {/* Bank Account Info Table */}
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-500">Ngân hàng:</span>
                    <span className="font-bold text-slate-900">{bankInfo.bankName}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-500">Số tài khoản:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-slate-900 text-sm">
                        {bankInfo.accountNumber}
                      </span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(bankInfo.accountNumber, "acc")}
                        className="text-blue-600 hover:underline"
                      >
                        {copiedField === "acc" ? "Đã chép" : "Chép"}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-500">Chủ tài khoản:</span>
                    <span className="font-bold text-slate-900">{bankInfo.accountName}</span>
                  </div>
                </div>

                {/* Important notice */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 space-y-1">
                  <p className="font-bold text-slate-800">Lưu ý quan trọng:</p>
                  <p>- Vui lòng ghi chính xác nội dung chuyển khoản <b>{paymentRef}</b> để hệ thống tự động kích hoạt key ngay lập tức.</p>
                  <p>- Sau khi chuyển khoản thành công, màn hình sẽ tự động cập nhật trong vòng 30 - 60 giây.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
