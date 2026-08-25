"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Mail, ArrowRight, ShieldCheck, AlertCircle, Loader2, CheckCircle2, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestPasswordResetAction } from "@/actions/auth-actions";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const formData = new FormData();
    formData.append("email", email);

    startTransition(async () => {
      const res = await requestPasswordResetAction(formData);
      if (res.success) {
        setSuccessMsg(res.message || "Đã gửi liên kết khôi phục mật khẩu về email của bạn.");
      } else {
        setError(res.error || "Không thể thực hiện yêu cầu.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center space-x-2.5 mb-5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Printer className="w-5 h-5" />
          </div>
          <span className="font-black text-2xl tracking-tight text-white">
            In3D<span className="text-blue-400">Hub</span>.vn
          </span>
        </Link>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Khôi Phục Mật Khẩu
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Nhập email đăng ký để nhận mã xác thực đặt lại mật khẩu
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          {successMsg ? (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4 text-xs">
              {error && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-300 mb-1.5">
                  Email đăng ký
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="bg-slate-950 border-slate-800 text-white pl-9 h-11 text-xs rounded-xl"
                    disabled={isPending}
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl h-11 text-xs shadow-lg shadow-blue-500/25"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    <span>Đang gửi mã...</span>
                  </>
                ) : (
                  <span>Gửi liên kết khôi phục</span>
                )}
              </Button>
            </form>
          )}

          <div className="pt-2 text-center text-xs text-slate-400">
            Nhớ lại mật khẩu?{" "}
            <Link href="/account/login" className="font-bold text-blue-400 hover:underline">
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
