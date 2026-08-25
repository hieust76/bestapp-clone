"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Layers,
  Search,
  PlusCircle,
  Cpu,
  User,
  ShieldCheck,
  Menu,
  X,
  Bell,
  Sparkles,
  Printer,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header3D() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 py-1.5 px-4 text-center text-xs font-semibold text-white/95">
        <span className="inline-flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>Hệ thống tự động phát đơn in 3D đến <b>10 xưởng gần bạn nhất</b> trong 10 giây!</span>
        </span>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <Printer className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tight text-white flex items-center">
                In3D<span className="text-blue-400">Hub</span>
                <span className="ml-1.5 text-[9px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 px-1.5 py-0.5 rounded-full">
                  Marketplace
                </span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Sàn kết nối Xưởng & Máy in 3D
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 text-xs font-bold text-slate-300">
            <Link
              href="/printers"
              className="px-3.5 py-2 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
            >
              Danh bạ Xưởng in
            </Link>
            <Link
              href="/printer/available-jobs"
              className="px-3.5 py-2 rounded-xl hover:bg-slate-800 text-amber-400 hover:text-amber-300 transition-colors flex items-center space-x-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Đơn cần in gần bạn</span>
            </Link>
            <Link
              href="/customer/dashboard"
              className="px-3.5 py-2 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
            >
              Quản lý Dự án
            </Link>
            <Link
              href="/printer/dashboard"
              className="px-3.5 py-2 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
            >
              Kênh Xưởng / Cá nhân
            </Link>
          </nav>

          {/* Actions & CTA */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link href="/customer/projects/new">
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold rounded-xl h-10 px-4 text-xs shadow-lg shadow-blue-500/25 flex items-center space-x-1.5">
                <PlusCircle className="w-4 h-4" />
                <span>Đăng yêu cầu in 3D</span>
              </Button>
            </Link>

            <Link href="/account/login">
              <Button variant="outline" className="border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-bold rounded-xl h-10">
                <User className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
                <span>Đăng nhập</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link href="/customer/projects/new">
              <Button size="sm" className="bg-blue-600 text-white font-bold text-[11px] h-9 px-3 rounded-xl">
                + Đăng đơn
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-3 text-sm">
          <Link
            href="/printers"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 font-semibold"
          >
            🏢 Danh bạ Xưởng & Cá nhân in 3D
          </Link>
          <Link
            href="/printer/available-jobs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-amber-400 font-bold"
          >
            ⚡ Đơn hàng mới gần bạn (Dành cho Xưởng)
          </Link>
          <Link
            href="/customer/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 font-semibold"
          >
            📁 Quản lý Dự án của tôi
          </Link>
          <Link
            href="/printer/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 font-semibold"
          >
            ⚙️ Kênh Xưởng / Quản lý máy in
          </Link>
          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <Link href="/account/login" className="flex-1">
              <Button variant="outline" className="w-full border-slate-700 text-white text-xs font-bold">
                Đăng nhập
              </Button>
            </Link>
            <Link href="/account/register" className="flex-1">
              <Button className="w-full bg-blue-600 text-white text-xs font-bold">
                Đăng ký
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
