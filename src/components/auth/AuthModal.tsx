"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  X,
  Printer,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  UserPlus,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  callbackUrl?: string;
}

export function AuthModal({
  isOpen,
  onClose,
  title = "Đăng Ký Miễn Phí Để Kết Nối Với Xưởng In 3D",
  description = "Tạo tài khoản chỉ trong 30 giây để gửi yêu cầu in đến 10 xưởng gần nhất, chat trực tiếp và thanh toán Escrow an toàn.",
  callbackUrl = "/customer/projects/new",
}: AuthModalProps) {
  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const registerHref = `/account/register?callbackUrl=${encodeURIComponent(callbackUrl)}`;
  const loginHref = `/account/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-2xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Title */}
        <div className="text-center space-y-3 pt-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-2xl mx-auto shadow-xl shadow-blue-500/25">
            <Printer className="w-7 h-7" />
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
            {title}
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
            {description}
          </p>
        </div>

        {/* Perks Box */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2.5 text-xs text-slate-300">
          <div className="flex items-center space-x-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Cam kết bảo mật 100% bản quyền file 3D (Thoả thuận NDA)</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Tự động kết nối 10 xưởng lân cận đang rảnh máy trong 10 giây</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <Lock className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Bảo vệ quỹ Escrow: Chỉ giải ngân khi kiểm tra hàng hài lòng</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-2.5 pt-2">
          <Link href={registerHref} className="block">
            <Button className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black rounded-xl h-12 text-xs shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2">
              <UserPlus className="w-4 h-4" />
              <span>Đăng Ký Tài Khoản Miễn Phí</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <Link href={loginHref} className="block">
            <Button
              variant="outline"
              className="w-full border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-bold rounded-xl h-12 text-xs"
            >
              <LogIn className="w-4 h-4 mr-1.5 text-blue-400" />
              <span>Đã có tài khoản? Đăng nhập ngay</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
