"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Printer,
  Compass,
  MessageSquare,
  PlusCircle,
  Building2,
  Bell,
  User,
  ShieldCheck,
  Zap,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/hooks/useNotifications";

export function Header3D() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const { notifications, unreadCount, markAllAsRead } = useNotifications(
    undefined,
    {}
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Printer className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg sm:text-xl tracking-tight text-white leading-none">
              In3D<span className="text-blue-400">Hub</span>.vn
            </span>
            <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
              Sàn In 3D Toàn Quốc
            </span>
          </div>
        </Link>

        {/* Main Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 text-xs font-bold text-slate-300">
          <Link
            href="/printers"
            className="px-3.5 py-2 rounded-xl hover:bg-slate-900 hover:text-white transition-colors flex items-center space-x-1.5"
          >
            <Compass className="w-4 h-4 text-blue-400" />
            <span>Danh Bạ Xưởng</span>
          </Link>

          <Link
            href="/printer/available-jobs"
            className="px-3.5 py-2 rounded-xl hover:bg-slate-900 hover:text-white transition-colors flex items-center space-x-1.5"
          >
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400/20" />
            <span>Đơn Gần Bạn</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </Link>

          <Link
            href="/chat"
            className="px-3.5 py-2 rounded-xl hover:bg-slate-900 hover:text-white transition-colors flex items-center space-x-1.5"
          >
            <MessageSquare className="w-4 h-4 text-purple-400" />
            <span>Hộp Thư Chat</span>
          </Link>

          <Link
            href="/customer/dashboard"
            className="px-3.5 py-2 rounded-xl hover:bg-slate-900 hover:text-white transition-colors flex items-center space-x-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Dự Án Của Tôi</span>
          </Link>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center space-x-2.5">
          {/* Real-time Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifOpen(!notifOpen);
                if (!notifOpen) markAllAsRead();
              }}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 relative border border-slate-800"
              title="Thông báo real-time"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-black flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 space-y-3 z-50 text-xs animate-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-white">Thông Báo SSE Tức Thì</span>
                  <span className="text-[10px] text-emerald-400 font-bold">Trực Tuyến</span>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <Link
                        key={n.id}
                        href={n.link || "/printer/available-jobs"}
                        onClick={() => setNotifOpen(false)}
                        className="block p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800/80 transition-colors"
                      >
                        <p className="font-bold text-white text-xs">{n.title}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{n.content}</p>
                        <span className="text-[9px] text-slate-500 mt-1 block">{n.createdAt}</span>
                      </Link>
                    ))
                  ) : (
                    <div className="p-4 text-center text-slate-400 text-xs">
                      Chưa có thông báo mới. Khi có đơn in hoặc tin nhắn, hệ thống sẽ báo tại đây!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Create Project CTA Button */}
          <Link href="/customer/projects/new">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl h-10 px-4 text-xs shadow-lg shadow-blue-500/25 flex items-center space-x-1.5">
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Đăng Yêu Cầu In</span>
            </Button>
          </Link>

          {/* Account Login / Register Link */}
          <Link href="/account/login">
            <Button
              variant="outline"
              size="sm"
              className="border-slate-700 bg-slate-900 text-slate-200 hover:text-white hover:bg-slate-800 font-bold rounded-xl h-10 text-xs px-3"
            >
              <User className="w-3.5 h-3.5 sm:mr-1.5" />
              <span className="hidden sm:inline">Tài Khoản</span>
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 p-4 space-y-2 text-xs font-bold">
          <Link
            href="/printers"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-2 p-2.5 rounded-xl hover:bg-slate-900 text-slate-200"
          >
            <Compass className="w-4 h-4 text-blue-400" />
            <span>Danh Bạ Xưởng In 3D</span>
          </Link>

          <Link
            href="/printer/available-jobs"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-2 p-2.5 rounded-xl hover:bg-slate-900 text-slate-200"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Feed Đơn Gần Bạn</span>
          </Link>

          <Link
            href="/chat"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-2 p-2.5 rounded-xl hover:bg-slate-900 text-slate-200"
          >
            <MessageSquare className="w-4 h-4 text-purple-400" />
            <span>Hộp Thư Chat &amp; Hợp Đồng</span>
          </Link>

          <Link
            href="/customer/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-2 p-2.5 rounded-xl hover:bg-slate-900 text-slate-200"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Dashboard Quản Lý Dự Án</span>
          </Link>
        </div>
      )}
    </header>
  );
}
