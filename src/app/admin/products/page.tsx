import Link from "next/link";
import Image from "next/image";
import { Package, Plus, Trash2, Edit, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatVND } from "@/lib/utils";
import { getProducts, getCategories } from "@/lib/products-service";
import { createProductAction, deleteProductAction } from "@/actions/admin-actions";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Quản Lý Sản Phẩm & Gói Dịch Vụ
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tổng số: <b>{products.length}</b> sản phẩm số đang lưu hành
          </p>
        </div>
      </div>

      {/* Add New Product Form */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
          <Plus className="w-4 h-4 text-blue-600" />
          <h2 className="font-bold text-sm text-slate-900">
            Thêm Sản Phẩm Mới Vào Hệ Thống
          </h2>
        </div>

        <form
          action={async (formData: FormData) => {
            "use server";
            await createProductAction(formData);
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs"
        >
          <div>
            <label className="block font-bold text-slate-700 mb-1">Tên sản phẩm *</label>
            <input
              type="text"
              name="name"
              required
              placeholder="VD: Cursor Pro 1 Tháng"
              className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Danh mục *</label>
            <select
              name="categoryId"
              required
              className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-blue-500"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Tên gói Variant</label>
            <input
              type="text"
              name="variantName"
              defaultValue="Gói 1 Tháng"
              className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Loại giao hàng</label>
            <select
              name="deliveryType"
              className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-blue-500"
            >
              <option value="AUTO_ACCOUNT">Tự động xuất Account (user|pass)</option>
              <option value="AUTO_KEY">Tự động xuất License Key</option>
              <option value="UPGRADE_LINK">Link gia nhập nhóm / Invite</option>
              <option value="MANUAL">Xử lý thủ công</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Giá niêm yết (VND)</label>
            <input
              type="number"
              name="price"
              defaultValue={250000}
              className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Giá bán thực tế (VND)</label>
            <input
              type="number"
              name="salePrice"
              defaultValue={149000}
              className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Số ngày sử dụng</label>
            <input
              type="number"
              name="durationDays"
              defaultValue={30}
              className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-end">
            <Button type="submit" className="w-full h-10 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-xs">
              <Plus className="w-4 h-4 mr-1.5" />
              <span>Tạo Sản Phẩm</span>
            </Button>
          </div>
        </form>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
          Danh Sách Sản Phẩm Hiện Có
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-100">
              <tr>
                <th className="p-3">Sản phẩm</th>
                <th className="p-3">Danh mục</th>
                <th className="p-3">Gói & Giá</th>
                <th className="p-3">Đã bán</th>
                <th className="p-3">Đánh giá</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => {
                const primaryVariant = p.variants?.[0];
                return (
                  <tr key={p.id} className="hover:bg-slate-50/60">
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                          <Image
                            src={p.coverImage}
                            alt={p.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-xs">{p.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">/products/{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                        {p.category?.name || "Sản phẩm"}
                      </span>
                    </td>
                    <td className="p-3">
                      <p className="font-black text-blue-600 text-xs">
                        {formatVND(primaryVariant?.salePrice || primaryVariant?.price || 0)}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {p.variants?.length || 1} biến thể
                      </p>
                    </td>
                    <td className="p-3 font-semibold text-slate-800">
                      {p.totalSold.toLocaleString("vi-VN")} lượt
                    </td>
                    <td className="p-3 font-bold text-amber-500">
                      ★ {p.rating}
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <form
                        action={async () => {
                          "use server";
                          await deleteProductAction(p.id);
                        }}
                        className="inline-block"
                      >
                        <Button
                          type="submit"
                          size="sm"
                          variant="ghost"
                          className="h-8 text-xs text-rose-600 hover:bg-rose-50"
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-1" />
                          <span>Xoá</span>
                        </Button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
