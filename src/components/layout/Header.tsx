"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search,
  ShoppingCart,
  User as UserIcon,
  Flame,
  LayoutGrid,
  Sparkles,
  HelpCircle,
  Menu,
  X,
  LogOut,
  ShieldAlert,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/cart-store";

export function Header({ user }: { user?: { name?: string | null; email?: string | null; role?: string } | null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Lấy tổng số lượng sản phẩm từ Zustand cart store
  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              B
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  BestApp
                </span>
                <span className="text-xs font-bold text-slate-400">.vn</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase -mt-0.5">
                Sản phẩm số 24/7
              </span>
            </div>
          </Link>

          {/* Search Bar - Center Desktop */}
          <form
            action="/shop"
            method="GET"
            className="hidden lg:flex flex-1 max-w-lg mx-4"
          >
            <div className="relative w-full">
              <input
                type="text"
                name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm ChatGPT Plus, Canva Pro, Windows 11, Spotify..."
                className="w-full h-11 pl-10 pr-24 rounded-full border border-slate-200 bg-slate-50/70 text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full h-8 px-4 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-none"
              >
                Tìm kiếm
              </Button>
            </div>
          </form>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 font-medium text-sm text-slate-700">
            <Link
              href="/shop"
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-blue-50/50 transition-colors"
            >
              <LayoutGrid className="w-4 h-4 text-blue-600" />
              <span>Cửa Hàng</span>
            </Link>
            <Link
              href="/flash-sale"
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg hover:text-orange-600 hover:bg-orange-50/50 transition-colors font-semibold text-orange-600"
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
              <span>Flash Sale</span>
              <Badge variant="discount" className="text-[10px] px-1.5 py-0">
                HOT
              </Badge>
            </Link>
            <Link
              href="/shop/ai-chatbot"
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg hover:text-purple-600 hover:bg-purple-50/50 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>AI Tools</span>
            </Link>
            <Link
              href="/orders/track"
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100/70 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-slate-500" />
              <span>Tra cứu đơn</span>
            </Link>
          </nav>

          {/* User Actions & Cart */}
          <div className="flex items-center space-x-2.5">
            {/* Cart Button */}
            <Link href="/cart">
              <Button
                variant="outline"
                className="relative h-10 px-3.5 rounded-xl border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 text-slate-700 hover:text-blue-600"
              >
                <ShoppingCart className="w-4 h-4 mr-1.5 text-blue-600" />
                <span className="hidden sm:inline text-xs font-semibold">Giỏ hàng</span>
                <span className="inline-flex items-center justify-center bg-blue-600 text-white text-[10px] font-bold h-5 min-w-5 px-1.5 rounded-full ml-1.5">
                  {cartCount}
                </span>
              </Button>
            </Link>

            {/* Auth State / Profile */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                    {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span className="hidden md:inline text-xs font-bold text-slate-700 max-w-[100px] truncate">
                    {user.name || user.email?.split("@")[0]}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 text-xs">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="font-bold text-slate-900 truncate">{user.name || "Khách hàng"}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      {user.role === "ADMIN" && (
                        <Badge variant="hot" className="mt-1 text-[10px]">
                          Quản Trị Viên
                        </Badge>
                      )}
                    </div>

                    {user.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2.5 hover:bg-slate-50 font-semibold text-purple-600"
                      >
                        <ShieldAlert className="w-4 h-4" />
                        <span>Trang Quản Trị (Admin)</span>
                      </Link>
                    )}

                    <Link
                      href="/account/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-50 text-slate-700"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Đơn hàng đã mua</span>
                    </Link>

                    <form action="/api/auth/signout" method="POST">
                      <button
                        type="submit"
                        className="w-full text-left flex items-center space-x-2 px-4 py-2 hover:bg-rose-50 text-rose-600 font-semibold"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Đăng xuất</span>
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link href="/account/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-xl text-slate-700 hover:text-blue-600"
                  >
                    <UserIcon className="w-4 h-4 mr-1" />
                    <span>Đăng nhập</span>
                  </Button>
                </Link>
                <Link href="/account/register">
                  <Button
                    size="sm"
                    className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20"
                  >
                    Đăng ký
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <form action="/shop" method="GET" className="lg:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              name="q"
              placeholder="Tìm sản phẩm số (ChatGPT, Canva, Windows...)"
              className="w-full h-10 pl-9 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue-500 focus:bg-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </form>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-3 border-t border-slate-100 flex flex-col space-y-2 text-xs font-semibold">
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-700"
            >
              <LayoutGrid className="w-4 h-4 text-blue-600" />
              <span>Tất cả sản phẩm</span>
            </Link>
            <Link
              href="/flash-sale"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 px-3 py-2.5 rounded-xl bg-orange-50 text-orange-600"
            >
              <Flame className="w-4 h-4 text-orange-500" />
              <span>Flash Sale Giá Sốc</span>
            </Link>
            <Link
              href="/shop/ai-chatbot"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-700"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Công cụ AI & Chatbot</span>
            </Link>
            <Link
              href="/orders/track"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-700"
            >
              <HelpCircle className="w-4 h-4 text-slate-500" />
              <span>Tra cứu đơn hàng</span>
            </Link>
            {!user && (
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                <Link href="/account/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full rounded-xl">
                    Đăng nhập
                  </Button>
                </Link>
                <Link href="/account/register" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700">
                    Đăng ký
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
