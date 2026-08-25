import Link from "next/link";
import { Printer, ShieldCheck, Zap, Lock, FileCode, CheckCircle2, Award, Heart } from "lucide-react";

export function Footer3D() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Guarantees */}
      <div className="border-b border-slate-800/80 py-8 bg-slate-900/60">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Matchmaking 10 Giây</h4>
                <p className="text-slate-400 mt-1 text-[11px] leading-relaxed">
                  Tự động phát đơn tới 10 xưởng/cá nhân rảnh máy gần bạn nhất.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Thanh Toán Escrow</h4>
                <p className="text-slate-400 mt-1 text-[11px] leading-relaxed">
                  Tiền được giữ an toàn bởi sàn, chỉ giải ngân khi khách đã kiểm tra & hài lòng.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Bảo Mật File 3D (NDA)</h4>
                <p className="text-slate-400 mt-1 text-[11px] leading-relaxed">
                  Cam kết bảo mật 100% bản quyền file thiết kế của khách hàng.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Cam Kết Chất Lượng</h4>
                <p className="text-slate-400 mt-1 text-[11px] leading-relaxed">
                  Dung sai kỹ thuật &lt; 0.2mm, in lại 100% nếu sản phẩm bị lỗi hỏng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black">
                <Printer className="w-4 h-4" />
              </div>
              <span className="font-black text-xl text-white tracking-tight">
                In3D<span className="text-blue-400">Hub</span>.vn
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Nền tảng kết nối nhu cầu in 3D hàng đầu Việt Nam. Tối ưu hoá công suất máy in nhàn rỗi và cung cấp dịch vụ tạo mẫu nhanh, chính xác, chi phí tối ưu nhất cho khách hàng.
            </p>
            <div className="text-[11px] text-slate-500 space-y-1">
              <p>📍 Trụ sở: Tòa nhà Innovation, Quận 1, TP. Hồ Chí Minh</p>
              <p>📞 Hotline Kỹ Thuật: 0988.123.456 (Zalo 24/7)</p>
              <p>✉️ Email: contact@in3d.vn</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Dành Cho Khách Hàng
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/customer/projects/new" className="hover:text-blue-400 transition-colors">
                  Đăng yêu cầu in 3D
                </Link>
              </li>
              <li>
                <Link href="/printers" className="hover:text-blue-400 transition-colors">
                  Tìm xưởng in gần bạn
                </Link>
              </li>
              <li>
                <Link href="/customer/dashboard" className="hover:text-blue-400 transition-colors">
                  Theo dõi tiến độ in
                </Link>
              </li>
              <li>
                <Link href="/policy/warranty" className="hover:text-blue-400 transition-colors">
                  Chính sách bảo hành & Hoàn tiền
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Dành Cho Xưởng & Cá Nhân
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/account/register?role=WORKSHOP" className="hover:text-blue-400 transition-colors">
                  Đăng ký mở Xưởng in 3D
                </Link>
              </li>
              <li>
                <Link href="/account/register?role=INDIVIDUAL" className="hover:text-blue-400 transition-colors">
                  Đăng ký Cá nhân có máy
                </Link>
              </li>
              <li>
                <Link href="/printer/available-jobs" className="hover:text-blue-400 transition-colors">
                  Nhận đơn in 3D gần bạn
                </Link>
              </li>
              <li>
                <Link href="/printer/dashboard" className="hover:text-blue-400 transition-colors">
                  Kênh quản lý máy & Doanh thu
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Vật Liệu & Công Nghệ
            </h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-slate-400">In sợi nhựa FDM (PLA, ABS, PETG, TPU)</span></li>
              <li><span className="text-slate-400">In quang hóa SLA Resin 8K / 12K</span></li>
              <li><span className="text-slate-400">In bột Laser SLS (Nylon PA12)</span></li>
              <li><span className="text-slate-400">In sợi Carbon siêu cứng</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© 2026 In3DHub.vn - Nền tảng Marketplace In 3D Việt Nam.</p>
          <div className="flex space-x-4">
            <Link href="/policy/warranty" className="hover:text-slate-300">Bảo mật NDA</Link>
            <Link href="/policy/warranty" className="hover:text-slate-300">Điều khoản sử dụng</Link>
            <Link href="/faq" className="hover:text-slate-300">Hỏi đáp</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
