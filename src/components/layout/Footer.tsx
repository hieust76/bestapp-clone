import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  RotateCcw,
  Headphones,
  Mail,
  Phone,
  MessageCircle,
  Send,
  CreditCard,
  QrCode,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      {/* Guarantees Banner */}
      <div className="container mx-auto px-4 pb-10 border-b border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Giao Hàng Tự Động</h4>
              <p className="text-xs text-slate-400 mt-1">
                Nhận key và tài khoản ngay sau khi thanh toán thành công trong 1 phút.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Bảo Hành Full Time</h4>
              <p className="text-xs text-slate-400 mt-1">
                Cam kết 1-đổi-1 trong suốt thời hạn sử dụng nếu có bất kỳ lỗi nào.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Hoàn Tiền Uy Tín</h4>
              <p className="text-xs text-slate-400 mt-1">
                Hoàn tiền 100% nếu sản phẩm không thể kích hoạt hoặc lỗi từ nhà cung cấp.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Hỗ Trợ Tận Tâm</h4>
              <p className="text-xs text-slate-400 mt-1">
                Đội ngũ kỹ thuật viên hỗ trợ nhanh chóng qua Zalo & Telegram 8h - 23h.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: About & Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg">
                B
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                BestApp<span className="text-blue-400">.vn</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Nền tảng cung cấp tài khoản công cụ AI, bản quyền phần mềm, tài khoản học tập và giải trí kỹ thuật số tự động hàng đầu Việt Nam. Nhanh chóng, an toàn và tiết kiệm đến 80%.
            </p>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Hotline: 0988.123.456 (8:00 - 23:00)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Email: support@bestapp.vn</span>
              </div>
            </div>
          </div>

          {/* Col 2: Danh mục nổi bật */}
          <div>
            <h5 className="text-white font-semibold text-sm mb-3.5">
              Danh Mục Sản Phẩm
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/category/ai-chatbot" className="hover:text-blue-400 transition-colors">
                  Tài khoản AI (ChatGPT, Claude, Midjourney)
                </Link>
              </li>
              <li>
                <Link href="/category/design" className="hover:text-blue-400 transition-colors">
                  Đồ hoạ & Thiết kế (Canva Pro, Adobe)
                </Link>
              </li>
              <li>
                <Link href="/category/os-software" className="hover:text-blue-400 transition-colors">
                  Key Windows 11 & Office 365
                </Link>
              </li>
              <li>
                <Link href="/category/cloud-storage" className="hover:text-blue-400 transition-colors">
                  Lưu trữ Google One, OneDrive
                </Link>
              </li>
              <li>
                <Link href="/category/learning" className="hover:text-blue-400 transition-colors">
                  Học tập (Duolingo, Elsa Speak, Coursera)
                </Link>
              </li>
              <li>
                <Link href="/category/vpn" className="hover:text-blue-400 transition-colors">
                  VPN & Bảo mật (NordVPN, ExpressVPN)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hỗ trợ khách hàng */}
          <div>
            <h5 className="text-white font-semibold text-sm mb-3.5">
              Hỗ Trợ Khách Hàng
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/orders/track" className="hover:text-blue-400 transition-colors">
                  Tra cứu đơn hàng
                </Link>
              </li>
              <li>
                <Link href="/policy/warranty" className="hover:text-blue-400 transition-colors">
                  Chính sách bảo hành & Đổi trả
                </Link>
              </li>
              <li>
                <Link href="/policy/payment" className="hover:text-blue-400 transition-colors">
                  Hướng dẫn thanh toán QR SePay
                </Link>
              </li>
              <li>
                <Link href="/policy/privacy" className="hover:text-blue-400 transition-colors">
                  Chính sách bảo mật thông tin
                </Link>
              </li>
              <li>
                <Link href="/policy/terms" className="hover:text-blue-400 transition-colors">
                  Điều khoản sử dụng dịch vụ
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Kênh hỗ trợ & Thanh toán */}
          <div>
            <h5 className="text-white font-semibold text-sm mb-3.5">
              Kênh Liên Hệ Nhanh
            </h5>
            <div className="space-y-2.5">
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600/20 text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Zalo CSKH</span>
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 hover:bg-sky-500/20 text-xs font-semibold transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Telegram Support</span>
              </a>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 block mb-2">
                Phương thức thanh toán tự động:
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
                  <QrCode className="w-3 h-3 mr-1 text-blue-400" /> SePay QR 24/7
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
                  <CreditCard className="w-3 h-3 mr-1 text-emerald-400" /> MoMo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="container mx-auto px-4 pt-6 mt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <p>© 2026 BestApp.vn - Nền tảng thương mại điện tử sản phẩm số.</p>
        <p>Bản quyền giao diện phát triển độc lập, an toàn & bảo mật.</p>
      </div>
    </footer>
  );
}
