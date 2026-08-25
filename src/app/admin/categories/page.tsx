import { Layers, Plus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  let categories: any[] = [];
  try {
    categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { sortOrder: "asc" },
    });
  } catch (e) {}

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Danh Mục Sản Phẩm Số
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Phân loại danh mục hiển thị trên thanh điều hướng và trang chủ
        </p>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
          Danh Sách Danh Mục ({categories.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-100">
              <tr>
                <th className="p-3">Tên danh mục</th>
                <th className="p-3">Slug</th>
                <th className="p-3">Mô tả</th>
                <th className="p-3">Số sản phẩm</th>
                <th className="p-3">Nổi bật</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60">
                  <td className="p-3 font-bold text-slate-900">
                    {c.name}
                  </td>
                  <td className="p-3 font-mono text-blue-600">
                    /shop/{c.slug}
                  </td>
                  <td className="p-3 text-slate-500 max-w-sm truncate">
                    {c.description || "-"}
                  </td>
                  <td className="p-3 font-bold text-slate-800">
                    {c._count?.products || 0} sản phẩm
                  </td>
                  <td className="p-3">
                    <Badge variant={c.isFeatured ? "hot" : "secondary"} className="text-[10px]">
                      {c.isFeatured ? "Featured" : "Normal"}
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
