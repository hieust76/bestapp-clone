"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { processOrderDelivery } from "@/lib/delivery-engine";
import { Role, ProductType, ProductStatus, DeliveryType, CouponType, LicenseStatus } from "@prisma/client";

/**
 * Server Action: Tạo sản phẩm mới kèm các biến thể variants
 */
export async function createProductAction(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const slug = (formData.get("slug") as string) || name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const shortDescription = formData.get("shortDescription") as string;
    const description = formData.get("description") as string;
    const categoryId = formData.get("categoryId") as string;
    const coverImage = (formData.get("coverImage") as string) || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800";
    const type = (formData.get("type") as ProductType) || ProductType.ACCOUNT;
    const badgeText = (formData.get("badgeText") as string) || null;
    
    const variantName = (formData.get("variantName") as string) || "Gói chuẩn 1 Tháng";
    const price = Number(formData.get("price") || 199000);
    const salePrice = Number(formData.get("salePrice") || price);
    const durationDays = Number(formData.get("durationDays") || 30);
    const deliveryType = (formData.get("deliveryType") as DeliveryType) || DeliveryType.AUTO_ACCOUNT;

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        shortDescription,
        description: description || name,
        categoryId,
        coverImage,
        type,
        badgeText,
        status: ProductStatus.ACTIVE,
        variants: {
          create: [
            {
              name: variantName,
              price,
              salePrice,
              durationDays,
              deliveryType,
              stock: 50,
            },
          ],
        },
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return { success: true, product };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Server Action: Xoá sản phẩm
 */
export async function deleteProductAction(productId: string) {
  try {
    await prisma.product.delete({
      where: { id: productId },
    });
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Server Action: Import hàng loạt License / Account vào kho
 */
export async function bulkImportLicensesAction(variantId: string, rawText: string) {
  try {
    if (!variantId || !rawText.trim()) {
      return { success: false, error: "Vui lòng chọn biến thể và nhập danh sách mã" };
    }

    // Tách từng dòng
    const lines = rawText
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) {
      return { success: false, error: "Không tìm thấy dòng dữ liệu nào hợp lệ" };
    }

    const createdLicenses = await prisma.$transaction(
      lines.map((code) =>
        prisma.license.create({
          data: {
            variantId,
            codeEncrypted: code,
            status: LicenseStatus.AVAILABLE,
          },
        })
      )
    );

    // Cập nhật số lượng tồn kho của variant
    await prisma.productVariant.update({
      where: { id: variantId },
      data: {
        stock: {
          increment: lines.length,
        },
      },
    });

    revalidatePath("/admin/licenses");
    return {
      success: true,
      importedCount: createdLicenses.length,
      message: `Đã nạp thành công ${createdLicenses.length} mã/tài khoản vào kho!`,
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Server Action: Tạo mã giảm giá Coupon mới
 */
export async function createCouponAction(formData: FormData) {
  try {
    const code = (formData.get("code") as string).toUpperCase().trim();
    const description = formData.get("description") as string;
    const type = (formData.get("type") as CouponType) || CouponType.PERCENT;
    const value = Number(formData.get("value") || 10);
    const minOrder = Number(formData.get("minOrder") || 0);
    const maxDiscount = Number(formData.get("maxDiscount") || 0) || null;
    const maxUsage = Number(formData.get("maxUsage") || 100);

    const coupon = await prisma.coupon.create({
      data: {
        code,
        description,
        type,
        value,
        minOrder,
        maxDiscount,
        maxUsage,
      },
    });

    revalidatePath("/admin/coupons");
    return { success: true, coupon };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Server Action: Cấp phát đơn hàng thủ công (Manual Deliver)
 */
export async function manualDeliverOrderAction(orderId: string) {
  try {
    const res = await processOrderDelivery(orderId);
    revalidatePath("/admin/orders");
    return res;
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Server Action: Cập nhật quyền người dùng (Role)
 */
export async function updateUserRoleAction(userId: string, newRole: Role) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });
    revalidatePath("/admin/users");
    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
