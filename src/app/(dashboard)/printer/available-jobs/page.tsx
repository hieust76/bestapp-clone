"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Printer,
  MapPin,
  Clock,
  DollarSign,
  FileCode,
  Zap,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatVND } from "@/lib/utils";
import { acceptProjectAction } from "@/actions/project-actions";

export default function AvailableJobsPage() {
  const [isPending, startTransition] = useTransition();
  const [claimedProjectIds, setClaimedProjectIds] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Mock initial available jobs for this printer (within 5km radius)
  const [jobs, setJobs] = useState([
    {
      id: "proj-1",
      code: "PRJ-902184",
      title: "In vỏ hộp cảm biến IoT chống nước ngoài trời (5 bộ)",
      description: "Cần in 5 bộ vỏ hộp chống nước cho board mạch ESP32 và cảm biến đất. Yêu cầu vật liệu chịu nắng mưa PETG hoặc ABS màu đen, độ dày thành 3mm.",
      material: "PETG / ABS",
      color: "Đen mờ",
      infill: "40%",
      layerHeight: "0.20 mm",
      quantity: 5,
      budget: 450000,
      deadline: "3 ngày tới",
      distanceKm: 0.9,
      district: "Quận 1, TP. Hồ Chí Minh",
      files: [{ name: "esp32_iot_case_top.stl", size: "2.4 MB" }, { name: "esp32_iot_case_bottom.stl", size: "3.1 MB" }],
      category: "PROTOTYPE",
    },
    {
      id: "proj-2",
      code: "PRJ-819203",
      title: "In tượng nhân vật Raiden Shogun 20cm độ chi tiết cao",
      description: "File 3D đã cắt sẵn 12 mảnh, cần in bằng công nghệ Resin SLA/DLP để giữ nguyên các chi tiết tóc, hoa văn trang phục. Yêu cầu xử lý support sạch sẽ, sấy UV hoàn thiện.",
      material: "Resin Standard 8K",
      color: "Xám",
      infill: "100%",
      layerHeight: "0.05 mm",
      quantity: 1,
      budget: 650000,
      deadline: "5 ngày tới",
      distanceKm: 2.1,
      district: "Quận Bình Thạnh, TP. Hồ Chí Minh",
      files: [{ name: "raiden_shogun_body_split.3mf", size: "45.8 MB" }],
      category: "FIGURE_ANIME",
    },
    {
      id: "proj-3",
      code: "PRJ-738192",
      title: "Khung gắn camera bay FPV Drone sợi Carbon / TPU",
      description: "In đế gắn camera GoPro Action cho khung drone 5 inch, cần in bằng nhựa dẻo TPU 95A chống sốc khi va chạm.",
      material: "TPU Dẻo (Flexible)",
      color: "Đỏ Neon",
      infill: "100%",
      layerHeight: "0.16 mm",
      quantity: 2,
      budget: 180000,
      deadline: "Gấp 24 giờ",
      distanceKm: 3.4,
      district: "Quận 3, TP. Hồ Chí Minh",
      files: [{ name: "fpv_gopro_mount_tpu.stl", size: "1.2 MB" }],
      category: "PROTOTYPE",
    },
  ]);

  const handleClaimOrder = (projectId: string) => {
    setErrorMsg(null);
    setSuccessMsg(null);

    startTransition(async () => {
      // Mock printer user ID
      const printerUserId = "workshop-sample-id";
      const res = await acceptProjectAction(projectId, printerUserId);

      if (res.success || !res.error) {
        setClaimedProjectIds((prev) => [...prev, projectId]);
        setSuccessMsg("🎉 Chúc mừng! Bạn đã nhận đơn in thành công độc quyền. Phòng chat với khách hàng đã được kích hoạt!");
      } else {
        setErrorMsg(res.error || "Rất tiếc! Đơn in này vừa được một xưởng khác nhận trước.");
        // Loại bỏ đơn khỏi danh sách
        setJobs((prev) => prev.filter((j) => j.id !== projectId));
      }
    });
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold mb-2">
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              <span>Đơn Hàng Được Phát Riêng Cho Bạn</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Đơn In 3D Mới Gần Bạn ({jobs.length})
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Hệ thống chọn bạn là 1 trong 10 xưởng/cá nhân gần khách nhất. <b>Bên nào bấm nhận trước sẽ được độc quyền đơn hàng!</b>
            </p>
          </div>

          <Link href="/printer/dashboard">
            <Button variant="outline" className="border-slate-700 bg-slate-900 text-white font-bold text-xs rounded-xl h-10">
              Về Kênh Quản Lý Xưởng
            </Button>
          </Link>
        </div>

        {/* Status Alerts */}
        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
            <Link href="/customer/dashboard">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl">
                <MessageSquare className="w-3.5 h-3.5 mr-1" />
                <span>Mở Khung Chat Ngay</span>
              </Button>
            </Link>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center space-x-2 mb-6">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Jobs Feed List */}
        <div className="space-y-6">
          {jobs.map((job) => {
            const isClaimed = claimedProjectIds.includes(job.id);

            return (
              <div
                key={job.id}
                className={`bg-slate-900 border rounded-3xl p-6 sm:p-8 transition-all duration-300 space-y-6 ${
                  isClaimed
                    ? "border-emerald-500/50 bg-emerald-950/10"
                    : "border-slate-800 hover:border-slate-700 shadow-xl shadow-black/20"
                }`}
              >
                {/* Header row: Code, Distance, Budget */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-xs font-bold text-slate-400 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800">
                      {job.code}
                    </span>
                    <span className="inline-flex items-center text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-xl border border-blue-500/20">
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      Cách bạn: {job.distanceKm} km ({job.district})
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">Ngân sách dự kiến:</span>
                    <span className="text-xl font-black text-amber-400">
                      {formatVND(job.budget)}
                    </span>
                  </div>
                </div>

                {/* Body: Title & Description */}
                <div>
                  <h3 className="text-lg font-black text-white leading-snug">
                    {job.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Technical Specs Tags Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Vật liệu:</span>
                    <span className="font-bold text-white text-xs">{job.material}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Độ mịn Layer:</span>
                    <span className="font-bold text-white text-xs">{job.layerHeight}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Độ đặc Infill:</span>
                    <span className="font-bold text-white text-xs">{job.infill}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Thời hạn:</span>
                    <span className="font-bold text-emerald-400 text-xs">{job.deadline}</span>
                  </div>
                </div>

                {/* 3D Files Attachment */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                    File Model 3D Đính Kèm:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {job.files.map((file, i) => (
                      <div
                        key={i}
                        className="inline-flex items-center space-x-2 bg-slate-800/80 hover:bg-slate-800 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-mono border border-slate-700"
                      >
                        <FileCode className="w-3.5 h-3.5 text-blue-400" />
                        <span>{file.name}</span>
                        <span className="text-slate-400 text-[10px]">({file.size})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[11px] text-slate-400 flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Đang chờ 1 xưởng xác nhận. 9 xưởng khác sẽ tự động mất quyền khi bạn nhận!</span>
                  </div>

                  {isClaimed ? (
                    <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/30">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Bạn đã nhận đơn này!</span>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleClaimOrder(job.id)}
                      disabled={isPending}
                      className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs h-11 px-6 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center space-x-2"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Đang khoá đơn...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 fill-white" />
                          <span>Xác Nhận Nhận Đơn Ngay (Atomic Claim)</span>
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
