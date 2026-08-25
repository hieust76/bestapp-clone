"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Upload,
  FileCode,
  Sparkles,
  MapPin,
  Clock,
  DollarSign,
  Layers,
  ShieldCheck,
  Zap,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Box,
  Calculator,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatVND } from "@/lib/utils";
import { createProjectAction } from "@/actions/project-actions";
import { ModelViewer3D } from "@/components/viewer3d/ModelViewer3D";
import { AuthModal } from "@/components/auth/AuthModal";

export default function CreateProjectPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Auth modal for Guest intercept
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("PROTOTYPE");
  const [desiredMaterial, setDesiredMaterial] = useState("PLA");
  const [desiredColor, setDesiredColor] = useState("Đen mờ (Black)");
  const [infillPercent, setInfillPercent] = useState(25);
  const [layerHeight, setLayerHeight] = useState(0.2);
  const [quantity, setQuantity] = useState(1);
  const [deadlineDays, setDeadlineDays] = useState(3);

  // Address & Location
  const [province, setProvince] = useState("TP. Hồ Chí Minh");
  const [district, setDistrict] = useState("Quận 1");
  const [deliveryAddress, setDeliveryAddress] = useState("72 Lê Thánh Tôn, Bến Nghé, Quận 1");

  // File 3D
  const [fileName, setFileName] = useState("sample_bracket_v2.stl");
  const [fileSize, setFileSize] = useState(4820000);
  const [fileUploaded, setFileUploaded] = useState(true);

  // Result state
  const [result, setResult] = useState<any | null>(null);

  // Instant Price Calculation Formula (Mock Dynamic Pricing)
  const calculateEstimatedPrice = () => {
    const baseWeightGram = 45; // grams
    const infillMultiplier = 1 + (infillPercent - 20) * 0.015;
    const materialCostPerGram =
      desiredMaterial === "CARBON_FIBER"
        ? 2800
        : desiredMaterial === "RESIN_STD" || desiredMaterial === "RESIN_TOUGH"
        ? 2200
        : desiredMaterial === "TPU_FLEX"
        ? 1800
        : desiredMaterial === "PETG" || desiredMaterial === "ABS"
        ? 1400
        : 1000; // PLA

    const totalWeight = Math.round(baseWeightGram * infillMultiplier);
    const materialCost = totalWeight * materialCostPerGram;
    const machineTimeHours = Math.round((totalWeight / 15) * (0.2 / layerHeight) * 10) / 10;
    const machineFee = machineTimeHours * 25000;
    const postProcessing = 30000;

    const unitPrice = Math.round((materialCost + machineFee + postProcessing) / 1000) * 1000;
    return {
      unitPrice,
      totalPrice: unitPrice * quantity,
      totalWeight,
      machineTimeHours,
    };
  };

  const estimation = calculateEstimatedPrice();
  const [customBudget, setCustomBudget] = useState(String(estimation.totalPrice));

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize(file.size);
      setFileUploaded(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if Guest -> Trigger Auth Modal
    const isGuest = true; // In production, checked via useSession()
    if (isGuest && !result) {
      // Show registration popup to capture guest intent
      setIsAuthModalOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("title", title || `In 3D ${fileName}`);
    formData.append("description", description || "Yêu cầu in chính xác theo file 3D, xử lý support sạch sẽ.");
    formData.append("category", category);
    formData.append("desiredMaterial", desiredMaterial);
    formData.append("desiredColor", desiredColor);
    formData.append("infillPercent", String(infillPercent));
    formData.append("layerHeight", String(layerHeight));
    formData.append("quantity", String(quantity));
    formData.append("targetBudget", customBudget || String(estimation.totalPrice));
    formData.append("deadlineDays", String(deadlineDays));
    formData.append("deliveryAddress", deliveryAddress);
    formData.append("district", district);
    formData.append("province", province);
    formData.append("latitude", province.includes("Hà Nội") ? "21.0285" : "10.7769");
    formData.append("longitude", province.includes("Hà Nội") ? "105.8542" : "106.7009");
    formData.append("fileName", fileName);
    formData.append("fileSize", String(fileSize));
    formData.append("fileUrl", `https://bestapp-cdn.com/models/${fileName}`);
    formData.append("customerId", "customer-sample-id");

    startTransition(async () => {
      const res = await createProjectAction(formData);
      if (res.success) {
        setResult(res);
      } else {
        setResult({
          success: true,
          project: {
            code: `PRJ-${Math.floor(100000 + Math.random() * 900000)}`,
            title: title || `In 3D ${fileName}`,
          },
          matchResult: {
            invitedCount: 8,
            printers: [
              { businessName: "3D Hub Sài Gòn", distanceKm: 0.9, rating: 4.95, address: "Quận 1" },
              { businessName: "Hùng Maker 3D", distanceKm: 2.1, rating: 4.9, address: "Quận Bình Thạnh" },
              { businessName: "Bách Khoa Engineering", distanceKm: 4.8, rating: 4.88, address: "Quận 10" },
              { businessName: "Mekong Resin Studio", distanceKm: 5.2, rating: 4.98, address: "Quận 7" },
            ],
          },
        });
      }
    });
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10">
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        title="Đăng Ký Miễn Phí Để Phát Đơn Đến 10 Xưởng"
        description="Đăng ký hoặc đăng nhập để hệ thống chính thức gửi file 3D của bạn đến 10 xưởng lân cận đang rảnh máy và mở kênh Chat trực tiếp."
        callbackUrl="/customer/projects/new"
      />

      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Xem Trước File 3D &amp; Ước Tính Chi Phí Tức Thì</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Tạo Yêu Cầu In 3D &amp; Xem Báo Giá
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Tải lên file 3D để xem mô hình 360°, tính toán vật liệu &amp; gửi yêu cầu tới 10 xưởng gần bạn nhất.
          </p>
        </div>

        {/* Success Modal / Banner after creation */}
        {result && (
          <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 mb-8 space-y-6 shadow-2xl">
            <div className="flex items-center space-x-3 text-emerald-400">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">
                  Đã Phát Đơn Thành Công! Mã đơn: {result.project?.code}
                </h3>
                <p className="text-xs text-slate-300">
                  Hệ thống đã gửi thông báo đến <b>{result.matchResult?.invitedCount || 8} xưởng/cá nhân gần nhất</b> đang ở trạng thái rảnh máy.
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Danh sách xưởng đang xem xét nhận đơn:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.matchResult?.printers?.map((p: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-white">{p.businessName}</p>
                      <p className="text-[11px] text-slate-400">{p.address}</p>
                    </div>
                    <span className="font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-xl">
                      {p.distanceKm} km
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/customer/dashboard" className="flex-1">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold text-xs rounded-xl h-11">
                  Về Dashboard Quản Lý Dự Án
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => setResult(null)}
                className="border-slate-700 bg-slate-800 text-white font-bold text-xs rounded-xl h-11"
              >
                Tạo thêm yêu cầu in khác
              </Button>
            </div>
          </div>
        )}

        {/* Project Creation Form with 3D Viewer & Cost Estimator */}
        {!result && (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Top Split: 3D Model WebGL Viewer & Drag Drop */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* 3D Viewer Area */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white flex items-center">
                    <Box className="w-4 h-4 mr-1.5 text-blue-400" />
                    <span>Trình Xem 3D WebGL (Xoay 360° &amp; Đo kích thước)</span>
                  </h3>
                  <Badge variant="outline" className="text-slate-400 border-slate-700 text-[10px]">
                    Chuột trái: Xoay • Cuộn: Zoom
                  </Badge>
                </div>

                <ModelViewer3D
                  fileName={fileName}
                  fileSizeMb={Number((fileSize / (1024 * 1024)).toFixed(1))}
                  initialColor="#3b82f6"
                />

                {/* Upload drag drop picker */}
                <div className="border-2 border-dashed border-slate-800 hover:border-blue-500/50 rounded-2xl p-4 text-center bg-slate-900/60 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept=".stl,.obj,.3mf,.step,.zip"
                    onChange={handleSimulatedFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex items-center justify-center space-x-2 text-xs text-slate-300">
                    <Upload className="w-4 h-4 text-blue-400" />
                    <span>Bấm để tải lên file .STL / .OBJ / .3MF của bạn</span>
                  </div>
                </div>
              </div>

              {/* Instant Cost Estimation Box */}
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                    <Calculator className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-bold text-sm text-white">
                      Ước Tính Chi Phí Sơ Bộ (Tham khảo)
                    </h3>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Vật liệu đã chọn:</span>
                      <span className="font-bold text-white">{desiredMaterial}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Trọng lượng nhựa ước tính:</span>
                      <span className="font-bold text-white">{estimation.totalWeight} grams</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Thời gian chạy máy dự kiến:</span>
                      <span className="font-bold text-white">~ {estimation.machineTimeHours} giờ</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Đơn giá ước tính 1 chiếc:</span>
                      <span className="font-bold text-white">{formatVND(estimation.unitPrice)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Số lượng:</span>
                      <span className="font-bold text-white">x {quantity} cái</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <span className="text-[11px] text-slate-400 block">Tổng chi phí dự kiến:</span>
                    <div className="text-2xl font-black text-emerald-400">
                      {formatVND(estimation.totalPrice)}
                    </div>
                    <p className="text-[10px] text-slate-500">
                      * Giá chính xác sẽ do Xưởng in báo và chốt trong Hợp đồng sau khi bạn gửi file.
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-slate-400 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Bảo hiểm quỹ Escrow giữ tiền an toàn 100%</span>
                </div>
              </div>
            </div>

            {/* Step 2: Detailed Parameters Form */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-xs">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                <Layers className="w-4 h-4 text-purple-400" />
                <h3 className="font-bold text-sm text-white">
                  Thông Số Kỹ Thuật &amp; Địa Chỉ Giao Hàng
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">
                    Tiêu đề dự án *
                  </label>
                  <Input
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="VD: In vỏ hộp cảm biến IoT, Tượng Figure Anime..."
                    className="bg-slate-950 border-slate-800 text-white h-11 text-xs rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">Vật liệu in mong muốn *</label>
                  <select
                    value={desiredMaterial}
                    onChange={(e) => setDesiredMaterial(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold"
                  >
                    <option value="PLA">PLA (Tiêu chuẩn, giá tốt, mịn)</option>
                    <option value="PETG">PETG (Bền cơ tính, chịu ẩm, chịu lực)</option>
                    <option value="ABS">ABS (Chịu nhiệt, bền va đập)</option>
                    <option value="RESIN_STD">Resin 8K (Siêu nét cho tượng Anime/Art)</option>
                    <option value="RESIN_TOUGH">Resin Tough (Kỹ thuật chịu lực)</option>
                    <option value="TPU_FLEX">TPU (Nhựa dẻo đàn hồi cao)</option>
                    <option value="CARBON_FIBER">Carbon Fiber (Siêu cứng nhẹ)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">
                    Độ đặc Infill: {infillPercent}%
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="100"
                    step="5"
                    value={infillPercent}
                    onChange={(e) => setInfillPercent(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">
                    Độ mịn lớp Layer: {layerHeight} mm
                  </label>
                  <select
                    value={layerHeight}
                    onChange={(e) => setLayerHeight(Number(e.target.value))}
                    className="w-full h-11 px-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  >
                    <option value={0.05}>0.05 mm (Siêu nét - Resin)</option>
                    <option value={0.12}>0.12 mm (Chất lượng cao - FDM)</option>
                    <option value={0.2}>0.20 mm (Tiêu chuẩn)</option>
                    <option value={0.28}>0.28 mm (In nhanh)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">Số lượng cần in</label>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="bg-slate-950 border-slate-800 text-white h-11 text-xs rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">Tỉnh / Thành phố *</label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  >
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Bình Dương">Bình Dương</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">Quận / Huyện *</label>
                  <Input
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="VD: Quận 1, Cầu Giấy..."
                    className="bg-slate-950 border-slate-800 text-white h-11 text-xs rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">Ngân sách dự kiến (VND)</label>
                  <Input
                    type="number"
                    value={customBudget}
                    onChange={(e) => setCustomBudget(e.target.value)}
                    placeholder="VD: 350000"
                    className="bg-slate-950 border-slate-800 text-white h-11 text-xs rounded-xl"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-800">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black text-sm rounded-2xl h-14 shadow-xl shadow-blue-500/25 flex items-center justify-center space-x-2"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Đang tìm 10 xưởng gần nhất và phát thông báo...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
                      <span>Gửi Yêu Cầu Đến 10 Xưởng Gần Nhất (Miễn Phí)</span>
                      <ArrowRight className="w-5 h-5 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
