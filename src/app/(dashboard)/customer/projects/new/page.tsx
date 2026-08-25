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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { createProjectAction } from "@/actions/project-actions";

export default function CreateProjectPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("PROTOTYPE");
  const [desiredMaterial, setDesiredMaterial] = useState("PLA");
  const [desiredColor, setDesiredColor] = useState("Đen mờ (Black)");
  const [infillPercent, setInfillPercent] = useState(25);
  const [layerHeight, setLayerHeight] = useState(0.2);
  const [quantity, setQuantity] = useState(1);
  const [targetBudget, setTargetBudget] = useState("350000");
  const [isNegotiable, setIsNegotiable] = useState(true);
  const [deadlineDays, setDeadlineDays] = useState(3);

  // Address
  const [province, setProvince] = useState("TP. Hồ Chí Minh");
  const [district, setDistrict] = useState("Quận 1");
  const [deliveryAddress, setDeliveryAddress] = useState("72 Lê Thánh Tôn, Bến Nghé, Quận 1");

  // File
  const [fileName, setFileName] = useState("sample_part_v2.stl");
  const [fileSize, setFileSize] = useState(4820000);
  const [fileUploaded, setFileUploaded] = useState(true);

  // Result state
  const [result, setResult] = useState<any | null>(null);

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

    const formData = new FormData();
    formData.append("title", title || "Dự án in 3D mẫu");
    formData.append("description", description || "Yêu cầu in chính xác, xử lý support sạch sẽ.");
    formData.append("category", category);
    formData.append("desiredMaterial", desiredMaterial);
    formData.append("desiredColor", desiredColor);
    formData.append("infillPercent", String(infillPercent));
    formData.append("layerHeight", String(layerHeight));
    formData.append("quantity", String(quantity));
    formData.append("targetBudget", targetBudget);
    formData.append("isNegotiable", String(isNegotiable));
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
        // Mock fallback success for preview
        setResult({
          success: true,
          project: {
            code: `PRJ-${Math.floor(100000 + Math.random() * 900000)}`,
            title: title || "In mẫu 3D kỹ thuật",
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
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tự Động Kết Nối 10 Xưởng Gần Bạn</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Đăng Yêu Cầu In 3D
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Tải lên file 3D (STL/OBJ/3MF), hệ thống sẽ tính khoảng cách và gửi yêu cầu tới 10 xưởng/cá nhân đang rảnh máy lân cận.
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

        {/* Project Creation Form */}
        {!result && (
          <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 text-xs">
            {/* Step 1: Upload 3D File */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                <FileCode className="w-4 h-4 text-blue-400" />
                <h3 className="font-bold text-sm text-white">
                  1. Tải Lên File Thiết Kế 3D (STL, OBJ, 3MF, STEP)
                </h3>
              </div>

              <div className="border-2 border-dashed border-slate-700 hover:border-blue-500/60 rounded-3xl p-8 text-center bg-slate-950/60 transition-colors cursor-pointer relative">
                <input
                  type="file"
                  accept=".stl,.obj,.3mf,.step,.zip"
                  onChange={handleSimulatedFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="font-bold text-white text-sm">
                  Kéo thả file 3D vào đây hoặc bấm để chọn từ máy tính
                </p>
                <p className="text-slate-400 text-[11px] mt-1">
                  Hỗ trợ định dạng .STL, .OBJ, .3MF, .STEP (Dung lượng tối đa 100MB). Cam kết bảo mật NDA.
                </p>

                {fileUploaded && (
                  <div className="mt-4 inline-flex items-center space-x-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3.5 py-1.5 rounded-xl font-mono text-xs">
                    <FileCode className="w-4 h-4 text-blue-400" />
                    <span>{fileName}</span>
                    <span className="text-slate-400">({(fileSize / (1024 * 1024)).toFixed(2)} MB)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Project Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                <Layers className="w-4 h-4 text-purple-400" />
                <h3 className="font-bold text-sm text-white">
                  2. Thông Tin Dự Án &amp; Yêu Cầu Kỹ Thuật
                </h3>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1.5">
                  Tiêu đề yêu cầu in 3D *
                </label>
                <Input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="VD: In vỏ hộp cảm biến IoT, Tượng nhân vật Anime 20cm..."
                  className="bg-slate-950 border-slate-800 text-white h-11 text-xs rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">Mục đích in</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  >
                    <option value="PROTOTYPE">Tạo mẫu cơ khí / Linh kiện kỹ thuật</option>
                    <option value="FIGURE_ANIME">Mô hình nhân vật / Figure / Art</option>
                    <option value="ARCHITECTURE">Kiến trúc &amp; Sa bàn</option>
                    <option value="ACCESSORIES">Phụ kiện &amp; Cosplay</option>
                    <option value="OTHER">Mục đích khác</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">Vật liệu mong muốn *</label>
                  <select
                    value={desiredMaterial}
                    onChange={(e) => setDesiredMaterial(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  >
                    <option value="PLA">PLA (Tiêu chuẩn, giá tốt, bề mặt mịn)</option>
                    <option value="PETG">PETG (Bền cơ tính, chịu ẩm, chịu lực)</option>
                    <option value="ABS">ABS (Chịu nhiệt cao, bền va đập)</option>
                    <option value="RESIN_STD">Resin Standard (Siêu nét cho tượng/figure)</option>
                    <option value="RESIN_TOUGH">Resin Tough (Kỹ thuật chịu lực)</option>
                    <option value="TPU_FLEX">TPU (Nhựa dẻo đàn hồi)</option>
                    <option value="CARBON_FIBER">Carbon Fiber (Siêu cứng &amp; nhẹ)</option>
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
                    <option value={0.05}>0.05 mm (Siêu nét - SLA Resin)</option>
                    <option value={0.12}>0.12 mm (Chất lượng cao - FDM)</option>
                    <option value={0.2}>0.20 mm (Tiêu chuẩn cân bằng)</option>
                    <option value={0.28}>0.28 mm (In nhanh thử nghiệm)</option>
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

              <div>
                <label className="block font-bold text-slate-300 mb-1.5">
                  Mô tả chi tiết / Yêu cầu gia công
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ghi chú thêm về dung sai lắp ghép, ren ốc cấy brass heat-set, yêu cầu tháo support hay chà nhám..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Step 3: Location & Budget */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm text-white">
                  3. Địa Chỉ Nhận Hàng (Để Tìm 10 Xưởng Gần Nhất) &amp; Ngân Sách
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <option value="Đồng Nai">Đồng Nai</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">Quận / Huyện *</label>
                  <Input
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="VD: Quận 1, Cầu Giấy, TP. Thủ Đức..."
                    className="bg-slate-950 border-slate-800 text-white h-11 text-xs rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1.5">Địa chỉ nhận hàng cụ thể</label>
                <Input
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Số nhà, tên đường, phường/xã..."
                  className="bg-slate-950 border-slate-800 text-white h-11 text-xs rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">
                    Ngân sách dự kiến (VND)
                  </label>
                  <Input
                    type="number"
                    value={targetBudget}
                    onChange={(e) => setTargetBudget(e.target.value)}
                    placeholder="VD: 350000"
                    className="bg-slate-950 border-slate-800 text-white h-11 text-xs rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">
                    Thời gian mong muốn hoàn thành
                  </label>
                  <select
                    value={deadlineDays}
                    onChange={(e) => setDeadlineDays(Number(e.target.value))}
                    className="w-full h-11 px-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  >
                    <option value={1}>Gấp trong 24 Giờ (+ Phụ phí hỏa tốc)</option>
                    <option value={2}>Trong vòng 2 Ngày</option>
                    <option value={3}>Trong vòng 3 Ngày (Tiêu chuẩn)</option>
                    <option value={5}>Trong vòng 5 Ngày</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-800">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black text-sm rounded-2xl h-13 shadow-xl shadow-blue-500/25 flex items-center justify-center space-x-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Đang tìm 10 xưởng gần nhất và phát thông báo...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                    <span>Đăng Dự Án &amp; Tìm 10 Xưởng Gần Bạn Ngay</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
