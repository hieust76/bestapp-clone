"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { eventBus } from "@/lib/events";
import { ContractStatus, EscrowStatus, ProjectStatus } from "@prisma/client";

/**
 * Server Action: Xưởng tạo Hợp đồng điện tử (E-Contract) gửi cho Khách hàng
 */
export async function createContractAction(formData: FormData) {
  try {
    const projectId = formData.get("projectId") as string;
    const finalPrice = Number(formData.get("finalPrice") || 450000);
    const depositPercent = Number(formData.get("depositPercent") || 50); // % cọc
    const estimatedDays = Number(formData.get("estimatedDays") || 2);
    const materialUsed = (formData.get("materialUsed") as string) || "PETG Đen mờ (Chịu nhiệt, chống nước)";
    const qualityNotes = (formData.get("qualityNotes") as string) || "Cam kết dung sai < 0.2mm, xử lý support sạch sẽ, sấy UV";
    const terms = (formData.get("terms") as string) || "Hợp đồng cam kết in lại 100% miễn phí nếu sản phẩm bị gãy vỡ do lỗi in.";

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { assignedPrinter: true },
    });

    if (!project || !project.assignedPrinterId) {
      return { success: false, error: "Dự án chưa được gán cho xưởng in nào." };
    }

    const depositAmount = Math.round((finalPrice * depositPercent) / 100);
    const platformFee = Math.round(finalPrice * 0.05); // 5% phí nền tảng
    const netPrinterAmount = finalPrice - platformFee;

    const contractCode = `HD-${Math.floor(100000 + Math.random() * 900000)}`;

    const contract = await prisma.contract.upsert({
      where: { projectId },
      create: {
        contractCode,
        projectId,
        customerId: project.customerId,
        printerProfileId: project.assignedPrinterId,
        finalPrice,
        depositAmount,
        platformFee,
        netPrinterAmount,
        estimatedDays,
        materialUsed,
        qualityNotes,
        terms,
        status: ContractStatus.SENT_TO_CUSTOMER,
        escrow: {
          create: {
            amount: depositAmount,
            status: EscrowStatus.PENDING,
            paymentRef: contractCode,
          },
        },
      },
      update: {
        finalPrice,
        depositAmount,
        platformFee,
        netPrinterAmount,
        estimatedDays,
        materialUsed,
        qualityNotes,
        terms,
        status: ContractStatus.SENT_TO_CUSTOMER,
      },
      include: {
        escrow: true,
      },
    });

    // Bắn thông báo SSE real-time cho Khách hàng
    eventBus.broadcast({
      type: "CONTRACT_UPDATE",
      recipientUserId: project.customerId,
      data: {
        projectId,
        contract,
        message: `Xưởng in vừa gửi Hợp đồng điện tử ${contractCode}. Vui lòng xem và thanh toán cọc để bắt đầu in!`,
      },
    });

    // Tạo notification in-app
    await prisma.notification.create({
      data: {
        userId: project.customerId,
        title: "📄 Hợp đồng in 3D mới đã được tạo!",
        content: `Xưởng in đã gửi hợp đồng ${contractCode} (Giá chốt: ${finalPrice.toLocaleString("vi-VN")}đ). Vui lòng xác nhận và ký quỹ Escrow.`,
        link: `/customer/dashboard`,
        type: "CONTRACT_READY",
      },
    });

    revalidatePath("/chat");
    revalidatePath("/customer/dashboard");
    return {
      success: true,
      contract,
      message: `Đã tạo Hợp đồng điện tử ${contractCode} thành công!`,
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Server Action: Khách hàng đồng ý hoặc từ chối hợp đồng
 */
export async function respondToContractAction(
  contractId: string,
  action: "ACCEPT" | "REJECT",
  rejectionReason?: string
) {
  try {
    const contract = await prisma.contract.findUnique({
      where: { id: contractId },
      include: { project: { include: { assignedPrinter: true } } },
    });

    if (!contract) {
      return { success: false, error: "Hợp đồng không tồn tại" };
    }

    if (action === "ACCEPT") {
      await prisma.contract.update({
        where: { id: contractId },
        data: {
          status: ContractStatus.SENT_TO_CUSTOMER, // Sẵn sàng thanh toán Escrow
          signedAt: new Date(),
        },
      });

      return {
        success: true,
        message: "Bạn đã đồng ý các điều khoản hợp đồng! Vui lòng chuyển sang bước thanh toán Escrow.",
      };
    } else {
      await prisma.contract.update({
        where: { id: contractId },
        data: {
          status: ContractStatus.DRAFT,
        },
      });

      // Bắn event báo cho xưởng biết
      if (contract.project.assignedPrinter?.userId) {
        eventBus.broadcast({
          type: "CONTRACT_UPDATE",
          recipientUserId: contract.project.assignedPrinter.userId,
          data: {
            contractId,
            message: `Khách hàng yêu cầu thương lượng lại hợp đồng: ${rejectionReason || "Cần điều chỉnh giá/thời gian"}`,
          },
        });
      }

      return {
        success: true,
        message: "Đã gửi yêu cầu thương lượng lại cho xưởng in.",
      };
    }
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
