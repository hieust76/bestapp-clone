"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Printer,
  Building2,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Cpu,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerUserAction } from "@/actions/auth-actions";
import { Role } from "@prisma/client";

export default function RegisterPage3D() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = (searchParams.get("role") as Role) || Role.CUSTOMER;

  const [selectedRole, setSelectedRole] = useState<Role>(defaultRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  
  // Workshop / Individual fields
  const [businessName, setBusinessName] = useState("");
  const [province, setProvince] = useState("TP. Hồ Chí Minh");
  const [district, setDistrict] = useState("Quận 1");
  const [address, setAddress] = useState("");
  const [machineModels, setMachineModels] = useState("Bambu Lab X1C / P1S");

  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("role", selectedRole);

    if (selectedRole === Role.WORKSHOP || selectedRole === Role.INDIVIDUAL) {
      formData.append("businessName", businessName || name);
      formData.append("province", province);
      formData.append("district", district);
      formData.append("address", address || `${district}, ${province}`);
      formData.append("machineModels", machineModels);
    }

    startTransition(async () => {
      const res = await registerUserAction(formData);
      if (res.success) {
        router.push("/account/login?registered=true");
      } else {
        setError(res.error || "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center space-x-2.5 mb-5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Printer className="w-5 h-5" />
          </div>
          <span className="font-black text-2xl tracking-tight text-white">
            In3D<span className="text-blue-400">Hub</span>.vn
          </span>
        </Link>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Đăng Ký Tài Khoản Mới
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Chọn loại tài khoản phù hợp với vai trò của bạn
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Role Selection Tabs */}
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => setSelectedRole(Role.CUSTOMER)}
              className={`py-3 px-2 rounded-xl flex flex-col items-center justify-center space-y-1 transition-all ${
                selectedRole === Role.CUSTOMER
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Khách cần in</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole(Role.WORKSHOP)}
              className={`py-3 px-2 rounded-xl flex flex-col items-center justify-center space-y-1 transition-all ${
                selectedRole === Role.WORKSHOP
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Xưởng in 3D</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole(Role.INDIVIDUAL)}
              className={`py-3 px-2 rounded-xl flex flex-col items-center justify-center space-y-1 transition-all ${
                selectedRole === Role.INDIVIDUAL
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Printer className="w-4 h-4" />
              <span>Cá nhân có máy</span>
            </button>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-300 mb-1.5">
                  Họ và tên *
                </label>
                <div className="relative">
                  <Input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="bg-slate-950 border-slate-800 text-white pl-9 h-11 text-xs rounded-xl"
                  />
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1.5">
                  Số điện thoại / Zalo *
                </label>
                <div className="relative">
                  <Input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0912 345 678"
                    className="bg-slate-950 border-slate-800 text-white pl-9 h-11 text-xs rounded-xl"
                  />
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">
                Email đăng nhập *
              </label>
              <div className="relative">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@domain.com"
                  className="bg-slate-950 border-slate-800 text-white pl-9 h-11 text-xs rounded-xl"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">
                Mật khẩu (Tối thiểu 6 ký tự) *
              </label>
              <div className="relative">
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-slate-950 border-slate-800 text-white pl-9 h-11 text-xs rounded-xl"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Additional Fields for Workshop / Individual */}
            {(selectedRole === Role.WORKSHOP || selectedRole === Role.INDIVIDUAL) && (
              <div className="pt-3 border-t border-slate-800 space-y-4">
                <div className="flex items-center space-x-2 text-blue-400 font-bold text-xs">
                  <Building2 className="w-4 h-4" />
                  <span>
                    Thông tin {selectedRole === Role.WORKSHOP ? "Xưởng in" : "Cơ sở máy in cá nhân"}
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Tên thương hiệu / Tên xưởng hiển thị *
                  </label>
                  <Input
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder={selectedRole === Role.WORKSHOP ? "VD: 3D Master Studio" : "VD: Nam Maker 3D"}
                    className="bg-slate-950 border-slate-800 text-white h-11 text-xs rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Tỉnh / Thành phố</label>
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
                      <option value="Cần Thơ">Cần Thơ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Quận / Huyện</label>
                    <Input
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="VD: Quận 1, Cầu Giấy..."
                      className="bg-slate-950 border-slate-800 text-white h-11 text-xs rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Dòng máy in đang sở hữu</label>
                  <Input
                    value={machineModels}
                    onChange={(e) => setMachineModels(e.target.value)}
                    placeholder="VD: 4x Bambu Lab X1C, Anycubic Photon Mono M5s"
                    className="bg-slate-950 border-slate-800 text-white h-11 text-xs rounded-xl"
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl h-11 text-xs shadow-lg shadow-blue-500/25 mt-4"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  <span>Đang khởi tạo tài khoản...</span>
                </>
              ) : (
                <>
                  <span>Đăng ký ngay</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </>
              )}
            </Button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-400">
            Đã có tài khoản?{" "}
            <Link href="/account/login" className="font-bold text-blue-400 hover:underline">
              Đăng nhập tại đây
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
