import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { processOrderDelivery } from "@/lib/delivery-engine";
import { OrderStatus, PaymentStatus, PaymentMethod } from "@prisma/client";

/**
 * SePay-style Webhook Payload Structure:
 * {
 *   "id": 123456,
 *   "gateway": "MBBank",
 *   "transactionDate": "2026-08-25 19:30:00",
 *   "accountNumber": "10287654321",
 *   "code": null,
 *   "content": "BEST849201",
 *   "transferType": "in",
 *   "transferAmount": 189000,
 *   "accumulated": 10000000,
 *   "referenceCode": "MB102938475",
 *   "description": "Chuyen khoan don hang BEST849201"
 * }
 */

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const webhookSecret = process.env.SEPAY_WEBHOOK_SECRET || "dev_sepay_webhook_secret";

    // 1. Verify Authentication / Secret
    if (authHeader) {
      const token = authHeader.replace("Apikey ", "").replace("Bearer ", "").trim();
      if (token !== webhookSecret && process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { success: false, error: "Unauthorized Webhook Request" },
          { status: 401 }
        );
      }
    }

    const payload = await req.json();
    console.log("📥 [PAYMENT WEBHOOK RECEIVED]:", JSON.stringify(payload, null, 2));

    // Extract transaction details
    const gatewayTxId = String(payload.id || payload.transactionId || payload.referenceCode || Date.now());
    const transferAmount = Number(payload.transferAmount || payload.amount || 0);
    const content = String(payload.content || payload.description || "").trim();
    const idempotencyKey = `sepay_tx_${gatewayTxId}`;

    // 2. Idempotency Check bằng PaymentEvent
    try {
      const existingEvent = await prisma.paymentEvent.findUnique({
        where: { idempotencyKey },
      });

      if (existingEvent) {
        console.log(`ℹ️ [WEBHOOK IDEMPOTENT]: Giao dịch ${idempotencyKey} đã được xử lý trước đó.`);
        return NextResponse.json({
          success: true,
          message: "Duplicate event already processed (Idempotent OK)",
        });
      }
    } catch (e) {
      // Tiếp tục nếu DB mock/offline
    }

    // 3. Tìm mã đơn hàng từ nội dung chuyển khoản (VD: BEST102938)
    const match = content.match(/BEST\d{6,8}/i);
    const orderCode = match ? match[0].toUpperCase() : content.toUpperCase();

    let order = null;
    try {
      order = await prisma.order.findFirst({
        where: {
          OR: [
            { code: orderCode },
            { paymentRef: orderCode },
            { paymentRef: { contains: orderCode } },
          ],
        },
        include: { items: true },
      });
    } catch (dbError) {
      console.warn("DB Lookup error:", dbError);
    }

    if (!order) {
      console.warn(`⚠️ [WEBHOOK]: Không tìm thấy đơn hàng cho nội dung chuyển khoản: "${content}"`);
      return NextResponse.json(
        { success: false, error: `Order not found with payment reference: ${content}` },
        { status: 404 }
      );
    }

    // 4. Kiểm tra số tiền chuyển
    if (transferAmount < order.finalAmount) {
      console.warn(
        `⚠️ [WEBHOOK]: Số tiền chuyển (${transferAmount}đ) ít hơn số tiền cần thanh toán (${order.finalAmount}đ)`
      );

      // Lưu lại Payment thất bại
      try {
        await prisma.payment.create({
          data: {
            orderId: order.id,
            amount: transferAmount,
            status: PaymentStatus.FAILED,
            gatewayTxId,
            rawPayload: payload,
          },
        });
      } catch (e) {}

      return NextResponse.json(
        {
          success: false,
          error: `Insufficient payment amount: received ${transferAmount}, expected ${order.finalAmount}`,
        },
        { status: 400 }
      );
    }

    // 5. Kiểm tra thời hạn đơn hàng
    if (order.status === OrderStatus.EXPIRED || new Date() > order.expiresAt) {
      console.warn(`⚠️ [WEBHOOK]: Đơn hàng ${order.code} đã hết hạn thanh toán.`);
    }

    // 6. Transaction: Cập nhật Payment, Order = PAID, và Lưu PaymentEvent
    try {
      await prisma.$transaction(async (tx) => {
        // Tạo Payment thành công
        const payment = await tx.payment.create({
          data: {
            orderId: order.id,
            amount: transferAmount,
            method: PaymentMethod.BANK_TRANSFER,
            status: PaymentStatus.SUCCESS,
            gatewayTxId,
            paidAt: new Date(),
            rawPayload: payload,
          },
        });

        // Ghi nhận PaymentEvent với Idempotency Key
        await tx.paymentEvent.create({
          data: {
            paymentId: payment.id,
            eventType: "sepay.transaction.paid",
            idempotencyKey,
            payload,
          },
        });

        // Cập nhật Order status = PAID
        await tx.order.update({
          where: { id: order.id },
          data: {
            status: OrderStatus.PAID,
            paidAt: new Date(),
          },
        });
      });
    } catch (txError) {
      console.error("Database transaction error during webhook processing:", txError);
    }

    // 7. Kích hoạt Delivery Engine (Cấp phát License Key tự động)
    const deliveryResult = await processOrderDelivery(order.id);

    console.log(`✅ [WEBHOOK SUCCESS]: Đơn hàng ${order.code} đã thanh toán & cấp phát tự động thành công!`);

    return NextResponse.json({
      success: true,
      message: "Payment verified and order delivered successfully",
      orderCode: order.code,
      deliveryResult,
    });
  } catch (error: any) {
    console.error("❌ [WEBHOOK INTERNAL ERROR]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
