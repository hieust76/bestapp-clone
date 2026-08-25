import { prisma } from "@/lib/prisma";
import { OrderStatus, LicenseStatus, ItemDeliveryStatus } from "@prisma/client";

export interface DeliveryResult {
  success: boolean;
  orderId: string;
  orderCode: string;
  deliveredItemsCount: number;
  totalItemsCount: number;
  isFullyDelivered: boolean;
  deliveryDetails: {
    productName: string;
    variantName: string;
    deliveryType: string;
    deliveryData: string;
    status: string;
  }[];
  error?: string;
}

/**
 * Delivery Engine: Tự động cấp phát License / Account và bàn giao sản phẩm số
 */
export async function processOrderDelivery(orderId: string): Promise<DeliveryResult> {
  console.log(`⚡ [DELIVERY ENGINE] Bắt đầu xử lý cấp phát đơn hàng: ${orderId}`);

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
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
    });

    if (!order) {
      return {
        success: false,
        orderId,
        orderCode: "UNKNOWN",
        deliveredItemsCount: 0,
        totalItemsCount: 0,
        isFullyDelivered: false,
        deliveryDetails: [],
        error: "Không tìm thấy thông tin đơn hàng",
      };
    }

    let deliveredCount = 0;
    const details: any[] = [];

    // Duyệt qua từng sản phẩm trong đơn
    for (const item of order.items) {
      const quantity = item.quantity || 1;
      const deliveryType = item.variant.deliveryType;
      const productName = item.variant.product.name;
      const variantName = item.variant.name;

      // Tìm license có sẵn trong kho
      const availableLicenses = await prisma.license.findMany({
        where: {
          variantId: item.variantId,
          status: LicenseStatus.AVAILABLE,
        },
        take: quantity,
      });

      if (availableLicenses.length >= quantity) {
        // Cấp phát đủ số lượng license
        const licenseIds = availableLicenses.map((l) => l.id);
        const deliveredCodes = availableLicenses.map((l) => l.codeEncrypted).join("\n");

        // Cập nhật trạng thái các license thành DELIVERED (ngăn chặn cấp trùng lặp)
        await prisma.license.updateMany({
          where: { id: { in: licenseIds } },
          data: {
            status: LicenseStatus.DELIVERED,
            assignedToOrderItemId: item.id,
            deliveredAt: new Date(),
          },
        });

        // Cập nhật OrderItem
        await prisma.orderItem.update({
          where: { id: item.id },
          data: {
            deliveryStatus: ItemDeliveryStatus.DELIVERED,
            deliveryData: deliveredCodes,
          },
        });

        deliveredCount++;
        details.push({
          productName,
          variantName,
          deliveryType,
          deliveryData: deliveredCodes,
          status: "DELIVERED",
        });
      } else if (deliveryType === "UPGRADE_LINK") {
        // Với sản phẩm nâng cấp email -> tạo link kích hoạt tự động
        const upgradeLink = `https://invite.family.bestapp.vn/claim?order=${order.code}&variant=${item.variantId}`;
        
        await prisma.orderItem.update({
          where: { id: item.id },
          data: {
            deliveryStatus: ItemDeliveryStatus.DELIVERED,
            deliveryData: `Link tham gia nhóm: ${upgradeLink}`,
          },
        });

        deliveredCount++;
        details.push({
          productName,
          variantName,
          deliveryType,
          deliveryData: upgradeLink,
          status: "DELIVERED",
        });
      } else {
        // Hết kho tạm thời -> đánh dấu PENDING để Admin cấp bù
        console.warn(`⚠️ [DELIVERY ENGINE] Hết kho cho variant ${item.variantId} (${variantName}). Chờ cấp phát thủ công.`);
        
        details.push({
          productName,
          variantName,
          deliveryType,
          deliveryData: "Đang chờ bộ phận kỹ thuật cấp phát thêm key.",
          status: "PENDING_MANUAL",
        });
      }
    }

    const isFullyDelivered = deliveredCount === order.items.length;

    // Cập nhật trạng thái đơn hàng
    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: isFullyDelivered ? OrderStatus.DELIVERED : OrderStatus.PROCESSING,
      },
    });

    // Mock Email Service: Gửi email bàn giao tài khoản cho khách
    sendDeliveryNotificationEmail({
      email: order.email,
      orderCode: order.code,
      details,
    });

    return {
      success: true,
      orderId: order.id,
      orderCode: order.code,
      deliveredItemsCount: deliveredCount,
      totalItemsCount: order.items.length,
      isFullyDelivered,
      deliveryDetails: details,
    };
  } catch (error: any) {
    console.error("❌ [DELIVERY ENGINE ERROR]:", error);
    return {
      success: false,
      orderId,
      orderCode: "ERROR",
      deliveredItemsCount: 0,
      totalItemsCount: 0,
      isFullyDelivered: false,
      deliveryDetails: [],
      error: error.message,
    };
  }
}

/**
 * Mock Email Notification Service
 */
function sendDeliveryNotificationEmail(params: {
  email: string;
  orderCode: string;
  details: any[];
}) {
  console.log("------------------------------------------------------------");
  console.log(`📧 [MOCK EMAIL SERVICE] Gửi email bàn giao đơn hàng [${params.orderCode}] tới [${params.email}]`);
  params.details.forEach((d, i) => {
    console.log(`   ${i + 1}. ${d.productName} (${d.variantName}): ${d.deliveryData}`);
  });
  console.log("------------------------------------------------------------");
}
