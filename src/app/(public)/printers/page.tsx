import Link from "next/link";
import {
  Building2,
  Printer,
  MapPin,
  Star,
  Search,
  Filter,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getPrintersDirectoryAction } from "@/actions/printer-actions";

export const dynamic = "force-dynamic";

export default async function PrintersDirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    province?: string;
    printerType?: any;
    material?: any;
  }>;
}) {
  const params = await searchParams;
  const directoryRes = await getPrintersDirectoryAction({
    search: params.search,
    province: params.province,
    printerType: params.printerType,
    material: params.material,
  });

  const printers = directoryRes.printers || [];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-7xl space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Mạng Lưới Đối Tác In 3D Toàn Quốc</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Danh Bạ Xưởng In &amp; Cá Nhân Có Máy In 3D
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Tìm kiếm cơ sở in 3D theo công nghệ FDM, SLA Resin, SLS, vật liệu và khu vực gần bạn nhất.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <form method="GET" action="/printers" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="relative">
              <Input
                name="search"
                defaultValue={params.search || ""}
                placeholder="Tìm tên xưởng, model máy in..."
                className="bg-slate-950 border-slate-800 text-white pl-9 h-11 text-xs rounded-xl"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div>
              <select
                name="province"
                defaultValue={params.province || ""}
                className="w-full h-11 px-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold"
              >
                <option value="">Tất cả tỉnh thành</option>
                <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Bình Dương">Bình Dương</option>
              </select>
            </div>

            <div>
              <select
                name="printerType"
                defaultValue={params.printerType || ""}
                className="w-full h-11 px-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold"
              >
                <option value="">Tất cả công nghệ in</option>
                <option value="FDM">In sợi nhựa FDM (PLA/ABS/PETG)</option>
                <option value="SLA_RESIN">In quang hóa SLA Resin (Chi tiết cao)</option>
                <option value="SLS">In bột Laser SLS (Công nghiệp)</option>
              </select>
            </div>

            <div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 rounded-xl text-xs">
                <Filter className="w-3.5 h-3.5 mr-1.5" />
                <span>Lọc Danh Bạ</span>
              </Button>
            </div>
          </form>
        </div>

        {/* Printers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {printers.map((p: any) => (
            <div
              key={p.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group shadow-lg shadow-black/20"
            >
              <div className="space-y-4">
                {/* Top header */}
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

                {/* Machine Models & Tags */}
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

              {/* Bottom bar */}
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1 font-bold text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{p.rating}</span>
                  <span className="text-slate-500 font-normal">({p.completedJobs} đơn)</span>
                </div>
                <Link href="/customer/projects/new">
                  <Button size="sm" className="h-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs">
                    Gửi file yêu cầu in
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
