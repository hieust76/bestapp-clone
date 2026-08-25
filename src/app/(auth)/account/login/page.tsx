"use client";

import Link from "next/link";
import { useState, useTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res?.error) {
          setError("Email hoặc mật khẩu không chính xác. Vui lòng thử lại.");
        } else {
          router.push(callbackUrl);
          router.refresh();
        }
      } catch (err: any) {
        setError("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
      }
    });
  };

  return (
    <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 border border-slate-200/90 rounded-3xl sm:px-8 space-y-5">
      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Email đăng nhập
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

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Mật khẩu
            </label>
            <Link
              href="/account/reset-password"
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <div className="relative">
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-10 h-11 text-sm rounded-xl"
              disabled={isPending}
            />
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl h-11 shadow-md shadow-blue-500/20 text-sm"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              <span>Đang xác thực...</span>
            </>
          ) : (
            <>
              <span>Đăng nhập ngay</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </>
          )}
        </Button>
      </form>

      {/* Quick Mock Credentials hint for testing */}
      <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-[11px] text-slate-600 space-y-1">
        <span className="font-bold text-slate-800 block">Tài khoản thử nghiệm:</span>
        <div className="flex justify-between">
          <span>Admin: <code className="bg-slate-200 px-1 rounded">admin@bestapp.vn</code></span>
          <span>Pass: <code className="bg-slate-200 px-1 rounded">Admin@123</code></span>
        </div>
      </div>

      <div className="pt-2 text-center text-xs text-slate-600">
        Chưa có tài khoản?{" "}
        <Link
          href="/account/register"
          className="font-bold text-blue-600 hover:underline"
        >
          Đăng ký tài khoản mới
        </Link>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-center text-[11px] text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
        <span>Xác thực an toàn với Session Cookie HttpOnly</span>
      </div>
    </div>
  );
}

export default function AccountLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/40 via-white to-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center space-x-2.5 mb-5 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            B
          </div>
          <div className="flex flex-col text-left">
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">
              BestApp<span className="text-blue-600">.vn</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              Nền tảng sản phẩm số 24/7
            </span>
          </div>
        </Link>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Đăng Nhập Tài Khoản
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Truy cập kho key, tài khoản đã mua và quản lý đơn hàng tự động
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <Suspense fallback={<div className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600" /></div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
