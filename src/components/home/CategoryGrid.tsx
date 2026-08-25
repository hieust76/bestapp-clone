import Link from "next/link";
import {
  Bot,
  Palette,
  Laptop,
  Cloud,
  GraduationCap,
  Shield,
  Film,
  Code2,
  ArrowRight,
} from "lucide-react";

export function CategoryGrid() {
  const categories = [
    {
      id: "ai-chatbot",
      name: "AI & Chatbot",
      desc: "ChatGPT Plus, Claude 3.5, Midjourney, Perplexity",
      count: "15+ gói",
      icon: Bot,
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      id: "design",
      name: "Đồ Hoạ & Thiết Kế",
      desc: "Canva Pro, Adobe Creative Cloud, Freepik, Figma",
      count: "12+ gói",
      icon: Palette,
      color: "from-purple-500 to-pink-600",
      bgLight: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      id: "os-office",
      name: "Hệ Điều Hành & Office",
      desc: "Key Windows 10/11 Pro, Office 365 vĩnh viễn",
      count: "8+ gói",
      icon: Laptop,
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      id: "cloud-storage",
      name: "Lưu Trữ Cloud",
      desc: "Google One 2TB, Microsoft OneDrive 1TB - 5TB",
      count: "6+ gói",
      icon: Cloud,
      color: "from-sky-500 to-blue-600",
      bgLight: "bg-sky-50 text-sky-600 border-sky-100",
    },
    {
      id: "learning",
      name: "Học Tập & Ngoại Ngữ",
      desc: "Duolingo Super, Elsa Speak Pro, Coursera, Udemy",
      count: "10+ gói",
      icon: GraduationCap,
      color: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50 text-amber-600 border-amber-100",
    },
    {
      id: "vpn-security",
      name: "VPN & Bảo Mật",
      desc: "NordVPN, ExpressVPN, Surfshark, AdGuard Pro",
      count: "7+ gói",
      icon: Shield,
      color: "from-rose-500 to-red-600",
      bgLight: "bg-rose-50 text-rose-600 border-rose-100",
    },
    {
      id: "entertainment",
      name: "Giải Trí & Stream",
      desc: "YouTube Premium, Spotify, Netflix 4K, Apple Music",
      count: "9+ gói",
      icon: Film,
      color: "from-red-500 to-rose-600",
      bgLight: "bg-red-50 text-red-600 border-red-100",
    },
    {
      id: "developer-tools",
      name: "Công Cụ Lập Trình",
      desc: "JetBrains All Products, GitHub Copilot, Cursor AI",
      count: "8+ gói",
      icon: Code2,
      color: "from-cyan-500 to-blue-600",
      bgLight: "bg-cyan-50 text-cyan-600 border-cyan-100",
    },
  ];

  return (
    <section className="py-12 bg-slate-50/50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              <span>Danh Mục Nổi Bật</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Khám Phá Theo Nhóm Dịch Vụ
            </h2>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700 group"
          >
            <span>Xem tất cả danh mục</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className="group relative bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border ${cat.bgLight} group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      {cat.count}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-base">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 opacity-90 group-hover:opacity-100">
                  <span>Xem sản phẩm</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
