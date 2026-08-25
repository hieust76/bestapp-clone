import Link from "next/link";
import { Zap, ShieldCheck, MessageCircle, Phone, Clock } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-slate-900 text-slate-300 text-xs py-2 border-b border-slate-800">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
        {/* Left features highlights */}
        <div className="flex items-center space-x-4 md:space-x-6 overflow-x-auto py-0.5 text-[11px] md:text-xs">
          <div className="flex items-center space-x-1.5 font-medium text-amber-400 shrink-0">
            <Zap className="w-3.5 h-3.5 fill-amber-400" />
            <span>Giao tự động trong 1 phút</span>
          </div>
          <div className="hidden sm:flex items-center space-x-1.5 text-slate-300 shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Bảo hành full time 1-đổi-1</span>
          </div>
          <div className="hidden md:flex items-center space-x-1.5 text-slate-300 shrink-0">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>Hỗ trợ kỹ thuật 8h - 23h</span>
          </div>
        </div>

        {/* Right contact / tracking */}
        <div className="flex items-center space-x-4 shrink-0 text-[11px] md:text-xs">
          <Link
            href="/orders/track"
            className="hover:text-white transition-colors flex items-center space-x-1"
          >
            <span>Tra cứu đơn hàng</span>
          </Link>
          <span className="text-slate-700">|</span>
          <a
            href="https://zalo.me"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:text-blue-300 font-medium flex items-center space-x-1"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Zalo hỗ trợ</span>
          </a>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <div className="hidden sm:flex items-center space-x-1 text-slate-300 font-medium">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Hotline: 0988.123.456</span>
          </div>
        </div>
      </div>
    </div>
  );
}
