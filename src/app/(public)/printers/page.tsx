"use client";

import { useState } from "react";
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
  MessageSquare,
  Compass,
  Award,
  Phone,
  Lock,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AuthModal } from "@/components/auth/AuthModal";

export default function PrintersDirectoryPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [modalActionText, setModalActionText] = useState("");
  const [activeTab, setActiveTab] = useState<"ALL" | "NEARBY" | "TOP_RATING">("ALL");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedTech, setSelectedTech] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const samplePrinters = [
    {
      id: "ws-1",
      businessName: "3D Hub Sài Gòn - Trung Tâm In 3D Công Nghiệp",
      bio: "Xưởng in 3D quy mô 16 máy Bambu Lab X1-Carbon, Formlabs SLA Resin. Nhận in tạo mẫu nhanh, linh kiện kỹ thuật chính xác cao, xuất VAT đầy đủ.",
      address: "128 Nguyễn Trãi, Phường Bến Thành",
      district: "Quận 1",
      province: "TP. Hồ Chí Minh",
      printerTypes: ["FDM", "SLA_RESIN"],
      materials: ["PLA", "ABS", "PETG", "RESIN_TOUGH", "CARBON_FIBER"],
      machineCount: 16,
      machineModels: "12x Bambu Lab X1C, 4x Formlabs Form 3+",
      maxVolumeX: 300,
      maxVolumeY: 300,
      maxVolumeZ: 350,
      status: "AVAILABLE",
      isVerified: true,
      rating: 4.95,
      ratingCount: 142,
      completedJobs: 289,
      responseTimeMin: 8,
      distanceKm: 0.9,
      role: "WORKSHOP",
    },
    {
      id: "ws-2",
      businessName: "Xưởng In 3D Bách Khoa Engineering",
      bio: "Chuyên in mẫu cơ khí chính xác, bánh răng, đồ gá jig, vỏ hộp điện tử bằng vật liệu chịu nhiệt ABS, Nylon PA12 và Carbon Fiber.",
      address: "268 Lý Thường Kiệt, Phường 14",
      district: "Quận 10",
      province: "TP. Hồ Chí Minh",
      printerTypes: ["FDM", "SLS"],
      materials: ["ABS", "PETG", "NYLON_PA12", "CARBON_FIBER"],
      machineCount: 8,
      machineModels: "Prusa XL 5-Tool, Voron 2.4, Bambu X1E",
      maxVolumeX: 360,
      maxVolumeY: 360,
      maxVolumeZ: 360,
      status: "AVAILABLE",
      isVerified: true,
      rating: 4.88,
      ratingCount: 89,
      completedJobs: 174,
      responseTimeMin: 12,
      distanceKm: 4.8,
      role: "WORKSHOP",
    },
    {
      id: "ws-3",
      businessName: "Mekong 3D Resin Figure & Art Studio",
      bio: "Chuyên in Resin 8K / 12K siêu nét cho tượng Anime, nhân vật game, sa bàn thu nhỏ và mô hình trang sức. Có dịch vụ chà nhám, sơn lót.",
      address: "85 Nguyễn Thị Thập, Tân Phú",
      district: "Quận 7",
      province: "TP. Hồ Chí Minh",
      printerTypes: ["SLA_RESIN"],
      materials: ["RESIN_STD", "RESIN_TOUGH"],
      machineCount: 10,
      machineModels: "Elegoo Saturn 4 Ultra 12K",
      maxVolumeX: 218,
      maxVolumeY: 123,
      maxVolumeZ: 250,
      status: "AVAILABLE",
      isVerified: true,
      rating: 4.98,
      ratingCount: 210,
      completedJobs: 430,
      responseTimeMin: 5,
      distanceKm: 5.2,
      role: "WORKSHOP",
    },
    {
      id: "ind-1",
      businessName: "Hùng Maker - In 3D Nhanh Bình Thạnh",
      bio: "Mình có máy Bambu Lab P1S in sợi tốc độ cao. Nhận in đồ chơi, phụ kiện, giá đỡ điện thoại giá sinh viên, phục vụ khu vực Bình Thạnh, Phú Nhuận.",
      address: "45 Điện Biên Phủ, Phường 15",
      district: "Quận Bình Thạnh",
      province: "TP. Hồ Chí Minh",
      printerTypes: ["FDM"],
      materials: ["PLA", "PETG", "TPU_FLEX"],
      machineCount: 2,
      machineModels: "Bambu Lab P1S Combo AMS",
      maxVolumeX: 256,
      maxVolumeY: 256,
      maxVolumeZ: 256,
      status: "AVAILABLE",
      isVerified: true,
      rating: 4.9,
      ratingCount: 35,
      completedJobs: 58,
      responseTimeMin: 10,
      distanceKm: 2.1,
      role: "INDIVIDUAL",
    },
    {
      id: "ind-2",
      businessName: "Đức 3D Resin Hà Nội",
      bio: "Nhận in resin tượng figure, keycap bàn phím cơ, linh kiện nhỏ chi tiết cực nét. Rửa sấy UV tiêu chuẩn.",
      address: "182 Chùa Láng, Láng Thượng",
      district: "Quận Đống Đa",
      province: "Hà Nội",
      printerTypes: ["SLA_RESIN"],
      materials: ["RESIN_STD", "RESIN_TOUGH"],
      machineCount: 1,
      machineModels: "Anycubic Photon Mono X 6Ks",
      maxVolumeX: 200,
      maxVolumeY: 125,
      maxVolumeZ: 200,
      status: "AVAILABLE",
      isVerified: true,
      rating: 5.0,
      ratingCount: 19,
      completedJobs: 27,
      responseTimeMin: 15,
      distanceKm: 1.8,
      role: "INDIVIDUAL",
    },
  ];

  // Filtered printers
  let filtered = samplePrinters.filter((p) => {
    if (selectedProvince && p.province !== selectedProvince) return false;
    if (selectedTech && !p.printerTypes.includes(selectedTech)) return false;
    if (
      searchQuery &&
      !p.businessName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !p.bio.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  if (activeTab === "NEARBY") {
    filtered = [...filtered].sort((a, b) => a.distanceKm - b.distanceKm);
  } else if (activeTab === "TOP_RATING") {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating || b.completedJobs - a.completedJobs);
  }

  const handleRestrictedAction = (actionName: string) => {
    setModalActionText(actionName);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10">
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        title="Đăng Ký Để Kết Nối Trực Tiếp Với Xưởng"
        description={`Đăng ký tài khoản miễn phí để ${modalActionText || "chat trực tiếp, gửi file 3D và ký hợp đồng bảo hành với xưởng in"}.`}
        callbackUrl="/printers"
      />

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
            Khám phá hơn 450 máy in 3D FDM, SLA Resin 8K, SLS công nghiệp tại khu vực của bạn.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          {/* Quick tab filters */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
            <button
              onClick={() => setActiveTab("ALL")}
              className={`px-4 py-2 rounded-xl transition-colors ${
                activeTab === "ALL" ? "bg-blue-600 text-white" : "bg-slate-950 text-slate-400 hover:text-white"
              }`}
            >
              Tất cả xưởng ({samplePrinters.length})
            </button>
            <button
              onClick={() => setActiveTab("NEARBY")}
              className={`px-4 py-2 rounded-xl transition-colors flex items-center space-x-1.5 ${
                activeTab === "NEARBY" ? "bg-blue-600 text-white" : "bg-slate-950 text-slate-400 hover:text-white"
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Gần tôi nhất (GPS)</span>
            </button>
            <button
              onClick={() => setActiveTab("TOP_RATING")}
              className={`px-4 py-2 rounded-xl transition-colors flex items-center space-x-1.5 ${
                activeTab === "TOP_RATING" ? "bg-blue-600 text-white" : "bg-slate-950 text-slate-400 hover:text-white"
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Top Đánh Giá 5.0 ★</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-2">
            <div className="relative">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tên xưởng, model máy in..."
                className="bg-slate-950 border-slate-800 text-white pl-9 h-11 text-xs rounded-xl"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold"
              >
                <option value="">Tất cả tỉnh thành</option>
                <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
              </select>
            </div>

            <div>
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold"
              >
                <option value="">Tất cả công nghệ in</option>
                <option value="FDM">In sợi nhựa FDM (PLA/ABS/PETG)</option>
                <option value="SLA_RESIN">In quang hóa SLA Resin 8K</option>
                <option value="SLS">In bột Laser SLS (Công nghiệp)</option>
              </select>
            </div>

            <div>
              <Link href="/customer/projects/new" className="block">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold h-11 rounded-xl text-xs shadow-lg shadow-blue-500/20">
                  <span>+ Đăng File Tìm 10 Xưởng</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Printers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group shadow-lg shadow-black/20 space-y-4"
            >
              <div className="space-y-4">
                {/* Header info */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-base shadow-md">
                      {p.role === "WORKSHOP" ? <Building2 className="w-6 h-6" /> : <Printer className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors line-clamp-1">
                        {p.businessName}
                      </h3>
                      <p className="text-[11px] text-slate-400 flex items-center mt-0.5">
                        <MapPin className="w-3 h-3 mr-1 text-slate-500 shrink-0" />
                        <span>{p.district}, {p.province} ({p.distanceKm} km)</span>
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
                    {p.printerTypes.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold bg-blue-500/15 text-blue-300 px-2 py-0.5 rounded-lg border border-blue-500/20"
                      >
                        {t}
                      </span>
                    ))}
                    {p.materials.slice(0, 3).map((m, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold bg-slate-800 text-slate-300 px-2 py-0.5 rounded-lg"
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                    <span>Máy: <b>{p.machineModels}</b></span>
                    <span>Khổ: <b>{p.maxVolumeX}x{p.maxVolumeY}x{p.maxVolumeZ}mm</b></span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions: Chat (Blocked for guest) + Send Request */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleRestrictedAction(`chat và gửi tin nhắn trực tiếp với ${p.businessName}`)}
                  className="inline-flex items-center space-x-1 text-xs font-bold text-slate-400 hover:text-blue-400 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat</span>
                </button>

                <button
                  onClick={() => handleRestrictedAction(`xem số điện thoại và thông tin liên hệ của ${p.businessName}`)}
                  className="inline-flex items-center space-x-1 text-[11px] text-slate-500 hover:text-slate-300"
                >
                  <Lock className="w-3 h-3 text-slate-600" />
                  <span>Xem SĐT</span>
                </button>

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
    </div>
  );
}
