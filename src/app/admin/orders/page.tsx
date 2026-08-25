import Link from "next/link";
import { ShoppingCart, Zap, CheckCircle2, Clock, RotateCcw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatVND } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { manualDeliverOrderAction } from "@/actions/admin-actions";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;

  let orders: any[] = [];
  try {
    const where: any = {};
    if (status) {
      where.status = status;
    }

    orders = await prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    // Fallback
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Quản Lý Đơn Hàng & Cấp Phát
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Theo dõi dòng tiền chuyển khoản SePay QR và trạng thái bàn giao license
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none text-xs font-bold">
        <Link
          href="/admin/orders"
          className={`px-4 py-2 rounded-xl border ${
            !status ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-700 border-slate-200"
          }`}
        >
          Tất cả
        </Link>
        <Link
          href="/admin/orders?status=PENDING"
          className={`px-4 py-2 rounded-xl border ${
            status === "PENDING" ? "bg-amber-500 text-white border-amber-500" : "bg-white text-slate-700 border-slate-200"
          }`}
        >
          Chờ thanh toán (PENDING)
        </Link>
        <Link
          href="/admin/orders?status=PAID"
          className={`px-4 py-2 rounded-xl border ${
            status === "PAID" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-700 border-slate-200"
          }`}
        >
          Đã thanh toán (PAID)
        </Link>
        <Link
          href="/admin/orders?status=DELIVERED"
          className={`px-4 py-2 rounded-xl border ${
            status === "DELIVERED" ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-700 border-slate-200"
          }`}
        >
          Đã giao hàng (DELIVERED)
        </Link>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-100">
              <tr>
                <th className="p-3">Mã đơn & Ref</th>
                <th className="p-3">Khách hàng</th>
                <th className="p-3">Sản phẩm</th>
                <th className="p-3">Tổng tiền</th>
                <th className="p-3">Trạng thái</th>
                <th className="p-3">Ngày tạo</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.length > 0 ? (
                orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/60">
                    <td className="p-3">
                      <p className="font-mono font-bold text-slate-900">{o.code}</p>
                      <p className="text-[10px] text-slate-400 font-mono">Ref: {o.paymentRef}</p>
                    </td>
                    <td className="p-3">
                      <p className="font-bold text-slate-800">{o.email}</p>
                      {o.customerName && <p className="text-[10px] text-slate-400">{o.customerName}</p>}
                    </td>
                    <td className="p-3">
                      <div className="space-y-1 max-w-xs">
                        {o.items?.map((item: any, idx: number) => (
                          <p key={idx} className="truncate font-medium text-slate-700">
                            {item.variant?.product?.name || "Sản phẩm"} ({item.variant?.name}) x {item.quantity}
                          </p>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 font-black text-blue-600">
                      {formatVND(o.finalAmount)}
                    </td>
                    <td className="p-3">
                      <Badge
                        variant={
                          o.status === "DELIVERED" || o.status === "PAID"
                            ? "success"
                            : o.status === "PENDING"
                            ? "warning"
                            : "secondary"
                        }
                        className="text-[10px] px-2 py-0.5"
                      >
                        {o.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-slate-400">
                      {new Date(o.createdAt).toLocaleString("vi-VN")}
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <form
                        action={async () => {
                          "use server";
                          await manualDeliverOrderAction(o.id);
                        }}
                        className="inline-block"
                      >
                        <Button
                          type="submit"
                          size="sm"
                          className="h-8 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-none"
                        >
                          <Zap className="w-3.5 h-3.5 mr-1" />
                          <span>Cấp phát ngay</span>
                        </Button>
                      </form>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    Không có đơn hàng nào theo điều kiện lọc.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
