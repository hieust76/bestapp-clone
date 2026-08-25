"use client";

import Link from "next/link";
import { useState, useTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Loader2, Printer, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const isRegistered = searchParams.get("registered") === "true";

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
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-xs">
      {isRegistered && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Đăng ký thành công! Hãy đăng nhập vào tài khoản của bạn.</span>
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block font-bold text-slate-300 mb-1.5">
            Email đăng nhập
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

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block font-bold text-slate-300">
              Mật khẩu
            </label>
            <Link
              href="/account/reset-password"
              className="text-xs font-semibold text-blue-400 hover:underline"
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
              className="bg-slate-950 border-slate-800 text-white pl-9 h-11 text-xs rounded-xl"
              disabled={isPending}
            />
            <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl h-11 shadow-lg shadow-blue-500/25 text-xs"
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

      {/* Demo Credentials hint for testing */}
      <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-2xl text-[11px] text-slate-400 space-y-1.5">
        <span className="font-bold text-slate-300 block">Tài khoản thử nghiệm:</span>
        <div className="flex justify-between items-center">
          <span>Xưởng in: <code className="text-blue-400 bg-slate-900 px-1 py-0.5 rounded">contact@3dhubsaigon.vn</code></span>
          <span>Pass: <code className="text-slate-300 bg-slate-900 px-1 py-0.5 rounded">User@123</code></span>
        </div>
        <div className="flex justify-between items-center">
          <span>Khách hàng: <code className="text-blue-400 bg-slate-900 px-1 py-0.5 rounded">khachhang1@gmail.com</code></span>
          <span>Pass: <code className="text-slate-300 bg-slate-900 px-1 py-0.5 rounded">User@123</code></span>
        </div>
      </div>

      <div className="pt-2 text-center text-xs text-slate-400">
        Chưa có tài khoản?{" "}
        <Link
          href="/account/register"
          className="font-bold text-blue-400 hover:underline"
        >
          Đăng ký tài khoản mới
        </Link>
      </div>

      <div className="pt-3 border-t border-slate-800 flex items-center justify-center text-[11px] text-slate-500">
        <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
        <span>Xác thực an toàn với Session Cookie HttpOnly</span>
      </div>
    </div>
  );
}

export default function AccountLoginPage() {
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
          Đăng Nhập Tài Khoản
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Truy cập hệ thống quản lý dự án in 3D và kênh Xưởng in
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <Suspense fallback={<div className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-400" /></div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
