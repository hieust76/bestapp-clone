import { Users, ShieldCheck, UserCheck, Building2, Printer } from "lucide-react";
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
        printerProfile: true,
        _count: {
          select: { projectsCreated: true },
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
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Quản Lý Người Dùng &amp; Đối Tác Xưởng In
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Danh sách khách hàng, xưởng in và cá nhân có máy in trên hệ thống In3DHub
        </p>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-100">
              <tr>
                <th className="p-3">Họ tên &amp; Email</th>
                <th className="p-3">Vai trò (Role)</th>
                <th className="p-3">Cơ sở / Xưởng in</th>
                <th className="p-3">Số dự án tạo</th>
                <th className="p-3">Ngày tham gia</th>
                <th className="p-3 text-right">Đổi vai trò</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u: any) => (
                <tr key={u.id} className="hover:bg-slate-50/60">
                  <td className="p-3">
                    <p className="font-bold text-slate-900">{u.name || "Người dùng"}</p>
                    <p className="text-[11px] text-slate-500">{u.email}</p>
                  </td>
                  <td className="p-3">
                    <Badge
                      variant={
                        u.role === "ADMIN"
                          ? "hot"
                          : u.role === "WORKSHOP"
                          ? "default"
                          : u.role === "INDIVIDUAL"
                          ? "warning"
                          : "secondary"
                      }
                      className="text-[10px] px-2 py-0.5"
                    >
                      {u.role}
                    </Badge>
                  </td>
                  <td className="p-3">
                    {u.printerProfile ? (
                      <div>
                        <p className="font-bold text-slate-900">{u.printerProfile.businessName}</p>
                        <p className="text-[10px] text-slate-400">
                          {u.printerProfile.district}, {u.printerProfile.province}
                        </p>
                      </div>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="p-3 font-semibold text-slate-800">
                    {u._count?.projectsCreated || 0} dự án
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
                        <option value="CUSTOMER">CUSTOMER</option>
                        <option value="WORKSHOP">WORKSHOP</option>
                        <option value="INDIVIDUAL">INDIVIDUAL</option>
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
