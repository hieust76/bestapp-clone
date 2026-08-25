"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { Role, PrinterStatus, ProjectStatus } from "@prisma/client";

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

/**
 * Server Action: Xác thực / Phê duyệt hồ sơ Xưởng in 3D (Verify Workshop)
 */
export async function verifyWorkshopAction(printerProfileId: string, isVerified: boolean) {
  try {
    const profile = await prisma.printerProfile.update({
      where: { id: printerProfileId },
      data: { isVerified },
    });
    revalidatePath("/admin/printers");
    return { success: true, profile };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Server Action: Huỷ hoặc đóng dự án in (Admin Override)
 */
export async function adminCancelProjectAction(projectId: string) {
  try {
    const project = await prisma.project.update({
      where: { id: projectId },
      data: { status: ProjectStatus.CANCELLED },
    });
    revalidatePath("/admin/projects");
    return { success: true, project };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
