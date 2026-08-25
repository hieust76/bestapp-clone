import { TicketPercent, Plus, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatVND } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { createCouponAction } from "@/actions/admin-actions";

export const dynamic = "force-dynamic";

export default async function AdminCouponsPage() {
  let coupons: any[] = [];
  try {
    coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    // Fallback
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Quản Lý Mã Giảm Giá (Coupons)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Tạo và kiểm soát các mã khuyến mãi theo phần trăm (%) hoặc số tiền cố định (VND)
        </p>
      </div>

      {/* Add Coupon Form */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
          <Plus className="w-4 h-4 text-blue-600" />
          <h2 className="font-bold text-sm text-slate-900">
            Tạo Mã Giảm Giá Mới
          </h2>
        </div>

        <form
          action={async (formData: FormData) => {
            "use server";
            await createCouponAction(formData);
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs"
        >
          <div>
            <label className="block font-bold text-slate-700 mb-1">Mã khuyến mãi *</label>
            <input
              type="text"
              name="code"
              required
              placeholder="VD: SALE20K"
              className="w-full h-10 px-3 rounded-xl border border-slate-200 uppercase font-mono text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Loại giảm giá</label>
            <select
              name="type"
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:border-blue-500"
            >
              <option value="PERCENT">Giảm theo %</option>
              <option value="FIXED">Giảm số tiền cố định (VND)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Giá trị giảm *</label>
            <input
              type="number"
              name="value"
              defaultValue={10}
              required
              placeholder="10 (%) hoặc 50000 (đ)"
              className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Đơn tối thiểu (VND)</label>
            <input
              type="number"
              name="minOrder"
              defaultValue={100000}
              className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Mô tả hiển thị</label>
            <input
              type="text"
              name="description"
              placeholder="VD: Giảm 10% đơn từ 100k"
              className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Số lượt dùng tối đa</label>
            <input
              type="number"
              name="maxUsage"
              defaultValue={100}
              className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-end sm:col-span-2 lg:col-span-2">
            <Button type="submit" className="w-full h-10 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs">
              <Plus className="w-4 h-4 mr-1.5" />
              <span>Kích Hoạt Mã Giảm Giá</span>
            </Button>
          </div>
        </form>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
          Danh Sách Mã Đang Hoạt Động
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-100">
              <tr>
                <th className="p-3">Mã Coupon</th>
                <th className="p-3">Loại & Giá trị</th>
                <th className="p-3">Đơn tối thiểu</th>
                <th className="p-3">Đã dùng / Giới hạn</th>
                <th className="p-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60">
                  <td className="p-3 font-mono font-bold text-slate-900 text-xs">
                    {c.code}
                  </td>
                  <td className="p-3 font-bold text-rose-600">
                    {c.type === "PERCENT" ? `${c.value}%` : formatVND(c.value)}
                  </td>
                  <td className="p-3 font-semibold text-slate-800">
                    {formatVND(c.minOrder)}
                  </td>
                  <td className="p-3 font-medium text-slate-700">
                    {c.usedCount} / {c.maxUsage} lượt
                  </td>
                  <td className="p-3">
                    <Badge variant={c.isActive ? "success" : "secondary"} className="text-[10px] px-2 py-0.5">
                      {c.isActive ? "Hoạt động" : "Tạm ngưng"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
