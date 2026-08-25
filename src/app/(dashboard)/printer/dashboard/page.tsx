"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Printer,
  Zap,
  TrendingUp,
  DollarSign,
  Clock,
  Star,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ArrowRight,
  Layers,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatVND } from "@/lib/utils";
import { toggleAvailabilityAction } from "@/actions/printer-actions";
import { PrinterStatus } from "@prisma/client";

export default function PrinterDashboardPage() {
  const [status, setStatus] = useState<PrinterStatus>(PrinterStatus.AVAILABLE);
  const [isPending, startTransition] = useTransition();

  const handleToggleStatus = (newStatus: PrinterStatus) => {
    setStatus(newStatus);
    startTransition(async () => {
      // Mock user ID
      await toggleAvailabilityAction("workshop-sample-id", newStatus);
    });
  };

  const stats = [
    {
      title: "Doanh thu chờ giải ngân",
      value: formatVND(1850000),
      subtext: "Từ 3 đơn đang in",
      icon: DollarSign,
      color: "text-emerald-400 bg-emerald-500/10",
    },
    {
      title: "Đơn hàng gần bạn",
      value: "3 đơn mới",
      subtext: "Bán kính < 5 km",
      icon: Zap,
      color: "text-amber-400 bg-amber-500/10",
    },
    {
      title: "Máy in đang chạy",
      value: "8 / 12 máy",
      subtext: "Công suất 67%",
      icon: Printer,
      color: "text-blue-400 bg-blue-500/10",
    },
    {
      title: "Đánh giá uy tín",
      value: "4.95 ★",
      subtext: "142 lượt đánh giá",
      icon: Star,
      color: "text-purple-400 bg-purple-500/10",
    },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl space-y-8">
        {/* Top Bar: Title & Availability Toggle Switch */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs text-blue-400 font-bold bg-blue-500/10 px-2.5 py-1 rounded-xl">
                Kênh Quản Lý Xưởng In &amp; Máy Cá Nhân
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2">
              3D Hub Sài Gòn
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Quận 1, TP. Hồ Chí Minh • 12x Bambu Lab X1C, 4x Formlabs
            </p>
          </div>

          {/* Availability Control Pill */}
          <div className="bg-slate-950 p-2 rounded-2xl border border-slate-800 flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-400 px-2">Trạng thái:</span>
            <button
              onClick={() => handleToggleStatus(PrinterStatus.AVAILABLE)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                status === PrinterStatus.AVAILABLE
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              <span>Đang Rảnh (Nhận Đơn)</span>
            </button>

            <button
              onClick={() => handleToggleStatus(PrinterStatus.BUSY)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                status === PrinterStatus.BUSY
                  ? "bg-amber-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Đang Bận Máy</span>
            </button>

            <button
              onClick={() => handleToggleStatus(PrinterStatus.OFFLINE)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                status === PrinterStatus.OFFLINE
                  ? "bg-slate-800 text-slate-300"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              <span>Tạm Ngưng</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">{stat.title}</span>
                  <div className={`p-2.5 rounded-2xl ${stat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <p className="text-[11px] text-slate-400 font-medium">{stat.subtext}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Action Banner: View New Orders */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900/60 via-indigo-900/60 to-purple-900/60 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Zap className="w-6 h-6 fill-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                Có 3 đơn in 3D mới đang phát trong khu vực của bạn!
              </h3>
              <p className="text-xs text-blue-200 mt-0.5">
                Các xưởng khác đang xem đơn. Bấm xem chi tiết để nhận đơn ngay trước khi hết lượt.
              </p>
            </div>
          </div>

          <Link href="/printer/available-jobs">
            <Button className="bg-white text-slate-900 hover:bg-slate-100 font-black text-xs h-11 px-6 rounded-xl shadow-lg shrink-0 flex items-center space-x-1.5">
              <span>Xem Đơn &amp; Nhận Ngay</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Active Jobs in Production */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="font-bold text-base text-white border-b border-slate-800/80 pb-3 flex items-center justify-between">
            <span>Dự Án Đang Chạy Máy / Đã Nhận</span>
            <span className="text-xs font-normal text-slate-400">1 đơn đang in</span>
          </h3>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
              <div>
                <span className="font-mono text-[11px] text-slate-400">Mã đơn: PRJ-902184</span>
                <h4 className="font-bold text-white text-sm mt-0.5">
                  In vỏ hộp cảm biến IoT chống nước ngoài trời (5 bộ)
                </h4>
              </div>
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/30 text-xs">
                🖨️ Đang in (Máy Bambu #03, #04)
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-400">
              <div>
                <span className="block text-[10px] text-slate-500">Khách hàng:</span>
                <span className="font-bold text-white">Nguyễn Thành Long</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500">Giá trị hợp đồng:</span>
                <span className="font-bold text-emerald-400">450.000đ (Đã Escrow)</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500">Vật liệu:</span>
                <span className="font-bold text-white">PETG Đen mờ</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500">Hạn giao:</span>
                <span className="font-bold text-amber-400">Ngày mai 17:00</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-slate-700 text-xs h-8 rounded-lg">
                  <MessageSquare className="w-3.5 h-3.5 mr-1" />
                  <span>Chat khách hàng</span>
                </Button>
                <Button size="sm" variant="outline" className="border-slate-700 text-xs h-8 rounded-lg">
                  <span>Xem file 3D (.STL)</span>
                </Button>
              </div>

              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-8 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                <span>Báo đã in xong &amp; Giao hàng</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
