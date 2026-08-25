"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { eventBus } from "@/lib/events";
import { EscrowStatus, ContractStatus, ProjectStatus } from "@prisma/client";

/**
 * Server Action: Giả lập thanh toán tiền cọc Escrow (Dev Simulator & Webhook target)
 */
export async function simulateEscrowPaymentAction(contractCode: string) {
  try {
    const contract = await prisma.contract.findFirst({
      where: {
        OR: [
          { contractCode },
          { escrow: { paymentRef: contractCode } },
        ],
      },
      include: {
        escrow: true,
        project: {
          include: {
            assignedPrinter: { include: { user: true } },
          },
        },
      },
    });

    if (!contract || !contract.escrow) {
      return { success: false, error: "Không tìm thấy thông tin hợp đồng hoặc giao dịch Escrow" };
    }

    await prisma.$transaction(async (tx) => {
      // 1. Cập nhật Escrow thành HELD_IN_ESCROW (Sàn đang giữ tiền)
      await tx.escrowTransaction.update({
        where: { id: contract.escrow!.id },
        data: {
          status: EscrowStatus.HELD_IN_ESCROW,
          paidAt: new Date(),
        },
      });

      // 2. Cập nhật Contract thành PAID_ESCROW
      await tx.contract.update({
        where: { id: contract.id },
        data: {
          status: ContractStatus.PAID_ESCROW,
        },
      });

      // 3. Cho phép Xưởng in bắt đầu sản xuất (Project = PRINTING)
      await tx.project.update({
        where: { id: contract.projectId },
        data: {
          status: ProjectStatus.PRINTING,
        },
      });
    });

    // Phát sự kiện real-time SSE cho cả Xưởng và Khách
    const printerUserId = contract.project.assignedPrinter?.userId;
    if (printerUserId) {
      eventBus.broadcast({
        type: "ESCROW_UPDATE",
        recipientUserId: printerUserId,
        data: {
          projectId: contract.projectId,
          status: "HELD_IN_ESCROW",
          message: `Khách hàng đã nạp tiền cọc ${contract.escrow.amount.toLocaleString("vi-VN")}đ vào quỹ Escrow. Bạn đã được phép bắt đầu in!`,
        },
      });
    }

    eventBus.broadcast({
      type: "ESCROW_UPDATE",
      recipientUserId: contract.customerId,
      data: {
        projectId: contract.projectId,
        status: "HELD_IN_ESCROW",
        message: "Ký quỹ Escrow thành công! Tiền đang được sàn bảo đảm an toàn. Xưởng đang tiến hành in.",
      },
    });

    revalidatePath("/customer/dashboard");
    revalidatePath("/printer/dashboard");
    revalidatePath("/chat");

    return {
      success: true,
      message: "Ký quỹ Escrow thành công! Xưởng in đã được cấp phép bắt đầu chạy máy.",
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Server Action: Xưởng cập nhật tiến độ in 3D
 */
export async function updatePrintingProgressAction(
  projectId: string,
  newStatus: "PRINTING" | "PRINTED_DONE" | "SHIPPING"
) {
  try {
    const project = await prisma.project.update({
      where: { id: projectId },
      data: {
        status:
          newStatus === "PRINTED_DONE"
            ? ProjectStatus.PRINTED_DONE
            : newStatus === "SHIPPING"
            ? ProjectStatus.SHIPPING
            : ProjectStatus.PRINTING,
      },
      include: { customer: true },
    });

    // Phát sự kiện SSE cho khách
    eventBus.broadcast({
      type: "ESCROW_UPDATE",
      recipientUserId: project.customerId,
      data: {
        projectId,
        status: newStatus,
        message:
          newStatus === "PRINTED_DONE"
            ? "Xưởng đã in xong sản phẩm và đang kiểm tra chất lượng (QC)!"
            : newStatus === "SHIPPING"
            ? "Đơn hàng in 3D của bạn đang được bàn giao cho shipper / bưu cục!"
            : "Đang tiến hành in sản phẩm...",
      },
    });

    revalidatePath("/printer/dashboard");
    revalidatePath("/customer/dashboard");

    return { success: true, project };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Server Action: Khách hàng xác nhận nhận hàng hài lòng & Giải ngân tiền cho Xưởng
 */
export async function confirmReceivedAndReleaseEscrowAction(projectId: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        contract: {
          include: {
            escrow: true,
            printerProfile: true,
          },
        },
      },
    });

    if (!project || !project.contract || !project.contract.escrow) {
      return { success: false, error: "Dự án hoặc hợp đồng Escrow không tồn tại" };
    }

    const netAmount = project.contract.netPrinterAmount || project.contract.depositAmount;

    await prisma.$transaction(async (tx) => {
      // 1. Cập nhật Escrow thành RELEASED_TO_PRINTER
      await tx.escrowTransaction.update({
        where: { id: project.contract!.escrow!.id },
        data: {
          status: EscrowStatus.RELEASED_TO_PRINTER,
          releasedAt: new Date(),
        },
      });

      // 2. Cập nhật Project & Contract thành COMPLETED
      await tx.project.update({
        where: { id: projectId },
        data: {
          status: ProjectStatus.COMPLETED,
          completedAt: new Date(),
        },
      });

      await tx.contract.update({
        where: { id: project.contract!.id },
        data: {
          status: ContractStatus.COMPLETED,
          completedAt: new Date(),
        },
      });

      // 3. Giải ngân tiền vào số dư của Xưởng in (Cộng vào User.balance)
      await tx.user.update({
        where: { id: project.contract!.printerProfile.userId },
        data: {
          balance: { increment: netAmount },
        },
      });

      // 4. Tăng số đơn hoàn thành của xưởng
      await tx.printerProfile.update({
        where: { id: project.contract!.printerProfileId },
        data: {
          completedJobs: { increment: 1 },
        },
      });
    });

    // Phát sự kiện SSE thông báo cho Xưởng
    eventBus.broadcast({
      type: "ESCROW_UPDATE",
      recipientUserId: project.contract.printerProfile.userId,
      data: {
        projectId,
        status: "RELEASED",
        amount: netAmount,
        message: `🎉 Khách hàng đã bấm xác nhận nhận hàng hài lòng! Số tiền ${netAmount.toLocaleString("vi-VN")}đ đã được giải ngân vào ví của bạn.`,
      },
    });

    revalidatePath("/customer/dashboard");
    revalidatePath("/printer/dashboard");

    return {
      success: true,
      message: `Đã xác nhận hoàn tất dự án và giải ngân ${netAmount.toLocaleString("vi-VN")}đ cho xưởng in!`,
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
