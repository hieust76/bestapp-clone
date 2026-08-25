import Link from "next/link";
import Image from "next/image";
import {
  Printer,
  Upload,
  Zap,
  ShieldCheck,
  MapPin,
  Star,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  FileCode,
  Users,
  Building2,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPrintersDirectoryAction } from "@/actions/printer-actions";

export const dynamic = "force-dynamic";

export default async function HomePage3D() {
  const directoryRes = await getPrintersDirectoryAction();
  const printers = directoryRes.printers.slice(0, 6);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800">
        {/* Background glow gradient */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/20 to-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-bold shadow-inner">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nền tảng Two-Sided Marketplace In 3D Đầu Tiên Tại Việt Nam</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight sm:leading-none">
              Kết Nối <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">10 Xưởng In 3D Gần Bạn Nhất</span> Trong 10 Giây
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Bạn có file 3D (STL/OBJ) cần in? Hệ thống tự động quét tọa độ địa lý, tìm 10 Xưởng &amp; Cá nhân đang rảnh máy gần bạn, báo giá tức thì và giữ tiền thanh toán Escrow an toàn 100%.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <Link href="/customer/projects/new" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black text-sm h-13 px-8 rounded-2xl shadow-xl shadow-blue-500/25 flex items-center justify-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Tải File 3D &amp; Tạo Dự Án Ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <Link href="/printers" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-sm font-bold h-13 px-6 rounded-2xl">
                  <Building2 className="w-4 h-4 mr-2 text-blue-400" />
                  <span>Xem Danh Bạ Xưởng In</span>
                </Button>
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>+450 Máy in FDM &amp; Resin</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Nhận phản hồi &lt; 15 phút</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Bảo hiểm Escrow 100%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (4 BƯỚC HOẠT ĐỘNG) */}
      <section className="py-16 bg-slate-900/50 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Quy Trình Đặt In 3D Thông Minh
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Đơn giản hoá hoàn toàn việc tạo mẫu 3D từ ý tưởng đến tay bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl relative hover:border-blue-500/40 transition-colors">
              <span className="absolute -top-3.5 left-6 bg-blue-600 text-white font-black text-xs px-3 py-1 rounded-full">
                Bước 1
              </span>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 mt-2">
                <FileCode className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base">Đăng Yêu Cầu &amp; File 3D</h3>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                Tải lên file STL/OBJ/3MF, chọn vật liệu (PLA, ABS, Resin, TPU) và ngân sách mong muốn.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl relative hover:border-blue-500/40 transition-colors">
              <span className="absolute -top-3.5 left-6 bg-indigo-600 text-white font-black text-xs px-3 py-1 rounded-full">
                Bước 2
              </span>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 mt-2">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base">Phát Đơn Đến 10 Xưởng Gần Nhất</h3>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                Hệ thống tự động tính khoảng cách km và gửi thông báo đến 10 bên đang rảnh máy.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl relative hover:border-blue-500/40 transition-colors">
              <span className="absolute -top-3.5 left-6 bg-purple-600 text-white font-black text-xs px-3 py-1 rounded-full">
                Bước 3
              </span>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 mt-2">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base">Ký Hợp Đồng &amp; Escrow</h3>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                Xưởng nhận đơn trao đổi trực tiếp, chốt hợp đồng điện tử. Khách thanh toán giữ tiền an toàn.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl relative hover:border-blue-500/40 transition-colors">
              <span className="absolute -top-3.5 left-6 bg-emerald-600 text-white font-black text-xs px-3 py-1 rounded-full">
                Bước 4
              </span>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 mt-2">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base">Sản Xuất &amp; Nhận Hàng</h3>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                Xưởng in và giao hàng. Khách kiểm tra chất lượng hài lòng &rarr; Tiền mới được giải ngân.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED WORKSHOPS & INDIVIDUAL PRINTERS (TopCV STYLE) */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold mb-2">
                <Building2 className="w-3.5 h-3.5" />
                <span>Danh Bạ Đối Tác In 3D Uy Tín</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Xưởng In &amp; Cá Nhân Đang Sẵn Sàng Nhận Đơn
              </h2>
            </div>
            <Link
              href="/printers"
              className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center"
            >
              <span>Xem tất cả danh bạ</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {printers.map((p: any) => (
              <div
                key={p.id}
                className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group shadow-lg shadow-black/20"
              >
                <div className="space-y-4">
                  {/* Top info */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-base shadow-md">
                        {p.user?.role === "WORKSHOP" ? <Building2 className="w-6 h-6" /> : <Printer className="w-6 h-6" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors line-clamp-1">
                          {p.businessName}
                        </h3>
                        <p className="text-[11px] text-slate-400 flex items-center mt-0.5">
                          <MapPin className="w-3 h-3 mr-1 text-slate-500 shrink-0" />
                          <span>{p.district}, {p.province}</span>
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-[10px] px-2 py-0.5 shrink-0"
                    >
                      ● Đang rảnh
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {p.bio}
                  </p>

                  {/* Machine & Materials Tags */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <div className="flex flex-wrap gap-1.5">
                      {p.printerTypes?.map((t: string, i: number) => (
                        <span
                          key={i}
                          className="text-[10px] font-bold bg-blue-500/15 text-blue-300 px-2 py-0.5 rounded-lg border border-blue-500/20"
                        >
                          {t}
                        </span>
                      ))}
                      {p.materials?.slice(0, 3).map((m: string, i: number) => (
                        <span
                          key={i}
                          className="text-[10px] font-semibold bg-slate-800 text-slate-300 px-2 py-0.5 rounded-lg"
                        >
                          {m}
                        </span>
                      ))}
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                      <span>Máy: <b>{p.machineModels || "Bambu Lab / Formlabs"}</b></span>
                      <span>Khổ: <b>{p.maxVolumeX}x{p.maxVolumeY}x{p.maxVolumeZ}mm</b></span>
                    </div>
                  </div>
                </div>

                {/* Bottom stats */}
                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1 font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{p.rating}</span>
                    <span className="text-slate-500 font-normal">({p.completedJobs} đơn)</span>
                  </div>
                  <Link href="/customer/projects/new">
                    <Button size="sm" className="h-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs">
                      Gửi yêu cầu in
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TWO-SIDED VALUE PROPOSITION */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For Customers */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-950/40 via-slate-900 to-slate-900 border border-blue-500/20 space-y-4">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                Dành Cho Khách Hàng
              </span>
              <h3 className="text-2xl font-black text-white">
                Cần In 3D Nhanh, Đẹp &amp; Bảo Mật Bản Quyền?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Không cần đi tìm từng xưởng hỏi giá. Chỉ cần 1 lần đăng yêu cầu, 10 xưởng gần bạn sẽ tiếp cận ngay. Tiền được giữ bảo hiểm Escrow an toàn đến khi nhận hàng.
              </p>
              <Link href="/customer/projects/new" className="inline-block pt-2">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl h-10 px-5">
                  Đăng dự án in 3D ngay
                </Button>
              </Link>
            </div>

            {/* For Workshop / Individual */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/20 space-y-4">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
                Dành Cho Xưởng &amp; Cá Nhân Có Máy In
              </span>
              <h3 className="text-2xl font-black text-white">
                Tận Dụng Máy In Nhàn Rỗi, Tăng Doanh Thu Mỗi Ngày
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Nhận thông báo ngay khi có khách cần in ở khu vực lân cận của bạn. Chủ động bật/tắt trạng thái Rảnh khi rảnh máy, thanh toán tự động không lo bùng tiền.
              </p>
              <Link href="/account/register?role=WORKSHOP" className="inline-block pt-2">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl h-10 px-5">
                  Đăng ký làm đối tác in 3D
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
