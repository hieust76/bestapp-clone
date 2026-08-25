import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center space-x-2.5 mb-4 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20">
            B
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900">
            BestApp<span className="text-blue-600">.vn</span>
          </span>
        </Link>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Đăng nhập tài khoản
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Quản lý lịch sử đơn hàng và tài khoản sản phẩm số của bạn
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-2xl sm:px-8 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Email đăng nhập
            </label>
            <div className="relative">
              <Input
                type="email"
                placeholder="tenban@gmail.com"
                className="pl-9"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Mật khẩu
              </label>
              <a href="#" className="text-xs font-semibold text-blue-600 hover:underline">
                Quên mật khẩu?
              </a>
            </div>
            <div className="relative">
              <Input
                type="password"
                placeholder="••••••••"
                className="pl-9"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold rounded-xl h-11 shadow-md shadow-blue-500/20">
            <span>Đăng nhập</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>

          <div className="pt-2 text-center text-xs text-slate-600">
            Chưa có tài khoản?{" "}
            <Link href="/register" className="font-bold text-blue-600 hover:underline">
              Đăng ký ngay
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-center text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-500" />
            <span>Bảo mật dữ liệu chuẩn mã hoá 256-bit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
