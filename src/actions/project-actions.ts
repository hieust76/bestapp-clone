"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { matchAndInviteTop10Printers } from "@/lib/matchmaking";
import {
  MaterialType,
  ProjectCategory,
  ProjectStatus,
  InvitationStatus,
  FileType,
} from "@prisma/client";

/**
 * Server Action: Khách hàng tạo Project in 3D mới và phát đơn cho 10 bên gần nhất
 */
export async function createProjectAction(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = (formData.get("category") as ProjectCategory) || ProjectCategory.PROTOTYPE;
    const customerId = formData.get("customerId") as string;

    const desiredMaterial = (formData.get("desiredMaterial") as MaterialType) || MaterialType.PLA;
    const desiredColor = (formData.get("desiredColor") as string) || "Theo màu xưởng có sẵn";
    const infillPercent = Number(formData.get("infillPercent") || 20);
    const layerHeight = Number(formData.get("layerHeight") || 0.2);
    const quantity = Number(formData.get("quantity") || 1);

    const targetBudgetRaw = formData.get("targetBudget");
    const targetBudget = targetBudgetRaw ? Number(targetBudgetRaw) : null;
    const isNegotiable = formData.get("isNegotiable") === "true" || !targetBudget;

    const deliveryAddress = (formData.get("deliveryAddress") as string) || "Quận 1, TP. Hồ Chí Minh";
    const district = (formData.get("district") as string) || "Quận 1";
    const province = (formData.get("province") as string) || "TP. Hồ Chí Minh";
    const latitude = Number(formData.get("latitude") || 10.7769);
    const longitude = Number(formData.get("longitude") || 106.7009);

    const deadlineDays = Number(formData.get("deadlineDays") || 3);
    const deadline = new Date(Date.now() + deadlineDays * 24 * 60 * 60 * 1000);

    const fileName = (formData.get("fileName") as string) || "model_3d_project.stl";
    const fileUrl = (formData.get("fileUrl") as string) || "https://bestapp-cdn.com/models/sample_model.stl";
    const fileSize = Number(formData.get("fileSize") || 4500000);

    // Sinh mã Project code: PRJ-XXXXXX
    const randomCode = `PRJ-${Math.floor(100000 + Math.random() * 900000)}`;

    // Tạo Project trong database
    const project = await prisma.project.create({
      data: {
        code: randomCode,
        title,
        description,
        category,
        desiredMaterial,
        desiredColor,
        infillPercent,
        layerHeight,
        quantity,
        targetBudget,
        isNegotiable,
        deadline,
        deliveryAddress,
        district,
        province,
        latitude,
        longitude,
        status: ProjectStatus.OPEN,
        customerId,
        files: {
          create: [
            {
              fileName,
              fileUrl,
              fileSize,
              fileType: fileName.endsWith(".3mf")
                ? FileType.THREE_MF
                : fileName.endsWith(".obj")
                ? FileType.OBJ
                : FileType.STL,
            },
          ],
        },
      },
    });

    // Kích hoạt Matchmaking Engine: Tìm và phát thông báo đến 10 bên gần nhất
    const matchResult = await matchAndInviteTop10Printers(
      project.id,
      latitude,
      longitude,
      desiredMaterial
    );

    revalidatePath("/customer/dashboard");
    revalidatePath("/printer/available-jobs");

    return {
      success: true,
      project,
      matchResult,
      message: `Đã tạo dự án thành công và phát thông báo đến ${matchResult.invitedCount} xưởng/cá nhân gần bạn nhất!`,
    };
  } catch (error: any) {
    console.error("Lỗi tạo dự án:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Server Action: Xưởng hoặc Cá nhân NHẬN ĐƠN (Atomic Claim - Chỉ 1 người được nhận)
 */
export async function acceptProjectAction(projectId: string, printerUserId: string) {
  try {
    console.log(`🔒 [ATOMIC CLAIM] User ${printerUserId} đang yêu cầu nhận đơn ${projectId}`);

    const result = await prisma.$transaction(async (tx) => {
      // 1. Tìm hồ sơ PrinterProfile của user
      const printerProfile = await tx.printerProfile.findUnique({
        where: { userId: printerUserId },
      });

      if (!printerProfile) {
        throw new Error("Không tìm thấy hồ sơ Xưởng/Cá nhân của bạn.");
      }

      // 2. Lấy thông tin Project và khoá kiểm tra trạng thái
      const project = await tx.project.findUnique({
        where: { id: projectId },
        include: { customer: true },
      });

      if (!project) {
        throw new Error("Dự án không tồn tại.");
      }

      // 3. Kiểm tra tính độc quyền: Nếu đã có người nhận trước -> huỷ yêu cầu
      if (project.status !== ProjectStatus.OPEN) {
        throw new Error("Rất tiếc! Đơn in này vừa được một xưởng khác nhận trước.");
      }

      // 4. Cập nhật Project thành ASSIGNED và gán cho xưởng này
      const updatedProject = await tx.project.update({
        where: { id: projectId },
        data: {
          status: ProjectStatus.ASSIGNED,
          assignedPrinterId: printerProfile.id,
          assignedAt: new Date(),
        },
      });

      // 5. Cập nhật lời mời của bên này thành ACCEPTED
      await tx.projectInvitation.updateMany({
        where: {
          projectId,
          printerProfileId: printerProfile.id,
        },
        data: {
          status: InvitationStatus.ACCEPTED,
          respondedAt: new Date(),
        },
      });

      // 6. Cập nhật TẤT CẢ 9 lời mời của các bên còn lại thành EXPIRED (Biến mất khỏi feed của họ)
      await tx.projectInvitation.updateMany({
        where: {
          projectId,
          printerProfileId: { not: printerProfile.id },
        },
        data: {
          status: InvitationStatus.EXPIRED,
          respondedAt: new Date(),
        },
      });

      // 7. Tự động tạo Phòng Chat (Conversation) giữa Khách Hàng và Xưởng
      const conversation = await tx.conversation.create({
        data: {
          projectId,
          messages: {
            create: [
              {
                senderId: printerUserId,
                content: `Xin chào! Tôi là đại diện từ ${printerProfile.businessName}. Chúng tôi đã nhận yêu cầu in "${project.title}" của bạn. Hãy trao đổi chi tiết về vật liệu, thời gian giao hàng và báo giá tại đây nhé!`,
              },
            ],
          },
        },
      });

      // 8. Gửi thông báo cho Khách hàng
      await tx.notification.create({
        data: {
          userId: project.customerId,
          title: "🎉 Đã có Xưởng nhận in đơn của bạn!",
          content: `${printerProfile.businessName} vừa xác nhận nhận in dự án "${project.title}". Hãy vào phòng chat để trao đổi và nhận hợp đồng!`,
          link: `/customer/dashboard`,
          type: "ORDER_ACCEPTED",
        },
      });

      return {
        project: updatedProject,
        conversationId: conversation.id,
      };
    });

    revalidatePath("/printer/available-jobs");
    revalidatePath("/printer/dashboard");
    revalidatePath("/customer/dashboard");

    return {
      success: true,
      message: "Chúc mừng! Bạn đã nhận đơn in thành công.",
      conversationId: result.conversationId,
    };
  } catch (error: any) {
    console.warn("⚠️ [CLAIM FAILED]:", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Server Action: Lấy danh sách các đơn hàng mới đang chờ cho Xưởng/Cá nhân (Feed đơn gần bạn)
 */
export async function getAvailableProjectsForPrinterAction(printerUserId: string) {
  try {
    const printerProfile = await prisma.printerProfile.findUnique({
      where: { userId: printerUserId },
    });

    if (!printerProfile) {
      return { success: false, error: "Hồ sơ không tồn tại", invitations: [] };
    }

    const invitations = await prisma.projectInvitation.findMany({
      where: {
        printerProfileId: printerProfile.id,
        status: InvitationStatus.PENDING,
        project: {
          status: ProjectStatus.OPEN,
        },
      },
      include: {
        project: {
          include: {
            files: true,
          },
        },
      },
      orderBy: { distanceKm: "asc" },
    });

    return {
      success: true,
      printerProfile,
      invitations,
    };
  } catch (error: any) {
    return { success: false, error: error.message, invitations: [] };
  }
}
