import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Key,
  ShoppingCart,
  Users,
  TicketPercent,
  Layers,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-base shadow-md shadow-blue-500/20">
              B
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight block">
                BestApp CMS
              </span>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                Admin Control
              </span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1 text-xs font-semibold">
          <Link
            href="/admin"
            className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 text-blue-400" />
            <span>Tổng quan Dashboard</span>
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <Package className="w-4 h-4 text-purple-400" />
            <span>Sản phẩm & Gói</span>
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <ShoppingCart className="w-4 h-4 text-emerald-400" />
            <span>Đơn hàng & SePay</span>
          </Link>
          <Link
            href="/admin/licenses"
            className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <Key className="w-4 h-4 text-amber-400" />
            <span>Kho License & Acc</span>
          </Link>
          <Link
            href="/admin/categories"
            className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <Layers className="w-4 h-4 text-sky-400" />
            <span>Danh mục sản phẩm</span>
          </Link>
          <Link
            href="/admin/coupons"
            className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <TicketPercent className="w-4 h-4 text-rose-400" />
            <span>Mã giảm giá (Coupon)</span>
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <Users className="w-4 h-4 text-indigo-400" />
            <span>Quản lý người dùng</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <div className="flex items-center space-x-2 text-[11px] text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Bảo mật RBAC: Role ADMIN</span>
          </div>
          <Link
            href="/"
            className="flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white pt-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Về trang mua sắm</span>
          </Link>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
