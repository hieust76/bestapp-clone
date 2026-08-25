import { Key, Upload, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { bulkImportLicensesAction } from "@/actions/admin-actions";

export const dynamic = "force-dynamic";

export default async function AdminLicensesPage() {
  let variants: any[] = [];
  let licenses: any[] = [];

  try {
    variants = await prisma.productVariant.findMany({
      include: {
        product: true,
      },
      orderBy: { createdAt: "desc" },
    });

    licenses = await prisma.license.findMany({
      take: 50,
      include: {
        variant: {
          include: {
            product: true,
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
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Kho License Key & Tài Khoản Cấp Sẵn
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Quản lý và nạp hàng loạt key bản quyền / tài khoản để hệ thống tự động giao hàng 24/7
        </p>
      </div>

      {/* Bulk Import Box */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
          <Upload className="w-4 h-4 text-blue-600" />
          <h2 className="font-bold text-sm text-slate-900">
            Nạp Hàng Loạt (Bulk Import) Vào Kho
          </h2>
        </div>

        <form
          action={async (formData: FormData) => {
            "use server";
            const variantId = formData.get("variantId") as string;
            const rawText = formData.get("rawText") as string;
            await bulkImportLicensesAction(variantId, rawText);
          }}
          className="space-y-4 text-xs"
        >
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              Chọn biến thể sản phẩm cần nạp *
            </label>
            <select
              name="variantId"
              required
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:border-blue-500"
            >
              {variants.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.product?.name} - {v.name} (Tồn kho: {v.stock})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              Danh sách mã Key / Tài khoản (Mỗi dòng một mục) *
            </label>
            <textarea
              name="rawText"
              rows={5}
              required
              placeholder={`user1@gmail.com|Password123\nuser2@gmail.com|Password456\nW269N-WFGWX-YVC9B-4J6C9-T83GX`}
              className="w-full p-3.5 rounded-xl border border-slate-200 font-mono text-xs focus:outline-none focus:border-blue-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Định dạng gợi ý: <code>email|password</code> cho tài khoản hoặc <code>XXXX-XXXX-XXXX</code> cho license key.
            </p>
          </div>

          <Button type="submit" className="h-11 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-xs px-6 shadow-md shadow-blue-500/20">
            <Upload className="w-4 h-4 mr-1.5" />
            <span>Nạp Vào Kho Ngay</span>
          </Button>
        </form>
      </div>

      {/* Licenses Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
          Danh Sách Mã Trong Kho ({licenses.length} bản ghi gần nhất)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-100">
              <tr>
                <th className="p-3">Sản phẩm & Gói</th>
                <th className="p-3">Mã / Dữ liệu bảo mật</th>
                <th className="p-3">Trạng thái</th>
                <th className="p-3">Ngày nạp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {licenses.length > 0 ? (
                licenses.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50/60">
                    <td className="p-3">
                      <p className="font-bold text-slate-900">{l.variant?.product?.name || "Sản phẩm"}</p>
                      <p className="text-[11px] text-blue-600 font-semibold">{l.variant?.name}</p>
                    </td>
                    <td className="p-3 font-mono text-xs text-slate-800 break-all max-w-sm">
                      {l.codeEncrypted}
                    </td>
                    <td className="p-3">
                      <Badge
                        variant={
                          l.status === "AVAILABLE"
                            ? "success"
                            : l.status === "DELIVERED"
                            ? "secondary"
                            : "destructive"
                        }
                        className="text-[10px] px-2 py-0.5"
                      >
                        {l.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-slate-400">
                      {new Date(l.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-400">
                    Chưa có mã nào trong kho. Hãy dùng form phía trên để nạp hàng loạt.
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
