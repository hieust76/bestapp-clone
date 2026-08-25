import Link from "next/link";
import { Sparkles, Zap, ShieldCheck, ArrowRight, Bot, Palette, Laptop, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-slate-50/50 py-10 md:py-16 border-b border-slate-200/60">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-purple-400/10 blur-3xl -z-10 pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
              <span>Nền Tảng Sản Phẩm Số Tự Động Hàng Đầu</span>
              <Badge variant="discount" className="text-[10px] py-0 px-1.5">
                MỚI
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
              Mua Tài Khoản <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">AI & Bản Quyền Phần Mềm</span> Tự Động 24/7
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Nhận tài khoản & key bản quyền trong <b>1 phút</b> qua hệ thống cấp phát tự động. Bảo hành full time 1-đổi-1, tiết kiệm đến <b>80%</b> so với mua trực tiếp.
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs">
              <span className="text-slate-500 font-medium">Xu hướng:</span>
              <Link href="/product/chatgpt-plus" className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-colors font-medium text-slate-700 shadow-sm">
                ChatGPT Plus
              </Link>
              <Link href="/product/canva-pro" className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-colors font-medium text-slate-700 shadow-sm">
                Canva Pro
              </Link>
              <Link href="/product/claude-pro" className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-colors font-medium text-slate-700 shadow-sm">
                Claude 3.5 Pro
              </Link>
              <Link href="/product/windows-11-pro" className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-colors font-medium text-slate-700 shadow-sm">
                Key Windows 11
              </Link>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link href="/categories" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg shadow-blue-500/25 font-bold">
                  <span>Khám phá sản phẩm</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/flash-sale" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-xl border-orange-200 hover:bg-orange-50/60 text-orange-600 font-bold">
                  <Zap className="w-4 h-4 mr-2 fill-orange-500 text-orange-500" />
                  <span>Săn Flash Sale -70%</span>
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-200/80 max-w-lg mx-auto lg:mx-0 text-slate-600 text-xs">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">Giao dịch 24/7</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-semibold">Bảo hành 1-1</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-semibold">SePay QR 1s</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card (Simulation of Instant Order) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              {/* Outer decorative card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl blur opacity-25" />
              
              <div className="relative bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 space-y-4">
                {/* Header of card */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                      Hệ Thống Cấp Phát Tự Động
                    </span>
                  </div>
                  <Badge variant="success" className="text-[10px]">
                    Sẵn sàng 24/7
                  </Badge>
                </div>

                {/* Simulated Order Items in Queue */}
                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:bg-blue-50/40 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-800">ChatGPT Plus (1 Tháng)</h5>
                        <p className="text-[11px] text-slate-500">Tài khoản riêng chính chủ</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-blue-600 block">189.000đ</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">Giao 10s</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:bg-blue-50/40 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                        <Palette className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-800">Canva Pro Nâng Cấp Email</h5>
                        <p className="text-[11px] text-slate-500">Bản quyền 1 Năm</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-blue-600 block">150.000đ</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">Giao 5s</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:bg-blue-50/40 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                        <Laptop className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-800">Key Windows 11 Pro</h5>
                        <p className="text-[11px] text-slate-500">Kích hoạt vĩnh viễn</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-blue-600 block">99.000đ</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">Key tự động</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Guarantee note */}
                <div className="pt-2">
                  <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-100 text-center">
                    <span className="text-xs font-semibold text-blue-800 flex items-center justify-center">
                      <Zap className="w-3.5 h-3.5 mr-1 text-blue-600 fill-blue-600" />
                      Quét mã QR SePay - Nhận thông tin tức thì qua Email & Màn hình
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
