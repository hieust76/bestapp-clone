import { Users, ShieldCheck, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatVND } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { updateUserRoleAction } from "@/actions/admin-actions";
import { Role } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  let users: any[] = [];
  try {
    users = await prisma.user.findMany({
      include: {
        _count: {
          select: { orders: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {}

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Quản Lý Người Dùng & Phân Quyền (RBAC)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Danh sách khách hàng và quản trị viên trong hệ thống BestApp
        </p>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-100">
              <tr>
                <th className="p-3">Họ tên & Email</th>
                <th className="p-3">Vai trò (Role)</th>
                <th className="p-3">Số dư ví</th>
                <th className="p-3">Số đơn đã mua</th>
                <th className="p-3">Ngày tham gia</th>
                <th className="p-3 text-right">Đổi vai trò</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/60">
                  <td className="p-3">
                    <p className="font-bold text-slate-900">{u.name || "Khách hàng"}</p>
                    <p className="text-[11px] text-slate-500">{u.email}</p>
                  </td>
                  <td className="p-3">
                    <Badge
                      variant={
                        u.role === "ADMIN"
                          ? "hot"
                          : u.role === "SUPPORT"
                          ? "warning"
                          : "secondary"
                      }
                      className="text-[10px] px-2 py-0.5"
                    >
                      {u.role}
                    </Badge>
                  </td>
                  <td className="p-3 font-bold text-emerald-600">
                    {formatVND(u.balance || 0)}
                  </td>
                  <td className="p-3 font-semibold text-slate-800">
                    {u._count?.orders || 0} đơn
                  </td>
                  <td className="p-3 text-slate-400">
                    {new Date(u.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="p-3 text-right">
                    <form
                      action={async (formData: FormData) => {
                        "use server";
                        const newRole = formData.get("role") as Role;
                        await updateUserRoleAction(u.id, newRole);
                      }}
                      className="inline-flex items-center space-x-1"
                    >
                      <select
                        name="role"
                        defaultValue={u.role}
                        className="h-7 px-2 rounded-lg border border-slate-200 text-[11px] bg-white font-semibold"
                      >
                        <option value="USER">USER</option>
                        <option value="SUPPORT">SUPPORT</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                      <button
                        type="submit"
                        className="h-7 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px]"
                      >
                        Lưu
                      </button>
                    </form>
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
