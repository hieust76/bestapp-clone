"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Mail, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestPasswordResetAction } from "@/actions/auth-actions";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("email", email);

    startTransition(async () => {
      const res = await requestPasswordResetAction(null, formData);
      if (res.success) {
        setSuccess(res.message || "Đã gửi email khôi phục!");
      } else {
        setError(res.error || "Gửi yêu cầu thất bại");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/40 via-white to-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center space-x-2.5 mb-5 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20">
            B
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900">
            BestApp<span className="text-blue-600">.vn</span>
          </span>
        </Link>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Khôi Phục Mật Khẩu
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Nhập địa chỉ email của bạn để nhận liên kết đặt lại mật khẩu mới
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 border border-slate-200/90 rounded-3xl sm:px-8 space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email tài khoản của bạn
              </label>
              <div className="relative">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="pl-10 h-11 text-sm rounded-xl"
                  disabled={isPending}
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl h-11 shadow-md shadow-blue-500/20 text-sm"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  <span>Đang gửi...</span>
                </>
              ) : (
                <>
                  <span>Gửi liên kết khôi phục</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </>
              )}
            </Button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-600">
            <Link
              href="/account/login"
              className="inline-flex items-center font-bold text-blue-600 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>Quay lại trang Đăng nhập</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-center text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
            <span>Mã bảo mật có hiệu lực trong 60 phút</span>
          </div>
        </div>
      </div>
    </div>
  );
}
