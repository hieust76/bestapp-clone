import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { EscrowStatus, ContractStatus, ProjectStatus } from "@prisma/client";

/**
 * Escrow Payment Webhook Handler (SePay / VietQR Bank Transfer)
 */
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    console.log("📥 [ESCROW PAYMENT WEBHOOK]:", JSON.stringify(payload, null, 2));

    const transferAmount = Number(payload.transferAmount || payload.amount || 0);
    const content = String(payload.content || payload.description || "").trim();

    // Tìm mã hợp đồng hoặc mã đơn chuyển khoản (VD: HD-849201 hoặc PRJ-902184)
    const contractMatch = content.match(/HD-\d{6,8}/i);
    const projectMatch = content.match(/PRJ-\d{6,8}/i);

    const refCode = contractMatch ? contractMatch[0].toUpperCase() : projectMatch ? projectMatch[0].toUpperCase() : content.toUpperCase();

    try {
      // Tìm hợp đồng hoặc escrow đang chờ
      const escrow = await prisma.escrowTransaction.findFirst({
        where: {
          OR: [
            { paymentRef: refCode },
            { contract: { contractCode: refCode } },
            { contract: { project: { code: refCode } } },
          ],
        },
        include: {
          contract: {
            include: {
              project: true,
            },
          },
        },
      });

      if (escrow) {
        // Cập nhật Escrow thành HELD_IN_ESCROW, Contract thành PAID_ESCROW, Project thành PRINTING
        await prisma.$transaction(async (tx) => {
          await tx.escrowTransaction.update({
            where: { id: escrow.id },
            data: {
              status: EscrowStatus.HELD_IN_ESCROW,
              paidAt: new Date(),
            },
          });

          await tx.contract.update({
            where: { id: escrow.contractId },
            data: {
              status: ContractStatus.PAID_ESCROW,
            },
          });

          await tx.project.update({
            where: { id: escrow.contract.projectId },
            data: {
              status: ProjectStatus.PRINTING,
            },
          });
        });

        console.log(`✅ [ESCROW PAID]: Đã giữ tiền thành công cho hợp đồng ${escrow.contract.contractCode}. Cho phép xưởng in bắt đầu sản xuất!`);

        return NextResponse.json({
          success: true,
          message: "Escrow funds locked successfully. Production authorized.",
          contractCode: escrow.contract.contractCode,
        });
      }
    } catch (dbError) {
      console.warn("DB escrow lookup error:", dbError);
    }

    return NextResponse.json({
      success: true,
      message: "Webhook acknowledged",
    });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
