import Link from "next/link";
import {
  PlusCircle,
  FileCode,
  Clock,
  CheckCircle2,
  MessageSquare,
  Building2,
  ShieldCheck,
  Zap,
  ArrowRight,
  Printer,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatVND } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function CustomerDashboardPage() {
  // Sample Customer Active Projects
  const projects = [
    {
      id: "p-1",
      code: "PRJ-902184",
      title: "In vỏ hộp cảm biến IoT chống nước ngoài trời (5 bộ)",
      material: "PETG Đen mờ",
      category: "Linh kiện kỹ thuật",
      status: "ASSIGNED",
      budget: 450000,
      createdAt: "Hôm nay, 19:30",
      assignedPrinter: {
        name: "3D Hub Sài Gòn",
        district: "Quận 1",
        rating: 4.95,
        machines: "Bambu Lab X1-Carbon",
      },
      contractStatus: "DRAFT",
      escrowStatus: "PENDING",
    },
    {
      id: "p-2",
      code: "PRJ-819203",
      title: "In tượng nhân vật Raiden Shogun 20cm Resin 8K",
      material: "Resin Standard",
      category: "Figure & Art",
      status: "PRINTING",
      budget: 650000,
      createdAt: "Hôm qua, 14:15",
      assignedPrinter: {
        name: "Mekong Resin Studio",
        district: "Quận 7",
        rating: 4.98,
        machines: "Elegoo Saturn 4 Ultra",
      },
      contractStatus: "PAID_ESCROW",
      escrowStatus: "HELD_IN_ESCROW",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "OPEN":
        return (
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30 text-xs">
            ⚡ Đang tìm 10 xưởng gần nhất
          </Badge>
        );
      case "ASSIGNED":
        return (
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs">
            🤝 Xưởng đã nhận đơn - Chờ chốt hợp đồng
          </Badge>
        );
      case "PRINTING":
        return (
          <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/30 text-xs">
            🖨️ Đang in sản phẩm (Đã ký quỹ Escrow)
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs">
            ✅ Đã hoàn thành
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Quản Lý Dự Án In 3D Của Tôi
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Theo dõi tiến độ, trao đổi với xưởng in và quản lý thanh toán ký quỹ Escrow
            </p>
          </div>

          <Link href="/customer/projects/new">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl h-11 px-5 text-xs shadow-lg shadow-blue-500/25 flex items-center space-x-2">
              <PlusCircle className="w-4 h-4" />
              <span>Đăng yêu cầu in mới</span>
            </Button>
          </Link>
        </div>

        {/* Project List */}
        <div className="space-y-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl shadow-black/20"
            >
              {/* Top row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs font-bold text-slate-400 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800">
                    {project.code}
                  </span>
                  <div>{getStatusBadge(project.status)}</div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Ngân sách dự kiến:</span>
                  <span className="text-xl font-black text-amber-400">
                    {formatVND(project.budget)}
                  </span>
                </div>
              </div>

              {/* Title & Specs */}
              <div>
                <h3 className="text-lg font-black text-white leading-snug">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-xs text-slate-400 mt-2">
                  <span>Vật liệu: <b className="text-slate-200">{project.material}</b></span>
                  <span>•</span>
                  <span>Phân loại: <b className="text-slate-200">{project.category}</b></span>
                  <span>•</span>
                  <span>Ngày đăng: <b className="text-slate-200">{project.createdAt}</b></span>
                </div>
              </div>

              {/* Assigned Printer Info Box */}
              {project.assignedPrinter && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-xs sm:text-sm">
                          {project.assignedPrinter.name}
                        </span>
                        <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md">
                          ★ {project.assignedPrinter.rating}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Khu vực: {project.assignedPrinter.district} • Máy in: {project.assignedPrinter.machines}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl h-9 px-4 flex items-center space-x-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Nhắn tin với Xưởng</span>
                    </Button>
                  </div>
                </div>
              )}

              {/* Escrow Status info */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                <div className="flex items-center space-x-1.5">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>
                    Bảo hiểm Escrow:{" "}
                    <b>
                      {project.escrowStatus === "HELD_IN_ESCROW"
                        ? "Đang giữ tiền an toàn trên sàn (Chỉ giải ngân khi bạn bấm hoàn thành)"
                        : "Chưa thanh toán ký quỹ"}
                    </b>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
